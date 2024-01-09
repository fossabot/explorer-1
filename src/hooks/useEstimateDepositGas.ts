import { publicL2OpStackActions } from "op-viem"
import { estimateL1Fee } from "op-viem/actions"
import { useEffect, useState } from "react"
import { createPublicClient, formatEther, http } from "viem"
import { useAccount } from "wagmi"

import { abis } from "@/lib/wagmi/config/abis"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"

const publicClient = createPublicClient({
  chain: rss3Chain,
  transport: http(),
}).extend(publicL2OpStackActions)

export function useEstimateDepositGas() {
  const account = useAccount()
  const [estimatedGas, setEstimatedGas] = useState("0")
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    if (account.address) {
      estimateL1Fee(publicClient, {
        abi: abis[
          rss3Chain.contracts.l1StandardBridge[rss3Chain.sourceId].address
        ],
        functionName: "depositERC20To",
        args: [
          rss3Tokens[mainnetChain.id].address,
          rss3Tokens[rss3Chain.id].address,
          account.address,
          1,
          1,
          "0x",
        ],
        chainId: mainnetChain.id,
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
