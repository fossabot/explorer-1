"use client"

import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import { ShellHeader } from "./header"
import { ShellNavbar } from "./shell-navbar"

export function Shell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <AppShell
      className="max-w-screen-xl mx-auto px-4 pb-10 pt-20"
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "lg",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <ShellHeader navbarOpened={opened} toggleNavbar={toggle} />
      <ShellNavbar toggle={toggle} />
      {children}
    </AppShell>
  )
}
