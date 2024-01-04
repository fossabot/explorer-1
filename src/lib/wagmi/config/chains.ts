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
    l1StandardBridge: {
      [sourceId]: {
        address: "0x84F0617A60d16121e7B3E9BadD3b91F73E992980",
      },
    },
    l1CrossDomainMessenger: {
      [sourceId]: {
        address: "0x91BC106A150F7520eA97C6D61f9e6e169254730e",
      },
    },
    l1Erc721Bridge: {
      [sourceId]: {
        address: "0x93545a2Aad3f09adB378D16c897722A95e3782D3",
      },
    },
  },
  testnet: true,
  sourceId,
})

const appEnv = env.NEXT_PUBLIC_ENV
export const mainnetChain = appEnv === "production" ? mainnet : sepolia
export const rss3Chain = appEnv === "production" ? rss3Testnet : rss3Testnet // TODO: prod chain
