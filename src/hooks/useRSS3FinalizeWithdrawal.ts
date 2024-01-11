import { useWriteFinalizeWithdrawalTransaction } from "op-wagmi"
import { useEffect } from "react"
import { type Address } from "viem"
import { useWaitForTransactionReceipt } from "wagmi"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { showNotification } from "@mantine/notifications"

export function useRSS3FinalizeWithdrawal() {
  const {
    writeFinalizeWithdrawalTransaction,
    data,
    isPending,
    isSuccess,
    reset,
  } = useWriteFinalizeWithdrawalTransaction({
    mutation: {
      onError: (error) => {
        showNotification({
          color: "red",
          title: "Finalize withdrawal failed",
          message: error.message,
        })
      },
    },
  })

  const waitForTransaction = useWaitForTransactionReceipt({
    hash: data,
  })

  // on success
  useEffect(() => {
    if (waitForTransaction.isSuccess) {
      showNotification({
        color: "teal",
        title: "Finalize withdrawal successful",
        message: "Your $RSS3 tokens withdrawal have been finalized",
      })
    }
  }, [waitForTransaction.isSuccess])

  return {
    write: (withdrawalTxHash: Address) =>
      writeFinalizeWithdrawalTransaction({
        args: {
          withdrawalTxHash: withdrawalTxHash,
        },
        l2ChainId: rss3Chain.id,
      }),
    isPending: isPending || (data && waitForTransaction.isPending),
    isSuccess: isSuccess && data && waitForTransaction.isSuccess,
    reset,
  }
}
