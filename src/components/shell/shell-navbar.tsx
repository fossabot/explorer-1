import { MotionConfig } from "framer-motion"
import Link from "next/link"

import { headerItems } from "@/components/shell/header"
import { cn } from "@/lib/utils"
import ConnectButton from "@/lib/wagmi/components/connect-button"
import { AppShell, Group } from "@mantine/core"

export type ShellNavbarProps = {
  toggle: () => void
}

export function ShellNavbar({ toggle }: ShellNavbarProps) {
  return (
    <AppShell.Navbar py="md" px={4}>
      <div className="flex flex-col items-center gap-2">
        {headerItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "w-full flex items-center gap-2 p-4 hover:bg-gray-light-hover text-zinc-500 hover:text-black dark:hover:text-white rounded-md",
            )}
            onClick={toggle}
          >
            <span className="flex items-center text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}

        <ConnectButton />
      </div>
    </AppShell.Navbar>
  )
}
