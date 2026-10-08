import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.em.magnetic-effect", {
  file: "electromagnetism/magnetic-effect",
  keyPrefix: "em.field",
  objectives: { cambridge: ["4.5.3.1", "4.5.3.2", "4.5.3.3", "4.5.3.4", "4.5.3.5"], zimsec: ["13.1.1", "13.1.2", "13.1.3", "13.2.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What shape are the magnetic field lines around a long, straight wire carrying a current?",
    options: [["Circles centred on the wire", "Correct."], ["Straight lines parallel to the wire", "No."], ["Straight lines pointing away from the wire", "No."], ["The same shape as around a bar magnet", "That describes a solenoid."]],
    answer: "A", explanation: "The field lines around a straight current-carrying wire are concentric circles centred on the wire." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A vertical wire carries a current downwards. Looking down on it from above (so the current flows away from you), which way do the field lines go round the wire?",
    options: [["Clockwise", "Correct: thumb pointing away from you, fingers curl clockwise."], ["Anticlockwise", "That is for a current coming towards you."], ["There is no field.", "Every current has a magnetic field."], ["Up and down along the wire", "The field lines circle the wire."]],
    answer: "A", explanation: "By the right-hand grip rule, with the thumb pointing along the current (away from you), the fingers curl clockwise." });

  q.tf({ d: 2, skill: "RECALL",
    stem: "Reversing the current in a wire reverses the direction of its magnetic field.",
    answer: true, explanation: "The field direction depends on the current direction (right-hand grip rule)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "How does the strength of the magnetic field around a straight current-carrying wire change with distance from the wire?",
    options: [["It decreases further from the wire.", "Correct."], ["It increases further from the wire.", "The field is strongest close to the wire."], ["It is the same at all distances.", "No."], ["It is zero close to the wire.", "It is strongest close to the wire."]],
    answer: "A", explanation: "The field is strongest near the wire, so the circles are drawn further apart as the distance increases." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What does the magnetic field outside a current-carrying solenoid look like?",
    options: [["Like the field of a bar magnet", "Correct."], ["Circles around the solenoid", "That is a straight wire."], ["Uniform everywhere", "The field is uniform only inside."], ["There is no field outside.", "There is a bar-magnet-like field."]],
    answer: "A", explanation: "A solenoid's field is like a bar magnet's outside, and strong and nearly uniform inside." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "Looking at one end of a solenoid, you see the current flowing clockwise around the turns. Which magnetic pole is at that end?",
    options: [["A south pole", "Correct."], ["A north pole", "Anticlockwise current gives a north pole."], ["No pole", "Each end of a solenoid is a pole."], ["Both poles", "No."]],
    answer: "A", explanation: "Clockwise current (seen from the end) gives a south pole; anticlockwise gives a north pole.",
    hints: ["Use the right-hand grip rule: fingers along the current, thumb points to the north pole."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the changes that make an electromagnet stronger.",
    options: [["Increasing the current", "Correct."], ["Adding more turns of wire", "Correct."], ["Putting a soft-iron core inside the coil", "Correct."], ["Reversing the direction of the current", "This only swaps the poles."], ["Replacing the soft-iron core with a copper core", "Copper is not magnetic: the magnet is weaker."], ["Reducing the number of turns", "This makes it weaker."]],
    answer: ["A", "B", "C"], explanation: "More current, more turns and a soft-iron core all strengthen an electromagnet.",
    hints: ["Reversing the current changes the direction, not the strength."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "The current in a solenoid is doubled. What happens to the magnetic field inside it?",
    options: [["It becomes stronger.", "Correct."], ["It becomes weaker.", "A larger current gives a stronger field."], ["It reverses direction.", "Only reversing the current does that."], ["It does not change.", "It depends on the current."]],
    answer: "A", explanation: "The strength of the field increases with the size of the current." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "In a relay, what does the current in the coil do?",
    options: [["It magnetises an iron core, which attracts an armature that closes (or opens) a separate pair of contacts.", "Correct."], ["It heats a metal strip that bends.", "That describes a thermostat."], ["It flows directly through the second circuit.", "The two circuits are separate."], ["It charges a capacitor.", "No."]],
    answer: "A", explanation: "A relay uses the magnetic effect of a small coil current to operate a switch in another circuit." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why does the cone of a loudspeaker vibrate?",
    options: [["The alternating current in the coil makes a changing field that interacts with the permanent magnet's field, pushing the coil back and forth.", "Correct."], ["The permanent magnet vibrates on its own.", "The magnet is fixed."], ["Sound waves travel down the wire into the cone.", "The wire carries an electrical signal."], ["Static charge on the cone attracts it.", "Not the mechanism."]],
    answer: "A", explanation: "The current in the coil, sitting in the magnet's field, feels a force that reverses as the current reverses, so the coil and cone vibrate.",
    hints: ["The coil carries a current and sits in a magnetic field."] });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each arrangement with its magnetic field pattern.",
    pairs: [["A straight wire", "Circles centred on the wire"], ["A solenoid (outside)", "Like the field of a bar magnet"], ["A solenoid (inside)", "Strong, nearly uniform, parallel lines"]],
    explanation: "Straight wire: circles. Solenoid: bar-magnet pattern outside, uniform field inside." });

  q.short({ d: 1, skill: "RECALL",
    stem: "What name is given to a long coil of wire that produces a field like a bar magnet when a current flows through it?",
    accepted: ["solenoid", "a solenoid"], wrong: ["armature"],
    explanation: "A long coil of wire is a solenoid." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the right-hand grip rule for a straight wire.",
    template: "The thumb points along the {{blank:a}} and the fingers curl in the direction of the {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["current", "magnetic field"], accepted: ["current"], wrong: "magnetic field" },
      { id: "b", input: "select", choices: ["current", "magnetic field"], accepted: ["magnetic field"], wrong: "current" },
    ],
    explanation: "Thumb: conventional current. Fingers: magnetic field lines." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner investigates the magnetic field around a straight wire carrying a current.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how the learner could show the shape and direction of the field.",
        points: ["Pass the wire vertically through a horizontal card and connect it to a supply that gives a large current", "Sprinkle iron filings on the card and tap it gently: they form circles around the wire", "Place plotting compasses around the wire to show the direction of the field (and reverse the current to see them turn round)"] }),
      P.mcq({ label: "(b)", stem: "Why must the current be large?", options: [["So the field is strong enough to move the iron filings", "Correct."], ["To heat the wire", "Heating is a side effect, not the aim."], ["To make the field uniform", "The field is not uniform."], ["To reverse the field", "No."]], answer: "A",
        explanation: "The field of a straight wire is weak, so a large current is needed to see the pattern." }),
      P.mcq({ label: "(c)", stem: "Seen from above, the compasses point clockwise around the wire. In which direction is the current?", options: [["Downwards, away from the viewer", "Correct."], ["Upwards, towards the viewer", "That gives an anticlockwise field."], ["Horizontally", "The wire is vertical."], ["It cannot be found.", "The grip rule gives it."]], answer: "A",
        explanation: "A clockwise field seen from above means the thumb, and so the current, points away from the viewer: downwards." }),
    ],
    explanation: "Iron filings show the circular pattern; compasses show the direction, which the grip rule links to the current.",
    hints: ["Use the right-hand grip rule backwards to find the current."] });

  q.card("FACT", "Field around a straight wire?", "Concentric circles; strongest close to the wire.");
  q.card("CONCEPT", "Right-hand grip rule (straight wire)?", "Thumb along the conventional current; fingers curl in the field direction.");
  q.card("FACT", "Field of a solenoid?", "Like a bar magnet outside; strong and nearly uniform inside.");
  q.card("CONCEPT", "Which end of a solenoid is north?", "The end where the current flows anticlockwise (seen from that end); clockwise is south.");
  q.card("FACT", "How to make an electromagnet stronger?", "More current, more turns, a soft-iron core.");
  q.card("CONCEPT", "How does a relay work?", "A small coil current magnetises a core that attracts an armature, closing contacts in a separate circuit.");
  q.card("CONCEPT", "How does a loudspeaker work?", "An alternating current in a coil in a permanent magnet's field makes the coil and cone vibrate.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.em.motor-effect", {
  file: "electromagnetism/motor-effect",
  keyPrefix: "em.force",
  objectives: { cambridge: ["4.5.4.1", "4.5.4.2", "4.5.4.3"], zimsec: ["13.2.1", "13.2.2", "13.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "A wire carrying a current lies between the poles of a magnet, at right angles to the field. What happens?",
    options: [["It feels a force and moves.", "Correct: the motor effect."], ["It becomes a permanent magnet.", "No."], ["Nothing happens.", "There is a force on it."], ["The current stops.", "No."]],
    answer: "A", explanation: "A current-carrying conductor in a magnetic field feels a force (the motor effect)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change reverses the force on a current-carrying wire in a magnetic field?",
    options: [["Reversing the current", "Correct."], ["Increasing the current", "This makes the force bigger, not reversed."], ["Using a stronger magnet", "This makes the force bigger."], ["Reversing both the current and the field", "Two reversals cancel out."]],
    answer: "A", explanation: "Reversing either the current or the field reverses the force; reversing both leaves it unchanged." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "If both the current and the magnetic field are reversed, the force on the wire is reversed.",
    answer: false, explanation: "Reversing both quantities leaves the force in its original direction." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "In Fleming's left-hand rule, what does the first finger represent?",
    options: [["The magnetic field, from N to S", "Correct."], ["The current", "That is the second finger."], ["The force (motion)", "That is the thumb."], ["The flow of electrons", "No."]],
    answer: "A", explanation: "First finger: Field. seCond finger: Current. thuMb: Motion (force)." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A wire on a page carries a current from left to right. A magnetic field points into the page. In which direction is the force on the wire?",
    options: [["Towards the top of the page", "Correct."], ["Towards the bottom of the page", "Check the rule again: first finger into the page, second finger to the right."], ["Into the page", "The force is at right angles to the field."], ["Out of the page", "The force is at right angles to the field."]],
    answer: "A", explanation: "First finger into the page (field), second finger to the right (current): the thumb points to the top of the page.",
    hints: ["Use your left hand: first finger = field, second finger = current."] });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A wire carries a current out of the page. A north pole is above the wire and a south pole below it. In which direction is the force on the wire?",
    options: [["To the right", "Correct."], ["To the left", "Check the rule: field downwards, current out of the page."], ["Upwards", "The force is at right angles to the field."], ["Downwards", "The force is at right angles to the field."]],
    answer: "A", explanation: "Field from N to S points down; current out of the page. With the left hand, the thumb points to the right.",
    hints: ["The field points from the north pole to the south pole."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "When is there no force on a current-carrying wire in a magnetic field?",
    options: [["When the current is parallel to the field lines", "Correct."], ["When the current is at right angles to the field", "That gives the largest force."], ["When the magnet is very strong", "No."], ["When the wire is made of copper", "The material does not matter."]],
    answer: "A", explanation: "There is no force when the current flows along the field lines." });

  q.mcq({ d: 3, skill: "APPLICATION", applies: C,
    stem: "A beam of electrons travels towards the top of a page through a magnetic field directed into the page. In which direction is the beam deflected?",
    options: [["To the right", "Correct."], ["To the left", "Remember the conventional current is opposite to the electrons' motion."], ["Towards the bottom of the page", "No."], ["Out of the page", "No."]],
    answer: "A", explanation: "The conventional current points down the page (opposite to the electrons). First finger into the page, second finger down: the thumb points to the right.",
    hints: ["For electrons, point your second finger opposite to their motion."] });

  q.mcq({ d: 3, skill: "APPLICATION", applies: C,
    stem: "A beam of protons (positive particles) moves to the right through a magnetic field directed out of the page. In which direction are they deflected?",
    options: [["Downwards", "Correct."], ["Upwards", "Check the rule again."], ["To the left", "No."], ["Into the page", "No."]],
    answer: "A", explanation: "For positive particles the current is in their direction of motion. First finger out of the page, second finger to the right: the thumb points down.",
    hints: ["For positive particles, the current is in the direction they move."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why does a beam of charged particles move in a curve in a magnetic field?",
    options: [["The force on the particles is always at right angles to their motion.", "Correct."], ["The field slows the particles down.", "A magnetic force at right angles does not change their speed."], ["Gravity pulls them down.", "Negligible for such particles."], ["The particles become heavier.", "No."]],
    answer: "A", explanation: "A force always at right angles to the motion changes its direction continuously, giving a circular path." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Two long parallel wires carry currents in the same direction. What happens?",
    options: [["They attract each other.", "Correct."], ["They repel each other.", "That happens with opposite currents."], ["There is no force between them.", "Each wire is in the other's field."], ["They twist around each other.", "No."]],
    answer: "A", explanation: "Parallel currents in the same direction attract; in opposite directions they repel." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Two parallel wires carry currents in opposite directions. Which explanation of the force between them is correct?",
    options: [["Between the wires their fields add, giving a strong field that pushes the wires apart.", "Correct."], ["Between the wires their fields cancel, so the wires attract.", "That happens for currents in the same direction."], ["There is no field between the wires.", "Each wire has a field around it."], ["The fields cancel everywhere, so there is no force.", "No."]],
    answer: "A", explanation: "With opposite currents, the circular fields point the same way between the wires, so the field there is strong and the wires are pushed apart.",
    hints: ["Use the grip rule to find each wire's field in the region between them."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the changes that increase the force on a current-carrying wire in a magnetic field.",
    options: [["Increasing the current", "Correct."], ["Using a stronger magnet", "Correct."], ["Increasing the length of wire in the field", "Correct."], ["Reversing the current", "This reverses the force without making it bigger."], ["Turning the wire to lie along the field lines", "This reduces the force to zero."], ["Using a higher-resistance wire with the same p.d.", "The current, and so the force, would be smaller."]],
    answer: ["A", "B", "C"], explanation: "The force grows with the current, the field strength and the length of wire in the field.",
    hints: ["Reversing something changes the direction, not the size."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner rests a light copper rod across two horizontal copper rails that pass between the poles of a U-shaped magnet. The rails are connected to a battery and a switch.",
    parts: [
      P.mcq({ label: "(a)", stem: "When the switch is closed, the rod rolls along the rails. Why?", options: [["The rod carries a current in a magnetic field, so there is a force on it.", "Correct."], ["The rod is magnetised and attracted to the magnet.", "Copper is not magnetic."], ["The current heats the rod and it expands.", "Not the cause of rolling."], ["Static charge pushes the rod.", "No."]], answer: "A",
        explanation: "This is the motor effect." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two different ways of making the rod roll the other way.",
        points: ["Reverse the current (swap the battery connections)", "Reverse the magnetic field (turn the magnet over)"] }),
      P.mcq({ label: "(c)", stem: "The learner reverses both the battery and the magnet. Which way does the rod roll?", options: [["The original direction", "Correct: two reversals cancel."], ["The opposite direction", "Only one reversal would do that."], ["It does not move.", "There is still a force."], ["It rolls in the original direction, but faster", "The size of the force is unchanged."]], answer: "A",
        explanation: "Reversing both the current and the field leaves the force unchanged." }),
    ],
    explanation: "A current in a magnetic field feels a force; reversing one of current or field reverses it, reversing both does not.",
    hints: ["Copper is not magnetic: the force comes from the current."] });

  q.card("DEFINITION", "What is the **motor effect**?", "The force on a current-carrying conductor in a magnetic field.");
  q.card("CONCEPT", "Fleming's left-hand rule?", "First finger: Field (N→S). seCond finger: Current. thuMb: Motion (force).");
  q.card("FACT", "How do you reverse the force on a current?", "Reverse the current or the field (reversing both changes nothing).");
  q.card("FACT", "When is there no force on a current in a field?", "When the current is parallel to the field lines.");
  q.card("CONCEPT", "Electron beams in a magnetic field?", "Use the left-hand rule with the current opposite to the electrons' motion; the path is curved.", undefined, { applies: C });
  q.card("FACT", "Forces between parallel currents?", "Same direction: attract. Opposite directions: repel.", undefined, { applies: Z });
  q.card("FACT", "What increases the motor-effect force?", "More current, a stronger field, a longer length of wire in the field.");
});

// =====================================================================================================================
concept("phys.em.dc-motor", {
  file: "electromagnetism/dc-motor",
  keyPrefix: "em.motor",
  objectives: { cambridge: ["4.5.5.1", "4.5.5.2"], zimsec: ["13.2.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which energy transfer takes place in an electric motor?",
    options: [["Electrical energy to kinetic energy", "Correct."], ["Kinetic energy to electrical energy", "That is a generator."], ["Chemical energy to electrical energy", "That is a cell."], ["Thermal energy to kinetic energy", "That is a heat engine."]],
    answer: "A", explanation: "A motor transfers electrical energy into kinetic energy (with some thermal energy wasted)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change does NOT increase the turning effect on the coil of a d.c. motor?",
    options: [["Reversing the current", "Correct: this reverses the rotation instead."], ["Adding more turns to the coil", "This increases it."], ["Increasing the current", "This increases it."], ["Using a stronger magnet", "This increases it."]],
    answer: "A", explanation: "More turns, more current and a stronger field increase the turning effect; reversing the current only reverses the direction." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is the job of the split-ring commutator in a d.c. motor?",
    options: [["To reverse the current in the coil every half turn, so it keeps turning the same way", "Correct."], ["To change the a.c. supply into d.c.", "The supply is already d.c."], ["To increase the current in the coil", "No."], ["To hold the magnets in place", "No."]],
    answer: "A", explanation: "The commutator reverses the coil current every half turn, keeping the turning effect in the same direction." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What are the brushes in a d.c. motor?",
    options: [["Contacts that press on the commutator and carry current to the rotating coil", "Correct."], ["Parts that clean dust out of the motor", "No."], ["The magnets that provide the field", "No."], ["The axle on which the coil turns", "No."]],
    answer: "A", explanation: "Springy carbon brushes keep electrical contact with the spinning commutator." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The turning effect on a motor coil is largest when the plane of the coil is parallel to the magnetic field.",
    answer: true, explanation: "Then the forces on the sides act furthest from the axle; when the coil is at right angles to the field the turning effect is zero." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A rectangular coil is placed in a magnetic field and connected straight to a battery, with no commutator. What happens when the current is switched on?",
    options: [["It turns until its plane is at right angles to the field, then rocks to a stop.", "Correct."], ["It spins continuously.", "Without a commutator the forces stop helping after half a turn."], ["It does not move at all.", "It turns until it reaches the vertical position."], ["It spins faster and faster.", "No."]],
    answer: "A", explanation: "Without a commutator the current never reverses, so after the coil passes the vertical the forces turn it back: it settles at right angles to the field.",
    hints: ["What do the forces on the sides do once the coil has passed the vertical position?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "In a d.c. motor, there is no turning effect when the coil is vertical. Why does the coil not stop there?",
    options: [["Its momentum carries it past the vertical, and the reversed current then keeps it turning.", "Correct."], ["The brushes push it round.", "Brushes only carry current."], ["Gravity pulls it round.", "No."], ["The commutator stores energy to drive it.", "No."]],
    answer: "A", explanation: "The coil's momentum carries it through the vertical position; the commutator has reversed the current, so the forces keep turning it the same way.",
    hints: ["What keeps a moving object moving when no force acts?"] });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "A d.c. motor turns clockwise. The connections to the battery are swapped. What happens?",
    options: [["It turns anticlockwise.", "Correct."], ["It turns clockwise, faster.", "No."], ["It stops.", "No."], ["It turns clockwise, slower.", "No."]],
    answer: "A", explanation: "Reversing the current reverses the forces on the coil, so the motor turns the other way." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do the two long sides of a motor coil experience forces in opposite directions?",
    options: [["The current flows in opposite directions in the two sides.", "Correct."], ["The magnetic field points in opposite directions at the two sides.", "The field between the poles is in one direction."], ["One side is made of a different metal.", "No."], ["Only one side is in the field.", "Both sides are in the field."]],
    answer: "A", explanation: "The current goes along one side and back along the other, so by the left-hand rule the forces are opposite." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each part of a d.c. motor with its job.",
    pairs: [["Split-ring commutator", "Reverses the current in the coil every half turn"], ["Brushes", "Carry the current to the rotating commutator"], ["Permanent magnets", "Provide the magnetic field"], ["Coil", "Carries the current that feels the forces"]],
    explanation: "Commutator: reversing. Brushes: contact. Magnets: field. Coil: current-carrying conductor." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the changes that would make a d.c. motor spin faster.",
    options: [["Increasing the current", "Correct."], ["Adding more turns to the coil", "Correct."], ["Using stronger magnets", "Correct."], ["Reversing the magnets", "This reverses the rotation."], ["Swapping the battery connections", "This reverses the rotation."], ["Removing the commutator", "The motor would stop turning continuously."]],
    answer: ["A", "B", "C"], explanation: "A larger turning effect (more current, more turns, stronger field) makes the motor spin faster.",
    hints: ["Which changes increase the size of the forces on the coil?"] });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the part of a d.c. motor that reverses the current in the coil every half turn.",
    accepted: ["commutator", "split-ring commutator", "split ring commutator", "split ring", "the commutator", "a commutator"], wrong: ["brushes"],
    explanation: "The split-ring commutator reverses the current in the coil every half turn." });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "A simple d.c. motor has a rectangular coil between the poles of two magnets. The coil is connected to a battery through a split-ring commutator and brushes.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the coil starts to turn when the current is switched on.",
        points: ["The current flows in opposite directions in the two sides of the coil, which are in the magnetic field", "so (by Fleming's left-hand rule) one side is pushed up and the other down, giving a turning effect"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the coil keeps turning in the same direction.",
        points: ["Every half turn, as the coil passes the vertical, the commutator reverses the current in the coil", "so the force on each side reverses as it moves to the other pole, keeping the turning effect in the same direction"] }),
      P.mcq({ label: "(c)", stem: "How could the motor be made to turn the other way?", options: [["Reverse the battery connections", "Correct."], ["Add more turns to the coil", "That makes it faster."], ["Use a larger current", "That makes it faster."], ["Use stronger magnets", "That makes it faster."]], answer: "A",
        explanation: "Reversing the current (or the field) reverses the rotation." }),
    ],
    explanation: "Opposite currents in the two sides give opposite forces and a turning effect; the commutator keeps it turning one way.",
    hints: ["Use Fleming's left-hand rule on each side of the coil."] });

  q.card("CONCEPT", "Why does a current-carrying coil turn in a magnetic field?", "Opposite currents in its two sides give opposite forces, making a turning effect.");
  q.card("FACT", "How to increase a motor's turning effect?", "More turns, more current, a stronger magnet.");
  q.card("DEFINITION", "What is a **split-ring commutator**?", "A split metal ring that reverses the current in the coil every half turn.");
  q.card("DEFINITION", "What are **brushes** in a motor?", "Carbon contacts that carry current to the rotating commutator.");
  q.card("CONCEPT", "Why does the coil keep turning one way?", "The commutator reverses the coil current each half turn, and momentum carries the coil past the vertical.");
  q.card("FACT", "How to reverse a motor?", "Reverse the current or the magnetic field.");
});

// =====================================================================================================================
concept("phys.em.induction", {
  file: "electromagnetism/induction",
  keyPrefix: "em.induction",
  objectives: { cambridge: ["4.5.1.1", "4.5.1.2", "4.5.1.3", "4.5.1.4", "4.5.1.5"], zimsec: ["13.3.1", "13.3.2", "13.3.3", "13.3.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "A coil is connected to a sensitive meter. When is a current induced in the coil?",
    options: [["While a magnet is moving into or out of it", "Correct."], ["While a magnet rests inside it", "No movement, no induced current."], ["When the coil is near a stationary magnet", "No change, no induced current."], ["Never: coils cannot produce current", "Moving magnets induce currents."]],
    answer: "A", explanation: "A current is induced only while the magnetic field through the coil is changing, for example while a magnet moves in or out." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A magnet is pushed into a coil and a centre-zero meter flicks to the right. The magnet is then pulled out at the same speed. What does the meter do?",
    options: [["It flicks to the left.", "Correct: the change is reversed."], ["It flicks to the right again.", "The induced current reverses."], ["It does not move.", "There is still relative motion."], ["It flicks further to the right.", "No."]],
    answer: "A", explanation: "Pulling the magnet out reverses the change, so the induced current, and the deflection, reverse." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A strong magnet held still inside a coil induces a steady current in the coil.",
    answer: false, explanation: "With no relative motion the field through the coil does not change, so no e.m.f. is induced." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the changes that increase the size of the induced e.m.f. when a magnet is pushed into a coil.",
    options: [["Moving the magnet faster", "Correct."], ["Using a stronger magnet", "Correct."], ["Using a coil with more turns", "Correct."], ["Holding the magnet still inside the coil", "This gives no e.m.f."], ["Turning the magnet round", "This reverses the e.m.f. without increasing it."], ["Moving the magnet more slowly", "This reduces the e.m.f."]],
    answer: ["A", "B", "C"], explanation: "Faster motion, a stronger magnet and more turns all increase the induced e.m.f.",
    hints: ["Which changes make the field through the coil change faster or more?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A straight wire is moved along the direction of the magnetic field lines between the poles of a magnet. What is induced in it?",
    options: [["No e.m.f., because the wire does not cut any field lines", "Correct."], ["The largest possible e.m.f.", "That needs motion across the field."], ["An alternating e.m.f.", "No."], ["A steady current", "No."]],
    answer: "A", explanation: "An e.m.f. is induced only when the wire cuts across field lines." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which statement is Lenz's law?",
    options: [["The induced current always flows in a direction that opposes the change producing it.", "Correct."], ["The induced current always helps the change producing it.", "That would create energy from nothing."], ["The induced current always flows clockwise.", "Its direction depends on the change."], ["The induced e.m.f. is always equal to the battery e.m.f.", "No."]],
    answer: "A", explanation: "Lenz's law: the induced e.m.f. and current oppose the change that causes them." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "The north pole of a magnet is pushed towards one end of a coil that is part of a closed circuit. Which pole is induced at that end of the coil?",
    options: [["A north pole, which repels the approaching magnet", "Correct."], ["A south pole, which attracts the magnet", "That would help the motion, not oppose it."], ["No pole", "The induced current makes the coil a magnet."], ["A north pole, which attracts the magnet", "Like poles repel."]],
    answer: "A", explanation: "To oppose the approach of a north pole, the near end of the coil becomes a north pole and repels it.",
    hints: ["Lenz's law: the induced current opposes the change."] });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "The south pole of a magnet is pulled away from one end of a coil in a closed circuit. Which pole forms at that end of the coil?",
    options: [["A north pole, which attracts the magnet and opposes its removal", "Correct."], ["A south pole, which repels the magnet", "That would help it move away."], ["No pole", "A current is induced."], ["A south pole, which attracts the magnet", "Like poles repel."]],
    answer: "A", explanation: "The change is a south pole moving away; to oppose it, the coil end becomes a north pole and pulls the magnet back.",
    hints: ["The induced pole must try to stop the magnet leaving."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Lenz's law is a consequence of which principle?",
    options: [["Conservation of energy", "Correct: work must be done against the opposing force."], ["Conservation of charge", "Not this one."], ["Newton's first law", "No."], ["Ohm's law", "No."]],
    answer: "A", explanation: "Because the induced current opposes the motion, work must be done to move the magnet, and that work becomes electrical energy.",
    hints: ["What would happen if the induced current helped the magnet move?"] });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A horizontal wire is moved upwards between a north pole on the left and a south pole on the right. Which way does the induced current flow in the wire?",
    options: [["Into the page", "Correct."], ["Out of the page", "That is for downward motion."], ["To the left", "The current is along the wire, at right angles to the field and motion."], ["To the right", "No."]],
    answer: "A", explanation: "Right hand: thumb up (motion), first finger to the right (field): the second finger points into the page.",
    hints: ["Use Fleming's right-hand rule: thuMb motion, First finger field, seCond finger current."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "In Fleming's right-hand rule, what does the thumb represent?",
    options: [["The motion of the conductor", "Correct."], ["The magnetic field", "That is the first finger."], ["The induced current", "That is the second finger."], ["The force on the current", "That is the left-hand rule."]],
    answer: "A", explanation: "Right-hand rule: thuMb Motion, First finger Field, seCond finger induced Current." });

  q.fib({ d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "An e.m.f. is induced only when there is relative {{blank:a}} between a conductor and a magnetic field, or when the field linking a coil {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["motion", "contact", "resistance"], accepted: ["motion"], wrong: "contact" },
      { id: "b", input: "select", choices: ["changes", "stays the same", "is very strong"], accepted: ["changes"], wrong: "stays the same" },
    ],
    explanation: "Induction needs relative motion that cuts field lines, or a changing field." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner has a coil of wire, a bar magnet and a sensitive centre-zero meter.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe an experiment to show electromagnetic induction, and what is observed.",
        points: ["Connect the coil to the meter and push the magnet into the coil: the needle deflects", "Hold the magnet still: no deflection; pull it out: the needle deflects the opposite way", "Move the magnet faster: the deflection is larger"] }),
      P.mcq({ label: "(b)", stem: "Why is a centre-zero meter used?", options: [["The induced current can flow either way, and the needle can show both directions.", "Correct."], ["It can measure very large currents.", "The currents are small."], ["It never needs zeroing.", "Not the reason."], ["It works only with a.c.", "No."]], answer: "A",
        explanation: "The current reverses between pushing in and pulling out, so the needle must be able to move either way." }),
      P.mcq({ label: "(c)", stem: "The magnet is replaced by a stronger one, moved at the same speed. What happens to the deflection?", options: [["It is larger.", "Correct."], ["It is smaller.", "No."], ["It is the same.", "A stronger field gives a larger e.m.f."], ["It reverses.", "Only the direction of motion or the pole reverses it."]], answer: "A",
        explanation: "A stronger magnet gives a faster change of field, so a larger e.m.f." }),
    ],
    explanation: "Relative motion induces an e.m.f.; its direction depends on the direction of motion, its size on speed, field strength and turns.",
    hints: ["Think about pushing in, holding still and pulling out."] });

  q.card("DEFINITION", "What is **electromagnetic induction**?", "Producing an e.m.f. when a conductor cuts a magnetic field or the field linking it changes.");
  q.card("FACT", "Magnet and coil: what does the meter show?", "In: deflection one way. Still: zero. Out: opposite deflection. Faster: bigger deflection.");
  q.card("FACT", "Factors increasing the induced e.m.f.?", "Faster motion, stronger magnet, more turns on the coil.");
  q.card("DEFINITION", "**Lenz's law**?", "The induced current opposes the change that produces it.");
  q.card("CONCEPT", "Why must the induced current oppose the change?", "Conservation of energy: work done against the opposing force becomes electrical energy.");
  q.card("CONCEPT", "Fleming's right-hand rule?", "thuMb: Motion. First finger: Field. seCond finger: induced Current.");
});

// =====================================================================================================================
concept("phys.em.generators", {
  file: "electromagnetism/generators",
  keyPrefix: "em.generators",
  objectives: { cambridge: ["4.5.2.1", "4.5.2.2"], zimsec: ["13.3.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which energy transfer takes place in a generator?",
    options: [["Kinetic energy to electrical energy", "Correct."], ["Electrical energy to kinetic energy", "That is a motor."], ["Chemical energy to electrical energy", "That is a cell."], ["Light energy to electrical energy", "That is a solar cell."]],
    answer: "A", explanation: "A generator turns kinetic energy into electrical energy by electromagnetic induction." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of the slip rings in an a.c. generator?",
    options: [["To connect the rotating coil to the outside circuit without the wires twisting", "Correct."], ["To reverse the current every half turn", "That is what a commutator does."], ["To increase the voltage", "No."], ["To change a.c. into d.c.", "Slip rings keep the output alternating."]],
    answer: "A", explanation: "Each end of the coil is joined to its own slip ring; brushes pressing on the rings connect the spinning coil to the circuit." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which position of a generator coil is the induced e.m.f. zero?",
    options: [["When the plane of the coil is at right angles to the field, so its sides move along the field lines", "Correct."], ["When the plane of the coil is parallel to the field", "Then the e.m.f. is largest."], ["At every position, once it is turning", "The e.m.f. varies."], ["Only when the coil is stopped", "It also passes through zero twice each turn."]],
    answer: "A", explanation: "When the coil is perpendicular to the field, its sides move parallel to the field lines and cut none, so the e.m.f. is zero." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "When is the e.m.f. from a rotating generator coil at its maximum?",
    options: [["When the plane of the coil is parallel to the field, so its sides cut field lines fastest", "Correct."], ["When the plane of the coil is at right angles to the field", "Then it is zero."], ["When the coil is stationary", "No movement, no e.m.f."], ["Halfway between those positions", "Not the maximum."]],
    answer: "A", explanation: "The sides cut field lines at the greatest rate when moving straight across the field." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "The coil of an a.c. generator turns 30 times every second. What is the frequency of its output?",
    value: 30, unit: "Hz", wrong: [60, 15],
    explanation: "Each turn produces one complete cycle, so the frequency is 30 Hz." });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "The output of a simple a.c. generator has a frequency of 60 Hz. How many times does the coil turn in one minute?",
    value: 3600, wrong: [60, 1],
    explanation: "60 Hz means 60 turns each second; in 60 s that is 60 × 60 = 3600 turns.",
    hints: ["One turn gives one cycle.", "There are 60 seconds in a minute."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "The coil of an a.c. generator is turned twice as fast. How does the e.m.f.–time graph change?",
    options: [["The peaks are twice as high and there are twice as many cycles in the same time.", "Correct."], ["The peaks are higher, but the frequency is unchanged.", "Faster rotation also raises the frequency."], ["There are more cycles, but the peaks are the same height.", "Faster cutting also increases the e.m.f."], ["The graph does not change.", "No."]],
    answer: "A", explanation: "Faster rotation cuts field lines faster (larger e.m.f.) and completes more turns per second (higher frequency).",
    hints: ["Think about both the size and the frequency of the e.m.f."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "A stronger magnet is fitted to a generator that turns at the same speed. What changes?",
    options: [["The peak e.m.f. increases; the frequency stays the same.", "Correct."], ["The frequency increases.", "The frequency depends only on the speed of rotation."], ["Both the peak e.m.f. and the frequency increase.", "The frequency is unchanged."], ["Nothing changes.", "The e.m.f. increases."]],
    answer: "A", explanation: "A stronger field gives a larger e.m.f., but the number of turns per second, and so the frequency, is unchanged." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "What is the main difference between a simple a.c. generator and a simple d.c. generator?",
    options: [["The a.c. generator uses slip rings; the d.c. generator uses a split-ring commutator.", "Correct."], ["Only the a.c. generator has a magnet.", "Both have magnets."], ["The d.c. generator uses slip rings.", "It is the other way round."], ["The a.c. generator has no brushes.", "Both use brushes."]],
    answer: "A", explanation: "Slip rings give alternating output; a commutator reverses the connections each half turn, giving direct output." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Which best describes the output of a simple d.c. generator with one coil?",
    options: [["A current in one direction that rises and falls, dropping to zero twice each turn", "Correct."], ["A perfectly steady current", "The output still varies in size."], ["An alternating current", "The commutator stops it reversing."], ["No current at all", "No."]],
    answer: "A", explanation: "The commutator keeps the output in one direction, but its size still varies, giving humps on the graph.",
    hints: ["The commutator fixes the direction, not the size."] });

  q.tf({ d: 2, skill: "RECALL",
    stem: "In large power-station generators, an electromagnet usually rotates inside fixed coils.",
    answer: true, explanation: "Rotating the magnet avoids passing the very large output current through sliding contacts." });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the parts of an a.c. generator, fixed to the coil's axle, that connect the coil to the outside circuit through brushes.",
    accepted: ["slip rings", "slip-rings", "slip ring", "the slip rings"], wrong: ["commutator"],
    explanation: "Slip rings (with brushes) connect the coil of an a.c. generator to the circuit." });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "An a.c. generator coil starts with its plane vertical (at right angles to the magnetic field) and turns steadily 50 times every second.",
    parts: [
      P.mcq({ label: "(a)", stem: "What is the e.m.f. at the start?", options: [["Zero", "Correct: the sides are moving along the field lines."], ["Its maximum value", "That is when the coil is horizontal."], ["Half its maximum value", "No."], ["Its maximum negative value", "No."]], answer: "A",
        explanation: "With the coil vertical, the sides cut no field lines." }),
      P.mcq({ label: "(b)", stem: "What is the e.m.f. after a quarter of a turn?", options: [["At a peak (its maximum value)", "Correct: the coil is now horizontal."], ["Zero", "That is after half a turn."], ["Half its maximum value", "No."], ["A quarter of its maximum value", "No."]], answer: "A",
        explanation: "After a quarter turn the coil's plane is parallel to the field and the e.m.f. is a maximum." }),
      P.num({ label: "(c)", stem: "Calculate the period of the output.", value: 0.02, answer: "0.02", unit: "s", wrong: [50, 0.5],
        explanation: t`$f = 50\ \text{Hz}$, so $T = \dfrac{1}{50} = 0.02\ \text{s}$.` }),
      P.manual({ label: "(d)", marks: 1, stem: "State one change that would increase the peak e.m.f. without changing the frequency.",
        points: ["Any one: a stronger magnet; more turns on the coil; a coil of larger area"] }),
    ],
    explanation: "The e.m.f. is zero with the coil vertical and maximum a quarter turn later; one turn is one cycle.",
    hints: ["One complete turn gives one complete cycle."] });

  q.card("DEFINITION", "What is a **generator**?", "A device that transfers kinetic energy into electrical energy by electromagnetic induction.");
  q.card("DEFINITION", "What are **slip rings**?", "Rings on a generator's axle that, with brushes, connect the rotating coil to the circuit, giving a.c.");
  q.card("FACT", "When is a generator's e.m.f. zero and maximum?", "Zero: coil at right angles to the field. Maximum: coil parallel to the field.", undefined, { applies: C });
  q.card("CONCEPT", "Effect of turning a generator faster?", "Larger peak e.m.f. and higher frequency.");
  q.card("FACT", "Frequency of a simple generator's output?", "Equal to the number of turns of the coil per second.");
  q.card("CONCEPT", "a.c. vs d.c. generator?", "a.c.: slip rings, output reverses. d.c.: split-ring commutator, output one way (humps).", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.em.transformers", {
  file: "electromagnetism/transformers",
  keyPrefix: "em.transformers",
  objectives: { cambridge: ["4.5.6.1", "4.5.6.2", "4.5.6.3", "4.5.6.4", "4.5.6.5", "4.5.6.6", "4.5.6.7", "4.5.6.8"], zimsec: ["13.4.1", "13.4.2", "13.4.3", "13.4.4", "13.4.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the core of a transformer made of?",
    options: [["Soft iron", "Correct."], ["Steel", "Steel would waste energy each cycle."], ["Copper", "Copper is used for the coils."], ["Plastic", "Plastic is not magnetic."]],
    answer: "A", explanation: "A soft-iron core carries the changing magnetic field from the primary to the secondary coil." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why does a transformer not work with a steady d.c. supply?",
    options: [["A steady current gives a constant field, which induces no e.m.f. in the secondary.", "Correct."], ["D.c. is too small to pass through the coil.", "No."], ["D.c. would melt the core.", "No."], ["D.c. flows only in the secondary coil.", "No."]],
    answer: "A", explanation: "Induction needs a changing field; only an alternating current gives a continuously changing field." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A transformer has 400 turns on its primary coil and 2000 turns on its secondary coil. The primary voltage is 46 V. Calculate the secondary voltage.",
    value: 230, unit: "V", wrong: [9.2, 0.0943],
    explanation: t`$V_s = V_p \times \dfrac{N_s}{N_p} = 46 \times \dfrac{2000}{400} = 230\ \text{V}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "A step-down transformer changes 230 V into 11.5 V. Its secondary coil has 60 turns. How many turns are on the primary coil?",
    value: 1200, wrong: [3, 46],
    explanation: t`$N_p = N_s \times \dfrac{V_p}{V_s} = 60 \times \dfrac{230}{11.5} = 1200$ turns.`,
    hints: [t`Use $\dfrac{V_p}{V_s} = \dfrac{N_p}{N_s}$.`] });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "A transformer has more turns on its secondary coil than on its primary coil. What type of transformer is it?",
    options: [["Step-up", "Correct."], ["Step-down", "A step-down transformer has fewer secondary turns."], ["It cannot be a transformer.", "It can."], ["It depends on the current.", "It depends on the turns ratio."]],
    answer: "A", explanation: "More turns on the secondary give a higher output voltage: a step-up transformer." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "An ideal (100% efficient) transformer steps 240 V up to 12 000 V. The primary current is 4.0 A. Calculate the secondary current.",
    value: 0.08, answer: "0.080", unit: "A", wrong: [200, 0.0013],
    explanation: t`$I_s = \dfrac{I_p V_p}{V_s} = \dfrac{4.0 \times 240}{12\,000} = 0.080\ \text{A}$.`,
    hints: [t`Power in = power out: $I_p V_p = I_s V_s$.`] });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "An ideal transformer supplies 12 V and 3.0 A to a lamp. Its primary is connected to 230 V. Calculate the primary current.",
    value: 36 / 230, unit: "A", wrong: [57.5, 0.36],
    explanation: t`Output power $= 12 \times 3.0 = 36\ \text{W}$. $I_p = \dfrac{36}{230} = 0.16\ \text{A}$.`,
    hints: ["Find the output power first.", "Power in = power out for an ideal transformer."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is electricity transmitted over long distances at a very high voltage?",
    options: [["The current is smaller, so less energy is wasted heating the cables.", "Correct."], ["Electricity travels faster at high voltage.", "No."], ["High voltage is safer near homes.", "It is more dangerous, which is why it is stepped down."], ["Transformers only work at high voltage.", "They work at any a.c. voltage."]],
    answer: "A", explanation: "For the same power, P = IV, a higher voltage means a smaller current and much smaller heating losses." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: "A transmission cable has a resistance of 8.0 Ω and carries a current of 25 A. Calculate the power wasted as heat in the cable.",
    value: 5000, unit: "W", wrong: [200, 1600],
    explanation: t`$P = I^2 R = 25^2 \times 8.0 = 5000\ \text{W}$.`,
    hints: [t`Use $P = I^2 R$.`] });

  q.num({ d: 4, skill: "ANALYSIS", applies: C,
    stem: "A power of 2.0 MW is transmitted at 400 kV through cables with a total resistance of 10 Ω. Calculate the power wasted in the cables.",
    value: 250, unit: "W", wrong: [50, 2.5e7],
    explanation: t`$I = \dfrac{P}{V} = \dfrac{2.0 \times 10^{6}}{4.0 \times 10^{5}} = 5.0\ \text{A}$, so the loss is $I^2 R = 5.0^2 \times 10 = 250\ \text{W}$.`,
    hints: ["First find the current from P = IV.", t`Then use $P = I^2 R$.`] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is the core of a transformer laminated (made of thin, insulated sheets)?",
    options: [["To reduce eddy currents, which waste energy by heating the core", "Correct."], ["To make the transformer lighter", "Not the reason."], ["To increase the voltage", "The turns ratio sets the voltage."], ["To stop the coils touching the core", "The coils are insulated anyway."]],
    answer: "A", explanation: "The changing field induces eddy currents in the core; insulated laminations cut them down, reducing heating.",
    hints: ["The changing field induces currents in any conductor, including the core."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z, multiple: true,
    stem: "Select **all** the ways in which energy losses in a transformer are reduced.",
    options: [["Using thick copper wire for the coils", "Correct: less heating."], ["Using a laminated core", "Correct: smaller eddy currents."], ["Using a soft-iron core", "Correct: easily magnetised and demagnetised."], ["Using a solid steel core", "This increases losses."], ["Using thin, high-resistance wire", "This increases heating."], ["Winding the two coils on separate cores far apart", "This lets the field leak away."]],
    answer: ["A", "B", "C"], explanation: "Thick coils, a laminated soft-iron core and closely wound coils keep losses small.",
    hints: ["Think about heating in the coils and in the core."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which sequence describes how a transformer works?",
    options: [["Alternating current in the primary → changing magnetic field in the core → alternating e.m.f. induced in the secondary", "Correct."], ["Current flows from the primary coil through the core into the secondary coil", "The coils are not connected electrically."], ["The core stores charge and releases it into the secondary", "No."], ["The secondary is joined to the primary by a wire", "There is no electrical connection."]],
    answer: "A", explanation: "The two coils are linked only by the changing magnetic field in the iron core." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A step-up transformer increases both the voltage and the current.",
    answer: false, explanation: "Power in equals power out (at best), so if the voltage goes up, the current goes down." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A phone charger contains a transformer that steps 230 V down to 5.0 V. The primary coil has 920 turns.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of turns on the secondary coil.", value: 20, wrong: [42320],
        explanation: t`$N_s = 920 \times \dfrac{5.0}{230} = 20$ turns.` }),
      P.num({ label: "(b)", marks: 2, stem: "The charger supplies 2.0 A to the phone. Assuming the transformer is 100% efficient, calculate the primary current.", value: 10 / 230, unit: "A", wrong: [92, 0.087],
        explanation: t`Output power $= 5.0 \times 2.0 = 10\ \text{W}$, so $I_p = \dfrac{10}{230} = 0.043\ \text{A}$.` }),
      P.mcq({ label: "(c)", stem: "What type of transformer is this?", options: [["Step-down", "Correct: it reduces the voltage."], ["Step-up", "It reduces the voltage."], ["Neither", "No."], ["Both", "No."]], answer: "A",
        explanation: "It has fewer secondary turns and reduces the voltage." }),
    ],
    explanation: "Use the turns ratio for the coils and power in = power out for the currents.",
    hints: [t`$\dfrac{V_p}{V_s} = \dfrac{N_p}{N_s}$ and $I_p V_p = I_s V_s$.`] });

  q.card("DEFINITION", "What is a **transformer**?", "Two coils on a soft-iron core that change the size of an alternating voltage.");
  q.card("CONCEPT", "How does a transformer work?", "A.c. in the primary → changing field in the core → alternating e.m.f. induced in the secondary.");
  q.card("FORMULA", "Transformer turns ratio?", t`$\dfrac{V_p}{V_s} = \dfrac{N_p}{N_s}$`);
  q.card("FORMULA", "Ideal transformer power?", t`$I_p V_p = I_s V_s$`);
  q.card("DEFINITION", "**Step-up** vs **step-down**?", "Step-up: more secondary turns, higher output voltage. Step-down: fewer secondary turns, lower output voltage.");
  q.card("CONCEPT", "Why transmit at high voltage?", "Smaller current, so much less energy wasted heating the cables; thinner cables can be used.");
  q.card("FORMULA", "Power lost in a cable?", t`$P = I^2 R$`, undefined, { applies: C });
  q.card("FACT", "Reducing transformer losses?", "Thick copper coils, laminated soft-iron core, coils wound close together.", undefined, { applies: Z });
});
