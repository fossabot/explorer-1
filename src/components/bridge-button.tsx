"use client"

import { useSwitchChain } from "wagmi"

import { mainnetChain, rss3Chain } from "@/lib/wagmi/config/chains"
import { Button } from "@mantine/core"
import { ConnectButton as _ConnectButton } from "@rainbow-me/rainbowkit"

export default function BridgeWithdrawButton({
  action,
  hasValue,
  onConfirm,
}: {
  action: "Deposit" | "Withdraw"
  hasValue: boolean
  onConfirm: () => void
}) {
  const targetChain = action === "Deposit" ? mainnetChain : rss3Chain

  const { switchChain } = useSwitchChain()

  return (
    <_ConnectButton.Custom>
      {({
        account,
        chain,
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

              if (chain.id !== targetChain.id) {
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

              return hasValue ? (
                <Button
                  fullWidth
                  size="xl"
                  radius="lg"
                  className="mt-8"
                  onClick={onConfirm}
                >
                  Review {action}
                </Button>
              ) : (
                <Button
                  fullWidth
                  size="xl"
                  radius="lg"
                  className="mt-8"
                  disabled
                >
                  Enter an amount
                </Button>
              )
            })()}
          </>
        )
      }}
    </_ConnectButton.Custom>
  )
}
