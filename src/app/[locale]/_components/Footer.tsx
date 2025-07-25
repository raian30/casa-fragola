import Link from "next/link";
import Image from 'next/image'
import {Mail, MapPin, Phone} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";

export default function Footer() {
    const date = new Date()
    let year = date.getFullYear()

    const t = useTranslations('Footer')

    const localActive = useLocale()

    return (
        <div
            className={'bg-[#F5F5F5] flex flex-col gap-14 justify-center items-center py-8'}>
            <div className={'w-full flex flex-wrap justify-between items-start gap-8 lg:gap-0 px-10 md:px-20 lg:px-24 xl:px-44 2xl:px-60'}>
                <div className={'flex flex-col justify-start items-start gap-5 w-[100%] lg:w-[24%]'}>
                    <Link href={`/${localActive}#home`}>
                        <Image src={'/logo.svg'}
                               alt={'Logo Casa Fragola'} width={122} height={54}/>
                    </Link>
                    <p>Copyright {year} {t('copy')}</p>
                    <Link href={`/${localActive}/politika-privatnosti`}
                          className={'hover:text-gray-500 transition-all'}>{t('politika-privatnosti')}</Link>
                    <Link href={`/${localActive}/uvjeti`}
                          className={'hover:text-gray-500 transition-all'}>Uvjeti i odredbe</Link>
                </div>
                <div
                    className={'flex flex-col gap-6 justify-start lg:justify-center items-start lg:items-center w-[100%] lg:w-[24%]'}>
                    <h1 className={'font-semibold text-lg'}>{t('linkovi')}</h1>
                    <div className={'flex flex-col gap-4 lg:justify-center lg:items-center'}>
                        <Link href={`/${localActive}#home`}
                              className={'hover:text-gray-500 transition-all'}>{t('pocetna')}</Link>
                        <Link href={`/${localActive}#attractions`}
                              className={'hover:text-gray-500 transition-all'}>{t('atrakcije')}</Link>
                        <Link href={`/${localActive}#features`}
                              className={'hover:text-gray-500 transition-all'}>{t('znacajke')}</Link>
                        <Link href={`/${localActive}#gallery`}
                              className={'hover:text-gray-500 transition-all'}>{t('galerija')}</Link>
                        <Link href={`/${localActive}#reservation`}
                              className={'hover:text-gray-500 transition-all'}>{t('rezervacije')}</Link>
                    </div>
                </div>
                <div className={'flex flex-col gap-6 justify-start items-start w-[100%] lg:max-w-fit'}>
                    <h1 className={'font-semibold text-lg text-start'}>{t('kontakt')}</h1>
                    <div className={'flex flex-col gap-6 justify-start items-start'}>
                        <p>Mladen Radolović</p>
                        <Link target={'_blank'}
                              href={'https://www.google.com/maps/place/Casa+Fragola/@45.2330496,13.7098128,19z/data=!4m9!3m8!1s0x477ca30028ef1679:0xc1fe4524a1c57395!5m2!4m1!1i2!8m2!3d45.2330933!4d13.7099127!16s%2Fg%2F11vprjfr95?entry=ttu'}
                              className={'hover:text-gray-500 transition-all flex gap-4'}><MapPin/>Pršurići 16, 52463
                            Višnjan</Link>
                        <Link target={'_blank'} href={'mailto:mladen.radolovic@gmail.com'}
                              className={'hover:text-gray-500 transition-all flex gap-4'}><Mail/>mladen.radolovic@gmail.com</Link>
                    </div>
                </div>
            </div>
            <Link href={'https://fist.agency'} target={'_blank'}>
                <Image src={'/watermark.svg'} width={'271'} height={'22'} alt={'Created by Fist Agency'}/>
            </Link>
        </div>
    )
}