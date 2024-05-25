import Image from "next/image";
import Link from "next/link";
import {ChevronUp} from "lucide-react";

export default function NavBar() {
    return (
        <div className="flex bg-[#F5F5F5] items-center justify-between w-full py-6 px-12 md:px-20 lg:px-24 xl:px-44 2xl:px-60">
            <Link href={'/'}>
                <Image src={'/logo.svg'} alt={'Casa Fragola logo'} width={122} height={54} />
            </Link>
            <div className="items-center justify-center gap-10 hidden lg:flex">
                <Link href={'/'}>Početna</Link>
                <Link href={'/'}>Značajke</Link>
                <Link href={'/'}>Galerija</Link>
                <Link href={'/'}>Atrakcije</Link>
                <Link href={'/'}>Rezervacije</Link>
                <div className="w-[1px] h-8 bg-black" />
                <div className="flex gap-2 items-center justify-center">
                    <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22} />
                    <p>HR</p>
                    <ChevronUp/>
                </div>
            </div>
        </div>
    )
}