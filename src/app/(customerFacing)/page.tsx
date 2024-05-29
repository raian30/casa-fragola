import Hero from "@/app/(customerFacing)/_home-parts/Hero";
import Second from "@/app/(customerFacing)/_home-parts/Second";
import Third from "@/app/(customerFacing)/_home-parts/Third";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 bg-white">
      <Hero/>
      <Second/>
      <Third/>
    </main>
  );
}
