/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from "vitest";
import { ariaShortcut, EXAM_SHORTCUTS, isTypingTarget, shortcutFor, type ShortcutEventLike } from "./keyboard";

function press(key: string, target: EventTarget | null, extra: Partial<ShortcutEventLike> = {}): ReturnType<typeof shortcutFor> {
  return shortcutFor({ key, altKey: false, ctrlKey: false, metaKey: false, target, ...extra });
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("exam keyboard shortcuts", () => {
  it("documents N, P, F, Q and R", () => {
    expect(EXAM_SHORTCUTS.map((s) => s.key)).toEqual(["N", "P", "F", "Q", "R"]);
    expect(ariaShortcut("flag")).toBe("F");
  });

  it("maps letters to actions on the page and on choice inputs", () => {
    document.body.innerHTML = `<main><button id="b">Next</button><input id="r" type="radio" /><input id="c" type="checkbox" /></main>`;
    expect(press("n", document.body)).toBe("next");
    expect(press("N", document.getElementById("b"))).toBe("next");
    expect(press("p", document.body)).toBe("previous");
    expect(press("f", document.getElementById("r"))).toBe("flag");
    expect(press("q", document.getElementById("c"))).toBe("questions");
    expect(press("r", document.body)).toBe("review");
    expect(press("x", document.body)).toBeNull();
    expect(press("ArrowRight", document.body)).toBeNull();
  });

  it("never hijacks typing, dialogs or modified keys", () => {
    document.body.innerHTML = `
      <input id="text" type="text" /><input id="num" type="number" /><textarea id="area"></textarea>
      <select id="sel"><option>a</option></select><div id="edit" contenteditable="true"><span id="inner">x</span></div>
      <dialog open><button id="in-dialog">Close</button></dialog>`;
    for (const id of ["text", "num", "area", "sel", "inner", "in-dialog"]) {
      expect(isTypingTarget(document.getElementById(id))).toBe(true);
      expect(press("n", document.getElementById(id))).toBeNull();
    }
    expect(press("n", document.body, { ctrlKey: true })).toBeNull();
    expect(press("n", document.body, { metaKey: true })).toBeNull();
    expect(press("n", document.body, { altKey: true })).toBeNull();
    expect(press("n", document.body, { repeat: true })).toBeNull();
    expect(press("n", document.body, { defaultPrevented: true })).toBeNull();
    expect(press("n", document.body, { isComposing: true })).toBeNull();
  });
});
