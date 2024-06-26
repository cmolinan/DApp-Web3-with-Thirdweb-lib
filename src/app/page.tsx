"use client";
import React, { useState } from "react";
import Swapper from "@/components/Swapper";
import TransferTokens from "@/components/TransferTokens";
import Image from "next/image"
import { Button } from "antd"
import { ArrowLeftOutlined, CaretRightFilled } from '@ant-design/icons';
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

export default function Home() {
  const account = useActiveAccount();
  const [optionMenu, setOptionMenu] = useState(0)

  const changeMenu = (option: number) => {
    setOptionMenu(option)    
  }
  
  return (    
    <main className="flex flex-col items-center justify-center pt-18">      
    {!account ? <span className="warning-message">Billetera desconectada !</span>:null }
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
