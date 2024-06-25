"use client";
import React from "react";
import ConnectButton from "./ConnectButton";
import Wrapper from "./Wrapper";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex p-4 max-w-7xl mx-auto justify-around w-full">
            <div className="flex gap-2 items-center">
                <Image src="/andino_dao_logo.jfif" alt="" width={300} height={300} className="w-10 h-10" />
                <h1 className="text-2xl font-bold">Andino Megacamp Project</h1>
            </div>
            <div className="flex gap-2 items-stretch">
                <ConnectButton />
            </div>
        </header>
    )
}