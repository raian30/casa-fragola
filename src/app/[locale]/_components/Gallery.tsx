'use client';
import React, {useEffect, useRef, useState} from 'react';
import {
    ChevronLeft, ChevronRight,
    Download,
    X
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const [currentImg, setCurrentImg] = useState(0)
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 })
    const carouselRef = useRef(null)

    const data = [
        {image: "/full/IMG-20241018-WA0002.jpg"},
        {image: "/full/IMG-20241018-WA0003.jpg"},
        {image: "/full/IMG-20241018-WA0004.jpg"},
        {image: "/full/IMG-20241018-WA0005.jpg"},
        {image: "/full/IMG-20241018-WA0006.jpg"},
        {image: "/full/IMG-20241018-WA0007.jpg"},
        {image: "/full/IMG-20241018-WA0008.jpg"},
        {image: "/full/IMG-20241018-WA0009.jpg"},
        {image: "/full/IMG-20241018-WA0010.jpg"},
        {image: "/full/IMG-20241018-WA0011.jpg"},
        {image: "/full/IMG-20241018-WA0012.jpg"},
        {image: "/full/IMG-20241018-WA0013.jpg"},
        {image: "/full/IMG-20241018-WA0014.jpg"},
        {image: "/full/IMG-20241018-WA0015.jpg"},
        {image: "/full/IMG-20241018-WA0016.jpg"},
        {image: "/full/IMG-20241018-WA0017.jpg"},
        {image: "/full/IMG-20241018-WA0018.jpg"},
        {image: "/full/IMG-20241018-WA0019.jpg"},
        {image: "/full/IMG-20241018-WA0020.jpg"},
        {image: "/full/IMG-20241018-WA0021.jpg"},
        {image: "/full/IMG-20241018-WA0022.jpg"},
        {image: "/full/IMG-20241018-WA0023.jpg"},
        {image: "/full/IMG-20241018-WA0024.jpg"},
        {image: "/full/IMG-20241018-WA0025.jpg"},
        {image: "/full/IMG-20241018-WA0026.jpg"},
        {image: "/full/IMG-20241018-WA0027.jpg"},
        {image: "/full/IMG-20241018-WA0028.jpg"},
        {image: "/full/IMG-20241018-WA0029.jpg"},
        {image: "/full/IMG-20241018-WA0030.jpg"},
        {image: "/full/IMG-20241018-WA0031.jpg"},
        {image: "/full/IMG-20241018-WA0032.jpg"},
        {image: "/full/IMG-20241018-WA0033.jpg"},
        {image: "/full/IMG-20241018-WA0034.jpg"},
        {image: "/full/IMG-20241018-WA0035.jpg"},
        {image: "/full/IMG-20241018-WA0036.jpg"},
        {image: "/full/IMG-20241018-WA0037.jpg"},
        {image: "/full/IMG-20241018-WA0038.jpg"},
        {image: "/full/IMG-20241018-WA0039.jpg"},
        {image: "/full/IMG-20241018-WA0040.jpg"},
    ]

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

    useEffect(() => {
        console.log(carouselRef.current)

        if(!carouselRef.current) return
        let elem = carouselRef.current as unknown as HTMLDivElement
        let { width, height } = elem.getBoundingClientRect()
        if (carouselRef.current) {
            setCarouselSize({
                width,
                height,
            })
        }
    }, [isOpen])

    return (
        <>
            <button onClick={openModal}
                    className={'bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light uppercase w-fit'}>
                {t('btn-text-2')}
            </button>
            {isOpen && (
                <div
                    className={`fixed z-50 inset-0 bg-black backdrop-blur-3xl bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeModal}>
                    <div
                        className={`w-screen h-[calc(100vh-7rem)] rounded-2xl mx-10 md:mx-14 lg:mx-12 xl:mx-[5.5rem] 2xl:mx-[7.5rem] bg-white shadow-lg relative transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute z-10 top-5 left-5 hover:text-gray-600 bg-white p-3 rounded-full bg-opacity-50 hover:bg-opacity-70 transition-all">
                            <X size={20} strokeWidth={1.5}/>
                        </button>

                        <button
                            disabled={currentImg === 0}
                            onClick={() => setCurrentImg((prev) => prev - 1)}
                            className={`absolute z-10 top-0 bottom-0 my-auto h-fit left-5 hover:text-gray-600 bg-white p-3 rounded-full bg-opacity-50 hover:bg-opacity-70 transition-all ${currentImg === 0 && 'opacity-0'}`}>
                            <ChevronLeft size={30} strokeWidth={1.5}/>
                        </button>

                        <div className="rounded-2xl relative h-full overflow-hidden">
                            <div
                                ref={carouselRef}
                                style={{
                                    left: -currentImg * carouselSize.width,
                                }}
                                className="absolute flex h-full w-full transition-all duration-300"
                            >
                                {data.map((v, i) => (
                                    <div key={i} className="relative h-full w-full shrink-0">
                                        <Image
                                            className="pointer-events-none object-cover"
                                            alt={`Carousel Image ${i}`}
                                            fill
                                            quality={100}
                                            src={v.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={currentImg === data.length - 1}
                            onClick={() => setCurrentImg((prev) => prev + 1)}
                            className={`absolute z-10 top-0 bottom-0 my-auto h-fit right-5 hover:text-gray-600 bg-white p-3 rounded-full bg-opacity-50 hover:bg-opacity-70 transition-all ${currentImg === data.length - 1 && 'opacity-0'}`}>
                            <ChevronRight size={30} strokeWidth={1.5}/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;