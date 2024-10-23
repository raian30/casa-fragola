'use client'
import Image from 'next/image'
import {useLocale, useTranslations} from "next-intl";
import Reservation from "@/app/[locale]/_components/Reservation";
import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "@/app/_trpc/client";
import {httpBatchLink} from "@trpc/client";
import RulesModal from "@/app/[locale]/_components/RulesModal";
import Gallery from "@/app/[locale]/_components/Gallery";

export default function Third() {
    const t = useTranslations('Third')

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url:  `/api/trpc`,
            })
        ]
    }))

    return (
        <section id={'gallery'} className="w-screen px-0 md:px-0 lg:px-12 xl:px-[5.5rem] 2xl:px-[7.5rem] pb-20">
            <div
                className="bg-[#F5F5F5] px-10 md:px-20 lg:px-12 xl:px-[5.5rem] 2xl:px-[7.5rem] py-20 flex flex-col gap-20">
                <div className={'flex flex-col gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-4')}</h1>
                    <h2 className={'text-xl md:text-[1.2rem] font-light'}>{t('opis-1')}</h2>
                    <RulesModal/>
                </div>
                <div className={'flex gap-2 lg:gap-8 justify-between overflow-hidden h-64 lg:h-auto'}>
                    <Image src={'/image4.png'} alt={'House image 4'} width={1100} height={505}
                           className={'object-cover w-[40%] mb-5 lg:mb-20'}/>
                    <Image src={'/image5.png'} alt={'House image 5'} width={794} height={505}
                           className={'object-cover w-[60%] mt-5 lg:mt-20'}/>
                </div>

                <div className={'flex flex-col gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-2')}</h1>
                    <h2 className={'text-xl md:text-[1.2rem] font-light sm:w-2/3 lg:w-1/2'}>{t('opis-2')}</h2>
                    <Gallery/>
                </div>
                <div className={'flex gap-2 lg:gap-8 justify-between overflow-hidden'}>
                    <div className={'flex flex-col justify-between items-end gap-2 md:gap-10'}>
                        <Image src={'/image6.png'} alt={'House image 6'} width={700} height={505}
                               className={'object-cover mt-5 lg:mt-20'}/>
                        <Image src={'/image7.png'} alt={'House image 7'} width={760} height={505}
                               className={'object-cover w-[90%] md:w-[70%]'}/>
                    </div>

                    <Image src={'/image8.png'} alt={'House image 8'} width={794} height={505} quality={100}
                           className={'object-cover w-[50%]'}/>
                </div>
                <trpc.Provider queryClient={queryClient} client={trpcClient}>
                    <QueryClientProvider client={queryClient}>
                        <Reservation/>
                    </QueryClientProvider>
                </trpc.Provider>
            </div>
        </section>
)
}