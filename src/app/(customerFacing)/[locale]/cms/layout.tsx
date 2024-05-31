import type { Metadata } from "next";
import AdminNavBar from "@/app/(customerFacing)/[locale]/cms/_components/Nav";

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
        <>
            <AdminNavBar/>
            {children}
        </>
    )
}