"use client";
import React, { useState } from "react";
import Swapper from "@/components/Swapper";
import TransferTokens from "@/components/TransferTokens";
import Image from "next/image"
import { Button } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useActiveWalletChain, useActiveAccount } from "thirdweb/react";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

// Authentication
import LoginModal from '../components/LoginModal'; 
import { clearTokenAndUser, saveTokenAndUser, getToken } from '../utils/AuthService';
import { api_login } from '../api/backendApiConnection';
import Swal from "sweetalert2"

export default function Home() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
   
  const [optionMenu, setOptionMenu] = useState(0)

  const changeMenu = (option: number) => {
    setOptionMenu(option)    
  }


  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const handleLogin = async (user: any, password: any) => {    
    try {
      const response = await api_login(user, password);
      if (response.success) {
        saveTokenAndUser(response.token, { name: response.name, email: user });
        setIsAuthenticated(true);
      } else {

        Swal.fire({
          title: `Email o password invalidos!`,
          text: "Reintente",
          icon: 'error',
          confirmButtonColor: "#C9302C",
          toast: true,
          timer: 2000,
        });

      }
    } catch (error) {
      Swal.fire({
        title: `Error interno`,
        text: `Reintente. Si persiste, informe a Sistemas (err: ${error.code && error.message})`,
        icon: 'error',
        confirmButtonColor: "#C9302C",
      });

      console.error('Error during login:', error);
      return
    }
  };

  const handleLogout = () => {
    clearTokenAndUser(); 
    setIsAuthenticated(false)
  }

  const renderMainCode = () => {
    return ( 
      <main className="flex flex-col items-center justify-center pt-18">      
        {!account ? <span className="warning-message">Billetera desconectada !</span>:null }
        {account && activeChain?.id !== 137 ? <span className="warning-message">Wallet conectada a otra red: cambie a Polygon Mainnet!</span>:null }
      
        { optionMenu == 0 ?
          <>
            <div className='home-main'>
              <div className='home-block' onClick={() => changeMenu(1)}>
                <p> TRANSFERIR</p>
                <p className='home-subtitle'>TOKENS</p>
              </div>

              <div className='home-block' onClick={() => changeMenu(2)}>
                <p>SWAP</p>
                <p className='home-subtitle'>DE TOKENS</p>
              </div>      
            </div>
          </>
          :
          <div className="home-main">
            { optionMenu == 1 ?
              <div >
                <Button type="text" size="small" icon={<ArrowLeftOutlined />} onClick={() => changeMenu(0)}> 
                  Volver
                </Button>
                <TransferTokens />
              </div >
              :null
            }

            { optionMenu == 2 ? 
              <div >
                <Button type="text" size="small" icon={<ArrowLeftOutlined />} onClick={() => changeMenu(0)}> 
                  Volver
                </Button>
                <Swapper />
              </div >
              :null
            }
          </div>
        }

        <div className="flex items-center justify-center">
          <p>Powered by Thirdweb</p>
          <Image
              src="/thirdweb.png"
              alt="imagen thirdweb"
              width={50}
              height={38}
          />
        </div>
      </main>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
        <Toaster
          containerStyle={{marginTop:'170px'}}
         />
        <Header logout={handleLogout} /> 
         {renderMainCode()}
        </>
      ) :
        <div>
          {<LoginModal onLogin={handleLogin} />}
        </div>
      }
    </div>
  );

}
