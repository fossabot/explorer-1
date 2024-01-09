import { useWriteDepositERC20 } from "op-wagmi"
import { useEffect } from "react"
import { zeroAddress } from "viem"
import { useAccount, useWaitForTransactionReceipt } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { showNotification } from "@mantine/notifications"

export function useRSS3Deposit() {
  const { writeDepositERC20, data, isPending, isSuccess, reset } =
    useWriteDepositERC20({
      mutation: {
        onError: (error) => {
          showNotification({
            color: "red",
            title: "Deposit failed",
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
        title: "Deposit successful",
        message: "Your $RSS3 tokens have been deposited",
      })
    }
  }, [waitForTransaction.isSuccess])

  return {
    write: (value: bigint) =>
      writeDepositERC20({
        args: {
          l1Token: rss3Tokens[mainnetChain.id].address,
          l2Token: rss3Tokens[rss3Chain.id].address,
          to: account.address || zeroAddress,
          amount: value,
        },
        l2ChainId: rss3Chain.id,
      }),
    isPending: isPending || (data && waitForTransaction.isPending),
    isSuccess: isSuccess && data && waitForTransaction.isSuccess,
    reset,
  }
}
