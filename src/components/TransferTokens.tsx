"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Address, toTokens, toUnits } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { tokens } from "@/constants";
import TransactionButton from "./TransactionButton";
import TokenSelect from "./TokenSelect";
import Token from "@/types/token";
import { balanceOf } from "thirdweb/extensions/erc20";
import getContract from "@/lib/get-contract";
import transfer from "@/transactions/transfer";
import JSConfetti from 'js-confetti'

const fetchBalance = async (tokenIn: Token, recipient: Address) => {
    return balanceOf({ contract: getContract({ address: tokenIn.address }), address: recipient });
}

const TransferButton = ({ tokenIn, amount, recipient, onSuccess, onError }: { tokenIn: Token, amount: bigint,  recipient: Address, onSuccess: any, onError: any }) => {
    return (
      <TransactionButton
        transaction={async () => {          
          return transfer({
            token: tokenIn,
            amount,
            recipient            
          });
        }}
        onSent="Transferencia enviada ..."
        onConfirmed="Transferencia exitosa !"
        onError="No se pudo realizar la transferencia"
        successCallback={onSuccess}
        errorCallback={onError}
      >
        Ejecutar Transferencia
      </TransactionButton>
    )
}

const TransferTokens = () => {
    const account = useActiveAccount();
    const [amount, setAmount] = useState<number>(0);
    const [destAddress, setDestAddress] = useState<Address | string>("");

    const [inputTokenKey, setInputTokenKey] = useState<string | undefined>();
    const [outputTokenKey, setOutputTokenKey] = useState<string | undefined>();

    const inputToken = useMemo(() => inputTokenKey ? tokens[inputTokenKey] : undefined, [inputTokenKey]);

    const canTransfer= account && inputToken  && amount && destAddress !== ''
    const canGetBalance= account && inputToken

    const [balance, setBalance] = useState(BigInt(0));

    const refetchBalance = useCallback(() => {
        if (inputToken && account?.address) {
          fetchBalance(inputToken, account?.address as Address).then(setBalance);
        }
      }, [inputToken, account?.address]);

    const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

    const validateAddress = (address: string): boolean => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    const jsConfetti = new JSConfetti()

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const address = e.target.value || "";
        
        setDestAddress(address);
        setIsValidAddress(validateAddress(address));
    };

    useEffect(() => {        
        if (canGetBalance) refetchBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToken, account?.address]);

    const handleSuccesfulTransfer = (receipt: any) => {
        console.log('HASH: ',receipt?.transactionHash)
        refetchBalance()
        setAmount(0)
        setDestAddress('')
        jsConfetti.addConfetti()
    }

    const handleErrorTransfer = (error: any) => {
        console.log('ERROR: ',error?.message)        
        setAmount(0)
        setDestAddress('')
    }

    return <Card className="">
        <CardHeader>
            <CardTitle style={{color:"#0A0FA7"}}>Transferir</CardTitle>
        </CardHeader>
        <CardContent className="">
            <div className="flex w-[400px] flex-col items-center gap-4">
                <div className="flex w-full items-center gap-2">
                    <TokenSelect selectedKey={inputTokenKey} onSelect={setInputTokenKey} />
                    {canGetBalance &&
                        <div className="text-sm text-gray-700">Saldo: {toTokens(balance, inputToken?.decimals)}</div>
                    }

                </div>
                <div className="flex w-full items-center gap-2" style={{fontSize: '14px', fontWeight:'500', paddingLeft:'15px'}}>
                    Tokens a Transferir
                    <Input
                        placeholder="0" 
                        type="number"                        
                        onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                        className="w-full"
                    />
                </div>
                <div className="flex w-full items-center gap-2 text-sm font-medium pl-4">
                    Destinatario
                    <Input
                        placeholder="0x" 
                        type="text" 
                        value={destAddress}                        
                        onChange={handleAddressChange}                        
                        className={`w-full ${isValidAddress ? "" : "border-red-500"}`}
                    />

                </div>

                {canTransfer ?                    
                    balance > toUnits(amount.toString(), inputToken?.decimals ?? 18) ?
                        isValidAddress ?
                            <TransferButton
                                tokenIn={inputToken}
                                amount={toUnits(amount.toString(), inputToken?.decimals ?? 18)}
                                recipient={destAddress as Address}
                                onSuccess={handleSuccesfulTransfer}
                                onError={handleErrorTransfer}
                            />
                            :<div className="font-semibold text-red-500">
                                Address invalida !
                            </div>
                        :<div className="font-semibold text-red-500">
                            Tokens {inputToken.symbol} insuficientes !
                        </div>
                : <></>
                }

            </div>
        </CardContent>
    </Card>
}
export default TransferTokens;