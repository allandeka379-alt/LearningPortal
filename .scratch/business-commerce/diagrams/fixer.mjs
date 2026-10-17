// Fixer pass: break-even chart for business-commerce-o lessons/operations/break-even-chart.md (run from the repo root).
import * as D from "../../tools/diagram-kit.mjs";
import { breakEvenSvg } from "../../business-a/diagrams/fixer.mjs";

// Example 1 of the lesson: fixed costs US$4,000, price US$10, variable cost US$6, capacity 2,000; Example 2 expects 1,500.
const o = { fc: 4000, price: 10, vc: 6, maxQ: 2000, expected: 1500, qStep: 500, yStep: 5000, yMax: 20000 };
const alt = "Break-even chart for the uniform maker: fixed costs flat at US$4,000; total cost rises from US$4,000 to US$16,000 and revenue from zero to US$20,000 at 2,000 uniforms; the lines cross at 1,000 uniforms and US$10,000. Loss to the left, profit to the right; at 1,500 uniforms the margin of safety is 500 uniforms.";
const cap = "Figure: break-even chart from Example 1 (fixed costs US$4,000, price US$10, variable cost US$6)";
await D.figure("business-commerce-o", "break-even-chart", breakEvenSvg(o), { alt, caption: cap });
D.insertAfter("content/subjects/business-commerce-o/lessons/operations/break-even-chart.md", "## Reading the chart", D.md("break-even-chart", alt, cap));
