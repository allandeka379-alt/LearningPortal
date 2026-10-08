import { getImageProps } from "next/image";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { fixedImageAttributes, OPTIMIZER_QUALITY, OPTIMIZER_WIDTHS, optimizedImageUrl } from "./images";

/**
 * `src/lib/images.ts` reproduces next/image's markup without importing next/image in app code. These tests pin it to
 * next/image's real output (same Next version) and to the app's image config, so a config or Next change that would
 * make the hand-built optimizer URLs invalid fails here instead of serving 400s.
 */
describe("image helpers", () => {
  it("keeps next.config.ts on the optimizer widths and quality the helpers assume", () => {
    expect(nextConfig.images?.imageSizes).toBeUndefined();
    expect(nextConfig.images?.deviceSizes).toBeUndefined();
    expect(nextConfig.images?.qualities).toBeUndefined();
    expect(nextConfig.images?.path).toBeUndefined();
    expect(nextConfig.images?.loader).toBeUndefined();
    expect(OPTIMIZER_QUALITY).toBe(75);
  });

  it.each([32, 40, 48, 56])("matches next/image for a fixed %ipx image", (px) => {
    const src = "/api/media/avatars/a b.png";
    const { props } = getImageProps({ src, alt: "", width: px, height: px });
    const ours = fixedImageAttributes(src, px);
    expect(ours.src).toBe(props.src);
    expect(ours.srcSet).toBe(props.srcSet);
    expect(ours.width).toBe(props.width);
    expect(ours.height).toBe(props.height);
    expect(ours.loading).toBe(props.loading);
    expect(ours.decoding).toBe(props.decoding);
  });

  it("rounds widths up to an accepted optimizer width and caps at the largest", () => {
    expect(optimizedImageUrl("/icons/x.png", 40)).toBe("/_next/image?url=%2Ficons%2Fx.png&w=48&q=75");
    expect(optimizedImageUrl("/icons/x.png", 5000)).toBe(`/_next/image?url=%2Ficons%2Fx.png&w=${OPTIMIZER_WIDTHS.at(-1)}&q=75`);
    expect([...OPTIMIZER_WIDTHS]).toEqual([...OPTIMIZER_WIDTHS].sort((a, b) => a - b));
  });
});
