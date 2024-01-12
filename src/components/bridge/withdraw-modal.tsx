import { useEffect, useState } from "react"
import { parseUnits, type Address } from "viem"

import { useFinalizeWithdrawal } from "@/hooks/use3FinalizeWithdrawal"
import { useInitiateWithdrawal } from "@/hooks/useInitiateWithdrawal"
import { useMinutesToFinalizable } from "@/hooks/useMinutesToFinalizable"
import { useMinutesToProve } from "@/hooks/useMinutesToProve"
import { useProveWithdrawal } from "@/hooks/useProveWithdrawal"
import { api } from "@/lib/trpc/client"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { rss3Tokens } from "@/lib/wagmi/config/tokens"
import { Button, Modal, Stepper } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconEthereum, IconRss3Circle } from "@rss3/web3-icons-react"

export function BridgeWithdrawModal({
  opened,
  close,
  amount,
  onSuccess,
  initiationTxHash,
  initiationBlockNumber,
  proofTxHash,
}: {
  opened: boolean
  close: () => void
  amount: number
  onSuccess: () => void
  initiationTxHash?: Address
  initiationBlockNumber?: bigint
  proofTxHash?: Address
}) {
  const tokenPrice = api.thirdParty.tokenPrice.useQuery()

  const initiateWithdrawal = useInitiateWithdrawal()
  const proveWithdrawal = useProveWithdrawal()
  const finalizeWithdrawal = useFinalizeWithdrawal()

  const requestedAmount = parseUnits(amount.toString(), rss3Tokens.decimals)
  const [_initiationTxHash, _setInitiationTxHash] = useState(initiationTxHash)
  const [_initiationBlockNumber, _setInitiationBlockNumber] = useState(
    initiationBlockNumber,
  )
  const [_proofTxHash, _setProofTxHash] = useState(proofTxHash)

  const minutesToProve = useMinutesToProve(_initiationBlockNumber)
  const minutesToFinalizable = useMinutesToFinalizable(_proofTxHash)

  useEffect(() => {
    if (initiateWithdrawal.data) {
      _setInitiationTxHash(initiateWithdrawal.data)
      initiateWithdrawal.reset()
      setActive(1)
    }
  }, [initiateWithdrawal.isSuccess])

  useEffect(() => {
    if (proveWithdrawal.data) {
      _setProofTxHash(proveWithdrawal.data)
      proveWithdrawal.reset()
      setActive(3)
    }
  }, [proveWithdrawal.isSuccess])

  const rss3Worth = (amount * (tokenPrice.data?.RSS3 || 0)).toFixed(3)

  let defaultActive
  if (!_initiationTxHash) {
    defaultActive = 0
  } else if (!_proofTxHash) {
    defaultActive = 1
  } else {
    defaultActive = 3
  }
  const [active, setActive] = useState(defaultActive)

  useEffect(() => {
    if (!minutesToProve.isFetching) {
      if (minutesToProve.data && minutesToProve.data > 0) {
        setActive(1)
      } else {
        setActive(2)
      }
    }
  }, [minutesToProve.isFetching, minutesToProve.data])

  useEffect(() => {
    if (!minutesToFinalizable.isFetching) {
      if (minutesToFinalizable.data && minutesToFinalizable.data > 0) {
        setActive(3)
      } else {
        setActive(4)
      }
    }
  }, [minutesToFinalizable.isFetching, minutesToFinalizable.data])

  const actions = [
    {
      text: "Initiate withdrawal",
      step: 1,
      description: "Initiate withdrawal request on RSS3 VSL Mainnet",
      hook: initiateWithdrawal,
    },
    {
      text: `Wait 30 minutes ${
        active === 1
          ? `(${
              minutesToProve.isFetching ? "-" : minutesToProve.data
            } minutes left)`
          : ""
      }`,
      description:
        "Wait for withdrawal request to be uploaded to the Ethereum Mainnet",
    },
    {
      text: "Prove withdrawal",
      step: 2,
      description: "Prove withdrawal on Ethereum Mainnet",
      hook: proveWithdrawal,
    },
    {
      text: `Wait 7 days ${
        active === 3
          ? `(${
              minutesToFinalizable.isFetching ? "-" : minutesToFinalizable.data
            } minutes left)`
          : ""
      }`,
      description: "Wait for the seven day finalization window",
    },
    {
      text: "Claim withdrawal",
      step: 3,
      description: "The funds will be realized on the Ethereum Mainnet",
      hook: finalizeWithdrawal,
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
    switch (active) {
      case 0:
        initiateWithdrawal.write(requestedAmount)
        break
      case 2:
        if (_initiationTxHash) {
          proveWithdrawal.write(_initiationTxHash)
        } else {
          showNotification({
            color: "red",
            title: "Prove withdrawal failed",
            message: "",
          })
        }
        break
      case 4:
        if (_proofTxHash) {
          finalizeWithdrawal.write(_proofTxHash)
        }
        break
    }
  }

  useEffect(() => {
    if (finalizeWithdrawal.isSuccess) {
      close()
      onSuccess()
      finalizeWithdrawal.reset()
    }
  }, [finalizeWithdrawal.isSuccess])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<div className="font-bold text-xl">👀 Review Withdraw</div>}
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
          <p className="flex items-center gap-1">
            <i className="i-mingcute-coin-2-line" />
            Amount to deposit
          </p>
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
          loading={actions[active].hook?.isPending}
          onClick={handleClick}
          disabled={!actions[active].step}
        >
          {actions[active].text}
        </Button>
      </div>
    </Modal>
  )
}
