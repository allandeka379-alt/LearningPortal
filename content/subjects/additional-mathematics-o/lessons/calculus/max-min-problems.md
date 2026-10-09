---
{
  "key": "calculus.max-min-problems",
  "title": "Practical maximum and minimum problems",
  "summary": "Form an expression in one variable for a quantity in a practical situation (fencing, boxes, tanks, costs), use a constraint to eliminate a second variable, find the stationary value, justify that it is a maximum or a minimum, and answer in context.",
  "concepts": ["amath.calculus.max-min-problems"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

What is the largest field a farmer near Chinhoyi can enclose with a fixed length of fencing? Which shape of closed water tank holds a given volume using the least sheet metal? At what steady speed should a kombi travel from Harare to Mutare to keep the total cost of the trip as low as possible? These are **optimisation** problems: one quantity is to be made as large or as small as possible, and differentiation finds the answer exactly.

Cambridge 0606 examines practical maximum and minimum problems (topic 14.8), usually as a multi-part question that begins "show that the area is …" and ends "find the maximum area, justifying that it is a maximum". The ZIMSEC syllabus names stationary points but not optimisation in context, so this lesson is for Cambridge candidates, although ZIMSEC students will find it good practice in using stationary points.

The mathematics is exactly what you already know: differentiate, set the derivative to zero, and use the second derivative to classify the point. The new skill is **modelling**: turning words into a formula in a single variable.

## Key definitions

:::definition{term="Objective quantity"}
The quantity to be maximised or minimised, such as an area, a volume, a surface area, a cost or a time.
:::

:::definition{term="Constraint"}
A fixed condition linking the variables, such as "the total length of fencing is 120 m" or "the volume is $16\pi$ m³". It is used to write the objective quantity in terms of **one** variable.
:::

:::formula{name="Formulas often needed (only the cone and sphere ones are in Cambridge's List of formulas)"}
Cylinder: $V = \pi r^2 h$; curved surface $2\pi rh$; closed cylinder total surface $2\pi r^2 + 2\pi rh$.

Cuboid: $V = lwh$. Sector of angle $\theta$ radians: arc $r\theta$, area $\frac{1}{2}r^2\theta$.
:::

## The method

1. Draw a diagram and name the variables.
2. Write the objective quantity in terms of two variables if necessary.
3. Use the constraint to eliminate one variable. This is usually the "show that" part of the question.
4. Differentiate with respect to the remaining variable and solve "derivative $= 0$".
5. Justify the nature: second derivative (or change of sign).
6. Answer the question asked, in context and with units: the maximum area, the dimensions, the least cost.

Reject values that make no physical sense, such as a negative length or a box with zero volume.

:::worked-solution[Example 1: a farmer has 120 m of fencing to enclose a rectangular plot against a long straight wall, which forms one side. Find the greatest possible area]
1. Let the two sides at right angles to the wall be $x$ m each; the side parallel to the wall is then $120 - 2x$ m (the constraint).
2. Area $A = x(120 - 2x) = 120x - 2x^2$.
3. $\dfrac{dA}{dx} = 120 - 4x = 0$ gives $x = 30$.
4. $\dfrac{d^2A}{dx^2} = -4 < 0$, so this is a maximum.
5. The plot is 30 m by 60 m and the greatest area is $30 \times 60 = 1800$ m².
:::

:::worked-solution[Example 2: an open box is made from a square sheet of card of side 24 cm by cutting a square of side $x$ cm from each corner and folding up the sides. Find the value of $x$ that gives the greatest volume, and that volume]
1. The base is a square of side $24 - 2x$ and the height is $x$, so $V = x(24 - 2x)^2$, for $0 < x < 12$.
2. Expand: $V = 4x^3 - 96x^2 + 576x$.
3. $\dfrac{dV}{dx} = 12x^2 - 192x + 576 = 12(x^2 - 16x + 48) = 12(x - 4)(x - 12)$.
4. $\dfrac{dV}{dx} = 0$ gives $x = 4$ or $x = 12$. Reject $x = 12$: the base would have zero width.
5. $\dfrac{d^2V}{dx^2} = 24x - 192 = -96 < 0$ at $x = 4$: a maximum.
6. $V = 4 \times 16^2 = 1024$ cm³ when $x = 4$.
:::

## Problems with a "show that"

Exam questions usually give you the expression to check the modelling. Your job is to derive it clearly.

:::worked-solution[Example 3: a closed cylindrical water tank in Masvingo has volume $16\pi$ m³. Show that its total surface area is $S = 2\pi r^2 + \dfrac{32\pi}{r}$, and find the radius that minimises $S$]
1. Volume: $\pi r^2 h = 16\pi$, so $h = \dfrac{16}{r^2}$.
2. Surface: $S = 2\pi r^2 + 2\pi r h = 2\pi r^2 + 2\pi r \times \dfrac{16}{r^2} = 2\pi r^2 + \dfrac{32\pi}{r}$, as required.
3. $\dfrac{dS}{dr} = 4\pi r - \dfrac{32\pi}{r^2} = 0$ gives $r^3 = 8$, so $r = 2$.
4. $\dfrac{d^2S}{dr^2} = 4\pi + \dfrac{64\pi}{r^3} = 4\pi + 8\pi = 12\pi > 0$: a minimum.
5. With $r = 2$ m, $h = \dfrac{16}{4} = 4$ m and $S = 8\pi + 16\pi = 24\pi$ m².
:::

The tank that uses least metal has height equal to its diameter, a result that holds for every volume.

:::worked-solution[Example 4: on the 260 km trip from Harare to Mutare, a kombi's driver and fixed costs are US\$16 per hour and its fuel costs $\dfrac{v^2}{400}$ US dollars per hour at a steady speed of $v$ km/h. Find the speed that minimises the total cost of the trip]
1. Time for the trip $= \dfrac{260}{v}$ hours.
2. Total cost $C = \dfrac{260}{v}\left(16 + \dfrac{v^2}{400}\right) = 260\left(\dfrac{16}{v} + \dfrac{v}{400}\right)$.
3. $\dfrac{dC}{dv} = 260\left(-\dfrac{16}{v^2} + \dfrac{1}{400}\right) = 0$ gives $v^2 = 6400$, so $v = 80$.
4. $\dfrac{d^2C}{dv^2} = 260 \times \dfrac{32}{v^3} > 0$ for $v > 0$: a minimum.
5. At 80 km/h the cost is $260\left(\dfrac{16}{80} + \dfrac{80}{400}\right) = 260 \times 0.4 =$ US\$104.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is a Cambridge 0606 topic. ZIMSEC's syllabus lists applications of differentiation to tangents, normals, stationary points, rates of change and approximations, but not optimisation in context, so ZIMSEC papers are unlikely to set these questions.
:::

## Common mistakes

:::mistake{title="Differentiating with two variables still present"}
$A = xy$ cannot be differentiated with respect to $x$ while $y$ is unknown. Use the constraint to replace $y$ first.
:::

:::mistake{title="Stopping at the value of x"}
"Find the maximum area" asks for the area, not the $x$ that gives it. Substitute back and answer the question.
:::

:::mistake{title="No justification"}
Cambridge requires you to show it is a maximum or a minimum: state $\frac{d^2A}{dx^2} = -4 < 0$, so maximum.
:::

:::mistake{title="Keeping an impossible root"}
Values like $x = 12$ in Example 2, or a negative radius, must be rejected with a reason.
:::

## Exam tips

:::exam-tip
In a "show that" part, write the constraint, rearrange it for the variable you eliminate, and substitute, each on its own line. The given answer must appear at the end exactly as printed.
:::

:::exam-tip
Leave answers in terms of $\pi$ when the data are in terms of $\pi$, and give units (m, m², m³, US\$).
:::

:::exam-tip
State the domain of the variable (for example $0 < x < 12$). It helps you reject impossible stationary values.
:::

## Summary

:::summary
- Identify the objective quantity and the constraint.
- Use the constraint to write the objective in one variable (often a "show that").
- Solve derivative $= 0$; reject values that are physically impossible.
- Justify maximum or minimum with the second derivative or a change of sign.
- Answer in context, with units.
:::
