"use client"

import { WagmiProvider as _WagmiProvider, cookieToInitialState } from "wagmi"

import { RainbowKitProvider as _RainbowKitProvider } from "@rainbow-me/rainbowkit"

import { wagmiConfig } from "../config"

import "@rainbow-me/rainbowkit/styles.css"

export function WagmiProvider({
  children,
  cookie,
}: {
  children: React.ReactNode
  cookie: string | null
}) {
  const initialState = cookieToInitialState(wagmiConfig, cookie)
  return (
    <_WagmiProvider initialState={initialState} config={wagmiConfig}>
      {children}
    </_WagmiProvider>
  )
}

export function RainbowKitProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <_RainbowKitProvider>{children}</_RainbowKitProvider>
}
