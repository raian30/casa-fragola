'use client'
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from 'react';
import {ChevronUp} from "lucide-react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpenWithNoDelay, setIsMenuOpenWithNoDelay] = useState(false);
    const [opacity, setOpacity] = useState(0)

    const [isLanguageOpened, setIsLanguageOpened] = useState(false)

    const links = [
        {
            id: 1,
            text: "Početna",
            link: "/#"
        },
        {
            id: 2,
            text: "Značajke",
            link: "/#"
        },
        {
            id: 3,
            text: "Galerija",
            link: "/#"
        },
        {
            id: 4,
            text: "Atrakcije",
            link: "/#"
        },
        {
            id: 5,
            text: "Rezervacije",
            link: "/#"
        },
    ];


    const toggleMenu = () => {
        if(isMenuOpen) {
            setOpacity(0)
            setIsMenuOpenWithNoDelay(!isMenuOpen)
            return setTimeout(() => {
                setIsMenuOpen(!isMenuOpen);
            }, 300)
        } else {
            setIsMenuOpen(!isMenuOpen);
            setIsMenuOpenWithNoDelay(!isMenuOpen)
            setOpacity(100)
        }
    };

    const handleResize = () => {
        if (window.innerWidth >= 1023) {
            setIsMenuOpenWithNoDelay(false);
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpenWithNoDelay) {
            document.body.classList.add("overflow-y-hidden")
        } else {
            document.body.classList.remove("overflow-y-hidden")
        }
    }, [isMenuOpen])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav className="fixed z-50 flex bg-[#F5F5F5] items-center justify-between w-screen py-6 px-10 md:px-20 lg:px-24 xl:px-44 2xl:px-60">
                <Link href={'/'} onClick={() => {
                    setIsMenuOpen(false)
                    setIsMenuOpenWithNoDelay(false)
                }} className={'flex justify-center items-center gap-5'}>
                    <Image src={'/logo.svg'} alt={'Casa Fragola logo'} width={122} height={54} />
                </Link>

                <button onClick={toggleMenu} className={'lg:hidden'}>
                    {isMenuOpenWithNoDelay ? (
                        <div className={'h-[50px] transition-all relative flex flex-col items-end m-auto justify-center overflow-x-hidden'}>
                            <div className={'w-[40px] h-[3px] bg-black rounded-xl transition-all mb-0 translate-y-[3px] rotate-45'}/>
                            <div className={'w-[40px] h-[3px] bg-black rounded-xl transition-all mb-0 -rotate-45'}/>
                            <div className={'w-[40px] h-[3px] bg-black rounded-xl transition-all translate-x-full translate-y-[10px]'}/>
                        </div>
                    ) : (
                        <div className={'h-[50px] relative transition-all flex flex-col justify-center items-end'}>
                            <div className={'w-[40px] h-[3px] bg-black rounded-xl transition-all mb-2'}/>
                            <div className={'w-[40px] h-[3px] bg-[#923E82] rounded-xl transition-all mb-2'}/>
                            <div className={'w-[20px] h-[3px] bg-black rounded-xl transition-all'}/>
                        </div>
                    )}
                </button>

                <div className={`hidden lg:flex gap-10 items-center`}>
                    {links.map(({id, link, text}) => (
                        <NavButton className={'text-black'} key={id} href={link}>{text}</NavButton>
                    ))}
                    <div className="w-[1px] h-8 bg-black"/>
                    <div className={'relative'}>
                        <div onClick={() => {setIsLanguageOpened(!isLanguageOpened)}} className="flex gap-2 items-center justify-center cursor-pointer">
                            <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22}/>
                            <p>HR</p>
                            <ChevronUp/>
                        </div>
                        <div className='absolute bg-[#F5F5F5] top-[150%] left-0 items-start justify-start w-max px-5 py-4 flex flex-col gap-4 rounded-md opacity-0'>
                            <div className="flex gap-2 items-start justify-start cursor-pointer">
                                <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22}/>
                                <p>Engleski</p>
                            </div>
                            <div className="flex gap-2 items-start justify-start cursor-pointer">
                                <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22}/>
                                <p>Taljanski</p>
                            </div>
                            <div className="flex gap-2 items-start justify-start cursor-pointer">
                                <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22}/>
                                <p>Francuski</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div
                    className={`bg-[#F5F5F5] fixed top-0 flex flex-col gap-10 z-20 items-center justify-center text-xl py-20 mb-40 transition-opacity duration-500 w-screen h-[100dvh]`}
                    style={{opacity}}>
                    {links.map(({id, link, text}) => (
                        <div key={id}>
                            <NavButton href={link} onClick={toggleMenu}
                                       className={'opacity-0 translate-y-full inline-block'} style={{
                                animation: 'popupword 0.5s forwards',
                                animationDelay: `${(id - 1) * 100}ms`
                            }}>{text}</NavButton>
                        </div>

                    ))}
                    <div className="flex gap-2 items-center justify-center opacity-0 translate-y-full" style={{animation: 'popupword 0.5s forwards', animationDelay: `${5 * 100}ms`}}>
                        <Image src={'/croatia-flag.svg'} alt={'Croatia flag'} width={39} height={22}/>
                        <p>HR</p>
                        <ChevronUp/>
                    </div>
                </div>
            )}
        </>
    )
}

export function NavButton({children, href, target, className, style, onClick}: {
    children: React.ReactNode,
    href: string,
    target?: string,
    className?: string,
    style?: object,
    onClick?: any
}) {
    return (
        <Link href={href} target={target} onClick={onClick} className={`${className} after:content-[''] after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:duration-300 after:bg-black relative after:absolute after:left-0 after:right-0 after:m-auto after:-bottom-2`} style={style}>{children}</Link>
    )
}