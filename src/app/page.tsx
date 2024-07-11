"use client";
import React, { useState, useEffect } from "react";
import Swapper from "@/components/Swapper";
import TransferTokens from "@/components/TransferTokens";
import Image from "next/image"
import { Button } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useActiveWalletChain, useActiveAccount } from "thirdweb/react";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import ShowTransactions from "@/components/ShowTransactions";

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
  const [started, setStarted] = useState(false);
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {    
    setIsAuthenticated(getToken() ? true: false);
    setStarted(true)
  }, []);


  const handleLogin = async (user: any, password: any) => {
    try {
      const response = await api_login(user, password);
      if (response.success) {
        saveTokenAndUser(response.token, { id: response.id, name: response.name, email: response.email, phone: response.phone });
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
    } catch (error: any) {
      Swal.fire({
        title: `Error interno`,
        text: `Reintente. Si persiste, informe a Sistemas (err: ${error?.code && error?.message})`,
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

  const renderReturn = () => {
    return (
      <div style={{paddingBottom: '10px', paddingTop: '10px' }}>
        <Button style={{color: '#0A0FA7', fontWeight: 'bolder'}}  type="text" size="small" icon={<ArrowLeftOutlined />} onClick={() => changeMenu(0)}>
          Volver
        </Button>
      </div>
    )
  }
  const renderMainCode = () => {
    return (
      <main className="flex flex-col items-center justify-center" style={{justifyContent: 'center'}}>
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

              <div className='home-block' style={{width: "20%", fontSize: "20px", height: '60px', minHeight: '30px'}} onClick={() => changeMenu(3)}>
                <p>Transacciones realizadas</p>
              </div>

            </div>
          </>
          :
          <div className="home-main">
            { optionMenu == 1 ?
              <div >
                {renderReturn()}
                <TransferTokens />
              </div >
              :null
            }

            { optionMenu == 2 ?
              <div >
                {renderReturn()}
                <Swapper />
              </div >
              :null
            }

            { optionMenu == 3 ?
              <div >
                {renderReturn()}
                <ShowTransactions />
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
      {started?
        <>
        {isAuthenticated ? (
          <>
          <Toaster
            containerStyle={{marginTop:'190px'}}
          />
          <Header logout={handleLogout} />
          {renderMainCode()}
          </>
        ) :
          <div>
            {<LoginModal onLogin={handleLogin} />}
          </div>
        }
        </>
      : <span>Loading </span>
      }
    </div>
  );

}
