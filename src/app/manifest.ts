import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/components/layout/preferences";
import { APP_NAME } from "@/lib/config";

/**
 * Web app manifest (PWA basics, §29), generated so the name follows `NEXT_PUBLIC_APP_NAME`.
 * Offline: a module service worker (public/sw.js) caches the app shell and recently opened lessons (docs/OFFLINE.md).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: "Study for ZIMSEC and Cambridge O-Level and A-Level examinations.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: THEME_COLORS.light,
    theme_color: "#135568",
    categories: ["education"],
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
