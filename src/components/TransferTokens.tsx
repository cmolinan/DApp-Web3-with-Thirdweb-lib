"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Address, toTokens, toUnits, toWei } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import approve from "@/transactions/approve";
import swap from "@/transactions/swap";
import { ROUTER, tokens } from "@/constants";
import TransactionButton from "./TransactionButton";
import TokenSelect from "./TokenSelect";
import Token from "@/types/token";
import useQuote from "@/hooks/useQuote";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { allowance as thirdwebAllowance, balanceOf } from "thirdweb/extensions/erc20";
import getContract from "@/lib/get-contract";

// const fetchAllowance = async (tokenIn: Token, recipient: Address) => {
//     return thirdwebAllowance({ contract: getContract({ address: tokenIn.address }), owner: recipient, spender: ROUTER });
// }

const fetchBalance = async (tokenIn: Token, recipient: Address) => {
    return balanceOf({ contract: getContract({ address: tokenIn.address }), address: recipient });
}


function TransferButton({ tokenIn, amount, accountOrigin, recipient }: { tokenIn: Token, amount: bigint,  accountOrigin: Address, recipient: Address }) {    
    const [balance, setBalance] = useState(BigInt(0));
    
    // const refetchBalance = useCallback(() => fetchBalance(tokenIn, accountOrigin).then(setBalance), [tokenIn, accountOrigin]);
    // useEffect(() => {        
    //     refetchBalance()
    // }, [tokenIn, accountOrigin]);

    if (balance < amount) {
        return <div className="flex flex-col text-center">
            <div className="font-semibold text-red-500">Tokens {tokenIn.symbol} insuficientes !</div>
            {/* <div className="text-sm text-gray-400">Your balance: {toTokens(balance, tokenIn.decimals)}</div> */}
        </div>
    }

    return (    
        <span>asdasdadas</span> 
        // <TransactionButton
        // transaction={async () => {
        //     return swap({
        //         inputToken: tokenIn,
        //         inputAmount: amount,
        //         outputToken: tokenOut,
        //         recipient: recipient,
        //         fee
        //     });
        // }}
        // onSent="Swap submitted..."
        //     onConfirmed="Successfully swapped."
        //     onError="Failed to complete swap."
        //     successCallback={refetchBalance}
        // >
        //     Swap
        // </TransactionButton>
    )
}

export default function TransferTokens() {
    const account = useActiveAccount();
    const [amount, setAmount] = useState<number>(0);
    const [destAddress, setDestAddress] = useState<string>('');

    const [inputTokenKey, setInputTokenKey] = useState<string | undefined>();
    const [outputTokenKey, setOutputTokenKey] = useState<string | undefined>();

    const inputToken = useMemo(() => inputTokenKey ? tokens[inputTokenKey] : undefined, [inputTokenKey]);

    const canTransfer= account && inputToken  && amount && destAddress !== ''
    const canGetBalance= account && inputToken

    const [balance, setBalance] = useState(BigInt(0));

    const refetchBalance = useCallback(() => fetchBalance(inputToken, account.address).then(setBalance), [inputToken, account?.address]);

    useEffect(() => {        
        if (canGetBalance) refetchBalance()
    }, [inputToken, account?.address]);

    return <Card className="">
        <CardHeader>
            <CardTitle>Transferir Tokens</CardTitle>
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
                    TOKENS A TRANSFERIR
                    <Input 
                        placeholder="0" 
                        type="number" 
                        onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                        className="w-full" 
                    />
                </div>
                <div className="flex w-full items-center gap-2" style={{fontSize: '14px', fontWeight:'500', paddingLeft:'15px'}}>
                    DESTINATARIO
                    <Input
                        placeholder="0x" 
                        type="text" 
                        onChange={(e) => setDestAddress(e.target.value || "")}
                        className="w-full" 
                    />

                </div>

                {canTransfer ?
                    <TransferButton
                        accountOrigin={account.address as Address}
                        recipient={destAddress as Address}
                        tokenIn={inputToken}
                        amount={toUnits(amount.toString(), inputToken?.decimals ?? 18)}                         
                    />
                : <>Not can transfer</>
                }         

            </div>
        </CardContent>
    </Card>
}
