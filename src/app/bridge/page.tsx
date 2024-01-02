"use client"

import Image from "next/image"
import { useState } from "react"

import BridgeButton from "@/components/bridge-button"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { Button, Card, NumberInput, SegmentedControl } from "@mantine/core"

export default function BridgePage() {
  const [tokenNumber, setTokenNumber] = useState<string | number>()
  const [actionType, setActionType] = useState("Deposit")

  const [from, to] =
    actionType === "Deposit"
      ? [mainnetChain, rss3Chain]
      : [rss3Chain, mainnetChain]

  const balance = 100 // TODO

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
            <Image src={from.icon} alt={from.name} width="20" height="20" />
            <span className="font-semibold">{from.name}</span>
          </div>
          <NumberInput
            size="xl"
            radius="lg"
            rightSection={
              <div className="flex items-center gap-2 text-zinc-700">
                <Image
                  src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/rss3-circle.svg"
                  alt="ethereum"
                  width="30"
                  height="30"
                />
                RSS3
              </div>
            }
            rightSectionWidth={150}
            placeholder="0.0"
            value={tokenNumber}
            onChange={setTokenNumber}
          />
          <div className="flex items-center gap-1">
            <span>Balance: {balance} RSS3</span>
            <Button
              variant="subtle"
              className="text-primary-500 px-1 h-7"
              onClick={() => {
                setTokenNumber(balance)
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
            <Image src={to.icon} alt={to.name} width="20" height="20" />
            <span className="font-semibold">{to.name}</span>
          </div>
          <div>You will receive: {tokenNumber || 0} RSS3</div>
          <div>Balance: 0 RSS3</div>
        </Card>
        <BridgeButton action={actionType as "Deposit" | "Withdraw"} />
      </Card>
    </div>
  )
}
