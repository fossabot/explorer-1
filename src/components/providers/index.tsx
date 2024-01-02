import { QueryProvider } from "@/lib/query/provider"
import { ThemeProvider } from "@/lib/theme/provider"
import { RainbowKitProvider, WagmiProvider } from "@/lib/wagmi/provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WagmiProvider>
        <QueryProvider>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
