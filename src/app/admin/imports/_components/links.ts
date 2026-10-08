import type { ImportEntityType } from "@/server/cms/imports/constants";

/** Download link of a generated import template (see ../templates/[entity]/[file]/route.ts). */
export function templateHref(entityType: ImportEntityType, file: string): string {
  return `/admin/imports/templates/${entityType.toLowerCase()}/${file}`;
}

export const TEMPLATE_LINKS = [
  { file: "template.csv", label: "CSV template" },
  { file: "example.json", label: "JSON example" },
  { file: "schema.json", label: "JSON Schema" },
] as const;
