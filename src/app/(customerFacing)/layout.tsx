import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
import NavBar from "@/app/(customerFacing)/_components/Nav";
import Footer from "@/app/(customerFacing)/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casa Fragola",
  description: "Casa fragola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className + ' overflow-x-hidden'}>
    <NavBar/>
    {children}
    <Footer/>
    </body>
    </html>
  );
}
