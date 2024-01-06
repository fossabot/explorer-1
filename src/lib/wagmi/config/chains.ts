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
      address: "0x7B1E82B72f41778E5E80b0e0a902247c96fc3450",
      blockCreated: 4432,
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
        address: "0x6e8042cd38359E0FB0aB4d478F58c181c0A8B833",
      },
    },
    portal: {
      [sourceId]: {
        address: "0xdcF0232D4c8f1FcAbbFF53046F6A5Cf7c63d0b83",
        blockCreated: 5025370,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0x308C91f13De69BD8c029460a4742e21d3540E850",
      },
    },
    l1CrossDomainMessenger: {
      [sourceId]: {
        address: "0x8A5d936753Cd8982B939eE6432BEeC01387D9703",
      },
    },
    l1Erc721Bridge: {
      [sourceId]: {
        address: "0x040031AF5B49AdBc8b73af0de02c1E9099D559a7",
      },
    },
  },
  testnet: true,
  sourceId,
})

const appEnv = env.NEXT_PUBLIC_ENV
export const mainnetChain = appEnv === "production" ? mainnet : sepolia
export const rss3Chain = appEnv === "production" ? rss3Testnet : rss3Testnet // TODO: prod chain
