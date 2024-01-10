import { erc20Abi, formatUnits } from "viem"
import { useAccount, useBalance, useReadContracts } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"

export const useRSS3Balance = (chainId: number) => {
  const account = useAccount()

  const rss3ChainBalance = useBalance({
    address: account.address,
    chainId: rss3Chain.id,
  })

  const mainnetChainBalance = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: rss3Tokens[mainnetChain.id].address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account.address || "0x"],
        chainId: mainnetChain.id,
      },
      {
        address: rss3Tokens[mainnetChain.id].address,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: mainnetChain.id,
      },
    ],
  })

  if (!account.address) {
    return {
      formatted: "0",
      isPending: true,
    }
  } else if (chainId === rss3Chain.id) {
    return rss3ChainBalance.data
      ? {
          decimals: rss3ChainBalance.data.decimals,
          value: rss3ChainBalance.data.value,
          formatted: formatUnits(
            rss3ChainBalance.data.value ?? 0n,
            rss3ChainBalance.data.decimals || rss3Tokens.decimals,
          ),
          refetch: rss3ChainBalance.refetch,
          isPending: rss3ChainBalance.isPending,
        }
      : {
          formatted: "0",
          isPending: rss3ChainBalance.isPending,
        }
  } else if (chainId === mainnetChain.id) {
    return mainnetChainBalance.data
      ? {
          decimals: mainnetChainBalance.data?.[1],
          value: mainnetChainBalance.data?.[0],
          formatted: formatUnits(
            mainnetChainBalance.data?.[0] ?? 0n,
            mainnetChainBalance.data?.[1] || rss3Tokens.decimals,
          ),
          refetch: mainnetChainBalance.refetch,
          isPending: mainnetChainBalance.isPending,
        }
      : {
          formatted: "0",
          isPending: mainnetChainBalance.isPending,
        }
  } else {
    return {
      formatted: "0",
      isPending: false,
    }
  }
}
