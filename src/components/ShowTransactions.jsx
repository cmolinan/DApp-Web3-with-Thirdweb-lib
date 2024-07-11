"use client"
import  { format } from 'date-fns';
import { useEffect, useState } from "react";
import { Tabs, Table, Tooltip } from 'antd';
import { isMobile, getLocalDate, swalFire } from '../utils/OtherServices';
import { api_readTransfers } from '../api/dappApiConnection';
import { handleTokenExpiration } from '@/utils/AuthService';
import { SwapOutlined , RetweetOutlined } from '@ant-design/icons';

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

  let pageSize=10;  //how many rows to show in Tables

  //para el Sorting de la tabla
  const [sortedInfo, setSortedInfo] = useState({});

  const handleTableChange = (...sorter) => {    
    const { order, field } = sorter[2]
    setSortedInfo({ columnKey: field, order });
  };
  // ----------------
  
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
        render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        sorter: (a, b) => a.date.localeCompare(b.date),
        sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
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
          key: 'from_address',
          render: text =>
            <Tooltip title={text}>
              <div style={{ textAlign: 'left' }}>
                {shortenAddress(text)} 
              </div>
            </Tooltip>,
          sorter: (a, b) => a.from_address.localeCompare(b.from_address),
          sortOrder: sortedInfo.columnKey === 'from_address' && sortedInfo.order,
        },    
        {
          title: <div className="table-antd-header">ADDRESS DESTINO</div>,
          dataIndex: "to_address",
          align: "center",
          key: 'to_address', 
          render: text => 
            <Tooltip title={text}>
              <div style={{ textAlign: 'left' }}>
                {shortenAddress(text)} 
              </div>
            </Tooltip>,
          sorter: (a, b) => a.to_address.localeCompare(b.to_address),
          sortOrder: sortedInfo.columnKey === 'to_address' && sortedInfo.order,
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
            </Tooltip>,
          sorter: (a, b) => a.address.localeCompare(b.address),
          sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,           
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

  const renderTransfers = () => {
    return (
      <>
        {transferTxns?.length > 0 ? (               
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
        ):  
          <>
            <br /><br />
            <span>Cargando transferencias..</span>
          </>

        }
      </>
    )
  }

  const renderSwaps = () => {
    return (
      <>
        {swapTxns?.length > 0 ? (        
            <Table
              columns={columns("swaps")}
              bordered
              dataSource={swapTxns}
              size="small"
              pagination={{ position: ['bottomCenter'],
                              showSizeChanger: true,
                              defaultPageSize: 10,
                              showSizeChanger: true,
                              pageSizeOptions: [5, pageSize, pageSize +10, pageSize +20]
                          }}
                          onChange={handleTableChange} //inicialmente para el Sort
            />          
        ):  
          <>
            <br /><br />
            <span>Cargando swaps..</span>
          </>
        }
      </>
    )


  }
  
  return (
    <div className="table-container">
      { swapTxns?.length > 0 || transferTxns?.length > 0 ? (
        <>
          <span style={{fontWeight: 'bold', color: '#0A0FA7', fontSize: '20px'}}>TRANSACCIONES REALIZADAS</span>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: 'TRANSFERENCIAS',
                children: renderTransfers(),
                icon: <RetweetOutlined />,
              },
              {
                key: '2',
                label: 'SWAPS',
                children: renderSwaps(),
                icon: <SwapOutlined />,
              },
            ]}
          />
        </>
        ) : "Cargando ..."
      }


    </div>
  
  )
}
export default ShowTransactions;
