"use client"

import Link from "next/link"
import React from "react"
import { type Address } from "viem"
import { useEnsName } from "wagmi"

import { Tokens } from "@/app/profiles/[address]/tokens"
import ProfileAvatar from "@/components/hover-user-card/avatar-image"
import { useRSS3AccountInfo } from "@/hooks/useRSS3AccountInfo"
import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  Title,
  Tooltip,
} from "@mantine/core"

export type ProfilesPageProps = { params: { address: Address } }

export default function ProfilesPage({ params }: ProfilesPageProps) {
  const address = params.address
  const accountInfo = useRSS3AccountInfo(address)
  const ensName = useEnsName({ address })

  return (
    <div className="space-y-8 mt-4">
      <Title size="h1">
        {accountInfo.data?.isContract ? "Contract" : "Address"} details
      </Title>

      <Card radius="md" withBorder className="space-y-4">
        <div className="flex items-center gap-2">
          <ProfileAvatar address={address} />

          <div>
            <div>{ensName.data}</div>
            <div className="font-mono text-lg flex items-center gap-2">
              <span className="flex-shrink truncate">{address}</span>
              <CopyButton value={address} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy Address"}
                    withArrow
                    position="top-end"
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

              <Link
                href={`https://hoot.it/${address}`}
                passHref
                target="_blank"
              >
                <Button size="compact-xs" variant="light">
                  View More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <Card radius="md" withBorder className="space-y-4">
        <Title size="h2">Token Information</Title>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Tokens
            chain={mainnetChain}
            title="On Ethereum"
            className="col-span-1"
          />

          <Tokens
            chain={rss3Chain}
            title="On RSS3 Chain"
            className="col-span-1"
          />
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
