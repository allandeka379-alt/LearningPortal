import { concept, P, t } from "../lib.mjs";

const O = (...codes) => codes.map((c) => `zimsec/o-level/combined-science:${c}`);
const SIPHON_HYD = O("7.3.3.5.3");
const PUMPS = O("7.3.3.5.4");
const ATM = O("7.3.3.5.2");

// =====================================================================================================================
concept("cs.physics.fluid-systems", {
  file: "physics/fluid-systems",
  keyPrefix: "physics.fluids",
}, (q) => {
  // ---- Siphon
  q.mcq({ d: 1, skill: "RECALL", objectives: SIPHON_HYD,
    stem: "What is a siphon?",
    options: [
      ["A tube full of liquid that carries liquid from a container up over its edge and down to a lower level", "Correct."],
      ["A pump that lifts water from a deep borehole", "A siphon needs no pump."],
      ["A cylinder that multiplies a force using oil", "That is a hydraulic system."],
      ["A valve that lets liquid flow one way only", "That is a valve."],
    ],
    answer: "A", explanation: "A siphon is a tube, full of liquid, that carries liquid over a barrier to a lower level without a pump." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: SIPHON_HYD,
    stem: "Which condition is necessary for a siphon to empty a tank of water?",
    options: [
      ["The outlet end of the tube must be lower than the water surface in the tank.", "Correct."],
      ["The tube must be made of metal.", "Any airtight tube works."],
      ["The top of the bend must be at least 10 m above the water.", "The bend must be less than about 10 m above the water surface."],
      ["The tube must contain some air before it is placed in the tank.", "The tube must be completely full of water."],
    ],
    answer: "A", explanation: "Water flows only if the outlet is below the surface of the water in the tank, and the tube must start full of water." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: SIPHON_HYD,
    stem: "A siphon will keep emptying a tank if its outlet end is lifted above the level of the water in the tank.",
    answer: false,
    explanation: "False. The outlet must be below the water surface in the tank. If it is raised above that level, the pressure is greater on the outlet side and the water flows back into the tank." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: SIPHON_HYD,
    stem: "What pushes the water up the short arm of a siphon, from the tank to the top of the bend?",
    options: [
      ["Atmospheric pressure acting on the water surface in the tank", "Correct."],
      ["Suction created by the water falling down the long arm", "Suction is not a force; the push comes from atmospheric pressure."],
      ["The weight of the water in the short arm", "Weight acts downwards and opposes the rise."],
      ["Capillary action in the tube", "Capillary rise is tiny in a wide tube."],
    ],
    answer: "A", explanation: "The pressure at the top of the tube is lower than atmospheric pressure, so the atmosphere pressing on the water surface in the tank pushes water up the short arm.",
    hints: ["What presses down on the open water surface in the tank?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: SIPHON_HYD,
    stem: "A siphon carries water out of a tank and pours it onto the ground well below the tank. The inlet end of the tube is held near the bottom of the tank. When will the flow stop?",
    options: [
      ["When the water level in the tank falls to the inlet, so that air enters the tube", "Correct."],
      ["When the tank is half empty, because the pressure has halved", "The flow continues as long as the tube stays full and the outlet is below the water surface."],
      ["After a fixed time of about one minute", "There is no fixed time."],
      ["Never: it will also empty the water below the inlet", "Once air enters the tube, the siphon stops."],
    ],
    answer: "A", explanation: "The siphon keeps flowing while the tube is full of water and the outlet is below the water surface. When the water level reaches the inlet, air enters and the column of water breaks.",
    hints: ["What happens to the tube when the water surface drops below its open end?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: SIPHON_HYD,
    stem: "Why must a siphon tube be completely filled with liquid before it is started?",
    options: [
      ["So that there is an unbroken column of liquid; air in the tube stops the flow.", "Correct."],
      ["So that the tube becomes heavy enough to stay in place.", "The weight of the tube is not the reason."],
      ["Because a full tube is under higher pressure than the atmosphere.", "The pressure at the top of the tube is lower than atmospheric."],
      ["To clean the inside of the tube.", "Cleaning is not the reason."],
    ],
    answer: "A", explanation: "The siphon works only with a continuous column of liquid from the inlet to the outlet. Air in the tube breaks the column and the flow stops." });

  // ---- Hydraulics
  q.mcq({ d: 2, skill: "RECALL", objectives: SIPHON_HYD,
    stem: "What happens to the pressure applied to one part of an enclosed liquid?",
    options: [
      ["It is passed on equally to every part of the liquid.", "Correct."],
      ["It is lost as the liquid is compressed.", "Liquids are almost incompressible."],
      ["It acts only in the direction of the applied force.", "Pressure in a fluid acts in all directions."],
      ["It doubles at the far end of the pipe.", "It is passed on equally, not increased."],
    ],
    answer: "A", explanation: "Pressure applied to an enclosed liquid is transmitted equally throughout the liquid. This is the principle of every hydraulic system." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: SIPHON_HYD,
    stem: "Why do hydraulic systems use a liquid such as oil rather than air?",
    options: [
      ["Liquids are almost incompressible, so pressure is passed on instead of squashing the fluid.", "Correct."],
      ["Liquids are lighter than air.", "Liquids are much denser than air."],
      ["Air cannot exert pressure.", "Air does exert pressure, but it is easily compressed."],
      ["Oil makes the pistons rust.", "Oil prevents rust, but that is not the main reason."],
    ],
    answer: "A", explanation: "A liquid hardly changes volume when squeezed, so pushing one piston moves the other at once. Air would just be compressed." });

  q.num({ d: 2, skill: "APPLICATION", daily: true, objectives: SIPHON_HYD,
    stem: t`A force of $60\ \text{N}$ acts on a small piston of area $0.0015\ \text{m}^2$ in a hydraulic system. What is the pressure in the liquid?`,
    value: 40000, unit: "Pa", wrong: [0.09, 0.000025],
    explanation: t`$p = \dfrac{F}{A} = \dfrac{60}{0.0015} = 40\,000\ \text{Pa}$.` });

  q.num({ d: 3, skill: "APPLICATION", objectives: SIPHON_HYD,
    stem: t`In a hydraulic press an effort of $120\ \text{N}$ acts on a small piston of area $2.5\ \text{cm}^2$. The large piston has an area of $75\ \text{cm}^2$. Calculate the force exerted by the large piston.`,
    value: 3600, unit: "N", wrong: [4, 22500, 48],
    explanation: t`Pressure $= \dfrac{120}{2.5} = 48\ \text{N/cm}^2$. Force on large piston $= 48 \times 75 = 3600\ \text{N}$.`,
    hints: ["Find the pressure first: p = F ÷ A for the small piston.", "Then F = p × A for the large piston."] });

  q.num({ d: 3, skill: "APPLICATION", objectives: SIPHON_HYD,
    stem: t`In a hydraulic system the small piston has an area of $2.0\ \text{cm}^2$ and the large piston an area of $60\ \text{cm}^2$. The small piston is pushed down $12\ \text{cm}$. How far does the large piston rise?`,
    value: 0.4, unit: "cm", wrong: [360, 6, 2.5],
    explanation: t`Volume of liquid moved $= 2.0 \times 12 = 24\ \text{cm}^3$. Rise of large piston $= \dfrac{24}{60} = 0.4\ \text{cm}$.`,
    hints: ["The volume of liquid pushed out of the small cylinder equals the volume that enters the large one."] });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true, objectives: SIPHON_HYD,
    stem: t`A hydraulic jack has a pump piston of area $1.5 \times 10^{-4}\ \text{m}^2$ and a ram (large piston) of area $4.5 \times 10^{-3}\ \text{m}^2$. The handle pushes the pump piston down with a force of $84\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the pressure in the oil.", value: 560000, unit: "Pa", wrong: [0.0126, 12600],
        explanation: t`$p = \dfrac{84}{1.5 \times 10^{-4}} = 5.6 \times 10^{5}\ \text{Pa}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the upward force on the ram.", value: 2520, unit: "N", wrong: [2.8, 84],
        explanation: t`$F = pA = 5.6 \times 10^{5} \times 4.5 \times 10^{-3} = 2520\ \text{N}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Each stroke pushes the pump piston down 6.0 cm. How far does the ram rise in one stroke?", value: 0.2, unit: "cm", wrong: [180, 6],
        explanation: t`The area ratio is $\dfrac{4.5 \times 10^{-3}}{1.5 \times 10^{-4}} = 30$, so the ram rises $\dfrac{6.0}{30} = 0.2\ \text{cm}$.` }),
      P.num({ label: "(d)", marks: 1, stem: "How many strokes are needed to raise the ram by 8.0 cm?", value: 40, wrong: [1.6, 48],
        explanation: t`$\dfrac{8.0}{0.2} = 40$ strokes.` }),
      P.manual({ label: "(e)", marks: 1, stem: "Explain why there is a one-way valve between the pump cylinder and the ram cylinder.",
        points: ["It stops oil flowing back from the ram cylinder when the handle is raised, so the load does not sink"] }),
    ],
    explanation: "p = F/A = 5.6 × 10⁵ Pa; F = pA = 2520 N; the ram rises 1/30 of the pump piston's movement per stroke (0.2 cm), so 40 strokes raise it 8.0 cm. The valve keeps the oil, and the load, up between strokes.",
    hints: ["Use p = F ÷ A, then F = p × A.", "The volume of oil moved per stroke is the same in both cylinders."] });

  q.mcq({ d: 2, skill: "RECALL", objectives: SIPHON_HYD,
    stem: "In a car braking system, what does the brake pedal push on directly?",
    options: [
      ["A piston in the master cylinder", "Correct."],
      ["The brake pads", "The pads are pushed by the wheel cylinders."],
      ["The wheel cylinders", "Brake fluid carries the pressure to the wheel cylinders."],
      ["The brake discs", "The discs turn with the wheels."],
    ],
    answer: "A", explanation: "The pedal pushes a piston into the master cylinder; the brake fluid passes the pressure to the wheel cylinders, which push the pads against the discs." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: SIPHON_HYD,
    stem: "A mechanic finds air bubbles in the brake fluid of a car. Why do they make the brakes weak and the pedal feel spongy?",
    options: [
      ["Air is easily compressed, so pressing the pedal squashes the air instead of moving the wheel pistons.", "Correct."],
      ["Air makes the brake fluid freeze.", "Air does not freeze brake fluid."],
      ["Air is denser than brake fluid and blocks the pipes.", "Air is much less dense than the fluid."],
      ["Air bubbles increase the friction between the pads and discs.", "The problem is in the fluid, not at the pads."],
    ],
    answer: "A", explanation: "Liquids are almost incompressible, but air is not. Much of the pedal's movement goes into compressing the bubbles, so less pressure reaches the wheel cylinders. The brakes must be bled.",
    hints: ["Which is easier to squash: a liquid or a gas?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: SIPHON_HYD,
    stem: "In a car braking system the pistons in the wheel cylinders are wider than the piston in the master cylinder. What is the effect of this?",
    options: [
      ["The force on each brake pad is larger than the force on the master cylinder piston.", "Correct: the same pressure acts on a larger area."],
      ["The pressure in the wheel cylinders is larger than in the master cylinder.", "The pressure is the same everywhere in the fluid."],
      ["The wheel pistons move further than the master cylinder piston.", "They move less far."],
      ["The brake fluid flows faster to the wheels.", "This is not the effect of the wider pistons."],
    ],
    answer: "A", explanation: "The pressure is passed on equally, and force = pressure × area, so the wider wheel pistons push the pads with a larger force (moving a shorter distance).",
    hints: ["Pressure is passed on equally. Then use F = p × A."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", objectives: SIPHON_HYD,
    stem: "In a car braking system, the pressure in the brake fluid is the same at every wheel cylinder.",
    answer: true,
    explanation: "True. Pressure applied to an enclosed liquid is passed on equally, so all the wheel cylinders receive the same pressure and the wheels brake together." });

  // ---- Pumps
  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: PUMPS,
    stem: "During the upstroke of a lift pump, what makes water from the well flow into the barrel below the piston?",
    options: [
      ["Atmospheric pressure acting on the water surface in the well", "Correct."],
      ["Suction pulling the water up", "Suction is not a force; the atmosphere pushes the water."],
      ["The weight of the piston", "The piston is rising; its weight does not push water up."],
      ["Water pressure from the spout", "The spout is open to the air and is where water leaves."],
    ],
    answer: "A", explanation: "As the piston rises, the pressure in the barrel below it falls. The greater atmospheric pressure on the water in the well pushes water up the pipe and through the inlet valve." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: PUMPS,
    stem: "During the downstroke of a lift pump, which valves are open and which are closed?",
    options: [
      ["Inlet valve closed; piston valve open", "Correct."],
      ["Inlet valve open; piston valve closed", "This is the upstroke."],
      ["Both valves open", "Water would then flow back into the well."],
      ["Both valves closed", "The water in the barrel must pass through the piston."],
    ],
    answer: "A", explanation: "On the downstroke the inlet valve closes so water cannot return to the well, and the piston valve opens so water passes through the piston to the space above it.",
    hints: ["Where must the water in the barrel go when the piston moves down?"] });

  q.num({ d: 3, skill: "APPLICATION", objectives: [...ATM, ...PUMPS],
    stem: t`At a place where atmospheric pressure is $90\ \text{kPa}$, what is the greatest height to which atmospheric pressure can push water up the pipe of a lift pump? (Density of water $= 1000\ \text{kg/m}^3$, $g = 10\ \text{N/kg}$.)`,
    value: 9, answer: "9.0", unit: "m", wrong: [0.009, 900, 90],
    explanation: t`$h = \dfrac{p}{\rho g} = \dfrac{90\,000}{1000 \times 10} = 9.0\ \text{m}$.`,
    hints: ["Use p = ρgh and rearrange for h.", "Convert kPa to Pa: 1 kPa = 1000 Pa."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: PUMPS,
    stem: "When the handle of a bicycle pump is pushed in, when does the tyre valve open?",
    options: [
      ["When the pressure of the air in the barrel becomes greater than the pressure in the tyre", "Correct."],
      ["As soon as the handle starts to move", "The barrel air must first be compressed above tyre pressure."],
      ["When the air in the barrel reaches atmospheric pressure", "Atmospheric pressure is lower than the tyre pressure."],
      ["Only when the handle is pulled out", "On the pull stroke the tyre valve closes."],
    ],
    answer: "A", explanation: "The air in the barrel is compressed until its pressure exceeds the tyre pressure; then the tyre valve opens and air is forced into the tyre." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: PUMPS,
    stem: "How does air get into the barrel of a bicycle pump when the handle is pulled out?",
    options: [
      ["Atmospheric pressure pushes outside air past the flexible edges of the washer, because the pressure in the barrel has fallen.", "Correct."],
      ["Air flows back out of the tyre through the tyre valve.", "The tyre valve closes on the pull stroke."],
      ["Air passes through tiny holes in the barrel wall.", "The barrel is airtight."],
      ["The washer makes air.", "Air comes from outside."],
    ],
    answer: "A", explanation: "Pulling the handle increases the volume and lowers the pressure in the barrel. The tyre valve closes, and the higher atmospheric pressure pushes air past the flexible washer into the barrel.",
    hints: ["Compare the pressure inside the barrel with atmospheric pressure during the pull stroke."] });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: PUMPS,
    stem: "After pumping up a tyre, a cyclist notices that the barrel of the bicycle pump is warm. What is the main reason?",
    options: [
      ["Work done compressing the air raises its temperature, and there is friction between the washer and the barrel.", "Correct."],
      ["The tyre is hot and heats the pump.", "The heat is produced in the pump itself."],
      ["Air expanding in the barrel heats it.", "Expanding air cools; compressing it warms it."],
      ["The sun heats the metal barrel.", "The warming happens even in the shade."],
    ],
    answer: "A", explanation: "Pushing the piston does work on the air, increasing its internal energy and temperature, and friction between the washer and the barrel wall also produces heat.",
    hints: ["Think about the energy transferred when you squash the air."] });

  q.match({ d: 2, skill: "UNDERSTANDING", objectives: [...SIPHON_HYD, ...PUMPS],
    stem: "Match each device with the correct description.",
    pairs: [
      ["Siphon", "Carries liquid over a barrier to a lower level without a pump"],
      ["Hydraulic jack", "Passes pressure through oil to lift a heavy load"],
      ["Blair pump", "A lift pump that raises water from a well"],
      ["Bicycle pump", "A force pump that pushes air through an outlet valve"],
    ],
    explanation: "Siphon: flow over a barrier; hydraulic jack: pressure in a liquid multiplies force; Blair pump: lift pump; bicycle pump: force pump." });

  q.struct({ d: 4, skill: "UNDERSTANDING", examStyle: true, objectives: [...PUMPS, ...ATM],
    stem: "A family uses a lift pump with its barrel at ground level to draw water from a well.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe what happens during the upstroke of the pump.",
        points: ["The piston rises and its valve is closed by the water above it", "The pressure in the barrel below the piston falls, so atmospheric pressure pushes water from the well up through the inlet valve into the barrel", "The water above the piston is lifted and flows out of the spout"] }),
      P.manual({ label: "(b)", marks: 1, stem: "State the purpose of the inlet valve at the bottom of the barrel.",
        points: ["It stops water flowing back down into the well on the downstroke"] }),
      P.manual({ label: "(c)", marks: 2, stem: "The water in another well is 15 m below the ground. Explain why this pump cannot raise water from that well.",
        points: ["Atmospheric pressure can only push water up about 10 m (less at altitude)", "So the water cannot reach a barrel 15 m above it; the cylinder must be placed down in the water (or a different pump used)"] }),
    ],
    explanation: "Upstroke: the piston valve closes, the pressure below the piston falls, atmospheric pressure pushes water in, and water above the piston is lifted out. The inlet valve stops back-flow. Atmospheric pressure can only hold up about 10 m of water.",
    hints: ["Say what each valve is doing.", "How high can atmospheric pressure push a column of water?"] });

  q.struct({ d: 4, skill: "UNDERSTANDING", examStyle: true, objectives: SIPHON_HYD,
    stem: "On an irrigation scheme, farmers use plastic siphon tubes to carry water from a canal over its bank into field furrows that are lower than the water in the canal.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two conditions needed for a siphon tube to work.",
        points: ["The tube must be completely full of water (no air) when it is started", "The outlet must be lower than the water surface in the canal (and the bank less than about 10 m above the water)"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain, in terms of pressure, why water flows through the tube.",
        points: ["Atmospheric pressure on the canal surface pushes water up the short arm", "The column of water on the outlet side is taller, so the pressure at the top of the tube is greater on the canal side and water is pushed towards the outlet"] }),
      P.manual({ label: "(c)", marks: 1, stem: "Suggest why the flow stops if the canal water level falls below the end of the tube.",
        points: ["Air enters the tube and breaks the column of water"] }),
    ],
    explanation: "A siphon needs a full tube and an outlet below the supply surface. Atmospheric pressure drives the water up; the taller outlet column means the pressure at the bend is greater on the supply side. Air entering breaks the column.",
    hints: ["Compare the heights of the two arms of the tube above their water levels."] });

  q.card("FACT", "What is a siphon?", "A tube full of liquid that carries liquid over a barrier to a lower level without a pump.");
  q.card("FACT", "Conditions for a siphon", "Tube full of liquid; outlet below the liquid surface in the upper container; bend less than about 10 m above that surface (for water).");
  q.card("CONCEPT", "What drives a siphon?", "Atmospheric pressure on the upper liquid surface; the taller outlet arm makes the pressure at the bend greater on the inlet side.");
  q.card("FACT", "Principle of hydraulic systems", "Pressure applied to an enclosed liquid is passed on equally throughout it; liquids are almost incompressible.");
  q.card("FORMULA", "Force on the large piston of a hydraulic system", "F₂ = F₁ × A₂ ÷ A₁ (from F₁/A₁ = F₂/A₂). The large piston moves A₁/A₂ as far.");
  q.card("CONCEPT", "Car brakes: sequence", "Pedal → master cylinder piston → brake fluid passes pressure → wider wheel cylinder pistons → pads on discs → friction slows wheels.");
  q.card("CONCEPT", "Why does air in brake fluid make brakes spongy?", "Air is compressible, so the pressure squashes the air instead of moving the wheel pistons.");
  q.card("CONCEPT", "Lift pump upstroke", "Piston valve closed, inlet valve open: atmospheric pressure pushes water into the barrel; water above the piston is lifted out of the spout.");
  q.card("CONCEPT", "Lift pump downstroke", "Inlet valve closed, piston valve open: water passes through the piston to the space above it.");
  q.card("CONCEPT", "Bicycle pump strokes", "Push: washer seals, air compressed, tyre valve opens when barrel pressure > tyre pressure. Pull: tyre valve closes, air enters past the flexible washer.");
  q.card("FACT", "Maximum lift of a lift pump", "About 10 m of water at sea level (h = p ÷ ρg), less at high altitude.");
});

// =====================================================================================================================
const USES = O("7.3.3.4.2");
const CALC = O("7.3.3.4.3");
const LOSS = O("7.3.3.4.4");

concept("cs.physics.gears", {
  file: "physics/gears",
  keyPrefix: "physics.gears",
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", objectives: USES,
    stem: "What is a gear?",
    options: [
      ["A wheel with teeth around its edge that meshes with another gear to pass on turning", "Correct."],
      ["A wheel with a groove that carries a rope", "That is a pulley."],
      ["A rigid bar that turns about a pivot", "That is a lever."],
      ["A sloping surface used to raise loads", "That is an inclined plane."],
    ],
    answer: "A", explanation: "A gear is a toothed wheel; meshing gears pass on turning from one shaft to another." });

  q.mcq({ d: 1, skill: "RECALL", objectives: USES,
    stem: "In a pair of meshing gears, which gear is turned by the effort?",
    options: [
      ["The driver gear", "Correct."],
      ["The driven gear", "The driven gear is turned by the driver and turns the load."],
      ["The idler gear", "An idler sits between the driver and the driven gear."],
      ["The larger gear", "Either gear can be the driver, whatever its size."],
    ],
    answer: "A", explanation: "The driver gear is turned by the effort (motor, handle or pedals); it turns the driven gear." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: USES,
    stem: "Two gears are meshed together. The driver gear turns clockwise. In which direction does the driven gear turn?",
    options: [
      ["Anticlockwise", "Correct: meshing gears turn in opposite directions."],
      ["Clockwise", "That would need an idler gear between them, or a chain."],
      ["It depends on which gear is larger.", "The sizes affect the speed, not the direction."],
      ["It does not turn.", "It turns whenever the driver turns."],
    ],
    answer: "A", explanation: "The teeth push each other at the meeting point, so meshing gears always turn in opposite directions." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: USES,
    stem: "Placing an idler gear between a driver gear and a driven gear changes the speed of the driven gear.",
    answer: false,
    explanation: "False. An idler gear changes only the direction of the driven gear; the speed depends only on the numbers of teeth on the driver and driven gears." });

  q.short({ d: 2, skill: "RECALL", objectives: USES,
    stem: "What name is given to a gear placed between a driver gear and a driven gear so that both turn in the same direction?",
    accepted: ["idler gear", "idler", "an idler gear", "idle gear", "idler wheel"], wrong: ["bevel gear"],
    explanation: "An idler gear." });

  q.num({ d: 2, skill: "APPLICATION", daily: true, objectives: CALC,
    stem: "A driver gear with 15 teeth meshes with a driven gear with 60 teeth. What is the velocity ratio of the gears?",
    value: 4, answer: "4", wrong: [0.25, 900, 45],
    explanation: "VR = teeth on driven gear ÷ teeth on driver gear = 60 ÷ 15 = 4." });

  q.num({ d: 2, skill: "APPLICATION", objectives: CALC,
    stem: "A driver gear with 25 teeth turns at 120 turns per minute. It meshes with a driven gear of 75 teeth. How many turns per minute does the driven gear make?",
    value: 40, wrong: [360, 3, 4.17],
    explanation: "VR = 75 ÷ 25 = 3, so the driven gear turns at 120 ÷ 3 = 40 turns per minute." });

  q.num({ d: 3, skill: "APPLICATION", objectives: CALC,
    stem: "In a hand whisk, a handle gear with 45 teeth drives a small gear with 15 teeth. The handle is turned 20 times a minute. How many times a minute does the small gear turn?",
    value: 60, wrong: [6.67, 300, 3],
    explanation: "Each turn of the 45-tooth gear moves the 15-tooth gear on by 45 teeth, which is 3 turns. So 20 × 3 = 60 turns per minute.",
    hints: ["The small gear is the driven gear. How many of its turns does one turn of the big gear produce?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: CALC,
    stem: "Which pair of gears gives the largest turning force at the driven gear for a given effort?",
    options: [
      ["Driver 10 teeth, driven 50 teeth", "Correct: VR = 5, the largest force multiplier."],
      ["Driver 50 teeth, driven 10 teeth", "VR = 0.2: this multiplies speed, not force."],
      ["Driver 20 teeth, driven 20 teeth", "VR = 1: no change of force."],
      ["Driver 20 teeth, driven 40 teeth", "VR = 2: a smaller multiplier than 5."],
    ],
    answer: "A", explanation: "The larger the driven gear compared with the driver, the larger the VR, and the more the turning force is multiplied (while the output turns more slowly)." });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: USES,
    stem: "A cyclist is about to climb a steep hill. Which change of gear makes the pedals easier to push?",
    options: [
      ["Moving the chain to a larger sprocket on the back wheel", "Correct: the back wheel turns fewer times per pedal turn, with more turning force."],
      ["Moving the chain to a smaller sprocket on the back wheel", "This makes the bicycle faster but harder to pedal."],
      ["Moving the chain to a larger chainring at the pedals", "This makes the wheel turn more times per pedal turn: harder to push."],
      ["Changing gear makes no difference to the effort.", "Gears change the turning force needed."],
    ],
    answer: "A", explanation: "Wheel turns per pedal turn = chainring teeth ÷ back sprocket teeth. A larger back sprocket lowers this ratio, so each push on the pedals needs less force, although the bicycle moves less far per pedal turn.",
    hints: ["Wheel turns per pedal turn = chainring teeth ÷ back sprocket teeth."] });

  q.struct({ d: 3, skill: "APPLICATION", objectives: [...USES, ...CALC],
    stem: "A bicycle has a chainring of 44 teeth and a back sprocket of 11 teeth. The circumference of the back wheel is 2.1 m.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many times does the back wheel turn for one turn of the pedals?", value: 4, wrong: [0.25, 484],
        explanation: "44 ÷ 11 = 4 turns." }),
      P.num({ label: "(b)", marks: 1, stem: "How far does the bicycle move for one turn of the pedals?", value: 8.4, unit: "m", wrong: [2.1, 0.525],
        explanation: t`$4 \times 2.1 = 8.4\ \text{m}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "The cyclist pedals at 50 turns per minute. Calculate the speed of the bicycle in metres per second.", value: 7, answer: "7.0", unit: "m/s", wrong: [420, 0.168],
        explanation: t`Distance per minute $= 50 \times 8.4 = 420\ \text{m}$; speed $= \dfrac{420}{60} = 7.0\ \text{m/s}$.` }),
    ],
    explanation: "Wheel turns per pedal turn = 44 ÷ 11 = 4; distance per pedal turn = 4 × 2.1 = 8.4 m; at 50 pedal turns per minute the bicycle covers 420 m per minute = 7.0 m/s.",
    hints: ["Chainring teeth ÷ sprocket teeth gives wheel turns per pedal turn.", "Each wheel turn moves the bicycle one circumference."] });

  q.num({ d: 3, skill: "APPLICATION", objectives: CALC,
    stem: "A gear system has a velocity ratio of 6 and a mechanical advantage of 4.5. Calculate its efficiency.",
    value: 75, unit: "%", wrong: [133, 27, 1.33],
    explanation: "Efficiency = MA ÷ VR × 100% = 4.5 ÷ 6 × 100% = 75%.",
    hints: ["Efficiency = MA ÷ VR × 100%."] });

  q.num({ d: 3, skill: "APPLICATION", objectives: CALC,
    stem: "A gear system has a velocity ratio of 4 and an efficiency of 70%. What is its mechanical advantage?",
    value: 2.8, answer: "2.8", wrong: [5.71, 280, 17.5],
    explanation: "MA = efficiency × VR = 0.70 × 4 = 2.8.",
    hints: ["Rearrange efficiency = MA ÷ VR, using the efficiency as a decimal."] });

  q.num({ d: 4, skill: "APPLICATION", objectives: CALC,
    stem: "In a compound gear train, a 14-tooth driver meshes with a 42-tooth gear. A 16-tooth gear fixed to the same shaft as the 42-tooth gear meshes with an 80-tooth output gear. What is the overall velocity ratio?",
    value: 15, wrong: [8, 5.6, 0.067],
    explanation: "First pair: 42 ÷ 14 = 3. Second pair: 80 ÷ 16 = 5. Gears on the same shaft turn together, so the overall VR = 3 × 5 = 15.",
    hints: ["Work out the VR of each meshing pair.", "Multiply the VRs of the pairs (do not add them)."] });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: USES,
    stem: "Three gears A, B and C are in a row: A meshes with B, and B meshes with C. Gear A turns clockwise. In which direction does gear C turn?",
    options: [
      ["Clockwise", "Correct: B turns anticlockwise, so C turns clockwise."],
      ["Anticlockwise", "B turns anticlockwise; C turns opposite to B."],
      ["It depends on the number of teeth on B.", "The number of teeth affects speed, not direction."],
      ["C cannot turn because B is in the way.", "B passes the motion on."],
    ],
    answer: "A", explanation: "Each meshing pair turns in opposite directions: A clockwise, B anticlockwise, C clockwise. B acts as an idler gear.",
    hints: ["Mark the direction of each gear in turn."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: USES,
    stem: "In a hand drill, the handle turns a large gear that drives a small gear on the drill bit. What is the advantage of this arrangement?",
    options: [
      ["The drill bit turns much faster than the handle.", "Correct: the gears multiply speed."],
      ["The drill bit turns with a larger turning force than the handle.", "A small driven gear turns faster but with less turning force."],
      ["The drill bit turns in the same direction without any extra gears.", "Speed is the reason for the gear sizes."],
      ["The effort needed is reduced to zero.", "Effort is always needed."],
    ],
    answer: "A", explanation: "A large driver turning a small driven gear has a VR less than 1, so the drill bit spins faster than the handle (with less turning force).",
    hints: ["Which turns faster: the large gear or the small gear it drives?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: LOSS,
    stem: "Why is the efficiency of a gear system always less than 100%?",
    options: [
      ["Some work is wasted against friction between the teeth and in the bearings.", "Correct."],
      ["The driven gear always has more teeth than the driver.", "This is not true, and it is not the reason."],
      ["Gears create extra energy that is lost as sound.", "Machines cannot create energy."],
      ["The velocity ratio is always less than 1.", "VR can be greater or less than 1."],
    ],
    answer: "A", explanation: "Friction between the meshing teeth and in the bearings turns some of the work input into heat (and sound), so the useful work output is less than the work input." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: LOSS,
    stem: "How can the efficiency of a bicycle's chain and gears be improved?",
    options: [
      ["Clean and oil the chain and sprockets regularly.", "Correct: this reduces friction."],
      ["Use a heavier, thicker chain.", "Heavier parts waste more energy."],
      ["Let the chain become rusty and stiff.", "Rust increases friction."],
      ["Add sand to the chain to improve grip.", "Grit increases friction and wear."],
    ],
    answer: "A", explanation: "Lubricating and cleaning the chain, sprockets and bearings reduces friction, so less of the rider's work is wasted as heat." });

  q.match({ d: 2, skill: "UNDERSTANDING", objectives: USES,
    stem: "Match each machine with what its gears do.",
    pairs: [
      ["Hand drill", "Make the drill bit spin faster than the handle"],
      ["Low gear in a vehicle gearbox", "Give a large turning force for starting and climbing"],
      ["Clock", "Make the hands turn at different, correct speeds"],
      ["Bicycle on a hill", "Make the pedals easier to push by using a larger back sprocket"],
    ],
    explanation: "Gears trade speed for turning force or the reverse, and can change the direction of rotation." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true, objectives: [...CALC, ...LOSS],
    stem: "A winch has a driver gear with 20 teeth, turned by a handle, and a driven gear with 50 teeth, which turns a drum. The handle and the drum have the same radius. An effort of 30 N on the handle raises a load of 60 N.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the velocity ratio.", value: 2.5, answer: "2.5", wrong: [0.4, 1000],
        explanation: "VR = 50 ÷ 20 = 2.5." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mechanical advantage.", value: 2, answer: "2.0", wrong: [0.5, 1800],
        explanation: "MA = load ÷ effort = 60 ÷ 30 = 2.0." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the efficiency of the winch.", value: 80, unit: "%", wrong: [125, 5],
        explanation: "Efficiency = 2.0 ÷ 2.5 × 100% = 80%." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of improving the efficiency of the winch.",
        points: ["Lubricate the gear teeth and bearings with oil or grease", "Use ball bearings, or keep the teeth clean and free of grit, or use lighter moving parts"] }),
    ],
    explanation: "VR = 50/20 = 2.5; MA = 60/30 = 2.0; efficiency = 80%. Lubrication, ball bearings and clean teeth reduce friction losses.",
    hints: ["VR = driven teeth ÷ driver teeth.", "Efficiency = MA ÷ VR × 100%."] });

  q.card("FACT", "Driver and driven gears", "The driver gear is turned by the effort; it turns the driven gear, which turns the load.");
  q.card("FORMULA", "Velocity ratio of a pair of gears", "VR = teeth on driven gear ÷ teeth on driver gear = turns of driver ÷ turns of driven.");
  q.card("CONCEPT", "Large driven gear vs small driven gear", "Large driven gear: turns slowly with a large turning force. Small driven gear: turns fast with a small turning force.");
  q.card("FACT", "Direction rules for gears", "Meshing gears turn in opposite directions; an idler gear makes them turn the same way; chain-linked sprockets turn the same way.");
  q.card("FORMULA", "Efficiency of gears", "Efficiency = MA ÷ VR × 100%, where MA = load ÷ effort.");
  q.card("FORMULA", "Compound gear train", "Overall VR = product of the VRs of each meshing pair.");
  q.card("FORMULA", "Bicycle: wheel turns per pedal turn", "Chainring teeth ÷ back sprocket teeth. A larger back sprocket makes hills easier.");
  q.card("CONCEPT", "Energy losses in gears and how to reduce them", "Friction between teeth and in bearings; reduce it with oil or grease, ball bearings and clean teeth.");
  q.card("FACT", "Uses of gears", "Bicycles, vehicle gearboxes, hand drills, egg beaters, clocks and watches.");
});
