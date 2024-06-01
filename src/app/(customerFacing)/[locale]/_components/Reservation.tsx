'use client'
import {de, enUS, fr, hr, it} from "date-fns/locale";
import {DateRange} from "react-date-range";
import {useLocale, useTranslations} from "next-intl";
import {FormEvent, useEffect, useState} from "react";
import Image from 'next/image'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {z} from "zod";

export default function Reservation() {
    const localActive = useLocale()
    const t = useTranslations('Third')

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            disabled: false,
            key: 'selection'
        }
    ])

    useEffect(() => {
        console.log(dateRange)
    }, [dateRange]);

    const availableRanges = ['now:20.6.2024', '22.6.2024:1.7.2024'];
    const availableDates: Date[] = [];

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function processRange(range: string) {
        const [start, end] = range.split(':');

        const startDate = start === 'now' ? new Date() : new Date(start.split('.').reverse().join('-'));

        const [endDay, endMonth, endYear] = end.split('.').map(Number);
        const endDate = new Date(endYear, endMonth - 1, endDay);

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (d >= today) {
                //@ts-ignore
                availableDates.push(d.toLocaleDateString('hr-HR'));
            }
        }
    }

    availableRanges.forEach(range => processRange(range));

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        let numberOfChildren = parseInt(formData.get('numberOfChildren') as string)
        let numberOfAdults = parseInt(formData.get('numberOfAdults') as string)
        let numberOfInfants = parseInt(formData.get('numberOfInfants') as string)

        let checkin = dateRange[0].startDate.toLocaleDateString('hr-HR').toString()
        let [StartDay, StartMonth, StartYear] = checkin.replaceAll(" ", "").split('.')
        const checkInFormated = `${StartYear}-${StartMonth}-${StartDay}`

        let checkout = dateRange[0].endDate.toLocaleDateString('hr-HR').toString()
        let [EndDay, EndMonth, EndYear] = checkout.replaceAll(" ", "").split('.')
        const checkOutFormated = `${EndYear}-${EndMonth}-${EndDay}`

        const ReserveSchema = z.object({
            numberOfChildren: z.number().max(4),
            numberOfAdults: z.number().max(4),
            numberOfInfants: z.number().max(4),
            checkInFormated: z.string(),
            checkOutFormated: z.string()
        })

        const parsed = ReserveSchema.safeParse({
            numberOfChildren,
            numberOfAdults,
            numberOfInfants,
            checkInFormated,
            checkOutFormated
        })

        console.log(parsed)

        window.open(`https://www.airbnb.com/book/stays/1030204797174613452?numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&numberOfInfants=${numberOfInfants}&numberOfPets=0&checkin=${checkInFormated}&checkout=${checkOutFormated}&productId=1030204797174613452`)
    }

    return (
        <>
            <div className={'flex flex-col w-full lg:w-auto 2xl:w-1/3 gap-10'}>
                <DateRange
                    className={'shadow-[0px_0px_20px_1px_gray] w-full rounded-md'}
                    rangeColors={['#b96da8', '#b96da8', '#b96da8']}
                    //@ts-ignore
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
                        console.log(item)
                        //@ts-ignore
                        return setDateRange([item.selection])
                    }}
                    ranges={dateRange}
                />
                <div className={'flex gap-5 justify-between items-center'}>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#e8e6e6] shadow-[0px_0px_20px_-1px_#fff]'}/>
                        <p>Unavailable</p>
                    </div>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#FFFFFF] drop-shadow-2xl'}/>
                        <p>Available</p>
                    </div>
                    <div className={'flex justify-center items-center gap-2'}>
                        <div className={'size-10 rounded-xl bg-[#B96DA8] drop-shadow-2xl'}/>
                        <p>Selected</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-10 xl:max-w-[50%]'}>
                <div className={'flex gap-10 items-start justify-start'}>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="checkIn" className={'text-gray-700 text-sm mb-4'}>Dolazak - Odaberite na
                            kalendaru</label>
                        <input required={true} disabled
                               value={dateRange[0].startDate.toLocaleDateString('hr-HR').toString()}
                               id={'checkIn'}
                               name={'checkIn'} type="text"
                               className={'border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                    </div>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="checkOut" className={'text-gray-700 text-sm pb-4'}>Odlazak - Odaberite na
                            kalendaru</label>
                        <input required={true} disabled
                               value={dateRange[0].endDate.toLocaleDateString('hr-HR').toString()}
                               id={'checkOut'}
                               name={'checkOut'} type="text"
                               className={'border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                    </div>
                </div>
                <div className={'flex gap-10 items-start justify-start'}>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="numberOfAdults" className={'text-gray-700 text-sm w-full mb-2'}>Broj odraslih
                            (&gt;=13 godina) </label>
                        <input required={true} id={'numberOfAdults'} name={'numberOfAdults'} min={0} type="number"
                               className={'focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                    </div>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="numberOfChildren" className={'text-gray-700 text-sm w-full mb-2'}>Broj djece
                            (&lt;13 godina)</label>
                        <input required={true} id={'numberOfChildren'} min={0} name={'numberOfChildren'} type="number"
                               className={'focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                    </div>
                </div>
                <div className={'flex gap-10 items-start justify-start'}>
                    <div className={'space-y-2 w-1/2'}>
                        <label htmlFor="numberOfInfants" className={'text-gray-700 text-sm w-full mb-2'}>Broj beba
                            (&lt;2 godine) </label>
                        <input required={true} id={'numberOfInfants'} name={'numberOfInfants'} min={0} type="number"
                               className={'focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                    </div>
                </div>
                <button type={'submit'}
                        className={'bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-full text-center'}>Rezerviraj
                </button>
                <p className={'flex justify-end items-center gap-5 text-[#828282] w-full font-semibold'}>Rezervaciju
                    Pokreće <Image src={'/airbnb-logo.png'} className={'contrast-0'} alt={'Airbnb'} width={100}
                                   height={31}/></p>
            </form>
        </>
    )
}