import { cookies, headers } from "next/headers"

import { MotionProvider } from "@/lib/motion/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { TrpcProvider } from "@/lib/trpc/provider"
import { RainbowKitProvider, WagmiProvider } from "@/lib/wagmi/provider"
import { Notifications } from "@mantine/notifications"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <WagmiProvider cookie={headers().get("cookie")}>
          <TrpcProvider headers={headers()}>
            <RainbowKitProvider>
              <Notifications />
              {children}
            </RainbowKitProvider>
          </TrpcProvider>
        </WagmiProvider>
      </MotionProvider>
    </ThemeProvider>
  )
}
