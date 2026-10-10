---
{
  "key": "mammal-transport.gas-transport",
  "title": "Transport of oxygen and carbon dioxide in the blood",
  "summary": "How haemoglobin in red blood cells loads oxygen in the lungs and unloads it in respiring tissues, why the oxygen dissociation curve is S-shaped, how the Bohr shift helps unloading, how carbon dioxide is carried as hydrogencarbonate ions, carbaminohaemoglobin and in solution with the chloride shift, and how fetal haemoglobin and myoglobin differ from adult haemoglobin.",
  "concepts": ["abio.mammal-transport.gas-transport"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

An athlete who trains in Harare, about 1,500 metres above sea level, breathes air with a lower partial pressure of oxygen than air at the coast, yet her muscles still receive enough oxygen to run a marathon. The reason lies in the remarkable shape of one protein: **haemoglobin**. It loads oxygen almost fully in the lungs even when the partial pressure there falls a little, and releases it readily in muscles, releasing even more when the muscles are working hard.

Each red blood cell carries roughly 280 million haemoglobin molecules. You should already know the quaternary structure of haemoglobin (two α and two β chains, each with a haem group containing iron), the structure of red blood cells, and diffusion.

## Key definitions

:::definition{term="Partial pressure"}
The pressure exerted by one gas in a mixture; it measures how much of that gas is present (oxygen partial pressure, pO₂, is given in kPa).
:::

:::definition{term="Percentage saturation"}
The amount of oxygen bound to haemoglobin as a percentage of the maximum it can carry.
:::

:::definition{term="Oxygen dissociation curve"}
A graph of the percentage saturation of haemoglobin with oxygen against the partial pressure of oxygen.
:::

:::definition{term="Bohr shift"}
The movement of the oxygen dissociation curve to the right at higher partial pressures of carbon dioxide, so haemoglobin releases oxygen more readily.
:::

:::definition{term="Chloride shift"}
The movement of chloride ions from the plasma into red blood cells to balance the hydrogencarbonate ions diffusing out, keeping the cells electrically neutral.
:::

## Oxygen transport and the dissociation curve

Each haemoglobin molecule has **four haem groups** and can carry up to **four oxygen molecules**. Oxygen combines reversibly with haemoglobin to form **oxyhaemoglobin**:

$$
\ce{Hb + 4O2 <=> HbO8}
$$

Fully saturated blood carries about 20 cm³ of oxygen per 100 cm³ of blood. Very little oxygen is carried dissolved in plasma.

The dissociation curve of adult haemoglobin is **S-shaped (sigmoid)** because of **cooperative binding**:

1. At low pO₂, the first oxygen molecule binds with difficulty, because the haem groups are buried inside the molecule.
2. Binding of the first oxygen **changes the shape** (tertiary and quaternary structure) of haemoglobin, making it easier for the second and third molecules to bind. The curve becomes steep.
3. Once three are bound, it is harder for the fourth to find a free site, so the curve levels off near 100% saturation.

**Why the shape matters:**

- In the **lungs** (pO₂ about 12-13 kPa) the curve is on its flat top: haemoglobin is almost fully saturated, and a small fall in pO₂ hardly affects loading.
- In **respiring tissues** (pO₂ about 2-5 kPa) the curve is steep: a small fall in pO₂ causes a large release of oxygen, so more is released exactly where respiration is fastest.

## The Bohr shift (Bohr effect)

Actively respiring tissues produce more carbon dioxide. At a higher partial pressure of CO₂, haemoglobin has a **lower affinity** for oxygen, so the dissociation curve moves to the **right**.

1. CO₂ diffuses into red blood cells and forms carbonic acid, which dissociates, releasing **hydrogen ions**.
2. Hydrogen ions bind to haemoglobin (forming haemoglobinic acid), changing its shape so that it releases oxygen.
3. So at the same pO₂, haemoglobin is less saturated: **more oxygen is unloaded** in active tissues.
4. In the lungs, where CO₂ is removed, the curve shifts back to the left and loading is helped.

:::worked-solution[How much oxygen is unloaded, with and without the Bohr shift]
The table gives typical percentage saturations of adult haemoglobin at two partial pressures of carbon dioxide. Fully saturated blood carries 20 cm³ O₂ per 100 cm³ blood.

| Partial pressure of oxygen / kPa | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|
| Saturation, low CO₂ / % | 10 | 30 | 45 | 60 | 72 | 80 | 90 | 95 | 97 | 98 |
| Saturation, high CO₂ / % | 5 | 18 | 32 | 45 | 58 | 68 | 82 | 91 | 95 | 97 |

Blood leaves the lungs (12 kPa, low CO₂) 97% saturated and reaches a muscle at 4 kPa.
1. Without a shift (low CO₂ curve), saturation at 4 kPa = 60%. Oxygen released $= (97 - 60)\% \times 20 = 7.4\ \text{cm}^3$ per 100 cm³ blood.
2. In the active muscle (high CO₂ curve), saturation at 4 kPa = 45%. Oxygen released $= (97 - 45)\% \times 20 = 10.4\ \text{cm}^3$ per 100 cm³ blood.
3. The Bohr shift increases the oxygen delivered by $\dfrac{10.4 - 7.4}{7.4} \times 100 = 40.5\%$.
:::

## Carbon dioxide transport

Carbon dioxide is carried in three ways. Typical textbook proportions are given as "about", as sources differ.

1. **As hydrogencarbonate ions (about 85%).** In red blood cells the enzyme **carbonic anhydrase** catalyses the reaction of CO₂ with water to form carbonic acid, which dissociates:

$$
\ce{CO2 + H2O <=> H2CO3 <=> H+ + HCO3-}
$$

   The **hydrogencarbonate ions** diffuse out into the plasma, where they are carried in solution. **Chloride ions** diffuse in to replace them (the **chloride shift**), keeping the charge balanced. The **hydrogen ions** are picked up by haemoglobin, forming **haemoglobinic acid** (HHb); this buffers the blood and also causes oxygen release (the Bohr shift).
2. **As carbaminohaemoglobin (about 5-10%).** CO₂ combines with the amino groups of the globin chains (not with the haem).
3. **Dissolved in plasma (about 5%).**

In the lungs all these reactions reverse: hydrogencarbonate ions return to the red cells, combine with H⁺ to form carbonic acid, and carbonic anhydrase releases CO₂, which diffuses into the alveoli.

## Fetal haemoglobin and myoglobin

| Pigment | Position of curve | Why it matters |
|---|---|---|
| Adult haemoglobin | Reference S-shaped curve | Loads in lungs, unloads in tissues |
| Fetal haemoglobin | To the **left** of adult haemoglobin (higher affinity at the same pO₂) | In the placenta, fetal blood takes oxygen from the mother's haemoglobin, which is unloading at the low pO₂ there |
| Myoglobin (muscle) | Far to the **left**, hyperbolic, not S-shaped; one haem group only | Stays saturated at moderate pO₂ and releases oxygen only when pO₂ in the muscle is very low, as a store for intense exercise |

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: oxygen carriage by haemoglobin, the dissociation curve and its importance, the Bohr shift (Bohr effect), carbonic anhydrase, hydrogencarbonate ions, haemoglobinic acid, carbaminohaemoglobin and the chloride shift. Fetal haemoglobin and myoglobin curves are ZIMSEC detail and a useful extension for Cambridge.
:::

:::example{title="Interpreting curves at altitude and in a fetus"}
A pregnant woman's blood in the placenta is at a pO₂ of about 4 kPa. **Explain** why fetal blood can gain oxygen there: at 4 kPa fetal haemoglobin, with its curve to the left, is more saturated than maternal haemoglobin, so oxygen diffuses from maternal oxyhaemoglobin across the placenta and binds to fetal haemoglobin.
:::

## Common mistakes

:::mistake{title="Saying the Bohr shift moves the curve to the left"}
More CO₂ moves the curve **right**: lower affinity, more unloading.
:::

:::mistake{title="Saying CO₂ binds to the haem group"}
CO₂ binds to the **amino groups of the globin** (carbaminohaemoglobin). Carbon **monoxide** binds to haem.
:::

:::mistake{title="Saying the chloride shift moves hydrogencarbonate"}
The chloride shift is the movement of **chloride ions into** red cells to balance HCO₃⁻ leaving.
:::

:::mistake{title="Reading saturation at the wrong pressure"}
Read the curve at the stated pO₂ and subtract saturations before multiplying by the oxygen capacity.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 2 and Cambridge Paper 2, *explain* the S shape with "first oxygen binds → shape changes → easier binding of further oxygen (cooperative binding)". *Explain* the importance with the steep part matching tissue pO₂ and the plateau matching lung pO₂.
:::

:::exam-tip
Data questions give curves as tables. *Calculate* oxygen released = difference in saturation × capacity, and quote readings with units. For CO₂ transport, write the equation and name carbonic anhydrase, haemoglobinic acid and the chloride shift.
:::

## Summary

:::summary
- Haemoglobin carries up to four O₂ molecules; cooperative binding gives an S-shaped dissociation curve.
- The plateau gives near-full loading in the lungs; the steep part gives large unloading in respiring tissues.
- Bohr shift: more CO₂ → H⁺ binds Hb → curve moves right → more O₂ released in active tissues.
- CO₂ travels mainly as HCO₃⁻ (carbonic anhydrase, chloride shift, haemoglobinic acid), also as carbaminohaemoglobin and dissolved.
- Fetal haemoglobin and myoglobin curves lie to the left of adult haemoglobin: higher affinity.
:::
