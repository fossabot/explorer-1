import { estimateFees } from "op-viem/actions"
import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useAccount } from "wagmi"

import { abis } from "@/lib/wagmi/config/abis"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { rss3ChainPublicClient } from "@/lib/wagmi/public-client"

export function useEstimateWithdrawGas() {
  const account = useAccount()
  const [estimatedGas, setEstimatedGas] = useState("0")
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    if (account.address) {
      estimateFees(rss3ChainPublicClient, {
        abi: abis[rss3Chain.contracts.l2StandardBridge.address],
        functionName: "withdrawTo",
        args: [
          rss3Tokens[rss3Chain.id].address,
          account.address,
          0,
          200000,
          "0x",
        ],
        chainId: mainnetChain.id,
        account: account.address,
        to: rss3Chain.contracts.l2StandardBridge.address,
      }).then((gas) => {
        setEstimatedGas(formatEther(gas))
        setIsPending(false)
      })
    }
  }, [account.address])

  return {
    data: estimatedGas,
    isPending,
  }
}
