import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useAccount } from "wagmi"

import { abis } from "@/lib/wagmi/config/abis"
import { rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { rss3ChainPublicClient } from "@/lib/wagmi/public-client"

export function useEstimateWithdrawFee() {
  const account = useAccount()
  const [estimatedFee, setEstimatedFee] = useState("0")
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (account.address) {
        const fee = await rss3ChainPublicClient.estimateContractTotalFee({
          address: rss3Chain.contracts.l2StandardBridge.address,
          abi: abis[rss3Chain.contracts.l2StandardBridge.address],
          functionName: "withdrawTo",
          account: account.address,
          args: [
            rss3Tokens[rss3Chain.id].address,
            account.address,
            0,
            200000,
            "0x",
          ],
        })

        setEstimatedFee(formatEther(fee))
        setIsPending(false)
      }
    })()
  }, [account.address])

  return {
    data: estimatedFee,
    isPending,
  }
}
