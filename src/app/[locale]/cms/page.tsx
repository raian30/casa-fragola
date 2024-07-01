import {SearchForParams} from "@/app/[locale]/cms/_components/SearchForParams";
import {Metadata} from "next";
import Reservations from "@/app/[locale]/cms/_components/Reservations";

export const metadata: Metadata = {
    title: "Casa Fragola | CMS",
    description: "Casa fragola CMS",
};

export default function Home() {

    return (
        <SearchForParams>
            <main
                className="flex bg-[#F5F5F5] gap-10 min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
                <section className={'flex flex-col gap-10'}>
                    <h1 className={'text-2xl'}>Rezervacije</h1>
                    <Reservations/>
                </section>
            </main>
        </SearchForParams>
    )
}
