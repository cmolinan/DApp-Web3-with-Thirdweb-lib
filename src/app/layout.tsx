import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

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
      <ThirdwebProvider>
        <body className={`${inter.className} min-h-screen bg-blue-50 flex flex-col`}>
          {children}
        </body>      
      </ThirdwebProvider>
    </html>
  );
}
