'use client'
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState, useTransition} from 'react';
import {ChevronUp} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpenWithNoDelay, setIsMenuOpenWithNoDelay] = useState(false);
    const [opacity, setOpacity] = useState(0)

    const t = useTranslations('NavBar')

    const [isLanguageOpened, setIsLanguageOpened] = useState(false)

    const localActive = useLocale()

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const HandleLanguageChange = (key: string) => {
        startTransition(() => {
            router.replace(`/${key}`)
        })
    }

    const languages = [
        {
            key: 'hr',
            image: '/croatia-flag.svg',
            alt: 'croatian flag',
            name: t('hrvatski'),
            shortName: 'HR',
        },
        {
            key: 'en',
            image: '/english-flag.svg',
            alt: 'english flag',
            name: t('engleski'),
            shortName: 'EN',
        },
        {
            key: 'it',
            image: '/italy-flag.svg',
            alt: 'italy flag',
            name: t('talijanski'),
            shortName: 'IT',
        },
        {
            key: 'de',
            image: '/german-flag.svg',
            alt: 'german flag',
            name: t('njemacki'),
            shortName: 'DE',
        },
        {
            key: 'fr',
            image: '/france-flag.svg',
            alt: 'france flag',
            name: t('francuski'),
            shortName: 'FR',
        }
    ]

    let currentLanguageObject = languages.find((l) => l.key === localActive);

    const links = [
        {
            id: 1,
            text: t('pocetna'),
            link: `/${localActive}#home`
        },
        {
            id: 2,
            text: t('atrakcije'),
            link: `/${localActive}#attractions`
        },
        {
            id: 3,
            text: t('znacajke'),
            link: `/${localActive}#features`
        },
        {
            id: 4,
            text: t('galerija'),
            link: `/${localActive}#gallery`
        },
        {
            id: 5,
            text: t('rezervacije'),
            link: `/${localActive}#reservation`
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
                <Link href={`/${localActive}`} onClick={() => {
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
                            <>
                                {currentLanguageObject ? (
                                    <div onClick={() => {
                                        setIsLanguageOpened(!isLanguageOpened);
                                    }} className="flex gap-2 items-center justify-center cursor-pointer">
                                        <Image src={currentLanguageObject.image} alt={currentLanguageObject.alt}
                                               width={39} height={22}/>
                                        <p className={'min-w-7 text-center'}>{currentLanguageObject.shortName}</p>
                                        <ChevronUp className={`transition-all ${isLanguageOpened && 'rotate-180'}`}/>
                                    </div>
                                ) : (isPending || !currentLanguageObject) && (
                                <div
                                    className="flex gap-2 items-center justify-center cursor-pointer animate-pulse">
                                    <div className={'w-[39px] h-[22px] bg-gray-200 rounded-md'}/>
                                    <div className={'w-[28px] h-[22px] bg-gray-200 rounded-md'}/>
                                    <div className={'w-[24px] h-[22px] bg-gray-200 rounded-md'}/>
                                </div>
                                )}
                                <div
                                    className={`absolute bg-[#F5F5F5] top-[150%] left-0 items-start justify-start w-max flex flex-col gap-5 rounded-md drop-shadow-2xl transition-all duration-200 px-5 py-4 ${isLanguageOpened ? 'opacity-100 h-auto' : 'opacity-0 overflow-hidden w-[160px] h-0'}`}>
                                    {!isLanguageOpened && (
                                        <div
                                            className={`gap-2 items-start justify-start text-transparent bg-transparent opacity-0`}>
                                        <div className={'w-[39px] h-[0px] rounded-md'}/>
                                            <div className={'w-[75px] h-[0px] rounded-md'}/>
                                        </div>
                                    )}
                                    {languages.filter((language) => language.key !== localActive).map((language) => (
                                        <div key={language.key} onClick={() => {
                                            HandleLanguageChange(language.key)
                                            setIsLanguageOpened(false)
                                        }}
                                            className={`gap-2 items-center justify-center cursor-pointer font-semibold ${isLanguageOpened ? 'flex' : ''}`}>
                                            <Image src={language.image} alt={language.alt} width={39}
                                                   height={22}/>
                                            <p>{language.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div
                    className={`overflow-y-auto bg-[#F5F5F5] fixed top-0 flex flex-col gap-10 z-20 items-center justify-center text-xl py-20 mb-40 transition-opacity duration-500 w-screen h-[100dvh]`}
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
                    <div className="relative flex gap-2 items-center justify-center opacity-0 translate-y-full"
                         style={{animation: 'popupword 0.5s forwards', animationDelay: `${5 * 100}ms`}}>
                        <>
                            {currentLanguageObject ? (
                                <div onClick={() => {
                                    setIsLanguageOpened(!isLanguageOpened);
                                }} className="flex gap-2 items-center justify-center cursor-pointer">
                                    <Image src={currentLanguageObject.image} alt={currentLanguageObject.alt}
                                           width={39} height={22}/>
                                    <p className={'min-w-7 text-center'}>{currentLanguageObject.shortName}</p>
                                    <ChevronUp className={`transition-all ${isLanguageOpened && 'rotate-180'}`}/>
                                </div>
                            ) : (isPending || !currentLanguageObject) && (
                                <div
                                    className="flex gap-2 items-center justify-center cursor-pointer animate-pulse">
                                    <div className={'w-[39px] h-[22px] bg-gray-200 rounded-md'}/>
                                    <div className={'w-[28px] h-[22px] bg-gray-200 rounded-md'}/>
                                    <div className={'w-[24px] h-[22px] bg-gray-200 rounded-md'}/>
                                </div>
                            )}
                            <div
                                className={`absolute bg-[#F5F5F5] top-[150%] items-start justify-start w-max flex flex-col gap-5 rounded-md drop-shadow-2xl transition-all duration-200 px-5 py-4 ${isLanguageOpened ? 'opacity-100 h-auto' : 'opacity-0 overflow-hidden w-[160px] h-0'}`}>
                                {!isLanguageOpened && (
                                    <div
                                        className={`gap-2 items-start justify-start text-transparent bg-transparent opacity-0`}>
                                        <div className={'w-[39px] h-[0px] rounded-md'}/>
                                        <div className={'w-[75px] h-[0px] rounded-md'}/>
                                    </div>
                                )}
                                {languages.filter((language) => language.key !== localActive).map((language) => (
                                    <div key={language.key} onClick={() => {
                                        HandleLanguageChange(language.key)
                                        setIsLanguageOpened(false)
                                    }}
                                         className={`gap-2 items-center justify-center cursor-pointer text-lg ${isLanguageOpened ? 'flex' : ''}`}>
                                        <Image src={language.image} alt={language.alt} width={39}
                                               height={22}/>
                                        <p>{language.name}</p>
                                    </div>
                                ))}
                            </div>
                        </>
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
        <Link href={href} target={target} onClick={onClick}
              className={`${className} after:content-[''] after:h-0.5 hover:after:w-full after:w-0 after:transition-all after:duration-300 after:bg-black relative after:absolute after:left-0 after:right-0 after:m-auto after:-bottom-2`}
              style={style}>{children}</Link>
    )
}