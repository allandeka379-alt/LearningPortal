---
{
  "key": "graphs.practical-situations",
  "title": "Graphs in practical situations",
  "summary": "Draw, read and interpret real-life graphs such as conversion graphs and filling graphs, and interpret the gradient of a straight-line graph as a rate of change with units.",
  "concepts": ["math.graphs.practical-situations"],
  "objectives": ["cambridge/igcse/mathematics:2.9.1", "cambridge/igcse/mathematics:2.9.2"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

A cross-border trader travelling from Beitbridge to Musina needs to change US dollars into South African rand. A traveller's guidebook gives a temperature in degrees Fahrenheit, but Zimbabwe's weather forecasts use degrees Celsius. A farmer watches the water level in a dam fall through the dry season. Each of these situations can be shown on a graph, and the graph lets you read off answers quickly and see how fast things are changing.

In this lesson you will draw graphs from data and formulas, read values from them, and interpret the **gradient** of a straight-line graph as a **rate of change**. Travel graphs, a special kind of practical graph, have their own lesson.

You should already be able to plot points, choose sensible scales and find the gradient of a straight line.

## Key definitions

:::definition{term="Conversion graph"}
A straight-line graph used to change a quantity from one unit to another, such as US dollars to rand or kilometres to miles.
:::

:::definition{term="Rate of change"}
How fast one quantity changes compared with another, such as litres per minute or rand per dollar. On a straight-line graph it is the **gradient**, and its units are "vertical units per horizontal unit".
:::

:::keyfact{title="Reading the gradient of a real-life graph"}
Gradient $= \dfrac{\text{change in the vertical quantity}}{\text{change in the horizontal quantity}}$, with units such as centimetres per gram or US\$ per kilogram. A positive gradient means increasing; a negative gradient means decreasing.
:::

## Conversion graphs

When two quantities are in **direct proportion**, such as an amount of money in two currencies, the conversion graph is a straight line through the origin.

:::worked-solution[Example 1: US dollars and rand]
Assume an exchange rate of US\$1 $=$ R18. Draw a conversion graph for up to US\$50 and use it to convert R450 to US dollars.
1. Make a short table: US\$0 is R0; US\$10 is R180; US\$50 is R900.
2. Put dollars on the horizontal axis (0 to 50) and rand on the vertical axis (0 to 900). Plot the points and rule a straight line through them.
3. To convert R450, go across from 450 on the rand axis to the line, then down to the dollar axis: US\$25.
4. Check by calculation: $450 \div 18 = 25$.
:::

The gradient of this graph is $\frac{900}{50} = 18$ rand per dollar: the exchange rate.

Not every conversion graph passes through the origin. Temperature scales have different zero points.

:::worked-solution[Example 2: Celsius and Fahrenheit]
Water freezes at $0^\circ\text{C} = 32^\circ\text{F}$ and boils at $100^\circ\text{C} = 212^\circ\text{F}$. The conversion is linear.
1. Plot $(0, 32)$ and $(100, 212)$, with Celsius across and Fahrenheit up, and join them.
2. Gradient $= \frac{212 - 32}{100 - 0} = \frac{180}{100} = 1.8$, so each degree Celsius is $1.8$ degrees Fahrenheit.
3. The equation is $F = 1.8C + 32$.
4. A warm Harare afternoon of $25^\circ\text{C}$ is $1.8 \times 25 + 32 = 77^\circ\text{F}$.
:::

## Gradient as a rate of change

:::worked-solution[Example 3: a falling dam level]
A graph shows the water level in a farm dam falling in a straight line from $12\ \text{m}$ on day 0 to $9\ \text{m}$ on day 30.
1. Gradient $= \frac{9 - 12}{30 - 0} = \frac{-3}{30} = -0.1$.
2. The units are metres per day: the rate of change is $-0.1\ \text{m}$ per day.
3. In words: the level falls by $0.1\ \text{m}$, or $10\ \text{cm}$, every day.
4. If the rate continues, the level reaches $6\ \text{m}$ after another $30$ days.
:::

## Drawing a graph from data

:::worked-solution[Example 4: stretching a spring]
Rudo hangs masses on a spring and measures its length.

| Mass (g) | $0$ | $100$ | $200$ | $300$ | $400$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Length (cm) | $12.0$ | $14.5$ | $17.0$ | $19.5$ | $22.0$ |

1. Mass is controlled by Rudo, so it goes on the horizontal axis. Label both axes with the quantity and the unit.
2. Choose scales that use most of the grid, such as 2 cm for 100 g across and 2 cm for 2 cm of length up.
3. Plot the points. They lie on a straight line, so rule one line through them.
4. Gradient $= \frac{22.0 - 12.0}{400 - 0} = 0.025\ \text{cm per g}$: the spring stretches $2.5\ \text{cm}$ for every $100\ \text{g}$.
5. The intercept, $12\ \text{cm}$, is the length with no mass: the spring's natural length.
:::

If the points do not lie on a straight line, join them with a smooth curve instead (unless the situation changes in sudden steps).

## Filling containers

Water poured at a **constant rate** into a container rises at a speed that depends on the container's width.

- A cylinder (same width all the way up): the depth rises steadily, so the depth-time graph is a straight line.
- A container that gets **wider** towards the top, such as a bucket: the depth rises more and more slowly, so the graph is a curve that becomes **less steep**.
- A container that gets **narrower** towards the top, such as a conical flask (wide base, narrow top): the graph becomes **steeper**.
- A container whose width changes in steps, such as a wide cylinder with a narrow cylinder on top, gives straight sections: the narrow part has the steeper section.

## Common mistakes

:::mistake{title="Forgetting the units of a gradient"}
"The gradient is $18$" is incomplete. Say "$18$ rand per US dollar" or "$0.025\ \text{cm}$ per gram". Units often carry the interpretation mark.
:::

:::mistake{title="Assuming every conversion line starts at the origin"}
Temperature lines do not: $0^\circ\text{C}$ is $32^\circ\text{F}$. Doubling a temperature in Celsius does not double it in Fahrenheit.
:::

:::mistake{title="Reading the wrong axis"}
To convert rand to dollars, start on the **rand** axis. Draw your reading lines with a ruler so that you can see which axis you started from.
:::

:::mistake{title="Joining points with a curve when the trend is straight"}
If the data lie on a straight line, rule a single line through them. Do not join point to point with a wobbly line.
:::

## Exam tips

:::exam-tip
When asked to **use your graph**, draw the reading lines on the graph and give the value you read. Answers within a small tolerance of the correct value earn the marks.
:::

:::exam-tip
"**Interpret** the gradient" means say what it represents in context, with units: "The tank fills at 40 litres per minute."
:::

:::exam-tip
For extrapolation beyond the data, add a sentence of caution: the pattern may not continue (a spring can be overstretched).
:::

## Summary

:::summary
- A conversion graph turns one unit into another; for directly proportional quantities it passes through the origin.
- Read values by going across to the line, then down (or up, then across), with ruled lines.
- The gradient of a straight-line graph is a rate of change, measured in vertical units per horizontal unit.
- Plot data with the controlled quantity on the horizontal axis; label axes with units.
- In filling problems, a wider section rises more slowly (less steep); a narrower section rises faster (steeper).
:::
