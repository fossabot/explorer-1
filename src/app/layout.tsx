import type { Metadata } from "next"

import Navigation from "@/components/navigation"
import { Providers } from "@/components/providers"

import "./globals.css"

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
        <Providers>
          <Navigation />
          <div className="max-w-[75em] mx-auto px-4 pb-10">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
