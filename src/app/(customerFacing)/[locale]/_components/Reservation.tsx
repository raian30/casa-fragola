'use client'
import {de, enUS, fr, hr, it} from "date-fns/locale";
import {DateRange} from "react-date-range";
import {useLocale, useTranslations} from "next-intl";
import {FormEvent, useEffect, useState, useTransition} from "react";
import Image from 'next/image'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {z} from "zod";
import Link from "next/link";
import {MinusCircle, Plus, PlusCircle, PlusCircleIcon} from "lucide-react";

export default function Reservation() {
    const [isPending, startTransition] = useTransition()
    const localActive = useLocale()
    const t = useTranslations('Third')

    const [numberOfAdults, setNumberOfAdults] = useState<number>(0)
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0)
    const [numberOfInfants, setNumberOfInfants] = useState<number>(0)

    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    let errorOccurred = false;

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            disabled: false,
            key: 'selection'
        }
    ])

    const availableRanges = ['now:20.6.2024', '22.6.2024:1.7.2024'];
    const availableDates: Date[] = [];

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //U availableRanges array stavlja svaki dostupan datum koji je definiran u availableRanges arrayu i gleda da li je u proslosti
    function processRange(range: string) {
        let [start, end] = range.split(':');

        let startDate = start === 'now' ? new Date() : new Date(start.split('.').reverse().join('-'));

        let [endDay, endMonth, endYear] = end.split('.').map(Number);
        let endDate = new Date(endYear, endMonth - 1, endDay);

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (d >= today) {
                //@ts-ignore
                availableDates.push(d.toLocaleDateString('hr-HR'));
            }
        }
    }
    availableRanges.forEach(range => processRange(range));


    let WantedRangeArray: Date[] = []

    //gleda da li je selected range dostupan i da li je selektano manje od 7 dana
    const ValidateRange = () => {
        console.log('validating...')
        WantedRangeArray = []
        let start = dateRange[0].startDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
        let end = dateRange[0].endDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")

        const startDate = new Date(start.split('.').reverse().join('-'));

        const [endDay, endMonth, endYear] = end.split('.').map(Number);
        const endDate = new Date(endYear, endMonth - 1, endDay);

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (d >= today) {
                //@ts-ignore
                WantedRangeArray.push(d.toLocaleDateString('hr-HR'));
            }
        }

        WantedRangeArray.forEach((date) => {
            if(!availableDates.includes(date)) {
                setError(t('error-datum-nije-dostupan'))
                console.log('error')
                errorOccurred = true;
            }
        })

        if (!errorOccurred) setError('')
    }


    useEffect(() => {
        ValidateRange()
    }, [dateRange]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        startTransition(() => {
            e.preventDefault()

            if (error) {
                return setWarning(t('error-dogodila-se-greska'))
            }

            ValidateRange()

            if ((numberOfChildren + numberOfAdults + numberOfInfants) > 4) {
                return setWarning(t('error-previse-ljudi'))
            }

            if ((numberOfChildren + numberOfAdults + numberOfInfants) <= 0) {
                return setWarning(t('error-premalo-ljudi'))
            }

            if(WantedRangeArray.length < 7) {
                return setError(t('error-premalo-odabranih-dana'))
            }

            let checkin = dateRange[0].startDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [StartDay, StartMonth, StartYear] = checkin.split('.')
            const checkInFormated = `${StartYear}-${StartMonth}-${StartDay}`

            let checkout = dateRange[0].endDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [EndDay, EndMonth, EndYear] = checkout.split('.')
            const checkOutFormated = `${EndYear}-${EndMonth}-${EndDay}`

            window.open(`https://www.airbnb.com/book/stays/1030204797174613452?numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&numberOfInfants=${numberOfInfants}&numberOfPets=0&checkin=${checkInFormated}&checkout=${checkOutFormated}&productId=1030204797174613452`)
        })
    }

    return (
        <>
            <div className={'flex flex-col w-full lg:w-2/5 gap-10'}>
                <DateRange
                    className={'shadow-[0px_0px_20px_1px_gray] w-full rounded-md'}
                    rangeColors={['#b96da8', '#b96da8', '#b96da8']}
                    // @ts-ignore
                    disabledDay={(date) => !availableDates.includes(date.toLocaleDateString('hr-HR'))}
                    dateDisplayFormat='dd.MM.yyyy'
                    locale={
                        localActive == 'en' ? enUS :
                            localActive == 'hr' ? hr :
                                localActive == 'it' ? it :
                                    localActive == 'de' ? de :
                                        localActive == 'fr' ? fr :
                                            enUS
                    }
                    onChange={item => {
                        console.log('changing')
                        //@ts-ignore
                        return setDateRange([item.selection])
                    }}
                    ranges={dateRange}
                />
                <div className={'flex flex-wrap gap-5 justify-between items-center'}>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#e8e6e6] shadow-[0px_0px_20px_-1px_#fff]'}/>
                        <p>{t('tumac-nedostupno')}</p>
                    </div>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#FFFFFF] drop-shadow-2xl'}/>
                        <p>{t('tumac-dostupno')}</p>
                    </div>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#B96DA8] drop-shadow-2xl'}/>
                        <p>{t('tumac-odabrano')}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-14 lg:max-w-[50%]'}>
                <div className={'flex gap-10 items-start justify-start'}>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="checkIn" className={'text-gray-700 text-sm mb-4'}>{t('dolazak')}</label>
                        <input required={true} disabled
                               value={dateRange[0].startDate.toLocaleDateString('hr-HR').toString()}
                               id={'checkIn'}
                               name={'checkIn'} type="text"
                               className={'border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                    </div>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="checkOut" className={'text-gray-700 text-sm pb-4'}>{t('odlazak')}</label>
                        <input required={true} disabled
                               value={dateRange[0].endDate.toLocaleDateString('hr-HR').toString()}
                               id={'checkOut'}
                               name={'checkOut'} type="text"
                               className={'border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                    </div>
                </div>
                <div className={'flex flex-wrap gap-4 items-start justify-between'}>
                    <div className={'flex flex-col justify-center items-center w-fit'}>
                        <label htmlFor="numberOfAdults" className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-odraslih')}</label>
                        <div className={'px-3 flex justify-center items-center gap-3'}>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfAdults >= 1) {
                                    setNumberOfAdults(numberOfAdults - 1)
                                }
                            }}>
                                <MinusCircle strokeWidth={1} className={'hover:text-[#854276] transition-all mt-2'}/>
                            </div>
                            <input disabled required={true} id={'numberOfAdults'} name={'numberOfAdults'} min={0}
                                   value={numberOfAdults}
                                   className={'max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfAdults <= 3) {
                                    setNumberOfAdults(numberOfAdults + 1)
                                }
                            }}>
                                <PlusCircle strokeWidth={1}  className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-center w-fit'}>
                        <label htmlFor="numberOfChildren" className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-djece')}</label>
                        <div className={'px-3 flex justify-center items-center gap-3'}>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfChildren >= 1) {
                                    setNumberOfChildren(numberOfChildren - 1)
                                }
                            }}>
                                <MinusCircle strokeWidth={1}  className={'hover:text-[#854276] transition-all mt-2'}/>
                            </div>
                            <input disabled required={true} id={'numberOfChildren'} min={0} name={'numberOfChildren'}
                                   value={numberOfChildren}
                                   className={'max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfChildren <= 3) {
                                    setNumberOfChildren(numberOfChildren + 1)
                                }
                            }}>
                                <PlusCircle strokeWidth={1}  className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-center w-fit'}>
                        <label htmlFor="numberOfInfants" className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-beba')}</label>
                        <div className={'px-3 flex justify-center items-center gap-3'}>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfInfants >= 1) {
                                    setNumberOfInfants(numberOfInfants - 1)
                                }
                            }}>
                                <MinusCircle strokeWidth={1}  className={'hover:text-[#854276] transition-all mt-2'}/>
                            </div>
                            <input disabled required={true} id={'numberOfInfants'} name={'numberOfInfants'} min={0}
                                   value={numberOfInfants}
                                   className={'max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                            <div className={'cursor-pointer'} onClick={() => {
                                if (numberOfInfants <= 3) {
                                    setNumberOfInfants(numberOfInfants + 1)
                                }
                            }}>
                                <PlusCircle strokeWidth={1}  className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <button disabled={!!error || isPending} type={'submit'}
                        className={'disabled:bg-gray-200 disabled:cursor-auto cursor-pointer bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-full text-center'}> {t('rezerviraj')}
                </button>
                <p className={`text-red-500 ${!error && !warning && 'my-3'}`}>{error || warning}</p>
                <Link target={'_blank'} href={'https://www.airbnb.com/rooms/1030204797174613452'}
                      className={'flex justify-end items-center gap-5 text-[#828282] w-full font-semibold'}>{t('powered-by')} <Image src={'/airbnb-logo.png'} className={'contrast-0'} alt={'Airbnb'} width={100}
                                   height={31}/></Link>
            </form>
        </>
    )
}