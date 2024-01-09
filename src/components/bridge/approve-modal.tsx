import { useEffect } from "react"
import { formatUnits, parseUnits } from "viem"

import { useRSS3Allowance } from "@/hooks/useRSS3Allowance"
import { useRSS3Approve } from "@/hooks/useRSS3Approve"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { Button, Modal } from "@mantine/core"

export function BridgeApproveModal({
  opened,
  close,
  amount,
  onSuccess,
}: {
  opened: boolean
  close: () => void
  amount: number
  onSuccess: () => void
}) {
  const rss3Allowance = useRSS3Allowance()
  const rss3Approve = useRSS3Approve()

  const requestedAmount = parseUnits(amount.toString(), rss3Tokens.decimals)

  useEffect(() => {
    if (rss3Approve.isSuccess) {
      rss3Allowance.refetch().then((allowance) => {
        const isExceededAllowance = requestedAmount > (allowance.data || 0)
        if (!isExceededAllowance) {
          close()
          onSuccess()
        }
        rss3Approve.reset()
      })
    }
  }, [rss3Approve.isSuccess])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <div className="font-bold text-xl">
          🫣 One More Step: Approve Token Allowance
        </div>
      }
      centered
      size="lg"
      radius="lg"
      padding="xl"
    >
      <div className="mb-6">
        <p>
          Please increase your allowance to a minimum of{" "}
          <b className="font-semibold">{amount} RSS3</b>
        </p>
        <p>
          The current allowance is{" "}
          <b className="font-semibold">
            {formatUnits(rss3Allowance.data || 0n, rss3Tokens.decimals)} RSS3
          </b>
        </p>
        <p className="text-zinc-500 text-sm my-4">
          *Allowance is a predetermined limit set by you on how much $RSS3 can
          be managed by the RSS3 Billing contract.
        </p>
      </div>
      <Button
        fullWidth
        size="lg"
        radius="lg"
        type="submit"
        onClick={() => rss3Approve.write(requestedAmount)}
        loading={rss3Approve.isPending || rss3Allowance.isFetching}
      >
        Approve
      </Button>
    </Modal>
  )
}
