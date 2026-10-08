import { clsx, type ClassValue } from "clsx";

export type { ClassValue };

/**
 * Joins class names, dropping falsy values (`cn("a", cond && "b", { c: flag })`).
 *
 * Deliberately NOT tailwind-merge: we don't ship a class-conflict resolver to the client (bundle size, §29).
 * Components therefore expose *variant props* instead of expecting callers to override base utilities, and a
 * caller-supplied `className` should only ADD layout concerns (margins, width, grid placement). If two
 * utilities for the same property are passed, the one emitted later in Tailwind's stylesheet wins, not the
 * one later in this argument list.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
