"use client";
import React from "react";
import { ConnectButton as ThirdwebConnectButton, useActiveWalletChain } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import client from "@/lib/thirdweb-client";
import { polygon } from "thirdweb/chains";


const ConnectButton = () => {

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    inAppWallet()
  ];

  const appMetadata = {
    name: "DApp Megacamp Andino",
    description: "DApp para Megacamp Andino",
    url: ''
  };
  
  return (
    <ThirdwebConnectButton 
      connectButton={{ 
        className: "w-full",
        style: {
          backgroundColor: "#0A0FA7",
          color: "white",
          borderRadius: "10px",
        },
      }}
      switchButton={{
        label: "Red erronea",        
        style: {
          backgroundColor: "red",
        },
      }}
      theme="light" 
      chain={polygon}
      // chains={[polygon, optimism]}
      client={client} 
      wallets={wallets}
      showAllWallets={true}
      connectModal={{
        title: "Seleccione una billetera:",
        size: "compact",
      }}
      appMetadata={appMetadata}
    />
  )
}

export default ConnectButton