import { ImageResponse } from "next/og";
import { HERO_SUPPORTING_LINE } from "@/components/marketing/copy";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";

/**
 * Open Graph / social card for the public site (§44), generated at build time with next/og: brand mark, the §45
 * headline and supporting line, on the deep Zambezi teal with the chevron course. Static (no request data).
 */
export const alt = `${APP_NAME}: ${APP_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (src/app/globals.css ramps). Inline values: next/og renders outside the page's CSS.
const ZAMBEZI_950 = "#051D25";
const ZAMBEZI_800 = "#0C3D4C";
const ZAMBEZI_700 = "#135568";
const ZAMBEZI_100 = "#DAF2F8";
const ZAMBEZI_300 = "#91CCDF";
const MSASA_500 = "#D9822A";
const WHITE = "#FFFFFF";

// Logo mark geometry (src/components/brand/Logo.tsx).
const TILE = "M8 0H24A8 8 0 0 1 32 8V24A8 8 0 0 1 24 32H8A8 8 0 0 1 0 24V8A8 8 0 0 1 8 0Z";
const COURSE_TOP = "M6 12L11 7L16 12L21 7L26 12V16L21 11L16 16L11 11L6 16Z";
const COURSE_BOTTOM = "M6 20L11 15L16 20L21 15L26 20V24L21 19L16 24L11 19L6 24Z";

function chevronPath(width: number, step: number, height: number): string {
  let d = `M0 ${height}`;
  for (let x = 0; x < width; x += step * 2) d += ` L${x + step} 0 L${x + step * 2} ${height}`;
  return d;
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: ZAMBEZI_800, color: WHITE, padding: "64px 72px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <path d={TILE} fill={ZAMBEZI_700} />
            <path d={COURSE_TOP} fill={MSASA_500} />
            <path d={COURSE_BOTTOM} fill={WHITE} />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{APP_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 72, maxWidth: 960 }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>{APP_TAGLINE}</div>
          <div style={{ fontSize: 34, lineHeight: 1.35, marginTop: 28, color: ZAMBEZI_100 }}>{HERO_SUPPORTING_LINE}</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 56, display: "flex", background: ZAMBEZI_950 }}>
          <svg width="1200" height="56" viewBox="0 0 1200 56">
            <path d={chevronPath(1200, 24, 28)} transform="translate(0 14)" fill="none" stroke={ZAMBEZI_300} strokeWidth="4" strokeOpacity="0.55" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
