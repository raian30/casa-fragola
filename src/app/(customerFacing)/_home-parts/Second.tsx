import Image from "next/image";
import {FilledLink} from "@/app/(customerFacing)/_components/Buttons";
import {Bed, Flame, ParkingSquare, Wifi, Wind} from "lucide-react";

export default function Second() {
    return(
        <section className={'px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 w-screen my-20 flex flex-col gap-20'}>
            <div
                className={'bg-[#EAD7E6] gap-16 lg:gap-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-8 md:px-12 lg:px-0 pt-12 md:pt-16 2xl:pt-28 pb-12 md:pb-16 2xl:pb-28 lg:pl-12 xl:pl-20 2xl:pl-32'}>
                <div className={'w-full h-full lg:w-1/2'}>
                    <Image src={'/image2.png'} alt={'House picture 1'} width={760} height={505}
                           className={'w-full h-full object-cover'}/>
                </div>
                <div
                    className={'w-full lg:w-1/2 text-center px-5 lg:px-10 xl:px-20 2xl:px-52 flex flex-col items-center justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>Fragola and white</h1>
                    <p className={'text-lg font-light'}>Do you want to enjoy your holiday in peace and sepration from
                        the rest of the world, and yet be close to events and entertainment and gastronomic and
                        oenological hedonism</p>
                    <FilledLink href={'/'} className={'uppercase'}>Rezervirajte sada</FilledLink>
                </div>
            </div>
            <div
                className={'bg-[#EDE8B8] gap-16 lg:gap-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-8 md:px-12 lg:px-0 pt-12 md:pt-16 2xl:pt-28 pb-12 md:pb-16 2xl:pb-28 lg:pr-12 xl:pr-20 2xl:pr-32'}>
                <div
                    className={'w-full lg:w-1/2 text-center px-5 lg:px-10 xl:px-20 2xl:px-52 flex flex-col items-center justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>Olive and Fragola</h1>
                    <p className={'text-lg font-light'}>Do you want to enjoy your holiday in peace and sepration from
                        the rest of the world, and yet be close to events and entertainment and gastronomic and
                        oenological hedonism</p>
                    <FilledLink href={'/'} className={'uppercase'}>Rezervirajte sada</FilledLink>
                </div>
                <div className={'w-full h-full lg:w-1/2'}>
                    <Image src={'/image2.png'} alt={'House picture 2'} width={760} height={505}
                           className={'w-full h-full object-cover'}/>
                </div>
            </div>
            <div
                className={'gap-10 lg:gap-32 xl:gap-40 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-0 pt-12 md:pt-16 2xl:pt-28 pb-12 md:pb-16 2xl:pb-28'}>
                <div
                    className={'w-full lg:w-1/2 px-0 lg:px-10 xl:px-20 2xl:px-28 flex flex-col items-start justify-center gap-10'}>
                    <h1 className={'text-4xl xl:text-5xl'}>Sadržaj</h1>
                    <p className={'text-lg font-light'}>Do you want to enjoy your holiday in peace and sepration from
                        the rest of the world, and yet be close to events and entertainment and gastronomic and
                        oenological hedonism</p>
                    <FilledLink href={'/'} className={'uppercase text-sm'}>Pogledajte sve značajke</FilledLink>
                </div>
                <div className={'w-full h-full lg:w-1/2 flex flex-col sm:flex-row gap-5 sm:gap-20'}>
                    <div className={'flex flex-col gap-5'}>
                        <div className={'flex gap-2'}><Bed/> <p>3 beds (1 double and 2 single)</p></div>
                        <div className={'flex gap-2'}><Image src={'/pool.svg'} width={23} height={23} alt={'pool'}/>
                            <p>Outdoor swimming pool</p></div>
                        <div className={'flex gap-2'}><Wifi/> <p>Free WI-FI</p></div>
                    </div>
                    <div className={'flex flex-col gap-5'}>
                        <div className={'flex gap-2'}><ParkingSquare/> <p>Free Parking</p></div>
                        <div className={'flex gap-2'}><Wind/> <p>Air conditioning</p></div>
                        <div className={'flex gap-2'}><Flame/> <p>BBQ facilities</p></div>
                    </div>
                </div>
            </div>
        </section>
    )
}