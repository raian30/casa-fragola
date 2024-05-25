import Image from 'next/image'
import {CircleArrowDown} from "lucide-react";

export default function Hero() {
    return (
        <div>
            <div className={'relative px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 h-[calc(100vh-120px)] w-screen'}>
                <Image src={'/hero-image.png'} className={'object-cover !relative'} quality={100} alt={'Slika kuce'} fill />
                <h1 className={'z-10 absolute bottom-12 left-12 md:left-20 lg:left-24 xl:left-44 2xl:left-60 text-[#FFF1DD] font-[200] md:font-[150] text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] leading-normal lg:leading-[7rem] text-center sm:text-start'}>Udobnost<br/> Istarske Baštine</h1>
                <div className={'z-10 absolute bottom-4 md:bottom-[5rem] right-12 md:right-20 lg:right-24 xl:right-44 2xl:right-60 text-[#FFF1DD] inline-flex gap-5 justify-center items-center'}>
                    <p className={'sm:block hidden'}>Pogledajte više</p>
                    <CircleArrowDown strokeWidth={1} size={40} />
                </div>
            </div>
        </div>
    )
}