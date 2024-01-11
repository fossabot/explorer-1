import { useWriteProveWithdrawalTransaction } from "op-wagmi"
import { useEffect } from "react"
import { type Address } from "viem"
import { useWaitForTransactionReceipt } from "wagmi"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { showNotification } from "@mantine/notifications"

export function useProveWithdrawal() {
  const { writeProveWithdrawalTransaction, data, isPending, isSuccess, reset } =
    useWriteProveWithdrawalTransaction({
      mutation: {
        onError: (error) => {
          showNotification({
            color: "red",
            title: "Prove withdrawal failed",
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
        title: "Prove withdrawal successful",
        message: "Your $RSS3 tokens withdrawal have been proved",
      })
    }
  }, [waitForTransaction.isSuccess])

  return {
    write: (withdrawalTxHash: Address) =>
      writeProveWithdrawalTransaction({
        args: {
          withdrawalTxHash: withdrawalTxHash,
        },
        l2ChainId: rss3Chain.id,
      }),
    isPending: isPending || (data && waitForTransaction.isPending),
    isSuccess: isSuccess && data && waitForTransaction.isSuccess,
    reset,
    data,
  }
}
