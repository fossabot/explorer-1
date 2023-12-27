import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatActivityId(id: string, length = 28) {
  return id.length <= length ? id : `${id.slice(0, length)}...`
}

export function formatWithoutEVM(str: string) {
  if (str.length <= 10) {
    return str
  }
  return str.slice(0, 6) + "..." + str.slice(-4)
}
