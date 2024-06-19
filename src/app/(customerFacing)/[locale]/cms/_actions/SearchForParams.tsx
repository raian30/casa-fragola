'use client'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

export function SearchForParams({children}: {children: ReactNode}) {
    const router = useRouter();

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

        const deleted = searchParams.get('deleted');
        if (deleted === "success") {
            toast.success("Uspješno ste se izbrisali zauzeti datum!");
            router.replace('/cms');
        }
    }, [router]);

    return (
        <>
            {children}
            <ToastContainer position="bottom-right" theme="colored"/>
        </>
    )
}