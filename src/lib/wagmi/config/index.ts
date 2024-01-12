import { cookieStorage, createConfig, createStorage, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"

import { env } from "@/env.mjs"
import { getDefaultWallets } from "@rainbow-me/rainbowkit"

import { mainnetChain, rss3Chain } from "./chains"

export const chains = [mainnetChain, rss3Chain] as const

const { connectors } = getDefaultWallets({
  appName: "RSS3 Explorer",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

export const wagmiConfig = createConfig({
  chains,
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [rss3Chain.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
