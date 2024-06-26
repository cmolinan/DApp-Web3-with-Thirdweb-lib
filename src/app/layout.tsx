import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Thirdweb from "@/components/Thirdweb";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andino Megacamp Project",
  description: "A frontend DApp featuring utilities for transferring and swapping tokens, powered by Thirdweb.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Thirdweb>
        <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
          <Toaster
            containerStyle={{marginTop:'190px'}}
           />
          <Header />          
              {children}
        </body>
      </Thirdweb>
    </html>
  );
}
