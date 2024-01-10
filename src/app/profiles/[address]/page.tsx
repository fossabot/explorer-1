"use client"

import Link from "next/link"
import React from "react"
import type { Address } from "viem"

import { useRSS3AccountInfo } from "@/hooks/useRSS3AccountInfo"
import { ActionIcon, Card, CopyButton, Title, Tooltip } from "@mantine/core"

export type ProfilesPageProps = { params: { address: Address } }

export default function ProfilesPage({ params }: ProfilesPageProps) {
  const address = params.address
  const accountInfo = useRSS3AccountInfo(address)

  return (
    <div className="space-y-8 mt-4">
      <Card radius="md" withBorder className="space-y-4">
        <Title size="h1">
          {accountInfo.data?.isContract ? "Contract" : "Address"} details
        </Title>

        <div className="font-mono text-lg flex items-center gap-2">
          <span className="flex-shrink truncate">{address}</span>
          <CopyButton value={address} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy Address"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? (
                    <i className="i-mingcute-check-line" />
                  ) : (
                    <i className="i-mingcute-copy-line" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>

        <div className="space-y-2">
          {renderAccountInfo(
            "Balance",
            "Address balance in RSS3. Doesn't include ERC20, ERC721 and ERC1155 tokens.",
            accountInfo.data,
            ({ coinBalance, coinSymbol }) =>
              `${coinBalance.toLocaleString()} ${coinSymbol}`,
          )}

          {renderAccountInfo(
            "Transactions",
            "Number of transactions related to this address",
            accountInfo.data,
            ({ transactionsCount, transactionsLink }) => (
              <Link
                href={transactionsLink}
                target="_blank"
                className="text-primary-500 hover:underline"
              >
                {transactionsCount.toLocaleString()}
              </Link>
            ),
          )}

          {renderAccountInfo(
            "Gas used",
            "Gas used by the address",
            accountInfo.data,
            ({ gasUsageCount }) => gasUsageCount.toLocaleString(),
          )}

          {renderAccountInfo(
            "Last balance update",
            "Block number in which the address was updated",
            accountInfo.data,
            ({ lastBalanceUpdateBlock, lastBalanceUpdateBlockLink }) => (
              <Link
                href={lastBalanceUpdateBlockLink}
                target="_blank"
                className="text-primary-500 hover:underline"
              >
                {`${lastBalanceUpdateBlock}`}
              </Link>
            ),
          )}
        </div>
      </Card>

      <Card radius="md" withBorder className="space-y-4">
        <Title size="h2">Token Information</Title>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="aspect-video bg-gray-300 col-span-1 space-y-4 p-4 rounded-md">
            <Title size="h3">On Ethereum</Title>
            <div>
              <p>100 $RSS3</p>
              <p>2 $RSS3 Node X Chip</p>
              <p>5 $RSS3 Node Y Chip</p>
              <p>...</p>
            </div>
          </div>

          <div className="aspect-video bg-gray-300 col-span-1 space-y-4 p-4 rounded-md">
            <Title size="h3">On RSS3 Chain</Title>
            <div>
              <p>100 $RSS3</p>
              <p>2 $RSS3 Node X Chip</p>
              <p>5 $RSS3 Node Y Chip</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card
          radius="md"
          withBorder
          className="space-y-4 flex items-center justify-center aspect-square bg-gray-300"
        >
          <Title size="h4">Staking History</Title>
        </Card>

        <Card
          radius="md"
          withBorder
          className="space-y-4 flex items-center justify-center aspect-square bg-gray-300"
        >
          <Title size="h4">Bridging History</Title>
        </Card>

        <Card
          radius="md"
          withBorder
          className="space-y-4 flex items-center justify-center aspect-square bg-gray-300"
        >
          <Title size="h4">Incentives History</Title>
        </Card>

        <Card
          radius="md"
          withBorder
          className="space-y-4 flex items-center justify-center aspect-square bg-gray-300"
        >
          <Title size="h4">Operated Nodes</Title>
        </Card>
      </div>
    </div>
  )
}

function renderAccountInfo<T>(
  title: string,
  label: React.ReactNode,
  value: T | undefined | null,
  render: (value: T) => React.ReactNode,
) {
  if (!value) return null

  return (
    <div className="relative pl-6">
      <Tooltip label={label}>
        <i className="i-mingcute-information-line absolute top-1.5 left-1 size-4" />
      </Tooltip>
      <Title size="h4">{title}</Title>
      <p>{render(value)}</p>
    </div>
  )
}
