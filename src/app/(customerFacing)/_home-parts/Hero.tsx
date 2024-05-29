import Image from 'next/image'
import {CircleArrowDown} from "lucide-react";

export default function Hero() {
    return (
        <>
            <section className={'bg-[#F5F5F5] relative px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 h-[calc(100svh-20px)] w-screen'}>
                <Image loading={'eager'} priority={true} src={'/hero-image.png'} className={'object-cover !relative'} quality={100} alt={'Slika kuce'}
                       fill/>
                <h1 className={'z-10 absolute bottom-0 sm:bottom-12 top-0 sm:top-auto right-0 sm:right-auto left-0 m-auto md:m-0 w-fit h-fit sm:left-12 md:left-20 lg:left-24 xl:left-44 2xl:left-60 text-[#FFF1DD] font-[200] md:font-[150] text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] leading-normal lg:leading-[7rem] text-center sm:text-start'}>Udobnost<br/> Istarske
                    Baštine</h1>
                <div
                    className={'z-10 absolute bottom-4 md:bottom-[4rem] right-12 md:right-20 lg:right-24 xl:right-44 2xl:right-60 text-[#FFF1DD] inline-flex gap-5 justify-center items-center'}>
                    <p className={'sm:block hidden'}>Pogledajte više</p>
                    <CircleArrowDown strokeWidth={1} size={40}/>
                </div>
            </section>
            <section className={'bg-[#F5F5F5] w-screen px-10 md:px-20 lg:px-24 xl:px-44 2xl:px-60 py-20'}>
                <h2 className={'text-xl md:text-[1.4rem] font-light'}>Želite li miran i opušten odmor
                    daleko od gužve, ali i blizu događanja, zabave, ukusne hrane i vrhunskih vina koje Istra nudi?
                    Ovdje možete pronaći savršen spoj odmora i uživanja u svemu što Istra pruža!</h2>
            </section>
        </>
    )
}