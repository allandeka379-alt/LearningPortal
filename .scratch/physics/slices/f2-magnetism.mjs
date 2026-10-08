import { concept, P } from "../lib.mjs";

const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.magnetism.magnets", {
  file: "magnetism/magnets",
  keyPrefix: "magnetism.magnets",
  objectives: { cambridge: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5", "4.1.6", "4.1.7", "4.1.8", "4.1.10", "4.1.11"], zimsec: ["12.1.1", "12.1.2", "12.1.3", "12.1.4", "12.1.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which pair of magnetic poles attract each other?",
    options: [["A north pole and a south pole", "Correct: unlike poles attract."], ["Two north poles", "Like poles repel."], ["Two south poles", "Like poles repel."], ["No pair of poles attracts.", "Unlike poles attract."]],
    answer: "A", explanation: "Unlike poles attract; like poles repel." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these materials is magnetic?",
    options: [["Nickel", "Correct."], ["Copper", "Non-magnetic."], ["Aluminium", "Non-magnetic."], ["Brass", "Non-magnetic."]],
    answer: "A", explanation: "Iron, steel, nickel and cobalt are magnetic; copper, aluminium and brass are not." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A magnet attracts all metals.",
    answer: false, explanation: "Only magnetic materials (iron, steel, nickel, cobalt) are attracted; metals such as copper, aluminium and gold are not." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is induced magnetism?",
    options: [["A magnetic material becoming a magnet near or touching one", "Correct."], ["A magnet losing its magnetism when it is heated", "That is demagnetisation."], ["The attraction of copper to a nearby magnet", "Copper is not attracted."], ["The force between two electrically charged objects", "That is electrostatics."]],
    answer: "A", explanation: "A magnetic material placed in a magnet's field becomes magnetised itself: induced magnetism." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A steel paper clip hangs from the north pole of a bar magnet. Which pole is induced at the top of the clip, where it touches the magnet?",
    options: [["A south pole", "Correct: so the clip is attracted."], ["A north pole", "Then the clip would be repelled."], ["No pole", "The clip becomes magnetised."], ["Both poles at once", "Each end has one pole."]],
    answer: "A", explanation: "The end of the clip nearest the magnet's N pole becomes an S pole, so unlike poles attract." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is soft iron, rather than steel, used for the core of an electromagnet?",
    options: [["It magnetises easily and loses it when the current stops.", "Correct."], ["It keeps its magnetism permanently after use.", "That is steel."], ["It is non-magnetic, so it does not interfere.", "Soft iron is magnetic."], ["It is a better electrical conductor than steel.", "The core does not carry the current."]],
    answer: "A", explanation: "Soft iron makes a temporary magnet; steel would stay magnetised after switching off." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "How is the direction of a magnetic field at a point defined?",
    options: [["As the direction of the force on a north pole placed there", "Correct."], ["As the direction of the force on a south pole placed there", "The definition uses a north pole."], ["Always towards the nearest north pole", "No."], ["As the direction of the current in the magnet", "No."]],
    answer: "A", explanation: "The field direction is the way a north pole would be pushed, which is the way a compass needle points." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Outside a bar magnet, in which direction do the magnetic field lines run?",
    options: [["From the north pole to the south pole", "Correct."], ["From the south pole to the north pole", "That is the wrong way."], ["Outwards from the middle of the magnet", "They start at N and end at S."], ["In circles around the middle of the magnet", "That describes a current-carrying wire."]],
    answer: "A", explanation: "Outside the magnet, field lines leave the N pole and curve round into the S pole." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "On a magnetic field diagram, how can you tell where the field is strongest?",
    options: [["The field lines are closest together there.", "Correct."], ["The field lines are furthest apart there.", "Wide spacing means a weak field."], ["The field lines are curved there.", "Curvature shows direction changes, not strength."], ["The field lines are straight there.", "No."]],
    answer: "A", explanation: "The closer together the field lines, the stronger the field; they are closest near the poles." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Which observation proves that a steel bar is magnetised?",
    options: [["One end of it repels one pole of a known magnet.", "Correct: only a magnet can be repelled."], ["It is attracted by a known magnet.", "An unmagnetised steel bar is also attracted."], ["It conducts electricity.", "Steel conducts whether or not it is magnetised."], ["It is heavier than an unmagnetised bar.", "Magnetising does not change mass."]],
    answer: "A", explanation: "A magnet attracts unmagnetised magnetic materials too, so repulsion is the only sure test.",
    hints: ["Which behaviour can happen only between two magnets?"] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with what it shows about a magnetic field.",
    pairs: [["Plotting compasses", "The pattern and the direction of the field lines"], ["Iron filings", "The pattern of the field only"], ["A freely suspended bar magnet", "The north–south direction of the Earth's field"]],
    explanation: "Compasses show direction as well as pattern; iron filings show only the pattern; a suspended magnet lines up north–south." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Which method makes the strongest permanent magnet from a steel bar?",
    options: [["Putting it in a solenoid carrying a large d.c.", "Correct."], ["Stroking it once with a weak magnet", "One stroke gives very weak magnetism."], ["Hammering it while it points north–south", "Hammering tends to demagnetise a magnet, and it is not the strongest method."], ["Heating it strongly and letting it cool", "Heating demagnetises."]],
    answer: "A", explanation: "The electrical method, a large d.c. in a solenoid, magnetises steel most strongly.",
    hints: ["Which methods destroy magnetism instead of creating it?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Which of these would demagnetise a magnet?",
    options: [["Pulling it slowly out of a solenoid carrying a.c.", "Correct."], ["Placing it in a solenoid carrying d.c.", "That magnetises it."], ["Storing it with soft-iron keepers", "Keepers help it keep its magnetism."], ["Stroking it with another magnet one way", "That magnetises it."]],
    answer: "A", explanation: "Heating, hammering, or slowly withdrawing it from a coil carrying alternating current all demagnetise a magnet." });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A steel bar is stroked many times from end A to end B with the north pole of a magnet, lifting the magnet clear between strokes. Which pole forms at end B?",
    options: [["A south pole", "Correct: the end where the strokes finish takes the opposite pole."], ["A north pole", "The finishing end takes the opposite pole to the stroking pole."], ["No pole", "The bar becomes magnetised."], ["The pole keeps changing", "It is fixed by the direction of stroking."]],
    answer: "A", explanation: "In the stroking method, the end where each stroke finishes becomes the opposite pole to the stroking pole.",
    hints: ["Unlike poles attract: what pole would follow a north pole along the bar?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Two bar magnets are placed in a line with their north poles facing each other. What does the combined field pattern show?",
    options: [["The lines push apart, with a neutral point between: they repel.", "Correct."], ["Lines run straight across from pole to pole: they attract.", "That happens with unlike poles facing."], ["There is no field anywhere near the two magnets.", "Each magnet still has its field."], ["The two fields form a single loop around both magnets.", "Not with like poles facing."]],
    answer: "A", explanation: "With like poles facing, the fields oppose between the magnets, giving a neutral point; the interaction of the fields is a repulsion.",
    hints: ["Field lines never cross."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner is asked to plot the magnetic field around a bar magnet using a small plotting compass.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how the learner should plot one field line.",
        points: ["Place the magnet on paper, draw round it, and put the compass next to the north pole", "Mark a dot where the compass needle points, then move the compass so its tail is over the dot and repeat", "Join the dots with a smooth line ending at the south pole, with an arrow from N to S; repeat from other starting points"] }),
      P.mcq({ label: "(b)", stem: "How would the result differ if iron filings were sprinkled on paper over the magnet instead?", options: [["The pattern is shown, but not the direction of the field.", "Correct."], ["The direction is shown, but not the pattern.", "It is the other way round."], ["No pattern would be seen.", "Filings line up along the field lines."], ["The field would be reversed.", "Filings do not change the field."]], answer: "A",
        explanation: "Filings show the shape of the field quickly but not which way it points." }),
    ],
    explanation: "Step a plotting compass along the field from N to S, marking the needle direction; iron filings show only the pattern.",
    hints: ["The compass needle points along the field line."] });

  q.card("FACT", "Forces between magnetic poles?", "Like poles repel; unlike poles attract.");
  q.card("FACT", "Which materials are magnetic?", "Iron, steel, nickel and cobalt.");
  q.card("DEFINITION", "What is **induced magnetism**?", "A magnetic material becoming a magnet when placed near or touching a magnet.");
  q.card("CONCEPT", "Soft iron vs steel?", "Soft iron: easily magnetised and demagnetised (temporary magnets). Steel: harder to magnetise but keeps it (permanent magnets).");
  q.card("DEFINITION", "What is a **magnetic field**?", "A region where a magnetic pole feels a force; its direction is the force on a north pole.");
  q.card("FACT", "Field lines around a bar magnet?", "From N to S outside the magnet; closer lines mean a stronger field.");
  q.card("FACT", "The only sure test for a magnet?", "Repulsion: one end repels a pole of a known magnet.");
  q.card("CONCEPT", "Magnetising and demagnetising?", "Magnetise: stroking, or d.c. in a solenoid. Demagnetise: heating, hammering, or a.c. in a solenoid while withdrawing slowly.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.magnetism.uses-of-magnets", {
  file: "magnetism/uses-of-magnets",
  keyPrefix: "magnetism.uses",
  objectives: { cambridge: ["4.1.9"], zimsec: ["12.2.1", "12.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which device uses an electromagnet?",
    options: [["An electric bell", "Correct."], ["A compass", "A compass uses a permanent magnet."], ["A fridge door seal", "That uses a permanent magnetic strip."], ["A bar magnet", "That is a permanent magnet."]],
    answer: "A", explanation: "An electric bell uses an electromagnet that switches on and off repeatedly." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is an electromagnet, rather than a permanent magnet, used on a scrap-yard crane?",
    options: [["It can be switched off to release the load.", "Correct."], ["It attracts aluminium as well as iron.", "Aluminium is not magnetic."], ["It never needs any electricity.", "It needs a current."], ["It is always weaker, which is safer.", "Electromagnets can be very strong."]],
    answer: "A", explanation: "The crane must drop its load: switching off the current makes the soft-iron core lose its magnetism." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which of these uses needs a permanent magnet?",
    options: [["A compass needle", "Correct."], ["A relay", "A relay uses an electromagnet."], ["An electric bell", "Uses an electromagnet."], ["A circuit breaker", "Uses an electromagnet."]],
    answer: "A", explanation: "A compass needle must stay magnetised all the time, so it is a permanent magnet." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "The core of an electromagnet should be made of steel so that it keeps its magnetism.",
    answer: false, explanation: "The core should be soft iron, which loses its magnetism when the current stops; that is the whole point of an electromagnet." });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each device with how it uses magnetism.",
    pairs: [["Relay", "A small current in a coil switches a separate circuit"], ["Electric bell", "An armature is repeatedly attracted and released"], ["Scrap-yard crane", "Lifts iron and releases it when the current is switched off"], ["Compass", "A magnetised needle lines up with the Earth's field"]],
    explanation: "Relay: switching. Bell: armature on and off. Crane: lift and release. Compass: alignment." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "In an electric bell, why does the armature keep moving back and forth while the bell push is pressed?",
    options: [["Pulling the armature breaks the circuit; a spring then remakes it.", "Correct."], ["The current is alternating, so the magnet keeps reversing.", "Bells usually run on d.c.; the make-and-break contact does the switching."], ["The hammer bounces off the gong and back again.", "Not the main cause."], ["The gong pushes the armature back with a magnetic force.", "The gong is not a magnet."]],
    answer: "A", explanation: "The make-and-break contact switches the electromagnet off each time the armature moves, so the cycle repeats.",
    hints: ["What happens to the circuit when the armature moves towards the electromagnet?"] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is the main purpose of a relay?",
    options: [["To let a small current switch a separate large-current circuit", "Correct."], ["To increase the voltage of a supply for a large load", "That is a transformer."], ["To store electrical energy until the circuit needs it", "A relay is a switch, not a store."], ["To change a.c. into d.c. for the circuit it switches", "That is a rectifier."]],
    answer: "A", explanation: "A relay uses a small current in its coil to close (or open) contacts in another circuit." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "At a recycling plant, steel cans are separated from aluminium cans using a large magnet. Why does this work?",
    options: [["Steel is magnetic but aluminium is not.", "Correct."], ["Aluminium is heavier than steel.", "Not the reason."], ["Steel is a better electrical conductor.", "Magnetic separation does not depend on conduction."], ["Aluminium is magnetic but steel is not.", "It is the other way round."]],
    answer: "A", explanation: "The magnet attracts the steel cans and leaves the non-magnetic aluminium cans behind." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why is the armature of an electric bell made of soft iron?",
    options: [["It demagnetises at once, so it is released when current stops.", "Correct."], ["It is a good electrical conductor for the contacts.", "Not the reason."], ["It is a permanent magnet that keeps its strength.", "Soft iron makes temporary magnets."], ["It is non-magnetic, so it springs back freely each time.", "It must be attracted by the electromagnet."]],
    answer: "A", explanation: "A steel armature would stay magnetised and stick to the electromagnet; soft iron lets go at once.",
    hints: ["What must happen to the armature when the current stops?"] });

  q.mcq({ d: 3, skill: "RECALL", multiple: true,
    stem: "Select **all** the devices that contain a permanent magnet.",
    options: [["A loudspeaker", "Correct."], ["A bicycle dynamo", "Correct."], ["A compass", "Correct."], ["The core of a scrap-yard lifting magnet", "Soft iron: temporary."], ["The core of an electric bell's electromagnet", "Soft iron: temporary."], ["The core of a relay coil", "Soft iron: temporary."]],
    answer: ["A", "B", "C"], explanation: "Loudspeakers, dynamos and compasses use permanent magnets; electromagnet cores are soft iron.",
    hints: ["Which devices need a magnetic field all the time?"] });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the type of magnet that can be switched on and off.",
    accepted: ["electromagnet", "an electromagnet", "electromagnets", "temporary magnet", "a temporary magnet"], wrong: ["permanent magnet"],
    explanation: "An electromagnet is magnetised only while a current flows." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A car's key switch operates the starter motor through a relay.",
    parts: [
      P.mcq({ label: "(a)", stem: "Why is a relay used instead of a key switch that carries the starter current directly?", options: [["The key carries a small current; the huge current uses thick cables.", "Correct."], ["A relay increases the current reaching the starter motor.", "It switches the current; it does not increase it."], ["The starter motor needs a.c., which the relay supplies.", "Car circuits are d.c."], ["Relays are cheaper than long lengths of thick copper cable.", "Not the reason."]], answer: "A",
        explanation: "The relay keeps the large current out of the dashboard switch and its thin wiring." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe what happens inside the relay when the key switch is turned.",
        points: ["A small current flows through the relay coil and magnetises its soft-iron core", "The core attracts the armature, which closes the contacts and completes the starter-motor circuit"] }),
    ],
    explanation: "A small coil current magnetises the relay core, which pulls the armature and closes the high-current contacts.",
    hints: ["A relay is an electromagnet that operates a switch."] });

  q.card("DEFINITION", "What is an **electromagnet**?", "A coil, usually on a soft-iron core, that is magnetised only while a current flows.");
  q.card("CONCEPT", "Why use an electromagnet on a scrap-yard crane?", "It can be switched off to drop the load, and its strength can be varied.");
  q.card("FACT", "Uses of permanent magnets?", "Compasses, loudspeakers, microphones, dynamos, motors, door catches, magnetic storage.");
  q.card("FACT", "Uses of electromagnets?", "Cranes, metal sorting, electric bells, relays, circuit breakers, door locks.");
  q.card("CONCEPT", "How does an electric bell keep ringing?", "The attracted armature breaks the contact, switching off the magnet; a spring pulls it back and the cycle repeats.");
  q.card("CONCEPT", "What does a relay do?", "Lets a small current in its coil switch a separate circuit carrying a large current.");
});
