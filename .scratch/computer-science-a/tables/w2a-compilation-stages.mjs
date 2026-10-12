import { mdTable, chk, same, codeBlock } from "../lib.mjs";
import { tokenise, tokenTable, parseExpr, treeLines, threeAddress, fold, show } from "./w2a-compiler.mjs";
const line = "Cost ← Price * Qty + 15  // fee added";
const toks = tokenise(line);
same(toks.map((t) => t.text), ["Cost", "←", "Price", "*", "Qty", "+", "15"]);
const exprToks = toks.slice(2).map((t) => t.text);
const tree = parseExpr(exprToks);
same(show(tree), "((Price * Qty) + 15)");
const treeBlock = codeBlock(treeLines(tree).join("\n"));
const tac = codeBlock(threeAddress(tree, "Cost").join("\n"));
// symbol table
const symbols = mdTable(["Identifier", "Type (from DECLARE)", "Use"], [["Cost", "REAL", "variable assigned"], ["Price", "REAL", "variable read"], ["Qty", "INTEGER", "variable read"]]);
// constant folding
const t2 = tokenise("Seconds ← 60 * 60 * 24").slice(2).map((t) => t.text);
const folded = fold(parseExpr(t2));
chk(+folded.leaf, 86400);
const t3 = tokenise("Area ← 3 * 4 + Width * 2").slice(2).map((t) => t.text);
const f3 = fold(parseExpr(t3));
same(show(f3), "(12 + (Width * 2))");
// stack for factorial(4)
const calls = [];
const fact = (n, depth) => { calls.push([depth, `Fact(${n})`]); const r = n <= 1 ? 1 : n * fact(n - 1, depth + 1); calls.push([depth, `returns ${r}`]); return r; };
chk(fact(4, 1), 24);
const maxDepth = Math.max(...calls.map((c) => c[0]));
chk(maxDepth, 4);
const stackTable = mdTable(["Event", "Stack depth after the event"], (() => { const rows = []; let d = 0; for (const [, ev] of calls) { if (ev.startsWith("Fact")) d++; else d--; rows.push([ev.startsWith("Fact") ? `call ${ev}` : `${ev}`, d]); } return rows; })());
const stages = mdTable(["Stage", "Input", "Output", "Errors found"], [["Lexical analysis", "Source code characters", "Tokens and symbol table", "Illegal characters, invalid names"], ["Syntax analysis", "Tokens", "Parse tree", "Statements that break the grammar"], ["Code generation", "Parse tree", "Object code (or intermediate code)", "–"], ["Optimisation", "Generated code", "Faster or smaller code", "–"]]);
export const snips = { toks: tokenTable(toks), line: codeBlock(line), treeBlock, tac, symbols, stackTable, stages, maxDepth: String(maxDepth), folded: folded.leaf, foldCode: codeBlock("Seconds ← 60 * 60 * 24"), foldedCode: codeBlock(`Seconds ← ${folded.leaf}`), nTokens: String(toks.length) };
if (process.argv[1].endsWith("w2a-compilation-stages.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
