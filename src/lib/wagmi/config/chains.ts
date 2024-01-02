import { defineChain } from "viem/chains/utils"
import { mainnet, sepolia } from "wagmi/chains"

import { env } from "@/env.mjs"

export const rss3Testnet = /*#__PURE__*/ defineChain({
  id: 2_333,
  name: "RSS3 Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.testnet.rss3.dev"],
    },
    default: {
      http: ["https://rpc.testnet.rss3.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "RSS3 Chain Testnet Scan",
      url: "https://scan.testnet.rss3.dev",
    },
  },
  contracts: {
    multicall3: {
      address: "0x4451b8F89A4E352a8dA927705659f404D9651cF4",
      blockCreated: 783722,
    },
  },
  testnet: true,
})

const appEnv = env.NEXT_PUBLIC_ENV
export const mainnetChain = appEnv === "production" ? mainnet : sepolia
export const rss3Chain = appEnv === "production" ? rss3Testnet : rss3Testnet // TODO: prod chain
