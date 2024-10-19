import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'
import NavBar from "@/app/[locale]/_components/Nav";
import Footer from "@/app/[locale]/_components/Footer";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casa Fragola",
  description: "Želite li miran i opušten odmor daleko od gužve, ali i blizu događanja, zabave, ukusne hrane i vrhunskih vina koje Istra nudi? Ovdje možete pronaći savršen spoj odmora i uživanja u svemu što Istra pruža!",
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
