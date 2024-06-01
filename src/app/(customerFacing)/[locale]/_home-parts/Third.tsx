import {FilledLink} from "@/app/(customerFacing)/[locale]/_components/Buttons";
import Image from 'next/image'
import {useLocale, useTranslations} from "next-intl";
import Reservation from "@/app/(customerFacing)/[locale]/_components/Reservation";

export default function Third() {
    const t = useTranslations('Third')

    const localActive = useLocale()

    //https://www.airbnb.com/book/stays/1030204797174613452?numberOfAdults=1&numberOfChildren=2&checkin=2024-06-15&checkout=2024-07-13&productId=1030204797174613452
    //numberOfAdults
    //numberOfChildren
    //checkin
    //checkout

    return (
        <section className="w-screen px-0 md:px-0 lg:px-12 xl:px-[5.5rem] 2xl:px-[7.5rem] pb-20">
            <div className="bg-[#F5F5F5] px-10 md:px-20 lg:px-12 xl:px-[5.5rem] 2xl:px-[7.5rem] py-20 flex flex-col gap-20">
                <div className={'flex flex-col gap-10'}>
                    <h2 className={'text-xl md:text-[1.2rem] font-light'}>{t('opis-1')}</h2>
                    <FilledLink href={`/${localActive}`} className={'w-fit'}>{t('btn-text-1')}</FilledLink>
                </div>
                <div className={'flex gap-2 lg:gap-8 justify-between overflow-hidden h-64 lg:h-auto'}>
                    <Image src={'/image2.png'} alt={'House image'} width={760} height={505}
                           className={'object-cover w-[40%] mb-5 lg:mb-20'}/>
                    <Image src={'/image3.png'} alt={'House image'} width={794} height={505}
                           className={'object-cover w-[60%] mt-5 lg:mt-20'}/>
                </div>

                <div className={'flex flex-col gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-2')}</h1>
                    <h2 className={'text-xl md:text-[1.2rem] font-light sm:w-2/3 lg:w-1/2'}>{t('opis-2')}</h2>
                    <FilledLink href={`/${localActive}`} className={'w-fit'}>{t('btn-text-2')}</FilledLink>
                </div>
                <div className={'flex gap-2 lg:gap-8 justify-between overflow-hidden'}>
                    <div className={'flex flex-col justify-between items-end gap-2 md:gap-10'}>
                        <Image src={'/image3.png'} alt={'House image'} width={794} height={505}
                               className={'object-cove mt-5 lg:mt-20'}/>
                        <Image src={'/image2.png'} alt={'House image'} width={760} height={505}
                               className={'object-cover w-[90%] md:w-[70%]'}/>
                    </div>

                    <Image src={'/image2.png'} alt={'House image'} width={794} height={505}
                           className={'object-cover w-[50%]'}/>
                </div>

                <div className={'flex flex-col gap-32 justify-center items-center mt-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>{t('naslov-3')}</h1>
                    <div className={'flex flex-col gap-20 xl:gap-0 lg:flex-row justify-between items-start w-full'}>
                        <Reservation/>
                    </div>
                </div>
            </div>
        </section>
    )
}