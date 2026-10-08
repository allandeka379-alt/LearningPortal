import { describe, expect, it } from "vitest";
import { formDataToObject } from "./form-data";

describe("formDataToObject", () => {
  it("keeps single values, collects repeated keys and nests dotted list fields", () => {
    const form = new FormData();
    form.append("name", "Algebra");
    form.append("componentIds", "a");
    form.append("componentIds", "b");
    form.append("bands.0.label", "A");
    form.append("bands.0.minPercent", "75");
    form.append("bands.2.label", "U");
    form.append("$ACTION_ID_123", "ignored");
    form.append("file", new Blob(["x"]), "x.txt");
    expect(formDataToObject(form)).toEqual({
      name: "Algebra",
      componentIds: ["a", "b"],
      bands: [{ label: "A", minPercent: "75" }, { label: "U" }],
    });
  });

  it("ignores prototype-polluting keys", () => {
    const form = new FormData();
    form.append("__proto__.polluted", "yes");
    form.append("constructor.prototype.x", "1");
    const result = formDataToObject(form);
    expect(result).toEqual({});
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
