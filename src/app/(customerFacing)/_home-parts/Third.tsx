import {FilledLink} from "@/app/(customerFacing)/_components/Buttons";
import Image from 'next/image'

export default function Third() {
    return (
        <section className="bg-[#F5F5F5] w-screen px-12 md:px-20 lg:px-24 xl:px-44 2xl:px-60 py-20 flex flex-col gap-10">
            <h2 className={'text-xl md:text-[1.4rem] font-light'}>Do you want to enjoy your holiday in peace and sepration from the rest of the world, and yet be close to events and entertainment and gastronomic and oenological hedonism</h2>
            <FilledLink href={'/'} className={'w-fit'}>Rezervirajte sada</FilledLink>
            <div className={'flex gap-10 justify-between'}>
                <Image src={'/image2.png'} alt={'House image'} width={760} height={505} className={'h-[90%] object-cover w-1/3'}/>
                <Image src={'/image3.png'} alt={'House image'} width={794} height={505} className={'object-cover w-2/3'}/>
            </div>
        </section>
    )
}