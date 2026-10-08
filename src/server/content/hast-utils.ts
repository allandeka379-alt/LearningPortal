import "server-only";
import type { Element, Nodes } from "hast";

export function hasClass(el: Element, name: string): boolean {
  const className = el.properties.className;
  return Array.isArray(className) && className.includes(name);
}

export function addClass(el: Element, name: string): void {
  const className = el.properties.className;
  el.properties.className = Array.isArray(className) ? [...className, name] : [name];
}

/** Concatenated text of a hast subtree (no whitespace normalisation). */
export function textContent(node: Nodes): string {
  if (node.type === "text") return node.value;
  if (node.type === "element" || node.type === "root") return node.children.map(textContent).join("");
  return "";
}
