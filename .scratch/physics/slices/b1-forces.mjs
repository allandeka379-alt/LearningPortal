import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));

// =====================================================================================================================
concept("phys.forces.mass-weight", {
  file: "forces/mass-weight",
  keyPrefix: "forces.weight",
  objectives: { cambridge: ["1.3.1", "1.3.2", "1.3.3"], zimsec: ["3.2.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the weight of an object?",
    options: [["The amount of matter in it", "That is mass."], ["The gravitational force on it", "Correct."], ["Its mass per unit volume", "That is density."], ["The force needed to lift it quickly", "Not a definition."]],
    answer: "B", explanation: "Weight is the gravitational force on an object that has mass, measured in newtons." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "In which unit is weight measured?",
    options: [["kilogram", "That is the unit of mass."], ["newton", "Correct: weight is a force."], ["gram", "A unit of mass."], ["N/kg", "That is the unit of g."]],
    answer: "B", explanation: "Weight is a force, so it is measured in newtons." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A sack of maize meal has a mass of $20\ \text{kg}$. Taking $g = 9.8\ \text{N/kg}$, calculate its weight.`,
    value: 196, unit: "N", wrong: [2.04, 20, 29.8],
    explanation: t`$W = mg = 20 \times 9.8 = 196\ \text{N}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`An apple has a mass of $150\ \text{g}$. What is its weight on the Earth? Take $g = 9.8\ \text{N/kg}$.`,
    value: 1.47, answer: "1.47", unit: "N", wrong: [1470, 147, 15.3],
    explanation: t`Convert to kilograms: $0.150\ \text{kg}$. $W = 0.150 \times 9.8 = 1.47\ \text{N}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A force meter shows that a rock weighs $34.3\ \text{N}$ on the Earth. Taking $g = 9.8\ \text{N/kg}$, what is the mass of the rock?`,
    value: 3.5, answer: "3.5", unit: "kg", wrong: [336, 0.286, 34.3],
    explanation: t`$m = \dfrac{W}{g} = \dfrac{34.3}{9.8} = 3.5\ \text{kg}$.`,
    hints: ["Rearrange W = mg."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`A robotic rover has a mass of $900\ \text{kg}$. The gravitational field strength is $9.8\ \text{N/kg}$ on the Earth and $3.7\ \text{N/kg}$ on Mars.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the rover's mass on Mars?", value: 900, unit: "kg", wrong: [3330, 340], explanation: "Mass does not change: 900 kg." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the rover's weight on Mars.", value: 3330, unit: "N", wrong: [8820, 243], explanation: t`$W = mg = 900 \times 3.7 = 3330\ \text{N}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "By how many newtons is its weight smaller on Mars than on the Earth?", value: 5490, unit: "N", wrong: [8820, 3330], explanation: t`Earth: $900 \times 9.8 = 8820\ \text{N}$; $8820 - 3330 = 5490\ \text{N}$.` }),
    ],
    explanation: "Mass is the same everywhere (900 kg); weight = mg changes with g: 8820 N on the Earth, 3330 N on Mars.",
    hints: ["Mass is the amount of matter.", "Weight = mass × g for that planet."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An astronaut's mass is smaller on the Moon than on the Earth.",
    answer: false, explanation: "Mass is the quantity of matter and does not change. Her weight is smaller on the Moon because g is smaller there." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which instrument measures weight directly?",
    options: [["A beam balance", "A beam balance compares weights to find mass."], ["A force meter (spring balance)", "Correct."], ["A measuring cylinder", "Measures volume."], ["A micrometer", "Measures small lengths."]],
    answer: "B", explanation: "A force meter measures a force in newtons, so it measures weight directly." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the statements about g near the Earth's surface.",
    template: "As a gravitational field strength, g is about 9.8 {{blank:a}}; as the acceleration of free fall it is about 9.8 {{blank:b}}.",
    blanks: [{ id: "a", input: "select", choices: ["N/kg", "m/s²", "kg/N", "N"], accepted: ["N/kg"], wrong: "N" }, { id: "b", input: "select", choices: ["N/kg", "m/s²", "kg/N", "N"], accepted: ["m/s²"], wrong: "N" }],
    explanation: "The units N/kg and m/s² are equivalent: 1 N/kg = 1 m/s²." });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement with the correct quantity.",
    pairs: [["Measured in kilograms", "Mass"], ["Measured in newtons", "Weight"], ["Measured in N/kg", "Gravitational field strength"], ["The same on the Earth and the Moon", "Mass of an object"]],
    explanation: "Mass (kg) never changes with place; weight (N) = mass × g (N/kg)." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A potato is taken to the Moon. Which instrument would give the same reading there as on the Earth?",
    options: [["A force meter", "It measures weight, which is smaller on the Moon."], ["A beam balance", "Correct: both pans are in the same field, so it balances the same masses."], ["Both", "The force meter reading changes."], ["Neither", "The beam balance still balances the same masses."]],
    answer: "B", explanation: "A beam balance compares two weights in the same field, so it balances when the masses are equal, whatever g is.",
    hints: ["Which instrument compares two objects in the same gravitational field?"] });

  q.short({ d: 2, skill: "RECALL",
    stem: "What is the name for the force per unit mass on an object in a gravitational field?",
    accepted: ["gravitational field strength", "the gravitational field strength", "g", "field strength"], wrong: ["weight", "density"],
    explanation: "Gravitational field strength, g = W/m, in N/kg." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A $2.0\ \text{kg}$ mass hangs from a force meter on a planet, and the meter reads $22\ \text{N}$. What is the gravitational field strength on that planet?`,
    value: 11, unit: "N/kg", wrong: [44, 0.091, 24],
    explanation: t`$g = \dfrac{W}{m} = \dfrac{22}{2.0} = 11\ \text{N/kg}$.`,
    hints: ["g = W/m."] });

  q.tf({ d: 1, skill: "RECALL",
    stem: "Weight is a vector quantity that acts towards the centre of the planet.",
    answer: true, explanation: "Weight is a force, so it has a direction: towards the centre of the Earth (downwards)." });

  q.mcq({ d: 4, skill: "ANALYSIS",
    stem: "A learner says, 'My weight is 55 kg.' Which correction is best?",
    options: [["Your mass is 55 kg; your weight is about 540 N.", "Correct: W = 55 × 9.8 ≈ 540 N."], ["Your weight is 55 N.", "This confuses the units the other way."], ["Your weight is 5.6 kg.", "Dividing by g gives nothing meaningful here."], ["The statement is correct.", "Weight is a force, in newtons."]],
    answer: "A", explanation: "Kilograms measure mass. The weight is mg = 55 × 9.8 ≈ 540 N.",
    hints: ["Weight is a force; what unit do forces use?"] });

  q.card("DEFINITION", "Define **mass**.", "The quantity of matter in an object; measured in kilograms; it is the same everywhere.");
  q.card("DEFINITION", "Define **weight**.", "The gravitational force on an object that has mass; measured in newtons.");
  q.card("FORMULA", "How are weight, mass and g related?", "W = mg.");
  q.card("DEFINITION", "Define **gravitational field strength**.", "The gravitational force per unit mass, g = W/m, in N/kg.");
  q.card("FACT", "What is g on the Earth's surface?", "About 9.8 N/kg (equal to the acceleration of free fall, 9.8 m/s²).");
  q.card("CONCEPT", "Why does an astronaut weigh less on the Moon?", "The Moon's g is smaller (about 1.6 N/kg); her mass is unchanged.");
  q.card("CONCEPT", "Balance or force meter: which measures what?", "A balance compares masses; a force meter measures weight (force).");
  q.card("FACT", "Is weight a scalar or a vector?", "A vector: it is a force acting towards the centre of the planet.");
});

// =====================================================================================================================
concept("phys.forces.elasticity", {
  file: "forces/elasticity",
  keyPrefix: "forces.hooke",
  objectives: { cambridge: ["1.5.1.2", "1.5.1.9"], zimsec: ["3.1.3", "3.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the extension of a spring?",
    options: [["Its stretched length", "The extension is the increase in length."], ["The increase in its length when a load is added", "Correct."], ["The load on it", "That is the force."], ["Its original length", "That is the starting length."]],
    answer: "B", explanation: "Extension = stretched length − original length." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A spring is $15.0\ \text{cm}$ long with no load and $19.5\ \text{cm}$ long with a load attached. What is its extension?`,
    value: 4.5, answer: "4.5", unit: "cm", tol: 0.05, wrong: [19.5, 34.5, 15],
    explanation: t`Extension $= 19.5 - 15.0 = 4.5\ \text{cm}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true, applies: ["cambridge", "zimsec"],
    stem: t`A load of $6.0\ \text{N}$ stretches a spring by $0.030\ \text{m}$. Calculate the spring constant.`,
    value: 200, unit: "N/m", wrong: [0.18, 0.005, 2],
    explanation: t`$k = \dfrac{F}{x} = \dfrac{6.0}{0.030} = 200\ \text{N/m}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A spring has a spring constant of $250\ \text{N/m}$. What load stretches it by $0.024\ \text{m}$ (within its limit of proportionality)?`,
    value: 6, answer: "6.0", unit: "N", wrong: [10417, 0.000096, 60],
    explanation: t`$F = kx = 250 \times 0.024 = 6.0\ \text{N}$.`,
    hints: ["F = kx."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A spring with spring constant $0.50\ \text{N/cm}$ has a $1.5\ \text{N}$ load hung on it. What is its extension?`,
    value: 3, answer: "3.0", unit: "cm", wrong: [0.75, 0.33, 300],
    explanation: t`$x = \dfrac{F}{k} = \dfrac{1.5}{0.50} = 3.0\ \text{cm}$.`,
    hints: ["Rearrange F = kx to x = F/k; the answer is in cm because k is in N/cm."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A learner adds loads to a spring and records its length.\n\n| Load / N | 0 | 1.5 | 3.0 | 4.5 | 6.0 | 7.5 |\n| --- | --- | --- | --- | --- | --- | --- |\n| Length / cm | 20.0 | 22.5 | 25.0 | 27.5 | 30.0 | 33.8 |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the extension when the load is 4.5 N.", value: 7.5, answer: "7.5", unit: "cm", tol: 0.05, wrong: [27.5, 2.5], explanation: "27.5 − 20.0 = 7.5 cm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the spring constant in N/cm, using the readings up to 6.0 N.", value: 0.6, answer: "0.60", unit: "N/cm", wrong: [1.67, 0.4], explanation: "Each 1.5 N adds 2.5 cm, so k = 1.5/2.5 = 0.60 N/cm." }),
      P.mcq({ label: "(c)", stem: "What happens between 6.0 N and 7.5 N?", options: [["The spring has passed its limit of proportionality: the extension is no longer proportional to the load.", "Correct: 1.5 N gives 3.8 cm instead of 2.5 cm."], ["The spring obeys Hooke's law more closely.", "The extension has jumped."], ["The spring has broken.", "It still has a length."], ["The learner made no error and nothing changed.", "The increase is larger than before."]], answer: "A", explanation: "Up to 6.0 N each 1.5 N adds 2.5 cm; the last 1.5 N adds 3.8 cm, so the spring is beyond its limit of proportionality." }),
    ],
    explanation: "Extensions 0, 2.5, 5.0, 7.5, 10.0 cm are proportional to the load (k = 0.60 N/cm) up to 6.0 N; the jump to 13.8 cm at 7.5 N shows the limit of proportionality has been passed.",
    hints: ["Subtract the original length (20.0 cm) from each length.", "Look for where the equal steps stop."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "For a spring obeying Hooke's law, what does a graph of extension against load look like?",
    options: [["A straight line through the origin", "Correct."], ["A curve getting steeper", "Not for a spring obeying Hooke's law."], ["A horizontal line", "The extension changes with load."], ["A straight line that does not pass through the origin", "No load means no extension."]],
    answer: "A", explanation: "Extension ∝ load, so the graph is a straight line through the origin (up to the limit of proportionality)." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hooke's law uses the total length of the spring, not its extension.",
    answer: false, explanation: "Hooke's law relates the load to the extension (the increase in length), not to the total length." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Two springs carry the same load. Spring X stretches 2 cm and spring Y stretches 5 cm. Which statement is correct?",
    options: [["X is stiffer and has the larger spring constant.", "Correct."], ["Y is stiffer and has the larger spring constant.", "Y stretches more, so it is less stiff."], ["Both have the same spring constant.", "They stretch differently under the same load."], ["Spring constant does not depend on stiffness.", "k measures stiffness."]],
    answer: "A", explanation: "k = F/x: the same F with a smaller x gives a larger k, so X is stiffer." });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to the point on a load-extension graph beyond which the extension is no longer proportional to the load?",
    accepted: ["limit of proportionality", "the limit of proportionality"], wrong: ["elastic limit", "breaking point"],
    explanation: "This is the limit of proportionality." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: ["zimsec"],
    stem: "Match each object with the effect of the forces on it.",
    pairs: [["A rope holding up a bucket of water", "Tension"], ["The legs of a loaded stool", "Compression"], ["A guitar string being tightened", "Tension"], ["A pillar holding up a roof", "Compression"]],
    explanation: "Stretching forces cause tension; squashing forces cause compression." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner investigates how the extension of a spring depends on the load.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how she should carry out the experiment.",
        points: ["Hangs the spring from a clamp beside a vertical metre rule and records its unloaded length (reading at eye level)", "Adds known loads (e.g. 1 N masses) one at a time and records the length each time", "Calculates each extension (length − original length) and plots extension against load"] }),
      P.mcq({ label: "(b)", stem: "Why should she check the spring's length again after removing all the loads?", options: [["To see whether it has gone beyond its elastic behaviour and stayed stretched", "Correct."], ["To measure the spring constant", "That needs loads."], ["To make the spring stiffer", "Removing loads does not change stiffness."], ["To find the weight of the spring", "It is not about the spring's weight."]], answer: "A", explanation: "If it does not return to its original length, it has been permanently stretched." }),
    ],
    explanation: "Measure the original length, add loads in steps, find extensions by subtraction, plot extension against load and check the spring returns to its original length.",
    hints: ["What must be subtracted to get the extension?"] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: t`Two identical springs, each with spring constant $40\ \text{N/m}$, hang one below the other (in series). A load of $2.0\ \text{N}$ hangs from the bottom spring. What is the total extension of the pair?`,
    value: 0.1, answer: "0.10", unit: "m", wrong: [0.05, 0.025, 80],
    explanation: t`Each spring carries the full $2.0\ \text{N}$, so each stretches $\dfrac{2.0}{40} = 0.050\ \text{m}$; together $0.10\ \text{m}$.`,
    hints: ["The load pulls on BOTH springs with the full 2.0 N.", "Add the two extensions."] });

  q.tf({ d: 1, skill: "RECALL",
    stem: "Forces can change the shape and size of an object as well as its motion.",
    answer: true, explanation: "Forces can stretch, squash, bend or twist objects, as well as speed them up, slow them down or change their direction." });

  q.card("DEFINITION", "Define **extension**.", "The increase in length of a spring or wire: stretched length − original length.");
  q.card("FORMULA", "What is Hooke's law?", "F = kx: the extension is proportional to the load, up to the limit of proportionality.");
  q.card("DEFINITION", "Define the **spring constant**.", "The force per unit extension, k = F/x, in N/m or N/cm.");
  q.card("DEFINITION", "What is the **limit of proportionality**?", "The point beyond which extension is no longer proportional to load (the graph stops being straight).");
  q.card("CONCEPT", "What does a stiffer spring have?", "A larger spring constant: more force is needed per unit extension.");
  q.card("CONCEPT", "Shape of an extension-load graph for a spring obeying Hooke's law?", "A straight line through the origin.");
  q.card("VOCABULARY", "What are tension and compression?", "Tension: being stretched. Compression: being squashed.", undefined, { applies: ["zimsec"] });
  q.card("FACT", "What is 1 N/cm in N/m?", "100 N/m.");
});

// =====================================================================================================================
concept("phys.forces.resultant-newton", {
  file: "forces/resultant-newton",
  keyPrefix: "forces.newton",
  objectives: { cambridge: ["1.5.1.4", "1.5.1.5", "1.5.1.11"], zimsec: ["3.2.3", "3.2.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "An object has no resultant force acting on it. Which statement is correct?",
    options: [["It must be at rest.", "It could also be moving at constant velocity."], ["It is at rest or moving at constant velocity.", "Correct: Newton's first law."], ["It must be accelerating.", "Acceleration needs a resultant force."], ["It must be slowing down.", "Slowing down needs a resultant force."]],
    answer: "B", explanation: "Newton's first law: with no resultant force an object stays at rest or keeps moving in a straight line at constant speed." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A resultant force of $600\ \text{N}$ acts on a motorbike and rider of total mass $240\ \text{kg}$. Calculate the acceleration.`,
    value: 2.5, answer: "2.5", unit: "m/s²", wrong: [144000, 0.4, 360],
    explanation: t`$a = \dfrac{F}{m} = \dfrac{600}{240} = 2.5\ \text{m/s}^2$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`What resultant force is needed to give a $1500\ \text{kg}$ car an acceleration of $1.8\ \text{m/s}^2$?`,
    value: 2700, unit: "N", wrong: [833, 1501.8, 0.0012],
    explanation: t`$F = ma = 1500 \times 1.8 = 2700\ \text{N}$.` });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`A $50\ \text{kg}$ crate is pulled along the ground with a horizontal force of $180\ \text{N}$. Friction on the crate is $80\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the resultant force on the crate.", value: 100, unit: "N", wrong: [260, 180], explanation: "180 − 80 = 100 N forwards." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the acceleration of the crate.", value: 2, answer: "2.0", unit: "m/s²", wrong: [3.6, 5.2], explanation: t`$a = \dfrac{100}{50} = 2.0\ \text{m/s}^2$.` }),
    ],
    explanation: "Resultant force = 180 − 80 = 100 N; a = F/m = 100/50 = 2.0 m/s².",
    hints: ["Find the resultant force first.", "Then use F = ma."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A car travels along a straight road at a constant 80 km/h. How do the forward driving force and the backward resistive forces compare?",
    options: [["The driving force is larger.", "Then the car would accelerate."], ["They are equal.", "Correct: zero resultant force, constant velocity."], ["The resistive forces are larger.", "Then the car would slow down."], ["There are no forces on the car.", "Air resistance and friction act on it."]],
    answer: "B", explanation: "Constant velocity means zero resultant force, so the forward and backward forces balance." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A resultant force is needed to keep an object moving at constant velocity.",
    answer: false, explanation: "By Newton's first law, an object keeps moving at constant velocity with NO resultant force. A resultant force is needed to change its velocity." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which statement is Newton's third law?",
    options: [["F = ma", "That is the second law."], ["An object stays at rest unless a force acts.", "That is the first law."], ["If A pushes on B, B pushes on A with an equal and opposite force.", "Correct."], ["Force equals rate of change of momentum.", "Another form of the second law."]],
    answer: "C", explanation: "Newton's third law: forces come in equal and opposite pairs acting on different objects." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A swimmer pushes the water backwards with her hands. What is the third-law partner of this force?",
    options: [["Her weight", "Weight is a gravitational force between her and the Earth."], ["The water pushing her forwards", "Correct."], ["The buoyancy pushing her up", "That is a different interaction."], ["Friction from the pool floor", "She is not touching the floor."]],
    answer: "B", explanation: "She pushes the water backwards, so the water pushes her forwards with an equal force: that is how she swims.",
    hints: ["Swap the two objects in 'hand pushes water backwards'."] });

  q.short({ d: 2, skill: "RECALL", applies: ["zimsec"],
    stem: "What name is given to the tendency of an object to resist a change in its state of motion?",
    accepted: ["inertia"], wrong: ["momentum", "friction"],
    explanation: "Inertia; the larger the mass, the greater the inertia." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A trolley accelerates at $0.60\ \text{m/s}^2$ when a resultant force of $1.5\ \text{N}$ acts on it. What is its mass?`,
    value: 2.5, answer: "2.5", unit: "kg", wrong: [0.9, 0.4, 2.1],
    explanation: t`$m = \dfrac{F}{a} = \dfrac{1.5}{0.60} = 2.5\ \text{kg}$.`,
    hints: ["Rearrange F = ma."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "The same resultant force acts on an empty minibus and on the same minibus full of passengers. Which statement is correct?",
    options: [["The full minibus has the smaller acceleration.", "Correct: a = F/m, and its mass is larger."], ["Both have the same acceleration.", "The masses differ."], ["The full minibus has the larger acceleration.", "More mass means less acceleration for the same force."], ["Neither accelerates.", "A resultant force always causes acceleration."]],
    answer: "A", explanation: "a = F/m: for the same force, a larger mass gives a smaller acceleration.",
    hints: ["Use a = F/m."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the law of motion that best explains it.",
    pairs: [["Passengers lurch forward when a kombi brakes suddenly", "First law (inertia)"], ["A heavier trolley needs more force for the same acceleration", "Second law (F = ma)"], ["A rifle recoils when it is fired", "Third law (equal and opposite forces)"]],
    explanation: "Inertia (first law), F = ma (second law), action-reaction pairs (third law)." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A lift of mass $800\ \text{kg}$ is pulled upwards by its cable. Take $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the weight of the lift.", value: 7840, unit: "N", wrong: [800, 81.6], explanation: t`$W = 800 \times 9.8 = 7840\ \text{N}$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`The tension in the cable is $8640\ \text{N}$. Calculate the acceleration of the lift.`, value: 1, answer: "1.0", unit: "m/s²", wrong: [10.8, 0.1], explanation: t`Resultant $= 8640 - 7840 = 800\ \text{N}$ upwards; $a = \dfrac{800}{800} = 1.0\ \text{m/s}^2$.` }),
      P.mcq({ label: "(c)", stem: "What is the tension when the lift moves upwards at a constant speed?", options: [["7840 N", "Correct: balanced forces."], ["8640 N", "That gives an acceleration."], ["0 N", "The cable must still hold the lift up."], ["800 N", "That is the resultant in (b)."]], answer: "A", explanation: "Constant velocity needs zero resultant force: tension = weight = 7840 N." }),
    ],
    explanation: "Weight 7840 N; with 8640 N tension, the resultant is 800 N up, a = 1.0 m/s²; at constant speed tension equals weight.",
    hints: ["Resultant force = tension − weight.", "Constant speed means zero resultant force."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the statement of Newton's second law.",
    template: "The resultant force equals {{blank:a}} × acceleration, and the acceleration is in the {{blank:b}} direction as the resultant force.",
    blanks: [{ id: "a", input: "select", choices: ["mass", "weight", "velocity"], accepted: ["mass"], wrong: "weight" }, { id: "b", input: "select", choices: ["same", "opposite"], accepted: ["same"], wrong: "opposite" }],
    explanation: "F = ma, with the acceleration in the same direction as the resultant force." });

  q.mcq({ d: 4, skill: "ANALYSIS",
    stem: "A book rests on a table. Which pair of forces is a Newton's third-law pair?",
    options: [["The book's weight and the table's upward push on the book", "Both act on the book: they are balanced forces, not a third-law pair."], ["The Earth's pull on the book and the book's pull on the Earth", "Correct: same type, equal, opposite, on different objects."], ["The table's push on the book and the floor's push on the table", "These act on different objects but are not partners."], ["The book's weight and the table's weight", "Unrelated forces."]],
    answer: "B", explanation: "Third-law pairs are the same type of force acting on two different objects: the Earth pulls the book, and the book pulls the Earth.",
    hints: ["A third-law pair acts on two DIFFERENT objects."] });

  q.card("CONCEPT", "State Newton's first law.", "An object stays at rest or keeps moving in a straight line at constant speed unless a resultant force acts on it.");
  q.card("FORMULA", "State Newton's second law as an equation.", "F = ma, with the acceleration in the direction of the resultant force.");
  q.card("CONCEPT", "State Newton's third law.", "If A exerts a force on B, B exerts an equal and opposite force on A (same type, different objects).");
  q.card("DEFINITION", "What is the **resultant force**?", "The single force with the same effect as all the forces acting together.");
  q.card("DEFINITION", "What is **inertia**?", "The tendency of an object to resist changes to its motion; larger mass, larger inertia.", undefined, { applies: ["zimsec"] });
  q.card("CONCEPT", "What resultant force acts on a car at constant velocity?", "Zero: driving force balances the resistive forces.");
  q.card("CONCEPT", "Why don't third-law pairs cancel out?", "They act on different objects.");
  q.card("CONCEPT", "Same force on a larger mass?", "Smaller acceleration (a = F/m).");
});

// =====================================================================================================================
concept("phys.forces.friction-drag", {
  file: "forces/friction-drag",
  keyPrefix: "forces.friction",
  objectives: { cambridge: ["1.5.1.6", "1.5.1.7", "1.5.1.8"], zimsec: ["3.3.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which statement about friction between two solid surfaces is correct?",
    options: [["It always speeds objects up.", "Friction opposes motion."], ["It opposes motion and can cause heating.", "Correct."], ["It only acts on moving objects in water.", "That is drag in a liquid."], ["It acts at right angles to the surfaces.", "It acts along the surfaces."]],
    answer: "B", explanation: "Solid friction opposes (impedes) relative motion and produces heating." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is air resistance?",
    options: [["Friction (drag) on an object moving through air", "Correct."], ["The weight of the air", "That gives atmospheric pressure."], ["A force that pushes objects forwards", "It opposes motion."], ["Friction between two solids", "That is solid friction."]],
    answer: "A", explanation: "Air resistance is the drag force on an object moving through a gas." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A girl pulls a sledge of firewood across the ground at a constant speed with a horizontal force of $95\ \text{N}$. What is the friction force on the sledge?`,
    value: 95, unit: "N", wrong: [0, 190, 47.5],
    explanation: "Constant speed means zero resultant force, so friction = 95 N, opposite to the pull." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A $40\ \text{kg}$ box is pushed with a horizontal force of $260\ \text{N}$ and accelerates at $2.5\ \text{m/s}^2$. What is the friction force on the box?`,
    value: 160, unit: "N", wrong: [100, 360, 260],
    explanation: t`Resultant force $= ma = 40 \times 2.5 = 100\ \text{N}$; friction $= 260 - 100 = 160\ \text{N}$.`,
    hints: ["First find the resultant force with F = ma.", "Friction = push − resultant force."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The air resistance on a cyclist increases as she rides faster.",
    answer: true, explanation: "Drag increases with speed, which is why riding fast needs much more effort." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the examples where friction is useful.",
    options: [["Brake pads stopping a bicycle wheel", "Useful."], ["Tyres gripping a tarred road", "Useful."], ["Wear on moving engine parts", "Unwanted."], ["Shoes gripping the ground when walking", "Useful."], ["Heating of a bicycle chain that wastes energy", "Unwanted."], ["Extra fuel used against air resistance", "Unwanted."]],
    answer: ["A", "B", "D"], explanation: "Braking, grip and walking all depend on friction; wear, wasted heating and extra fuel use are its disadvantages." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do engineers put oil between the moving parts of an engine?",
    options: [["To increase friction so the parts grip", "Oil reduces friction."], ["To reduce friction, so less energy is wasted as heat and the parts wear less", "Correct."], ["To make the engine heavier", "Oil does not do this usefully."], ["To stop the engine overheating by insulating it", "Oil lubricates; it does not insulate."]],
    answer: "B", explanation: "Lubrication lets the surfaces slide past each other easily, reducing friction, heating and wear." });

  q.short({ d: 2, skill: "RECALL", applies: ["zimsec"],
    stem: "Name the small steel balls placed between a wheel and its axle so that the surfaces roll instead of sliding.",
    accepted: ["ball bearings", "bearings", "ball bearing"], wrong: ["rivets"],
    explanation: "Ball bearings make the surfaces roll over each other, greatly reducing friction." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why are the fastest cars and fish streamlined?",
    options: [["To increase their weight", "Shape does not change weight."], ["To reduce the drag on them as they move", "Correct."], ["To increase the friction with the ground", "Streamlining is about the fluid."], ["To make them more stable when stationary", "Streamlining matters when moving."]],
    answer: "B", explanation: "A smooth, pointed shape lets air or water flow past easily, reducing drag.",
    hints: ["Think about the fluid flowing past the object."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with what it does to friction.",
    pairs: [["Adding deep tread to tyres", "Increases grip on the road"], ["Lubricating with grease", "Reduces sliding friction"], ["Streamlining a vehicle", "Reduces drag"], ["Spreading sand on a slippery path", "Increases friction underfoot"]],
    explanation: "Tread and sand increase friction; lubrication and streamlining reduce it." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A car of mass $1000\ \text{kg}$ is driven along a level road. The engine provides a constant forward force of $2000\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`At one moment the total resistive force (air resistance and friction) is $500\ \text{N}$. Calculate the car's acceleration.`, value: 1.5, answer: "1.5", unit: "m/s²", wrong: [2, 2.5], explanation: t`$a = \dfrac{2000 - 500}{1000} = 1.5\ \text{m/s}^2$.` }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the car eventually reaches a constant top speed.",
        points: ["As the car's speed increases, the air resistance increases", "so the resultant forward force (and the acceleration) decreases", "When the resistive forces equal 2000 N the resultant force is zero, so the speed stays constant"] }),
    ],
    explanation: "Resultant = 1500 N gives 1.5 m/s². Air resistance grows with speed until it balances the 2000 N driving force: then the resultant force is zero and the speed is constant.",
    hints: ["Resultant force = driving force − resistive force.", "What happens to air resistance as speed increases?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Drag on an object moving through water is usually much larger than drag at the same speed in air.",
    answer: true, explanation: "Water is far denser than air, so it pushes back much harder on a moving object." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why does a learner's hand get warm when she rubs it quickly on the bench?",
    options: [["Friction transfers energy, heating the surfaces.", "Correct."], ["Air resistance cools the hand.", "That would cool it."], ["The bench gives out heat.", "The heating comes from the rubbing."], ["Pressure on the hand increases its temperature.", "The rubbing, not the pressing, causes the heating."]],
    answer: "A", explanation: "Work done against friction transfers energy to the internal (thermal) stores of the surfaces.",
    hints: ["What does friction do to the surfaces apart from opposing motion?"] });

  q.card("DEFINITION", "Define **friction**.", "A force between surfaces in contact that opposes their relative motion and produces heating.");
  q.card("DEFINITION", "What is **drag**?", "Friction on an object moving through a fluid (liquid or gas); in air it is air resistance.");
  q.card("CONCEPT", "How does drag change with speed?", "It increases as speed increases.");
  q.card("FACT", "Give three useful effects of friction.", "Walking without slipping, braking, tyres gripping the road (also holding nails, striking matches).");
  q.card("FACT", "Give three disadvantages of friction.", "Wear of parts, heating that wastes energy, extra fuel needed.");
  q.card("FACT", "How can friction be reduced?", "Lubrication, ball bearings, smooth surfaces, streamlining, air cushions.");
  q.card("CONCEPT", "Why does a car reach a top speed?", "Air resistance grows with speed until it balances the driving force: zero resultant force.");
  q.card("CONCEPT", "What does streamlining do?", "Reduces drag by letting the fluid flow smoothly past the object.");
});

// =====================================================================================================================
concept("phys.forces.circular-motion", {
  file: "forces/circular-motion",
  keyPrefix: "forces.circular",
  objectives: { cambridge: ["1.5.1.12"], zimsec: ["3.3.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In which direction does the resultant force on an object moving in a circle at constant speed act?",
    options: [["Towards the centre of the circle", "Correct."], ["Away from the centre", "No outward force acts."], ["Along the direction of motion", "Then the speed would change."], ["There is no resultant force", "The direction keeps changing, so there must be one."]],
    answer: "A", explanation: "The centripetal (resultant) force acts towards the centre, at right angles to the motion." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A stone is whirled in a horizontal circle on a string. What provides the force towards the centre?",
    options: [["The weight of the stone", "Weight acts downwards."], ["The tension in the string", "Correct."], ["Air resistance", "Air resistance opposes motion along the path."], ["The stone's momentum", "Momentum is not a force."]],
    answer: "B", explanation: "The string pulls the stone inwards: tension provides the centripetal force." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What provides the centripetal force for the Moon orbiting the Earth?",
    options: [["Friction", "There is no surface contact."], ["The gravitational pull of the Earth", "Correct."], ["Air resistance", "There is almost no air in space."], ["The Moon's engines", "The Moon has none."]],
    answer: "B", explanation: "The Earth's gravitational attraction pulls the Moon towards the centre of its orbit." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A stone is whirled in a horizontal circle and the string breaks. How does the stone move immediately afterwards (seen from above)?",
    options: [["Straight outwards, away from the centre", "No outward force pushes it."], ["In a straight line along the tangent to the circle", "Correct: no resultant force, so it moves in a straight line."], ["It keeps going round the circle", "Without the inward force it cannot."], ["It stops at once", "It keeps its velocity."]],
    answer: "B", explanation: "With the inward force gone, the stone carries on in a straight line in the direction it was moving at that instant: along the tangent.",
    hints: ["Newton's first law: what happens with no resultant force?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An object moving in a circle at constant speed is accelerating.",
    answer: true, explanation: "Its direction, and so its velocity, keeps changing; the acceleration is towards the centre." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: ["cambridge"],
    stem: "A car goes round the same bend twice, the second time at a higher speed. What happens to the friction force needed to keep it on the bend?",
    options: [["It is larger.", "Correct: a larger speed needs a larger centripetal force."], ["It is smaller.", "Faster needs more force."], ["It is the same.", "The force depends on speed."], ["It becomes zero.", "Some force is always needed to turn."]],
    answer: "A", explanation: "With the same mass and radius, a larger speed needs a larger force towards the centre.",
    hints: ["Mass and radius stay the same; only the speed changes."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: ["cambridge"],
    stem: "A girl whirls a ball on a string at a steady speed, then pulls the string harder while keeping the speed the same. What happens to the circle?",
    options: [["The radius decreases.", "Correct: more force at the same speed and mass gives a tighter circle."], ["The radius increases.", "More inward force pulls it into a smaller circle."], ["The radius stays the same.", "The force has changed."], ["The ball stops.", "Its speed is kept the same."]],
    answer: "A", explanation: "With mass and speed constant, increasing the centripetal force decreases the radius.",
    hints: ["Speed and mass are kept constant."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each circular motion with the force that keeps it moving in a circle.",
    pairs: [["A car going round a roundabout", "Friction between tyres and road"], ["A satellite orbiting the Earth", "Gravitational attraction"], ["A conker whirled on a string", "Tension in the string"], ["An electron orbiting a nucleus (simple model)", "Electrostatic attraction"]],
    explanation: "Different forces can provide the centripetal force; it always acts towards the centre." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: ["cambridge"],
    stem: "A loaded truck and an empty truck take the same bend at the same speed. Which needs the larger centripetal force?",
    options: [["The loaded truck", "Correct: larger mass needs a larger force."], ["The empty truck", "Less mass needs less force."], ["Both need the same", "The masses differ."], ["Neither needs a force", "Turning always needs a force."]],
    answer: "A", explanation: "With speed and radius the same, the force needed increases with mass.",
    hints: ["Which quantity is different between the two trucks?"] });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to the resultant force towards the centre that keeps an object moving in a circle?",
    accepted: ["centripetal force", "centripetal", "the centripetal force"], wrong: ["centrifugal force"],
    explanation: "It is the centripetal force (centripetal means 'centre-seeking')." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A minibus takes a sharp bend on a gravel road.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why there must be a resultant force on the minibus as it goes round the bend at a constant speed.",
        points: ["Its direction of motion is changing, so its velocity is changing (it is accelerating)", "A change in velocity needs a resultant force, which acts towards the centre of the bend"] }),
      P.mcq({ label: "(b)", stem: "Which force provides this resultant force?", options: [["Friction between the tyres and the road", "Correct."], ["The weight of the minibus", "Weight acts downwards."], ["Air resistance", "Air resistance acts against the motion."], ["The engine's driving force", "That acts forwards."]], answer: "A", explanation: "Sideways friction on the tyres pushes the minibus towards the centre of the bend." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why the minibus may skid if the driver takes the bend too fast on loose gravel.",
        points: ["A higher speed needs a larger centripetal (friction) force", "Loose gravel can provide only a small friction force, so it is not enough and the minibus slides off in a straighter line (outwards from the curve)"] }),
    ],
    explanation: "Changing direction means accelerating, which needs an inward resultant force: tyre friction. Faster needs more friction than loose gravel can give, so the minibus skids.",
    hints: ["Velocity includes direction.", "Gravel gives less grip than tar."] });

  q.mcq({ d: 4, skill: "EVALUATION",
    stem: "A passenger in a minibus going round a bend says, 'I am thrown outwards by a force pushing me away from the centre.' Which is the best explanation?",
    options: [["Her body tends to keep moving in a straight line (inertia) while the minibus turns towards the centre.", "Correct."], ["An outward centrifugal force pushes her.", "No real outward force acts on her."], ["Air resistance pushes her outwards.", "Air resistance acts against motion."], ["Her weight increases on the bend.", "Her weight does not change."]],
    answer: "A", explanation: "She keeps going straight until the door or seat pushes her inwards; the minibus turns under her, so she seems to be thrown outwards.",
    hints: ["Think about Newton's first law."] });

  q.card("DEFINITION", "What is a **centripetal force**?", "The resultant force on an object moving in a circle, acting towards the centre.");
  q.card("CONCEPT", "Why is an object moving in a circle at constant speed accelerating?", "Its direction (and so its velocity) keeps changing.");
  q.card("FACT", "What provides the centripetal force for a car on a bend?", "Friction between the tyres and the road.");
  q.card("FACT", "What keeps the Moon in orbit?", "The Earth's gravitational attraction.");
  q.card("CONCEPT", "What happens if the centripetal force is removed?", "The object moves off in a straight line along the tangent.");
  q.card("CONCEPT", "How does the force needed change with speed?", "Larger speed (same mass and radius) needs a larger force.", undefined, { applies: ["cambridge"] });
  q.card("CONCEPT", "How does the force needed change with radius?", "A smaller radius (same mass and speed) needs a larger force.", undefined, { applies: ["cambridge"] });
  q.card("CONCEPT", "How does the force needed change with mass?", "A larger mass (same speed and radius) needs a larger force.", undefined, { applies: ["cambridge"] });
});
