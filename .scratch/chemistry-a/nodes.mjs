// Node helpers shared by zimsec.mjs and cambridge.mjs. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage`
// (Cambridge: "AS Level" / "A Level only") are build-time metadata used for the concept labels; keys starting with "_"
// are not written.
export const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
export const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
export const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
export const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);
/** Cambridge objective with its printed learning-outcome code. */
export const o = (code, text) => [code, text];
