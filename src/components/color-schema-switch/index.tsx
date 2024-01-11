"use client"

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core"

export function ColorSchemeSwitch() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  })

  return (
    <ActionIcon
      aria-label="Toggle color scheme"
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      size="md"
      variant="default"
    >
      <i className="i-mingcute-sun-line block dark:hidden" />
      <i className="i-mingcute-moon-line hidden dark:block" />
    </ActionIcon>
  )
}
