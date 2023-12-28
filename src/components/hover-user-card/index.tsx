"use client"

import Link from "next/link"
import { useState } from "react"

import { cn, formatWithoutEVM } from "@/lib/utils"
import { Avatar, HoverCard } from "@mantine/core"
import { formatAddress, isAddress } from "@rss3/js-sdk"

import UserCard from "./user-card"

interface IHoverUserCardProps {
  account: string
  size?: string
  fontClass?: string
  address?: string | null
  platform?: string | null
}
const HoverUserCard = ({
  account,
  address,
  platform,
  size = "sm",
  fontClass = `text-inherit`,
}: IHoverUserCardProps) => {
  const [show, setShow] = useState(false)
  if (!account) return <></>

  return (
    <HoverCard
      onOpen={() => {
        setShow(true)
      }}
      onClose={() => {
        setShow(false)
      }}
    >
      <HoverCard.Target>
        <Link href={`/address/${account}`}>
          <div className={cn("flex flex-row items-center gap-x-2", fontClass)}>
            <Avatar
              src={`https://cdn.stamp.fyi/avatar/eth:${account}?s=100`}
              alt={account}
              size={size}
            ></Avatar>
            {isAddress(account)
              ? formatAddress(account)
              : formatWithoutEVM(account)}
          </div>
        </Link>
      </HoverCard.Target>
      <HoverCard.Dropdown className="w-80 cursor-default">
        <UserCard
          account={account}
          address={address}
          platform={platform}
          show={show}
        />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default HoverUserCard
