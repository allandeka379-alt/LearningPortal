import "server-only";
import type { Element, ElementContent, Properties } from "hast";
import type { ContentBlockType } from "@/lib/content/blocks";

interface Shape {
  tag: "path" | "circle" | "polygon";
  properties: Properties;
}

const path = (d: string): Shape => ({ tag: "path", properties: { d } });
const circle = (cx: number, cy: number, r: number): Shape => ({
  tag: "circle",
  properties: { cx: String(cx), cy: String(cy), r: String(r) },
});
const polygon = (points: string): Shape => ({ tag: "polygon", properties: { points } });

/**
 * Block icons, after Lucide (ISC licence), 24×24 stroke icons. Inlined as SVG in the rendered HTML (rather than CSS
 * `mask-image` data URIs) so they inherit `currentColor`, need no extra request and no `img-src data:` CSP allowance.
 */
const ICONS: Readonly<Record<ContentBlockType, readonly Shape[]>> = {
  // book-open
  definition: [
    path("M12 7v14"),
    path("M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"),
  ],
  // star
  keyfact: [polygon("12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2")],
  // lightbulb
  example: [
    path("M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"),
    path("M9 18h6"),
    path("M10 22h4"),
  ],
  // list-checks
  "worked-solution": [path("m3 17 2 2 4-4"), path("m3 7 2 2 4-4"), path("M13 6h8"), path("M13 12h8"), path("M13 18h8")],
  // triangle-alert
  mistake: [
    path("m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"),
    path("M12 9v4"),
    path("M12 17h.01"),
  ],
  // target
  "exam-tip": [circle(12, 12, 10), circle(12, 12, 6), circle(12, 12, 2)],
  // info
  note: [circle(12, 12, 10), path("M12 16v-4"), path("M12 8h.01")],
  // sigma
  formula: [path("M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2")],
  // text (align-left)
  summary: [path("M15 12H3"), path("M17 18H3"), path("M21 6H3")],
};

function shapeElement(shape: Shape): ElementContent {
  return { type: "element", tagName: shape.tag, properties: { ...shape.properties }, children: [] };
}

/** Decorative icon for a block label: hidden from assistive technology (the label text carries the meaning). */
export function blockIcon(type: ContentBlockType): Element {
  return {
    type: "element",
    tagName: "svg",
    properties: {
      className: ["cb-icon"],
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ariaHidden: "true",
      focusable: "false",
    },
    children: ICONS[type].map(shapeElement),
  };
}
