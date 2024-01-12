import { useEffect, useState } from "react"
import { Address } from "viem"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import {
  mainnetChainPublicClient,
  rss3ChainPublicClient,
} from "@/lib/wagmi/public-client"

export function useMinutesToProve(withdrawalHash?: Address) {
  const [data, setData] = useState({
    period: 3600,
    minutes: 0,
  })
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (withdrawalHash) {
      setIsFetching(true)
      let timer: NodeJS.Timeout
      ;(async () => {
        const receipt = await rss3ChainPublicClient.getTransactionReceipt({
          hash: withdrawalHash,
        })

        const { interval, seconds } =
          await mainnetChainPublicClient.getTimeToProve({
            targetChain: rss3Chain,
            receipt,
          })
        setData({
          period: interval,
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
