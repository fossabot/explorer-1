import type { Address } from "viem"
import { mainnet, sepolia } from "wagmi/chains"

import { rss3Testnet } from "./chains"

export const rss3Tokens: {
  decimals: number
  [chainId: number]: {
    address: Address
  }
} = {
  decimals: 18,
  [sepolia.id]: {
    address: "0xd892f9f0eea6f6a586aaba7ed895a6eb4fa754d0",
  },
  [mainnet.id]: {
    address: "0xc98d64da73a6616c42117b582e832812e7b8d57f",
  },
  [rss3Testnet.id]: {
    address: "0x4200000000000000000000000000000000000301",
  },
}
