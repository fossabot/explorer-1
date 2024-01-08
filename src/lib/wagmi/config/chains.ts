import { defineChain } from "viem/chains/utils"
import { mainnet, sepolia } from "wagmi/chains"

import { env } from "@/env.mjs"

const sourceId = sepolia.id

export const rss3Testnet = /*#__PURE__*/ defineChain({
  id: 2_333,
  name: "RSS3 Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "RSS3",
    symbol: "RSS3",
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
      address: "0xBAb79A19B937e38d18592C3C9292782700Edf0a2",
      blockCreated: 5127,
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
        address: "0xb6eB7a53B0BD7d17De9232aE9bD9605b9c750237",
      },
    },
    portal: {
      [sourceId]: {
        address: "0xb58f3f17Ef3fAF6cd1C4Fa87b6e15A97B653993E",
        blockCreated: 5045289,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0xc575bd904D16a433624db98D01d5AbD5c92D0F38",
      },
    },
    l1CrossDomainMessenger: {
      [sourceId]: {
        address: "0x17C635E784B0f098Ab57A39d6dDeA0C786A3AfC1",
      },
    },
    l1Erc721Bridge: {
      [sourceId]: {
        address: "0xEc04C4F1dB8DC940C21a1954f71dF3cF90d5a6de",
      },
    },
  },
  testnet: true,
  sourceId,
})

const appEnv = env.NEXT_PUBLIC_ENV
export const mainnetChain = appEnv === "production" ? mainnet : sepolia
export const rss3Chain = appEnv === "production" ? rss3Testnet : rss3Testnet // TODO: prod chain
