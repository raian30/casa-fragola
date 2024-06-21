import Image from 'next/image'
import {ArrowDown, CircleArrowDown} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";

export default function Hero() {
    const t = useTranslations('Hero')
    const localActive = useLocale()

    return (
        <>
            <section id={'home'} className={'bg-[#F5F5F5] relative px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 h-[calc(100svh-20px)] w-screen'}>
                <Image loading={'eager'} priority={true} src={'/hero-image.png'} className={'object-cover !relative'} quality={100} alt={'Slika kuce'}
                       fill/>
                <h1 className={'z-10 absolute bottom-0 sm:bottom-12 top-0 sm:top-auto right-0 sm:right-auto left-0 m-auto md:m-0 w-fit h-fit sm:left-12 md:left-20 lg:left-24 xl:left-44 2xl:left-60 text-[#FFF1DD] font-[200] md:font-[150] text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] leading-normal lg:leading-[7rem] text-center sm:text-start'}>{t('text-prvi-dio')}<br/> {t('text-drugi-dio')}</h1>
                <Link href={`/${localActive}#attractions`}
                    className={'group z-10 absolute bottom-4 md:bottom-[4rem] right-10 md:right-20 lg:right-24 xl:right-44 2xl:right-60 text-[#FFF1DD] inline-flex gap-5 justify-center items-center'}>
                    <p className={'sm:block hidden'}>{t('pogledajte-vise')}</p>
                    {/*<div className={'relative overflow-hidden'}>*/}
                    {/*    <ArrowDown className={'absolute -translate-y-full group-hover:translate-y-0 transition-all'} strokeWidth={1} size={40}/>*/}
                        <CircleArrowDown strokeWidth={1} size={40}/>
                    {/*</div>*/}
                </Link>
            </section>
            <section className={'bg-[#F5F5F5] w-screen px-10 md:px-20 lg:px-24 xl:px-44 2xl:px-60 py-20'}>
                <h2 className={'text-xl md:text-[1.4rem] font-light'}>{t('long-text')}</h2>
            </section>
        </>
    )
}