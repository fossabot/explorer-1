import { Poppins } from "next/font/google"

import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { theme } from "@rss3/mantine-theme"

const font = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
theme.fontFamily = font.style.fontFamily

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <ColorSchemeScript defaultColorScheme="auto" strategy={""} />
      {children}
    </MantineProvider>
  )
}
