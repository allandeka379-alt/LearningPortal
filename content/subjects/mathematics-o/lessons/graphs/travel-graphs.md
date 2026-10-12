---
{
  "key": "graphs.travel-graphs",
  "title": "Travel graphs: distance–time and speed–time",
  "summary": "Draw and interpret distance–time and speed–time graphs: speed as the gradient of a distance–time graph, acceleration as the gradient of a speed–time graph, and distance travelled as the area under a speed–time graph.",
  "concepts": ["math.graphs.travel-graphs"],
  "objectives": ["zimsec/o-level/mathematics:5.2.1", "zimsec/o-level/mathematics:5.2.2", "cambridge/igcse/mathematics:2.9.1", "cambridge/igcse/mathematics:2.9.3", "cambridge/igcse/mathematics:2.9.4"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Tatenda cycles from his home to a friend's house, stays for a while, then cycles back. A kombi pulls away from a rank, speeds up, cruises along the road and brakes at the next stop. Journeys like these are described exactly by **travel graphs**, a standard topic in both O-Level and IGCSE examinations.

There are two kinds, and the most common mistake is to confuse them. On a **distance–time graph** the height shows how far you are from the start. On a **speed–time graph** the height shows how fast you are going. The same shape means different things on each.

You should already be able to find the gradient of a straight line and the areas of triangles, rectangles and trapezia.

## Key definitions

:::definition{term="Distance–time graph"}
A graph of distance from a starting point (vertical axis) against time (horizontal axis). When the direction matters it is called a **displacement–time** graph.
:::

:::definition{term="Speed–time graph"}
A graph of speed (vertical axis) against time (horizontal axis). When the direction matters it is called a **velocity–time** graph, and velocity can be negative.
:::

:::definition{term="Acceleration"}
The rate of change of speed: the change in speed divided by the time taken, in units such as $\text{m/s}^2$. A negative acceleration is called a **deceleration** (or retardation).
:::

:::keyfact{title="The three facts to remember"}
- Gradient of a distance–time graph $=$ **speed**.
- Gradient of a speed–time graph $=$ **acceleration**.
- Area under a speed–time graph $=$ **distance travelled**.
:::

:::formula{name="Speed and average speed"}
$$
\text{speed} = \frac{\text{distance}}{\text{time}}, \qquad \text{average speed} = \frac{\text{total distance}}{\text{total time}}
$$
:::

## Distance–time graphs

- A sloping straight line means a **constant speed**; the steeper the line, the faster.
- A **horizontal** line means the object is **stationary** (not moving).
- A line sloping **down** towards the time axis means the object is travelling back towards the start.

:::worked-solution[Example 1: Tatenda's bicycle journey]
Tatenda's distance–time graph has three straight sections: from $(0\ \text{min}, 0\ \text{km})$ to $(30, 9)$, then horizontal to $(45, 9)$, then down to $(75, 0)$.
1. First section: $9\ \text{km}$ in $30$ minutes $= 0.5$ hours, so speed $= \frac{9}{0.5} = 18\ \text{km/h}$.
2. Second section: horizontal, so he is stationary for $45 - 30 = 15$ minutes.
3. Third section: $9\ \text{km}$ back home in $30$ minutes, again $18\ \text{km/h}$.
4. Average speed for the whole trip $= \frac{9 + 9}{75 \div 60} = \frac{18}{1.25} = 14.4\ \text{km/h}$. The rest counts in the total time.
:::

Notice step 1: the time was converted to **hours** so that the speed came out in km/h. Always check what units the answer needs.

![Distance-time graph of Tatenda's cycle ride: 9 km out in 30 minutes (18 km/h), stationary for 15 minutes (the horizontal section), then 9 km back home in 30 minutes, reaching home at 75 minutes.](media:diagrams/travel-distance-time-tatenda.png "Figure: gradient is speed; the flat section is time at rest")

:::example{title="Converting between km/h and m/s"}
$1\ \text{km/h} = \frac{1000\ \text{m}}{3600\ \text{s}}$, so to change km/h to m/s, multiply by $1000$ and divide by $3600$:

$72\ \text{km/h} = \frac{72 \times 1000}{3600}\ \text{m/s} = 20\ \text{m/s}$, and $15\ \text{m/s} = \frac{15 \times 3600}{1000}\ \text{km/h} = 54\ \text{km/h}$.
:::

## Speed–time graphs

- A sloping line upwards means the object is **accelerating**; downwards means **decelerating**.
- A **horizontal** line means **constant speed** (not stationary!).
- The line on the time axis (speed $0$) means the object is at rest.

![Speed-time graph of a car: it accelerates from rest to 20 m/s in 10 s, holds 20 m/s until 40 s, then slows to rest at 48 s; the areas under the graph are 100 m, 600 m and 80 m, giving a total distance of 780 m.](media:diagrams/travel-speed-time-car.png "Figure: the area under a speed-time graph is the distance travelled")

:::worked-solution[Example 2: a car between two stops]
A car starts from rest and accelerates uniformly to $20\ \text{m/s}$ in $10\ \text{s}$. It travels at $20\ \text{m/s}$ for $30\ \text{s}$, then decelerates uniformly to rest in $8\ \text{s}$.
1. Acceleration $= \frac{20 - 0}{10} = 2\ \text{m/s}^2$.
2. Deceleration $= \frac{20 - 0}{8} = 2.5\ \text{m/s}^2$ (the gradient of the last section is $-2.5$).
3. Distance = area under the graph, a trapezium. Split it: triangle $\frac{1}{2} \times 10 \times 20 = 100$; rectangle $30 \times 20 = 600$; triangle $\frac{1}{2} \times 8 \times 20 = 80$.
4. Total distance $= 100 + 600 + 80 = 780\ \text{m}$.
5. Average speed $= \frac{780}{10 + 30 + 8} = \frac{780}{48} = 16.25\ \text{m/s}$.
:::

:::worked-solution[Example 3: area of a trapezium]
A cyclist's speed increases uniformly from $4\ \text{m/s}$ to $10\ \text{m/s}$ in $6\ \text{s}$. How far does she travel in this time?
1. The region under the graph is a trapezium with parallel sides $4$ and $10$ and width $6$.
2. Distance $= \frac{1}{2}(4 + 10) \times 6 = 42\ \text{m}$.
:::

:::worked-solution[Example 4: an unknown maximum speed]
A bus accelerates from rest to $V\ \text{m/s}$ in $20\ \text{s}$, travels at $V\ \text{m/s}$ for $60\ \text{s}$, then decelerates to rest in $10\ \text{s}$. It travels $1500\ \text{m}$ in total. Find $V$.
1. Area $= \frac{1}{2}(20)V + 60V + \frac{1}{2}(10)V = 10V + 60V + 5V = 75V$.
2. $75V = 1500$, so $V = 20\ \text{m/s}$.
:::

### Displacement and velocity (ZIMSEC)

On a velocity–time graph, a section **below** the time axis means the object is moving in the opposite direction. Its area still counts as distance travelled, but it **reduces** the displacement from the start.

## Common mistakes

:::mistake{title="Confusing the two types of graph"}
A horizontal line on a distance–time graph means stopped; on a speed–time graph it means moving at a steady speed. Read the label on the vertical axis first.
:::

:::mistake{title="Mixing minutes and hours"}
$9\ \text{km}$ in $30$ minutes is not $0.3\ \text{km/h}$. Convert $30$ minutes to $0.5$ hours first: $18\ \text{km/h}$.
:::

:::mistake{title="Averaging the speeds"}
Average speed is total distance divided by total time, not the mean of the speeds. Riding $10\ \text{km}$ at $20\ \text{km/h}$ and $10\ \text{km}$ at $10\ \text{km/h}$ takes $1.5$ hours, so the average speed is $\frac{20}{1.5} \approx 13.3\ \text{km/h}$, not $15\ \text{km/h}$.
:::

:::mistake{title="Using the gradient for distance"}
On a speed–time graph the distance is the **area**, not the gradient and not the final height. Split the area into triangles, rectangles and trapezia.
:::

## Exam tips

:::exam-tip
Write the area calculation in pieces, such as "$\frac{1}{2} \times 10 \times 20 + 30 \times 20 + \frac{1}{2} \times 8 \times 20$". Method marks are given for correct areas even if the total is wrong.
:::

:::exam-tip
When asked to **describe** a section of a travel graph, give the type of motion and a value: "The car decelerates at $2.5\ \text{m/s}^2$" or "She is stationary for 15 minutes".
:::

:::exam-tip
When two journeys are drawn on one distance–time graph, the point where the lines cross is where and when the travellers meet.
:::

## Summary

:::summary
- Distance–time: gradient = speed; horizontal = stationary; downward slope = returning.
- Speed–time: gradient = acceleration; horizontal = constant speed; area = distance travelled.
- Average speed = total distance ÷ total time, including stops.
- Convert units before calculating: minutes to hours, km/h to m/s ($\times 1000 \div 3600$).
- Split areas under speed–time graphs into triangles, rectangles and trapezia.
:::
