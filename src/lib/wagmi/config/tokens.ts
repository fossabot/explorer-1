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
    address: "0x568F64582A377ea52d0067c4E430B9aE22A60473",
  },
  [mainnet.id]: {
    address: "0xc98d64da73a6616c42117b582e832812e7b8d57f",
  },
  [rss3Testnet.id]: {
    address: "0x4200000000000000000000000000000000000042",
  },
}
