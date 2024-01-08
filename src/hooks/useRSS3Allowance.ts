import { erc20Abi, zeroAddress } from "viem"
import { useAccount, useReadContract } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"

export function useRSS3Allowance() {
  const account = useAccount()
  const contractRead = useReadContract({
    address: rss3Tokens[mainnetChain.id].address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [
      account.address || zeroAddress,
      rss3Chain.contracts.l1StandardBridge[rss3Chain.sourceId].address,
    ],
  })

  return contractRead
}
