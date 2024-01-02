import { MotionProvider } from "@/lib/motion"
import { QueryProvider } from "@/lib/query/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { RainbowKitProvider, WagmiProvider } from "@/lib/wagmi/provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <WagmiProvider>
          <QueryProvider>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryProvider>
        </WagmiProvider>
      </MotionProvider>
    </ThemeProvider>
  )
}
