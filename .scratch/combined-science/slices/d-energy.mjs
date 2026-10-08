import { concept, P } from "../lib.mjs";

const O = (...codes) => codes.map((c) => `zimsec/o-level/combined-science:${c}`);
const SOLAR = O("7.3.4.5.1");

// =====================================================================================================================
concept("cs.physics.solar-heating", {
  file: "physics/solar-heating",
  keyPrefix: "physics.solar",
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", objectives: SOLAR,
    stem: "Which surface is the best absorber of radiation from the Sun?",
    options: [
      ["Dull (matt) black paint", "Dull black surfaces absorb most of the radiation that falls on them."],
      ["Shiny silver foil", "Shiny surfaces reflect most radiation; they are poor absorbers."],
      ["Glossy white paint", "White and glossy surfaces reflect much of the radiation."],
      ["Polished aluminium sheet", "Polished metal is a good reflector, so it absorbs little."],
    ],
    answer: "A", explanation: "Dull black surfaces are the best absorbers (and emitters) of radiation. That is why the inside of a solar cooker, the pots and the collector plate of a solar water heater are painted matt black." });

  q.mcq({ d: 1, skill: "RECALL", objectives: SOLAR,
    stem: "A box solar cooker has a flap lined with aluminium foil, propped up above the glass lid. What is the job of the foil?",
    options: [
      ["To reflect extra sunlight through the glass into the box", "The shiny foil is a good reflector, so more radiation enters the box."],
      ["To absorb sunlight and conduct its heat down to the pot", "Shiny foil absorbs very little; the black inside does the absorbing."],
      ["To stop rain from soaking the insulation in the walls", "The flap is there to collect sunlight, not to keep rain off."],
      ["To shade the food so that it does not burn", "Shading would reduce the energy reaching the food."],
    ],
    answer: "A", explanation: "The foil-lined flap is a reflector: it sends extra sunlight through the glass lid, so more energy reaches the black interior and the pot." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: SOLAR,
    stem: "Why does a box solar cooker have a glass lid?",
    options: [
      ["It lets sunlight in but reduces the heat lost by convection and radiation.", "Glass transmits sunlight, keeps the warm air in and blocks much of the infrared from the hot pot."],
      ["It magnifies the sunlight and focuses it onto the pot.", "A flat sheet of glass does not focus light; a curved reflector does."],
      ["It keeps the inside of the box cool so that the food does not burn.", "The lid keeps heat in, so the inside gets hotter."],
      ["It reflects sunlight downwards onto the pot from above.", "Glass is transparent: most sunlight passes straight through it."],
    ],
    answer: "A", explanation: "Sunlight passes through the glass and is absorbed inside. The glass stops warm air escaping (convection) and does not let much of the infrared given out by the hot surfaces back out (radiation), so the temperature inside rises." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "The double walls of a home-made box cooker are packed with crumpled newspaper. Why?",
    options: [
      ["Air trapped in the newspaper is a poor conductor, so less heat escapes.", "Trapped air is an insulator, which cuts heat loss by conduction."],
      ["Newspaper is a good absorber, so it collects extra sunlight for the pot.", "The newspaper is hidden inside the walls; no sunlight reaches it."],
      ["Newspaper reflects the infrared from the pot back into the cooking space.", "Paper is not a good reflector; its job is to trap air."],
      ["The newspaper lets cool air flow around the pot to stop it burning.", "Insulation stops air moving; it does not cool the pot."],
    ],
    answer: "A", explanation: "Crumpled newspaper (like straw, wool or polystyrene) traps air, which is a poor conductor of heat. This reduces heat loss through the walls." });

  q.mcq({ d: 1, skill: "RECALL", objectives: SOLAR,
    stem: "Where is the cooking pot placed in a curved-reflector (parabolic) solar cooker?",
    options: [
      ["At the focus of the curved dish", "The dish reflects the parallel rays of sunlight so that they meet at the focus."],
      ["Resting on the centre of the dish surface", "The rays meet in front of the dish, at the focus, not on its surface."],
      ["Behind the dish, in its shadow", "Behind the dish the pot would receive no reflected sunlight."],
      ["Anywhere in front of the dish facing the Sun", "Only at the focus do all the reflected rays meet."],
    ],
    answer: "A", explanation: "The shiny curved dish reflects the almost parallel rays of sunlight to one small region, the focus. A black pot held there absorbs a large amount of energy on a small area." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "A curved-reflector solar cooker must be turned every few minutes while it is cooking. Why?",
    options: [
      ["The Sun moves, so the reflected rays stop meeting at the pot.", "As the Sun's direction changes, the focus moves away from the pot."],
      ["The dish cools down if it is left facing one way for too long.", "The dish is a reflector; it does not need to stay hot."],
      ["The reflector heats up and then stops reflecting the sunlight.", "Shiny metal keeps reflecting whatever its temperature."],
      ["Turning the dish stirs the food so that it cooks evenly.", "Turning the stand does not stir the food."],
    ],
    answer: "A", explanation: "The focus is where the reflected rays meet, and its position depends on the direction of the incoming sunlight. As the Sun moves across the sky, the dish must be turned to keep the pot at the focus.",
    hints: ["Where do the reflected rays meet, and what decides where that point is?"] });

  q.mcq({ d: 2, skill: "ANALYSIS", objectives: SOLAR,
    stem: "Which statement about box cookers and curved-reflector cookers is correct?",
    options: [
      ["The curved reflector cooks faster but must be turned more often.", "It reaches higher temperatures, but its focus moves as the Sun moves."],
      ["The box cooker reaches higher temperatures than the curved reflector.", "Box cookers reach about 100–150 °C; curved reflectors reach higher."],
      ["The box cooker works at night because its insulation stores sunlight.", "Insulation slows heat loss; it cannot store sunlight for the night."],
      ["The curved reflector needs no black pot because its dish is shiny.", "The dish reflects; a black pot is still needed to absorb the energy."],
    ],
    answer: "A", explanation: "A curved reflector concentrates sunlight on the pot, so it is hot and fast, but it must follow the Sun. A box cooker is slower and cooler but needs little attention." });

  q.tf({ d: 1, skill: "RECALL", objectives: SOLAR,
    stem: "True or false: a solar cooker gives off smoke while it is cooking.",
    answer: false,
    feedbackFalse: "Correct. Nothing burns in a solar cooker, so there is no smoke to harm the cook's lungs and eyes.",
    feedbackTrue: "Not so. A solar cooker burns no fuel, so it produces no smoke.",
    explanation: "Solar cookers use sunlight, not fuel. With nothing burning there is no smoke, which is one of their main health advantages over firewood." });

  q.tf({ d: 2, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "True or false: in a solar water heater that works without a pump, the storage tank must be placed lower than the collector panel.",
    answer: false,
    feedbackFalse: "Correct. Hot water rises, so the tank must be above the collector.",
    feedbackTrue: "Not so. Heated water rises by convection, so the tank must be higher than the collector.",
    explanation: "In a thermosiphon system the warm, less dense water rises from the collector into the tank. The tank must therefore be above the collector; otherwise a pump is needed." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "In the collector of a solar water heater, the water flows through copper pipes fixed to a black metal plate. Why is copper used for the pipes?",
    options: [
      ["Copper is a good conductor, so heat passes quickly to the water.", "Heat absorbed by the plate is conducted through the copper into the water."],
      ["Copper's colour makes it a better absorber than the black plate.", "The black plate is the absorber; copper's reddish colour is not better."],
      ["Copper is a poor conductor, so it keeps the heat inside the pipes.", "Copper is one of the best conductors of heat."],
      ["Copper reflects the sunlight through the pipe walls into the water.", "Metal pipes are opaque: sunlight cannot pass through them."],
    ],
    answer: "A", explanation: "The black plate absorbs the radiation. Copper is a very good conductor of heat, so the energy passes quickly from the plate through the pipe walls into the water." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: SOLAR,
    stem: "Water heated in the collector of a solar water heater rises up a pipe into the storage tank. Why does it rise?",
    options: [
      ["It expands and becomes less dense than the cooler water.", "Less dense warm water rises; denser cool water sinks: convection."],
      ["The pressure of the sunlight pushes it up the pipe.", "Sunlight heats the water; it does not push it upwards."],
      ["Its particles become lighter when they are heated.", "Each particle keeps its mass; the particles move further apart."],
      ["The cold water supply pushes it up from below.", "Circulation continues even with the taps closed: it is convection."],
    ],
    answer: "A", explanation: "Heating makes the water expand, so the same mass takes up more volume and its density falls. The less dense warm water rises and cooler, denser water sinks to replace it: a convection current (thermosiphon)." });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: SOLAR,
    stem: "In a thermosiphon solar water heater, which arrangement of the pipes is correct?",
    options: [
      ["Hot water enters the top of the tank; cooler water leaves from the bottom.", "Hot water collects at the top and the coolest water sinks to the bottom."],
      ["Hot water enters the bottom of the tank; cooler water leaves from the top.", "Hot water entering at the bottom would rise and mix; circulation would be poor."],
      ["Both pipes join the top of the tank.", "The cool, dense water is at the bottom, so the return pipe starts there."],
      ["Both pipes join the bottom of the tank.", "Warm water rises, so it should enter near the top."],
    ],
    answer: "A", explanation: "Warm water rises from the collector into the top of the tank. The coolest, densest water at the bottom of the tank sinks down the return pipe into the bottom of the collector to be heated.",
    hints: ["Where in a tank does the warmest water collect?"] });

  q.mcq({ d: 2, skill: "APPLICATION", objectives: SOLAR,
    stem: "A plumber fits a solar collector on a roof in Masvingo. Which way should the collector face to receive most sunlight?",
    options: [
      ["North", "South of the equator, the midday Sun is in the northern part of the sky for most of the year."],
      ["South", "That would suit a country north of the equator, such as Egypt."],
      ["East", "An east-facing panel catches morning Sun but loses the afternoon."],
      ["West", "A west-facing panel catches afternoon Sun but loses the morning."],
    ],
    answer: "A", explanation: "Zimbabwe is south of the equator, so for most of the year the Sun's path is to the north. A north-facing collector receives the most sunlight over the day." });

  q.match({ d: 2, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "Match each part of a box solar cooker to its function.",
    pairs: [
      ["Matt black interior", "Absorbs radiation and becomes hot"],
      ["Newspaper between double walls", "Reduces heat loss by conduction"],
      ["Glass lid", "Lets sunlight in and stops warm air escaping"],
      ["Foil-lined flap", "Reflects extra sunlight into the box"],
    ],
    explanation: "Black absorbs, trapped air insulates, glass lets light in and keeps heat in, and shiny foil reflects more sunlight into the box." });

  q.fib({ d: 2, skill: "RECALL", objectives: SOLAR,
    stem: "Complete the sentence about a solar water heater.",
    template: "Water heated in the collector becomes less {{blank:a}} and rises into the tank. This way of transferring heat through a fluid is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["dense"], wrong: "heavy" },
      { id: "b", accepted: ["convection", "a convection current", "convection current"], wrong: "conduction" },
    ],
    explanation: "Heated water expands and becomes less dense, so it rises; cooler, denser water sinks. This is convection." });

  q.short({ d: 1, skill: "RECALL", objectives: SOLAR,
    stem: "Name the process by which energy from the Sun travels through space to the Earth.",
    accepted: ["radiation", "infrared radiation", "electromagnetic radiation", "thermal radiation", "radiant energy", "electromagnetic waves"],
    wrong: ["convection", "conduction"],
    explanation: "Space is almost empty, so there are no particles for conduction or convection. Energy reaches the Earth as electromagnetic radiation (light and infrared)." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true, objectives: SOLAR,
    stem: "Which features of a flat-plate solar collector reduce the heat lost from it? Select **all** that apply.",
    options: [
      ["The glass cover over the plate", "It stops warm air escaping and blocks much of the infrared from the plate."],
      ["The insulation behind and around the plate", "It reduces heat loss by conduction."],
      ["The black paint on the plate", "Black increases absorption; it does not reduce losses (a black surface is also a good emitter)."],
      ["The copper pipes fixed to the plate", "Copper conducts heat to the water; it does not keep heat in."],
      ["Facing the panel north, towards the Sun", "This collects more sunlight; it does not reduce the losses."],
    ],
    answer: ["A", "B"], explanation: "Losses are reduced by the glass cover (convection and radiation) and the insulation (conduction). The black paint improves absorption and the copper pipes improve conduction to the water.",
    hints: ["Separate the features that collect energy from those that keep it in."] });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: SOLAR,
    stem: "Some solar water heaters use evacuated tubes: glass tubes with a vacuum between an inner and an outer wall. How does the vacuum reduce heat loss?",
    options: [
      ["It stops heat loss by conduction and convection.", "Both need particles, and a vacuum has almost none."],
      ["It stops heat loss by radiation only.", "Radiation can cross a vacuum; that is how sunlight reaches the Earth."],
      ["It reflects the infrared back into the water.", "A vacuum reflects nothing; shiny surfaces reflect."],
      ["It makes the water boil at a lower temperature.", "The water is inside the tube, not in the vacuum."],
    ],
    answer: "A", explanation: "Conduction and convection both need particles. A vacuum contains almost no particles, so these losses are almost stopped, as in a vacuum flask. Radiation can still cross the vacuum.",
    hints: ["Which methods of heat transfer need a material medium?"] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true, objectives: SOLAR,
    stem: "A women's club in Zaka builds a box solar cooker. It has a black-painted inside, double walls packed with straw, a glass lid and a reflector flap covered with aluminium foil.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Explain why the inside of the box is painted black.",
        points: ["Black (dull) surfaces are good absorbers of radiation, so the inside and the pot get hot"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two features of the cooker that reduce heat loss, and say how each one works.",
        points: ["Straw in the double walls traps air, a poor conductor, so less heat is lost by conduction", "The glass lid stops warm air escaping (convection) / traps infrared radiation from the hot pot"] }),
      P.manual({ label: "(c)", marks: 1, stem: "Suggest why the cooker cooks very slowly on a cloudy day.",
        points: ["Clouds block (absorb or reflect) much of the sunlight, so less radiation reaches the cooker"] }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two advantages for a rural family of cooking with this cooker instead of firewood.",
        points: ["No fuel to collect or buy: sunlight is free (saves time and money)", "No smoke, so better health for the cook / fewer trees cut down (less deforestation) / lower risk of fires"] }),
    ],
    explanation: "Black absorbs; trapped air and the glass lid reduce conduction, convection and radiation losses; clouds cut the incoming radiation; sunlight is free, smokeless and saves trees.",
    hints: ["For each feature, say whether it helps to collect energy or to keep it in."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true, objectives: SOLAR,
    stem: "A rural clinic has a flat-plate solar water heater on its roof. The collector has a black metal plate with copper pipes, a glass cover and insulation underneath. The insulated storage tank, which has a shiny outer casing, is fixed above the collector. There is no pump.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the process that makes the water circulate between the collector and the tank.",
        accepted: ["convection", "thermosiphon", "thermosyphon", "a convection current", "convection current", "convection currents", "natural convection"],
        wrong: ["conduction"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the tank must be placed above the collector.",
        points: ["Heated water expands, becomes less dense and rises (from the collector)", "so it can only flow up into the tank if the tank is higher; cooler, denser water sinks back down to the collector"] }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the glass cover helps the collector to heat the water.",
        points: ["Sunlight passes through the glass to the black plate", "The glass traps warm air / stops convection losses, or blocks much of the infrared emitted by the hot plate"] }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why the tank has a shiny outer casing.",
        points: ["Shiny surfaces are poor emitters of radiation, so the tank loses less heat (water stays hot overnight)"] }),
    ],
    explanation: "Water circulates by convection (thermosiphon): warm, less dense water rises into the tank above the collector. The glass lets sunlight in and keeps heat in, and the shiny tank emits little radiation.",
    hints: ["Think about density for (b) and about which radiation passes through glass for (c)."] });

  q.ext({ d: 4, skill: "EVALUATION", examStyle: true, objectives: SOLAR, marks: 6,
    stem: "A family in Binga wants to build a box solar cooker from a cardboard box, a smaller box, old newspapers, aluminium foil, black paint and a sheet of glass. Describe how they should build the cooker and explain how each feature helps it to cook food. [6]",
    points: [
      "Put the smaller box inside the larger one and pack crumpled newspaper between them",
      "Trapped air in the newspaper is a poor conductor, reducing heat loss by conduction",
      "Paint the inside (and the pot) matt black, a good absorber of radiation",
      "Cover the top with the sheet of glass, which lets sunlight in",
      "The glass stops warm air escaping (convection) and traps infrared radiation from the hot pot",
      "Line a flap with shiny foil and prop it up to reflect extra sunlight into the box (and face the cooker towards the Sun)",
    ],
    modelAnswer: "Place the smaller box inside the larger box and fill the gap between them with crumpled newspaper. The newspaper traps air, which is a poor conductor, so little heat is lost through the walls. Paint the inside of the inner box matt black and cook in a black pot with a lid, because dull black surfaces absorb most of the radiation that falls on them. Cover the opening with the sheet of glass: sunlight passes through it, but the glass stops the hot air escaping and does not let much of the infrared given out by the hot pot back out, so the temperature rises. Cover the lid flap with aluminium foil and prop it up at an angle so that the shiny surface reflects extra sunlight through the glass. Face the cooker towards the Sun and turn it as the Sun moves.",
    explanation: "A good answer pairs each part with its physics: insulation (conduction), black interior (absorption), glass (lets light in, stops convection and radiation losses) and a foil reflector (more sunlight).",
    hints: ["Cover the four design rules: collect more, absorb well, reduce conduction and convection, reduce radiation."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: SOLAR,
    stem: "Which is a disadvantage of solar cookers compared with cooking on an electric stove?",
    options: [
      ["They cannot be used at night or in heavy cloud.", "They need direct sunshine to work."],
      ["They pollute the air in the kitchen with smoke.", "Solar cookers burn nothing and make no smoke."],
      ["They use expensive fuel that must be bought.", "Sunlight is free."],
      ["They add to deforestation in rural areas.", "Solar cookers reduce the need for firewood."],
    ],
    answer: "A", explanation: "A solar cooker only works in direct sunshine, so meals must be planned for the daytime. Its other features (free energy, no smoke, no firewood) are advantages." });

  q.card("FACT", "Best absorber and emitter of radiation", "Dull (matt) black surfaces. Shiny surfaces are good reflectors and poor emitters.");
  q.card("CONCEPT", "Box solar cooker: four features", "Matt black inside (absorbs); insulated double walls (less conduction); glass lid (lets sunlight in, stops convection, traps infrared); foil flap (reflects extra sunlight in).");
  q.card("CONCEPT", "Why does the glass lid trap heat?", "Sunlight passes through glass; the hot surfaces inside give out longer-wavelength infrared, much of which glass blocks. The lid also stops warm air escaping.");
  q.card("CONCEPT", "Curved-reflector (parabolic) cooker", "A shiny curved dish reflects parallel sunlight to the focus, where a black pot absorbs it. Fast and hot, but must be turned to follow the Sun; glare and burn hazard.");
  q.card("FACT", "Box cooker or curved reflector?", "Box: slow (hours), about 100–150 °C, little attention needed. Curved reflector: fast, hotter, needs turning every few minutes.");
  q.card("CONCEPT", "Flat-plate solar collector", "Black metal absorber plate with copper pipes (good conductor), glass cover and insulation in a shallow box on the roof.");
  q.card("DEFINITION", "Thermosiphon", "Circulation of water by convection without a pump: heated water becomes less dense and rises into the tank; cooler, denser water sinks back to the collector.");
  q.card("FACT", "Where is the tank of a thermosiphon heater?", "Above the collector. Hot water enters the top of the tank; cool water leaves from the bottom.");
  q.card("FACT", "Which way do solar collectors face in Zimbabwe?", "North, because south of the equator the midday Sun is in the northern sky for most of the year.");
  q.card("CONCEPT", "Advantages and disadvantages of solar cookers", "For: free renewable energy, no smoke, less firewood (deforestation), lower fire risk. Against: no use at night or in cloud, slow, must face the Sun.");
});
