import { ImageResponse } from "next/og";
import { connection } from "next/server";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";
import { shareKindLabel, shareValueLabel } from "@/server/sharing/core";
import { getPublicShare } from "@/server/sharing/service";

export const alt = "A study result shared by a student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand colours for the image renderer, which cannot read CSS variables. Values mirror the design tokens in
 * src/app/globals.css (Zambezi 800 / 300, Msasa 500 / 300, Granite 50).
 */
const COLORS = {
  background: "#0c3d4c",
  accent: "#d9822a",
  accentSoft: "#f8b975",
  text: "#f8f6f3",
  muted: "#91ccdf",
} as const;

/**
 * Open Graph image of a share card (§46), the preview WhatsApp shows: the big value, the headline, the context and the
 * product name. Built from the public snapshot only. A link that is off or expired gets a plain brand card (never a
 * fact), and images are cached briefly so a revoked link stops previewing soon after.
 */
export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  await connection();
  const { token } = await params;
  const share = await getPublicShare(token);
  const headers = { "cache-control": "public, max-age=300" };

  if (!share) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: COLORS.background, color: COLORS.text }}>
          <div style={{ display: "flex", width: 120, height: 12, background: COLORS.accent, borderRadius: 6 }} />
          <div style={{ display: "flex", marginTop: 40, fontSize: 84, fontWeight: 700 }}>{APP_NAME}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 40, color: COLORS.muted }}>{APP_TAGLINE}</div>
        </div>
      ),
      { ...size, headers },
    );
  }

  const { snapshot } = share;
  const context = [snapshot.boardName, snapshot.qualificationName, snapshot.subjectName].filter(Boolean).join(" · ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: COLORS.background, color: COLORS.text }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 12, background: COLORS.accent, borderRadius: 6 }} />
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: COLORS.accentSoft, textTransform: "uppercase", letterSpacing: 2 }}>
            {shareKindLabel(share.kind)}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: snapshot.unit === "BADGE" ? 88 : 150, fontWeight: 700, lineHeight: 1.05 }}>{shareValueLabel(snapshot)}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 46, fontWeight: 600, lineHeight: 1.2 }}>{`${snapshot.headline}.`}</div>
          {context ? <div style={{ display: "flex", marginTop: 14, fontSize: 32, color: COLORS.muted }}>{context}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <div style={{ display: "flex", color: COLORS.muted }}>{snapshot.displayName ? `— ${snapshot.displayName}` : ""}</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>{APP_NAME}</div>
            <div style={{ display: "flex", fontSize: 26, color: COLORS.muted }}>{APP_TAGLINE}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, headers },
  );
}
