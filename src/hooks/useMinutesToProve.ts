import { useEffect, useState } from "react"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useMinutesToProve(blockNumber?: bigint) {
  const [minutes, setMinutes] = useState(0n)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (blockNumber) {
      setIsFetching(true)
      let interval: NodeJS.Timeout
      ;(async () => {
        const time = await mainnetChainPublicClient.getSecondsToNextL2Output({
          latestL2BlockNumber: blockNumber,
          l2OutputOracle:
            rss3Chain.contracts.l2OutputOracle[rss3Chain.sourceId].address,
        })
        setMinutes(time / 60n)
        setIsFetching(false)

        interval = setInterval(() => {
          setMinutes((prev) => prev - 1n)
        }, 1000 * 60)
      })()

      return () => {
        clearInterval(interval)
      }
    }
  }, [blockNumber])

  return {
    data: minutes,
    isFetching,
  }
}
