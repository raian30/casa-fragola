'use client';
import React, { useEffect, useState } from 'react';
import {
    Bath,
    Bed,
    Check,
    ChefHat, Ellipsis,
    Flower,
    MessageSquare,
    ParkingCircle,
    Tv,
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
    const t2 = useTranslations('FeaturesModal');

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
                    <h2 className="text-2xl sm:text-3xl mt-5 lg:mt-0">{t2('sve-za-vas')} <br className={'sm:hidden'}/> {t2('savsen-odmor')}</h2>
                    <div className={'my-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14'}>
                    <div className={'flex flex-col gap-10'}>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><ParkingCircle strokeWidth={1.5}/> {t2('parking')}</h1>
                    <p className={'text-sm flex gap-2'}>{t2('parking-1')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Wifi strokeWidth={1.5}/> {t2('internet')}</h1>
                    <p className={'text-sm'}>{t2('internet-1')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><ChefHat strokeWidth={1.5}/> {t2('kuhinja')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('kuhinja-1')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-2')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-3')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-4')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-5')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-6')}</p>
                    <p className={'text-sm flex gap-2'}> <Check strokeWidth={1.5}/>{t2('kuhinja-7')}</p>
                    </div>
                    </div>
                    <div className={'flex flex-col gap-10'}>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}> <Bed strokeWidth={1.5}/>{t2('spavaca-soba')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('spavaca-soba-1')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}> <Bath strokeWidth={1.5}/> {t2('kupaonica')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('kupaonica-1')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('kupaonica-2')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('kupaonica-3')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Tv strokeWidth={1.5}/> {t2('mediji')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('mediji-1')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Flower strokeWidth={1.5}/> {t2('dvoriste')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('dvoriste-1')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('dvoriste-2')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('dvoriste-3')}</p>
                    </div>
                    </div>
                    <div className={'flex flex-col gap-10'}>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Waves strokeWidth={1.5}/> {t2('bazen')}</h1>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Utensils strokeWidth={1.5}/> {t2('hrana')}
                    </h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('hrana-1')}
                    kave/čaja</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><MessageSquare strokeWidth={1.5}/> {t2('usluga')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('usluga-1')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('usluga-2')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('usluga-3')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('usluga-4')}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                    <h1 className={'font-medium flex gap-2'}><Ellipsis strokeWidth={1.5}/> {t2('ostalo')}</h1>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('ostalo-1')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('ostalo-2')}</p>
                    <p className={'text-sm flex gap-2'}><Check strokeWidth={1.5}/> {t2('ostalo-3')}</p>
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