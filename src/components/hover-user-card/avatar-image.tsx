"use client"

import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { Avatar } from "@mantine/core"

interface IProfileAvatarProps {
  address?: string
  url?: string
  platform?: string | null
  small?: boolean
}
const ProfileAvatar = ({
  address,
  url,
  platform,
  small = false,
}: IProfileAvatarProps) => {
  const avatar = useMemo(
    () => (url ? url : `https://cdn.stamp.fyi/avatar/eth:${address}?s=100`),
    [address, url],
  )
  const sizeClass = useMemo(() => (small ? `h-8 w-8` : `h-16 w-16`), [small])

  return (
    <Avatar
      src={avatar}
      alt={platform ?? ""}
      className={cn("block overflow-hidden rounded-full", sizeClass)}
    ></Avatar>
  )
}

export default ProfileAvatar
