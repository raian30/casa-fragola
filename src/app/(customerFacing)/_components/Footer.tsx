import Link from "next/link";
import Image from 'next/image'
import {Mail, MapPin, Phone} from "lucide-react";

export default function Footer() {
    const date = new Date()
    let year = date.getFullYear()

    return (
        <div
            className={'bg-[#F5F5F5] flex flex-wrap justify-between items-start gap-8 lg:gap-0 py-8 px-10 md:px-20 lg:px-24 xl:px-44 2xl:px-60'}>
            <div className={'flex flex-col justify-start items-start gap-5 w-[100%] lg:w-[24%]'}>
                <Link href={'/'}>
                    <Image src={'logo.svg'}
                           alt={'Logo Casa Fragola'} width={120} height={120}/>
                </Link>
                <p>Copyright {year} Casa Fragola. Sva prava pridržana</p>
                <Link href={'/#nema'} className={'hover:text-gray-500 transition-all'}>Politika
                    privatnosti</Link>
                <Link href={'/#nema'} className={'hover:text-gray-500 transition-all'}>Politika
                    kolačića</Link>
            </div>
            <div
                className={'flex flex-col gap-6 justify-start lg:justify-center items-start lg:items-center w-[100%] lg:w-[24%]'}>
                <h1 className={'font-semibold text-lg'}>Linkovi</h1>
                <div className={'flex flex-col gap-4 justify-center items-center'}>
                    <Link href={'/'} className={'hover:text-gray-500 transition-all'}>Pocetna</Link>
                    <Link href={'#projects'}
                          className={'hover:text-gray-500 transition-all'}>Značajke</Link>
                    <Link href={'#services'}
                          className={'hover:text-gray-500 transition-all'}>Galerija</Link>
                    <Link href={'#skills'}
                          className={'hover:text-gray-500 transition-all'}>Atrakcije</Link>
                    <Link href={'#contact'}
                          className={'hover:text-gray-500 transition-all'}>Recenzije</Link>
                </div>
            </div>
            <div className={'flex flex-col gap-6 justify-start items-start w-[100%] lg:max-w-fit'}>
                <h1 className={'font-semibold text-lg text-start'}>Kontakt</h1>
                <div className={'flex flex-col gap-6 justify-start items-start'}>
                    <p>Mladen Radolović</p>
                    <Link target={'_blank'} href={'https://www.google.com/maps/place/Casa+Fragola/@45.2330496,13.7098128,19z/data=!4m9!3m8!1s0x477ca30028ef1679:0xc1fe4524a1c57395!5m2!4m1!1i2!8m2!3d45.2330933!4d13.7099127!16s%2Fg%2F11vprjfr95?entry=ttu'}
                          className={'hover:text-gray-500 transition-all flex gap-4'}><MapPin/>Pršurići 18, 52463 Višnjan</Link>
                    <Link target={'_blank'} href={'info@casa-fragola.com'}
                          className={'hover:text-gray-500 transition-all flex gap-4'}><Mail/>info@casa-fragola.com</Link>
                    <Link target={'_blank'} href={'tel:+385910000000'}
                          className={'hover:text-gray-500 transition-all flex gap-4'}><Phone/>+385 91 000 0000</Link>
                </div>
            </div>
        </div>
    )
}