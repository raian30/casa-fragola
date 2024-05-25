import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css'

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
      <body className={inter.className}>
      <h1>Admin layout</h1>
      {children}
      </body>
    </html>
  );
}
