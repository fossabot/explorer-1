"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { Button, Menu } from "@mantine/core"
import { ConnectButton as _ConnectButton } from "@rainbow-me/rainbowkit"

export default function ConnectButton() {
  const router = useRouter()

  return (
    <_ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")
        const goToProfiles = () => {
          if (account) {
            router.push(`/profiles/${account?.address}`)
          }
        }

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    size="compact-md"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    size="compact-md"
                    color="red"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* <Button
                    size="compact-sm"
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button> */}

                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Button size="compact-sm">
                        {account.displayName}
                        {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item onClick={openAccountModal}>Account</Menu.Item>
                      <Menu.Item onClick={goToProfiles}>Profiles</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              )
            })()}
          </div>
        )
      }}
    </_ConnectButton.Custom>
  )
}
