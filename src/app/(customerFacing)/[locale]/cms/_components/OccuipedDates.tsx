'use client'

import {PencilLine} from "lucide-react";
import {DeleteOccupiedDate} from "@/app/(customerFacing)/[locale]/cms/_actions/DeleteOccupiedDate";
import {getOccupiedDates} from "@/app/(customerFacing)/[locale]/cms/_actions/getOccupiedDates";

export default function OccupiedDates() {
    const {occupiedDates, error, isLoading} = getOccupiedDates()

    if(isLoading) {
        return <Fallback/>
    }

    return (
        <div className={'flex flex-col gap-5'}>
            {occupiedDates && occupiedDates.map((date) => (
                <div key={date.id}
                     className={'flex justify-between bg-gray-50 hover:bg-gray-100 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                    <h1>{date.range.split(':')[0]} - {date.range.split(':')[1]}</h1>
                    <div className={'flex gap-7 justify-center items-center'}>
                        <DeleteOccupiedDate id={date.id} />
                        <PencilLine
                            className={'text-gray-600 transition-all hover:cursor-pointer hover:text-blue-500'}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

const Fallback = () => {
    return (
        <div className={'flex flex-col gap-5'}>
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
        </div>
    )
}