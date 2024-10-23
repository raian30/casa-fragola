'use client'
import {de, enUS, fr, hr, it} from "date-fns/locale";
import {DateRange} from "react-date-range";
import {useLocale, useTranslations} from "next-intl";
import {FormEvent, useEffect, useState, useTransition} from "react";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {LoaderCircle, MinusCircle, PlusCircle} from "lucide-react";
import {trpc} from "@/app/_trpc/client";

import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Reservation() {
    const [isPending, startTransition] = useTransition()
    let occupiedDates = trpc.GetOccupiedDates.useQuery();
    const CreateReservationMutation  = trpc.CreateReservation.useMutation()
    const SendEmail = trpc.NewReservationEmail.useMutation()

    const localActive = useLocale()
    const t = useTranslations('Third')

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false)

    const [numberOfAdults, setNumberOfAdults] = useState<number>(0)
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0)
    const [numberOfInfants, setNumberOfInfants] = useState<number>(0)

    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    let errorOccurred = false;

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            disabled: false,
            key: 'selection'
        }
    ])

    const disabledRanges: string[] = [];

    const disabledDates: Date[] = [];

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //U disabledDates array stavlja svaki dostupan datum koji je definiran u disabledRanges arrayu i gleda da li je u proslosti
    function processRange(range: string) {
        let [start, end] = range.split(':');

        let startDate = new Date(start.split('.').reverse().join('-'));

        let [endDay, endMonth, endYear] = end.split('.').map(Number);
        let endDate = new Date(endYear, endMonth - 1, endDay);

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            //@ts-ignore
            disabledDates.push(d);
        }
    }

    const getDisabledDates = () => {
        if (!occupiedDates.isLoading && occupiedDates) {
            occupiedDates?.data?.items.forEach(date => {
                disabledRanges.push(date.range);
            });
            if(disabledRanges.length > 0){
                disabledRanges.forEach(range => processRange(range));
            }
            return disabledDates;
        } else {
            return [new Date()];
        }
    }
    let WantedRangeArray: Date[] = []

    //gleda da li je selected range dostupan i da li je selektano manje od 7 dana
    const ValidateRange = () => {
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
            if(disabledDates.includes(date)) {
                setError(t('error-datum-nije-dostupan'))
                errorOccurred = true;
            }
        })

        if (!errorOccurred) setError('')
    }


    useEffect(() => {
        ValidateRange()
    }, [dateRange]);

    const ValidatePersonNumber = (numberOfAdults: number, numberOfChildren: number, numberOfInfants: number) => {
        if ((numberOfChildren + numberOfAdults + numberOfInfants) > 4) {
            return setWarning(t('error-previse-ljudi'))
        }

        if ((numberOfChildren + numberOfAdults + numberOfInfants) <= 0) {
            return setWarning(t('error-premalo-ljudi'))
        }
        return setWarning('')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        startTransition(async () => {
            setWarning('')

            e.preventDefault()

            ValidateRange()

            ValidatePersonNumber(numberOfAdults, numberOfChildren, numberOfInfants)

            if (error) {
                return
            }

            let warningOccured = false
            if(WantedRangeArray.length < 7) {
                warningOccured = true
                return setWarning(t('error-premalo-odabranih-dana'))
            }

            if(!name || !surname || !email || !phone) {
                warningOccured = true
                return setWarning(t('popunite-sva-polja'))
            }

            if(!termsAgreed) {
                warningOccured = true
                return setWarning(t('prihvatite-uvjete'))
            }

            if (warningOccured) {
                return
            }

            let checkin = dateRange[0].startDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [StartDay, StartMonth, StartYear] = checkin.split('.')

            let checkout = dateRange[0].endDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [EndDay, EndMonth, EndYear] = checkout.split('.')

            const rangeFormated = `${Number(StartDay)}.${Number(StartMonth)}.${Number(StartYear)}:${Number(EndDay)}.${Number(EndMonth)}.${Number(EndYear)}`

            const DateReturned = await CreateReservationMutation.mutateAsync({
                firstName: name,
                lastName: surname,
                email: email,
                phone: phone,
                //@ts-ignore
                checkIn: dateRange[0].startDate,
                //@ts-ignore
                checkOut: dateRange[0].endDate,
                adults: numberOfAdults,
                children: numberOfChildren,
                babies: numberOfInfants,
                range: rangeFormated
            }, {onSettled: () => {occupiedDates.refetch()}});

            if(DateReturned.id) {
                await SendEmail.mutateAsync({
                    id: DateReturned.id,
                    firstName: name,
                    lastName: surname,
                    email: email,
                });

                setName('')
                setSurname('')
                setEmail('')
                setPhone('')
                setDateRange([
                    {
                        startDate: new Date(Date.now()),
                        endDate: new Date(Date.now()),
                        disabled: false,
                        key: 'selection'
                    }
                ])
                setNumberOfAdults(0)
                setNumberOfChildren(0)
                setNumberOfInfants(0)
                setSuccess(t('rezervirano'))
            }
        })

    }

    return (
        <div id={'reservation'} className={'flex flex-col gap-24 justify-center items-center mt-10'}>
            <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-3')}</h1>
            <div className={'flex flex-col gap-20 xl:gap-0 lg:flex-row justify-between items-start w-full'}>
                <div className={'flex flex-col w-full lg:w-2/5 gap-10'}>
                    {occupiedDates.isLoading ? (
                        <div className={'w-full h-[550px] bg-gray-200 rounded-xl animate-pulse'}></div>
                    ) : (
                        <DateRange
                            className={'shadow-[0px_0px_20px_1px_#c9c9c9] w-full rounded-md'}
                            minDate={new Date(Date.now())}
                            rangeColors={['#b96da8', '#b96da8', '#b96da8']}
                            // @ts-ignore
                            disabledDates={getDisabledDates()}

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
                                //@ts-ignore
                                if(item.selection.startDate.getDay() == 6 && item.selection.endDate.getDay() == 6) {
                                    //@ts-ignore
                                    return setDateRange([item.selection])
                                } else {
                                    toast.error(t('error-samo-od-subote'))
                                }
                            }}
                            ranges={dateRange}
                        />
                    )}
                    <div
                        className={'flex flex-col sm:flex-row sm:flex-wrap gap-5 justify-start sm:justify-between items-start sm:items-center'}>
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
                <form onSubmit={handleSubmit} className={'flex flex-col gap-14 w-full lg:max-w-[50%]'}>
                    <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                        <div className={'w-full sm:w-1/2'}>
                            <label htmlFor="name" className={'text-gray-700 text-sm mb-4'}>{t('ime')}</label>
                            <input required={true}
                                   id={'name'}
                                   value={name}
                                   onChange={e => {setName(e.target.value)}}
                                   name={'name'} type="text"
                                   className={'border-r-0 outline-0 bg-transparent border-b border-black pt-1 pb-2.5 w-full'}/>
                        </div>
                        <div className={'w-full sm:w-1/2'}>
                            <label htmlFor="surname" className={'text-gray-700 text-sm mb-4'}>{t('prezime')}</label>
                            <input required={true}
                                   id={'surname'}
                                   value={surname}
                                   onChange={e => {setSurname(e.target.value)}}
                                   name={'surname'} type="text"
                                   className={'border-r-0 outline-0 bg-transparent border-b border-black pt-1 pb-2.5 w-full'}/>
                        </div>
                    </div>
                    <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                        <div className={'w-full sm:w-1/2'}>
                            <label htmlFor="email" className={'text-gray-700 text-sm mb-4'}>E-mail</label>
                            <input required={true}
                                   id={'email'}
                                   value={email}
                                   onChange={e => {setEmail(e.target.value)}}
                                   name={'email'} type="email"
                                   className={'border-r-0 outline-0 bg-transparent border-b border-black pt-1 pb-2.5 w-full'}/>
                        </div>
                        <div className={'w-full sm:w-1/2'}>
                            <label htmlFor="phone" className={'text-gray-700 text-sm mb-4'}>{t('telefon')}</label>
                            <input required={true}
                                   id={'phone'}
                                   value={phone}
                                   onChange={e => {setPhone(e.target.value)}}
                                   name={'phone'} type="text"
                                   className={'border-r-0 outline-0 bg-transparent border-b border-black pt-1 pb-2.5 w-full'}/>
                        </div>
                    </div>
                    <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                        <div className={'space-y-2 w-full sm:w-1/2'}>
                            <label htmlFor="checkIn" className={'text-gray-700 text-sm mb-4'}>{t('dolazak')}</label>
                            <input required={true} disabled
                                   value={dateRange[0].startDate.toLocaleDateString('hr-HR').toString()}
                                   id={'checkIn'}
                                   name={'checkIn'} type="text"
                                   className={'border-r-0 outline-0 border-b bg-gray-200 border-black p-2.5 w-full'}/>
                        </div>
                        <div className={'space-y-2 w-full sm:w-1/2'}>
                            <label htmlFor="checkOut" className={'text-gray-700 text-sm pb-4'}>{t('odlazak')}</label>
                            <input required={true} disabled
                                   value={dateRange[0].endDate.toLocaleDateString('hr-HR').toString()}
                                   id={'checkOut'}
                                   name={'checkOut'} type="text"
                                   className={'border-r-0 outline-0 border-b bg-gray-200 border-black p-2.5 w-full'}/>
                        </div>
                    </div>
                    <div className={'flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start justify-between'}>
                        <div className={'flex flex-col justify-center items-center w-full sm:w-fit'}>
                            <label htmlFor="numberOfAdults"
                                   className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-odraslih')}</label>
                            <div className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfAdults >= 1) {
                                        setNumberOfAdults(prevNumberOfAdults => {
                                            ValidatePersonNumber(prevNumberOfAdults - 1, numberOfChildren, numberOfInfants);
                                            return prevNumberOfAdults - 1;
                                        });
                                    }
                                }}>
                                    <MinusCircle strokeWidth={1}
                                                 className={'hover:text-[#854276] transition-all mt-2'}/>
                                </div>
                                <input disabled required={true} type={'text'} id={'numberOfAdults'} name={'numberOfAdults'} min={0}
                                       value={numberOfAdults}
                                       className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfAdults <= 3) {
                                        setNumberOfAdults(prevNumberOfAdults => {
                                            ValidatePersonNumber(prevNumberOfAdults + 1, numberOfChildren, numberOfInfants);
                                            return prevNumberOfAdults + 1;
                                        });
                                    }
                                }}>
                                    <PlusCircle strokeWidth={1}
                                                className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col justify-center items-center w-full sm:w-fit'}>
                            <label htmlFor="numberOfChildren"
                                   className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-djece')}</label>
                            <div className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfChildren >= 1) {
                                        setNumberOfChildren(prevNumberOfChildren => {
                                            ValidatePersonNumber(numberOfAdults, prevNumberOfChildren - 1, numberOfInfants);
                                            return prevNumberOfChildren - 1;
                                        });
                                    }
                                }}>
                                    <MinusCircle strokeWidth={1}
                                                 className={'hover:text-[#854276] transition-all mt-2'}/>
                                </div>
                                <input disabled required={true} type={'text'} id={'numberOfChildren'} min={0}
                                       name={'numberOfChildren'}
                                       value={numberOfChildren}
                                       className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfChildren <= 3) {
                                        setNumberOfChildren(prevNumberOfChildren => {
                                            ValidatePersonNumber(numberOfAdults, prevNumberOfChildren + 1, numberOfInfants);
                                            return prevNumberOfChildren + 1;
                                        });
                                    }
                                }}>
                                    <PlusCircle strokeWidth={1}
                                                className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col justify-center items-center w-full sm:w-fit'}>
                            <label htmlFor="numberOfInfants"
                                   className={'text-gray-700 text-sm w-full mb-2'}>{t('broj-beba')}</label>
                            <div className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfInfants >= 1) {
                                        setNumberOfInfants(prevNumberOfInfants => {
                                            ValidatePersonNumber(numberOfAdults, numberOfChildren, prevNumberOfInfants - 1);
                                            return prevNumberOfInfants - 1;
                                        });
                                    }
                                }}>
                                    <MinusCircle strokeWidth={1}
                                                 className={'hover:text-[#854276] transition-all mt-2'}/>
                                </div>
                                <input disabled required={true} type={'text'} id={'numberOfInfants'} name={'numberOfInfants'} min={0}
                                       value={numberOfInfants}
                                       className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                <div className={'cursor-pointer'} onClick={() => {
                                    if (numberOfInfants <= 3) {
                                        setNumberOfInfants(prevNumberOfInfants => {
                                            ValidatePersonNumber(numberOfAdults, numberOfChildren, prevNumberOfInfants + 1);
                                            return prevNumberOfInfants + 1;
                                        });
                                    }
                                }}>
                                    <PlusCircle strokeWidth={1}
                                                className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                        <div className={'flex sm:items-center'}>
                            <input id="checkbox" checked={termsAgreed} onChange={() => setTermsAgreed(prev => !prev)} type="checkbox" value=""
                                   className="cursor-pointer w-4 h-4 mt-[4px] sm:mt-0 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                            <label htmlFor="checkbox"
                                   className="cursor-pointer ml-2 font-medium text-gray-700">{t('slazem-se')} <a href="#" className="text-[#B96DA8] hover:underline">{t('odredbama-i-uvjetima')}</a>.</label>
                        </div>
                    </div>
                    <button disabled={!!error || isPending} type={'submit'}
                            className={'disabled:bg-gray-200 disabled:cursor-auto cursor-pointer bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-full text-center flex justify-center items-center'}>
                        {isPending ? (
                            <LoaderCircle className={'text-gray-600 transition-all animate-spin'}/>
                        ) : (
                            t('rezerviraj')
                        )}
                    </button>
                    {(error || warning) && (
                        <p className={`text-red-500 ${!error && !warning && 'my-3'}`}>{error || warning}</p>

                    )}
                    {(success) && (
                        <p className={`text-[#007e00] bg-[#d7ffd7] p-5`}>{success}</p>
                    )}
                </form>
            </div>
            <ToastContainer position="bottom-right" theme="colored"/>
        </div>
    )
}