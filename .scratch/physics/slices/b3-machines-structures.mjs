import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];
const r = (x, n = 3) => Number(x.toPrecision(n));

// =====================================================================================================================
concept("phys.machines.simple-machines", {
  file: "machines/simple-machines",
  keyPrefix: "machines.simple",
  objectives: { zimsec: ["4.1.2", "4.1.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the mechanical advantage (MA) of a machine?",
    options: [["load ÷ effort", "Correct."], ["effort ÷ load", "Upside down."], ["distance moved by effort ÷ distance moved by load", "That is the velocity ratio."], ["work out ÷ work in", "That is efficiency."]],
    answer: "A", explanation: "MA = load ÷ effort." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the velocity ratio (VR) of a machine?",
    options: [["load force ÷ effort force needed to lift it", "That is the MA."], ["distance moved by effort ÷ distance moved by load", "Correct."], ["efficiency ÷ mechanical advantage of the machine", "Efficiency = MA ÷ VR, so this is upside down: VR = MA ÷ efficiency."], ["effort × distance the effort moves through", "That is work input."]],
    answer: "B", explanation: "VR = distance moved by effort ÷ distance moved by load." });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: t`A crowbar lets a farmer lift a $1200\ \text{N}$ rock with an effort of $150\ \text{N}$. What is the mechanical advantage?`,
    value: 8, answer: "8.0", unit: undefined, wrong: [0.125, 1050, 180000],
    explanation: t`$\text{MA} = \dfrac{\text{load}}{\text{effort}} = \dfrac{1200}{150} = 8.0$.` });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: t`In a machine the effort moves $4.5\ \text{m}$ while the load rises $0.90\ \text{m}$. What is the velocity ratio?`,
    value: 5, answer: "5.0", wrong: [0.2, 4.05, 3.6],
    explanation: t`$\text{VR} = \dfrac{4.5}{0.90} = 5.0$.` });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A machine has a mechanical advantage of $3.6$ and a velocity ratio of $4.5$. Calculate its efficiency.`,
    value: 80, unit: "%", wrong: [125, 16.2, 0.8],
    explanation: t`Efficiency $= \dfrac{\text{MA}}{\text{VR}} \times 100\% = \dfrac{3.6}{4.5} \times 100\% = 80\%$.`,
    hints: ["Efficiency = MA ÷ VR × 100%."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: t`A pulley system with 5 strands of rope supporting the lower block is used to lift a load of $900\ \text{N}$. The effort needed is $250\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the velocity ratio of the system.", value: 5, wrong: [3.6, 4], explanation: "VR = number of supporting strands = 5." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mechanical advantage.", value: 3.6, answer: "3.6", wrong: [0.28, 650], explanation: t`$\text{MA} = \dfrac{900}{250} = 3.6$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the efficiency.", value: 72, unit: "%", wrong: [139, 18], explanation: t`$\dfrac{3.6}{5} \times 100\% = 72\%$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why the efficiency is less than 100%.",
        points: ["Work is done against friction in the pulley bearings (and the rope)", "Work is done lifting the moving parts: the lower pulley block and the rope"] }),
    ],
    explanation: "VR = 5 (strands), MA = 900/250 = 3.6, efficiency = 3.6/5 = 72%. Friction and the weight of the moving block waste some of the work input.",
    hints: ["Count the strands supporting the moving block.", "Efficiency = MA ÷ VR × 100%."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: t`A $750\ \text{N}$ barrel is rolled up a plank $5.0\ \text{m}$ long onto a platform $1.5\ \text{m}$ high. The force along the plank is $300\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the useful work done in raising the barrel.", value: 1125, unit: "J", wrong: [3750, 450], explanation: t`$750 \times 1.5 = 1125\ \text{J}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the work done by the person pushing.", value: 1500, unit: "J", wrong: [450, 1125], explanation: t`$300 \times 5.0 = 1500\ \text{J}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the efficiency of the inclined plane.", value: 75, unit: "%", wrong: [133, 25], explanation: t`$\dfrac{1125}{1500} \times 100\% = 75\%$.` }),
    ],
    explanation: "Useful work = weight × height = 1125 J; work in = force × length of slope = 1500 J; efficiency = 75%.",
    hints: ["Useful work = load × vertical height.", "Work in = effort × distance along the slope."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "A machine can have an efficiency greater than 100% if it is well lubricated.",
    answer: false, explanation: "No machine gives out more useful work than the work put in; friction and moving parts always waste some, so efficiency is below 100%." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Which change would improve the efficiency of a pulley system?",
    options: [["Oiling the pulley bearings", "Correct: less work is wasted against friction."], ["Using a heavier lower pulley block", "More work is wasted lifting it."], ["Using rusty pulley wheels", "More friction."], ["Adding more load only", "That raises efficiency a little but is not an improvement to the machine itself."]],
    answer: "A", explanation: "Lubrication reduces friction, so less of the work input is wasted." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "For a pulley system, why is the mechanical advantage always less than the velocity ratio?",
    options: [["Friction and the weight of the moving block need extra effort.", "Correct."], ["The velocity ratio falls as the load becomes heavier.", "VR depends only on the design."], ["The load moves further than the effort in a pulley system.", "The effort moves further."], ["Mechanical advantage has no unit but velocity ratio does.", "Neither has a unit; that is not the reason."]],
    answer: "A", explanation: "Ideally MA = VR. In practice part of the effort overcomes friction and lifts the moving parts, so the MA is smaller.",
    hints: ["What would MA equal for a perfect, frictionless, weightless machine?"] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each quantity with its formula.",
    pairs: [["Mechanical advantage", "load ÷ effort"], ["Velocity ratio", "effort distance ÷ load distance"], ["Efficiency", "MA ÷ VR × 100%"], ["VR of an inclined plane", "length of slope ÷ height"]],
    explanation: "These are the key machine formulas." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A pulley system has a velocity ratio of $6$ and an efficiency of $75\%$. What effort is needed to lift a load of $1800\ \text{N}$?`,
    value: 400, unit: "N", wrong: [300, 225, 8100],
    explanation: t`$\text{MA} = 0.75 \times 6 = 4.5$; effort $= \dfrac{1800}{4.5} = 400\ \text{N}$.`,
    hints: ["MA = efficiency × VR (as a decimal).", "Effort = load ÷ MA."] });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "In a single-string pulley system, what does the velocity ratio equal?",
    accepted: ["the number of supporting strands", "number of strands supporting the lower block", "number of supporting strands", "the number of strands", "number of strands"], wrong: ["the number of wheels on the top block"],
    explanation: "VR = the number of strands of rope supporting the moving (lower) block." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does a machine NOT reduce the work needed to lift a load?",
    options: [["The smaller effort must move through a larger distance.", "Correct: work = force × distance."], ["It does reduce the work.", "It reduces the force, not the work."], ["Machines only ever change the direction in which a force acts.", "Many also multiply force."], ["Work does not depend on distance.", "It does: W = Fd."]],
    answer: "A", explanation: "A machine trades force for distance: the effort is smaller but moves further, so the work input is at least the useful work output." });

  q.card("FORMULA", "Mechanical advantage?", "MA = load ÷ effort (no unit).", undefined, { applies: Z });
  q.card("FORMULA", "Velocity ratio?", "VR = distance moved by effort ÷ distance moved by load.", undefined, { applies: Z });
  q.card("FORMULA", "Efficiency of a machine?", "Efficiency = MA ÷ VR × 100% = useful work out ÷ work in × 100%.", undefined, { applies: Z });
  q.card("FACT", "VR of a single-string pulley system?", "The number of strands supporting the moving (lower) block.", undefined, { applies: Z });
  q.card("FORMULA", "VR of an inclined plane?", "Length of the slope ÷ vertical height.", undefined, { applies: Z });
  q.card("CONCEPT", "Why is no machine 100% efficient?", "Work is wasted against friction and in lifting the machine's own moving parts.", undefined, { applies: Z });
  q.card("FACT", "How can the efficiency of a machine be improved?", "Lubrication, ball bearings, lighter moving parts, smooth surfaces.", undefined, { applies: Z });
  q.card("CONCEPT", "Do machines save work?", "No: they reduce the force needed, but the effort moves further.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.structures.beams", {
  file: "structures/beams",
  keyPrefix: "structures.beams",
  objectives: { zimsec: ["5.1.3", "5.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is a beam?",
    options: [["A rigid member carrying loads across a span between supports", "Correct."], ["A rope or cable that carries a pulling force only", "That is a cable or tie."], ["A vertical column that carries a roof down to the ground", "That is a column or pillar."], ["A riveted joint that holds two steel plates together", "Not a beam."]],
    answer: "A", explanation: "A beam is a long rigid member, usually horizontal, carrying loads across a span." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "A plank resting on two bricks has a heavy load placed at its centre. Which part of the plank is in tension?",
    options: [["The bottom surface", "Correct: it is stretched as the plank sags."], ["The top surface", "The top is squashed (compression)."], ["The middle layer", "That is the neutral axis: no stress."], ["The ends resting on the bricks", "The bending stresses are greatest in the middle of the span."]],
    answer: "A", explanation: "As the plank sags, the bottom is stretched (tension) and the top squashed (compression)." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "What name is given to the layer in a bending beam that is neither stretched nor squashed?",
    accepted: ["neutral axis", "the neutral axis", "neutral zone", "neutral layer", "the neutral zone"], wrong: ["centre of gravity"],
    explanation: "The neutral axis (neutral zone) carries no tension or compression." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A wooden plank is to be used as a beam. How should it be placed to sag least under a load?",
    options: [["On its edge, so its greater dimension is vertical", "Correct: depth matters most."], ["Flat, so its greater dimension is horizontal", "This sags much more."], ["It makes no difference", "Depth has a large effect."], ["On its end, standing upright", "Then it is no longer a beam across a span."]],
    answer: "A", explanation: "A deeper beam puts its top and bottom surfaces further from the neutral axis, making it much stiffer and stronger." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "Why are steel roof beams often made with an I-shaped cross-section?",
    options: [["Most material sits in the flanges, where the stress is greatest.", "Correct."], ["I-sections are the cheapest and quickest shape to make.", "Cost is not the main reason."], ["The thin web in the middle carries most of the bending load.", "The flanges carry most of the bending stress."], ["I-sections never bend, however large the load on them.", "They bend, but very little."]],
    answer: "A", explanation: "Material near the neutral axis does little work; the I-section moves it to the flanges, far from the axis, where it is most effective.",
    hints: ["Where in a bending beam are the stresses largest?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why are steel rods placed near the bottom of a reinforced concrete beam supported at both ends?",
    options: [["The bottom is in tension, and concrete is weak in tension while steel is strong.", "Correct."], ["The bottom is in compression and steel is weak in compression.", "The bottom is in tension."], ["To make the beam heavier so that it sits firmly and cannot shift on its supports", "Not the purpose: the steel is there to take the tension at the bottom."], ["To stop the concrete rusting.", "Concrete does not rust."]],
    answer: "A", explanation: "Concrete resists compression well but cracks under tension; the steel takes the tension in the stretched lower part.",
    hints: ["Which part of the beam is stretched?"] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each effect with its description.",
    pairs: [["Tension", "Material is pulled and stretched"], ["Compression", "Material is pushed and squashed"], ["Shear", "Layers of material slide over each other"], ["Buckling", "A long thin member bends sideways when compressed"]],
    explanation: "These are the four ways forces act inside structural members." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Material near the neutral axis of a beam carries little stress, so hollow beams can be almost as strong as solid ones for much less mass.",
    answer: true, explanation: "Removing material from near the neutral axis (box sections, tubes) saves weight with little loss of strength." });

  q.struct({ d: 3, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "Learners fold strips of card of the same size into beams of different cross-sections: flat, L-section and box section. Each is supported at its ends and the same load is hung from its centre.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which beam is likely to sag most?", options: [["The flat strip", "Correct: it has the smallest depth."], ["The L-section", "It is deeper than the flat strip."], ["The box section", "The stiffest of the three."], ["All sag equally", "Same material, different shapes, different stiffness."]], answer: "A", explanation: "The flat strip has almost no depth, so it is the least stiff." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why this is a fair test of the effect of cross-sectional shape.",
        points: ["The same amount of the same material (same mass per unit length) is used for every beam", "The span, the position of the load and its size are kept the same, so only the shape changes"] }),
    ],
    explanation: "Only the cross-section changes; the shapes with more depth (box, L) are stiffer than the flat strip.",
    hints: ["What must be kept the same in a fair test?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Which of these is a hollow beam section?",
    options: [["Box section", "Correct."], ["Solid rectangular section", "Not hollow."], ["T-section", "An open shape, not hollow."], ["L-section (angle)", "An open shape, not hollow."]],
    answer: "A", explanation: "A box section is a hollow rectangular tube." });

  q.mcq({ d: 4, skill: "ANALYSIS", applies: Z,
    stem: "A thin steel rod is used to support a heavy load by pushing up on it from below. What failure is most likely if the rod is long and thin?",
    options: [["Buckling", "Correct: long thin members under compression bend sideways."], ["Tensile fracture", "The rod is compressed, not stretched."], ["Shear at the neutral axis", "Not the main risk for a column."], ["Rusting", "Not a structural failure under load."]],
    answer: "A", explanation: "Under compression, a long thin member is liable to buckle: bend sideways and collapse well before the material itself is crushed.",
    hints: ["Is the rod being pushed or pulled?"] });

  q.card("DEFINITION", "What is a **beam**?", "A long rigid member that carries loads across a span between supports.", undefined, { applies: Z });
  q.card("CONCEPT", "Which parts of a beam supported at both ends and loaded in the middle are in tension and compression?", "Top: compression. Bottom: tension. Middle (neutral axis): no stress.", undefined, { applies: Z });
  q.card("DEFINITION", "What is the **neutral axis**?", "The layer of a bending beam that is neither stretched nor squashed.", undefined, { applies: Z });
  q.card("CONCEPT", "Why is a plank stronger on its edge than flat?", "Greater depth puts the top and bottom further from the neutral axis, making it stiffer.", undefined, { applies: Z });
  q.card("CONCEPT", "Why are I-section beams used?", "Material in the flanges, where stress is greatest, gives high strength for low mass.", undefined, { applies: Z });
  q.card("DEFINITION", "What is **buckling**?", "Sideways bending of a long thin member under compression.", undefined, { applies: Z });
  q.card("DEFINITION", "What is **shear**?", "Forces making layers of a material slide over one another.", undefined, { applies: Z });
  q.card("CONCEPT", "Where does the steel go in a reinforced concrete beam?", "Near the tension (bottom) side, because concrete is weak in tension.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.structures.trusses", {
  file: "structures/trusses",
  keyPrefix: "structures.trusses",
  objectives: { zimsec: ["5.2.1", "5.2.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is a truss?",
    options: [["A framework of members joined to form triangles", "Correct."], ["A solid steel beam with an I-shaped cross-section", "A truss is an open framework."], ["A single cable in tension holding up a bridge", "That is a tie or cable."], ["A curved arch of stone blocks in compression", "Not a truss."]],
    answer: "A", explanation: "A truss is a framework of members joined at their ends to form triangles." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "Why are trusses built from triangles?",
    options: [["A triangle cannot change shape unless a side changes length.", "Correct."], ["Triangles use the most material, so they are strongest.", "They use little material."], ["Triangles look attractive and are easy to paint.", "Not the engineering reason."], ["Triangles have no joints that could fail under load.", "They have three joints."]],
    answer: "A", explanation: "A pin-jointed triangle is rigid; a square can fold into a parallelogram without any member changing length." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is a strut?",
    options: [["A member in compression", "Correct."], ["A member in tension", "That is a tie."], ["A member carrying no force", "Not a strut."], ["The joint between two members", "That is a joint."]],
    answer: "A", explanation: "A strut is pushed: it is in compression." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is a tie?",
    options: [["A member in tension", "Correct."], ["A member in compression", "That is a strut."], ["A beam with an I-section", "Not a definition of a tie."], ["A support at the end of a truss", "Not a tie."]],
    answer: "A", explanation: "A tie is pulled: it is in tension." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "A rope can be used as a strut in a framework.",
    answer: false, explanation: "A rope can only pull. It can act as a tie (tension) but folds up under compression, so it cannot be a strut." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "In a triangular roof truss, what is the main job of the horizontal tie beam at the bottom?",
    options: [["It stops the rafters pushing the walls out; it is in tension.", "Correct."], ["It holds up the roof sheets directly; it is in compression.", "The rafters carry the roof sheets."], ["It is in compression and pushes the walls apart.", "It pulls the rafter ends together."], ["It has no force in it and is only for hanging a ceiling.", "It carries a large tension."]],
    answer: "A", explanation: "The loaded rafters try to spread outwards at their feet; the tie beam pulls the feet together, so it is in tension." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A learner replaces one member of a model truss with a piece of string. The frame still keeps its shape under load. What can she conclude?",
    options: [["That member was a tie (in tension).", "Correct: string can carry tension."], ["That member was a strut (in compression).", "String would go slack in compression."], ["That member carried no force at all.", "It might carry tension; string shows it."], ["The truss no longer needs triangles.", "The triangle shape is still there."]],
    answer: "A", explanation: "String can only pull. If it holds the frame, the member it replaced was pulled: a tie.",
    hints: ["What kind of force can a string carry?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why are struts usually made thicker than ties?",
    options: [["Struts are compressed and must not buckle.", "Correct."], ["Struts carry less force.", "That would make them thinner."], ["Ties are stronger materials.", "They may be the same material."], ["Thicker members are always lighter for their strength.", "Thicker members are heavier."]],
    answer: "A", explanation: "Compressed members can buckle sideways if they are thin; members in tension cannot buckle, so ties can be thin, even cables.",
    hints: ["Which kind of member can buckle?"] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each term with its meaning.",
    pairs: [["Strut", "Member in compression"], ["Tie", "Member in tension"], ["Triangulation", "Dividing a frame into triangles to make it rigid"], ["Strength-to-mass ratio", "How much load a structure carries for its mass"]],
    explanation: "Trusses use triangulation; their members are struts or ties, giving a high strength-to-mass ratio." });

  q.struct({ d: 3, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "An engineer must choose between a solid steel beam and a steel truss to span the roof of a new market hall.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Give three advantages of using a truss.",
        points: ["It is much lighter for the same strength (high strength-to-mass ratio)", "It uses less material, so it is cheaper (economy)", "It can span a wider gap; its members are mostly in pure tension or compression, the way materials are strongest"] }),
      P.mcq({ label: "(b)", stem: "Which member of the truss would be most likely to need cross-bracing to stop it buckling?", options: [["A long strut", "Correct: long compressed members can buckle."], ["A short tie", "Ties do not buckle."], ["A long tie", "Ties are in tension."], ["The bolts at the joints", "Bolts are fasteners, not members."]], answer: "A", explanation: "Long members in compression are at risk of buckling, so they are braced." }),
    ],
    explanation: "Trusses give high strength for low mass and cost and span long gaps; long struts need bracing against buckling.",
    hints: ["Think about mass, cost and span."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A rectangular wooden gate frame sags and twists into a parallelogram. What is the best fix?",
    options: [["Add a diagonal brace to divide it into triangles.", "Correct: triangles make it rigid."], ["Add another horizontal bar parallel to the first.", "The frame can still fold."], ["Paint the gate.", "Paint does not stop it changing shape."], ["Loosen the joints.", "That makes it worse."]],
    answer: "A", explanation: "A diagonal turns the rectangle into two triangles, which cannot change shape." });

  q.card("DEFINITION", "What is a **truss**?", "A framework of members joined at their ends to form triangles.", undefined, { applies: Z });
  q.card("CONCEPT", "Why are triangles used in frameworks?", "A triangle cannot change shape unless a side changes length, so it is rigid.", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **strut**?", "A framework member in compression.", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **tie**?", "A framework member in tension; it can be thin, even a cable.", undefined, { applies: Z });
  q.card("FACT", "Give three advantages of trusses over solid beams.", "High strength-to-mass ratio, less material (cheaper), can span long gaps.", undefined, { applies: Z });
  q.card("CONCEPT", "What does the tie beam of a roof truss do?", "It is in tension and stops the rafters pushing the walls apart.", undefined, { applies: Z });
  q.card("CONCEPT", "How can you tell whether a model's member is a tie?", "Replace it with string: if the frame still holds, the member was in tension.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.structures.joining-materials", {
  file: "structures/joining-materials",
  keyPrefix: "structures.joining",
  objectives: { zimsec: ["5.3.1", "5.3.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which of these is a pinning method of joining materials?",
    options: [["Riveting", "Correct: the rivet passes through both parts."], ["Gluing", "A surface-contact method."], ["Welding", "A surface-contact (fusion) method."], ["Soldering", "A surface-contact method."]],
    answer: "A", explanation: "Nails, screws, bolts, rivets and dowels are pins that pass through the parts." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "In which joining method do the edges of the metal parts themselves melt and fuse together?",
    options: [["Welding", "Correct."], ["Soldering", "Only the solder melts."], ["Brazing", "Only the brass filler melts."], ["Bolting", "Nothing melts."]],
    answer: "A", explanation: "Welding melts the parts themselves, so they fuse into one piece." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Which joining method is most suitable for connecting a wire to a circuit board?",
    options: [["Soldering", "Correct: low temperature, conducts electricity."], ["Welding", "Far too hot for delicate components."], ["Riveting", "Too large and crude."], ["Wood glue", "Glue does not conduct electricity."]],
    answer: "A", explanation: "Solder melts at a low temperature, makes a good electrical contact and does not damage the components." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Two pieces of wood are glued together. Which change would make the joint stronger?",
    options: [["Increasing the glued area, e.g. with a tongue-and-groove joint", "Correct."], ["Using a thicker layer of glue on a small area", "Contact area matters, not glue thickness."], ["Making the surfaces badly fitting so glue fills the gaps", "Gaps weaken the joint."], ["Using less glue so that the joint dries harder and faster", "Too little glue weakens the joint."]],
    answer: "A", explanation: "A glued joint's strength depends mainly on the area of good contact between the surfaces." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "A welded steel joint is usually stronger than a soldered joint between the same parts.",
    answer: true, explanation: "Welding fuses the parts themselves; solder is a soft, low-melting alloy that is much weaker." });

  q.match({ d: 2, skill: "RECALL", applies: Z,
    stem: "Match each fastener or method with a typical use.",
    pairs: [["Rivets", "Joining steel sheets of a trailer permanently"], ["Bolts and nuts", "A frame that may need to be taken apart"], ["Dowels and glue", "Joining parts of wooden furniture"], ["Welding", "Building steel burglar bars"]],
    explanation: "Choose a joining method to suit the material and whether the joint must be permanent." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A shelf bracket is held to a wall plank by nails. Which arrangement is likely to be strongest?",
    options: [["Three nails spread out across the bracket", "Correct: more pins, well spaced, share the load and resist turning."], ["One nail in the centre", "Fewer pins carry less load."], ["Three nails close together near one edge", "Bunched pins near an edge can split the wood and resist turning poorly."], ["Two nails very close to each other", "They act almost like one pin."]],
    answer: "A", explanation: "The strength of a pinned joint rises with the number of pins and their sensible spacing.",
    hints: ["Think about the number and position of the pins."] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "How is a plastic joint made by 'plastic welding'?",
    options: [["The surfaces are heated until they soften and fuse together.", "Correct."], ["Molten metal is poured between the plastic surfaces.", "That is not plastic welding."], ["They are bolted together through drilled holes.", "That is bolting, not welding."], ["They are stitched together tightly with strong nylon thread.", "Not a structural joining method here."]],
    answer: "A", explanation: "Thermoplastics soften when heated, so their surfaces can be fused together." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "Name the joining method for metals that uses a brass filler melted into the joint, without melting the parts themselves.",
    accepted: ["brazing", "braze", "brazed joint"], wrong: ["welding", "soldering"],
    explanation: "Brazing uses a brass filler at a higher temperature than soldering; it is stronger than solder but the parts do not melt." });

  q.struct({ d: 3, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "A learner tests the strength of three joints between identical wooden strips: (A) one nail, (B) a small glued overlap, (C) a large glued overlap. Each joint is loaded until it fails.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which glued joint should hold the larger load?", options: [["C, the large overlap", "Correct: larger contact area."], ["B, the small overlap", "Smaller area, weaker."], ["Both the same", "Area affects strength."], ["Neither will hold any load", "Glue can be very strong."]], answer: "A", explanation: "More contact area gives a stronger glued joint." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two things the learner must keep the same so that the comparison is fair.",
        points: ["The same size and type of wood strips", "The same way of loading (same direction and position of the load, increased in the same steps)"] }),
    ],
    explanation: "Contact area decides the strength of glued joints; a fair test changes only the joining method.",
    hints: ["What affects the strength of a glued joint?"] });

  q.card("DEFINITION", "What is **pinning**?", "Joining parts with fasteners through them: nails, screws, bolts, rivets, dowels.", undefined, { applies: Z });
  q.card("CONCEPT", "What affects the strength of a pinned joint?", "The number, size and position (spacing) of the pins.", undefined, { applies: Z });
  q.card("CONCEPT", "What affects the strength of a glued joint?", "The area of contact between well-fitting surfaces.", undefined, { applies: Z });
  q.card("CONCEPT", "Soldering, brazing and welding: how do they differ?", "Soldering: low-melting filler. Brazing: brass filler, hotter, stronger. Welding: the parts themselves melt and fuse, strongest.", undefined, { applies: Z });
  q.card("FACT", "How can plastics be joined?", "By heat welding or by gluing with solvent cement.", undefined, { applies: Z });
  q.card("FACT", "Why are rivets used on trailers and bridges?", "They make strong, permanent joints between metal plates.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.structures.large-structures", {
  file: "structures/large-structures",
  keyPrefix: "structures.large",
  objectives: { zimsec: ["5.4.2", "5.4.3", "5.4.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which material is strong in compression but weak in tension?",
    options: [["Concrete", "Correct."], ["Steel", "Steel is strong in both."], ["Rope", "Rope only works in tension."], ["Copper wire", "Wire is used in tension."]],
    answer: "A", explanation: "Concrete (like stone and brick) resists squashing well but cracks when stretched." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "In a suspension bridge, which parts are in tension?",
    options: [["The main cables and the hangers", "Correct."], ["The towers", "The towers are in compression."], ["The foundations of the towers", "They are compressed."], ["Nothing is in tension", "The cables are pulled tight."]],
    answer: "A", explanation: "The deck hangs from cables, which are pulled (tension); the towers are pushed down (compression)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why are stone and brick suitable for building arches?",
    options: [["An arch carries its load in compression, where stone is strong.", "Correct."], ["Arches are in tension, which suits stone and brick well.", "Stone is weak in tension."], ["Stone and brick are light, so the arch carries little weight.", "Stone is heavy."], ["Arches carry no load because the weight goes to the ends.", "Arches carry large loads."]],
    answer: "A", explanation: "The curve of an arch turns the load into compression along the arch, which stone and brick resist well." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is a dam wall built thicker at the bottom than at the top?",
    options: [["Water pressure increases with depth.", "Correct."], ["The top must be thin to let water flow over.", "Not the reason for the thickness."], ["Concrete is cheaper at the bottom.", "Not the reason."], ["The bottom must be warmer.", "Temperature is not the reason."]],
    answer: "A", explanation: "Pressure = ρgh grows with depth, so the base must withstand the greatest force." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "Kariba Dam is a thin curved concrete arch dam. Which way does its curve face, and why?",
    options: [["Upstream, so water pressure squeezes the arch into the gorge walls.", "Correct."], ["Downstream, so the water pulls the arch into its shape.", "Concrete must be kept in compression."], ["Upstream, so the water flows over the top more easily.", "Not the reason."], ["Either way: the curve is only there to make it look graceful.", "The curve is essential to an arch dam."]],
    answer: "A", explanation: "With the arch curving towards the water, the water's push becomes compression along the arch, carried into the strong rock of the gorge.",
    hints: ["Concrete is strong in compression."] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each bridge type with how it carries its load.",
    pairs: [["Beam bridge", "The deck bends: its top is compressed and its bottom stretched"], ["Arch bridge", "The load is carried as compression along a curve to the abutments"], ["Suspension bridge", "The deck hangs from cables in tension over towers in compression"], ["Pier bridge", "A series of short beams supported on many piers"]],
    explanation: "Each bridge type uses tension and compression differently." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Steel used in bridges must be protected, for example by painting or galvanising, because it rusts.",
    answer: true, explanation: "Steel is strong but corrodes in damp air, so its durability depends on protection." });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z,
    stem: "Which material would be the best choice for the main cables of a suspension bridge?",
    options: [["Steel wire", "Correct: very high tensile strength."], ["Concrete", "Weak in tension."], ["Brick", "Weak in tension and cannot form a cable."], ["Stone", "Weak in tension."]],
    answer: "A", explanation: "Cables are in tension, so they need a material with high tensile strength: steel.",
    hints: ["Is a cable in tension or compression?"] });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "What name is given to how well a material lasts without rotting, corroding or rusting?",
    accepted: ["durability", "durable", "its durability"], wrong: ["density", "strength"],
    explanation: "Durability describes how long a material lasts in use." });

  q.struct({ d: 4, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "A community plans a footbridge across a river near Chimanimani. Two designs are suggested: a wooden beam bridge on several piers, and a steel suspension bridge.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give one advantage and one disadvantage of using wood for the beam bridge.",
        points: ["Advantage: wood is light, cheap or locally available and easy to work", "Disadvantage: wood rots, can be eaten by termites and burns, so it is less durable"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why a suspension bridge can span a much wider river without piers.",
        points: ["The deck hangs from steel cables in tension, which are very strong for their mass", "The cables pass over towers (in compression) and are anchored at the banks, so no supports are needed in the river"] }),
    ],
    explanation: "Wood is cheap and easy to work but not durable; suspension bridges use high-tensile steel cables and towers to span wide gaps without piers.",
    hints: ["Think about strength, mass and durability.", "Which parts of a suspension bridge are in tension and which in compression?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does an earth dam have a very wide base?",
    options: [["Water pressure is greatest at the bottom, so the base must be widest.", "Correct."], ["Earth is strong in tension, so a wide base stretches less.", "Earth is weak in tension."], ["So that water can seep slowly through it and relieve the pressure behind it.", "Seepage is a danger, not a purpose."], ["Because earth is light and would blow away if narrow.", "It is heavy."]],
    answer: "A", explanation: "An earth dam relies on its mass and a wide, triangular cross-section to hold back water whose pressure increases with depth." });

  q.card("FACT", "Which materials are strong in compression but weak in tension?", "Stone, brick and concrete.", undefined, { applies: Z });
  q.card("FACT", "Why is reinforced concrete used?", "Steel bars carry the tension that plain concrete cannot.", undefined, { applies: Z });
  q.card("CONCEPT", "How does an arch carry a load?", "As compression along the curve, passed to strong supports (abutments).", undefined, { applies: Z });
  q.card("CONCEPT", "Suspension bridge: tension and compression?", "Cables and hangers in tension; towers in compression.", undefined, { applies: Z });
  q.card("CONCEPT", "Why are dam walls thicker at the bottom?", "Water pressure increases with depth.", undefined, { applies: Z });
  q.card("CONCEPT", "How does an arch dam such as Kariba work?", "It curves upstream so the water pushes it into compression against the valley's rock walls.", undefined, { applies: Z });
  q.card("FACT", "Name four properties used to choose construction materials.", "Compressive strength, tensile strength, mass and durability.", undefined, { applies: Z });
});
