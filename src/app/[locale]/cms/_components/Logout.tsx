'use client'
import {signOut} from "next-auth/react";
import {ArrowLeft} from "lucide-react";
import {NavButton} from "@/app/[locale]/cms/_components/Nav";

export default function Logout() {
    return (
    <NavButton onClick={() => {signOut({ callbackUrl: '/', redirect:true })}} className={'text-black flex justify-center items-center gap-2 group translate-y-full opacity-0'} href={'/'} style={{
        animation: 'popupword 0.5s forwards',
        animationDelay: `${100}ms`
    }}><ArrowLeft className={'text-[#923E82] group-hover:-translate-x-1/3 transition-all'}/> Vratite se na početnu</NavButton>
    )
}