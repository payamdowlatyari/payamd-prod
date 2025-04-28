import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge Tailwind CSS classes with clsx classes.
 *
 * @param {ClassValue[]} inputs - The classes to merge.
 * @returns {string} The merged classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
