# Content authoring guide

For content editors writing lessons, question stems, explanations, worked solutions and flashcards in the CMS.
Content is **Markdown + LaTeX maths + content blocks**. The CMS preview shows exactly what students see, plus a
list of **warnings** for anything the renderer had to fix or remove. Clear every warning before submitting for review.

Product references: §8 lessons, §9 question bank, §27 copyright, §43 accessibility, §47 content strategy.

---

## 1. Copyright and licensing (read first, §27)

- **Write original content**, or use material you have a licence for. Record the source, author, copyright
  status and licence in the item's metadata fields.
- **Never paste** past exam papers, marking schemes, examiner reports, textbook text, revision-guide text or
  website text. Do not lightly reword them either: write your own questions and explanations.
- Official **syllabus structures** (topic lists, learning objectives) may only be used where the exam board's
  terms allow it. Do not copy syllabus documents wholesale.
- **Images and diagrams** must be your own work, licensed, or public domain, with the attribution in the asset's
  metadata. Do not upload screenshots of books, papers or other sites.
- **AI-generated drafts** arrive as `DRAFT`. Check every fact, number and step, and make sure the draft does not
  reproduce copyrighted text before you approve it.
- Never make up statistics, pass rates or testimonials.

---

## 2. Text basics

| You write                          | Students see                                   |
| ---------------------------------- | ---------------------------------------------- |
| `## Section` / `### Subsection`    | Headings. Start at `##`, because the page title is the top heading. Headings appear in the lesson's "On this page" menu. |
| `**bold**`, `*italic*`, `~~struck~~` | **bold**, *italic*, ~~struck~~               |
| `- item` / `1. item`               | Bulleted / numbered list (indent two spaces to nest) |
| `> text`                           | Quotation                                      |
| `` `code` `` and fenced ```` ``` ```` blocks | Code (Computer Science)                |
| `[link text](https://example.org)` | Link. External links open in a new tab.        |
| `[next lesson](/zimsec/o-level/mathematics)` | Internal link (same tab)             |
| `[see the method](#solving-by-factorising)` | Jump to a heading in the same document  |
| `Text[^1]` … `[^1]: Source note.`  | Footnote                                       |
| `---` on its own line              | Horizontal rule                                |
| A blank line                       | New paragraph                                  |

Write meaningful link text ("the 2026 syllabus"), never "click here".

### Tables

```md
| Quantity | Symbol | SI unit |
| -------- | :----: | ------: |
| Force    | $F$    | N       |
| Mass     | $m$    | kg      |
```

`:---:` centres a column, `---:` right-aligns it. Tables scroll sideways on phones. To break a line inside a cell,
use `<br>` (the only HTML allowed).

---

## 3. Maths and chemistry (KaTeX)

| You write                                   | Result                       |
| ------------------------------------------- | ---------------------------- |
| `$x^2 + 3x - 4 = 0$`                        | Inline maths within a sentence |
| `$$` on its own line, the formula, then `$$` on its own line | Display (centred) maths |
| `$$\frac{-b \pm \sqrt{b^2-4ac}}{2a}$$` as a paragraph on its own | Display maths |
| `$\ce{2H2 + O2 -> 2H2O}$`                   | Chemical equation (mhchem)   |
| `$\ce{Cu^2+}$`, `$\ce{SO4^2-}$`             | Ions                         |
| `$\pu{9.81 m/s^2}$`                         | Physical units               |

```md
The roots of a quadratic are

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

**Money:** a dollar sign starts maths. Write `\$5` for money: `It costs \$5 and \$12.50`. If you forget, the preview
shows a *math-currency* warning.

Long equations scroll sideways on small screens. Prefer several short display lines (one per step) over one very long
line. Commands that create links, styles or images (`\href`, `\url`, `\includegraphics`, `\htmlClass`, ...) are
disabled and show as red text. Each maths expression is rendered independently, so a `\def` in one expression is not
available in the next.

---

## 4. Content blocks

Blocks are fenced with `:::name` on their own line and closed with `:::`. Each block gets a coloured box, an icon and
a heading that screen-reader users can jump to.

| Block                | Use it for                         | Title attribute    |
| -------------------- | ---------------------------------- | ------------------ |
| `:::definition`      | Key term and its meaning           | `term="..."`       |
| `:::keyfact`         | A fact to memorise                 | `title="..."`      |
| `:::example`         | An illustrative example            | `title="..."`      |
| `:::worked-solution` | Step-by-step solution              | `title="..."`      |
| `:::mistake`         | Common mistake / misconception     | `title="..."`      |
| `:::exam-tip`        | Exam technique advice              | `title="..."`      |
| `:::note`            | Side note                          | `title="..."`      |
| `:::formula`         | A formula to learn                 | `name="..."`       |
| `:::summary`         | End-of-section recap               | `title="..."`      |

```md
:::definition{term="Photosynthesis"}
The process by which green plants use light energy to make glucose from carbon dioxide and water.
:::

:::keyfact
The sum of the interior angles of a triangle is $180^\circ$.
:::

:::example{title="Expanding brackets"}
$3(x + 2) = 3x + 6$
:::

:::worked-solution[Solve $x^2 - 5x + 6 = 0$]
1. Factorise: $(x - 2)(x - 3) = 0$.
2. Set each factor to zero: $x - 2 = 0$ or $x - 3 = 0$.
3. So $x = 2$ or $x = 3$.
:::

:::mistake
Writing $(a + b)^2 = a^2 + b^2$. The correct expansion is $a^2 + 2ab + b^2$.
:::

:::exam-tip
Always show your working: method marks are available even if the final answer is wrong.
:::

:::note
This topic is examined on Paper 2 only.
:::

:::formula{name="Area of a circle"}
$$
A = \pi r^2
$$
:::

:::summary
- Photosynthesis needs light, water and carbon dioxide.
- It produces glucose and oxygen.
:::
```

- **Titles with maths or formatting:** use square brackets instead of the attribute, as in the worked solution
  above. A bracket title wins over an attribute.
- **Worked-solution steps:** use a numbered list; each step is shown as a separate numbered step.
- **Blocks inside blocks:** give the outer block more colons than the inner one:

  ```md
  ::::example{title="Simultaneous equations"}
  Solve the pair of equations.

  :::worked-solution
  1. ...
  :::
  ::::
  ```

- Block names are lower-case and must match the table exactly. An unknown name (for example `:::warning`) shows the
  content without a box and produces a warning. Other attributes such as `class`, `id` or `style` are ignored.
- MCQ options and short labels are displayed **inline**: blocks, lists, tables, headings and display maths are
  flattened there, and the preview warns you. Put structure in the question stem or the explanation instead.

---

## 5. Images and diagrams

1. Upload the image in the **Media library**. It must be original or licensed (see section 1).
2. Copy its reference and write: `![description of the image](asset:<asset-id>)`.

```md
![Labelled diagram of a plant cell showing the cell wall, chloroplasts, vacuole and nucleus](asset:3f2a9c1e-5b7d-4e8a-9c0f-1a2b3c4d5e6f "Figure 1: A plant cell")
```

- **Alt text is required (§43).** An image without a description is removed and a warning is shown. Describe what
  the image shows *for the learning point*: the labels, the trend in a graph, the values that matter. "Diagram" or
  "image1.png" is not a description.
- The text in quotes after the reference becomes a **caption** when the image is in a paragraph on its own.
- **External image URLs are not allowed** (`![...](https://...)`). They are replaced by an "Image not shown" note,
  because external images can disappear, track students, cost them data, or be unlicensed.
- Prefer diagrams with large, legible labels. Students read on small phone screens over slow connections, so keep
  file sizes small (simple diagrams as compressed PNG/WebP, not multi-megabyte photos).

---

## 6. Things that are removed

- **Raw HTML** (`<div>`, `<span style>`, `<iframe>`, `<script>`, ...) is removed. Use Markdown or a content block.
  The only exceptions are `<br>` and HTML comments (`<!-- note to reviewers -->`), which are kept out of the
  student view.
- Links that are not `https://`, `http://`, `mailto:`, site-relative (`/...`) or in-page (`#...`) lose their link and
  show as plain text.

---

## 7. Preview warnings

| Warning               | Meaning and fix                                                                 |
| --------------------- | ------------------------------------------------------------------------------- |
| `image-missing-alt`   | The image has no description and was omitted. Add alt text.                    |
| `image-external`      | External image URL. Upload the image and use `asset:<id>`.                       |
| `image-unresolved`    | The asset id does not exist (or was deleted). Re-copy the reference.            |
| `raw-html`            | HTML was removed. Rewrite it in Markdown or as a content block.                 |
| `unknown-directive`   | Misspelt block name, or `::name` instead of `:::name`. See section 4.           |
| `directive-attribute` | Unsupported attribute on a block (only the title attribute is used).           |
| `math-error`          | The LaTeX could not be rendered (the message says where), or it uses a disabled command such as `\href`. |
| `math-currency`       | Probably money written with `$`. Use `\$`.                                      |
| `inline-flattened`    | Block content in an inline field (MCQ option, label). Simplify it.              |

---

## 8. Accessibility checklist

- Headings in order (`##`, then `###`); do not skip levels or use headings for emphasis.
- Every image has meaningful alt text; complex graphs are also explained in the text.
- Never rely on colour alone ("the red line"): name or label it.
- Write maths as maths (`$x^2$`, not `x2` or an image of an equation) so screen readers can read it.
- Use descriptive link text.
- Keep paragraphs short. Students read on phones.

---

## 9. Daily questions, FAQ and testimonials (site content)

These live under **Content** in the admin console and need the `content.publish` permission (content editors and
admins). Every change is recorded in the audit log.

**Daily questions** (`/admin/daily-questions`). Every night at 22:30 (Harare time) the scheduler picks tomorrow's
question for each subject that students can see. It only chooses questions that are:

- published, from the platform bank (not a school's or tutor's own question), and **Free** or **Public**;
- multiple choice, true/false, numerical or short answer, marked automatically;
- ticked **"Can be a daily question"** in the question editor (short, and readable on WhatsApp: avoid long tables or
  diagrams the answer depends on);
- difficulty 2 or 3, and not used as a daily question in the same qualification in the last 60 days.

It rotates through topics so consecutive days differ. If a subject has nothing eligible left, the day stays empty and
the calendar says so: flag more questions. To choose a question yourself, open the day and pick one ("Choose" or
"Change"); your choice is never overwritten by the scheduler. "Pick now" runs the scheduler for one empty day so you
can review it ahead of time; "Clear" empties a day. A day that students have already answered cannot be changed.

**FAQ** (`/admin/faq`). Answers use the same Markdown as lessons (bold, lists, links, maths); images are not shown in
FAQ answers. The category decides where an entry appears: every published entry is on `/faq`; the home page shows
the first six `general` entries; `pricing` (or `billing`) entries also appear on `/pricing`, and `schools` entries on
`/schools`. New entries are saved
unpublished: check the preview, then publish. Use the arrows on the list to change the order within a category.

**Testimonials** (`/admin/testimonials`). Only record a testimonial you hold written consent for, and record when and
how it was given and where the evidence is kept (never paste contact details). For anyone under 18, tick "The author
is under 18" and record the guardian's consent before publishing. Use the person's words and the name exactly as they
agreed. If they withdraw consent, use **Record withdrawal**: the testimonial is unpublished and its quote, name and
photo are erased for good. Never invent or "improve" a testimonial (rule 6).
