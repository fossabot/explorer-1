import { createPublicClient, http } from "viem"
import { publicActionsL1, publicActionsL2 } from "viem/op-stack"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"

export const rss3ChainPublicClient = createPublicClient({
  chain: rss3Chain,
  transport: http(),
}).extend(publicActionsL2())

export const mainnetChainPublicClient = createPublicClient({
  chain: mainnetChain,
  transport: http(),
}).extend(publicActionsL1())
