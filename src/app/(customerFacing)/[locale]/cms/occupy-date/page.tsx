'use client'
import {FormEvent, startTransition, Suspense, useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import {DateRange} from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {trpc} from "@/app/_trpc/client";
import {useRouter} from "next/navigation";

export default function OccupyDate() {
    const OccupyDateMutation  = trpc.OccupyDate.useMutation()
    const router = useRouter()

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            disabled: false,
            key: 'selection'
        }
    ])

    const disabeldRanges = ['1.6.2024:now', '22.6.2024:29.6.2024'];
    const disabledDates: Date[] = [];

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //U disabledDates array stavlja svaki dostupan datum koji je definiran u disabledRanges arrayu i gleda da li je u proslosti
    function processRange(range: string) {
        let [start, end] = range.split(':');

        let startDate = start === 'now' ? new Date() : new Date(start.split('.').reverse().join('-'));

        let endDate;
        if (end === 'now') {
            endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
        } else {
            let [endDay, endMonth, endYear] = end.split('.').map(Number);
            endDate = new Date(endYear, endMonth - 1, endDay);
        }

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            //@ts-ignore
            disabledDates.push(d.toLocaleDateString('hr-HR'));
        }
    }
    disabeldRanges.forEach(range => processRange(range));

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        startTransition(async() => {
            e.preventDefault()

            let checkin = dateRange[0].startDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [StartDay, StartMonth, StartYear] = checkin.split('.')

            let checkout = dateRange[0].endDate.toLocaleDateString('hr-HR').toString().replaceAll(" ", "")
            let [EndDay, EndMonth, EndYear] = checkout.split('.')

            const DateRangeFormatted = `${Number(StartDay)}.${Number(StartMonth)}.${Number(StartYear)}:${Number(EndDay)}.${Number(EndMonth)}.${Number(EndYear)}`

            try {
                const DateReturned = await OccupyDateMutation.mutateAsync({
                    range: DateRangeFormatted
                });

                if(DateReturned.id) {
                    router.push('/cms?occupied=success')
                }

            } catch (error: any) {
                if (error.data?.code === "UNAUTHORIZED") {
                    console.log('UNAUTHORIZED')
                }
            }

        })
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
                        <h1 className={'text-3xl'}>Zauzmite novi datum</h1>
                        <div className={'flex flex-col gap-20 xl:gap-0 lg:flex-row justify-between items-start w-full'}>
                            <div className={'flex flex-col w-full lg:w-2/5 gap-10'}>
                                <DateRange
                                    rangeColors={['#b96da8', '#b96da8', '#b96da8']}
                                    // @ts-ignore
                                    disabledDay={(date) => disabledDates.includes(date.toLocaleDateString('hr-HR'))}
                                    dateDisplayFormat='dd.MM.yyyy'
                                    onChange={item => {
                                        //@ts-ignore
                                        return setDateRange([item.selection])
                                    }}
                                    ranges={dateRange}
                                />
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
                                        <label htmlFor="checkIn"
                                               className={'text-gray-700 text-sm mb-4'}>Od</label>
                                        <input required={true} disabled
                                               value={dateRange[0].startDate.toLocaleDateString('hr-HR').toString()}
                                               id={'checkIn'}
                                               name={'checkIn'} type="text"
                                               className={'border-r-0 outline-0 border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                                    </div>
                                    <div className={'space-y-2 w-full sm:w-1/2'}>
                                        <label htmlFor="checkOut"
                                               className={'text-gray-700 text-sm pb-4'}>Do</label>
                                        <input required={true} disabled
                                               value={dateRange[0].endDate.toLocaleDateString('hr-HR').toString()}
                                               id={'checkOut'}
                                               name={'checkOut'} type="text"
                                               className={'border-r-0 outline-0 border-b bg-gray-200 border-black px-2.5 py-2.5 w-full'}/>
                                    </div>
                                </div>
                                <button type={'submit'}
                                        className={'disabled:bg-gray-200 disabled:cursor-auto cursor-pointer bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-full text-center'}>Zauzmi datum
                                </button>
                            </form>
                        </div>
                    </section>
                </main>
            <ToastContainer position="bottom-right" theme="colored"/>
        </>
    )
}