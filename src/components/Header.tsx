"use client";
import React from "react";
import ConnectButton from "./ConnectButton";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
export default function Header() {
  const account = useActiveAccount();  

  return (
    <>
      <header className="flex p-4 max-w-7xl mx-auto justify-around w-full">
        <div className="flex gap-2 items-center">
            <Image src="/andino_dao_logo.jfif" alt="" width={300} height={300} className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Megacamp Project</h1>
        </div>
        <div className="flex gap-2 items-stretch">
            <ConnectButton />
        </div>
      </header>
      <div className="al flex flex-col items-center">
        <div className="al flex items-center">
          <h3 className="font-bold mr-1">Red: </h3>
          <span>Polygon Mainnet</span>
        </div>
        <div className="al flex items-center">
        {account && 
          <>
            <h3 className="font-bold mr-1">Cuenta activa:</h3>
            <span>{account?.address}</span>
          </>        
        }
        </div>
      </div>
    </>  
  )
}