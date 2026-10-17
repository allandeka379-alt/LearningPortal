---
{
  "key": "hydrocarbons.free-radical-substitution",
  "title": "Free-radical substitution of alkanes",
  "summary": "The reaction of alkanes with chlorine or bromine in ultraviolet light; the mechanism by homolytic fission with initiation, propagation and termination steps; why a mixture of products forms; predicting products and counting monosubstituted isomers.",
  "concepts": ["achem.hydrocarbons.free-radical-substitution"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Alkanes ignore acids, alkalis and most oxidising agents, yet a mixture of methane and chlorine left in sunlight reacts, sometimes explosively. The trigger is ultraviolet light, which splits chlorine molecules into highly reactive atoms with unpaired electrons. Those radicals then set off a chain reaction. The same kind of chemistry, driven by sunlight, happens high in the atmosphere when chlorine radicals from CFCs destroy ozone (covered with halogen compounds).

Free-radical substitution is the first mechanism you meet in detail, and it shows clearly why organic reactions often give mixtures. You should already know homolytic fission, what a free radical is, and why alkanes are unreactive.

## Key definitions

:::definition{term="Free-radical substitution"}
A reaction in which a hydrogen atom of an alkane is replaced by a halogen atom, by a chain mechanism involving free radicals.
:::

:::definition{term="Initiation"}
The step that produces free radicals from a molecule, here by homolytic fission of the halogen in ultraviolet light.
:::

:::definition{term="Propagation"}
Steps in which a radical reacts with a molecule to form a product and a new radical, so the chain continues.
:::

:::definition{term="Termination"}
Steps in which two radicals combine to form a molecule, removing radicals and ending a chain.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the reaction of methane or ethane with chlorine or bromine in ultraviolet light, the three stages with equations (radicals shown with a dot), and why mixtures form.
:::

## Conditions and overall reaction

| Alkane | Reagent | Condition | Main monosubstituted product |
|---|---|---|---|
| methane | $\ce{Cl2}$ | ultraviolet light (or sunlight), room temperature | chloromethane $\ce{CH3Cl}$ + HCl |
| ethane | $\ce{Br2}$ | ultraviolet light | bromoethane $\ce{CH3CH2Br}$ + HBr |

In the dark at room temperature there is no reaction. Bromine reacts more slowly and more selectively than chlorine, and its orange-brown colour fades as the reaction proceeds.

## The mechanism: methane and chlorine

![Free-radical substitution of methane by chlorine: UV light splits Cl2 into two chlorine radicals (initiation); in propagation Cl radical plus CH4 gives HCl and a methyl radical, and the methyl radical plus Cl2 gives CH3Cl and a new Cl radical, so the chain repeats; termination steps, Cl with Cl, CH3 with Cl or CH3 with CH3, remove two radicals and leave none.](media:diagrams/free-radical-chain-methane-chlorine.png "Figure: the radical chain mechanism for CH₄ + Cl₂, showing the propagation cycle")

:::example{title="Example 1: the three stages"}
**Initiation.** Ultraviolet light provides the energy to break the Cl–Cl bond (the weakest bond present) homolytically:

$$\ce{Cl2 -> 2Cl^.}$$

**Propagation.** A chlorine radical removes a hydrogen atom from methane, then the methyl radical removes a chlorine atom from a chlorine molecule:

$$\ce{Cl^. + CH4 -> HCl + CH3^.}$$

$$\ce{CH3^. + Cl2 -> CH3Cl + Cl^.}$$

The chlorine radical produced in the second step starts the cycle again, so one initiation can lead to thousands of product molecules: a **chain reaction**. Adding the two propagation steps gives the overall equation $\ce{CH4 + Cl2 -> CH3Cl + HCl}$.

**Termination.** Whenever two radicals meet, they pair their electrons and form a molecule:

$$\ce{Cl^. + Cl^. -> Cl2}$$

$$\ce{CH3^. + Cl^. -> CH3Cl}$$

$$\ce{CH3^. + CH3^. -> C2H6}$$
:::

Each propagation step has one radical on each side; each termination step has two radicals on the left and none on the right. That pattern lets you identify the stage of any given equation.

## Why a mixture forms

Free-radical substitution is hard to control:

1. **Further substitution.** Chloromethane still has C–H bonds, so a chlorine radical can attack it: $\ce{Cl^. + CH3Cl -> HCl + CH2Cl^.}$, then $\ce{CH2Cl^. + Cl2 -> CH2Cl2 + Cl^.}$. Dichloromethane, trichloromethane and tetrachloromethane all form. Using a large excess of methane makes monosubstitution more likely.
2. **Termination products.** Two methyl radicals give ethane; with ethane and bromine, two ethyl radicals give **butane**: $\ce{2C2H5^. -> C4H10}$. These products contain more carbon atoms than the starting alkane, which is good evidence for a radical mechanism.
3. **Different hydrogens.** In larger alkanes, the radical can remove different types of hydrogen, giving positional isomers.

## Predicting monosubstituted isomers

To count the possible monosubstituted products, count the different **environments** of hydrogen atoms, that is, sets of hydrogens that are not related by the molecule's symmetry.

:::example{title="Example 2: monochlorination of 2-methylbutane"}
2-methylbutane is $\ce{(CH3)2CHCH2CH3}$. Label the carbons: C1 and the branch methyl (both CH₃ attached to C2), C2 (CH), C3 (CH₂), C4 (CH₃).

1. The two CH₃ groups on C2 are equivalent: substitution there gives 1-chloro-2-methylbutane.
2. The H on C2: 2-chloro-2-methylbutane.
3. The H atoms on C3: 2-chloro-3-methylbutane (numbered from the end nearer Cl and branch).
4. The H atoms on C4: 1-chloro-3-methylbutane.
5. There are **four** structural isomers of formula $\ce{C5H11Cl}$ from this alkane.
:::

Contrast 2,2-dimethylpropane, $\ce{C(CH3)4}$: all twelve hydrogens are equivalent, so only one monochloro product, 1-chloro-2,2-dimethylpropane, can form. Questions often use such highly symmetrical alkanes.

## Common mistakes

:::mistake{title="Forming H radicals"}
The propagation step is $\ce{Cl^. + CH4 -> HCl + CH3^.}$, not $\ce{CH4 -> CH3^. + H^.}$ or $\ce{Cl^. + CH4 -> CH3Cl + H^.}$. A C–H bond is not broken on its own by the light.
:::

:::mistake{title="Missing dots"}
Every radical must carry a dot (the unpaired electron). $\ce{CH3}$ without a dot is not a species you can write on its own.
:::

:::mistake{title="Calling termination products impurities only"}
Ethane from methane chlorination (or butane from ethane bromination) is evidence for the mechanism; explain it as two radicals combining.
:::

:::mistake{title="Counting equivalent hydrogens twice"}
In propane the six CH₃ hydrogens are equivalent; propane gives only two monochloro isomers (1-chloro- and 2-chloropropane).
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2. *State the conditions* (ultraviolet light). *Describe the mechanism*: name each stage and write an equation for it, with dots on radicals; one mark per correct equation is typical.
:::

:::exam-tip{title="Suggest questions"}
*Suggest* why a product with more carbons appears, or why a mixture forms: link each to termination or further substitution. *Suggest how to favour the monosubstituted product*: an excess of the alkane.
:::

:::exam-tip{title="Identify the step"}
Count radicals: zero on the left (initiation), one on each side (propagation), two on the left and none on the right (termination).
:::

## Summary

:::summary
- Alkanes react with Cl₂ or Br₂ only in ultraviolet light, by free-radical substitution.
- Initiation: X₂ → 2X• (homolytic fission). Propagation: X• + RH → HX + R•, then R• + X₂ → RX + X• (chain reaction).
- Termination: any two radicals combine (X₂, RX, or R–R such as ethane or butane).
- Further substitution and termination give mixtures; excess alkane favours monosubstitution.
- Count monosubstituted isomers from the number of different hydrogen environments.
:::
