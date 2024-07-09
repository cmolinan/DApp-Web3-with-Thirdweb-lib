import React, { ReactNode } from "react";
import { PreparedTransaction } from "thirdweb";
import { TransactionButton as ThirdwebTransactionButton } from "thirdweb/react";
import toast from "react-hot-toast"

type TransactionButtonProps = {
    id?: string;
    disabled?: boolean,
    transaction: () => PreparedTransaction<any> | Promise<PreparedTransaction<any>>,
    onSent: string,
    onConfirmed: string,
    onError: string,
    successCallback?: (receipt: any) => void,
    errorCallback?: (error: any) => void,
    children: ReactNode
}

export default function TransactionButton(props: TransactionButtonProps) {
    return (
        <ThirdwebTransactionButton
            className="!w-full"
            transaction={props.transaction}
            onTransactionSent={(result) =>
                toast.loading(props.onSent, {
                    duration: Infinity,
                    id: props.id ?? "tx",
                    className: 'custom-toast-container'
                }
            )
            }
            onTransactionConfirmed={(receipt) => {
                toast.success(props.onConfirmed, {
                    duration: 5000,
                    id: props.id ?? "tx",
                    className: 'custom-toast-container'
                })
                props.successCallback && props.successCallback(receipt);
            }}
            onError={(error) => {
                toast.error(props.onError, {
                    duration: 5000,
                    id: props.id ?? "tx",
                    className: 'custom-toast-container'
                })
                props.errorCallback && props.errorCallback(error);
            }}
        >
            {props.children}
        </ThirdwebTransactionButton>
    )
}