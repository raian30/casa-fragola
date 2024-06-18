'use client';

import {Suspense, useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {PencilLine, Trash2} from "lucide-react";
import {trpc} from "@/app/_trpc/client";

export default function Home() {
    const router = useRouter();
    const occupiedDatesQuery = trpc.GetOccupiedDates.useQuery();
    let occupiedDates

    useEffect(() => {
        if(occupiedDatesQuery.data) {
            occupiedDates = occupiedDatesQuery.data;
        }
        console.log(occupiedDates)
    })

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const login = searchParams.get('login');
        if (login === "success") {
            toast.success("Uspješno ste se prijavili u CMS!");
            router.replace('/cms');
        }

        const occupied = searchParams.get('occupied');
        if (occupied === "success") {
            toast.success("Uspješno ste se zauzeli datum!");
            router.replace('/cms');
        }
    }, [router]);

    return (
        <>
                <main className="flex bg-[#F5F5F5] min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
                    <section className={'flex flex-col gap-10'}>
                        <div className={'flex flex-col gap-5 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center'}>
                            <h1 className={'text-2xl'}>Zauzeti datumi</h1>
                            <Link href={'/cms/occupy-date'} className={'bg-[#B96DA8] px-6 py-2.5 text-white rounded-lg hover:bg-opacity-70 transition-all'}>Zauzmi novi datum</Link>
                        </div>
                        <div className={'flex flex-col gap-5'}>
                            <Suspense fallback={<div>Loading...</div>}>
                                {occupiedDates && occupiedDates.map((date, index) => (
                                    <div key={index}
                                         className={'flex justify-between bg-gray-50 hover:bg-gray-100 transition-all rounded-xl py-5 px-5 shadow-[0px_0px_10px_-5px_#404040]'}>
                                        <h1>{date.range.split(':')[0]} - {date.range.split(':')[1]}</h1>
                                        <div className={'flex gap-7 justify-center items-center'}>
                                            <Trash2
                                                className={'text-gray-600 rounded-md transition-all hover:cursor-pointer hover:text-red-500'}/>
                                            <PencilLine
                                                className={'text-gray-600 transition-all hover:cursor-pointer hover:text-blue-500'}/>
                                        </div>
                                    </div>
                                ))}
                            </Suspense>
                        </div>
                    </section>
                </main>
            <ToastContainer position="bottom-right" theme="colored"/>
        </>
    )
}
