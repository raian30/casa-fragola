import Link from "next/link";
import Image from 'next/image'
import {Locate, Mail, MapPin, Phone} from "lucide-react";

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
                <Link href={'/#nema'} className={'hover:text-yellow transition-all'}>Politika
                    privatnosti</Link>
                <Link href={'/#nema'} className={'hover:text-yellow transition-all'}>Politika
                    kolačića</Link>
            </div>
            <div
                className={'flex flex-col gap-6 justify-start lg:justify-center items-start lg:items-center w-[100%] lg:w-[24%]'}>
                <h1 className={'font-semibold text-lg'}>Linkovi</h1>
                <div className={'flex flex-col gap-4 justify-center items-center'}>
                    <Link href={'/'} className={'hover:text-yellow transition-all'}>Pocetna</Link>
                    <Link href={'#projects'}
                          className={'hover:text-yellow transition-all'}>Značajke</Link>
                    <Link href={'#services'}
                          className={'hover:text-yellow transition-all'}>Galerija</Link>
                    <Link href={'#skills'}
                          className={'hover:text-yellow transition-all'}>Atrakcije</Link>
                    <Link href={'#contact'}
                          className={'hover:text-yellow transition-all'}>Recenzije</Link>
                </div>
            </div>
            <div className={'flex flex-col gap-6 justify-start items-start w-[100%] lg:max-w-fit'}>
                <h1 className={'font-semibold text-lg text-start'}>Kontakt</h1>
                <div className={'flex flex-col gap-6 justify-start items-start'}>
                    <p>Mladen Radolović</p>
                    <Link target={'_blank'} href={'mailto:raian@raianmelon.com'}
                          className={'hover:text-yellow transition-all flex gap-4'}><MapPin/>Pršurići 18, 52463 Višnjan</Link>
                    <Link target={'_blank'} href={'mailto:raian@raianmelon.com'}
                          className={'hover:text-yellow transition-all flex gap-4'}><Mail/>info@casa-fragola.com</Link>
                    <Link target={'_blank'} href={'tel:+385919810766'}
                          className={'hover:text-yellow transition-all flex gap-4'}><Phone/>+385 91 000 0000</Link>
                </div>
            </div>
        </div>
    )
}