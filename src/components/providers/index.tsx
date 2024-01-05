import { headers } from "next/headers"

import { MotionProvider } from "@/lib/motion/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { TrpcProvider } from "@/lib/trpc/provider"
import { RainbowKitProvider, WagmiProvider } from "@/lib/wagmi/provider"
import { Notifications } from "@mantine/notifications"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <WagmiProvider>
          <TrpcProvider headers={headers()}>
            <RainbowKitProvider>
              <Notifications position="top-center" />
              {children}
            </RainbowKitProvider>
          </TrpcProvider>
        </WagmiProvider>
      </MotionProvider>
    </ThemeProvider>
  )
}
