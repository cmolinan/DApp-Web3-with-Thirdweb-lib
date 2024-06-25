import { Address } from "thirdweb";
import Token from "@/types/token";
import getContract from "@/lib/get-contract";
import { transfer as thirdwebApprove } from "thirdweb/extensions/erc20";

type TransferOptions = {
	token: Token,
	amount: bigint,
	recipient: Address
}

export default function transfer(options: TransferOptions) {
	const contract = getContract({
		address: options.token.address
	});

	return thirdwebApprove({
		contract,
		to: options.recipient,
		amountWei: options.amount
	});
}
