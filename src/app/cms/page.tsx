'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const router = useRouter();
    const login = useSearchParams().get('login');

    useEffect(() => {
        if (login === "success") {
            toast.success("Uspješno ste se prijavili u CMS!");
            router.replace('/cms');
        }
    }, [login]);

    return (
      <main className="flex bg-[#F5F5F5] flex-col items-center justify-center h-[calc(100dvh-120px)] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-screen">
          <h1 className={'text-2xl'}>CMS homepage</h1>
          <ToastContainer position="bottom-right" theme="light" />
      </main>
    );
}
