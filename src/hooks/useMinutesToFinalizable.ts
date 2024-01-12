import { useEffect, useState } from "react"
import { type Address } from "viem"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { mainnetChainPublicClient } from "@/lib/wagmi/public-client"

export function useMinutesToFinalizable(withdrawalHash?: Address) {
  const [data, setData] = useState({
    period: 0,
    minutes: 0,
  })
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (withdrawalHash) {
      setIsFetching(true)
      let timer: NodeJS.Timeout
      ;(async () => {
        const { period, seconds } =
          await mainnetChainPublicClient.getTimeToFinalize({
            targetChain: rss3Chain,
            withdrawalHash,
          })
        setData({
          period,
          minutes: Math.ceil(seconds / 60),
        })
        setIsFetching(false)

        timer = setInterval(() => {
          setData((prev) => ({
            ...prev,
            minutes: prev.minutes - 1,
          }))
        }, 1000 * 60)
      })()

      return () => {
        clearInterval(timer)
      }
    }
  }, [withdrawalHash])

  return {
    data,
    isFetching,
  }
}
