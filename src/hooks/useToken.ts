import { erc20Abi as abi, Address } from "viem"
import { useConfig, usePublicClient, useReadContracts } from "wagmi"

export type UseTokenOptions = {
  token: Address
  account: Address
}

export type UseTokenResult = {
  decimals: number
  balance: bigint
  name: string
  symbol: string
  totalSupply: bigint
}

export function useToken({ token, account }: UseTokenOptions) {
  const config = useConfig()
  const client = usePublicClient()

  const result = useReadContracts({
    allowFailure: false,
    contracts: [
      { address: token, abi, functionName: "decimals" },
      { address: token, abi, functionName: "balanceOf", args: [account] },
      { address: token, abi, functionName: "name" },
      { address: token, abi, functionName: "symbol" },
      { address: token, abi, functionName: "totalSupply" },
    ],
    config: { ...config, chains: [chain] },
  })

  return {
    ...result,
    data: result.data
      ? ({
          decimals: result.data[0],
          balance: result.data[1],
          name: result.data[2],
          symbol: result.data[3],
          totalSupply: result.data[4],
        } satisfies UseTokenResult)
      : null,
  }
}
