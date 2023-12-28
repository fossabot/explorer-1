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
  return (
    <Avatar
      src={avatar}
      alt={platform ?? ""}
      size={small ? "md" : "lg"}
    ></Avatar>
  )
}

export default ProfileAvatar
