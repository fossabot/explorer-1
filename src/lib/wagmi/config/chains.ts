import { defineChain } from "viem/chains/utils"
import { mainnet, sepolia } from "wagmi/chains"

import { env } from "@/env.mjs"

const sourceId = sepolia.id

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
    gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
    l1Block: { address: "0x4200000000000000000000000000000000000015" },
    l2CrossDomainMessenger: {
      address: "0x4200000000000000000000000000000000000007",
    },
    l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
    l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
    l2ToL1MessagePasser: {
      address: "0x4200000000000000000000000000000000000016",
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0xf8523B3C14a9F3F9C768995eDDC7fF90cFB972b6",
      },
    },
    portal: {
      [sourceId]: {
        address: "0x22458503eF9fa318BE18166C79B29C10063C6b37",
        blockCreated: 4864634,
      },
    },
  },
  testnet: true,
  sourceId,
})

const appEnv = env.NEXT_PUBLIC_ENV
export const mainnetChain = appEnv === "production" ? mainnet : sepolia
export const rss3Chain = appEnv === "production" ? rss3Testnet : rss3Testnet // TODO: prod chain
