import {FilledLink} from "@/app/(customerFacing)/_components/Buttons";
import Image from 'next/image'

export default function Third() {
    return (
        <section className="bg-[#F5F5F5] w-screen px-8 md:px-20 lg:px-24 xl:px-44 2xl:px-60 py-20 flex flex-col gap-20">
            <div className={'flex flex-col gap-10'}>
                <h2 className={'text-xl md:text-[1.2rem] font-light'}>Do you want to enjoy your holiday in peace and
                    sepration from the rest of the world, and yet be close to events and entertainment and gastronomic
                    and oenological hedonism</h2>
                <FilledLink href={'/'} className={'w-fit'}>Rezervirajte sada</FilledLink>
            </div>
            <div className={'flex gap-2 lg:gap-8 justify-between overflow-hidden h-64 lg:h-auto'}>
                <Image src={'/image2.png'} alt={'House image'} width={760} height={505}
                       className={'object-cover w-[40%] mb-5 lg:mb-20'}/>
                <Image src={'/image3.png'} alt={'House image'} width={794} height={505}
                       className={'object-cover w-[60%] mt-5 lg:mt-20'}/>
            </div>

            <div className={'flex flex-col gap-10'}>
                <h1 className={'text-4xl xl:text-5xl'}>Enjoy your holiday</h1>
                <h2 className={'text-xl md:text-[1.2rem] font-light sm:w-2/3 lg:w-1/2'}>Do you want to enjoy your holiday in peace
                    and
                    sepration from the rest of the world, and yet be close to events and entertainment and gastronomic
                    and oenological hedonism</h2>
                <FilledLink href={'/'} className={'w-fit'}>Rezervirajte sada</FilledLink>
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

            <div className={'flex flex-col gap-20 justify-center items-center mt-10'}>
                <h1 className={'text-4xl xl:text-5xl'}>Check availability</h1>
                <h2 className={'text-xl md:text-[1.2rem] font-light w-fit'}>Tu ce doj kalendar</h2>
                <FilledLink href={'/'} className={'w-fit'}>Rezervirajte sada</FilledLink>
            </div>
        </section>
    )
}