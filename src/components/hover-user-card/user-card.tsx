"use client"

import Link from "next/link"
import { useMemo } from "react"

import { Avatar, Button, CopyButton, Skeleton } from "@mantine/core"
import {
  dataClient,
  formatAddress,
  isAddress,
  isSupportedNS,
} from "@rss3/js-sdk"
import { useQuery } from "@tanstack/react-query"

import ProfileAvatar from "./avatar-image"

interface IUserCard {
  account: string
  show?: boolean
  withHover?: boolean
  address?: string | null
  platform?: string | null
}
const UserCard = ({
  account,
  address,
  platform,
  show = false,
  withHover = true,
}: IUserCard) => {
  const validAccount = useMemo(
    () => (isSupportedNS(account) || !address ? account : address),
    [account, address],
  )

  const {
    data: profiles,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["profiles", account],
    queryFn: () => dataClient().profiles(validAccount),
    enabled: !!account && show,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })

  const filterProfiles = useMemo(() => {
    if (!isFetching && profiles && profiles.data.length > 0) {
      return profiles.data.filter((profile) =>
        ["ENS Registrar", "Lens"].includes(profile.platform),
      )
    }
    return []
  }, [profiles, isFetching])

  const currentProfile = useMemo(() => {
    if (profiles && profiles.data.length > 0) {
      if (platform) {
        const find = profiles.data.find(
          (profile) => profile.platform === platform,
        )
        if (find) return find
      }

      if (isAddress(account)) {
        return profiles.data.find((profile) => profile.address === account)
      } else {
        return profiles.data.find((profile) => profile.handle === account)
      }
    }

    return null
  }, [account, profiles, platform])

  if (isError) {
    return (
      <div className="flex flex-col items-start justify-center gap-y-3"></div>
    )
  }

  if (isFetching) {
    return (
      <div className="flex flex-col items-start justify-center gap-y-3 w-72">
        <div className="flex w-full flex-row items-center justify-start gap-3">
          <Skeleton height={57} circle />
          {withHover && <Skeleton width={110} height={22} />}
        </div>
        <Skeleton className="h-7 w-24" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start justify-center gap-y-3 w-72">
      {currentProfile ? (
        <div className="flex w-full flex-row items-center justify-start gap-3">
          <ProfileAvatar
            address={currentProfile.address}
            platform={currentProfile.platform}
            url={currentProfile?.profileURI?.[0]}
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-lg font-semibold">
              <span>{currentProfile.handle}</span>
            </div>
            <div className="flex flex-row items-center gap-x-2 text-sm text-muted-foreground">
              <span>{formatAddress(currentProfile.address!)}</span>
              <CopyButton value={currentProfile.address!}>
                {({ copied, copy }) => <i className="i-mingcute-copy-2-line" />}
              </CopyButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-row items-center justify-start gap-3">
          <ProfileAvatar address={account} platform={platform} />
          <div className="flex flex-col items-start justify-center">
            <div className="text-lg font-semibold">
              <span>{formatAddress(account)}</span>
            </div>
            <div className="flex flex-row items-center gap-x-2 text-sm text-muted-foreground">
              <span>{formatAddress(account)}</span>
              <CopyButton value={account}>
                {({ copied, copy }) => <i className="i-mingcute-copy-2-line" />}
              </CopyButton>
            </div>
          </div>
        </div>
      )}

      {withHover && (
        <Link href={`/address/${validAccount}`}>
          <Button variant="outline" size="sm">
            View more
          </Button>
        </Link>
      )}

      {filterProfiles.length > 0 && (
        <div className="flex w-full flex-col items-start justify-center gap-3">
          <div className="font-medium text-muted-foreground">Profiles</div>
          {filterProfiles.map((profile, n) => (
            <Link
              target="_blank"
              href={
                profile.platform === "ENS Registrar"
                  ? `https://app.ens.domains/${profile.handle}`
                  : `https://hey.xyz/u/${profile.handle?.replace(".lens", "")}`
              }
              key={`profile-${profile.platform}-${n}`}
              className="flex w-full max-w-xs flex-row items-center justify-start gap-x-2 rounded-[5px] border border-solid p-2 hover:bg-muted-foreground/20"
            >
              <div className="relative">
                <ProfileAvatar
                  address={profile.address}
                  platform={profile.platform}
                  small
                />

                <Avatar
                  src={`https://assets.rss3.io/web3-icons/${profile.platform}.png`}
                  alt={account}
                  className="absolute bottom-0 right-[-4px]"
                  size="xs"
                ></Avatar>
              </div>
              <span>{profile.handle}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserCard
