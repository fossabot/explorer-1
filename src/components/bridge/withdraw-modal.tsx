import { useEffect, useState } from "react"
import { parseUnits } from "viem"

import { useEstimateDepositGas } from "@/hooks/useEstimateDepositGas"
import { useRSS3Deposit } from "@/hooks/useRSS3Deposit"
import { api } from "@/lib/trpc/client"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { Button, Modal, Stepper } from "@mantine/core"
import { IconEthereum, IconRss3Circle } from "@rss3/web3-icons-react"

export function BridgeWithdrawModal({
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

  const estimatedDepositGas = useEstimateDepositGas()
  const gasWorth = (
    parseFloat(estimatedDepositGas.data) * (tokenPrice.data?.[gasSymbol] || 0)
  ).toFixed(3)
  const rss3Worth = (amount * (tokenPrice.data?.RSS3 || 0)).toFixed(3)

  const [active, setActive] = useState(0)

  const actions = [
    {
      text: "Initiate withdrawal",
      step: 1,
      description: "Initiate withdrawal request on RSS3 Chain Mainnet",
    },
    {
      text: "Wait 30 minutes",
      description:
        "Wait for withdrawal request to be uploaded to the Ethereum Mainnet",
    },
    {
      text: "Prove withdrawal",
      step: 2,
      description: "Prove withdrawal on Ethereum Mainnet",
    },
    {
      text: "Wait 7 days",
      description: "Wait for the seven day finalization window",
    },
    {
      text: "Claim withdrawal",
      step: 3,
      description: "The funds will be realized on the Ethereum Mainnet",
    },
  ]

  const waitStepStyles = {
    stepLabel: {
      color: "var(--mantine-color-dimmed)",
    },
    stepIcon: {
      color: "var(--mantine-color-dimmed)",
    },
  }

  const handleClick = () => {
    rss3Deposit.write(requestedAmount)
  }

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
      title={<div className="font-bold text-xl">Review Withdraw</div>}
      centered
      size="lg"
      radius="lg"
      padding="xl"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center text-lg">
            <div className="flex items-center gap-2">
              <IconRss3Circle className="w-6 h-6" />
              <span className="font-semibold">{rss3Chain.name}</span>
            </div>
            <i className="i-mingcute-arrow-right-fill text-primary-500 mx-6" />
            <div className="flex items-center gap-2">
              <IconEthereum className="w-6 h-6" />
              <span className="font-semibold">{mainnetChain.name}</span>
            </div>
          </div>
        </div>
        <div>
          <p>Amount to withdraw</p>
          <p className="font-semibold">
            {amount} RSS3 (${rss3Worth})
          </p>
        </div>
        <Stepper
          active={active}
          onStepClick={setActive} // TODO
          orientation="vertical"
        >
          {actions.map((action) => (
            <Stepper.Step
              key={action.text}
              styles={action.step ? undefined : waitStepStyles}
              label={
                action.step
                  ? `Step ${action.step}: ${action.text}`
                  : action.text
              }
              description={action.description}
              icon={
                action.step ? (
                  action.step
                ) : (
                  <i className="i-mingcute-stopwatch-line" />
                )
              }
            ></Stepper.Step>
          ))}
        </Stepper>
        <Button
          fullWidth
          size="lg"
          radius="lg"
          loading={rss3Deposit.isPending}
          onClick={handleClick}
          disabled={!actions[active].step}
        >
          {actions[active].text}
        </Button>
      </div>
    </Modal>
  )
}
