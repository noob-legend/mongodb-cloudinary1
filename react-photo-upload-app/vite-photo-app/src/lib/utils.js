/**
 * Utility Functions
 * - cn(): Helper function untuk menggabungkan Tailwind classes
 * - Menggunakan clsx untuk conditional classes dan tailwind-merge untuk merge conflicts
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
