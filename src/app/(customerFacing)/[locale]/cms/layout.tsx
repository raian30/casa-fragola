'use client'

import type { Metadata } from "next";
import AdminNavBar from "@/app/(customerFacing)/[locale]/cms/_components/Nav";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "@/app/_trpc/client";
import {httpBatchLink} from "@trpc/client";

// export const metadata: Metadata = {
//     title: "Casa Fragola | CMS",
//     description: "Casa fragola CMS",
// };

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/api/trpc',
            })
        ]
    }))
    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                <AdminNavBar/>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}