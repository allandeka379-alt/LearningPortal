import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { PublicGrowthTracker } from "@/components/analytics/PublicGrowthTracker";
import {
  DEFAULT_FONT_SCALE,
  DEFAULT_THEME,
  FONT_SCALE_COOKIE,
  FONT_SCALES,
  THEME_COLORS,
  THEME_COOKIE,
  THEME_PREFERENCES,
} from "@/components/layout/preferences";
import { SkipLink } from "@/components/layout/SkipLink";
import { ConnectivityBanner } from "@/components/pwa/ConnectivityBanner";
import { ServiceWorkerRegistrar } from "@/components/pwa/ServiceWorkerRegistrar";
import { ToastProvider } from "@/components/ui/Toast";
import { APP_NAME, TITLE_SEPARATOR } from "@/lib/config";
import { getEnv } from "@/server/lib/env";
import "./globals.css";

// One variable font for the whole product (weights 200–800 from a single file), self-hosted by next/font.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/**
 * Site-wide metadata defaults. `APP_URL` (validated by `getEnv()`) becomes `metadataBase` so relative Open Graph
 * and canonical URLs resolve to absolute ones.
 */
export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(getEnv().APP_URL),
    title: { default: APP_NAME, template: `%s${TITLE_SEPARATOR}${APP_NAME}` },
    description: "Study for ZIMSEC and Cambridge O-Level and A-Level examinations.",
    applicationName: APP_NAME,
    appleWebApp: { title: APP_NAME, statusBarStyle: "default" },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/**
 * Static viewport (no request data, so public pages can be prerendered and CDN-cached, §38/§44). Browser chrome
 * follows the OS colour scheme; `viewportFit: "cover"` enables safe-area insets for the bottom tab bar. Zoom is never
 * restricted (§43).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

/**
 * Pre-paint preference script. Reads the (non-httpOnly) `dz_theme` / `dz_font_scale` cookies and sets the matching
 * attributes on <html> before the first paint, so there is no flash of the wrong theme or text size — WITHOUT the
 * root layout reading cookies on the server (which would force every route, including static marketing and SEO pages,
 * into dynamic rendering). The code is a compile-time constant built from validated allow-lists: no user input
 * reaches it, and only whitelisted values are ever applied.
 */
const PREFERENCES_SCRIPT = `(function(){try{var c=document.cookie,d=document.documentElement,m;` +
  `m=/(?:^|;\\s*)${THEME_COOKIE}=(${THEME_PREFERENCES.join("|")})(?:;|$)/.exec(c);if(m)d.setAttribute("data-theme",m[1]);` +
  `m=/(?:^|;\\s*)${FONT_SCALE_COOKIE}=(${FONT_SCALES.join("|")})(?:;|$)/.exec(c);if(m)d.setAttribute("data-font-scale",m[1]);` +
  `}catch(e){}})();`;

/** Root layout: static shell; per-user display preferences are applied by {@link PREFERENCES_SCRIPT}. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      data-font-scale={DEFAULT_FONT_SCALE}
      data-scroll-behavior="smooth"
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line react/no-danger -- constant pre-paint script built from allow-lists; no user input */}
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-text antialiased">
        <SkipLink />
        <ToastProvider>
          {children}
          <ConnectivityBanner />
          <ServiceWorkerRegistrar />
          <PublicGrowthTracker />
        </ToastProvider>
      </body>
    </html>
  );
}
