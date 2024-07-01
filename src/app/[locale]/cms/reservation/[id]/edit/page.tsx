'use client'
import {FormEvent, useEffect, useState, useTransition} from "react";
import {ToastContainer} from "react-toastify";
import {Check, ChevronLeft, LoaderCircle, MinusCircle, PlusCircle, X} from "lucide-react";
import Link from "next/link";
import {DateRange} from "react-date-range";

import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {trpc} from "@/app/_trpc/client";
import {useRouter} from "next/navigation";
import {getOccupiedDates} from "@/app/[locale]/cms/_actions/getOccupiedDates";
import {hr} from "date-fns/locale";
import {EditReservationDropdown} from "@/app/[locale]/cms/_components/EditReservationDropdown";

export default function EditReservation({params: {id}}: {params: {id: string}}) {
    let {data: oldReservation, isLoading: oldIsLoading, refetch} = trpc.GetOneReservation.useQuery({id});
    let Reservations = trpc.GetReservations.useQuery();
    const EditReservationMutation  = trpc.EditReservation.useMutation()

    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    const [numberOfAdults, setNumberOfAdults] = useState<number>(0)
    const [numberOfChildren, setNumberOfChildren] = useState<number>(0)
    const [numberOfInfants, setNumberOfInfants] = useState<number>(0)

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            disabled: false,
            key: 'selection'
        }
    ])

    useEffect(() => {
        if(oldReservation){
            setName(oldReservation.firstName)
            setSurname(oldReservation.lastName)
            setEmail(oldReservation.email)
            setPhone(oldReservation.phone)

            setNumberOfAdults(oldReservation.adults)
            setNumberOfChildren(oldReservation.children)
            setNumberOfInfants(oldReservation.babies)

            setDateRange([
                {
                    startDate: new Date(oldReservation.checkIn),
                    endDate: new Date(oldReservation.checkOut),
                    disabled: false,
                    key: 'selection'
                }
            ])
        }
    }, [oldReservation]);

    const {occupiedDates, error, isLoading} = getOccupiedDates()

    const disabledRanges: string[] = [];

    const disabledDates: Date[] = [];

    useEffect(() => {

    }, []);

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
        if (!isLoading && occupiedDates && oldReservation) {
            occupiedDates?.items.forEach(date => {
                disabledRanges.push(date.range);
            });
            disabledRanges.forEach(range => processRange(range));

            let oldStart = new Date(oldReservation.checkIn);

            let oldEnd = new Date(oldReservation.checkOut);

            let dateArray = [];
            let currentDate = new Date(oldStart);

            while (currentDate <= oldEnd) {
                dateArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            let dateSet2 = new Set(dateArray.map(date => date.getTime()));

            return disabledDates.filter(date => !dateSet2.has(date.getTime()));

        } else {
            return [new Date()];
        }
    }

    const formatRange = () => {
        let checkin = dateRange[0].startDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "");
        let [StartDay, StartMonth, StartYear] = checkin.split('.');

        let checkout = dateRange[0].endDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "");
        let [EndDay, EndMonth, EndYear] = checkout.split('.');

        return `${Number(StartDay)}.${Number(StartMonth)}.${Number(StartYear)}:${Number(EndDay)}.${Number(EndMonth)}.${Number(EndYear)}`;
    };

    const [isPending, startTransition] = useTransition()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        startTransition(async () => {
            e.preventDefault()

            if (error) {
                return
            }

            const DateReturned = await EditReservationMutation.mutateAsync({
                id,
                status: oldReservation ? oldReservation.status : 'ACCEPTED',
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
                range: formatRange()
            }, {onSettled: () => {Reservations.refetch()}});

            if(DateReturned.id) {
                router.push('/cms?edited=success')
            }

        })
    }

    if(oldReservation === null) {
        return <main
            className="flex gap-10 bg-[#F5F5F5] min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
            <Link href={'/cms'}
                  className={'flex gap-2 group w-fit hover:gap-3 transition-all items-center justify-start'}>
                <ChevronLeft className={'text-[#923E82]'} size={30}/>
                <p className={'text-lg text-gray-600 group-hover:text-gray-800'}>Vratite se u CMS</p>
            </Link>
            <section
                className={'px-4 md:px-16 xl:px-32 2xl:px-52 pb-10 lg:py-28 flex justify-center items-center flex-col'}>
                <div className={'text-[8rem] md:text-[12rem] flex justify-center items-center text-yellow'}>
                    <h1 className={'pt-10'}>4</h1>
                    <span className={'text-[#9c418d]'}>0</span>
                    <h1 className={'pb-10'}>4</h1>
                </div>
                <p className={'text-xl mdtext-2xl text-center'}>Ova rezervacija ne postoji</p>
            </section>
        </main>
    }

    return (
        <>
            <main
                className="flex gap-10 bg-[#F5F5F5] min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
                <Link href={'/cms'} className={'flex gap-2 group w-fit hover:gap-3 transition-all items-center justify-start'}>
                    <ChevronLeft className={'text-[#923E82]'} size={30}/>
                    <p className={'text-lg text-gray-600 group-hover:text-gray-800'}>Vratite se u CMS</p>
                </Link>
                <section className={'flex flex-col gap-10'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'flex gap-4'}>
                            <div className={'flex flex-col gap-4'}>
                                <h1 className={'text-3xl'}>Rezervacija</h1>
                                {!oldIsLoading && oldReservation ? (
                                    <p className={'text-gray-600'}>{new Date(oldReservation.checkIn).getDate()}.{new Date(oldReservation.checkIn).getMonth() + 1}.{new Date(oldReservation.checkIn).getFullYear()} - {new Date(oldReservation.checkOut).getDate()}.{new Date(oldReservation.checkOut).getMonth() + 1}.{new Date(oldReservation.checkOut).getFullYear()}</p>
                                ) : (
                                    <div className={'h-[25px] w-[150px] bg-gray-200 rounded-md animate-pulse'}></div>
                                )}
                            </div>
                            {!oldIsLoading && oldReservation ? oldReservation.status == 'ACCEPTED' ? (
                                <div className={'mt-1 h-fit relative group'}>
                                    <div
                                        className={'opacity-0 group-hover:opacity-100 transition-all absolute px-5 py-2.5 -top-14 -translate-x-[36%] rounded-lg drop-shadow-lg bg-green-50 text-green-600'}>Prihvaćeno
                                    </div>
                                    <Check className={'text-green-600 cursor-pointer'} size={30}/>
                                </div>
                            ) : (
                                <div className={'mt-1 h-fit relative group'}>
                                    <div
                                        className={'opacity-0 group-hover:opacity-100 transition-all absolute px-5 py-2.5 -top-14 -translate-x-[36%] rounded-lg drop-shadow-lg bg-red-50 text-red-600'}>Odbijeno
                                    </div>
                                    <X className={'text-red-600 cursor-pointer'} size={30}/>
                                </div>
                            ) : (
                                <div className={'mt-1 h-[30px] w-[30px] bg-gray-200 rounded-md animate-pulse'}></div>
                            )}
                        </div>
                        {!oldIsLoading && oldReservation ? (
                            <EditReservationDropdown id={id} status={oldReservation.status} email={oldReservation.email} firstName={oldReservation.firstName} lastName={oldReservation.lastName} refetch={refetch} checkIn={dateRange[0].startDate} checkOut={dateRange[0].endDate} range={formatRange()}/>
                        ) : (
                            <div className={'h-[30px] w-[30px] bg-gray-200 rounded-md animate-pulse'}></div>

                        )}
                    </div>

                    <div className={'flex flex-col gap-20 xl:gap-0 lg:flex-row justify-between items-start w-full'}>
                        <div className={'flex flex-col w-full lg:w-2/5 gap-10'}>
                            {isLoading || oldIsLoading ? (
                                <div className={'w-full h-[650px] bg-gray-200 rounded-xl animate-pulse'}></div>
                            ) : (
                                <DateRange
                                    rangeColors={['#b96da8', '#b96da8', '#b96da8']}
                                    minDate={new Date(Date.now())}
                                    disabledDates={getDisabledDates()}
                                    dateDisplayFormat='dd.MM.yyyy'
                                    locale={hr}
                                    onChange={item => {
                                        //@ts-ignore
                                        return setDateRange([item.selection])
                                    }}
                                    ranges={dateRange}
                                />
                            )}
                            <div
                                className={'flex flex-col sm:flex-row sm:flex-wrap gap-5 justify-start sm:justify-between items-start sm:items-center'}>
                                <div className={'flex justify-center items-center gap-2'}>
                                    <div
                                        className={'size-10 rounded-xl bg-[#e8e6e6] shadow-[0px_0px_20px_-1px_#fff]'}/>
                                    <p>Nedostupno</p>
                                </div>
                                <div className={'flex justify-center items-center gap-2'}>
                                    <div className={'size-10 rounded-xl bg-[#FFFFFF] drop-shadow-2xl'}/>
                                    <p>Dostupno</p>
                                </div>
                                <div className={'flex justify-center items-center gap-2'}>
                                    <div className={'size-10 rounded-xl bg-[#B96DA8] drop-shadow-2xl'}/>
                                    <p>Odabrano</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className={'flex flex-col gap-14 w-full lg:max-w-[50%]'}>
                            <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="name" className={'text-gray-700 text-sm mb-4'}>Ime</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               id={'name'}
                                               value={name}
                                               onChange={e => {
                                                   setName(e.target.value)
                                               }}
                                               name={'name'} type="text"
                                               className={'border-r-0 bg-transparent outline-0 border-b border-black py-2.5 w-full'}/>
                                    )}
                                </div>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="surname"
                                           className={'text-gray-700 text-sm mb-4'}>Prezime</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               id={'surname'}
                                               value={surname}
                                               onChange={e => {
                                                   setSurname(e.target.value)
                                               }}
                                               name={'surname'} type="text"
                                               className={'border-r-0 bg-transparent outline-0 border-b border-black py-2.5 w-full'}/>
                                    )}
                                </div>
                            </div>
                            <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="email" className={'text-gray-700 text-sm mb-4'}>Email</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               id={'email'}
                                               value={email}
                                               onChange={e => {
                                                   setEmail(e.target.value)
                                               }}
                                               name={'email'} type="text"
                                               className={'border-r-0 bg-transparent outline-0 border-b border-black py-2.5 w-full'}/>
                                    )}
                                </div>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="phone"
                                           className={'text-gray-700 text-sm mb-4'}>Telefon</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               id={'phone'}
                                               value={phone}
                                               onChange={e => {
                                                   setPhone(e.target.value)
                                               }}
                                               name={'phone'} type="text"
                                               className={'border-r-0 bg-transparent outline-0 border-b border-black py-2.5 w-full'}/>
                                    )}
                                </div>
                            </div>
                            <div className={'flex flex-col sm:flex-row gap-10 items-start justify-start'}>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="checkIn"
                                           className={'text-gray-700 text-sm mb-4'}>Od</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               disabled={true}
                                               value={dateRange[0].startDate.toLocaleDateString('hr-HR').toString()}
                                               id={'checkIn'}
                                               name={'checkIn'} type="text"
                                               className={'border-r-0 bg-gray-200 outline-0 border-b border-black px-2.5 py-2.5 w-full'}/>
                                    )}
                                </div>
                                <div className={'space-y-2 w-full sm:w-1/2'}>
                                    <label htmlFor="checkOut"
                                           className={'text-gray-700 text-sm pb-4'}>Do</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <input required={true}
                                               disabled={true}
                                               value={dateRange[0].endDate.toLocaleDateString('hr-HR').toString()}
                                               id={'checkOut'}
                                               name={'checkOut'} type="text"
                                               className={'border-r-0 bg-gray-200 outline-0 border-b border-black px-2.5 py-2.5 w-full'}/>
                                    )}
                                </div>
                            </div>
                            <div className={'flex flex-col sm:flex-row gap-10 items-start justify-between'}>
                                <div className={'flex flex-col justify-center items-center w-full'}>
                                    <label htmlFor="numberOfAdults"
                                           className={'text-gray-700 text-sm w-full mb-2'}>Broj odraslih (&gt;=13
                                        god.)</label>
                                    <div className={'w-full'}>
                                        {isLoading || oldIsLoading ? (
                                            <div
                                                className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                        ) : (
                                            <div
                                                className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                                <div className={'cursor-pointer'} onClick={() => {
                                                    if (numberOfAdults >= 1) {
                                                        setNumberOfAdults(prevNumberOfAdults => {
                                                            return prevNumberOfAdults - 1;
                                                        });
                                                    }
                                                }}>
                                                    <MinusCircle strokeWidth={1}
                                                                 className={'hover:text-[#854276] transition-all mt-2'}/>
                                                </div>
                                                <input disabled required={true} type={'text'} id={'numberOfAdults'}
                                                       name={'numberOfAdults'} min={0}
                                                       value={numberOfAdults}
                                                       className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                                <div className={'cursor-pointer'} onClick={() => {
                                                    if (numberOfAdults <= 3) {
                                                        setNumberOfAdults(prevNumberOfAdults => {
                                                            return prevNumberOfAdults + 1;
                                                        });
                                                    }
                                                }}>
                                                    <PlusCircle strokeWidth={1}
                                                                className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={'flex flex-col justify-center items-center w-full'}>
                                    <label htmlFor="numberOfChildren"
                                           className={'text-gray-700 text-sm w-full mb-2'}>Broj djece (&lt;13
                                        god.)</label>
                                    <div className={'w-full'}>
                                        {isLoading || oldIsLoading ? (
                                            <div
                                                className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                        ) : (
                                            <div
                                                className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                                <div className={'cursor-pointer'} onClick={() => {
                                                    if (numberOfChildren >= 1) {
                                                        setNumberOfChildren(prevNumberOfChildren => {
                                                            return prevNumberOfChildren - 1;
                                                        });
                                                    }
                                                }}>
                                                    <MinusCircle strokeWidth={1}
                                                                 className={'hover:text-[#854276] transition-all mt-2'}/>
                                                </div>
                                                <input disabled required={true} type={'text'} id={'numberOfChildren'}
                                                       min={0}
                                                       name={'numberOfChildren'}
                                                       value={numberOfChildren}
                                                       className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                                <div className={'cursor-pointer'} onClick={() => {
                                                    if (numberOfChildren <= 3) {
                                                        setNumberOfChildren(prevNumberOfChildren => {
                                                            return prevNumberOfChildren + 1;
                                                        });
                                                    }
                                                }}>
                                                    <PlusCircle strokeWidth={1}
                                                                className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={'flex flex-col justify-center items-center w-full'}>
                                    <label htmlFor="numberOfInfants"
                                           className={'text-gray-700 text-sm w-full mb-2'}>Broj beba (&lt;2
                                        god.)</label>
                                    {isLoading || oldIsLoading ? (
                                        <div
                                            className={'px-2.5 py-2.5 h-[46px] w-full bg-gray-200 rounded-md animate-pulse'}/>
                                    ) : (
                                        <div className={'w-full sm:w-fit px-3 flex justify-center items-center gap-3'}>
                                            <div className={'cursor-pointer'} onClick={() => {
                                                if (numberOfInfants >= 1) {
                                                    setNumberOfInfants(prevNumberOfInfants => {
                                                        return prevNumberOfInfants - 1;
                                                    });
                                                }
                                            }}>
                                                <MinusCircle strokeWidth={1}
                                                             className={'hover:text-[#854276] transition-all mt-2'}/>
                                            </div>
                                            <input disabled required={true} type={'text'} id={'numberOfInfants'}
                                                   name={'numberOfInfants'} min={0}
                                                   value={numberOfInfants}
                                                   className={'border-r-0 outline-0 sm:max-w-10 text-center focus:outline-none focus:border-[#b96da8] border-b border-black px-2.5 py-2.5 bg-transparent w-full'}/>
                                            <div className={'cursor-pointer'} onClick={() => {
                                                if (numberOfInfants <= 3) {
                                                    setNumberOfInfants(prevNumberOfInfants => {
                                                        return prevNumberOfInfants + 1;
                                                    });
                                                }
                                            }}>
                                                <PlusCircle strokeWidth={1}
                                                            className={'hover:text-[#854276] hover:select-none transition-all mt-2'}/>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button disabled={!!error || isPending} type={'submit'}
                                    className={'disabled:bg-gray-200 disabled:cursor-auto cursor-pointer bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-full text-center flex justify-center items-center'}>
                                {isPending ? (
                                    <LoaderCircle className={'text-gray-600 transition-all animate-spin'}/>
                                ) : <p>Uredi</p>}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer position="bottom-right" theme="colored"/>
        </>
    )
}