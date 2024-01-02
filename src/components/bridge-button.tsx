"use client"

import { useSwitchChain } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { Button } from "@mantine/core"
import { ConnectButton as _ConnectButton } from "@rainbow-me/rainbowkit"

export default function BridgeWithdrawButton({
  action,
}: {
  action: "Deposit" | "Withdraw"
}) {
  const targetChain = action === "Deposit" ? mainnetChain : rss3Chain

  const { switchChain } = useSwitchChain()

  return (
    <_ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    fullWidth
                    size="xl"
                    radius="lg"
                    className="mt-8"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    fullWidth
                    size="xl"
                    radius="lg"
                    className="mt-8"
                    onClick={() =>
                      switchChain({
                        chainId: targetChain.id,
                      })
                    }
                    type="button"
                  >
                    Switch to {targetChain.name}
                  </Button>
                )
              }

              return (
                <Button
                  fullWidth
                  size="xl"
                  radius="lg"
                  className="mt-8"
                  onClick={openAccountModal}
                >
                  Review {action}
                </Button>
              )
            })()}
          </>
        )
      }}
    </_ConnectButton.Custom>
  )
}
