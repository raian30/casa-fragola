import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../../globals.css'
import NavBar from "@/app/(customerFacing)/[locale]/_components/Nav";
import Footer from "@/app/(customerFacing)/[locale]/_components/Footer";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casa Fragola",
  description: "Casa fragola",
};

export default async function RootLayout({
  children,
    params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string}
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
    <body className={inter.className + ' overflow-x-hidden'}>
    <NextIntlClientProvider messages={messages}>
      <NavBar/>
      {children}
      <Footer/>
      </NextIntlClientProvider>
    </body>
    </html>
  );
}
