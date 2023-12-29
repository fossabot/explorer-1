import type { Metadata } from "next"

import Navigation from "@/components/navigation"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { theme } from "@rss3/mantine-theme"

import Providers from "./providers"

import "./globals.css"

// font
import { Poppins } from "next/font/google"

const font = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
theme.fontFamily = font.style.fontFamily

export const metadata: Metadata = {
  title: "RSS3 Explorer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ColorSchemeScript strategy={""} />
        <MantineProvider theme={theme}>
          <Providers>
            <Navigation />
            <div className="max-w-[75em] mx-auto px-4 pb-10">{children}</div>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  )
}
