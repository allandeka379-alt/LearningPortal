# Diagram pass brief (owner decision 2026-10-12: "option 2")

Before this pass NO lesson or question on the platform had an image (audit: `node .scratch/tools/diagram-audit.mjs <family> --list`,
full report `.scratch/website/diagram-audit.md`). Your job, for ONE family:

1. **Fix every broken item (category A)**: questions and lessons that refer to a visual the student cannot see ("Study
   Fig. 2.1", "use the graph", "the diagram shows ..."). For each one either ADD the diagram (preferred when the
   question is about reading a diagram) or REWRITE the text so it is complete without one (e.g. give the values in a
   table or in words). A question must be answerable exactly as written.
2. **Add diagrams to the priority lessons (category C)**: the lessons on topics normally taught with a picture. Target
   the number given in your assignment, choosing the most important exam topics first (core syllabus content that
   students are examined on, where a picture really teaches: graphs and curves, circuits, ray diagrams, apparatus,
   energy profiles, supply-demand and cost curves, geometry, vectors, maps / cross-sections / climate graphs, flows).
   One to three figures per lesson; each figure must teach something the text alone does not.
3. Do NOT change drawing tasks (category B) unless they are also broken.

## How to draw: the kit

`.scratch/tools/diagram-kit.mjs` (read it fully first). Reference example: `.scratch/economics-o/diagrams/markets.mjs`
(the tomato-market equilibrium in `content/subjects/economics-o/lessons/markets/equilibrium.md`). Self-test images:
`node .scratch/tools/diagram-kit-sample.mjs <dir>` (supply/demand, a circuit, a shaded parabola).

- Write your drawing scripts in `.scratch/<family>/diagrams/<topic>.mjs` (one per lesson folder is a good size), each
  `import * as D from "../../tools/diagram-kit.mjs";`. Run them with `node`. They must be re-runnable (the kit's
  `figure()` overwrites the PNG and upserts media.json; `insertAfter()` skips a lesson that already has the image).
- `D.axes()` for any graph (exact functions with `plot`, data with `line` / `point`, `guides`, `area`, `tag`);
  `D.sym.*` for circuit symbols; `D.node()` + `D.arrow()` for flowcharts, cycles, organisation charts, block diagrams;
  primitives (`line`, `rect`, `circle`, `path_`, `polyline`, `text`, `tag`) for apparatus, geometry, cross-sections.
  Extend the kit only by adding a NEW helper in your own script (do not edit the shared kit: other writers use it).
- **Every number in a figure is computed from the same values the text uses** (define them once in the script). If a
  lesson's worked example uses y = 2x + 3 or a 4 Ω resistor, the figure shows exactly that.
- Name files `<short-topic>-<what>` in lower case with hyphens (e.g. `ohms-law-iv-graph`); the kit puts them in
  `media/diagrams/`.
- **Alt text** (required, 20+ chars): the learning point with its values ("Velocity-time graph: the car accelerates
  uniformly from 0 to 12 m/s in 4 s, then travels at 12 m/s; the area under the line is the distance, 72 m"). Never
  "a diagram of ...". **Caption**: short, starts with "Figure:".
- Placement: `D.insertAfter(lessonPath, "<heading or sentence>", D.md(name, alt, caption))` puts the figure right after
  the paragraph that introduces it. For a question, put `D.md(...)` (Markdown image) into the question's `stem` (or the
  part's `stem`) in the question SOURCE (see below).
- **Look at every PNG you make** (Read the file: it is an image) and fix overlaps, clipped labels, wrong values or
  cramped text before moving on. Text must be readable on a phone: keep the SVG width 480-640 and font sizes >= 13.
- Accuracy over decoration: no shading or colours that carry meaning on their own (also say it in text/labels), no
  3D, no clip art. Original drawings only.

## Where questions come from (do not lose your edits)

Many families GENERATE their question JSON from slices: if the question key appears in `.scratch/<dir>/slices/*.mjs`
(grep it), edit the slice and rebuild with that family's build command (see its BRIEF.md / notes, usually
`node .scratch/<dir>/build-content.mjs`), never only the JSON. Families whose JSON is the source (no slice contains
the key) are edited in place. Lessons are always the `.md` files in `content/subjects/<family>/lessons/`.
Scratch dirs: physics-o -> `.scratch/physics`, chemistry-o -> `.scratch/chem-*` (JSON is the source), biology-o /
mathematics-o (JSON is the source), economics-o -> `.scratch/economics`, geography-o -> `.scratch/geography`,
other families -> `.scratch/<family>` or `.scratch/<family without -o>`. Check before editing.

## Checks (all must pass for your family before you finish)

- `npm run content:validate -- <family> --strict` -> 0 errors, 0 warnings (for mathematics-o, biology-o, physics-o,
  chemistry-o also run `npm run content:validate -- combined-science-o mathematics-o biology-o physics-o chemistry-o --strict`).
- `npm run content:check -- <family>` -> no findings in files you touched.
- `node .scratch/tools/diagram-audit.mjs <family>` -> category A is 0 (or each remaining one explained in your report).
- `node .scratch/tools/literal-newlines.mjs <family>` -> 0; `node .scratch/tools/length-cue.mjs <family>` -> 0 flagged.
- If you rebuilt generated questions, `git diff --stat` must show only the files you meant to change.

## Rules

- Touch only your family's files (`content/subjects/<family>/**`, `.scratch/<its dir>/**`). Never edit the shared
  kit, src/**, other families, git, content:import / content:publish, npm install, prisma, next or typecheck.
- Final report (under 300 words): figures added (count, lessons), broken items fixed (added a diagram vs rewritten),
  anything left and why, and a "For a reviewer to check" list of the 3-5 figures most worth a human look.
