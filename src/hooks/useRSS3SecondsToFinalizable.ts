import { useEffect, useState } from "react"
import { type Address } from "viem"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useRSS3SecondsToFinalizable(withdrawalHash: Address) {
  const [seconds, setSeconds] = useState(0n)
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
        setSeconds(time)
        setIsPending(false)

        interval = setInterval(() => {
          setSeconds((prev) => prev - 1n)
        })
      })()

      return () => {
        clearInterval(interval)
      }
    }
  }, [withdrawalHash])

  return {
    data: seconds,
    isPending,
  }
}
