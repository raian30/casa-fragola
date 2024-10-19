'use client';
import React, { useEffect, useState } from 'react';
import { X } from "lucide-react";
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
                        className={`w-screen h-[calc(100vh-7rem)] mx-10 md:mx-14 lg:mx-12 xl:mx-[5.5rem] 2xl:mx-[7.5rem] bg-white shadow-lg relative p-14 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-14 right-14 hover:text-gray-800"
                        >
                            <X size={30} />
                        </button>
                        <h2 className="text-3xl">House rules</h2>
                        <div className={'my-10'}>
                            <h1>Here goes house rules from booking</h1>
                        </div>
                        <button onClick={closeModal}
                                className={'bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase absolute bottom-14 left-0 right-0 mx-auto w-fit'}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;