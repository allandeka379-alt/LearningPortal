---
{
  "key": "physics.fluid-systems",
  "title": "Siphons, hydraulic systems and pumps",
  "summary": "How a siphon moves liquid over a barrier, how hydraulic systems such as the hydraulic jack and the car braking system multiply force, and how a lift pump (the Blair pump) and a force pump (the bicycle pump) work, explained with atmospheric and fluid pressure.",
  "concepts": ["cs.physics.fluid-systems"],
  "objectives": [
    "zimsec/o-level/combined-science:7.3.3.5.3",
    "zimsec/o-level/combined-science:7.3.3.5.4"
  ],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A farmer on an irrigation scheme near Chisumbanje moves water from the main canal into a field furrow with nothing but a length of plastic pipe. A mechanic raises a pick-up truck with a jack worked by one hand. A family draws water from a well with a hand pump, and a cyclist pumps up a flat tyre. All four are **fluid systems**: they use the pressure of the atmosphere, or pressure passed through a liquid, to move liquids and gases or to multiply a force.

In this lesson you will use two ideas from your work on pressure: the atmosphere presses on everything around us (about $100\ \text{kPa}$ at sea level), and pressure in a fluid depends on depth ($p = \rho g h$).

## Key definitions

:::definition{term="Siphon"}
A tube, full of liquid, that carries liquid from a container up over its edge and down to a lower level, without a pump.
:::

:::definition{term="Hydraulic system"}
A machine that uses a liquid, such as oil or brake fluid, enclosed in pipes and cylinders to pass on pressure and multiply a force.
:::

:::definition{term="Valve"}
A device that lets a fluid flow through it in one direction only.
:::

:::formula{name="Pressure"}
$$
p = \frac{F}{A} \qquad \text{so in a hydraulic system} \qquad \frac{F_1}{A_1} = \frac{F_2}{A_2}
$$
:::

## The siphon

To start a siphon, the tube is first filled with liquid. One end is placed below the surface of the liquid in the upper container, and the other end, the outlet, is placed **lower than that surface**. Liquid then flows continuously up over the edge and out of the outlet.

**Why it works.** Atmospheric pressure pushes down on the surface of the liquid in the upper container and pushes liquid up into the short arm of the tube. At the highest point of the tube:

- the pressure on the short-arm side is atmospheric pressure **minus** the pressure of a liquid column of height $h_1$ (from the liquid surface up to the bend);
- the pressure on the long-arm side is atmospheric pressure **minus** the pressure of a liquid column of height $h_2$ (from the outlet up to the bend).

Because the outlet is lower than the liquid surface, $h_2$ is greater than $h_1$, so the pressure is **greater on the short-arm side** and liquid is pushed towards the outlet.

**Conditions for a siphon to work**

1. The tube must be completely full of liquid at the start, with no air bubbles.
2. The outlet must be below the level of the liquid surface in the upper container.
3. The top of the bend must not be too high: for water it must be less than about $10\ \text{m}$ above the liquid surface, because atmospheric pressure can only push water up that far.

The flow stops when the liquid in the upper container falls below the inlet (air enters the tube) or, if the outlet is in a second container, when the two liquid levels are equal.

**Uses**: emptying fish tanks and water tanks without tipping them; siphon tubes that carry water from irrigation canals over the bank into field furrows; the flushing mechanism of many toilet cisterns.

:::note{title="Safety"}
Never start a siphon of petrol, paraffin or dirty water by sucking on the tube. Fill the tube by dipping it in the liquid, or use a siphon pump.
:::

## Hydraulic systems

Liquids are almost **incompressible**: their volume hardly changes when they are squeezed. Pressure applied to an enclosed liquid is therefore **passed on equally to every part of the liquid**. A small force on a narrow piston produces a pressure that acts on every square centimetre of a wide piston, giving a much larger force.

:::worked-solution[Force multiplied by a hydraulic system]
A force of $150\ \text{N}$ pushes on a small piston of area $3.0\ \text{cm}^2$. The large piston has an area of $90\ \text{cm}^2$.

1. Pressure in the liquid: $p = \dfrac{150}{3.0} = 50\ \text{N/cm}^2$.
2. Force on the large piston: $F_2 = 50 \times 90 = 4500\ \text{N}$.
3. The force is multiplied by $\dfrac{90}{3.0} = 30$, the ratio of the areas.
4. If the small piston moves down $15\ \text{cm}$, the volume of liquid moved is $3.0 \times 15 = 45\ \text{cm}^3$, so the large piston rises $\dfrac{45}{90} = 0.5\ \text{cm}$. The force is 30 times bigger, but the distance is 30 times smaller: no work is gained.
:::

### The hydraulic jack

A hydraulic jack has a **narrow pump cylinder** with a small piston worked by a handle, and a **wide cylinder** with a large piston (the ram) that carries the load. Both are connected to a **reservoir** of oil.

1. **Handle raised**: the small piston rises, the pressure below it falls, and oil flows from the reservoir through **valve 1** into the pump cylinder. **Valve 2** stays closed, so oil in the wide cylinder cannot flow back.
2. **Handle pushed down**: the small piston pushes oil through **valve 2** into the wide cylinder. Valve 1 closes, so the oil cannot return to the reservoir. The pressure acts on the large piston, which rises a little with a large force.
3. Many strokes raise the load step by step.
4. **Release valve** opened: oil flows from the wide cylinder back to the reservoir, and the load is lowered.

The handle is also a lever, so the force on the small piston is already larger than the force of the hand.

### The car braking system

1. The driver presses the **brake pedal**, a lever that pushes a piston into the narrow **master cylinder**.
2. The pressure in the **brake fluid** is passed on equally through the brake pipes to a **slave (wheel) cylinder** at each wheel.
3. The pistons in the wheel cylinders are wider, so they push with a larger force, pressing the **brake pads** against the **discs** (or the brake shoes against the drums).
4. Friction slows the wheels. Because the same pressure reaches every wheel cylinder, all the wheels brake at the same time.

**Air in the brake pipes is dangerous.** Air is easily compressed, so pressing the pedal squashes the air bubbles instead of moving the wheel pistons: the pedal feels "spongy" and the brakes are weak. Mechanics **bleed** the brakes to let the air out, and leaks of brake fluid must be repaired at once.

## Pumps

### The lift pump: the Blair pump

The **Blair pump**, named after the Blair Research Laboratory in Harare where it was designed, is a cheap hand pump for family wells. The syllabus uses it as an example of a **lift pump**. A lift pump has a **barrel** (cylinder) with an **inlet valve** at the bottom, a **piston** (plunger) that has its own **valve**, and a **spout** near the top.

1. **Upstroke**: the piston rises and its valve is closed by the weight of the water above it. The pressure in the barrel below the piston falls, so **atmospheric pressure** on the water in the well pushes water up the pipe, through the inlet valve and into the barrel. The water above the piston is **lifted** and pours out of the spout.
2. **Downstroke**: the inlet valve closes, so the water in the barrel cannot run back into the well. The piston valve opens, and the water passes through the piston to the space above it, ready to be lifted on the next upstroke.

**How high can a lift pump raise water?** If the barrel is above the water, atmospheric pressure has to push the water up to it. Atmospheric pressure can only hold up a column of water of height $h = \dfrac{p}{\rho g}$.

:::worked-solution[The highest lift on the highveld]
In Harare, about $1500\ \text{m}$ above sea level, atmospheric pressure is about $85\ \text{kPa}$. Take $\rho = 1000\ \text{kg/m}^3$ and $g = 10\ \text{N/kg}$.

1. $h = \dfrac{p}{\rho g} = \dfrac{85\,000}{1000 \times 10} = 8.5\ \text{m}$.
2. Even a perfect lift pump with its barrel at the ground could not raise water from a depth greater than $8.5\ \text{m}$ there; leaks at the valves and piston make the real limit lower.
3. Pumps for deep boreholes avoid the limit by placing the cylinder down the borehole, below the water level, so that the water is lifted by the piston instead of being pushed up by the atmosphere.
:::

### The force pump: the bicycle pump

A bicycle pump has a **barrel**, a **piston** with a flexible cup-shaped **leather or rubber washer**, and a connector to the **tyre valve**, which acts as a one-way outlet valve.

1. **Push stroke (handle in)**: the air in the barrel is squashed and its pressure rises. The high pressure presses the edges of the washer against the barrel wall, so no air can escape past it. When the pressure in the barrel is greater than the pressure in the tyre, the **tyre valve opens** and air is **forced** into the tyre.
2. **Pull stroke (handle out)**: the volume in the barrel increases and the pressure falls below atmospheric pressure. The **tyre valve closes**, because the pressure in the tyre is now greater. Atmospheric pressure pushes outside air past the flexible edges of the washer, refilling the barrel.

The barrel gets warm while pumping, because work is done in compressing the air and against friction.

A force pump does not rely on the atmosphere to raise its fluid: the piston **forces** the fluid out, so a water force pump can deliver water higher than $10\ \text{m}$, for example up to a tank on a stand.

| | Lift pump | Force pump |
| --- | --- | --- |
| Example | Blair pump | Bicycle pump |
| What moves the fluid into the barrel | Atmospheric pressure | Atmospheric pressure |
| What moves the fluid out | The piston lifts the water above it to the spout | The piston forces the fluid through an outlet valve |
| Valves | Inlet valve and a valve in the piston | Flexible washer and an outlet valve (the tyre valve) |
| Limit | Water can only be raised about $10\ \text{m}$ (less at altitude) by atmospheric pressure | Can deliver to greater heights or pressures |

## Common mistakes

:::mistake{title="The siphon outlet only has to be outside the container"}
The outlet must be **lower than the liquid surface** in the upper container. If it is higher, the liquid flows back instead.
:::

:::mistake{title="Hydraulic systems create energy"}
The output force is larger, but the large piston moves a much smaller distance. Work out is never more than work in.
:::

:::mistake{title="The pump sucks the water up"}
"Suction" is not a force. The piston lowers the pressure in the barrel, and the greater **atmospheric pressure** on the water in the well pushes the water up.
:::

## Exam tips

:::exam-tip
In pump questions, say what each valve does on each stroke: open or closed, and why (which side has the greater pressure).
:::

:::exam-tip
For hydraulic calculations, find the pressure first ($p = F_1/A_1$), then the output force ($F_2 = p A_2$). Keep the areas in the same units.
:::

:::exam-tip
"Why must there be no air in the brake fluid?" Answer: air is compressible, so the pressure would compress the air instead of being passed on to the wheel cylinders.
:::

## Summary

:::summary
- A siphon carries liquid over a barrier to a lower level: the tube must be full of liquid and the outlet below the upper liquid surface; atmospheric pressure drives the flow.
- Pressure applied to an enclosed liquid is passed on equally throughout it; liquids are almost incompressible. $F_2 = F_1 \times \dfrac{A_2}{A_1}$, but the large piston moves less far.
- Hydraulic jack: valves let each stroke push oil into the wide cylinder; a release valve lowers the load. Car brakes: master cylinder, brake fluid, wheel cylinders, pads on discs; air in the fluid makes the brakes spongy.
- Lift pump (Blair pump): on the upstroke atmospheric pressure pushes water into the barrel and the piston lifts water to the spout; the limit is about $10\ \text{m}$ at sea level and less at altitude.
- Force pump (bicycle pump): the washer seals on the push stroke and air is forced through the tyre valve; on the pull stroke the tyre valve closes and air enters past the washer.
:::
