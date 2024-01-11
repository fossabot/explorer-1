import { useEffect, useState } from "react"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useSecondsToProve(blockNumber: bigint) {
  const [seconds, setSeconds] = useState(0n)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    if (blockNumber) {
      let interval: NodeJS.Timeout
      ;(async () => {
        const time = await mainnetChainPublicClient.getSecondsToNextL2Output({
          latestL2BlockNumber: blockNumber,
          l2OutputOracle:
            rss3Chain.contracts.l2OutputOracle[rss3Chain.sourceId].address,
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
  }, [blockNumber])

  return {
    data: seconds,
    isPending,
  }
}
