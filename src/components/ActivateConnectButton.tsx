"use client";
import React from "react";
import ConnectButton from "./ConnectButton";
import { useActiveAccount } from "thirdweb/react";

const ActivateConnectButton: React.FC = () => {
  const account = useActiveAccount();

  return (    
    <div>
      <ConnectButton />
    </div>    
  )
}
export default ActivateConnectButton;