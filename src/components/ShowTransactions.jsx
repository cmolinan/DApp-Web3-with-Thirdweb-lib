"use client"
import  { format } from 'date-fns';
import { useEffect, useState } from "react";
import { Table, Tooltip } from 'antd';
import { isMobile, getLocalDate, swalFire } from '../utils/OtherServices';
import { api_readTransfers } from '../api/dappApiConnection';
import { handleTokenExpiration } from '@/utils/AuthService';

// eslint-disable-next-line react/prop-types
const ShowTransactions = () => {

  const [transferTxns, setTransferTxns] = useState([]);
  const [swapTxns, setSwapTxns] = useState([]);

  // Download Transfers transactions
  const getTransactions= async () => {
    
    let i = 1
    while (i <= 2) {
      let txnType =''
      txnType = (i === 1 ? "transfers" : "swaps")
      console.log(`Try en getTransactions ${txnType}`)
      try {
        const response = await api_readTransfers(txnType);
        if (response.success == 1) {
          i ==1 ? setTransferTxns(response.data):setSwapTxns(response.data)
        } else {        
          console.log("Error en getTransactions con Success=1")
        }

      } catch (error) {
        if (error.data?.message === 'Token expirado') {
          console.error('Token Expirado');
          swalFire('tkn', '')
          handleTokenExpiration();        
        } else {
          swalFire('nod', `Transacciones ${txnType}`)
          console.log("Error en getTransactions", error)
        }
      }
      i++
    }    
  }

  useEffect(() => {
    getTransactions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function for shorten address
  const shortenAddress = (address) => {
    if (!address) return '';
    const firstPart = address.slice(0, 6);
    const lastPart = address.slice(-4);
    return `${firstPart}...${lastPart}`;
  };

  const columns = (mode) => {
    // The same function used for transfers an swaps
    const output = [
      {
        title: <div className="table-antd-header">FECHA</div>,
        dataIndex: "date",
        align: "center",
        key: 'date',        
        render: text => <div style={{ textAlign: 'left' }}>{format(text,'yy-MM-dd HH:mm')}</div>,
      },
      {
        title: <div className="table-antd-header">CHAIN</div>,
        dataIndex: "chain",
        align: "center",
        key: 'chain',        
        render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
      }]

      if (mode == "transfers") output.push(
        {
          title: <div className="table-antd-header">TOKEN</div>,
          dataIndex: "token",
          align: "center",
          key: 'token',
          render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        {
          title: <div className="table-antd-header">ADDRESS ORIGEN</div>,
          dataIndex: "from_address",
          align: "center",
          key: 'fromAddress',
          render: text =>
            <Tooltip title={text}>
              <div style={{ textAlign: 'left' }}>
                {shortenAddress(text)} 
              </div>
            </Tooltip>        
        },    
        {
          title: <div className="table-antd-header">ADDRESS DESTINO</div>,
          dataIndex: "to_address",
          align: "center",
          key: 'toAddress',        
          render: text => 
            <Tooltip title={text}>
              <div style={{ textAlign: 'left' }}>
                {shortenAddress(text)} 
              </div>
            </Tooltip>
        },
        {
          title: <div className="table-antd-header">IMPORTE</div>,
          dataIndex: "amount",
          align: "center",
          key: 'amount',
          render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        }
      )

      if (mode == "swaps") output.push(
        {
          title: <div className="table-antd-header">ADDRESS</div>,
          dataIndex: "address",
          align: "center",
          key: 'address',
          render: text => 
            <Tooltip title={text}>
              <div style={{ textAlign: 'left' }}>
                {shortenAddress(text)} 
              </div>
            </Tooltip>        
        },      
        {
          title: <div className="table-antd-header">TOKEN ORIGEN</div>,
          dataIndex: "from_token",
          align: "center",
          key: 'from_token',
          render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        {
          title: <div className="table-antd-header">TOKEN DESTINO</div>,
          dataIndex: "to_token",
          align: "center",
          key: 'to_token',
          render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        }, 
        {
          title: <div className="table-antd-header">IMPORTE</div>,
          dataIndex: "amount",
          align: "center",
          key: 'amount',
          render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        }
      )

    output.push(
    {
      title: <div className="table-antd-header">HASH</div>,
      dataIndex: "hash",
      align: "center",
      key: 'hash',        
      render: text => 
        <Tooltip title={text}>
          <div style={{ textAlign: 'left' }}>
            {shortenAddress(text)} 
          </div>
        </Tooltip>
    })

    return output
  }

  return (
    <>
      {transferTxns?.length > 0 ? (
          <div className="table-container">
            <span style={{fontWeight: 'bold', color: '#0A0FA7', padding: '10px'}}>TRANSFERS</span>
            <Table
              columns={columns("transfers")}
              bordered
              dataSource={transferTxns}
              size="small"
              pagination={{ position: ['bottomCenter'],
                              showSizeChanger: true,
                              defaultPageSize: 5,
                          }}
            />
          </div>
        ):  
          <>
            <br /><br />
            <span>Loading transfers..</span>
          </>
      }
      {swapTxns?.length > 0 ? (        
          <div className="table-container">
            <span style={{fontWeight: 'bold', color: '#0A0FA7', padding: '10px'}}>SWAPS</span>
            <Table
              columns={columns("swaps")}
              bordered
              dataSource={swapTxns}
              size="small"
              pagination={{ position: ['bottomCenter'],
                              showSizeChanger: true,
                              defaultPageSize: 5,
                          }}
            />
          </div>
        ):  
          <>
            <br /><br />
            <span>Loading swaps..</span>
          </>
      }
    </>
  )
}
export default ShowTransactions;
