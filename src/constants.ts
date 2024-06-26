import getContract from "./lib/get-contract";
import Token from "./types/token";

export const tokens: { [id: string]: Token } = {
  "weth": {
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    symbol: "WETH",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/2518/standard/weth.png?1696503332"
  },
  "usdc": {
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    symbol: "USDC",
    decimals: 6,
    image: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694"
  },
  "usdt": {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    symbol: "USDT",
    decimals: 6,
    image: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661"
  },
  "matic": {
    address: "0x0000000000000000000000000000000000001010",
    symbol: "MATIC",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745"
  },  
}

export const ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
export const FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const QUOTER = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"

export const ROUTER_CONTRACT = getContract({ address: ROUTER });
export const FACTORY_CONTRACT = getContract({ address: FACTORY });
export const QUOTER_CONTRACT = getContract({ address: QUOTER });
