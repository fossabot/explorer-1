import { publicL1OpStackActions, publicL2OpStackActions } from "op-viem"
import { createPublicClient, http } from "viem"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"

export const rss3ChainPublicClient = createPublicClient({
  chain: rss3Chain,
  transport: http(),
}).extend(publicL2OpStackActions)

export const mainnetChainPublicClient = createPublicClient({
  chain: mainnetChain,
  transport: http(),
}).extend(publicL1OpStackActions)
