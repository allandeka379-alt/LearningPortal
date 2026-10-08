import { concept, P, t } from "../lib.mjs";

// =====================================================================================================================
concept("phys.practical.experimental-skills", {
  file: "practical/experimental-skills",
  keyPrefix: "practical.skills",
  objectives: { cambridge: ["practical.1", "practical.2", "practical.3", "practical.4", "practical.5", "practical.6"], zimsec: ["practical.1", "practical.2", "practical.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In an experiment, what is the independent variable?",
    options: [["The quantity you deliberately change", "Correct."], ["The quantity you measure as a result", "That is the dependent variable."], ["A quantity you keep the same", "That is a control variable."], ["A reading that does not fit the pattern", "That is an anomalous result."]],
    answer: "A", explanation: "The independent variable is the one the experimenter chooses and changes." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "In an experiment, what is the dependent variable?",
    options: [["The quantity measured, which changes as a result of the change you make", "Correct."], ["The quantity you choose to change", "That is the independent variable."], ["A quantity kept constant", "That is a control variable."], ["The apparatus used", "No."]],
    answer: "A", explanation: "The dependent variable is measured; it depends on the independent variable." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A learner investigates how the length of a wire affects its resistance. Which is a control variable?",
    options: [["The material and thickness of the wire", "Correct."], ["The length of the wire", "That is the independent variable."], ["The resistance of the wire", "That is the dependent variable."], ["The reading on the ammeter", "That is a measurement used to find the resistance."]],
    answer: "A", explanation: "Material and thickness also affect resistance, so they must be kept the same for a fair test." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "Which instrument is most suitable for measuring the diameter of a thin wire, about 0.5 mm across?",
    options: [["A micrometer screw gauge", "Correct: it reads to 0.01 mm."], ["A metre rule", "It reads only to 1 mm."], ["A measuring tape", "Far too coarse."], ["A measuring cylinder", "That measures volume."]],
    answer: "A", explanation: "A micrometer screw gauge measures small lengths to 0.01 mm." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which is the correct way to write a column heading in a results table?",
    options: [["time / s", "Correct: quantity / unit."], ["s / time", "The quantity comes first."], ["time", "The unit is missing."], ["seconds / time", "The quantity comes first, followed by the unit symbol."]],
    answer: "A", explanation: "Headings are written as quantity / unit, and the unit is then left out of the table entries." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A learner times 25 complete oscillations of a pendulum as 31.5 s. What is the period of one oscillation?",
    value: 1.26, answer: "1.26", unit: "s", wrong: [31.5, 787.5],
    explanation: "Period = 31.5 ÷ 25 = 1.26 s." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is it better to time 25 oscillations of a pendulum and divide by 25 than to time a single oscillation?",
    options: [["The error from human reaction time is shared over many oscillations, so the period is more accurate.", "Correct."], ["The pendulum swings faster after many oscillations.", "The period stays the same."], ["A stopwatch cannot measure short times.", "It can, but reaction time makes short times inaccurate."], ["It removes the need to repeat the experiment.", "Repeats are still useful."]],
    answer: "A", explanation: "A reaction-time error of about 0.2 s is a large fraction of one swing but a small fraction of 25." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a systematic error?",
    options: [["A metre rule with a worn end, so every length reads 2 mm too long", "Correct: every reading is shifted the same way."], ["Reaction times varying when a stopwatch is started", "That is a random error."], ["Misreading a scale once", "That is a mistake, giving an anomalous result."], ["Readings scattering above and below the best-fit line", "That shows random errors."]],
    answer: "A", explanation: "A systematic error shifts all readings by the same amount; repeating does not remove it." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "How should a learner deal with an anomalous result?",
    options: [["Check it and repeat the measurement; leave it out of any mean if it is a mistake.", "Correct."], ["Always include it in the mean.", "A mistaken value would make the mean wrong."], ["Change it so that it fits the pattern.", "Results must never be altered."], ["Throw away all the results and start again.", "Only the anomaly needs repeating."]],
    answer: "A", explanation: "Anomalies are identified, checked by repeating, and excluded from averages if they are errors." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "A straight-line graph of p.d. (y-axis, in V) against current (x-axis, in A) passes through the origin and the point (0.50 A, 6.0 V). What is its gradient?",
    value: 12, unit: "Ω", wrong: [0.083, 3],
    explanation: t`Gradient $= \dfrac{\Delta y}{\Delta x} = \dfrac{6.0 - 0}{0.50 - 0} = 12$, which is the resistance in ohms.`,
    hints: [t`Gradient $= \dfrac{\text{change in } y}{\text{change in } x}$`] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A graph of y against x is a straight line that passes through the origin. What does this show?",
    options: [["y is directly proportional to x.", "Correct."], ["y is inversely proportional to x.", "That gives a curve."], ["There is no relationship between y and x.", "There is a clear one."], ["y decreases as x increases.", "The line rises."]],
    answer: "A", explanation: "A straight line through the origin shows direct proportionality." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "On which axis should the independent variable be plotted?",
    options: [["The x-axis (horizontal)", "Correct."], ["The y-axis (vertical)", "The y-axis is for the dependent variable."], ["Either axis", "Convention puts it on the x-axis."], ["Neither: it is not plotted", "It is plotted."]],
    answer: "A", explanation: "The independent variable goes on the x-axis and the dependent variable on the y-axis." });

  q.mcq({ d: 3, skill: "EVALUATION", multiple: true,
    stem: "Select **all** the features of a well-drawn graph.",
    options: [["Each axis labelled with the quantity and its unit", "Correct."], ["Points plotted as small, neat crosses", "Correct."], ["A single best-fit line drawn through the points", "Correct."], ["Points joined dot to dot with straight lines", "Draw a best-fit line instead."], ["A scale of 3 or 7 units per square", "Awkward scales cause plotting errors; use 1, 2 or 5."], ["Points filling only a small corner of the grid", "The points should fill at least half the grid."]],
    answer: ["A", "B", "C"], explanation: "Label the axes, plot accurately, choose sensible scales that fill the grid, and draw one best-fit line.",
    hints: ["Think about how an examiner would read the graph."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why should your eye be level with the liquid surface when reading a measuring cylinder?",
    options: [["To avoid parallax error", "Correct."], ["To avoid a zero error", "That is a different error."], ["To stop the liquid evaporating", "No."], ["To make the meniscus flat", "Your eye position cannot change the meniscus."]],
    answer: "A", explanation: "Looking from above or below makes the reading appear too high or too low (parallax)." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner plans to find out how the extension of a spring depends on the load hung from it.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which is the dependent variable?", options: [["The extension of the spring", "Correct."], ["The load", "That is the independent variable."], ["The spring itself", "No."], ["The metre rule", "That is apparatus."]], answer: "A",
        explanation: "The extension is measured as the load is changed." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two control variables.",
        points: ["One control variable: the same spring is used throughout", "A second control variable: for example the same reference point for measuring length, or the same temperature"] }),
      P.num({ label: "(c)", marks: 2, stem: "The learner's graph of load (y-axis, in N) against extension (x-axis, in m) is a straight line through the origin and the point (0.15 m, 9.0 N). Calculate the spring constant.", value: 60, unit: "N/m", wrong: [0.017, 1.35],
        explanation: t`Gradient $= \dfrac{9.0}{0.15} = 60\ \text{N/m}$, which is the spring constant.` }),
      P.mcq({ label: "(d)", stem: "Which is a sensible safety precaution?", options: [["Wear eye protection and put a tray or soft mat under the hanging loads", "Correct."], ["Stand on a chair to read the scale", "That is unsafe."], ["Add all the loads at once to save time", "This could overload the spring."], ["Use as large a load as possible", "This could break the spring."]], answer: "A",
        explanation: "A stretched spring can snap back, and falling masses can injure feet." }),
    ],
    explanation: "Change the load, measure the extension, keep the spring and method the same; the gradient of load against extension is the spring constant.",
    hints: ["The gradient of a load–extension graph is the spring constant."] });

  q.card("DEFINITION", "Independent, dependent and control variables?", "Independent: changed. Dependent: measured. Control: kept the same.");
  q.card("FACT", "How is a table column headed?", "quantity / unit, e.g. length / m; units are not repeated in the table.");
  q.card("CONCEPT", "Rules for a good graph?", "Independent variable on x; labelled axes with units; sensible scales filling the grid; neat points; one best-fit line.");
  q.card("FORMULA", "Gradient of a straight line?", "Δy ÷ Δx, using a large triangle on the best-fit line.");
  q.card("CONCEPT", "Random vs systematic errors?", "Random: scatter, reduced by repeating. Systematic: shift every reading the same way (e.g. zero error), fixed by correcting the method.");
  q.card("CONCEPT", "What to do with an anomalous result?", "Identify it, check by repeating, and leave it out of the mean if it is a mistake.");
  q.card("FACT", "Precision of common instruments?", "Metre rule 1 mm; vernier calipers 0.1 mm; micrometer 0.01 mm.");
  q.card("CONCEPT", "Why time many oscillations?", "To make the reaction-time error a small fraction of the measured time.");
});
