'use client';

import {Suspense, useEffect} from "react";
import { useRouter } from 'next/navigation';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const login = searchParams.get('login');

        if (login === "success") {
            toast.success("Uspješno ste se prijavili u CMS!");
            router.replace('/cms');
        }
    }, [router]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <main className="flex bg-[#F5F5F5] min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
                    <section className={'flex flex-col gap-10'}>
                        <div className={'flex gap-52 justify-between items-center'}>
                            <h1 className={'text-2xl'}>Zauzeti datumi</h1>
                            <Link href={'/cms/occupy-date'} className={'bg-[#B96DA8] px-6 py-2.5 text-white rounded-lg hover:bg-opacity-70 transition-all'}>Zauzmi novi datum</Link>
                        </div>
                        <div className={'flex flex-col gap-5'}>
                            <div className={'bg-gray-200 py-5 px-5'}>
                                <h1>28.6.2024 - 2.7.2024</h1>
                            </div>
                        </div>
                    </section>
                </main>
            </Suspense>
            <ToastContainer position="bottom-right" theme="colored" />
        </>
    );
}
