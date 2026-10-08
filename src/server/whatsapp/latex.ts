/**
 * LaTeX to readable Unicode for WhatsApp plain text (ARCHITECTURE §3.10 "plain-text projection ... LaTeX to readable
 * Unicode where possible", §8 "maths over WhatsApp"). Pure.
 *
 * Handles what school maths and science questions mostly use: Greek letters, operators and relations, superscripts and
 * subscripts (Unicode where every character has a form, else `^(...)` / `_(...)`), fractions (`a/b`, vulgar fractions
 * for ½ ⅓ ¼ ...), square / cube roots, `\text{}` and friends, `\left( \right)`, degrees, common functions and
 * accents on a single letter. Anything else (environments, matrices, arrays, unknown commands, line breaks) returns
 * `null`: the caller then shows the source and links to the app, where the server-rendered KaTeX version is shown.
 */

class TooComplex extends Error {}

const SUPERSCRIPT: Readonly<Record<string, string>> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "−": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", n: "ⁿ", i: "ⁱ", x: "ˣ", y: "ʸ", a: "ᵃ", b: "ᵇ",
  k: "ᵏ", m: "ᵐ", t: "ᵗ", "°": "°",
};

const SUBSCRIPT: Readonly<Record<string, string>> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "−": "₋", "=": "₌", "(": "₍", ")": "₎", a: "ₐ", e: "ₑ", o: "ₒ", x: "ₓ", h: "ₕ", k: "ₖ",
  l: "ₗ", m: "ₘ", n: "ₙ", p: "ₚ", s: "ₛ", t: "ₜ", i: "ᵢ", r: "ᵣ", u: "ᵤ", v: "ᵥ", j: "ⱼ",
};

const SYMBOLS: Readonly<Record<string, string>> = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", varepsilon: "ε", zeta: "ζ", eta: "η", theta: "θ",
  vartheta: "ϑ", iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", varpi: "ϖ", rho: "ρ",
  sigma: "σ", varsigma: "ς", tau: "τ", upsilon: "υ", phi: "φ", varphi: "φ", chi: "χ", psi: "ψ", omega: "ω",
  Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π", Sigma: "Σ", Upsilon: "Υ", Phi: "Φ", Psi: "Ψ",
  Omega: "Ω",
  times: "×", div: "÷", cdot: "·", ast: "∗", pm: "±", mp: "∓", le: "≤", leq: "≤", leqslant: "≤", ge: "≥", geq: "≥",
  geqslant: "≥", ne: "≠", neq: "≠", approx: "≈", sim: "~", simeq: "≃", equiv: "≡", cong: "≅", propto: "∝", infty: "∞",
  to: "→", rightarrow: "→", leftarrow: "←", Rightarrow: "⇒", Leftarrow: "⇐", leftrightarrow: "↔", Leftrightarrow: "⇔",
  implies: "⇒", iff: "⇔", rightleftharpoons: "⇌", longrightarrow: "⟶", uparrow: "↑", downarrow: "↓",
  in: "∈", notin: "∉", ni: "∋", subset: "⊂", subseteq: "⊆", supset: "⊃", supseteq: "⊇", cup: "∪", cap: "∩",
  emptyset: "∅", varnothing: "∅", forall: "∀", exists: "∃", neg: "¬", land: "∧", lor: "∨", therefore: "∴",
  because: "∵", angle: "∠", triangle: "△", parallel: "∥", perp: "⊥", circ: "∘", degree: "°", prime: "′",
  partial: "∂", nabla: "∇", sum: "Σ", prod: "Π", int: "∫", oint: "∮", ldots: "…", dots: "…", cdots: "⋯",
  vdots: "⋮", ell: "ℓ", hbar: "ħ", langle: "⟨", rangle: "⟩", lvert: "|", rvert: "|", vert: "|", mid: "|",
  "|": "‖", lbrace: "{", rbrace: "}", backslash: "\\", star: "⋆", bullet: "•", checkmark: "✓", ohm: "Ω",
  "%": "%", $: "$", "&": "&", "#": "#", _: "_", "{": "{", "}": "}",
};

const SPACES: Readonly<Record<string, string>> = { ",": " ", ";": " ", ":": " ", " ": " ", quad: " ", qquad: " ", "!": "", enspace: " " };

const FUNCTIONS = new Set([
  "sin", "cos", "tan", "sec", "csc", "cosec", "cot", "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh", "log",
  "ln", "lg", "exp", "lim", "max", "min", "det", "gcd", "deg", "mod", "bmod", "pmod",
]);

const TEXT_COMMANDS = new Set([
  "text", "textrm", "textup", "textnormal", "mathrm", "mathbf", "textbf", "mathit", "textit", "mathsf", "textsf",
  "mathtt", "texttt", "operatorname", "mbox", "boldsymbol", "bm", "emph", "mathnormal", "displaystyle", "textstyle",
]);

const DOUBLE_STRUCK: Readonly<Record<string, string>> = { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" };
const ACCENTS: Readonly<Record<string, string>> = { bar: "̄", overline: "̄", hat: "̂", widehat: "̂", vec: "⃗", dot: "̇", ddot: "̈", tilde: "̃" };
const VULGAR: Readonly<Record<string, string>> = { "1/2": "½", "1/3": "⅓", "2/3": "⅔", "1/4": "¼", "3/4": "¾", "1/5": "⅕", "1/8": "⅛" };
const STYLE_SWITCHES = new Set(["displaystyle", "textstyle", "scriptstyle", "limits", "nolimits", "middle", "big", "Big", "bigg", "Bigg", "bigl", "bigr", "Bigl", "Bigr"]);

/** Wraps compound text in parentheses so `a/b` stays unambiguous. */
function wrap(text: string): string {
  const trimmed = text.trim();
  if (/^[\p{L}\p{N}.,′°²³⁰¹⁴⁵⁶⁷⁸⁹ⁿ]+$/u.test(trimmed) || /^\(.*\)$/.test(trimmed)) return trimmed;
  return `(${trimmed})`;
}

class Parser {
  private pos = 0;

  constructor(private readonly src: string) {}

  run(): string {
    const out = this.sequence(false);
    if (this.pos < this.src.length) throw new TooComplex();
    return out;
  }

  private peek(): string | undefined {
    return this.src[this.pos];
  }

  private sequence(inGroup: boolean): string {
    let out = "";
    while (this.pos < this.src.length) {
      const ch = this.peek();
      if (ch === "}") {
        if (!inGroup) throw new TooComplex();
        return out;
      }
      out += this.withScripts();
    }
    if (inGroup) throw new TooComplex();
    return out;
  }

  private withScripts(): string {
    let base = this.peek() === "^" || this.peek() === "_" ? "" : this.atom();
    while (this.peek() === "^" || this.peek() === "_") {
      const kind = this.peek();
      this.pos += 1;
      base += kind === "^" ? this.superscript() : this.subscript();
    }
    return base;
  }

  /** One argument: a `{group}` or a single token. */
  private argument(): string {
    while (this.peek() === " ") this.pos += 1;
    const ch = this.peek();
    if (ch === undefined) throw new TooComplex();
    if (ch === "{") {
      this.pos += 1;
      const inner = this.sequence(true);
      this.pos += 1;
      return inner;
    }
    return this.atom();
  }

  private superscript(): string {
    if (this.src.startsWith("\\circ", this.pos)) {
      this.pos += 5;
      return "°";
    }
    if (this.src.startsWith("{\\circ}", this.pos)) {
      this.pos += 7;
      return "°";
    }
    if (this.src.startsWith("\\prime", this.pos)) {
      this.pos += 6;
      return "′";
    }
    const arg = this.argument().replace(/\s+/g, "");
    if (arg === "") return "";
    const chars = [...arg];
    if (chars.every((c) => SUPERSCRIPT[c] !== undefined)) return chars.map((c) => SUPERSCRIPT[c]).join("");
    return chars.length === 1 ? `^${arg}` : `^(${arg})`;
  }

  private subscript(): string {
    const arg = this.argument().replace(/\s+/g, "");
    if (arg === "") return "";
    const chars = [...arg];
    if (chars.every((c) => SUBSCRIPT[c] !== undefined)) return chars.map((c) => SUBSCRIPT[c]).join("");
    return chars.length === 1 ? `_${arg}` : `_(${arg})`;
  }

  private atom(): string {
    const ch = this.peek();
    if (ch === undefined) throw new TooComplex();
    if (ch === "{") {
      this.pos += 1;
      const inner = this.sequence(true);
      this.pos += 1;
      return inner;
    }
    if (ch === "\\") return this.command();
    if (ch === "&" || ch === "#") throw new TooComplex();
    this.pos += 1;
    if (ch === "~") return " ";
    if (ch === "'") return "′";
    return ch;
  }

  private command(): string {
    this.pos += 1; // backslash
    const rest = this.src.slice(this.pos);
    const word = /^[A-Za-z]+/.exec(rest)?.[0];
    if (!word) {
      const symbol = rest[0];
      if (symbol === undefined) throw new TooComplex();
      this.pos += 1;
      if (symbol === "\\") throw new TooComplex(); // line break: multi-line display maths
      const spaced = SPACES[symbol];
      if (spaced !== undefined) return spaced;
      const mapped = SYMBOLS[symbol];
      if (mapped !== undefined) return mapped;
      throw new TooComplex();
    }
    this.pos += word.length;

    if (word === "frac" || word === "dfrac" || word === "tfrac" || word === "cfrac") {
      const numerator = this.argument().trim();
      const denominator = this.argument().trim();
      const plain = `${numerator}/${denominator}`;
      return VULGAR[plain] ?? `${wrap(numerator)}/${wrap(denominator)}`;
    }
    if (word === "sqrt") {
      let root = "√";
      while (this.peek() === " ") this.pos += 1;
      if (this.peek() === "[") {
        const close = this.src.indexOf("]", this.pos);
        const index = close > 0 ? this.src.slice(this.pos + 1, close).trim() : "";
        if (index === "3") root = "∛";
        else if (index === "4") root = "∜";
        else throw new TooComplex();
        this.pos = close + 1;
      }
      const radicand = this.argument().trim();
      return `${root}${wrap(radicand)}`;
    }
    if (word === "left" || word === "right") {
      while (this.peek() === " ") this.pos += 1;
      const next = this.peek();
      if (next === ".") {
        this.pos += 1;
        return "";
      }
      if (next === "\\") return this.command();
      if (next === undefined) throw new TooComplex();
      this.pos += 1;
      return next;
    }
    if (TEXT_COMMANDS.has(word)) {
      if (word === "displaystyle" || word === "textstyle") return "";
      return this.argument();
    }
    if (STYLE_SWITCHES.has(word)) return "";
    if (word === "mathbb") {
      const letter = this.argument().trim();
      const mapped = DOUBLE_STRUCK[letter];
      if (!mapped) throw new TooComplex();
      return mapped;
    }
    const accent = ACCENTS[word];
    if (accent !== undefined) {
      const target = this.argument().trim();
      if ([...target].length !== 1) throw new TooComplex();
      return `${target}${accent}`;
    }
    if (FUNCTIONS.has(word)) return word === "bmod" ? " mod " : word;
    const spaced = SPACES[word];
    if (spaced !== undefined) return spaced;
    const symbol = SYMBOLS[word];
    if (symbol !== undefined) return symbol;
    throw new TooComplex();
  }
}

/** Readable Unicode for a LaTeX math fragment (without `$` delimiters), or `null` when it is too complex for text. */
export function latexToUnicode(latex: string): string | null {
  const source = latex.trim();
  if (source.length === 0) return "";
  if (source.length > 500 || /\\begin\b|\\end\b|\\(?:over|under)(?:set|brace)\b|\\(?:matrix|array|cases|substack)\b/.test(source)) return null;
  try {
    return new Parser(source)
      .run()
      .replace(/ {2,}/g, " ")
      .replace(/\s+([,.;])/g, "$1")
      .trim();
  } catch (error) {
    if (error instanceof TooComplex) return null;
    throw error;
  }
}
