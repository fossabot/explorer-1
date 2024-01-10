import { useWriteWithdrawERC20 } from "op-wagmi"
import { useEffect } from "react"
import { useAccount, useWaitForTransactionReceipt } from "wagmi"

import { rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { showNotification } from "@mantine/notifications"

export function useRSS3InitiateWithdrawal() {
  const { writeWithdrawERC20, data, isPending, isSuccess, reset } =
    useWriteWithdrawERC20({
      mutation: {
        onError: (error) => {
          showNotification({
            color: "red",
            title: "Initiate withdrawal failed",
            message: error.message,
          })
        },
      },
    })

  const account = useAccount()

  const waitForTransaction = useWaitForTransactionReceipt({
    hash: data,
  })

  // on success
  useEffect(() => {
    if (waitForTransaction.isSuccess) {
      showNotification({
        color: "teal",
        title: "Initiate withdrawal successful",
        message: "Your $RSS3 tokens withdrawal have been initiated",
      })
    }
  }, [waitForTransaction.isSuccess])

  return {
    write: (value: bigint) => {
      if (account.address) {
        writeWithdrawERC20({
          args: {
            l2Token: rss3Tokens[rss3Chain.id].address,
            to: account.address,
            amount: value,
          },
          chainId: rss3Chain.id,
        })
      } else {
        showNotification({
          color: "red",
          title: "Initiate withdrawal failed",
          message: "Please connect your wallet first",
        })
      }
    },
    isPending: isPending || (data && waitForTransaction.isPending),
    isSuccess: isSuccess && data && waitForTransaction.isSuccess,
    reset,
  }
}
