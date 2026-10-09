// Slice W3a: harnesses for draught animals (ZIMSEC only; tagged automatically).
import { concept, P, agricultureLevels, table } from "../lib.mjs";

const SORES = table(["Animal", "Equipment", "Problem seen after work"], [["Ox 1", "Withers yoke with rough, unsmoothed neck rest", "Raw sore on top of the neck"], ["Ox 2", "Withers yoke, strop pulled very tight", "Coughing and heavy breathing"], ["Donkey", "Breast-band set high on the neck", "Coughing; pulls weakly"]]);

concept("agri.machinery.harnesses", { file: "machinery/harnesses", keyPrefix: "machinery.harnesses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where does a withers (neck) yoke rest on an ox?",
    options: [
      ["On the neck just in front of the hump", "Correct."],
      ["Behind the horns, tied to the head", "That is a head yoke."],
      ["Across the chest below the throat", "That is a breast-band."],
      ["Over the hips of the animal", "Nothing pulls from the hips."],
    ],
    answer: "A",
    explanation: "The withers yoke sits in front of the withers (hump) and the ox pushes against it with its shoulders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the function of the skeys on a withers yoke?",
    options: [
      ["To hold the yoke in place on either side of the neck", "Correct: they stop the yoke sliding sideways."],
      ["To attach the trek chain to the beam", "The centre ring does that."],
      ["To pad the neck against rubbing", "The neck rests are smoothed for this."],
      ["To help the driver steer the animals to the left or right", "Steering is by the driver and leader."],
    ],
    answer: "A",
    explanation: "Skeys are upright pegs on each side of the neck; the strop joins their lower ends.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "To which part of a double withers yoke is the trek chain attached?",
    options: [
      ["The centre ring or hook", "Correct: in the middle of the beam."],
      ["The left-hand skey", "The pull would be uneven."],
      ["The strop under the throat", "This would choke the animal."],
      ["The end of the beam", "The pull must come from the centre."],
    ],
    answer: "A",
    explanation: "A central attachment shares the pull equally between the pair.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must wood for a yoke be seasoned before it is shaped?",
    options: [
      ["So that it does not crack or warp after the yoke is made", "Correct: green wood shrinks as it dries."],
      ["So that it becomes heavier and stronger", "Drying makes wood lighter."],
      ["So that termites are attracted to it and away from the crops", "That is not a reason."],
      ["So that it can be shaped without any tools", "Tools are still needed."],
    ],
    answer: "A",
    explanation: "Seasoned wood is stable; green wood shrinks, splits and loosens the skeys.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is a breast-band or collar harness used for donkeys instead of a cattle withers yoke?",
    options: [
      ["Donkeys have no hump, so a yoke slips and presses on the windpipe", "Correct."],
      ["Donkeys are too strong for a wooden yoke", "Donkeys are smaller than oxen."],
      ["Yokes of any kind can only be made for animals that have long, strong horns", "Withers yokes do not need horns."],
      ["Donkeys pull with their hind legs only", "All animals push with their legs; the harness takes the pull at the front."],
    ],
    answer: "A",
    hints: ["Compare the shape of an ox's neck with a donkey's."],
    explanation: "The withers yoke relies on the zebu hump; donkeys need a band or collar on the chest and shoulders.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is an advantage of a collar harness over a breast-band harness?",
    options: [
      ["It spreads the load over the shoulders, allowing heavier pulls", "Correct."],
      ["It is cheaper and easier to make from scrap materials at home", "The breast-band is cheaper and simpler."],
      ["One collar fits every animal in the village", "Collars must be fitted to each animal."],
      ["It needs no traces to pull the load", "Collars still need traces."],
    ],
    answer: "A",
    hints: ["Where does the pull rest on the animal?"],
    explanation: "A well-fitted collar rests on the shoulders and does not press on the windpipe, so the animal pulls efficiently.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A donkey's traces rub the insides of its back legs when it pulls a cultivator. Which part of the harness would prevent this?",
    options: [
      ["A swingletree (spreader bar)", "Correct: it holds the traces apart."],
      ["A breeching strap", "Breeching helps hold back a load downhill."],
      ["A longer neck strap", "The neck strap holds the breast-band up."],
      ["A halter", "The halter is for leading."],
    ],
    answer: "A",
    hints: ["The traces need to be held apart."],
    explanation: "The swingletree keeps the traces wider than the animal's hindquarters.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer on hilly land carts water downhill with a pair of oxen. Why might he prefer a head yoke to a withers yoke?",
    options: [
      ["Head-yoked oxen can hold back (brake) the load better", "Correct: the yoke is fixed to the head."],
      ["A head yoke is easier to make and fit", "Head yokes must be shaped to the animals' heads."],
      ["Head yokes let the animals move their heads freely while pulling", "Head yokes restrict head movement."],
      ["Head yokes need no straps or ropes", "They are tied to the horns or head."],
    ],
    answer: "A",
    hints: ["What happens when the cart pushes forward going downhill?"],
    explanation: "Because the yoke is firmly fixed to the head, the animals can resist a load pushing forward.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The strop of a withers yoke passes under the animal's throat.",
    answer: true,
    explanation: "True. It joins the lower ends of the skeys and must not be tight.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A breast-band should be set high on the neck so that it presses on the windpipe and gives the donkey more pulling power.",
    answer: false,
    explanation: "False. Pressure on the windpipe chokes the animal; set the band at the point of the shoulders.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a donkey harness with its function.",
    pairs: [
      ["Breast-band", "Takes the pull across the chest"],
      ["Neck strap", "Holds the breast-band at the right height"],
      ["Traces", "Carry the pull back to the load"],
      ["Belly band", "Holds the harness and traces in place"],
      ["Breeching", "Lets the animal hold back a cart downhill"],
    ],
    explanation: "Each strap has a role in taking or controlling the pull.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each material with a property that makes it suitable for harnesses.",
    pairs: [
      ["Leather", "Strong and comfortable but needs oiling"],
      ["Strips of old car tyre", "Very strong, durable and cheap"],
      ["Sacking or foam", "Soft padding against rubbing"],
      ["Seasoned hardwood", "Strong, tough beam that does not warp"],
    ],
    explanation: "Local materials chosen for strength, durability, comfort and cost.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A team of oxen yoked in pairs along a trek chain is called a {{blank:a}}; the pegs on either side of each neck are the yoke {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["span"] },
      { id: "b", accepted: ["skeys", "keys", "skey"] },
    ],
    explanation: "Span; skeys.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of yoke that is tied behind the horns of the oxen.",
    accepted: ["head yoke", "horn yoke", "head-yoke"],
    keywords: { any: ["head", "horn"] },
    explanation: "A **head yoke**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the harness part that rests on the shoulders of a horse or donkey and carries hames.",
    accepted: ["collar", "the collar"],
    explanation: "The **collar**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** properties of wood suitable for making a yoke.",
    hints: ["Think of strength, weight, life and comfort."],
    points: [
      "Strong and tough, so it does not break or split.",
      "Light, so the animals do not carry extra weight.",
      "Durable: resistant to rot and termites / seasoned so it does not crack or warp.",
      "Straight-grained and smooth when worked, with no knots or splinters to cause sores.",
    ],
    modelAnswer: "The wood should be strong and tough so it does not split, light so it does not burden the animals, durable and seasoned so it resists rot and does not warp, and straight-grained so it can be shaped smooth without splinters.",
    explanation: "Four properties.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how Sipho should yoke a pair of oxen to a plough.",
    hints: ["Approach, fit, fasten, attach, check."],
    points: [
      "Approach the oxen calmly from the side and pair animals of similar size and pace.",
      "Lift the yoke onto the necks in front of the humps and insert the skeys on either side of each neck.",
      "Fasten the strops under the throats firmly but not tightly.",
      "Attach the trek chain to the centre ring and check that nothing rubs before moving off.",
    ],
    modelAnswer: "Sipho approaches the matched pair quietly, lifts the yoke onto their necks in front of the humps and puts the skeys in on each side. He fastens the strops so they are firm but do not press on the throat, hooks the trek chain to the centre ring and checks for rubbing before starting.",
    explanation: "Calm, correct fitting.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `After a day's work, a farmer near Bulawayo notices problems with his animals.\n\n${SORES}`,
    hints: ["Link each problem to the equipment fault."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain the cause of the problem in Ox 1 and how to correct it.",
        points: ["The rough neck rest rubs the skin as the ox pulls, causing a sore.", "Smooth (sand) the neck rest and oil it; rest the ox until the sore heals."],
        explanation: "Rough yoke.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain the cause of the problem in Ox 2 and how to correct it.",
        points: ["The tight strop presses on the windpipe, restricting breathing.", "Loosen the strop so it is firm but does not press on the throat."],
        explanation: "Tight strop.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the cause of the problem in the donkey and how to correct it.",
        points: ["The high breast-band presses on the windpipe and pulls inefficiently.", "Lower it to the point of the shoulders by adjusting the neck strap."],
        explanation: "High breast-band.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** routine checks the farmer should make to prevent such problems.",
        points: ["Check animals for rubbing and sores before and after work.", "Check yokes and harnesses for rough wood, broken or hard straps and correct fit; clean and oil them."],
        explanation: "Routine checks.",
      }),
    ],
    explanation: "Diagnose harness-related injuries and correct the fitting.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "A youth group near Gokwe plans to make harnesses for four donkeys that will pull carts and light cultivators. They have little money but can collect old car tyres, sacking, sisal rope and gum poles.",
    hints: ["Choose the harness type, materials and a fitting method."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest which type of harness they should make and give a reason.",
        points: ["A breast-band harness.", "It is simple and cheap to make from local materials and suits light work."],
        explanation: "Breast-band.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Describe how each of the four materials could be used in the harness.",
        points: ["Strips of old car tyre for the breast-band, traces or straps (strong and durable).", "Sacking as padding on the breast-band and back band to stop rubbing.", "Sisal rope for the traces or neck strap (or to tie parts).", "Gum poles to make the swingletree (spreader bar) / cart shafts."],
        explanation: "Uses of local materials.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why each harness must be adjusted to fit its own donkey.",
        points: ["Donkeys differ in size and shape of chest and neck.", "A poor fit rubs sores or presses on the windpipe, so the donkey pulls weakly and may be injured."],
        explanation: "Fitting.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Evaluate the use of donkeys rather than oxen for the group's work.",
        points: ["Donkeys are cheaper to buy and feed, hardy, and tolerate drought and poor grazing.", "They walk faster and suit light work such as carting and cultivating.", "But they are less powerful than oxen and cannot pull heavy ploughs on hard soil.", "Judgement: donkeys suit the group's light work and low budget; oxen are better for heavy ploughing."],
        levels: agricultureLevels(4),
        explanation: "Weigh donkeys against oxen.",
      }),
    ],
    explanation: "Plan low-cost harnesses for donkeys and evaluate the choice of animal.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 6,
    stem: "A description of a double withers yoke reads: \"A long bar lies across both necks. On each side of each neck an upright peg passes through the bar. A strap joins the lower ends of each pair of pegs. In the middle of the bar is a metal fitting.\"",
    hints: ["Name each part from its description."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the long bar.",
        accepted: ["yoke beam", "beam", "yoke bar"],
        keywords: { any: ["beam", "bar"] },
        explanation: "The yoke beam.",
      }),
      P.short({
        label: "(b)", stem: "Name the upright pegs.",
        accepted: ["skeys", "yoke skeys", "keys", "skey"],
        keywords: { any: ["skey", "key"] },
        explanation: "The skeys.",
      }),
      P.short({
        label: "(c)", stem: "Name the strap joining the lower ends of the pegs.",
        accepted: ["strop", "yoke strap", "throat strap", "strap"],
        keywords: { any: ["strop", "strap"] },
        explanation: "The strop.",
      }),
      P.short({
        label: "(d)", stem: "Name the metal fitting in the middle of the bar.",
        accepted: ["centre ring", "center ring", "ring", "hook", "centre hook"],
        keywords: { any: ["ring", "hook"] },
        explanation: "The centre ring (hook) for the trek chain.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the underside of the bar is shaped and smoothed where each neck rests.",
        points: ["A curved, smooth neck rest spreads the pressure over a larger area.", "So the yoke does not rub or cut the skin and cause sores."],
        explanation: "Neck rests.",
      }),
    ],
    explanation: "Parts of a withers yoke.",
  });

  b.card("DEFINITION", "Withers (neck) yoke", "Wooden beam resting on the neck in front of the hump; most common yoke for Zimbabwean oxen.");
  b.card("DEFINITION", "Head yoke", "Yoke tied to the head behind the horns; helps animals hold back loads but restricts head movement.");
  b.card("FACT", "Parts of a double withers yoke", "Yoke beam, neck rests, skeys, strops, centre ring for the trek chain.");
  b.card("CONCEPT", "Properties of yoke wood", "Strong, tough, light, durable, straight-grained, seasoned, smooth.");
  b.card("DEFINITION", "Breast-band harness", "Padded band across the chest held up by a neck strap, with traces: cheap and simple, for light work.");
  b.card("DEFINITION", "Collar harness", "Padded collar on the shoulders with hames and traces: spreads the load for heavy work; must fit each animal.");
  b.card("FACT", "Harness parts besides the band or collar", "Neck strap, traces, back band, belly band, breeching, swingletree, halter or bridle.");
  b.card("FACT", "Local harness materials", "Leather, webbing, old car tyres or conveyor belt, sisal rope, sacking or foam padding, metal rings, wood.");
  b.card("CONCEPT", "Harnessing humanely", "Approach calmly, match animals, fit without rubbing or choking, check for sores, rest and water animals.");
});
