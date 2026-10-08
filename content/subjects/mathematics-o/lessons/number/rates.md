---
{
  "key": "number.rates",
  "title": "Rates and compound measures",
  "summary": "Use rates such as average speed, density, pressure, population density, flow rates and fuel consumption, and convert compound units such as km/h to m/s.",
  "concepts": ["math.number.rates"],
  "objectives": ["zimsec/o-level/mathematics:1.3.3", "cambridge/igcse/mathematics:1.12.1", "cambridge/igcse/mathematics:1.12.2", "cambridge/igcse/mathematics:1.12.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A kombi driver wants to know how long the trip from Harare to Marondera will take. A farmer near Kadoma needs to know how long a pump will take to fill a water tank. A transport company works out how much diesel a truck will burn between Beitbridge and Harare. Each of these uses a **rate**: one quantity measured per unit of another.

Rates that combine two different units, such as kilometres per hour or grams per cubic centimetre, are called **compound measures**. In this lesson you will use the most common ones and learn to convert between their units.

You should already be able to rearrange a simple formula, work with time in hours and minutes, and convert between metric units.

## Key definitions

:::definition{term="Rate"}
A quantity measured per unit of another quantity, for example 12 litres per minute, US\$7 per hour or 8 litres per 100 km.
:::

:::definition{term="Average speed"}
The total distance travelled divided by the total time taken, including any stops.
:::

:::definition{term="Density"}
The mass of a substance per unit volume, usually in $\text{g/cm}^3$ or $\text{kg/m}^3$.
:::

:::definition{term="Pressure"}
The force acting on each unit of area, in newtons per square metre ($\text{N/m}^2$). One $\text{N/m}^2$ is called a pascal (Pa).
:::

:::definition{term="Population density"}
The number of people per unit of area, usually people per square kilometre.
:::

:::formula{name="Compound measures"}
$$
\text{speed} = \frac{\text{distance}}{\text{time}} \qquad \text{density} = \frac{\text{mass}}{\text{volume}}
$$

$$
\text{pressure} = \frac{\text{force}}{\text{area}} \qquad \text{population density} = \frac{\text{population}}{\text{area}}
$$
:::

Each formula can be rearranged. For example, $\text{distance} = \text{speed} \times \text{time}$ and $\text{time} = \dfrac{\text{distance}}{\text{speed}}$. The same pattern works for density: $\text{mass} = \text{density} \times \text{volume}$.

## Speed, distance and time

Always change the time into **hours** (as a decimal or fraction) before using a speed in km/h. Remember that 15 minutes is $0.25$ h, not $0.15$ h.

:::worked-solution[Example 1: average speed for a journey in two stages]
A bus travels 120 km at an average speed of 80 km/h and then 100 km at an average speed of 50 km/h. Find its average speed for the whole journey.

1. Time for stage 1: $120 \div 80 = 1.5$ h.
2. Time for stage 2: $100 \div 50 = 2$ h.
3. Total distance $= 220$ km and total time $= 3.5$ h.
4. Average speed $= 220 \div 3.5 = 62.857\ldots \approx 62.9$ km/h.
:::

Notice that the answer is **not** the mean of 80 and 50, which is 65. The bus spends longer travelling at the slower speed, so the average is pulled towards 50 km/h.

### Converting km/h and m/s

$$
1\ \text{km/h} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3.6}\ \text{m/s}
$$

So to change km/h to m/s, divide by 3.6; to change m/s to km/h, multiply by 3.6.

:::worked-solution[Example 2: change 72 km/h into metres per second]
1. $72\ \text{km/h} = 72\,000$ m in $3600$ s.
2. $72\,000 \div 3600 = 20$.
3. So $72\ \text{km/h} = 20\ \text{m/s}$. (Check: $72 \div 3.6 = 20$.)
:::

## Density and pressure

:::worked-solution[Example 3: the density of a granite block]
A block of granite measures 20 cm by 10 cm by 5 cm and has a mass of 2.7 kg. Find its density in $\text{g/cm}^3$.

1. Volume $= 20 \times 10 \times 5 = 1000\ \text{cm}^3$.
2. Mass $= 2.7\ \text{kg} = 2700$ g.
3. Density $= 2700 \div 1000 = 2.7\ \text{g/cm}^3$.
:::

:::worked-solution[Example 4: pressure under a crate]
A crate with a weight of 600 N rests on a face measuring 0.5 m by 0.4 m. Find the pressure on the floor.

1. Area $= 0.5 \times 0.4 = 0.2\ \text{m}^2$.
2. Pressure $= 600 \div 0.2 = 3000\ \text{N/m}^2$ (3000 Pa).
:::

The same force on a **smaller** area gives a **greater** pressure. That is why a crate exerts most pressure when it stands on its smallest face.

## Other rates

:::worked-solution[Example 5: fuel consumption and cost]
A car uses 8 litres of petrol per 100 km. Petrol costs US\$1.60 per litre (a price given for this example). Find the cost of fuel for a journey of 350 km.

1. Fuel per km: $8 \div 100 = 0.08$ litres.
2. Fuel for 350 km: $350 \times 0.08 = 28$ litres.
3. Cost: $28 \times 1.60 = 44.80$, so US\$44.80.
:::

:::example{title="Flow rate"}
A tap fills a 200-litre drum at 12 litres per minute. The time taken is $200 \div 12 = 16.67$ minutes, which is 16 minutes 40 seconds (because $0.67$ of a minute is $\frac{2}{3} \times 60 = 40$ seconds).
:::

Population density works in the same way. A ward of $90\ \text{km}^2$ with $13\,500$ people has a population density of $13\,500 \div 90 = 150$ people per $\text{km}^2$.

## Common mistakes

:::mistake{title="Writing minutes as a decimal of an hour"}
2 hours 15 minutes is $2.25$ h, not $2.15$ h. Divide the minutes by 60: $15 \div 60 = 0.25$.
:::

:::mistake{title="Averaging the speeds"}
The average speed for a journey is the **total distance ÷ total time**. Adding two speeds and dividing by 2 is only correct when the two stages take exactly the same time.
:::

:::mistake{title="Mixing units"}
A density in $\text{g/cm}^3$ needs the mass in grams and the volume in $\text{cm}^3$. Pressure in $\text{N/m}^2$ needs the area in $\text{m}^2$, not $\text{cm}^2$.
:::

:::mistake{title="Converting km/h to m/s the wrong way"}
Converting to m/s gives a **smaller** number: divide by 3.6. If your answer in m/s is bigger than the speed in km/h, you multiplied by mistake.
:::

## Exam tips

:::exam-tip
Cambridge papers give the formulas for density, pressure and population density in the question when you need them. You must know speed $=$ distance $\div$ time yourself.
:::

:::exam-tip
Write the units at every step, for example "$= 3.5$ h". Units help you spot whether to multiply or divide, and examiners can follow your method.
:::

:::exam-tip
When a question asks for a time, give it in the form requested: in hours and minutes, or as a clock time such as 15:30. Convert a decimal of an hour carefully: $0.4$ h $= 0.4 \times 60 = 24$ minutes.
:::

## Summary

:::summary
- A rate measures one quantity per unit of another; compound measures combine two units (km/h, $\text{g/cm}^3$, $\text{N/m}^2$).
- Speed $=$ distance $\div$ time, density $=$ mass $\div$ volume, pressure $=$ force $\div$ area, population density $=$ population $\div$ area.
- Average speed is total distance divided by total time, not the mean of the speeds.
- Divide by 3.6 to change km/h to m/s; multiply by 3.6 to change m/s to km/h.
- Change minutes to hours by dividing by 60 before using a speed in km/h.
:::
