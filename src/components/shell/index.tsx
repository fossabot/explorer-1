import { AppShell } from "@mantine/core"

import { ShellHeader } from "./header"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <ShellHeader />
      {children}
    </AppShell>
  )
}
