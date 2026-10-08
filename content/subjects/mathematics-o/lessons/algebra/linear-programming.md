---
{
  "key": "algebra.linear-programming",
  "title": "Linear programming",
  "summary": "Form linear inequalities from a practical problem, draw the feasible region, and find the maximum or minimum value of a quantity such as profit or cost by testing the vertices or using a search line.",
  "concepts": ["math.algebra.linear-programming"],
  "objectives": ["zimsec/o-level/mathematics:7.3.3"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Mr Moyo farms in Mashonaland Central. This season he will plant $x$ hectares of maize and $y$ hectares of soya beans. He has only 10 hectares, his seed budget is limited, and he has a contract to grow at least 2 hectares of soya. Each crop earns a different profit per hectare. How much of each should he plant to make the most profit?

Problems like this, with several limits (**constraints**) and one quantity to make as large or as small as possible, are solved by **linear programming**. It is a ZIMSEC O-Level topic that brings together forming inequalities, drawing regions and substituting into formulas, and it is used for real decisions in farming, transport and manufacturing.

You should already be able to show inequalities in two variables as regions on a graph.

## Key definitions

:::definition{term="Constraint"}
A condition that limits the possible choices, written as a linear inequality, such as $x + y \leq 10$.
:::

:::definition{term="Feasible region"}
The region of the graph containing every point that satisfies all the constraints. Each point in it is a possible plan.
:::

:::definition{term="Objective function"}
The quantity to be maximised or minimised, such as profit $P = 500x + 300y$ or cost $C = 40x + 100y$.
:::

:::keyfact{title="Where the optimum lies"}
For a linear objective function and a feasible region bounded by straight lines, the maximum and the minimum always occur at a **vertex** (corner) of the region.
:::

## Translating words into inequalities

| Words | Inequality |
| :--- | :---: |
| at least 2 hectares of soya | $y \geq 2$ |
| at most 10 hectares altogether / not more than 10 | $x + y \leq 10$ |
| more buns than drinks | $x > y$ |
| fewer than 8 trips | $x < 8$ |
| the number of buses is at least twice the number of lorries | $b \geq 2l$ |
| cannot be negative | $x \geq 0$, $y \geq 0$ |

Resource constraints come from "amount per item $\times$ number of items $\leq$ amount available". If maize seed costs US\$200 per hectare and soya seed US\$100 per hectare, with US\$1600 available, then $200x + 100y \leq 1600$, which simplifies to $2x + y \leq 16$.

## The method

1. Define the variables clearly, with units.
2. Write each constraint as an inequality, and simplify.
3. Draw the boundary lines and shade the unwanted regions, leaving the feasible region unshaded.
4. Find the coordinates of the vertices of the feasible region.
5. Evaluate the objective function at each vertex (or use a search line), and choose the best.
6. Answer the question in context, checking that the answer makes sense (for example, whole numbers of buses).

:::worked-solution[Example 1: Mr Moyo's crops]
Constraints: land $x + y \leq 10$; seed budget $2x + y \leq 16$; contract $y \geq 2$; and $x \geq 0$. Profit is US\$500 per hectare of maize and US\$300 per hectare of soya.
1. Objective: maximise $P = 500x + 300y$.
2. Draw $x + y = 10$, $2x + y = 16$ and $y = 2$ (all solid), and the $y$-axis.
3. Vertices: $(0, 2)$ and $(0, 10)$ on the $y$-axis; $(7, 2)$, where $y = 2$ meets $2x + y = 16$; and $(6, 4)$, where $x + y = 10$ meets $2x + y = 16$ (subtracting gives $x = 6$, so $y = 4$).
4. Evaluate: $P(0, 2) = 600$; $P(0, 10) = 3000$; $P(7, 2) = 4100$; $P(6, 4) = 3000 + 1200 = 4200$.
5. The maximum profit is US\$4200, from 6 hectares of maize and 4 hectares of soya beans.
:::

### The search line method

Instead of testing every vertex, draw a line of constant profit, such as $500x + 300y = 1500$ (through $(3, 0)$ and $(0, 5)$). Every line $500x + 300y = k$ is parallel to it. Slide a ruler parallel to this **search line** away from the origin: the last point of the feasible region it touches gives the maximum. (For a minimum, slide towards the origin and take the first point it touches.)

## When the answers must be whole numbers

:::worked-solution[Example 2: hiring transport for a school trip]
A school must transport at least 120 learners. A minibus carries 15 and costs US\$40; a bus carries 60 and costs US\$100. Only 6 drivers are available. Let $x$ = number of minibuses and $y$ = number of buses.
1. Seats: $15x + 60y \geq 120$, which simplifies to $x + 4y \geq 8$.
2. Drivers: $x + y \leq 6$; also $x \geq 0$, $y \geq 0$, whole numbers.
3. Minimise $C = 40x + 100y$.
4. Points with whole-number coordinates in the region near its lower edge include $(0, 2)$, $(4, 1)$ and $(5, 1)$, costing US\$200, US\$260 and US\$300.
5. The cheapest choice is 2 buses and no minibuses, costing US\$200.
:::

When the best vertex has fractions, test the nearby points with whole-number coordinates that lie **inside** the region.

## Common mistakes

:::mistake{title="Reversing at least and at most"}
"At least 10" means 10 or more: $\geq 10$. "At most 10" means 10 or fewer: $\leq 10$.
:::

:::mistake{title="Forgetting the hidden constraints"}
Numbers of hectares, buses or items cannot be negative, so include $x \geq 0$ and $y \geq 0$ unless another constraint already covers them.
:::

:::mistake{title="Testing points that are not vertices"}
The maximum or minimum is at a corner of the region. Testing a random point inside tells you nothing about the optimum.
:::

:::mistake{title="Giving an impossible answer"}
"2.5 buses" is not possible. If the variables count objects, give whole-number answers that satisfy every constraint.
:::

## Exam tips

:::exam-tip
Show the value of the objective function at each vertex in a small table. This earns method marks and makes your choice of the best vertex clear.
:::

:::exam-tip
Questions often say "Write down the inequalities" before "Show the region". Simplify each inequality (divide by common factors) before drawing: $200x + 100y \leq 1600$ becomes $2x + y \leq 16$.
:::

:::exam-tip
Finish with a sentence in context: "He should plant 6 ha of maize and 4 ha of soya beans, for a maximum profit of US\$4200."
:::

## Summary

:::summary
- Define the variables, then turn each condition into a linear inequality.
- The feasible region contains every point satisfying all the constraints.
- The maximum or minimum of a linear objective function occurs at a vertex of the feasible region.
- Test each vertex, or slide a search line parallel to the objective function.
- If the variables count objects, give whole-number answers inside the region.
:::
