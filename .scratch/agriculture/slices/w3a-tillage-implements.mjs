// Slice W3a: tillage implements: parts, adjustment and maintenance.
import { concept, P, round, check, table } from "../lib.mjs";

// Q: planter spacing 3.0 m per plate turn, 12 cells.
const sp = (3.0 / 12) * 100;
check(sp === 25, "sp");
// Q: cells needed for 20 cm with 3.0 m per turn.
const cells20 = 3.0 / 0.2;
check(Math.abs(cells20 - 15) < 1e-9, "cells20");
// Q: ox plough 30 cm at 2.5 km/h, 75% efficiency, 0.9 ha.
const oxRate = (0.3 * 2500 * 0.75) / 10000;
const oxH = 0.9 / oxRate;
check(Math.abs(oxRate - 0.05625) < 1e-12 && Math.abs(oxH - 16) < 1e-9, "ox");

// Struct: planter calibration test.
const CAL = { metres: 50, seeds: 180, targetCm: 25 };
const actualCm = (CAL.metres * 100) / CAL.seeds;
const targetSeeds = (CAL.metres * 100) / CAL.targetCm;
check(Math.abs(actualCm - 27.78) < 0.01 && targetSeeds === 200, "cal");

const MAINT = table(["Fault seen", "Likely cause"], [["Plough rides out of the ground", "?"], ["Rust on the mouldboard after storage", "?"], ["Wheel squeaks and wobbles", "?"]]);

concept("agri.machinery.tillage-implements", { file: "machinery/tillage-implements", keyPrefix: "machinery.tillage-implements" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a mouldboard plough lifts, turns and inverts the furrow slice?",
    options: [
      ["The mouldboard", "Correct: its curved surface turns the slice over."],
      ["The landside", "The landside presses against the furrow wall."],
      ["The share", "The share cuts the slice horizontally."],
      ["The hake", "The hake is the hitch used for adjustment."],
    ],
    answer: "A",
    explanation: "The share cuts, the mouldboard turns, the landside steadies.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of the plough cuts the furrow slice horizontally at the bottom?",
    options: [
      ["The share", "Correct: its point penetrates and its edge cuts."],
      ["The beam", "The beam joins the parts."],
      ["The heel", "The heel is the rear wearing end of the landside."],
      ["The handles", "The handles are for steering."],
    ],
    answer: "A",
    explanation: "A sharp share cuts cleanly and reduces draught.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the function of the landside of a mouldboard plough?",
    options: [
      ["To press against the furrow wall and keep the plough straight", "Correct: it resists the sideways push of the soil."],
      ["To turn the furrow slice upside down", "That is the mouldboard."],
      ["To cut the soil vertically in front of the share and the mouldboard", "That is the coulter."],
      ["To attach the trek chain to the beam", "That is the hake."],
    ],
    answer: "A",
    explanation: "The landside balances the side thrust created as the mouldboard turns the soil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A farmer raises the wheel of his ox plough. What happens to the depth of ploughing?",
    options: [
      ["The plough goes deeper", "Correct: the share sinks further below the wheel."],
      ["The plough goes shallower", "Lowering the wheel makes it shallower."],
      ["The depth stays the same but the width doubles", "The wheel controls depth, not width."],
      ["The plough stops turning the soil", "The mouldboard still turns the slice."],
    ],
    answer: "A",
    explanation: "The wheel rides on the surface; raising it lets the body run deeper.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which implement is best for primary tillage of hard soil full of stones and old roots?",
    options: [
      ["A disc plough", "Correct: its rotating discs roll over obstacles."],
      ["A spike-tooth harrow", "A harrow is for secondary tillage."],
      ["A planter", "A planter sows seed."],
      ["A ridger", "A ridger forms ridges in prepared soil."],
    ],
    answer: "A",
    hints: ["Which implement rolls rather than drags through the soil?"],
    explanation: "Disc ploughs suit hard, stony, rooty or sticky soils where a mouldboard share would break or block.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Six weeks after planting, a farmer wants to remove weeds between rows of maize planted 90 cm apart. Which implement should he use?",
    options: [
      ["An inter-row cultivator set to the row width", "Correct: its tines weed between rows."],
      ["A mouldboard plough pulled along each row", "It would bury the crop."],
      ["A disc harrow", "It would destroy the crop rows."],
      ["A planter", "A planter sows seed."],
    ],
    answer: "A",
    hints: ["The crop is already growing."],
    explanation: "The cultivator's width is adjusted with the expanding lever to fit between the rows.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should the share be sharpened or replaced when it becomes blunt and rounded?",
    options: [
      ["A blunt share raises the draught and will not stay in the ground", "Correct: the animals tire and the furrow is shallow."],
      ["A blunt share turns the furrow slice better", "Turning depends on the mouldboard; bluntness only hurts."],
      ["A blunt share prevents rust during storage", "Bluntness has nothing to do with rust."],
      ["A blunt share makes the whole plough lighter and easier to carry", "Its mass hardly changes."],
    ],
    answer: "A",
    hints: ["Think of the pull needed."],
    explanation: "Sharp shares penetrate and cut easily, reducing draught and giving an even depth.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "After storage, Chipo's plough mouldboard is badly rusted and the furrow slice now sticks to it instead of turning cleanly. Which practice would have prevented this?",
    options: [
      ["Coating bright surfaces with used oil or grease before storage", "Correct: a rust-free polished surface scours soil cleanly."],
      ["Storing the plough upright in the open field", "Rain would cause even more rust."],
      ["Loosening every nut and bolt before storing it", "Loose bolts do not stop rust."],
      ["Painting the share and mouldboard with whitewash before storage", "Whitewash does not stop rust on working surfaces."],
    ],
    answer: "A",
    hints: ["What protects bare steel from moisture?"],
    explanation: "Clean, oil and store under cover; rough rusty mouldboards let soil stick.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A ridger has two mouldboards (wings) that throw soil to both sides.",
    answer: true,
    explanation: "True. The double mouldboard forms ridges and is used for earthing up.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Fertiliser should be left in a planter's hopper at the end of the day so that it is ready next morning.",
    answer: false,
    explanation: "False. Fertiliser absorbs moisture, cakes and corrodes the metal, so the hopper is emptied and cleaned.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the mouldboard plough with its function.",
    pairs: [
      ["Frog", "Body to which share, mouldboard and landside are bolted"],
      ["Heel", "Replaceable rear wearing part of the landside"],
      ["Hake", "Hitch for adjusting depth and width"],
      ["Handles", "Used to steer and lift the plough"],
      ["Beam", "Main bar that carries the pull to the body"],
    ],
    explanation: "Know each part's position and job.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each implement with its main use.",
    pairs: [
      ["Spike-tooth harrow", "Break clods and level the seedbed"],
      ["Planter", "Place seed at even depth and spacing"],
      ["Ridger", "Form ridges for potatoes"],
      ["Cultivator", "Weed between crop rows"],
    ],
    explanation: "Each implement does a different job.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "On an ox plough the depth is adjusted using the {{blank:a}} and the vertical holes of the hake; the width is adjusted using the {{blank:b}} holes of the hake.",
    blanks: [
      { id: "a", accepted: ["wheel", "depth wheel", "land wheel"] },
      { id: "b", accepted: ["horizontal"] },
    ],
    explanation: "Wheel and vertical hake for depth; horizontal hake for width.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A planter's seed plate turns once for every 3.0 m travelled and has 12 cells, each dropping one seed. Calculate the spacing between seeds in the row, in cm.",
    value: sp, unit: "cm", tol: 0, wrong: [4, 36],
    explanation: `3.0 m ÷ 12 = 0.25 m = ${sp} cm.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "The same planter (3.0 m of travel per plate turn) must sow at 20 cm in the row. How many cells must the new seed plate have?",
    value: cells20, tol: 0, wrong: [60, 6],
    hints: ["Cells = distance per turn ÷ spacing (same units)."],
    explanation: `3.0 m ÷ 0.20 m = ${cells20} cells. Using 3.0 ÷ 20 without converting cm to m gives nonsense.`,
    workedSolution: `1. Spacing = 20 cm = 0.20 m.\n2. Cells = 3.0 ÷ 0.20 = ${cells20}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "An ox plough cuts a slice 30 cm wide at 2.5 km/h and ploughs for 75% of the working time. Calculate the hours needed to plough 0.9 ha.",
    value: oxH, unit: "h", tol: 0.05, answer: "16", wrong: [12, round(0.9 / (0.3 * 2.5), 1)],
    hints: ["m²/h = width (m) × speed (m/h)."],
    explanation: `0.3 × 2,500 = 750 m²/h = 0.075 ha/h; × 0.75 = ${oxRate} ha/h; 0.9 ÷ ${oxRate} = ${oxH} h. Ignoring the 75% gives 12 h.`,
    workedSolution: `1. Rate = 0.30 m × 2,500 m/h = 750 m²/h = 0.075 ha/h.\n2. Effective rate = 0.075 × 0.75 = ${oxRate} ha/h.\n3. Time = 0.9 ÷ ${oxRate} = ${oxH} h.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the part of the plough that cuts the soil vertically ahead of the share on some (mainly tractor) ploughs.",
    accepted: ["coulter", "colter", "disc coulter", "knife coulter"],
    keywords: { any: ["coulter", "colter"] },
    explanation: "The **coulter**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the routine maintenance an ox plough should receive at the end of each day's work.",
    hints: ["Clean, check, lubricate."],
    points: [
      "Scrape off soil and plant material.",
      "Check and tighten loose nuts and bolts; replace missing ones.",
      "Grease or oil the wheel bearing and other moving parts.",
      "Inspect the share, point and heel for wear or damage and sharpen or report them.",
    ],
    modelAnswer: "At the end of the day the plough is scraped clean, all nuts and bolts are checked and tightened, the wheel is greased, and the share and heel are checked so that blunt or worn parts can be sharpened or replaced.",
    explanation: "Daily care.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Suggest **three** reasons why a planter gives a better maize stand than sowing by hand behind the plough.",
    hints: ["Think of spacing, depth and fertiliser."],
    points: [
      "Seed is dropped at an even spacing, giving the intended plant population.",
      "Seed is placed at a uniform depth and covered, so germination is even.",
      "Fertiliser can be placed beside the seed at the same time / less seed is wasted and work is faster.",
    ],
    modelAnswer: "A planter drops seed at an even spacing and a uniform depth and covers it, so the plants emerge together at the right population. It can also place fertiliser beside the seed, wasting less seed and saving time.",
    explanation: "Precision of planters.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 8,
    stem: "A pupil describes an ox-drawn mouldboard plough: \"At the front a chain is fastened to a metal piece with two rows of holes. A small wheel is fixed under the front of a long bar. At the back, a pointed steel blade at the bottom is followed by a curved plate. On the other side is a flat plate whose back end wears away. Two handles rise at the back.\"",
    hints: ["Match each description to a named part."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the metal piece with two rows of holes.",
        accepted: ["hake", "hitch", "clevis"],
        keywords: { any: ["hake", "hitch", "clevis"] },
        explanation: "The hake (hitch).",
      }),
      P.short({
        label: "(b)", stem: "Name the long bar.",
        accepted: ["beam", "plough beam"],
        explanation: "The beam.",
      }),
      P.short({
        label: "(c)", stem: "Name the pointed steel blade at the bottom.",
        accepted: ["share", "ploughshare", "plough share"],
        explanation: "The share.",
      }),
      P.short({
        label: "(d)", stem: "Name the flat plate on the other side.",
        accepted: ["landside", "land side"],
        explanation: "The landside.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State the function of the curved plate.",
        points: ["Lifts and turns (inverts) the furrow slice.", "Buries weeds and crop residues."],
        explanation: "Mouldboard.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the back end of the flat plate is made as a separate, replaceable part.",
        points: ["It rubs on the furrow bottom and wears quickly.", "Replacing only the heel is cheaper than replacing the whole landside."],
        explanation: "The heel.",
      }),
    ],
    explanation: "Identify plough parts from a description and explain their functions.",
  });
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `Farai checks his ox planter before planting maize. He pushes it ${CAL.metres} m along a hard path and counts ${CAL.seeds} seeds dropped. He wants seeds every ${CAL.targetCm} cm.\n\n${MAINT}`,
    hints: ["Spacing = distance ÷ seeds.", "Seeds needed = distance ÷ target spacing."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the actual seed spacing, in cm, to one decimal place.",
        value: actualCm, unit: "cm", tol: 0.05, answer: "27.8", wrong: [3.6, 0.3],
        explanation: `5,000 cm ÷ ${CAL.seeds} = ${round(actualCm, 2)} cm, so 27.8 cm.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate how many seeds should have been dropped over the 50 m.",
        value: targetSeeds, tol: 0, wrong: [180, 2],
        explanation: `5,000 cm ÷ 25 cm = ${targetSeeds} seeds.`,
      }),
      P.mcq({
        label: "(c)", stem: "What should Farai do to correct the spacing?",
        options: [
          ["Fit a seed plate with more cells", "Correct: more seeds per turn gives closer spacing."],
          ["Fit a seed plate with fewer cells", "That would widen the spacing further."],
          ["Raise the wheel of the plough", "The plough wheel has nothing to do with planter spacing."],
          ["Fill the hopper only half full", "Hopper level does not change cell number."],
        ],
        answer: "A",
        explanation: "The planter drops too few seeds; a plate with more cells (or a changed gear) gives the 25 cm spacing.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest a likely cause for each fault in the table.",
        points: ["Plough rides out: blunt or worn share/point (or wheel set too low / hitch too low).", "Rust: stored without cleaning and oiling, or in the open.", "Wheel squeaks and wobbles: bearing not greased / worn bearing or loose bolt."],
        explanation: "Faults and causes.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how Farai should store his implements at the end of the season.",
        points: ["Clean off all soil and fertiliser and repair or list worn parts.", "Coat bright metal surfaces with used oil or grease and paint the frames.", "Store under a roof, off the ground on blocks, away from livestock."],
        explanation: "End-of-season storage.",
      }),
    ],
    explanation: "Calibrate a planter and diagnose and prevent implement faults.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Nyasha has a span of oxen and must (i) plough a hard field with old roots, (ii) prepare a fine seedbed after ploughing and (iii) earth up her potatoes.",
    hints: ["One implement for each job."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest an implement for job (i) and give a reason.",
        points: ["A disc plough (or a mouldboard plough with a sharp share, after stumping).", "Discs roll over roots and stones without breaking or blocking."],
        explanation: "Disc plough.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest an implement for job (ii) and give a reason.",
        points: ["A spike-tooth (or disc) harrow.", "It breaks clods and levels the soil to a fine tilth."],
        explanation: "Harrow.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest an implement for job (iii) and give a reason.",
        points: ["A ridger.", "Its double mouldboard throws soil up to both sides, covering the tubers."],
        explanation: "Ridger.",
      }),
    ],
    explanation: "Choosing implements for tasks.",
  });

  b.card("FACT", "Mouldboard plough parts", "Trek chain, hake, wheel, beam, frog, share, mouldboard, landside, heel, handles (coulter on some).");
  b.card("CONCEPT", "Share, mouldboard and landside", "Share cuts horizontally; mouldboard lifts and inverts the slice; landside presses on the furrow wall and keeps the plough straight.");
  b.card("CONCEPT", "Adjusting depth of an ox plough", "Raise the wheel (deeper) or lower it (shallower); move the hitch up the vertical hake for deeper, down for shallower.");
  b.card("FACT", "Adjusting width of cut", "Move the hitch point along the horizontal row of holes on the hake.");
  b.card("FACT", "Five tillage implements", "Mouldboard plough, disc plough, harrow, cultivator, planter, ridger.");
  b.card("FORMULA", "Planter in-row spacing", "Distance travelled per plate turn ÷ number of cells.");
  b.card("CONCEPT", "Daily implement maintenance", "Clean, tighten nuts and bolts, grease moving parts, check share and heel for wear.");
  b.card("CONCEPT", "Storing implements", "Clean, repair, oil bright surfaces, paint frames, store under cover off the ground.");
  b.card("FACT", "When is a disc plough preferred?", "Hard, stony, root-filled or sticky soils: the discs roll over obstacles.");
});
