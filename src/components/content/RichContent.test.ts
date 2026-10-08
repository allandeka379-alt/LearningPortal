import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { SanitizedHtml } from "@/lib/content/types";
import { RichContent } from "./RichContent";

const sample = "<p>Hello <strong>world</strong></p>" as SanitizedHtml;

describe("RichContent", () => {
  it("renders the sanitised HTML inside a .rich-content div", () => {
    expect(renderToStaticMarkup(createElement(RichContent, { html: sample }))).toBe(
      '<div class="rich-content"><p>Hello <strong>world</strong></p></div>',
    );
  });

  it("renders inline content in a span and passes className, lang and id through", () => {
    const markup = renderToStaticMarkup(
      createElement(RichContent, { html: "x<sup>2</sup>" as SanitizedHtml, inline: true, className: "mt-2", lang: "sn", id: "opt-a" }),
    );
    expect(markup).toBe('<span id="opt-a" lang="sn" class="rich-content rich-content--inline mt-2">x<sup>2</sup></span>');
  });
});
