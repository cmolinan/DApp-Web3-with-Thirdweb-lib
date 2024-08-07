"use client";
import React, { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import TransactionButton from "@/components/TransactionButton";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { tokens } from "@/constants";
import getContract from "@/lib/get-contract";

const WMATIC_CONTRACT = getContract({
    address: tokens["wmatic"].address
})

export default function Wrapper() {
    const account = useActiveAccount();
    const [amount, setAmount] = useState<number>(0);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-full rounded-xl" disabled={!account} variant="outline">MATIC -{'>'} WMatic</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Card className="border-none shadow-none">
                    <CardHeader>
                        <CardTitle style={{fontSize: '20px'}}>Convertir MATIC a WMATIC</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Input placeholder="0" type="number" onChange={(e) => setAmount(parseFloat(e.target.value))} />
                            Matic
                        </div>
                        <div className="mt-4 w-full">
                            <TransactionButton
                                transaction={() => {
                                    const tx = prepareContractCall({
                                        contract: WMATIC_CONTRACT,
                                        method: "function deposit()",
                                        params: [],
                                        value: toWei(amount.toString())
                                    })
                                    return tx;
                                }}
                                onSent="Convirtiendo MATIC en WMatic..."
                                onConfirmed="Conversion exitosa"
                                onError="No se pudo convertir a WMatic"
                                successCallback={() => setAmount(0)}
                            >
                                Convertir
                            </TransactionButton>
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}
