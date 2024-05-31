import Image from "next/image";
import {FilledLink} from "@/app/(customerFacing)/[locale]/_components/Buttons";
import {Bed, Flame, ParkingSquare, Wifi, Wind} from "lucide-react";
import {useTranslations} from "next-intl";

export default function Second() {
    const t = useTranslations('Second')

    return(
        <section className={'px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 w-screen my-20 flex flex-col gap-20'}>
            <div
                className={'bg-[#EAD7E6] gap-16 lg:gap-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-0 pt-8 md:pt-16 2xl:pt-28 pb-8 md:pb-16 2xl:pb-28 lg:pl-12 xl:pl-20 2xl:pl-32'}>
                <div className={'w-full h-full lg:w-1/2'}>
                    <Image src={'/image2.png'} alt={'House picture 1'} width={760} height={505}
                           className={'w-full h-full object-cover'}/>
                </div>
                <div
                    className={'w-full lg:w-1/2 text-center px-5 lg:px-10 xl:px-20 2xl:px-52 flex flex-col items-center justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-1')}</h1>
                    <p className={'text-lg font-light'}>{t('opis-1')}</p>
                    <FilledLink href={'/'}>{t('btn-text-1')}</FilledLink>
                </div>
            </div>
            <div
                className={'bg-[#EDE8B8] gap-16 lg:gap-0 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-0 pt-8 md:pt-16 2xl:pt-28 pb-8 md:pb-16 2xl:pb-28 lg:pr-12 xl:pr-20 2xl:pr-32'}>
                <div
                    className={'w-full lg:w-1/2 text-center px-5 lg:px-10 xl:px-20 2xl:px-52 flex flex-col items-center justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-2')}</h1>
                    <p className={'text-lg font-light'}>{t('opis-2')}</p>
                    <FilledLink href={'/'}>{t('btn-text-2')}</FilledLink>
                </div>
                <div className={'w-full h-full lg:w-1/2'}>
                    <Image src={'/image2.png'} alt={'House picture 2'} width={760} height={505}
                           className={'w-full h-full object-cover'}/>
                </div>
            </div>
            <div
                className={'gap-10 lg:gap-0 xl:gap-40 flex flex-col lg:flex-row items-center justify-between pt-0 md:pt-16 pb-0 md:pb-16 2xl:pb-28'}>
                <div
                    className={'w-full lg:w-1/2 px-6 md:px-12 xl:px-20 2xl:px-32 flex flex-col items-start justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-3')}</h1>
                    <p className={'text-lg font-light'}>{t('opis-3')}</p>
                    <FilledLink href={'/'} className={'text-sm'}>{t('btn-text-3')}</FilledLink>
                </div>
                <div className={'w-full h-full lg:w-1/2 px-6 md:px-12 lg:px-0 flex flex-col sm:flex-row gap-5 sm:gap-20'}>
                    <div className={'flex flex-col gap-5'}>
                        <div className={'flex gap-2'}><Bed/> <p>{t('znacajke-kreveti')}</p></div>
                        <div className={'flex gap-2'}><Image src={'/pool.svg'} width={23} height={23} alt={'pool'}/>
                            <p>{t('znacajke-bazen')}</p></div>
                        <div className={'flex gap-2'}><Wifi/> <p>{t('znacajke-wifi')}</p></div>
                    </div>
                    <div className={'flex flex-col gap-5'}>
                        <div className={'flex gap-2'}><ParkingSquare/> <p>{t('znacajke-parking')}</p></div>
                        <div className={'flex gap-2'}><Wind/> <p>{t('znacajke-klima')}</p></div>
                        <div className={'flex gap-2'}><Flame/> <p>{t('znacajke-rostilj')}</p></div>
                    </div>
                </div>
            </div>
        </section>
    )
}