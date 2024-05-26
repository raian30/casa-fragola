import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
import AdminNavBar from "@/app/cms/_components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Casa Fragola | CMS",
    description: "Casa fragola CMS",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className + ' overflow-x-hidden'}>
        <AdminNavBar/>
        {children}
        </body>
        </html>
    );
}