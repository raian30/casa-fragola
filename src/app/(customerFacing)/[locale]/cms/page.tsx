import Link from "next/link";
import {SearchForParams} from "@/app/(customerFacing)/[locale]/cms/_actions/SearchForParams";
import OccupiedDates from "@/app/(customerFacing)/[locale]/cms/_components/OccuipedDates";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Casa Fragola | CMS",
    description: "Casa fragola CMS",
};

export default function Home() {

    return (
        <SearchForParams>
                <main className="flex bg-[#F5F5F5] min-h-[100dvh] flex-col py-[150px] px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-full">
                    <section className={'flex flex-col gap-10'}>
                        <div className={'flex flex-col gap-5 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center'}>
                            <h1 className={'text-2xl'}>Zauzeti datumi</h1>
                            <Link href={'/cms/occupy-date'} className={'bg-[#B96DA8] px-6 py-2.5 text-white rounded-lg hover:bg-opacity-70 transition-all'}>Zauzmi novi datum</Link>
                        </div>
                        <OccupiedDates/>
                    </section>
                </main>
        </SearchForParams>
    )
}
