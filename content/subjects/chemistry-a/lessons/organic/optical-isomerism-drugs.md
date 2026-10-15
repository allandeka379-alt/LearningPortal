---
{
  "key": "organic.optical-isomerism-drugs",
  "title": "Optical isomerism and chiral drugs",
  "summary": "Chiral centres and enantiomers; rotation of plane-polarised light; racemic mixtures and why planar intermediates give them; why the two enantiomers of a drug can act differently; separating racemates and using chiral catalysts to make one enantiomer.",
  "concepts": ["achem.organic.optical-isomerism-drugs"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Your left and right hands are mirror images of each other, but however you turn them you cannot lay one exactly on top of the other: a left glove will not fit a right hand. Many molecules are "handed" in the same way. The two forms behave identically in a test tube, yet the body, which is built from handed molecules such as amino acids and sugars, can tell them apart. One form of a drug may treat an illness while its mirror image does nothing, or does something unwanted.

This matters wherever medicines are made or prescribed, from large pharmaceutical plants to the hospital pharmacies in Harare and Bulawayo. In this lesson you will learn to recognise chiral molecules, describe how their isomers differ, and explain why drug makers care which isomer they produce. You need the idea of a chiral centre from the isomerism lesson and the SN1 mechanism (covered with halogenoalkanes).

## Key definitions

:::definition{term="Chiral molecule"}
A molecule that is not superimposable on its mirror image. A molecule with one chiral centre (a carbon bonded to four different groups) is always chiral.
:::

:::definition{term="Enantiomers (optical isomers)"}
A pair of stereoisomers that are non-superimposable mirror images of each other.
:::

:::definition{term="Optically active"}
Able to rotate the plane of plane-polarised light. The two enantiomers rotate it by the same angle in opposite directions.
:::

:::definition{term="Racemic mixture (racemate)"}
An equimolar mixture of two enantiomers. It is optically inactive because the rotations cancel.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: chiral centres, enantiomers, optical activity, racemic mixtures and the relevance to drugs. Cambridge places this in the A Level (Paper 4) content; ZIMSEC teaches it in Form 6. Neither board asks for meso compounds or diastereoisomers.
:::

## Spotting a chiral centre

A carbon atom with four **different** groups is a chiral centre (sometimes marked with an asterisk, C*). Compare whole groups, not just the first atom: in butan-2-ol the groups on C2 are H, OH, CH₃ and CH₂CH₃, which are all different.

![The two enantiomers of lactic acid, CH3CH(OH)COOH: each has a central chiral carbon bonded to COOH, CH3, OH and H; the two molecules are mirror images across a dashed mirror plane, with OH on a wedge and H on a hashed bond, and cannot be superimposed.](media:diagrams/enantiomers-lactic-acid.png "Figure: a chiral carbon with four different groups gives two non-superimposable mirror images")

The four groups point to the corners of a tetrahedron. Arranging them one way gives one enantiomer; its mirror image puts two groups in swapped positions and cannot be turned to match the original. To describe the two forms in words, say: "two tetrahedral arrangements of the same four groups around C*, related as an object and its mirror image".

:::example{title="Example 1: finding chiral centres"}
1. 2-hydroxypropanoic acid (lactic acid), $\ce{CH3CH(OH)COOH}$: C2 carries H, OH, CH₃ and COOH, four different groups, so it is chiral (one chiral centre).
2. 2-aminopropanoic acid (alanine), $\ce{CH3CH(NH2)COOH}$: C2 carries H, NH₂, CH₃ and COOH: one chiral centre. Glycine, $\ce{H2NCH2COOH}$, has two H on its central carbon: no chiral centre.
3. 3-methylpentan-2-ol, $\ce{CH3CH(OH)CH(CH3)CH2CH3}$: C2 carries H, OH, CH₃ and CH(CH₃)CH₂CH₃ (chiral); C3 carries H, CH₃, CH₂CH₃ and CH(OH)CH₃ (chiral). The molecule has **two** chiral centres.
4. Propan-2-ol, $\ce{(CH3)2CHOH}$: two identical CH₃ groups, so no chiral centre.
:::

## How enantiomers differ

| Property | Two enantiomers |
|---|---|
| melting point, boiling point, density, solubility | identical |
| reactions with non-chiral reagents (e.g. NaOH, Na, acidified dichromate) | identical |
| effect on plane-polarised light | equal angle, opposite directions (+ and −) |
| interaction with other chiral molecules (enzymes, receptors) | can differ |

Plane-polarised light vibrates in one plane only. Passing it through a solution of one enantiomer turns the plane clockwise (+) or anticlockwise (−); a polarimeter measures the angle. A racemic mixture gives no overall rotation.

## Why some reactions give racemic mixtures

When a reaction passes through a **planar** intermediate, the attacking group can approach from either face with equal probability.

:::example{title="Example 2: SN1 hydrolysis of a chiral halogenoalkane"}
Start with one pure enantiomer of 3-bromo-3-methylhexane, $\ce{CH3CH2C(CH3)BrCH2CH2CH3}$ (chiral: CH₃, C₂H₅, C₃H₇ and Br on C3).

1. Slow step: the C–Br bond breaks heterolytically, giving $\ce{Br-}$ and a tertiary carbocation.
2. The carbocation carbon is sp² hybridised and **trigonal planar**; the information about which side Br was on is lost.
3. Fast step: $\ce{OH-}$ attacks the planar carbocation from above or below with equal probability.
4. Attack from one face gives one enantiomer of 3-methylhexan-3-ol, from the other face the other enantiomer, in a 50 : 50 ratio.
5. The product is a racemic mixture and is optically inactive, even though the starting material was optically active.
:::

The same happens in nucleophilic addition of HCN to an aldehyde such as ethanal: the C=O carbon is planar, $\ce{CN-}$ attacks either face equally, and 2-hydroxypropanenitrile forms as a racemate. In contrast, the one-step SN2 mechanism inverts the configuration of a chiral centre, so an optically active reactant gives a single optically active product.

## Chirality and drugs

Drugs act by binding to receptors and enzymes, which are themselves chiral. A good fit needs the right three-dimensional arrangement, so the two enantiomers of a chiral drug may:

- both be active;
- differ in strength (one enantiomer is often much more active);
- have different effects, one of them harmful. The best-known case is thalidomide, prescribed in the late 1950s, where one enantiomer is linked to serious birth defects; it also interconverts in the body, so even a single enantiomer would not have been safe.

Making a chiral drug in an ordinary laboratory reaction usually gives a racemic mixture, so half the product may be inactive or worse. Chemists therefore:

1. **separate** (resolve) the racemate, for example by reacting it with a single enantiomer of another chiral compound to form products with different physical properties, then recovering each enantiomer;
2. use **chiral catalysts** (or enzymes) that produce mainly one enantiomer;
3. start from naturally occurring single enantiomers (such as amino acids or sugars).

Producing a single enantiomer can mean a smaller dose, fewer side effects, and less wasted material, but separation and chiral synthesis add cost and steps.

## Common mistakes

:::mistake{title="Checking only the first atom of each group"}
CH₂CH₃ and CH₂CH₂CH₃ both start with CH₂, but they are different groups. Follow each chain until the groups differ or are proven identical.
:::

:::mistake{title="Saying enantiomers have different chemical properties"}
They react identically with non-chiral reagents; they differ only in optical rotation and in reactions with other chiral molecules.
:::

:::mistake{title="Calling a racemic mixture a pure compound"}
A racemate is a 50 : 50 mixture of two enantiomers; it is optically inactive because the rotations cancel, not because the molecules are achiral.
:::

:::mistake{title="Forgetting the planar intermediate"}
To explain racemisation you must say the intermediate is planar and is attacked equally from both sides.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
Cambridge Paper 4 and ZIMSEC Papers 2 and 3 ask you to *identify chiral centres* in a given formula (mark each with an asterisk), *describe* how optical isomers differ and *explain* why a product is optically inactive. Expect drug contexts in "suggest" questions.
:::

:::exam-tip{title="Describe the isomers"}
Without a drawing, write: "two tetrahedral arrangements around the chiral carbon that are mirror images and cannot be superimposed". Mention the four groups by name.
:::

:::exam-tip{title="Suggest advantages of a single-enantiomer drug"}
Typical creditworthy points: the other enantiomer may be inactive or harmful; a smaller dose; fewer side effects; less waste. Disadvantages: extra separation or a costly chiral catalyst.
:::

## Summary

:::summary
- A carbon with four different groups is a chiral centre; a molecule with one chiral centre has two enantiomers.
- Enantiomers are non-superimposable mirror images with identical physical and chemical properties except the direction of rotation of plane-polarised light and interactions with chiral molecules.
- A racemic mixture (50 : 50) is optically inactive.
- Reactions through planar intermediates (SN1 carbocations, nucleophilic addition to C=O) give racemic mixtures.
- Drug enantiomers can differ in activity; single enantiomers are obtained by resolution, chiral catalysts or natural chiral starting materials.
:::
