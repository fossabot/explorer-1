import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useAccount } from "wagmi"

import { abis } from "@/lib/wagmi/config/abis"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useEstimateDepositFee() {
  const account = useAccount()
  const [estimatedGas, setEstimatedGas] = useState("0")
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (account.address) {
        const gas = await mainnetChainPublicClient.estimateContractGas({
          address:
            rss3Chain.contracts.l1StandardBridge[rss3Chain.sourceId].address,
          abi: abis[
            rss3Chain.contracts.l1StandardBridge[rss3Chain.sourceId].address
          ],
          functionName: "depositERC20To",
          args: [
            rss3Tokens[mainnetChain.id].address,
            rss3Tokens[rss3Chain.id].address,
            account.address,
            0,
            200000,
            "0x",
          ],
          account: account.address,
        })
        const feePerGas = await mainnetChainPublicClient.estimateFeesPerGas()
        if (feePerGas.maxFeePerGas) {
          setEstimatedGas(formatEther(gas * feePerGas.maxFeePerGas))
        }
        setIsPending(false)
      }
    })()
  }, [account.address])

  return {
    data: estimatedGas,
    isPending,
  }
}
