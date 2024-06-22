'use client'

import {ArrowDownUp, LoaderCircle, PencilLine} from "lucide-react";
import {DeleteOccupiedDate} from "@/app/[locale]/cms/_actions/DeleteOccupiedDate";
import Link from "next/link";
import {trpc} from "@/app/_trpc/client";
import {useState, useTransition} from "react";

export default function OccupiedDates() {
    const [sortBy, setSortBy] = useState<'desc' | 'asc'>('desc');
    const [isPending, startTransition] = useTransition()

    let occupiedDates = trpc.GetOccupiedDates.useInfiniteQuery({limit: 5, sortBy}, {getNextPageParam: (lastPage) => lastPage.nextCursor});

    const GetMoreDates = () => {
        startTransition(async () => {
            await occupiedDates.fetchNextPage()
        })
    }

    const ChangeSortBy = () => {
        setSortBy(prev => (prev == 'desc' ? 'asc' :  'desc'))
    }

    if (occupiedDates.isLoading) {
        return <Fallback/>
    }

    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'px-5 pb-2 w-full border-b border-b-gray-600'}>
                <button onClick={() => ChangeSortBy()}>
                    <ArrowDownUp className={'hover:rotate-180 text-gray-600 hover:text-[#B96DA8] transition-all'}/>
                </button>
            </div>
            {occupiedDates.data && occupiedDates.data.pages[0].items.length > 0 ? occupiedDates.data?.pages.map(page => (
                page.items.map(date => (
                    <div key={date.id}
                         className={'flex justify-between bg-gray-50 hover:bg-gray-100 transition-all rounded-xl p-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                        <h1>{date.range.split(':')[0]} - {date.range.split(':')[1]}</h1>
                        <div className={'flex gap-7 justify-center items-center'}>
                            <DeleteOccupiedDate id={date.id}/>
                            <Link href={`/cms/occupy-date/edit/${date.id}`}>
                                <PencilLine
                                    className={'text-gray-600 transition-all hover:cursor-pointer hover:text-blue-500'}/>
                            </Link>
                        </div>
                    </div>
                ))
            )): <div>
                <h1 className={'w-full h-[40vh] flex justify-center items-center text-2xl'}>Nema zauzetih datuma</h1>
            </div>}
            {(occupiedDates.hasNextPage) && (
                <button disabled={isPending}
                        onClick={() => GetMoreDates()}
                        className={'w-fit self-center px-6 py-2 border border-[#B96DA8] hover:bg-[#B96DA8] hover:text-white transition-all rounded-lg'}>
                    {isPending ? <LoaderCircle className={'text-white transition-all animate-spin'}/> : 'Učitajte više'}
                </button>
            )}
        </div>
    );
}

const Fallback = () => {
    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'px-5 pb-2 w-full border-b border-b-gray-600'}>
                <button>
                    <ArrowDownUp className={'text-gray-600 hover:text-[#B96DA8] transition-all'}/>
                </button>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[150px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[150px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[150px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[150px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse flex justify-between bg-gray-50 hover:bg-gray-50 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                <div className={'bg-gray-200 w-[150px] h-[24px] rounded-md'}/>
                <div className={'flex gap-7 justify-center items-center'}>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                    <div className={'bg-gray-200 w-[24px] h-[24px] rounded-md'}/>
                </div>
            </div>
            <div
                className={'animate-pulse px-6 py-2.5 h-[40px] w-[140px] self-center rounded-lg bg-gray-50 shadow-[0px_0px_10px_-5px_#404040]'}/>
        </div>
    )
}