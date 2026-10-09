import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];
const C = ["cambridge"];
const REL2 = { kind: "relative", amount: 0.02 };
const rad = (deg) => (deg * Math.PI) / 180;
const deg = (x) => (x * 180) / Math.PI;

// =====================================================================================================================
concept("phys.light.reflection", {
  file: "light/reflection",
  keyPrefix: "light.reflection",
  objectives: { cambridge: ["3.2.1.1", "3.2.1.2", "3.2.1.3", "3.2.1.4"], zimsec: ["10.1.1", "10.1.2", "10.1.3", "10.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In ray diagrams, what is the normal?",
    options: [["A line at 90° to the surface where the ray strikes it", "Correct."], ["A line drawn along the surface of the mirror", "That is the mirror line itself."], ["The reflected ray drawn back from the mirror", "The normal is a construction line at 90° to the surface."], ["A line at 45° to the surface where the ray strikes it", "The normal is perpendicular to the surface."]],
    answer: "A", explanation: "The normal is a line drawn at right angles to the surface at the point of incidence; angles are measured from it." });

  q.num({ d: 1, skill: "APPLICATION",
    stem: "A ray of light strikes a plane mirror with an angle of incidence of 25°. What is the angle of reflection?",
    value: 25, unit: "°", wrong: [65],
    explanation: "By the law of reflection, the angle of reflection equals the angle of incidence: 25°." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A ray of light makes an angle of 62° with the surface of a plane mirror. What is the angle of reflection?",
    value: 28, unit: "°", wrong: [62],
    explanation: "Angles are measured from the normal: the angle of incidence is 90° − 62° = 28°, so the angle of reflection is 28°." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The image in a plane mirror can be caught on a screen placed where the image appears to be.",
    answer: false, explanation: "The image is virtual: no light actually reaches the place where it appears, so it cannot be formed on a screen." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which description of the image in a plane mirror is correct?",
    options: [["Upright, virtual, the same size and laterally inverted", "Correct."], ["Inverted, real, the same size and behind the mirror", "The image is upright and virtual."], ["Upright, virtual, enlarged and laterally inverted", "It is the same size as the object."], ["Upright, real, the same size and laterally inverted", "A plane-mirror image is virtual."]],
    answer: "A", explanation: "A plane mirror gives an upright, virtual, same-size, laterally inverted image as far behind the mirror as the object is in front." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A boy stands 2.4 m in front of a plane mirror. How far is he from his image?",
    value: 4.8, answer: "4.8", unit: "m", wrong: [2.4, 1.2],
    explanation: "The image is 2.4 m behind the mirror, so the boy is 2.4 + 2.4 = 4.8 m from his image." });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "A learner stands 3.0 m from a plane mirror, then walks 1.2 m straight towards it. How far is she now from her image?",
    value: 3.6, answer: "3.6", unit: "m", wrong: [1.8, 2.4, 4.8],
    explanation: "She is now 3.0 − 1.2 = 1.8 m from the mirror, and her image is 1.8 m behind it: 1.8 + 1.8 = 3.6 m.",
    hints: ["First find her new distance from the mirror.", "The image is as far behind the mirror as she is in front."] });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "A ray is reflected by a plane mirror. The angle between the incident ray and the reflected ray is 130°. What is the angle of incidence?",
    value: 65, unit: "°", wrong: [130, 25],
    explanation: "The normal bisects the angle between the incident and reflected rays: 130° ÷ 2 = 65°.",
    hints: ["The angle of incidence and the angle of reflection are equal and together make up the angle between the rays."] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: "Two plane mirrors are joined at a right angle (90°). A ray strikes the first mirror with an angle of incidence of 30° and then travels to the second mirror. What is the angle of incidence at the second mirror?",
    value: 60, unit: "°", wrong: [30, 90],
    explanation: "The reflected ray makes 90° − 30° = 60° with the first mirror. In the triangle formed with the corner (90°), the ray meets the second mirror at 180° − 90° − 60° = 30° to its surface, so the angle of incidence there is 90° − 30° = 60°.",
    hints: ["Find the angle between the reflected ray and the first mirror's surface.", "Use the angle sum of the triangle formed by the ray and the two mirrors."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A learner raises her right hand while standing in front of a plane mirror. Which hand does her image appear to raise?",
    options: [["Its left hand", "Correct: the image is laterally inverted."], ["Its right hand", "Left and right are swapped in a plane-mirror image."], ["Neither: the image does not move", "The image copies every movement."], ["Both hands", "No."]],
    answer: "A", explanation: "A plane mirror image is laterally inverted, so the raised right hand appears as the image's left hand." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each feature of the image in a plane mirror with its description.",
    pairs: [["Size", "The same as the object"], ["Distance from the mirror", "The same as the object's distance in front"], ["Nature", "Virtual"], ["Way up", "Upright but laterally inverted"]],
    explanation: "Same size; same distance behind; virtual; upright and laterally inverted." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "In a ray diagram that locates the image of a point object in a plane mirror, how are the reflected rays used?",
    options: [["They are extended back behind the mirror, as dashed lines, to meet.", "Correct."], ["They are extended forwards in front of the mirror until they meet.", "Reflected rays diverge in front of the mirror."], ["They are drawn parallel to the mirror and the image lies between them.", "Reflected rays are not drawn parallel to the mirror."], ["They are all drawn through the centre point of the mirror's surface.", "There is no special centre for a plane mirror."]],
    answer: "A", explanation: "The reflected rays diverge; traced back behind the mirror they meet at the virtual image, which lies on the normal through the object, as far behind as the object is in front.",
    hints: ["Where do the reflected rays appear to come from?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The angle of incidence is the angle between the incident ray and the {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["normal", "the normal"], wrong: "mirror" }],
    explanation: "Angles of incidence and reflection are measured from the normal." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner is asked to show that the angle of incidence equals the angle of reflection, using a ray box, a plane mirror, a protractor and a sheet of paper.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the experiment should be done.",
        points: ["Draw a line on the paper, stand the mirror along it and draw a normal to it", "Shine a narrow ray along a line at a measured angle of incidence to the normal", "Mark the reflected ray (with crosses or pins), draw it and measure the angle of reflection with the protractor", "Repeat for several angles of incidence and compare: the two angles are equal each time"] }),
      P.mcq({ label: "(b)", stem: "Why should the room be darkened?", options: [["So the narrow ray shows clearly and can be marked accurately", "Correct."], ["So the ray box and mirror do not overheat during the experiment", "Not the reason."], ["Because a mirror reflects light properly only in the dark", "Light reflects in any conditions."], ["To make the angles of reflection larger and easier to read", "Darkness does not change the angles."]], answer: "A",
        explanation: "A dim room makes the narrow ray easy to see and mark accurately." }),
    ],
    explanation: "Measure angles from a drawn normal for several angles of incidence and show the reflected angles are equal.",
    hints: ["Every angle must be measured from the normal."] });

  q.card("DEFINITION", "What is the **normal**?", "A line at 90° to a surface at the point where a ray meets it.");
  q.card("DEFINITION", "Angles of **incidence** and **reflection**?", "The angles between the incident ray (or reflected ray) and the normal.");
  q.card("FACT", "The law of reflection?", "Angle of incidence = angle of reflection (and both rays and the normal lie in one plane).");
  q.card("FACT", "Properties of a plane-mirror image?", "Same size, same distance behind the mirror, upright, virtual, laterally inverted.");
  q.card("DEFINITION", "What is a **virtual image**?", "An image that light only appears to come from; it cannot be formed on a screen.");
  q.card("CONCEPT", "How do you locate the image of a point in a plane mirror?", "On the normal through the object, as far behind the mirror as the object is in front; reflected rays traced back meet there.");
});

// =====================================================================================================================
concept("phys.light.refraction", {
  file: "light/refraction",
  keyPrefix: "light.refraction",
  objectives: { cambridge: ["3.2.2.1", "3.2.2.2", "3.2.2.3", "3.2.2.6", "3.2.2.7"], zimsec: ["10.2.1", "10.2.2", "10.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What causes the refraction of light at a boundary?",
    options: [["A change in the speed of the light", "Correct."], ["Reflection from the surface", "That is reflection, not refraction."], ["A change in the frequency of the light", "The frequency does not change."], ["Absorption of the light", "Absorption does not bend light."]],
    answer: "A", explanation: "Light changes speed when it passes into a different medium; arriving at an angle, this changes its direction." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A ray of light passes at an angle from air into glass. What happens to it?",
    options: [["It slows down and bends towards the normal.", "Correct."], ["It slows down and bends away from the normal.", "Slowing down bends light towards the normal."], ["It speeds up and bends towards the normal.", "Light slows down in glass."], ["It carries on in a straight line.", "Only a ray along the normal is not bent."]],
    answer: "A", explanation: "Glass is optically denser than air: light slows down and bends towards the normal." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A ray of light that enters a glass block along the normal does not change direction.",
    answer: true, explanation: "With an angle of incidence of 0°, the ray slows down but passes straight through without bending." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A ray passes through a rectangular (parallel-sided) glass block. How does the ray leaving the block compare with the ray entering it?",
    options: [["It is parallel to it but shifted sideways.", "Correct."], ["It is at right angles to it.", "No."], ["It continues along exactly the same line.", "It is displaced sideways unless it travels along the normal."], ["It is bent permanently towards the normal.", "The bending at the second face undoes the first."]],
    answer: "A", explanation: "The ray bends towards the normal on entering and away from it on leaving by the same amount, so it emerges parallel but displaced." });

  q.calc({ d: 2, skill: "APPLICATION",
    stem: "Light passes from air into water. The angle of incidence is 50° and the angle of refraction is 35°. Calculate the refractive index of water.",
    value: Math.sin(rad(50)) / Math.sin(rad(35)), unit: undefined, wrong: [1.43, 0.749],
    explanation: t`$n = \dfrac{\sin i}{\sin r} = \dfrac{\sin 50^\circ}{\sin 35^\circ} = \dfrac{0.766}{0.574} = 1.34$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "Glass has a refractive index of 1.60. A ray enters the glass from air with an angle of incidence of 45°. Calculate the angle of refraction.",
    value: deg(Math.asin(Math.sin(rad(45)) / 1.6)), unit: "°", wrong: [28.1, 45],
    explanation: t`$\sin r = \dfrac{\sin i}{n} = \dfrac{\sin 45^\circ}{1.60} = 0.442$, so $r = 26.2^\circ$.`,
    hints: [t`Rearrange $n = \dfrac{\sin i}{\sin r}$ to find $\sin r$.`, "Then use the inverse sine."] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`The refractive index of water is 1.33. The speed of light in a vacuum is $3.0 \times 10^{8}\ \text{m/s}$. Calculate the speed of light in water.`,
    value: 3.0e8 / 1.33, answer: "2.26e8", tol: REL2, unit: "m/s", wrong: [3.99e8, 4.4e-9],
    explanation: t`Speed in water $= \dfrac{3.0 \times 10^{8}}{1.33} = 2.26 \times 10^{8}\ \text{m/s}$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: t`Light travels at $1.24 \times 10^{8}\ \text{m/s}$ in diamond. The speed of light in a vacuum is $3.0 \times 10^{8}\ \text{m/s}$. Calculate the refractive index of diamond.`,
    value: 3.0 / 1.24, wrong: [0.413],
    explanation: t`$n = \dfrac{\text{speed in vacuum}}{\text{speed in diamond}} = \dfrac{3.0 \times 10^{8}}{1.24 \times 10^{8}} = 2.42$.`,
    hints: ["Refractive index = speed in vacuum ÷ speed in the medium; it is always greater than 1."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does a swimming pool look shallower than it really is?",
    options: [["Light bends away from the normal as it leaves, so the bottom looks higher.", "Correct."], ["Light bends towards the normal as it leaves the water, raising the image.", "Leaving water for air, light speeds up and bends away from the normal."], ["Water acts as a magnifying glass, making the bottom look closer.", "Not the reason."], ["Light reflects from the bottom of the pool and from the surface.", "Reflection does not explain apparent depth."]],
    answer: "A", explanation: "Rays from the bottom refract away from the normal at the surface; traced back by the eye, they seem to come from a point above the real bottom (apparent depth)." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A fisherman standing on a river bank wants to spear a fish he can see in the water. Where should he aim?",
    options: [["Below the place where the fish appears to be", "Correct: refraction makes the fish look higher than it is."], ["Above the place where the fish appears to be", "The fish is deeper than it looks."], ["Directly at the place where the fish appears to be", "He would miss: the fish appears raised."], ["To one side of the fish", "The shift is vertical, towards the surface."]],
    answer: "A", explanation: "Light from the fish bends away from the normal as it leaves the water, so the fish appears nearer the surface than it really is.",
    hints: ["Does an object under water look deeper or shallower than it really is?"] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which statement is one of the laws of refraction?",
    options: [["The incident ray, the refracted ray and the normal all lie in the same plane.", "Correct."], ["The angle of incidence always equals the angle of refraction.", "That is not true for refraction."], ["Light always bends towards the normal whenever it crosses a boundary between media.", "Leaving a denser medium, it bends away."], ["The refractive index changes as the angle of incidence changes.", "For two given media, sin i / sin r is constant."]],
    answer: "A", explanation: "Laws of refraction: the rays and the normal lie in one plane, and sin i / sin r is constant for two given media (Snell's law)." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which expression defines the refractive index of a medium?",
    options: [["Speed of light in a vacuum ÷ speed of light in the medium", "Correct."], ["Speed of light in the medium ÷ speed of light in a vacuum", "This would be less than 1."], ["Angle of incidence ÷ angle of refraction", "Use the sines of the angles, not the angles."], [t`$\sin r \div \sin i$`, "It is the other way up."]],
    answer: "A", explanation: t`Refractive index $= \dfrac{\text{speed in vacuum}}{\text{speed in medium}}$, which also equals $\dfrac{\sin i}{\sin r}$ for light entering from air.` });

  q.fib({ d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "When light passes from glass into air it {{blank:a}} and bends {{blank:b}} the normal.",
    blanks: [
      { id: "a", input: "select", choices: ["speeds up", "slows down"], accepted: ["speeds up"], wrong: "slows down" },
      { id: "b", input: "select", choices: ["towards", "away from"], accepted: ["away from"], wrong: "towards" },
    ],
    explanation: "Leaving the denser medium, light speeds up and bends away from the normal." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner investigates refraction using a rectangular glass block, a ray box, a protractor and paper. For an angle of incidence of 60°, she measures an angle of refraction of 35°.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how she finds the angle of refraction.",
        points: ["Draw round the block; shine a ray at a marked point on one face at a measured angle of incidence to the normal", "Mark the ray leaving the opposite face with crosses; remove the block and join the entry and exit points to show the ray inside the block", "Draw the normal at the entry point and measure the angle of refraction with the protractor"] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the refractive index of the glass.", value: Math.sin(rad(60)) / Math.sin(rad(35)), wrong: [1.71],
        explanation: t`$n = \dfrac{\sin 60^\circ}{\sin 35^\circ} = \dfrac{0.866}{0.574} = 1.51$.` }),
      P.mcq({ label: "(c)", stem: "At the opposite face the ray passes from the glass back into air. What happens to it there?", options: [["It speeds up and bends away from the normal.", "Correct."], ["It slows down and bends towards the normal.", "It is entering a less dense medium."], ["It speeds up and bends towards the normal.", "Speeding up bends it away from the normal."], ["It carries straight on.", "It arrives at an angle, so it bends."]], answer: "A",
        explanation: "Leaving glass for air, light speeds up and bends away from the normal." }),
    ],
    explanation: "Trace the ray through the block, measure the angles from the normal, and use n = sin i / sin r.",
    hints: [t`Use $n = \dfrac{\sin i}{\sin r}$ with the angles measured from the normal.`] });

  q.card("DEFINITION", "What is **refraction**?", "The change in direction of light passing at an angle from one medium into another, caused by a change in speed.");
  q.card("CONCEPT", "Which way does light bend at a boundary?", "Into a denser medium: slows, bends towards the normal. Into a less dense medium: speeds up, bends away.");
  q.card("FORMULA", "Refractive index?", t`$n = \dfrac{\sin i}{\sin r} = \dfrac{\text{speed in vacuum}}{\text{speed in medium}}$`);
  q.card("FACT", "The laws of refraction?", "The incident ray, refracted ray and normal lie in one plane; sin i / sin r is constant for two given media.");
  q.card("FACT", "A ray along the normal at a boundary?", "It passes straight through without changing direction (but changes speed).");
  q.card("CONCEPT", "What is **apparent depth**?", "Water looks shallower than it is because light from the bottom bends away from the normal as it leaves the water.", undefined, { applies: Z });
  q.card("CONCEPT", "A ray through a parallel-sided glass block?", "It emerges parallel to the incident ray but shifted sideways.");
});

// =====================================================================================================================
concept("phys.light.total-internal-reflection", {
  file: "light/total-internal-reflection",
  keyPrefix: "light.tir",
  objectives: { cambridge: ["3.2.2.4", "3.2.2.5", "3.2.2.8", "3.2.2.9"], zimsec: ["10.2.4", "10.2.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the critical angle?",
    options: [["The angle of incidence in the denser medium for which the angle of refraction is 90°", "Correct."], ["The angle at which all light is absorbed", "No."], ["The angle of incidence in the less dense medium (air) for which the angle of refraction is 90°", "Light entering a denser medium is never refracted at 90°."], ["The largest possible angle of reflection", "No."]],
    answer: "A", explanation: "The critical angle is the angle of incidence, inside the denser medium, that gives an angle of refraction of 90°." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **both** conditions needed for total internal reflection.",
    options: [["The light travels from a denser medium towards a less dense medium.", "Correct."], ["The angle of incidence is greater than the critical angle.", "Correct."], ["The light travels from a less dense medium into a denser medium.", "Wrong direction."], ["The angle of incidence is less than the critical angle.", "Then most light refracts out."], ["The surface is silvered like a mirror.", "Not needed: the reflection is total without silvering."], ["The light has a single colour.", "Not needed."]],
    answer: ["A", "B"], explanation: "Total internal reflection needs light going from a denser to a less dense medium at an angle of incidence greater than the critical angle.",
    hints: ["One condition is about direction; the other is about the size of the angle."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Total internal reflection can happen when light travels from air into glass.",
    answer: false, explanation: "It only happens for light travelling from the denser medium (glass) towards the less dense one (air)." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: "A type of clear plastic has a refractive index of 1.40. Calculate its critical angle.",
    value: deg(Math.asin(1 / 1.4)), unit: "°", wrong: [0.714, 44.4],
    explanation: t`$\sin c = \dfrac{1}{n} = \dfrac{1}{1.40} = 0.714$, so $c = 45.6^\circ$.`,
    hints: [t`Use $n = \dfrac{1}{\sin c}$, so $\sin c = \dfrac{1}{n}$.`] });

  q.num({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "The critical angle for light going from a liquid into air is 48.8°. Calculate the refractive index of the liquid.",
    value: 1 / Math.sin(rad(48.8)), wrong: [0.752],
    explanation: t`$n = \dfrac{1}{\sin c} = \dfrac{1}{\sin 48.8^\circ} = \dfrac{1}{0.752} = 1.33$ (this is water).`,
    hints: [t`Use $n = \dfrac{1}{\sin c}$.`] });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Light inside a glass block (critical angle 42°) strikes the glass–air surface with an angle of incidence of 50°. What happens?",
    options: [["It is totally internally reflected.", "Correct: 50° is greater than the critical angle."], ["It refracts into the air, bending towards the normal.", "It cannot leave at this angle."], ["It refracts along the surface.", "That happens only at exactly 42°."], ["It passes straight through without bending.", "No."]],
    answer: "A", explanation: "The angle of incidence (50°) is greater than the critical angle (42°), so all the light is reflected back into the glass." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "Light inside a glass block (critical angle 42°) strikes the glass–air surface with an angle of incidence of 30°. What happens?",
    options: [["Most refracts out, bending away from the normal; a little reflects.", "Correct."], ["It is totally internally reflected, so all of it goes back into the glass.", "30° is less than the critical angle."], ["It is all absorbed by the glass at the glass–air surface.", "Clear glass absorbs very little light."], ["It refracts into the air, bending towards the normal.", "Speeding up into air, it bends away from the normal."]],
    answer: "A", explanation: "Below the critical angle, light mostly refracts out (bending away from the normal), with weak partial internal reflection." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are 45° glass prisms often used instead of plane mirrors in periscopes and binoculars?",
    options: [["They reflect all the light by TIR, giving one bright, sharp image.", "Correct."], ["They magnify the image as well as turning the light through 90°.", "A prism used this way does not magnify."], ["Plane mirrors cannot turn a ray of light through a right angle.", "They can, but less completely."], ["Prisms split the light into colours, which makes it brighter.", "Not in this arrangement."]],
    answer: "A", explanation: "45° is greater than the critical angle of glass, so the light is totally reflected; a silvered mirror absorbs some light and can give faint double images." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "How does light travel along a curved optical fibre?",
    options: [["By repeated total internal reflection at the walls of the fibre", "Correct."], ["By refraction out through the walls of the fibre and then back in again", "The light stays inside."], ["By diffraction around the bends", "No."], ["In a straight line, ignoring the bends", "It follows the fibre."]],
    answer: "A", explanation: "Light meets the walls at angles greater than the critical angle and is totally internally reflected again and again along the fibre." });

  q.match({ d: 2, skill: "APPLICATION",
    stem: "Match each task with the device that uses total internal reflection to do it.",
    pairs: [["Carrying internet data under the sea", "Optical fibre cable"], ["Viewing inside a patient's stomach", "Endoscope"], ["Seeing over a wall from a trench", "Prism periscope"]],
    explanation: "Optical fibres carry data; an endoscope uses fibres to see inside the body; a periscope uses prisms." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "On a hot day, a tarred road far ahead seems to be covered by a pool of water. What causes this?",
    options: [["Sky light bends in hot air near the road and is totally reflected up.", "Correct: a mirage."], ["Water evaporating from the hot road surface into the air", "The road is dry."], ["Light reflected by thin films of oil spilled on the road", "Not the cause."], ["Light given out by the hot tar, which glows faintly in the heat", "The tar does not glow."]],
    answer: "A", explanation: "Hot, less dense air near the road refracts light from the sky until it is totally reflected upwards, so the sky appears on the road like water: a mirage.",
    hints: ["Hot air near the road is less dense than the air above it."] });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the medical instrument that uses a bundle of optical fibres to look inside a patient's body.",
    accepted: ["endoscope", "an endoscope", "endoscopes", "fibrescope", "fiberscope"], wrong: ["microscope"],
    explanation: "An endoscope carries light into the body and an image back out along optical fibres." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Total internal reflection can only happen when light travels from a {{blank:a}} medium towards a {{blank:b}} medium.",
    blanks: [
      { id: "a", input: "select", choices: ["denser", "less dense"], accepted: ["denser"], wrong: "less dense" },
      { id: "b", input: "select", choices: ["denser", "less dense"], accepted: ["less dense"], wrong: "denser" },
    ],
    explanation: "For example, from glass or water towards air." });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "An optical fibre has a glass core with a refractive index of 1.48.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the critical angle of the glass.", value: deg(Math.asin(1 / 1.48)), unit: "°", wrong: [0.676],
        explanation: t`$\sin c = \dfrac{1}{1.48} = 0.676$, so $c = 42.5^\circ$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why light that enters one end of the fibre stays inside it, even where the fibre bends gently.",
        points: ["The light strikes the walls at angles of incidence greater than the critical angle", "so it is totally internally reflected each time instead of refracting out"] }),
      P.mcq({ label: "(c)", stem: "Which is a use of optical fibres?", options: [["Carrying telephone and internet signals", "Correct."], ["Heating food quickly in an oven", "Microwaves or infrared heat food."], ["Producing X-ray images of bones", "X-rays are not carried by optical fibres."], ["Measuring the air pressure in car tyres", "Pressure gauges do that."]], answer: "A",
        explanation: "Optical fibres carry telecommunication signals (and are used in endoscopes)." }),
    ],
    explanation: "c = sin⁻¹(1/n); light hitting the walls above the critical angle is totally internally reflected along the fibre.",
    hints: [t`Use $\sin c = \dfrac{1}{n}$.`] });

  q.card("DEFINITION", "What is the **critical angle**?", "The angle of incidence in the denser medium for which the angle of refraction is 90°.");
  q.card("DEFINITION", "What is **total internal reflection**?", "Complete reflection back into a denser medium when light meets the boundary at more than the critical angle.");
  q.card("FACT", "Two conditions for total internal reflection?", "Light going from a denser to a less dense medium, at an angle of incidence greater than the critical angle.");
  q.card("FORMULA", "Critical angle and refractive index?", t`$n = \dfrac{1}{\sin c}$`, undefined, { applies: C });
  q.card("FACT", "Uses of total internal reflection?", "Optical fibres (telecommunications, endoscopes) and 45° prisms in periscopes and binoculars.");
  q.card("CONCEPT", "Why prisms rather than mirrors in periscopes?", "Total internal reflection reflects all the light, giving a brighter, single, sharp image.");
  q.card("CONCEPT", "What causes a **mirage** on a hot road?", "Light from the sky bends through hot, less dense air near the road and is totally reflected upwards.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.light.lenses", {
  file: "light/lenses",
  keyPrefix: "light.lenses",
  objectives: { cambridge: ["3.2.3.1", "3.2.3.2", "3.2.3.3", "3.2.3.4", "3.2.3.5", "3.2.3.6", "3.2.3.7", "3.2.3.8"], zimsec: ["10.3.1", "10.3.2", "10.3.3", "10.3.4", "10.3.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the principal focus of a converging lens?",
    options: [["Where rays parallel to the axis meet after passing through the lens", "Correct."], ["The centre of the lens, through which rays pass straight", "That is the optical centre."], ["The point where every image forms, whatever the object distance", "Image positions depend on the object distance."], ["The point on the axis at twice the focal length from the lens", "That is 2F, not the principal focus."]],
    answer: "A", explanation: "Rays parallel to the principal axis converge to the principal focus (focal point) after refraction by the lens." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What shape is a converging lens?",
    options: [["Thicker in the middle than at the edges", "Correct."], ["Thinner in the middle than at the edges", "That is a diverging lens."], ["Flat on both sides", "That would not focus light."], ["The same thickness everywhere, but curved", "No."]],
    answer: "A", explanation: "A converging (convex) lens is thicker in the middle; a diverging (concave) lens is thinner in the middle." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What does a diverging lens do to a parallel beam of light?",
    options: [["It spreads the rays out as if they came from a focus in front of it.", "Correct."], ["It brings the rays together to a focus behind the lens.", "That is a converging lens."], ["It reflects the beam back towards where it came from.", "Lenses refract light."], ["It keeps the rays parallel to each other but moves them closer together.", "It makes the rays diverge."]],
    answer: "A", explanation: "A diverging lens spreads parallel rays out; traced back, they appear to come from its principal focus." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "An object is placed far beyond 2F from a converging lens. What is the image like?",
    options: [["Real, inverted and diminished", "Correct."], ["Virtual, upright and enlarged", "That needs the object inside F."], ["Real, upright and the same size", "Real images from a single lens are inverted."], ["Virtual, inverted and diminished", "No."]],
    answer: "A", explanation: "An object beyond 2F gives a real, inverted, diminished image between F and 2F on the other side, as in a camera." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "Where must an object be placed to give a real, inverted image the same size as the object?",
    options: [["At 2F", "Correct."], ["Between F and 2F", "That gives an enlarged image."], ["Inside F", "That gives a virtual image."], ["Far beyond 2F", "That gives a diminished image."]],
    answer: "A", explanation: "An object at 2F gives a real, inverted, same-size image at 2F on the other side of the lens." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "A projector forms a large, sharp image of a small slide on a distant screen. Where is the slide placed?",
    options: [["Between F and 2F", "Correct: this gives a real, enlarged image beyond 2F."], ["Beyond 2F", "That gives a diminished image."], ["Inside F", "That gives a virtual image, which cannot be projected."], ["Exactly at 2F", "That gives a same-size image."]],
    answer: "A", explanation: "An object between F and 2F gives a real, inverted, enlarged image beyond 2F; the slide is put in upside down so the picture appears the right way up." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A virtual image can be shown on a screen.",
    answer: false, explanation: "Light does not actually pass through a virtual image; it only appears to come from it, so it cannot be formed on a screen." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "An object is placed 4 cm from a converging lens of focal length 6 cm. Which describes the image?",
    options: [["Virtual, upright and enlarged, on the same side as the object", "Correct: the object is inside F."], ["Real, inverted and enlarged, on the far side of the lens", "That needs the object between F and 2F."], ["Real, inverted and diminished, on the far side of the lens", "That needs the object beyond 2F."], ["Virtual, inverted and diminished, on the same side", "A converging lens never forms a virtual inverted image."]],
    answer: "A", explanation: "The object is closer than the focal length, so the rays leave the lens diverging; traced back, they form a virtual, upright, enlarged image: the lens acts as a magnifying glass.",
    hints: ["Compare the object distance with the focal length."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "A short-sighted person sees near objects clearly but distant objects are blurred. Which lens corrects this?",
    options: [["A diverging lens", "Correct."], ["A converging lens", "That corrects long sight."], ["A flat sheet of glass", "It would not change the focus."], ["A prism", "No."]],
    answer: "A", explanation: "The eye focuses light from distant objects in front of the retina; a diverging lens spreads the rays a little so they focus on the retina." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why does a long-sighted person need spectacles with converging lenses?",
    options: [["Near objects would focus behind the retina; the lens adds convergence.", "Correct."], ["Their eye focuses in front of the retina; the lens spreads rays out.", "That describes short sight, and it needs a diverging lens."], ["The converging lens turns the image the right way up.", "Not the purpose."], ["The converging lens reduces the light entering the eye.", "Spectacle lenses correct focusing, not brightness."]],
    answer: "A", explanation: "In long sight, near objects would focus behind the retina; a converging lens adds focusing power so the image forms on the retina.",
    hints: ["Where does the eye of a long-sighted person try to focus light from a near object?"] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A learner forms a sharp image of a distant tree on a screen using a converging lens. The screen is 18 cm from the lens. What is the focal length of the lens?",
    value: 18, unit: "cm", wrong: [36, 9],
    explanation: "Rays from a very distant object are almost parallel, so they focus at the principal focus: the focal length is 18 cm." });

  q.match({ d: 2, skill: "APPLICATION",
    stem: "Match each object position (converging lens) with an instrument that uses it.",
    pairs: [["Beyond 2F", "Camera"], ["Between F and 2F", "Projector"], ["Inside F", "Magnifying glass"]],
    explanation: "Camera: object beyond 2F (diminished real image). Projector: between F and 2F (enlarged real image). Magnifying glass: inside F (enlarged virtual image)." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the rules for drawing ray diagrams with a converging lens.",
    template: "A ray parallel to the principal axis is refracted through the {{blank:a}}. A ray through the {{blank:b}} of the lens passes straight through.",
    blanks: [
      { id: "a", accepted: ["principal focus", "focal point", "focus", "F", "principal focal point"], wrong: "centre" },
      { id: "b", accepted: ["centre", "center", "optical centre", "optical center", "middle"], wrong: "edge" },
    ],
    explanation: "Parallel rays pass through the principal focus; rays through the optical centre are undeviated." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "An object 2.0 cm tall stands upright on the principal axis, 15 cm from a converging lens of focal length 5.0 cm.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which describes the image?", options: [["Real, inverted and diminished", "Correct: the object is beyond 2F (10 cm)."], ["Real, inverted and enlarged", "That needs the object between F and 2F."], ["Virtual, upright and enlarged", "That needs the object inside F."], ["Real, upright and diminished", "Real images from a single lens are inverted."]], answer: "A",
        explanation: "15 cm is beyond 2F (10 cm), so the image is real, inverted and diminished." }),
      P.num({ label: "(b)", marks: 2, stem: "Draw a full-size ray diagram and use it to find the distance of the image from the lens.", value: 7.5, answer: "7.5", tol: 0.5, unit: "cm", wrong: [15, 5],
        explanation: "The ray parallel to the axis passes through F (5.0 cm beyond the lens); the ray through the centre is undeviated; they cross 7.5 cm from the lens.",
        workedSolution: "1. Draw the principal axis and the lens; mark F and 2F, 5.0 cm and 10 cm, on each side.\n2. Draw the object 15 cm from the lens.\n3. Draw a ray from the top of the object parallel to the axis, refracted through F on the far side.\n4. Draw a ray from the top of the object straight through the centre of the lens.\n5. The rays cross about 7.5 cm from the lens: that is the top of the image." }),
      P.manual({ label: "(c)", marks: 1, stem: "Name one optical instrument that uses this arrangement.",
        points: ["A camera (or the eye)"] }),
    ],
    explanation: "Object beyond 2F: real, inverted, diminished image between F and 2F, found where the construction rays cross.",
    hints: ["Use two rays: one parallel to the axis, one through the centre of the lens."] });

  q.card("DEFINITION", "**Converging** vs **diverging** lens?", "Converging: thicker in the middle, brings parallel rays to a focus. Diverging: thinner in the middle, spreads them out.");
  q.card("DEFINITION", "What is the **principal focus** of a converging lens?", "The point where rays parallel to the principal axis meet after the lens.");
  q.card("DEFINITION", "What is the **focal length**?", "The distance from the centre of the lens to the principal focus.");
  q.card("CONCEPT", "Two rays for a converging-lens diagram?", "A ray parallel to the axis passes through F; a ray through the centre goes straight on.");
  q.card("FACT", "Object beyond 2F: image?", "Real, inverted, diminished, between F and 2F (camera, eye).");
  q.card("FACT", "Object inside F: image?", "Virtual, upright, enlarged, on the same side as the object (magnifying glass).");
  q.card("FACT", "Lenses for short and long sight?", "Short sight: diverging lens. Long sight: converging lens.");
  q.card("DEFINITION", "**Real** vs **virtual** image?", "Real: rays actually meet, can be shown on a screen. Virtual: rays only appear to come from it, cannot be shown on a screen.");
});

// =====================================================================================================================
concept("phys.light.dispersion", {
  file: "light/dispersion",
  keyPrefix: "light.dispersion",
  objectives: { cambridge: ["3.2.4.1", "3.2.4.2", "3.2.4.3"], zimsec: ["10.4.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is dispersion of light?",
    options: [["The splitting of white light into its separate colours", "Correct."], ["The bending of light as it crosses a boundary", "That is refraction in general."], ["The reflection of white light back inside a prism", "Dispersion is caused by refraction, not reflection."], ["The spreading of light waves as they pass through a gap", "That is diffraction."]],
    answer: "A", explanation: "Dispersion is the splitting of white light into colours because each colour is refracted by a different amount." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which colour of light is refracted most by a glass prism?",
    options: [["Violet", "Correct."], ["Red", "Red is refracted least."], ["Green", "In the middle."], ["Yellow", "Close to the red end."]],
    answer: "A", explanation: "Violet light is refracted (deviated) most; red light least." });

  q.mcq({ d: 2, skill: "RECALL", daily: true,
    stem: "Which colour of visible light has the longest wavelength?",
    options: [["Red", "Correct."], ["Violet", "Violet has the shortest wavelength."], ["Blue", "Short wavelength."], ["Green", "In the middle."]],
    answer: "A", explanation: "Red has the longest wavelength and lowest frequency of visible light." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A glass prism adds colours to white light.",
    answer: false, explanation: "The colours are already in white light; the prism separates them by refracting each by a different amount." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the colours of the visible spectrum in order.",
    template: "red, orange, {{blank:a}}, green, {{blank:b}}, indigo, violet",
    blanks: [
      { id: "a", accepted: ["yellow"], wrong: "blue" },
      { id: "b", accepted: ["blue"], wrong: "yellow" },
    ],
    explanation: "The order is red, orange, yellow, green, blue, indigo, violet." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which colour of visible light has the highest frequency?",
    options: [["Violet", "Correct."], ["Red", "Red has the lowest frequency."], ["Orange", "Low frequency."], ["Green", "In the middle."]],
    answer: "A", explanation: "Violet has the highest frequency (and shortest wavelength) of visible light." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "What is monochromatic light?",
    options: [["Light of a single frequency", "Correct."], ["White light", "White light contains many frequencies."], ["Light from the Sun", "Sunlight contains many frequencies."], ["Light that cannot be seen", "No."]],
    answer: "A", explanation: "Monochromatic light has a single frequency, so a single colour." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why does a glass prism separate white light into colours?",
    options: [["Each colour slows by a different amount in glass, so bends differently.", "Correct."], ["Each colour travels at its own different speed even in a vacuum.", "All colours travel at the same speed in a vacuum."], ["The prism absorbs some colours and lets the others through.", "The colours are separated, not removed."], ["Each colour is reflected at a different angle from the inside faces of the prism.", "Dispersion is a refraction effect."]],
    answer: "A", explanation: "In glass, violet light slows down most and red least, so violet is refracted most and the colours spread out.",
    hints: ["Refraction depends on the change of speed."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each kind of light with its description.",
    pairs: [["Red light", "Longest wavelength, refracted least"], ["Violet light", "Shortest wavelength, refracted most"], ["White light", "A mixture of all the colours"]],
    explanation: "Red: longest wavelength, least refracted. Violet: shortest wavelength, most refracted. White: all colours mixed." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Rainbows form when sunlight passes through raindrops. Which process separates the colours?",
    options: [["Refraction in and out of each drop, by a different amount per colour", "Correct."], ["Diffraction of the light as it bends around the drops", "Not the main cause."], ["Absorption of some of the colours by the clouds lying above the falling drops", "Clouds do not separate the colours."], ["Reflection alone, at the back surface inside each raindrop", "Reflection helps send the light back, but refraction separates the colours."]],
    answer: "A", explanation: "Each colour is refracted by a different amount as light enters and leaves the drops, so the colours separate (dispersion)." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A narrow beam of white light passes through a triangular glass prism and falls on a white screen.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what is seen on the screen.",
        points: ["A spectrum: a band of colours", "Red at the end deviated least and violet at the end deviated most, in the order red, orange, yellow, green, blue, indigo, violet"] }),
      P.mcq({ label: "(b)", stem: "A second, identical prism is placed upside down next to the first, in the path of the coloured light. What is seen on the screen?", options: [["White light: the colours recombine", "Correct."], ["A wider spectrum with extra colours", "No new colours appear."], ["Only red light", "No."], ["Nothing: the light is absorbed", "No."]], answer: "A",
        explanation: "The inverted prism refracts each colour back by the same amount, so they recombine into white light: the colours were in the white light all along." }),
      P.mcq({ label: "(c)", stem: "Which part of the spectrum has the highest frequency?", options: [["Violet", "Correct."], ["Red", "Lowest frequency."], ["Green", "In the middle."], ["Yellow", "No."]], answer: "A",
        explanation: "Violet has the highest frequency of visible light." }),
    ],
    explanation: "A prism disperses white light into a spectrum, violet deviated most; a second prism can recombine the colours.",
    hints: ["Which colour is refracted most?"] });

  q.card("DEFINITION", "What is **dispersion**?", "The splitting of white light into its colours, because each colour is refracted by a different amount.");
  q.card("FACT", "Colours of the spectrum in order?", "Red, orange, yellow, green, blue, indigo, violet.");
  q.card("FACT", "Red vs violet light?", "Red: longest wavelength, lowest frequency, refracted least. Violet: shortest wavelength, highest frequency, refracted most.");
  q.card("CONCEPT", "Why does a prism disperse white light?", "Each colour travels at a slightly different speed in glass, so each refracts by a different amount.");
  q.card("DEFINITION", "What is **monochromatic** light?", "Light of a single frequency (one colour).", undefined, { applies: C });
  q.card("CONCEPT", "Does a prism create colours?", "No: they are already in white light; a second, inverted prism recombines them into white.");
});
