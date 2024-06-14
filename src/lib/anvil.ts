import { defineChain } from "thirdweb"

export default defineChain({
    id: 137,
    name: "Polygon Mainnet",
    rpc: "https://rpc.ankr.com/polygon",
    testnet: true,
    nativeCurrency: {
        name: "MATIC Token",
        symbol: "MATIC",
        decimals: 18,
    },
});
