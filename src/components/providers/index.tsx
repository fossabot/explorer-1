import { headers } from "next/headers"

import { MotionProvider } from "@/lib/motion"
import { ThemeProvider } from "@/lib/theme/provider"
import { TrpcProvider } from "@/lib/trpc/provider"
import { RainbowKitProvider, WagmiProvider } from "@/lib/wagmi/provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <WagmiProvider>
          <TrpcProvider headers={headers()}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </TrpcProvider>
        </WagmiProvider>
      </MotionProvider>
    </ThemeProvider>
  )
}
