'use client';
import React, { useEffect, useState } from 'react';
import {
    Bath,
    Bed, Bone,
    Check,
    ChefHat, CigaretteOff, CreditCard, Download, Ellipsis,
    Flower, Info,
    MessageSquare, Moon,
    ParkingCircle, PartyPopper, PawPrint, PersonStanding,
    Tv, Users,
    Utensils,
    Waves,
    Wifi,
    X
} from "lucide-react";
import { useTranslations } from "next-intl";

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 0);
    };

    const closeModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const t = useTranslations('Third');
    const t2 = useTranslations('RulesModal');

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    return (
        <>
            <button onClick={openModal}
                    className={'bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-fit'}>
                {t('btn-text-1')}
            </button>
            {isOpen && (
                <div
                    className={`fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeModal}
                >
                    <div
                        className={`w-screen h-[calc(100vh-7rem)] overflow-y-scroll mx-10 md:mx-14 lg:mx-12 xl:mx-[5.5rem] 2xl:mx-[7.5rem] bg-white shadow-lg relative px-5 lg:p-14 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-5 lg:top-14 right-5 lg:right-14 hover:text-gray-800"
                        >
                            <X size={30} />
                        </button>
                        <h2 className="text-2xl sm:text-3xl mt-5 lg:mt-0">{t2("pravila-kuce")}</h2>
                        <div className={'my-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14'}>
                            <div className={'flex flex-col gap-10'}>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Download className={'-rotate-90'} strokeWidth={1.5}/> {t2("prijava")}</h1>
                                    <p className={'text-sm flex gap-2'}>{t2("prijava-1")}<br/>
                                        {t2("prijava-2")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Download className={'rotate-90'} strokeWidth={1.5}/> {t2("odjava")}</h1>
                                    <p className={'text-sm'}>{t2("odjava-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Info strokeWidth={1.5}/> {t2("otkazivanje")}</h1>
                                    <p className={'text-sm flex gap-2'}>{t2("otkazivanje-1")} <br/> {t2("otkazivanje-2")}</p>
                                </div>
                            </div>
                            <div className={'flex flex-col gap-10'}>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Info strokeWidth={1.5}/>{t2("polog")}</h1>
                                    <p className={'text-sm flex gap-2'}>{t2("polog-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Users strokeWidth={1.5}/> {t2("djeca")}
                                    </h1>
                                    <p className={'text-sm flex gap-2 font-bold'}>{t2("djeca-1")}</p>
                                    <p className={'text-sm flex gap-2'}>{t2("djeca-2")}<br/>
                                        {t2("djeca-3")}</p>
                                    <p className={'text-sm flex gap-2 font-bold'}>{t2("djeca-4")}</p>
                                    <p className={'text-sm flex gap-2'}>{t2("djeca-5")}<br/>
                                        {t2("djeca-6")}<br/>

                                        {t2("djeca-7")}

                                    </p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><PersonStanding strokeWidth={1.5}/> {t2("granica")}</h1>
                                    <p className={'text-sm flex gap-2'}>{t2("granica-1")}</p>
                                </div>
                            </div>
                            <div className={'flex flex-col gap-10'}>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><CreditCard strokeWidth={1.5}/> {t2("kartice")}</h1>
                                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> American Express</p>
                                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> Visa</p>
                                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> MasterCard</p>
                                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> Diners Club</p>
                                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> Maestro</p>
                                    <p className={'text-sm flex gap-2'}><X strokeWidth={1.5}/> {t2("kartice-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><CigaretteOff strokeWidth={1.5}/> {t2("pusenje")}
                                    </h1>
                                    <p className={'text-sm flex gap-2'}>{t2("pusenje-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><PartyPopper strokeWidth={1.5}/> {t2("zabave")}
                                    </h1>
                                    <p className={'text-sm flex gap-2'}>{t2("zabave-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><Moon strokeWidth={1.5}/> {t2("red")}
                                    </h1>
                                    <p className={'text-sm flex gap-2'}>{t2("red-1")}</p>
                                </div>
                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'font-medium flex gap-2'}><PawPrint strokeWidth={1.5}/> {t2("ljubimci")}
                                    </h1>
                                    <p className={'text-sm flex gap-2'}>{t2("ljubimci-1")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;