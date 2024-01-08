import { useEffect } from "react"
import { erc20Abi } from "viem"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { showNotification } from "@mantine/notifications"

export function useRSS3Approve() {
  const { writeContract, data, isPending, isSuccess, reset } = useWriteContract(
    {
      mutation: {
        onError: (error) => {
          showNotification({
            color: "red",
            title: "Deposit failed",
            message: error.message,
          })
        },
      },
    },
  )

  const waitForTransaction = useWaitForTransactionReceipt({
    hash: data,
  })

  // on success
  useEffect(() => {
    if (waitForTransaction.isSuccess) {
      showNotification({
        color: "teal",
        title: "Approve successful",
        message: "Your $RSS3 tokens have been approved",
      })
    }
  }, [waitForTransaction.isSuccess])

  return {
    write: (value: bigint) =>
      writeContract({
        address: rss3Tokens[mainnetChain.id].address,
        abi: erc20Abi,
        functionName: "approve",
        args: [
          rss3Chain.contracts.l1StandardBridge[rss3Chain.sourceId].address,
          value,
        ],
      }),
    isPending: isPending || (data && waitForTransaction.isPending),
    isSuccess: isSuccess && data && waitForTransaction.isSuccess,
    reset,
  }
}
