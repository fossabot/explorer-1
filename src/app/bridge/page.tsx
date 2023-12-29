"use client"

import Image from "next/image"
import { useState } from "react"

import { Button, Card, NumberInput, SegmentedControl } from "@mantine/core"

export default function BridgePage() {
  const [tokenType, setTokenType] = useState<string | null>("RSS3")
  const [tokenNumber, setTokenNumber] = useState<string | number>()

  return (
    <div className="flex items-center justify-center pt-32">
      <Card className="w-[600px]" shadow="xs" radius="lg" withBorder>
        <SegmentedControl
          fullWidth
          size="xl"
          radius="lg"
          data={["Deposit", "Withdraw"]}
          className="mb-8"
        />
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>From</span>
            <Image
              src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/ethereum.svg"
              alt="ethereum"
              width="12"
              height="20"
            />
            <span className="font-semibold">Ethereum Mainnet</span>
          </div>
          <NumberInput
            size="xl"
            radius="lg"
            rightSection={
              <div className="flex items-center gap-2 text-zinc-700 cursor-pointer">
                <Image
                  src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/rss3-circle.svg"
                  alt="ethereum"
                  width="30"
                  height="30"
                />
                RSS3
                <i className="i-mingcute-down-line" />
              </div>
            }
            rightSectionWidth={150}
            placeholder="0.0"
            value={tokenNumber}
            onChange={setTokenNumber}
          />
          <div>Balance: 0 RSS3</div>
        </Card>
        <div className="w-full flex justify-center my-4 text-primary-500 text-xl">
          <i className="i-mingcute-arrow-down-fill" />
        </div>
        <Card radius="lg" className="bg-zinc-100 space-y-4">
          <div className="flex items-center gap-2">
            <span>To</span>
            <Image
              src="https://raw.githubusercontent.com/RSS3-Network/web3-icons/main/icons/rss3-circle.svg"
              alt="ethereum"
              width="20"
              height="20"
            />
            <span className="font-semibold">RSS3 Mainnet</span>
          </div>
          <div>You will receive: {tokenNumber || 0} RSS3</div>
          <div>Balance: 0 RSS3</div>
        </Card>
        <Button fullWidth size="xl" radius="lg" className="mt-8">
          Connect
        </Button>
      </Card>
    </div>
  )
}
