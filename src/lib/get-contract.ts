import { Address, getContract as thirdwebGetContract, Chain } from "thirdweb";
import client from "@/lib/thirdweb-client";
import { polygon } from "thirdweb/chains";

type GetContractOptions = {
    address: Address;
    chain?: Chain
}

export default function getContract(options: GetContractOptions) {
    return thirdwebGetContract({
        client,
        chain: polygon,
        address: options.address
    });
}

