---
{
  "key": "redox.redox-equations",
  "title": "Half-equations and redox equations",
  "summary": "Write ionic half-equations that balance both atoms and charge, combine two half-equations into a balanced redox equation, and use them for displacement reactions and for the reactions at electrodes.",
  "concepts": ["chem.redox.redox-equations"],
  "objectives": ["cambridge/igcse/chemistry:6.4.8", "zimsec/o-level/chemistry:7.1.8.9"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

When scrap iron is dropped into a solution of copper(II) sulfate, the iron slowly disappears and copper metal appears in its place. Miners have used this kind of **displacement reaction** to recover copper from dilute solutions. At the same time, in every car battery and every electrolysis cell, electrons are being passed from one substance to another.

To describe these reactions precisely, chemists split them into two **half-equations**: one shows the electrons being lost (oxidation) and the other shows the electrons being gained (reduction). Added together, they give the balanced **redox equation**.

You should already know OIL RIG (oxidation is loss of electrons, reduction is gain), the charges on common ions and how to write an ionic equation.

:::note{title="Syllabus coverage"}
Writing and combining half-equations is **Cambridge IGCSE Supplement** content (it is used in electrolysis too). ZIMSEC Form 4 asks you to construct balanced redox equations for displacement reactions and electrode reactions.
:::

## Key definitions

:::definition{term="Half-equation"}
An equation that shows **either** the oxidation **or** the reduction part of a redox reaction, with the electrons written in, for example $\ce{Zn -> Zn^2+ + 2e-}$.
:::

:::definition{term="Ionic equation"}
An equation that shows only the particles that take part in a reaction. Ions that do not change are left out.
:::

:::definition{term="Spectator ion"}
An ion that is present in the reaction mixture but does not take part in the reaction. It appears unchanged on both sides of the full equation.
:::

:::keyfact{title="A balanced equation balances twice"}
In any half-equation or ionic equation, the **atoms** of each element and the **total charge** must be the same on both sides.
:::

## Writing a half-equation

Follow three steps:

1. Write the particle that changes and what it becomes.
2. Balance the **atoms**.
3. Add electrons, $\ce{e-}$, to the side with the **more positive** total charge until the charges are equal.

Electrons on the **left** (gained) means reduction. Electrons on the **right** (lost) means oxidation.

:::worked-solution[Example 1: two electrode half-equations]
**Bromide ions forming bromine at an anode**

1. $\ce{Br- -> Br2}$
2. Balance the atoms: $\ce{2Br- -> Br2}$. Now the left has a total charge of $-2$; the right has $0$.
3. Add two electrons to the right: $\ce{2Br- -> Br2 + 2e-}$. Both sides are now $-2$. Electrons are lost: **oxidation**.

**Aluminium ions forming aluminium at a cathode**

1. $\ce{Al^3+ -> Al}$ (the atoms already balance).
2. The left is $+3$, the right is $0$: add three electrons to the left.
3. $\ce{Al^3+ + 3e- -> Al}$. Electrons are gained: **reduction**.
:::

## Combining half-equations

Electrons cannot be left over: every electron lost by the reducing agent is gained by the oxidising agent. So:

1. Write both half-equations.
2. Multiply one or both so that they contain the **same number of electrons**.
3. Add them and cancel the electrons.
4. Check atoms and charge.

:::worked-solution[Example 2: aluminium foil in copper(II) chloride solution]
1. Oxidation: $\ce{Al -> Al^3+ + 3e-}$. Reduction: $\ce{Cu^2+ + 2e- -> Cu}$.
2. The lowest common multiple of 3 and 2 is 6: multiply the first by 2 and the second by 3.
3. $\ce{2Al -> 2Al^3+ + 6e-}$ and $\ce{3Cu^2+ + 6e- -> 3Cu}$.
4. Add and cancel the $\ce{6e-}$: $\ce{2Al + 3Cu^2+ -> 2Al^3+ + 3Cu}$.
5. Check: 2 Al and 3 Cu on each side; charge $3 \times (+2) = +6$ on the left and $2 \times (+3) = +6$ on the right.
:::

## Splitting a redox equation into half-equations

You can also work backwards. Find the particles whose charge or oxidation number changes.

:::worked-solution[Example 3: iron(III) ions oxidise iodide ions]
Overall: $\ce{2Fe^3+ + 2I- -> 2Fe^2+ + I2}$

1. Iron changes from $+3$ to $+2$: $\ce{Fe^3+ + e- -> Fe^2+}$ (reduction). Two iron(III) ions take two electrons.
2. Iodine changes from $-1$ to $0$: $\ce{2I- -> I2 + 2e-}$ (oxidation).
3. Iron(III) ions are the oxidising agent; iodide ions are the reducing agent.
:::

## From a full equation to an ionic equation

When zinc powder is added to copper(II) sulfate solution:

$$
\ce{Zn(s) + CuSO4(aq) -> ZnSO4(aq) + Cu(s)}
$$

Split the **aqueous** ionic compounds into ions: $\ce{Cu^2+(aq)}$ and $\ce{SO4^2-(aq)}$ on the left, $\ce{Zn^2+(aq)}$ and $\ce{SO4^2-(aq)}$ on the right. The sulfate ions are unchanged, so they are spectator ions. Removing them gives:

$$
\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}
$$

Solids, liquids, gases and covalent molecules (such as $\ce{Cl2}$, $\ce{Br2}$ and $\ce{H2O}$) are never split into ions.

## Half-equations at electrodes

Reduction always happens at the **cathode** and oxidation at the **anode**. These are the ones you will use most often:

| At the cathode (reduction) | At the anode (oxidation) |
| --- | --- |
| $\ce{Cu^2+ + 2e- -> Cu}$ | $\ce{2Cl- -> Cl2 + 2e-}$ |
| $\ce{2H+ + 2e- -> H2}$ | $\ce{4OH- -> O2 + 2H2O + 4e-}$ |
| $\ce{Pb^2+ + 2e- -> Pb}$ | $\ce{Cu -> Cu^2+ + 2e-}$ (copper anode) |
| $\ce{Na+ + e- -> Na}$ (molten salts) | $\ce{2O^2- -> O2 + 4e-}$ (molten oxides) |

The oxygen half-equation is also correct written as $\ce{2H2O -> O2 + 4H+ + 4e-}$.

## Common mistakes

:::mistake{title="Balancing charge by changing an ion"}
Never change $\ce{Cu^2+}$ to $\ce{Cu+}$ to make the numbers work. Balance charge only by adding electrons.
:::

:::mistake{title="Electrons left in the overall equation"}
If electrons appear in your final redox equation, you have not multiplied the half-equations correctly. The electrons lost must equal the electrons gained.
:::

:::mistake{title="Writing Cl or Br on its own"}
Halogens are diatomic: write $\ce{2Cl- -> Cl2 + 2e-}$, not $\ce{Cl- -> Cl + e-}$.
:::

:::mistake{title="Splitting molecules or solids into ions"}
$\ce{Cl2(aq)}$, $\ce{I2}$, $\ce{Cu(s)}$ and $\ce{H2O(l)}$ are not ionic solutions; they stay as they are in an ionic equation.
:::

## Exam tips

:::exam-tip
Do a quick **charge audit** before you move on: add up the charges on each side, counting each electron as $-1$. If the totals differ, the equation is wrong.
:::

:::exam-tip
"Construct the ionic half-equation for the reaction at the anode" wants electrons written as a **product** (oxidation), for example $\ce{2Cl- -> Cl2 + 2e-}$.
:::

:::exam-tip
Add state symbols when the question asks for them, or when the equation is an ionic equation for a reaction in solution: $\ce{(s)}$, $\ce{(l)}$, $\ce{(g)}$, $\ce{(aq)}$.
:::

## Summary

:::summary
- A half-equation shows the oxidation or the reduction part of a redox reaction, with electrons included.
- Balance atoms first, then add electrons to balance the total charge.
- Electrons on the right: oxidation (at the anode). Electrons on the left: reduction (at the cathode).
- To combine half-equations, make the electrons equal, add, and cancel the electrons.
- Spectator ions are left out of ionic equations; solids, liquids, gases and molecules are never split into ions.
:::
