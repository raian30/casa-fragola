import {FilledLink} from "@/app/(customerFacing)/[locale]/_components/Buttons";
import type { Metadata } from "next";
import {useLocale, useTranslations} from "next-intl";

export const metadata: Metadata = {
    title: "404 | This page does not exist",
    description: "Unfortunately, this page does not exist, return to the home page.",
}

export default function NotFound() {
    const t = useTranslations('NotFound')

    const localActive = useLocale()

    return(
        <section
            className={'px-4 md:px-16 xl:px-32 2xl:px-52 pb-10 lg:py-28 flex justify-center items-center flex-col h-screen'}>
            <div className={'text-[8rem] md:text-[12rem] flex justify-center items-center text-yellow'}>
                <h1 className={'pt-10'}>4</h1>
                <span className={'text-[#9c418d]'}>0</span>
                <h1 className={'pb-10'}>4</h1>
            </div>
            <p className={'text-xl mdtext-2xl text-center'}>{t('text')}</p>
            <FilledLink className={'mt-10'} href={`/${localActive}`}>{t('btn-text')}</FilledLink>
        </section>
    )
}