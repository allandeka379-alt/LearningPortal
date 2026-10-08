---
{
  "key": "atoms.isotopes",
  "title": "Isotopes",
  "summary": "Isotopes as atoms of the same element with different numbers of neutrons; their symbols; why they react in the same way; and (Supplement) calculating relative atomic mass from isotope masses and abundances.",
  "concepts": ["chem.atoms.isotopes"],
  "objectives": [
    "zimsec/o-level/chemistry:7.1.3.3",
    "zimsec/o-level/chemistry:7.1.3.5",
    "cambridge/igcse/chemistry:2.3.1",
    "cambridge/igcse/chemistry:2.3.2",
    "cambridge/igcse/chemistry:2.3.3",
    "cambridge/igcse/chemistry:2.3.4"
  ],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

Not every atom of an element is identical. Most carbon atoms have 6 neutrons, but about one in a hundred has 7, and a tiny fraction have 8. Archaeologists have measured the rare carbon atoms with 8 neutrons (carbon-14) in charcoal from Great Zimbabwe to work out when the site was occupied.

Atoms like these, of the same element but with different masses, are called **isotopes**. In this lesson you will define isotopes, write their symbols, explain why they react in the same way and (Supplement) use them to calculate the relative atomic mass of an element.

You should already know how to find the numbers of protons, neutrons and electrons from a nuclide symbol.

## Key definitions

:::definition{term="Isotopes"}
Atoms of the same element that have the same number of protons but different numbers of neutrons.
:::

:::definition{term="Relative atomic mass, $A_r$"}
The average mass of the isotopes of an element, taking their abundances into account, compared with one-twelfth of the mass of an atom of carbon-12.
:::

## Isotopes and their symbols

Isotopes of an element have the same **proton number** but different **mass numbers**. They are named by the element and the mass number (chlorine-37) or written as nuclide symbols ($\ce{^{37}_{17}Cl}$).

| Isotope | Symbol | Protons | Neutrons | Electrons |
| --- | --- | --- | --- | --- |
| Hydrogen-1 | $\ce{^{1}_{1}H}$ | 1 | 0 | 1 |
| Hydrogen-2 (deuterium) | $\ce{^{2}_{1}H}$ | 1 | 1 | 1 |
| Carbon-12 | $\ce{^{12}_{6}C}$ | 6 | 6 | 6 |
| Carbon-14 | $\ce{^{14}_{6}C}$ | 6 | 8 | 6 |
| Chlorine-35 | $\ce{^{35}_{17}Cl}$ | 17 | 18 | 17 |
| Chlorine-37 | $\ce{^{37}_{17}Cl}$ | 17 | 20 | 17 |

:::example{title="Spotting isotopes"}
$\ce{^{14}_{6}C}$ and $\ce{^{14}_{7}N}$ have the same mass number, but they are **not** isotopes: they have different proton numbers, so they are different elements. $\ce{^{12}_{6}C}$ and $\ce{^{14}_{6}C}$ **are** isotopes: same proton number, different numbers of neutrons.
:::

## Why isotopes react in the same way (Supplement)

Chemical reactions involve **electrons**, not the nucleus. Isotopes of an element have the same number of protons, so their atoms have the same number of electrons and the **same electronic configuration**. They therefore have the same chemical properties: chlorine-35 and chlorine-37 both react with sodium to make sodium chloride, in exactly the same way.

Isotopes differ only in mass, so some physical properties, such as density, are very slightly different.

## Calculating relative atomic mass (Supplement)

The relative atomic mass of an element is a **weighted average** of the masses of its isotopes: each isotope counts in proportion to how common it is.

:::formula{name="Relative atomic mass from abundances"}
$$
A_r = \frac{(\text{mass}_1 \times \%_1) + (\text{mass}_2 \times \%_2) + \ldots}{100}
$$
:::

:::worked-solution[Example 1: chlorine, 75% chlorine-35 and 25% chlorine-37]
1. Multiply each mass by its percentage: $35 \times 75 = 2625$ and $37 \times 25 = 925$.
2. Add: $2625 + 925 = 3550$.
3. Divide by 100: $A_r = \dfrac{3550}{100} = 35.5$.
4. Check: 35.5 lies between 35 and 37, nearer 35, because chlorine-35 is the more common isotope.
:::

:::worked-solution[Example 2: magnesium, three isotopes]
A sample of magnesium contains 79.0% magnesium-24, 10.0% magnesium-25 and 11.0% magnesium-26. Calculate $A_r$ to one decimal place.
1. $24 \times 79.0 = 1896$
2. $25 \times 10.0 = 250$
3. $26 \times 11.0 = 286$
4. Total $= 1896 + 250 + 286 = 2432$.
5. $A_r = \dfrac{2432}{100} = 24.32$, which is $24.3$ to one decimal place.
:::

Exam questions sometimes reverse the calculation: you are given $A_r$ and asked for the abundances.

:::worked-solution[Example 3: finding an abundance from $A_r$]
Element Q has two isotopes, Q-85 and Q-87, and $A_r = 85.5$. Find the percentage of Q-85.
1. Let the percentage of Q-85 be $x$. The percentage of Q-87 is then $100 - x$.
2. Write the weighted average: $\dfrac{85x + 87(100 - x)}{100} = 85.5$.
3. Multiply both sides by 100: $85x + 8700 - 87x = 8550$.
4. Simplify: $-2x = -150$, so $x = 75$. Q is 75% Q-85 and 25% Q-87.
5. Check: $\dfrac{(85 \times 75) + (87 \times 25)}{100} = \dfrac{6375 + 2175}{100} = 85.5$.
:::

:::note{title="Why $A_r$ is not a whole number"}
No single chlorine atom has a mass of 35.5. The value is an average over very large numbers of atoms of two isotopes, so it is usually not a whole number.
:::

## Common mistakes

:::mistake{title="Saying isotopes have different numbers of protons"}
If the number of protons changed, the atom would be a different element. Isotopes differ only in their numbers of **neutrons**.
:::

:::mistake{title="Taking a simple average"}
For chlorine, $(35 + 37) \div 2 = 36$ is wrong, because the two isotopes are not equally common. Always weight each mass by its abundance.
:::

:::mistake{title="Forgetting to divide by 100"}
With percentages, the products add up to about 100 times the answer. A relative atomic mass of 3550 for chlorine should warn you to divide by 100.
:::

## Exam tips

:::exam-tip
A full definition of isotopes mentions **the same element** (or the same number of protons) **and** different numbers of neutrons. "Different mass" alone is not enough.
:::

:::exam-tip
In $A_r$ calculations, show the products, the total and the division. Then check that your answer lies between the smallest and largest isotope masses. With two isotopes, it must be nearer the mass of the more abundant one.
:::

## Summary

:::summary
- Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons.
- Isotopes have different mass numbers, for example $\ce{^{35}_{17}Cl}$ and $\ce{^{37}_{17}Cl}$.
- Supplement: isotopes have the same number of electrons and the same electronic configuration, so they have the same chemical properties.
- Supplement: $A_r$ is the weighted average of the isotope masses: multiply each mass by its percentage, add, and divide by 100.
- $A_r$ lies between the smallest and largest isotope masses; with two isotopes it is nearer the more abundant one.
:::
