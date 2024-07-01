'use client'

import {ArrowDownUp, Check, ExternalLink, LoaderCircle, PencilLine, Trash2, X} from "lucide-react";
import Link from "next/link";
import {trpc} from "@/app/_trpc/client";
import {useState, useTransition} from "react";

export default function Reservations() {
    const [sortBy, setSortBy] = useState<'desc' | 'asc'>('desc');
    const [isPending, startTransition] = useTransition()

    let Reservations = trpc.GetReservations.useInfiniteQuery({limit: 5, sortBy}, {getNextPageParam: (lastPage) => lastPage.nextCursor});

    const GetMoreReservations = () => {
        startTransition(async () => {
            await Reservations.fetchNextPage()
        })
    }

    const ChangeSortBy = () => {
        setSortBy(prev => (prev == 'desc' ? 'asc' :  'desc'))
    }

    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'px-5 pb-2 w-full border-b border-b-gray-600'}>
                <button onClick={() => ChangeSortBy()} className={`transition-all ${sortBy == 'asc' ? 'rotate-180' : 'rotate-0'}`}>
                    <ArrowDownUp className={'text-gray-600 hover:text-[#B96DA8]'}/>
                </button>
            </div>
            {Reservations.isLoading ? (
                <Fallback/>
            ): (
                Reservations.data && Reservations.data.pages[0].items.length > 0 ? Reservations.data?.pages.map(page => (
                    page.items.map(date => (
                        <Link key={date.id} href={`/cms/reservation/${date.id}`}
                             className={`group flex justify-between ${date.status == 'ACCEPTED' ? 'bg-gray-50 hover:bg-green-50' : 'bg-gray-50 hover:bg-red-50'} hover:cursor-pointer transition-all rounded-xl p-5 shadow-[0px_0px_10px_-5px_#404040]`}>
                            <div className={'relative flex gap-2 justify-center items-center'}>
                                {date.status == 'ACCEPTED' ? (
                                    <div className={'h-fit group'}>
                                        <div
                                            className={'opacity-0 select-none group-hover:select-auto group-hover:opacity-100 transition-all absolute px-5 py-2.5 -top-12 left-0 rounded-lg drop-shadow-lg bg-green-50 text-green-600'}>Prihvaćeno
                                        </div>
                                        <Check className={'text-green-600 cursor-pointer'}/>
                                    </div>
                                ) : (
                                    <div className={'h-fit group'}>
                                        <div
                                            className={'opacity-0 select-none group-hover:select-auto group-hover:opacity-100 transition-all absolute px-5 py-2.5 -top-12 left-0 rounded-lg drop-shadow-lg bg-red-50 text-red-600'}>Odbijeno
                                        </div>
                                        <X className={'text-red-600 cursor-pointer'}/>
                                    </div>
                                )}
                                <h1>
                                    {new Date(date.checkIn).getDate()}.{new Date(date.checkIn).getMonth() + 1}.{new Date(date.checkIn).getFullYear()} - {new Date(date.checkOut).getDate()}.{new Date(date.checkOut).getMonth() + 1}.{new Date(date.checkOut).getFullYear()}
                                </h1>
                                <h1>{date.firstName} {date.lastName}</h1>
                            </div>
                            <ExternalLink
                                className={'text-gray-600 transition-all hover:cursor-pointer group-hover:text-black'}/>
                        </Link>
                    ))
                )) : <div>
                    <h1 className={'w-full h-[40vh] flex justify-center items-center text-2xl'}>Nema rezervacija</h1>
                </div>
            )}
            {(Reservations.hasNextPage) && (
                <button disabled={isPending}
                        onClick={() => GetMoreReservations()}
                        className={'w-fit self-center px-6 py-2 border border-[#B96DA8] hover:bg-[#B96DA8] hover:text-white transition-all rounded-lg'}>
                    {isPending ? <LoaderCircle className={'text-white transition-all animate-spin'}/> : 'Učitajte više'}
                </button>
            )}
        </div>
    );
}

const Fallback = () => {
    return (
        <>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[300px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[250px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[300px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[250px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[300px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse px-6 py-2.5 h-[40px] w-[140px] self-center rounded-lg bg-gray-50 shadow-[0px_0px_10px_-5px_#404040]'}/>
        </>
    )
}