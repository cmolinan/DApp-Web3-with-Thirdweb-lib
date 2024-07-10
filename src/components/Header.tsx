"use client";
import React, { useState, useEffect } from "react";
import ConnectButton from "./ConnectButton";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import { getUser } from '../utils/AuthService';
import { Button, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Wrapper from "@/components/Wrapper";

interface HeaderProps {
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logout }) => {
  const account = useActiveAccount();

  const [userName, setUserName] = useState('');

  const handleLogout = () => {
   logout()
  }

  useEffect(() => {    
    setUserName(getUser()?.name);
  }, []);


  return (
    <>
      <header className="flex p-4 max-w-7xl mx-auto justify-around w-full">
        <div className="flex gap-2 items-center">
            <Image src="/andino_dao_logo.jfif" alt="" width={300} height={300} className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Megacamp Project</h1>
        </div>

        <div className="al flex items-center">
          <Popconfirm title="¿ Cerrar sesion ?" onConfirm={() => handleLogout()} >
            <Button type="text" size = "large" className="font-bold" style={{fontSize: '18px', color: '#0A0FA7'}} icon={<UserOutlined />}>
              {userName}
            </Button>
          </Popconfirm>
        </div>

        <div className="flex gap-2 items-stretch">
            <Wrapper />
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
export default Header;