"use client"

import { useEffect, useState } from "react"

import BridgeButton from "@/components/bridge-button"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { useEstimateDepositGas } from "@/lib/wagmi/hooks/useEstimateDepositGas"
import { useRSS3Balance } from "@/lib/wagmi/hooks/useRSS3Balance"
import {
  Button,
  Card,
  Modal,
  NumberInput,
  SegmentedControl,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconEthereum, IconRss3Circle } from "@rss3/web3-icons-react"

export default function BridgePage() {
  const [tokenNumber, setTokenNumber] = useState<string | number>()
  const [actionType, setActionType] = useState("Deposit")

  const [from, to] =
    actionType === "Deposit"
      ? [mainnetChain, rss3Chain]
      : [rss3Chain, mainnetChain]
  const [FromIcon, ToIcon] =
    actionType === "Deposit"
      ? [IconEthereum, IconRss3Circle]
      : [IconRss3Circle, IconEthereum]

  const fromBalance = useRSS3Balance(from.id)
  const toBalance = useRSS3Balance(to.id)
  const rss3Price = 0.15 // TODO
  const gasPrice = 1.5 // TODO
  const gasSymbol = from.nativeCurrency.symbol

  const estimatedDepositGas = useEstimateDepositGas()

  const [
    reviewModalOpened,
    { open: reviewModalOpen, close: reviewModalClose },
  ] = useDisclosure(false)

  useEffect(() => {
    setTokenNumber("")
  }, [actionType])

  return (
    <div className="flex items-center justify-center pt-32">
      <Card className="w-[600px]" shadow="xs" radius="lg" withBorder>
        <SegmentedControl
          value={actionType}
          onChange={setActionType}
          fullWidth
          size="xl"
          radius="lg"
          data={["Deposit", "Withdraw"]}
          className="mb-8"
        />
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>From</span>
            <FromIcon className="w-5 h-5" />
            <span className="font-semibold">{from.name}</span>
          </div>
          <NumberInput
            size="xl"
            radius="lg"
            rightSection={
              <div className="flex items-center gap-2 text-zinc-700">
                <IconRss3Circle className="w-10 h-10" />
                RSS3
              </div>
            }
            rightSectionWidth={150}
            placeholder="0.0"
            value={tokenNumber}
            onChange={setTokenNumber}
          />
          <div className="flex items-center gap-1">
            <span>Balance: {fromBalance.formatted} RSS3</span>
            <Button
              variant="subtle"
              className="text-primary-500 px-1 h-7"
              onClick={() => {
                setTokenNumber(fromBalance.formatted)
              }}
            >
              (Max)
            </Button>
          </div>
        </Card>
        <div className="w-full flex justify-center my-4 text-primary-500 text-2xl">
          <i className="i-mingcute-arrow-down-fill" />
        </div>
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>To</span>
            <ToIcon className="w-5 h-5" />
            <span className="font-semibold">{to.name}</span>
          </div>
          <div>You will receive: {tokenNumber || 0} RSS3</div>
          <div>Balance: {toBalance.formatted} RSS3</div>
        </Card>
        <BridgeButton
          action={actionType as "Deposit" | "Withdraw"}
          hasValue={!!tokenNumber}
          onConfirm={() => reviewModalOpen()}
        />
        <div className="mt-8 text-sm">
          <div className="flex justify-between">
            <div>Gas fee to transfer</div>
            <div className="font-semibold">
              {estimatedDepositGas.data} {gasSymbol} ($
              {(parseFloat(estimatedDepositGas.data) * gasPrice).toFixed(2)})
            </div>
          </div>
          <div className="flex justify-between">
            <div>Time to transfer</div>
            <div className="font-semibold">~1 minute</div>
          </div>
        </div>
        {actionType === "Deposit" ? (
          <Modal
            opened={reviewModalOpened}
            onClose={reviewModalClose}
            title={<div className="font-bold text-xl">Review {actionType}</div>}
            centered
            size="md"
            radius="lg"
            padding="xl"
          >
            <div className="space-y-6">
              <div>
                <div className="flex items-center text-lg">
                  <div className="flex items-center gap-2">
                    <FromIcon className="w-6 h-6" />
                    <span className="font-semibold">{from.name}</span>
                  </div>
                  <i className="i-mingcute-arrow-right-fill text-primary-500 mx-6" />
                  <div className="flex items-center gap-2">
                    <ToIcon className="w-6 h-6" />
                    <span className="font-semibold">{to.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <p>Amount to deposit</p>
                <p className="font-semibold">
                  {tokenNumber} RSS3 ($
                  {(parseFloat(tokenNumber + "" || "0") * rss3Price).toFixed(2)}
                  )
                </p>
              </div>
              <div>
                <p>Gas fee to transfer</p>
                <p className="font-semibold">
                  {estimatedDepositGas.data} {gasSymbol} ($
                  {(parseFloat(estimatedDepositGas.data) * gasPrice).toFixed(2)}
                  )
                </p>
              </div>
              <div>
                <p>Time to transfer</p>
                <p className="font-semibold">~1 minute</p>
              </div>
              <Button fullWidth size="lg" radius="lg">
                {actionType}
              </Button>
            </div>
          </Modal>
        ) : null}
      </Card>
    </div>
  )
}
