import { useEffect, useState } from "react"
import { type Address } from "viem"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useMinutesToFinalizable(withdrawalHash?: Address) {
  const [minutes, setMinutes] = useState(0n)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    if (withdrawalHash) {
      let interval: NodeJS.Timeout
      ;(async () => {
        const time = await mainnetChainPublicClient.getSecondsToFinalizable({
          portal: rss3Chain.contracts.portal[rss3Chain.sourceId].address,
          l2OutputOracle:
            rss3Chain.contracts.l2OutputOracle[rss3Chain.sourceId].address,
          withdrawalHash,
        })
        setMinutes(time / 60n)
        setIsPending(false)

        interval = setInterval(() => {
          setMinutes((prev) => prev - 1n)
        }, 1000 * 60)
      })()

      return () => {
        clearInterval(interval)
      }
    }
  }, [withdrawalHash])

  return {
    data: minutes,
    isPending,
  }
}
