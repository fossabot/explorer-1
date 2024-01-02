import { env } from "@/env.mjs"
import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { createConfig, http } from "@wagmi/core"
import { Chain } from "@wagmi/core/chains"

import { mainnetChain, rss3Chain } from "./chains"

export const chains: readonly [Chain, ...Chain[]] = [mainnetChain, rss3Chain]

const { connectors } = getDefaultWallets({
  appName: "RSS3 Explorer",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnetChain.id]: http(),
    [rss3Chain.id]: http(),
  },
})
