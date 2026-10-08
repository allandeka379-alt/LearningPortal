import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Developer previews",
  robots: { index: false, follow: false },
};

/** Dev-only area (design-system showcase, shell previews). Every page here 404s in production. */
export default function DevLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
