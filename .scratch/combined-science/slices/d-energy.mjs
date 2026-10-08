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

// =====================================================================================================================
const COMM = O("7.3.4.6.1");
const MEDIA = O("7.3.4.6.2");
const PHONE = O("7.3.4.6.3");

concept("cs.physics.telecommunication", {
  file: "physics/telecommunication",
  keyPrefix: "physics.telecom",
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", objectives: PHONE,
    stem: "Which part of a cell phone changes the sound of your voice into an electrical signal?",
    options: [
      ["The microphone", "Sound waves make it vibrate, producing a varying electric current."],
      ["The loudspeaker", "The loudspeaker does the reverse: electrical signal to sound."],
      ["The aerial", "The aerial sends and receives radio waves."],
      ["The battery", "The battery supplies electrical energy from chemical energy."],
    ],
    answer: "A", explanation: "The microphone changes sound energy into electrical energy: the varying current copies the pattern of the sound waves." });

  q.mcq({ d: 1, skill: "RECALL", objectives: PHONE,
    stem: "What is a cell phone base station?",
    options: [
      ["A mast with aerials that exchanges radio signals with the phones in its area", "Each base station serves one area, called a cell."],
      ["A shop where phones are repaired and their batteries are charged", "That is a service point, not part of the network."],
      ["A satellite in orbit that sends calls directly from phone to phone", "Ordinary cell phones talk to masts on the ground."],
      ["A small box inside the phone that stores contacts and messages", "That is the phone's memory or SIM card."],
    ],
    answer: "A", explanation: "Base stations are the masts on hills and buildings. Each one sends and receives the radio signals of the phones in its cell and connects them to the rest of the network." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: PHONE,
    stem: "What kind of waves carry the signal between a cell phone and the nearest mast?",
    options: [
      ["Radio waves (microwaves)", "They are electromagnetic waves that travel through air at the speed of light."],
      ["Sound waves", "Sound is too slow and fades within a short distance; it stops at the microphone."],
      ["Visible light", "Light would be blocked by walls, trees and pockets."],
      ["Ultrasound", "Ultrasound is sound above the range of hearing; it does not carry phone calls."],
    ],
    answer: "A", explanation: "Phones and base stations communicate with radio waves in the microwave range. They are electromagnetic, need no medium and travel at about 300 000 km/s." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: PHONE,
    stem: "Which energy change takes place in the loudspeaker (earpiece) of a phone?",
    options: [
      ["Electrical energy to sound energy", "The current makes the speaker cone vibrate, producing sound."],
      ["Sound energy to electrical energy", "That is the microphone."],
      ["Chemical energy to electrical energy", "That is the battery."],
      ["Electrical energy to radio-wave energy", "That is the aerial of the sending phone."],
    ],
    answer: "A", explanation: "The varying current from the phone's circuits makes the loudspeaker vibrate, so electrical energy becomes sound (the kinetic energy of vibrating air), with some wasted as heat." });

  q.match({ d: 2, skill: "UNDERSTANDING", objectives: PHONE,
    stem: "Match each part of a cell phone system to the main energy change that takes place in it.",
    pairs: [
      ["Battery", "Chemical to electrical"],
      ["Microphone", "Sound to electrical"],
      ["Aerial of the sending phone", "Electrical to electromagnetic (radio waves)"],
      ["Loudspeaker", "Electrical to sound"],
    ],
    explanation: "The battery supplies electrical energy; the microphone and loudspeaker convert between sound and electrical energy; the sending aerial turns electrical signals into radio waves." });

  q.tf({ d: 1, skill: "RECALL", objectives: COMM,
    stem: "True or false: the person receiving an email must be online at the moment it is sent, or the email is lost.",
    answer: false,
    feedbackFalse: "Correct. The email waits on the receiver's mail server until it is downloaded.",
    feedbackTrue: "Not so. The email is stored in the receiver's inbox on a mail server until they read it.",
    explanation: "Email is stored on a mail server, so the receiver can read it hours or days later. A phone call, by contrast, needs both people to be connected at the same time." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: COMM,
    stem: "Where is an email kept between being sent and being read?",
    options: [
      ["On the receiver's mail server, in their inbox", "The server stores it until the receiver's device downloads it."],
      ["In the sender's outbox, until the receiver switches on", "Once sent, the email leaves the sender's device."],
      ["In the base station nearest to the receiver", "Base stations pass signals on; they do not store email."],
      ["Inside the router in the sender's home or school", "A router forwards data onwards; it does not keep messages."],
    ],
    answer: "A", explanation: "An email travels through the internet to the receiver's mail server and waits in their inbox. When the receiver opens their email, the device downloads and decodes it." });

  q.mcq({ d: 2, skill: "ANALYSIS", objectives: COMM,
    stem: "Which is an advantage of sending a message by email rather than making a phone call?",
    options: [
      ["It gives a written record and can carry documents as attachments.", "Text and files arrive exactly as sent and can be kept."],
      ["It can be sent and received without any internet connection.", "Email needs an internet connection at both ends."],
      ["It always reaches the other person faster than speaking to them.", "A call is instant; an email waits until it is read."],
      ["It needs no phone or computer at the receiving end.", "The receiver needs a device to download and read it."],
    ],
    answer: "A", explanation: "Email keeps a written record, can be sent to many people at once and can carry attachments such as forms and photos. It needs an internet connection and may not be read at once." });

  q.fib({ d: 2, skill: "RECALL", objectives: PHONE,
    stem: "Complete the sentence.",
    template: "Changing a message into a code of 0s and 1s before it is sent is called {{blank:a}}; changing the code back into the message at the receiver is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["encoding", "coding", "digitising", "digitizing"], wrong: "decoding" },
      { id: "b", accepted: ["decoding"], wrong: "encoding" },
    ],
    explanation: "The transmitter encodes the message into a digital signal; the receiver decodes it back into sound, text or pictures." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: MEDIA,
    stem: "How does a signal travel along an optical fibre?",
    options: [
      ["As pulses of light kept in the core by total internal reflection", "The light reflects off the boundary with the cladding again and again."],
      ["As an electric current flowing through the glass core", "Glass is an insulator; it cannot carry a current."],
      ["As radio waves travelling along the plastic outer coat", "The coat only protects the fibre."],
      ["As sound waves vibrating along the length of the glass", "Sound would be far too slow and would fade quickly."],
    ],
    answer: "A", explanation: "An optical fibre carries pulses of light (often infrared). The light hits the core–cladding boundary at large angles and is totally internally reflected, so it stays in the core." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: MEDIA,
    stem: "Why are the copper wires in a twisted-pair cable twisted around each other?",
    options: [
      ["To reduce interference from other cables and electrical equipment", "Twisting makes picked-up disturbances cancel out."],
      ["To make the cable stronger so that it does not snap", "Strength comes from the sheath; the twist is for the signal."],
      ["To let pulses of light travel along the wires", "Copper carries electrical signals, not light."],
      ["To make the electric current flow faster along the cable", "Twisting does not speed up the signal."],
    ],
    answer: "A", explanation: "Twisting the pair means that any interference affects both wires almost equally, so its effect largely cancels. This keeps the signal cleaner." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: MEDIA,
    stem: "A coaxial cable has a woven metal layer (the screen) around the insulated central wire. What does the screen do?",
    options: [
      ["It shields the central wire from electrical interference.", "The earthed screen keeps outside disturbances away from the signal."],
      ["It carries the light pulses that hold the information.", "Coaxial cables carry electrical signals, not light."],
      ["It insulates the cable so that it does not overheat.", "The plastic layers insulate; the screen is metal."],
      ["It makes the cable waterproof when buried underground.", "The outer plastic sheath keeps water out."],
    ],
    answer: "A", explanation: "The signal travels along the central copper wire. The surrounding metal screen blocks electrical interference, so coaxial cable is well shielded (used for TV aerials and satellite dishes)." });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: MEDIA,
    stem: "A family wants to connect three phones and a laptop in their house to the internet, without drilling holes in the walls for cables. Which medium is most suitable inside the house?",
    options: [
      ["Wi-Fi radio waves from a wireless router", "No cables are needed and the devices can move from room to room."],
      ["Coaxial cable to each device", "Each device would need its own cable through the walls."],
      ["Optical fibre to each device", "Fibre is expensive and needs cables and special connectors."],
      ["Twisted-pair cable to each device", "This still needs a cable run to every device."],
    ],
    answer: "A", explanation: "Wi-Fi uses radio waves through the air, so no cables are needed, several devices can connect, and people can move about. Its short range is enough inside a house.",
    hints: ["Which medium needs no cable at all?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true, objectives: MEDIA,
    stem: "Which media carry the signal as an electrical current? Select **all** that apply.",
    options: [
      ["Twisted-pair cable", "The signal travels as electricity along copper wires."],
      ["Coaxial cable", "The signal travels as electricity along the central copper wire."],
      ["Optical fibre", "This carries pulses of light."],
      ["Wi-Fi", "This uses radio waves through the air."],
      ["A microwave link between two masts", "This uses microwaves (radio) through the air."],
    ],
    answer: ["A", "B"], explanation: "Copper cables (twisted pair and coaxial) carry electrical signals. Optical fibres carry light, and Wi-Fi and microwave links carry electromagnetic waves through the air.",
    hints: ["Which media contain copper?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", objectives: MEDIA,
    stem: "True or false: Wi-Fi signals pass through thick brick walls without becoming any weaker.",
    answer: false,
    feedbackFalse: "Correct. Walls absorb and reflect some of the radio waves, so the signal weakens.",
    feedbackTrue: "Not so. Thick walls weaken Wi-Fi signals, which is one reason for its short range.",
    explanation: "Wi-Fi radio waves are partly absorbed and reflected by walls, so the signal becomes weaker. Its range is only tens of metres." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: PHONE,
    stem: "A passenger makes a call on a bus travelling from Harare to Marondera. Why does the call not cut off as the bus leaves the area served by the first mast?",
    options: [
      ["The network hands the call over to the next base station.", "Each base station serves one cell; the call is passed from cell to cell."],
      ["The phone sends its signal straight to the switching centre.", "A phone's signal only reaches nearby masts."],
      ["The phone switches over to the bus's Wi-Fi automatically.", "Most buses have no Wi-Fi, and calls are carried by the cell network."],
      ["The first mast's radio waves follow the bus along the road.", "Each mast covers a limited area; its waves do not follow anyone."],
    ],
    answer: "A", explanation: "As the phone moves out of one cell and into the next, the network hands the call over to the new base station without breaking the connection.",
    hints: ["Why are they called cell phones?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: PHONE,
    stem: "Why do modern phone networks send voice and data as digital signals?",
    options: [
      ["Only 0s and 1s must be told apart, so noise can be removed.", "The original code can be recovered and re-sent cleanly."],
      ["Digital signals travel faster than any other kind of signal.", "All radio signals travel at the speed of light."],
      ["Digital signals never become weaker as they travel.", "They do weaken, but they can be regenerated."],
      ["Digital signals do not need any medium or aerial at all.", "They still need aerials and a medium such as air or cable."],
    ],
    answer: "A", explanation: "A digital signal has only two values. Even after it has weakened and picked up noise, the receiver can tell 0 from 1, so repeaters and base stations can rebuild a clean copy.",
    hints: ["What does a receiver have to decide for each part of a digital signal?"] });

  q.short({ d: 1, skill: "RECALL", objectives: MEDIA,
    stem: "Name the process that keeps light inside the core of an optical fibre.",
    accepted: ["total internal reflection", "TIR", "total reflection", "internal reflection"],
    wrong: ["refraction", "diffraction"],
    explanation: "Light meets the boundary between the core and the cladding at a large angle and is totally internally reflected, so it zig-zags along the core." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: MEDIA,
    stem: "Which is a disadvantage of optical fibre compared with copper cable?",
    options: [
      ["It costs more, and joining fibres needs special skill.", "Fibre and its connecting equipment are expensive."],
      ["It is heavier and thicker for the same amount of data.", "Fibres are thin and light."],
      ["It picks up interference from nearby power lines.", "Light signals are not affected by electrical interference."],
      ["It carries much less information than a copper cable.", "Fibre carries far more information than copper."],
    ],
    answer: "A", explanation: "Optical fibre carries more information with less loss and no electrical interference, but it is expensive, the glass is fragile, and fibres must be joined with special equipment." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true, objectives: PHONE,
    stem: "A farmer in Murehwa uses a cell phone to call a cattle buyer in Bulawayo.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the part of the farmer's phone that changes his voice into an electrical signal.",
        accepted: ["microphone", "mic", "the microphone", "mouthpiece"], wrong: ["loudspeaker"] }),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of wave that carries the signal from the farmer's phone to the nearest mast.",
        accepted: ["radio waves", "radio", "radio wave", "microwaves", "microwave", "electromagnetic waves", "electromagnetic waves (radio)"],
        keywords: { any: ["radio*", "microwave*"] },
        wrong: ["sound waves"] }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how the signal reaches the buyer's phone after it arrives at the base station near Murehwa.",
        points: ["The base station passes the signal into the network / to a switching centre", "It is carried through cables, optical fibres or microwave links to a base station near Bulawayo (the network finds where the buyer's phone is)", "That base station sends it as radio waves to the buyer's phone, whose aerial picks it up and decodes it"] }),
      P.manual({ label: "(d)", marks: 1, stem: "State the energy change in the loudspeaker of the buyer's phone.",
        points: ["Electrical energy to sound energy"] }),
    ],
    explanation: "Microphone (sound → electrical) and encoding; radio waves to the mast; the network routes the call through cables, fibres or microwave links to a mast near the receiver; radio waves to the receiving phone, decoding, and the loudspeaker (electrical → sound).",
    hints: ["Follow the call in order: phone, mast, network, mast, phone."] });

  q.struct({ d: 4, skill: "EVALUATION", examStyle: true, objectives: MEDIA,
    stem: "A secondary school is improving its connections. Classrooms will use Wi-Fi, and the school will be joined to the district office 25 km away by an optical fibre cable.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "State one advantage of using Wi-Fi in the classrooms.",
        points: ["No cables needed / learners' devices can move around / many devices can connect easily"] }),
      P.manual({ label: "(b)", marks: 1, stem: "State one disadvantage of Wi-Fi in a school building.",
        points: ["Short range / weakened by thick walls / interference / needs a password to keep it secure"] }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how the signal travels along the optical fibre.",
        points: ["As pulses of light (or infrared) in the glass core", "kept in the core by total internal reflection at the boundary with the cladding"] }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why optical fibre is a better choice than coaxial cable for the link to the district office.",
        points: ["Carries much more information (data) at a time", "Less signal loss over long distances / not affected by electrical interference / harder to tap / thinner and lighter"] }),
    ],
    explanation: "Wi-Fi needs no cables but has a short range; optical fibre carries light by total internal reflection and offers high capacity, low loss and no electrical interference over long distances.",
    hints: ["For (d), think about distance and the amount of data."] });

  q.ext({ d: 4, skill: "EVALUATION", examStyle: true, objectives: COMM, marks: 6,
    stem: "A learner in Gweru emails a photo of her science project to her teacher in Kwekwe. Describe how the email travels from the learner's phone to the teacher's laptop, and give two ways in which sending it by email differs from describing the project in a phone call. [6]",
    points: [
      "The phone encodes the message and photo as digital data (0s and 1s)",
      "The data are sent from the phone (by radio to a mast or by Wi-Fi to a router) into the internet",
      "They travel through cables, optical fibres and radio links to the mail server(s)",
      "The email is stored in the teacher's inbox on the mail server until the teacher downloads it and the laptop decodes it",
      "Email: the teacher need not be online at the same time / can read it later, whereas a call needs both people at once",
      "Email: carries the photo exactly and keeps a written record, whereas a call carries only speech and leaves no record",
    ],
    modelAnswer: "The learner's phone encodes the message and the photo as digital data, a stream of 0s and 1s. The phone sends the data by radio waves to the nearest mast (or by Wi-Fi to a router), and they travel through the internet's cables, optical fibres and radio links to the mail server. The email is stored in the teacher's inbox on the server. When the teacher opens his email, the laptop downloads the message and decodes it into text and the picture. Unlike a phone call, the teacher does not have to be available when the email is sent: it waits on the server. The email also carries the actual photo and keeps a written record that can be read again, whereas a call carries only speech at that moment.",
    explanation: "Encode → send by radio or Wi-Fi → internet links → mail server inbox → download and decode. Email is store-and-forward and carries files; a call is live speech.",
    hints: ["Use the parts of a communication system: transmitter, medium, receiver; then compare."] });

  q.card("DEFINITION", "Telecommunication", "Communicating over a distance using electrical signals, light or radio waves.");
  q.card("CONCEPT", "Parts of a communication system", "Source → transmitter (encoder) → medium → receiver (decoder) → destination.");
  q.card("CONCEPT", "Cell phone call in order", "Microphone (sound → electrical) → encoded as digital → aerial sends radio waves → base station → network → base station → receiving aerial → decoded → loudspeaker (electrical → sound).");
  q.card("FACT", "Energy conversions in a phone", "Battery: chemical → electrical. Microphone: sound → electrical. Sending aerial: electrical → radio waves. Receiving aerial: radio waves → electrical. Loudspeaker: electrical → sound. Screen: electrical → light.");
  q.card("DEFINITION", "Cell (in a phone network)", "The area served by one base station. As a phone moves, the call is handed over from one base station to the next.");
  q.card("CONCEPT", "How email travels", "Encoded as digital data → internet (radio, cables, fibres) → mail server → stored in the inbox → downloaded and decoded by the receiver's device.");
  q.card("CONCEPT", "Why digital signals?", "Only 0 and 1 must be told apart, so noise can be removed and the signal regenerated: clear over long distances.");
  q.card("FACT", "Twisted pair and coaxial cable", "Both carry electrical signals in copper. Twisting reduces interference (cheap, short distances); coaxial has a metal screen (well shielded, more information).");
  q.card("FACT", "Optical fibre", "Pulses of light kept in a glass core by total internal reflection. Huge capacity, low loss, no electrical interference, hard to tap; but expensive and fragile.");
  q.card("FACT", "Wi-Fi", "Radio waves between a wireless router and devices. No cables and devices can move; but short range, weakened by walls, needs a password.");
});
