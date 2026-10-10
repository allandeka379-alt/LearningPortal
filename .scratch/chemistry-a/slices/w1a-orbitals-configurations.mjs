// W1a: atoms.orbitals-configurations — shells, sub-shells, orbitals, configurations, electrons in boxes, free radicals.
import { concept, P, t, chk, same } from "../lib.mjs";

// Ground-state configuration (Z ≤ 36) with the Cr and Cu exceptions; cations lose 4p, then 4s, then 3d.
const ORDER = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2], ["3d", 10], ["4p", 6]];
function config(Z, charge = 0) {
  const c = {};
  let left = Z;
  for (const [s, cap] of ORDER) { if (left <= 0) break; c[s] = Math.min(cap, left); left -= c[s]; }
  if (Z === 24 || Z === 29) { c["4s"] = 1; c["3d"] += 1; }
  let rem = charge;
  for (const s of ["4p", "4s", "3d", "3p", "3s", "2p"]) { while (rem > 0 && c[s] > 0) { c[s]--; rem--; } }
  let add = -charge;
  for (const [s, cap] of ORDER) { while (add > 0 && (c[s] ?? 0) < cap) { c[s] = (c[s] ?? 0) + 1; add--; } }
  return c;
}
const ORB = { s: 1, p: 3, d: 5 };
const unpaired = (c) => Object.entries(c).reduce((u, [s, n]) => { const o = ORB[s[1]]; return u + (n <= o ? n : 2 * o - n); }, 0);
const SUP = (n) => String(n).replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
const str = (c) => ["1s", "2s", "2p", "3s", "3p", "3d", "4s", "4p"].filter((s) => c[s]).map((s) => `${s}${SUP(c[s])}`).join(" ");
const shortAr = (c) => `[Ar] ${["3d", "4s", "4p"].filter((s) => c[s]).map((s) => `${s}${SUP(c[s])}`).join(" ")}`.trim();
// self-checks against known configurations
same(shortAr(config(24)), "[Ar] 3d⁵ 4s¹");
same(shortAr(config(29)), "[Ar] 3d¹⁰ 4s¹");
same(shortAr(config(26, 3)), "[Ar] 3d⁵");
chk(unpaired(config(8)), 2);

concept("achem.atoms.orbitals-configurations", { file: "atoms/orbitals-configurations", keyPrefix: "atoms.orbitals-configurations" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the maximum number of electrons that the 3d sub-shell can hold?",
    options: [["10", "Correct: five d orbitals, two electrons each."], ["5", "Five is the number of d orbitals, not electrons."], ["18", "18 is the capacity of the whole third shell (3s + 3p + 3d)."], ["6", "Six is the capacity of a p sub-shell."]],
    answer: "A",
    explanation: "A d sub-shell has five orbitals; each orbital holds two electrons of opposite spin, so 10 electrons.",
  });
  {
    const c = config(25, 2);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`What is the electron configuration of the $\ce{Mn^2+}$ ion? (Mn, proton number 25)`,
      options: [
        [shortAr(c), "Correct: Mn is [Ar] 3d⁵ 4s²; both 4s electrons are removed first."],
        ["[Ar] 3d³ 4s²", "The 4s electrons are lost before the 3d electrons."],
        ["[Ar] 3d⁴ 4s¹", "Both electrons come from 4s, not one from each sub-shell."],
        ["[Ar] 3d⁷", "This adds two electrons instead of removing them."],
      ],
      answer: "A",
      explanation: t`Mn (25 electrons) is [Ar] 3d⁵ 4s². The 2+ ion has lost the two 4s electrons: ${shortAr(c)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the ground-state configuration of a copper atom (proton number 29)?",
    options: [
      [shortAr(config(29)), "Correct: copper is one of the two exceptions; a full 3d sub-shell is more stable."],
      ["[Ar] 3d⁹ 4s²", "This follows the simple filling order, but copper actually has a full 3d sub-shell."],
      ["[Ar] 3d¹¹", "A d sub-shell can hold only 10 electrons."],
      ["[Ar] 4s² 4p⁹", "The 3d sub-shell fills before 4p, and a p sub-shell holds at most 6 electrons."],
    ],
    answer: "A",
    explanation: "Chromium ([Ar] 3d⁵ 4s¹) and copper ([Ar] 3d¹⁰ 4s¹) are the exceptions to the filling order in the first row of the d block.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which atom has the greatest number of unpaired electrons in its ground state?",
    options: [
      [t`$\ce{Cr}$ (Z = 24)`, `Correct: [Ar] 3d⁵ 4s¹ gives ${unpaired(config(24))} unpaired electrons.`],
      [t`$\ce{Fe}$ (Z = 26)`, `[Ar] 3d⁶ 4s²: one 3d orbital is paired, leaving ${unpaired(config(26))} unpaired electrons.`],
      [t`$\ce{Mn}$ (Z = 25)`, `[Ar] 3d⁵ 4s²: the 4s electrons are paired, so ${unpaired(config(25))} unpaired electrons.`],
      [t`$\ce{N}$ (Z = 7)`, `1s² 2s² 2p³: ${unpaired(config(7))} unpaired electrons.`],
    ],
    answer: "A",
    hints: ["Remember the chromium exception.", "Draw the d and s boxes and fill singly before pairing."],
    explanation: `Unpaired electrons: Cr ${unpaired(config(24))}, Mn ${unpaired(config(25))}, Fe ${unpaired(config(26))}, N ${unpaired(config(7))}. Chromium's 3d⁵ 4s¹ arrangement leaves every electron outside the argon core unpaired.`,
  });
  {
    // M3+ with 3d3 -> Cr
    const target = config(24, 3);
    same(shortAr(target), "[Ar] 3d³");
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "An ion X³⁺ has the configuration 1s² 2s² 2p⁶ 3s² 3p⁶ 3d³. What is element X?",
      options: [
        ["chromium", "Correct: 21 electrons in the ion + 3 = 24 protons; Cr³⁺ is [Ar] 3d³."],
        ["vanadium", "Vanadium (23) would give V³⁺ as [Ar] 3d²: you need to add the three lost electrons back to the 21."],
        ["scandium", "Sc (21) is the element with 21 electrons in the atom, not in the 3+ ion."],
        ["manganese", "Mn³⁺ would be [Ar] 3d⁴."],
      ],
      answer: "A",
      hints: ["Count the electrons in the ion, then add three."],
      explanation: "Electrons in the ion: 2 + 2 + 6 + 2 + 6 + 3 = 21. The atom has 21 + 3 = 24 electrons, so 24 protons: chromium. (Cr [Ar] 3d⁵ 4s¹ loses the 4s electron and two 3d electrons.)",
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement describes a p orbital?",
    options: [
      ["It is dumbbell-shaped and holds up to two electrons.", "Correct: each p orbital has two lobes on opposite sides of the nucleus and holds two electrons."],
      ["It is spherical and holds up to two electrons.", "That describes an s orbital."],
      ["It is dumbbell-shaped and holds up to six electrons.", "Six is the capacity of the p sub-shell (three orbitals), not of one orbital."],
      ["It is spherical and holds up to six electrons.", "An s orbital is spherical; no single orbital holds more than two electrons."],
    ],
    answer: "A",
    explanation: "Every orbital, whatever its shape, holds a maximum of two electrons of opposite spin. p orbitals are dumbbell-shaped and point along the x, y and z axes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about the electron configuration of iron and its ions:\n\n1. An iron atom has two electrons in its 4s sub-shell.\n2. The Fe³⁺ ion has five unpaired electrons.\n3. The Fe²⁺ ion has the configuration [Ar] 3d⁴ 4s².\n\nWhich of the statements are correct?",
    options: [
      ["1 and 2 only", "Correct: Fe is [Ar] 3d⁶ 4s²; Fe³⁺ is [Ar] 3d⁵ with five unpaired electrons. Fe²⁺ is [Ar] 3d⁶."],
      ["1, 2 and 3", "Statement 3 is wrong: 4s electrons are removed first, so Fe²⁺ is [Ar] 3d⁶."],
      ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."],
      ["1 only", "Statement 2 is also correct: 3d⁵ has one electron in each of the five d orbitals."],
    ],
    answer: "A",
    hints: ["Write Fe first, then remove the 4s electrons."],
    explanation: `Fe: ${shortAr(config(26))}. Fe²⁺: ${shortAr(config(26, 2))}. Fe³⁺: ${shortAr(config(26, 3))}, with ${unpaired(config(26, 3))} unpaired electrons.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about orbitals:\n\n1. The 4s sub-shell fills before the 3d sub-shell.\n2. Two electrons in the same orbital have opposite spins.\n3. The second shell can hold a maximum of eight electrons.\n\nWhich of the statements are correct?",
    options: [
      ["1, 2 and 3", "Correct: all three are true; shell 2 holds 2n² = 8 (2s² 2p⁶)."],
      ["1 and 2 only", "Statement 3 is also true: 2s (2) + 2p (6) = 8."],
      ["2 and 3 only", "Statement 1 is also true: 4s is lower in energy than 3d when it fills, in K and Ca."],
      ["1 only", "Statements 2 and 3 are true as well."],
    ],
    answer: "A",
    explanation: "4s fills before 3d; paired electrons have opposite spins; shell n holds 2n² electrons, so the second shell holds 8.",
  });

  // ---- numerical
  b.num({
    d: 1, skill: "RECALL",
    stem: t`Using $2n^2$, what is the maximum number of electrons in the fourth shell ($n = 4$)?`,
    value: chk(2 * 4 ** 2, 32), wrong: [18, 16],
    explanation: "2n² = 2 × 4² = 32 (4s 2 + 4p 6 + 4d 10 + 4f 14).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many unpaired electrons does a sulfur atom (proton number 16) have in its ground state?",
    value: chk(unpaired(config(16)), 2), wrong: [4, 0],
    explanation: "S is 1s² 2s² 2p⁶ 3s² 3p⁴. In boxes the 3p sub-shell is [↑↓][↑][↑]: two unpaired electrons.",
  });
  {
    const c = config(27, 2);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`How many unpaired electrons are there in a $\ce{Co^2+}$ ion? (Co, proton number 27)`,
      value: chk(unpaired(c), 3), wrong: [1, 7],
      hints: ["Co is [Ar] 3d⁷ 4s²; the 4s electrons go first."],
      explanation: `Co²⁺ is ${shortAr(c)}. Five d orbitals, seven electrons: [↑↓][↑↓][↑][↑][↑], so three unpaired electrons.`,
    });
  }
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`When a titanium atom forms the $\ce{Ti^2+}$ ion, the two electrons are removed from the 3d sub-shell.`,
    answer: false,
    explanation: "False. Ti is [Ar] 3d² 4s²; the 4s electrons are removed first, so Ti²⁺ is [Ar] 3d².",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A chlorine atom is a free radical.",
    answer: true,
    explanation: "True. Cl is [Ne] 3s² 3p⁵: one 3p orbital holds a single unpaired electron, so the atom is a free radical (Cl•).",
  });
  // ---- matching
  {
    const items = [[19, 0, "K"], [24, 0, "Cr"], [30, 2, "Zn²⁺"], [35, -1, "Br⁻"]];
    b.match({
      d: 2, skill: "APPLICATION",
      stem: "Match each species with its electron configuration.",
      pairs: items.map(([Z, q, s]) => [s, Z <= 20 && q >= 0 ? str(config(Z, q)) : shortAr(config(Z, q))]),
      explanation: "K: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹. Cr: [Ar] 3d⁵ 4s¹ (exception). Zn²⁺: [Ar] 3d¹⁰ (4s lost). Br⁻: [Ar] 3d¹⁰ 4s² 4p⁶ (the krypton arrangement).",
    });
  }
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about orbitals.",
    template: "An s orbital is {{blank:a}} in shape. Each p sub-shell has {{blank:b}} orbitals. Electrons in equal-energy orbitals occupy them {{blank:c}} before pairing.",
    blanks: [
      { id: "a", accepted: ["spherical"], choices: ["spherical", "dumbbell-shaped", "flat", "conical"] },
      { id: "b", accepted: ["three"], choices: ["one", "three", "five", "six"] },
      { id: "c", accepted: ["singly"], choices: ["singly", "in pairs", "in threes", "randomly"] },
    ],
    explanation: "s orbitals are spherical; a p sub-shell has three orbitals (px, py, pz); electrons spread out singly with parallel spins before pairing, to reduce repulsion.",
  });
  // ---- short
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Write the full electron configuration of a phosphorus atom (proton number 15), using the format 1s2 2s2 …",
    accepted: [str(config(15)), "1s2 2s2 2p6 3s2 3p3", "1s^2 2s^2 2p^6 3s^2 3p^3", "1s22s22p63s23p3"],
    model: "1s2 2s2 2p6 3s2 3p3",
    wrong: ["1s2 2s2 2p6 3s1 3p4"],
    explanation: `P: ${str(config(15))}. The 3p electrons occupy three orbitals singly.`,
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of orbitals and electron spins, why the ground state of a carbon atom has its two 2p electrons in separate orbitals.",
    points: [
      "The three 2p orbitals have the same energy",
      "Two electrons in the same orbital repel each other (spin-pair repulsion)",
      "So they occupy separate orbitals singly, with parallel spins, which gives a lower energy",
    ],
    modelAnswer: "The three 2p orbitals are of equal energy. If both electrons went into the same orbital they would repel each other strongly. Placing them in separate orbitals, with parallel spins, keeps them apart and gives a lower-energy (ground-state) arrangement.",
    hints: ["Think about repulsion between electrons in the same orbital."],
    explanation: "Equal-energy orbitals fill singly first because paired electrons repel.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Nickel has proton number 28. Give the shorthand configuration of a Ni atom and of the Ni²⁺ ion, state the number of unpaired electrons in Ni²⁺, and explain why the ion is not [Ar] 3d⁶ 4s².",
    points: [
      `Ni: ${shortAr(config(28))}`,
      `Ni²⁺: ${shortAr(config(28, 2))}`,
      `${unpaired(config(28, 2))} unpaired electrons`,
      "The 4s electrons are removed before the 3d electrons (4s is the outer / higher-energy sub-shell once 3d is occupied)",
    ],
    modelAnswer: `Ni is ${shortAr(config(28))} and Ni²⁺ is ${shortAr(config(28, 2))}, which has ${unpaired(config(28, 2))} unpaired electrons ([↑↓][↑↓][↑↓][↑][↑]). The ion is not [Ar] 3d⁶ 4s² because when a transition-metal atom ionises, the 4s electrons are lost first.`,
    hints: ["Write the atom first.", "Draw five d boxes for eight electrons."],
    explanation: "Transition-metal ions lose 4s electrons first; 3d⁸ leaves two unpaired electrons.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Define the term *free radical* and use electrons in boxes to explain why a bromine atom is one.",
    points: [
      "A species with an unpaired electron",
      "Br is [Ar] 3d¹⁰ 4s² 4p⁵: the 4p sub-shell is [↑↓][↑↓][↑], leaving one unpaired electron",
    ],
    modelAnswer: "A free radical is a species with one or more unpaired electrons. Bromine is [Ar] 3d¹⁰ 4s² 4p⁵; in boxes the 4p sub-shell is [↑↓][↑↓][↑], so there is one unpaired electron.",
    hints: ["Five electrons in three p orbitals."],
    explanation: "Five 4p electrons in three orbitals leave one unpaired.",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "This question is about the elements of the first row of the d block and their ions. Use the Periodic Table for proton numbers.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write the shorthand electron configuration of a vanadium atom (V, proton number 23), in the form [Ar] 3dx 4sy.", accepted: ["[Ar] 3d3 4s2", "[Ar]3d34s2", "[Ar] 4s2 3d3", "[Ar] 3d^3 4s^2", "[Ar] 3d³ 4s²"], wrong: ["[Ar] 3d5"], explanation: "23 − 18 = 5 electrons beyond argon: 4s² then 3d³." }),
      P.short({ label: "(b)", marks: 1, stem: "Write the shorthand configuration of the V³⁺ ion.", accepted: ["[Ar] 3d2", "[Ar]3d2", "[Ar] 3d^2", "[Ar] 3d²"], wrong: ["[Ar] 4s2"], explanation: "Remove 4s² first, then one 3d electron: [Ar] 3d²." }),
      P.num({ label: "(c)", marks: 1, stem: "How many unpaired electrons does the Mn²⁺ ion have?", value: chk(unpaired(config(25, 2)), 5), wrong: [3], explanation: "Mn²⁺ is [Ar] 3d⁵: one electron in each of the five 3d orbitals." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which ion has the configuration [Ar] 3d¹⁰?", options: [[t`$\ce{Cu+}$`, "Correct: Cu [Ar] 3d¹⁰ 4s¹ loses its 4s electron."], [t`$\ce{Cu^2+}$`, "Cu²⁺ is [Ar] 3d⁹."], [t`$\ce{Ni^2+}$`, "Ni²⁺ is [Ar] 3d⁸."], [t`$\ce{Fe^3+}$`, "Fe³⁺ is [Ar] 3d⁵."]], answer: "A", explanation: "Cu⁺ and Zn²⁺ both have [Ar] 3d¹⁰." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the configuration of chromium is not [Ar] 3d⁴ 4s².", points: ["The 3d and 4s sub-shells are very close in energy", "[Ar] 3d⁵ 4s¹ (a half-filled 3d sub-shell, six unpaired electrons, less spin-pair repulsion) has the lower energy"], modelAnswer: "Because 3d and 4s are so close in energy, moving one electron from 4s into 3d gives [Ar] 3d⁵ 4s¹, with every electron unpaired in a half-filled 3d sub-shell and no 4s spin-pair repulsion; this arrangement has the lower energy." }),
    ],
    hints: ["Electrons beyond argon = Z − 18.", "Lose 4s before 3d."],
    explanation: `V ${shortAr(config(23))}; V³⁺ ${shortAr(config(23, 3))}; Mn²⁺ ${shortAr(config(25, 2))}; Cu⁺ ${shortAr(config(29, 1))}.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Element E has proton number 16.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write the full electron configuration of E (format 1s2 2s2 …).", accepted: ["1s2 2s2 2p6 3s2 3p4", "1s^2 2s^2 2p^6 3s^2 3p^4", "1s22s22p63s23p4", str(config(16))], wrong: ["1s2 2s2 2p6 3s2 3p6"], explanation: "16 electrons: 1s² 2s² 2p⁶ 3s² 3p⁴." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the electrons-in-boxes diagram of the outer (third) shell of E.", points: ["3s box with two electrons of opposite spin [↑↓]", "3p: one box paired [↑↓] and two boxes singly occupied with parallel spins [↑][↑]"], modelAnswer: "3s: [↑↓]. 3p: [↑↓][↑][↑], the two single electrons with parallel spins." }),
      P.short({ label: "(c)", marks: 1, stem: "Write the full configuration of the ion E²⁻.", accepted: ["1s2 2s2 2p6 3s2 3p6", "1s^2 2s^2 2p^6 3s^2 3p^6", "1s22s22p63s23p6", str(config(16, -2))], wrong: ["1s2 2s2 2p6 3s2 3p2"], explanation: "Two electrons added to 3p: 1s² 2s² 2p⁶ 3s² 3p⁶." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which particle has the same configuration as E²⁻?", options: [[t`$\ce{K+}$`, "Correct: 19 − 1 = 18 electrons, 1s² 2s² 2p⁶ 3s² 3p⁶."], [t`$\ce{Na+}$`, "Na⁺ has 10 electrons."], [t`$\ce{Cl}$`, "A chlorine atom has 17 electrons."], [t`$\ce{Ca}$`, "A calcium atom has 20 electrons (4s²)."]], answer: "A", explanation: "Isoelectronic with argon: S²⁻, Cl⁻, Ar, K⁺, Ca²⁺." }),
      P.manual({ label: "(e)", marks: 1, stem: "Name the shape of the orbitals that make up the 3s and 3p sub-shells.", points: ["3s spherical and 3p dumbbell-shaped (both needed)"], modelAnswer: "The 3s orbital is spherical; each 3p orbital is dumbbell-shaped." }),
    ],
    hints: ["E is sulfur.", "Fill 3p singly before pairing."],
    explanation: "E is sulfur: 1s² 2s² 2p⁶ 3s² 3p⁴, two unpaired 3p electrons; S²⁻ has the argon configuration.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define an **orbital**.", "A region of space around the nucleus where there is a high probability of finding an electron; it holds at most two electrons of opposite spin.");
  b.card("FACT", "Capacities of s, p and d sub-shells?", "s: 1 orbital, 2 electrons. p: 3 orbitals, 6 electrons. d: 5 orbitals, 10 electrons.");
  b.card("FACT", "Filling order of sub-shells up to krypton?", "1s 2s 2p 3s 3p 4s 3d 4p");
  b.card("FACT", "Electron configurations of chromium and copper?", "Cr: [Ar] 3d⁵ 4s¹. Cu: [Ar] 3d¹⁰ 4s¹.");
  b.card("CONCEPT", "Which electrons does a transition metal lose first when it forms an ion?", "The 4s electrons, then 3d. E.g. Fe [Ar] 3d⁶ 4s² → Fe²⁺ [Ar] 3d⁶ → Fe³⁺ [Ar] 3d⁵.");
  b.card("CONCEPT", "Why do electrons occupy equal-energy orbitals singly before pairing?", "Two electrons in one orbital repel (spin-pair repulsion); being in separate orbitals with parallel spins gives lower energy.");
  b.card("FACT", "Shapes of s and p orbitals?", "s: spherical. p: dumbbell-shaped, three per sub-shell at right angles (px, py, pz).");
  b.card("DEFINITION", "Define a **free radical**.", "A species with one or more unpaired electrons, e.g. Cl• or CH₃•.");
  b.card("FORMULA", "Maximum number of electrons in shell n?", t`$2n^2$ (2, 8, 18, 32 for n = 1 to 4).`);
});
