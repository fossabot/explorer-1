import { useEffect } from "react"
import { parseUnits } from "viem"

import { useEstimateDepositFee } from "@/hooks/useEstimateDepositFee"
import { useRSS3Deposit } from "@/hooks/useRSS3Deposit"
import { api } from "@/lib/trpc/client"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { Button, Modal } from "@mantine/core"
import { IconEthereum, IconRss3Circle } from "@rss3/web3-icons-react"

export function BridgeDepositModal({
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
  const gasSymbol = mainnetChain.nativeCurrency.symbol
  const tokenPrice = api.thirdParty.tokenPrice.useQuery()
  const rss3Deposit = useRSS3Deposit()

  const requestedAmount = parseUnits(amount.toString(), rss3Tokens.decimals)
  const handleDeposit = () => {
    rss3Deposit.write(requestedAmount)
  }

  const estimatedDepositFee = useEstimateDepositFee()
  const feeWorth = (
    parseFloat(estimatedDepositFee.data) * (tokenPrice.data?.[gasSymbol] || 0)
  ).toFixed(3)
  const rss3Worth = (amount * (tokenPrice.data?.RSS3 || 0)).toFixed(3)

  useEffect(() => {
    if (rss3Deposit.isSuccess) {
      close()
      onSuccess()
      rss3Deposit.reset()
    }
  }, [rss3Deposit.isSuccess])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<div className="font-bold text-xl">👀 Review Deposit</div>}
      centered
      size="md"
      radius="lg"
      padding="xl"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center text-lg">
            <div className="flex items-center gap-2">
              <IconEthereum className="w-6 h-6" />
              <span className="font-semibold">{mainnetChain.name}</span>
            </div>
            <i className="i-mingcute-arrow-right-fill text-primary-500 mx-6" />
            <div className="flex items-center gap-2">
              <IconRss3Circle className="w-6 h-6" />
              <span className="font-semibold">{rss3Chain.name}</span>
            </div>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1">
            <i className="i-mingcute-coin-2-line" />
            Amount to deposit
          </p>
          <p className="font-semibold">
            {amount} RSS3 (${rss3Worth})
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1">
            <i className="i-mingcute-gas-station-line" />
            Gas fee to transfer
          </p>
          <p className="font-semibold">
            {estimatedDepositFee.data} {gasSymbol} (${feeWorth})
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1">
            <i className="i-mingcute-stopwatch-line" /> Time to transfer
          </p>
          <p className="font-semibold">~10 minutes</p>
        </div>
        <Button
          fullWidth
          size="lg"
          radius="lg"
          loading={rss3Deposit.isPending}
          onClick={handleDeposit}
        >
          Deposit
        </Button>
      </div>
    </Modal>
  )
}
