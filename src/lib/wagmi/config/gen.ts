/**
 * This is the file used to generate wagmi abis and hooks.
 * Run `pnpm run wagmi:gen` to generate.
 */
import { erc20Abi } from "viem"
import { mainnet, sepolia } from "wagmi/chains"

import { defineConfig } from "@wagmi/cli"
import { blockExplorer, react } from "@wagmi/cli/plugins"

import { rss3Testnet } from "./chains"
import { rss3Tokens } from "./tokens"

export default defineConfig({
  out: "./src/lib/wagmi/hooks/core.ts",
  contracts: [
    {
      name: "rss3Token",
      abi: erc20Abi,
      address: {
        [mainnet.id]: rss3Tokens[mainnet.id].address,
        // [rss3.id]: "",
        [sepolia.id]: rss3Tokens[sepolia.id].address,
        [rss3Testnet.id]: rss3Tokens[rss3Testnet.id].address,
      },
    },
  ],
  plugins: [
    blockExplorer({
      baseUrl: "https://scan.testnet.rss3.dev/api",
      contracts: [
        {
          name: "staking",
          address: {
            [rss3Testnet.id]: "0x2dFb8d13b07B34eeD22E9EA840eAeA6B300fee9f",
          },
        },
      ],
    }),
    react(),
  ],
})
