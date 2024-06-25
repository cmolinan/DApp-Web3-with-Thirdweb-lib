"use client";
import React, { useState } from "react";
import Swapper from "@/components/Swapper";
import TransferTokens from "@/components/TransferTokens";
import Image from "next/image"
import { Button } from "antd"
import { ArrowLeftOutlined, CaretRightFilled } from '@ant-design/icons';

export default function Home() {
  const [optionMenu, setOptionMenu] = useState(0)

  const changeMenu = (option) => {
    setOptionMenu(option)
    console.log("OPT:",option)
  }

  return (
    <main className="flex flex-grow flex-col items-center justify-center pt-0 p-24">

      { optionMenu == 0 && 
        <>
          <Button type="primary" size="small" icon={<CaretRightFilled />} onClick={() => changeMenu(1)}> 
            Transferir Tokens
          </Button>

          <Button type="primary" size="small" icon={<CaretRightFilled />} onClick={() => changeMenu(2)}> 
            Swap de Tokens                
          </Button>
        </>
      }
      { optionMenu == 1 &&
        <>
          <TransferTokens />
          <Button type="text" size="large" icon={<ArrowLeftOutlined />} onClick={() => changeMenu(0)}> 
            Menu Principal
          </Button>
        </>
      }

      { optionMenu == 2 &&
        <>
          <Swapper />
          <Button type="text" size="large" icon={<ArrowLeftOutlined />} onClick={() => changeMenu(0)}> 
            Menu Principal
          </Button>
        </>
      }
      
      {/* <Image
          src="/thirdweb.png"
          alt="imagen thirdweb"
          width={100}
          height={76}
      /> */}

    </main>
  );
}
