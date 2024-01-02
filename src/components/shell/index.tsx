import { AppShell } from "@mantine/core"

import { ShellHeader } from "./header"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      className="max-w-screen-xl mx-auto px-4 pb-10 pt-20"
      header={{ height: 70 }}
      padding="md"
    >
      <ShellHeader />
      {children}
    </AppShell>
  )
}
