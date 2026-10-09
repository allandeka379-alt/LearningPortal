// Slice W4b: notifiable diseases, immunity and vaccination.
import { concept, P, pct, check } from "../lib.mjs";

const vials = Math.ceil(2300 / 1000 - 1e-9);
check(vials === 3, "vials");
const cover = pct(342, 380);
check(cover === 90, "cover");
const mlNeed = 2 * 145;
const bottles = Math.ceil(mlNeed / 100 - 1e-9);
check(mlNeed === 290 && bottles === 3, "bottles");
// Struct 6: Newcastle vaccine for 640 birds, vials of 200 doses.
const ndVials = Math.ceil(640 / 200 - 1e-9);
const ndLeft = ndVials * 200 - 640;
check(ndVials === 4 && ndLeft === 160, "nd");

concept("agri.health.notifiable-immunity", { file: "health/notifiable-immunity", keyPrefix: "health.notifiable-immunity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a notifiable disease?",
    options: [
      ["One that must by law be reported", "Correct: to the veterinary services."],
      ["Any disease a farmer can treat on the farm", "Treatability is not the definition."],
      ["A disease that affects only poultry", "Notifiable diseases affect many species."],
      ["A disease caused only by poor feeding", "Notifiable diseases are infectious."],
    ],
    answer: "A",
    explanation: "Notifiable (scheduled) diseases are listed in animal health law and must be reported when suspected.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which animals are affected by foot-and-mouth disease?",
    options: [
      ["Cloven-hoofed animals such as cattle and pigs", "Correct."],
      ["Poultry such as chickens and turkeys", "Poultry are not affected."],
      ["Donkeys and horses only", "Horses and donkeys are not cloven-hoofed."],
      ["Rabbits only", "Rabbits are not the hosts."],
    ],
    answer: "A",
    explanation: "FMD affects cloven-hoofed animals: cattle, pigs, sheep, goats and wild species such as buffalo.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Trypanosomiasis in cattle is spread by:",
    options: [
      ["the tsetse fly", "Correct: the vector."],
      ["the blue tick", "The blue tick spreads redwater and gallsickness."],
      ["contaminated drinking water", "Trypanosomes are carried in blood by flies."],
      ["the mosquito", "Mosquitoes are not the vector of nagana."],
    ],
    answer: "A",
    explanation: "Tsetse flies carry trypanosomes from animal to animal when they feed on blood.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A cow is found dead with dark, unclotted blood oozing from her nose and anus. What should the farmer do?",
    options: [
      ["Keep everyone away and report it, without opening it", "Correct: anthrax is suspected."],
      ["Skin it at once so that the hide can still be sold for cash", "Opening releases spores and risks human infection."],
      ["Cut it open to find the cause of death", "Never open a suspected anthrax carcass."],
      ["Leave it in the paddock for the dogs to clear", "Scavengers spread anthrax spores."],
    ],
    answer: "A",
    hints: ["Which notifiable disease causes sudden death with unclotted blood?"],
    explanation: "These signs suggest anthrax. Opening the carcass lets the bacteria form spores that contaminate soil for years and can infect people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Antibodies a calf receives in colostrum give it which type of immunity?",
    options: [
      ["Natural passive immunity", "Correct: ready-made antibodies from the mother."],
      ["Natural active immunity", "Active immunity is made by the calf itself."],
      ["Artificial active immunity", "That is vaccination."],
      ["Artificial passive immunity", "That is an antiserum injection."],
    ],
    answer: "A",
    explanation: "Colostral antibodies are made by the mother and received naturally: natural passive immunity.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must a newborn calf suck colostrum within the first few hours of birth?",
    options: [
      ["Its gut can absorb whole antibodies only briefly", "Correct: absorption falls quickly in the first day."],
      ["Colostrum turns into poison after one day", "It does not; it changes to normal milk."],
      ["The calf can digest no other kind of feed for a whole month", "Calves drink normal milk after colostrum."],
      ["Colostrum vaccinates the mother as well", "Sucking does not vaccinate the cow."],
    ],
    answer: "A",
    hints: ["What happens to the calf's gut lining soon after birth?"],
    explanation: "The newborn's gut absorbs antibodies whole for only a short time, so early feeding gives the most protection.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do veterinary services stop cattle movements in a district where foot-and-mouth disease is found?",
    options: [
      ["To stop infected animals spreading the virus", "Correct: the virus spreads with animals and vehicles."],
      ["To make the cattle grow faster", "Movement control is not for growth."],
      ["Because the disease affects only moving cattle", "All exposed cloven-hoofed animals are at risk."],
      ["To prevent tsetse flies following the cattle", "Tsetse spread trypanosomiasis, not FMD."],
    ],
    answer: "A",
    hints: ["How does FMD spread between farms?"],
    explanation: "FMD spreads very readily with live animals, products, people and vehicles; stopping movement contains the outbreak.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A donkey that has never been vaccinated against tetanus gets a deep, dirty wound. The vet injects tetanus antitoxin (ready-made antibodies) at once and starts a course of vaccine. Why is the antitoxin given?",
    options: [
      ["They protect at once while the vaccine takes effect", "Correct: passive immunity is immediate."],
      ["They give protection for the rest of the donkey's life", "Passive immunity lasts only weeks."],
      ["They make the vaccine unnecessary", "The vaccine gives lasting active immunity."],
      ["They make the wound heal faster", "They neutralise the toxin; they do not heal tissue."],
    ],
    answer: "A",
    hints: ["Compare how quickly active and passive immunity work."],
    explanation: "Active immunity from vaccine takes days to develop; injected antibodies (artificial passive immunity) protect immediately but briefly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Vaccination is used to cure animals that are already sick with Newcastle disease.",
    answer: false,
    explanation: "False. Vaccines prevent disease in healthy birds; there is no cure for Newcastle disease.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each notifiable disease with its cause.",
    pairs: [
      ["Anthrax", "Bacterium that forms spores"],
      ["Foot-and-mouth disease", "Virus of cloven-hoofed animals"],
      ["Newcastle disease", "Virus of poultry"],
      ["Trypanosomiasis", "Protozoan carried by tsetse flies"],
    ],
    explanation: "Learn the type of organism for each named disease.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Immunity that an animal makes itself after vaccination is called artificial {{blank:a}} immunity; antibodies received in colostrum give natural {{blank:b}} immunity.",
    blanks: [{ id: "a", accepted: ["active"] }, { id: "b", accepted: ["passive"] }],
    explanation: "Vaccination: artificial active. Colostrum: natural passive.",
  });
  b.short({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "Hens in a flock gasp, twist their necks, pass greenish diarrhoea and many die; egg laying falls sharply. Name the notifiable viral disease these signs suggest.",
    accepted: ["Newcastle disease", "Newcastle", "ND", "NCD"],
    keywords: { any: ["newcastle"] },
    hints: ["It is prevented by vaccinating chicks."],
    explanation: "**Newcastle disease**.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A farmer must vaccinate 2,300 chickens. Assume the vaccine comes in vials of 1,000 doses. How many vials must be bought? (Round UP to whole vials.)",
    value: vials, tol: 0, wrong: [2, 2.3],
    explanation: `2,300 ÷ 1,000 = 2.3, so ${vials} vials; 2 vials would leave 300 birds unprotected.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a dip-tank area, 342 of 380 cattle are vaccinated against anthrax. Calculate the percentage vaccinated.",
    value: cover, unit: "%", tol: 0, wrong: [380 - 342, Math.round((380 / 342) * 100)],
    explanation: `342 ÷ 380 × 100 = ${cover}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A vaccine for cattle is given at 2 mL per animal (assume). A farmer has 145 cattle and the vaccine is sold in 100 mL bottles. How many bottles must he buy?",
    value: bottles, tol: 0, wrong: [2, round2(mlNeed / 100)],
    hints: ["Total volume = dose × number of cattle."],
    explanation: `2 × 145 = ${mlNeed} mL; ${mlNeed} ÷ 100 = 2.9, so ${bottles} bottles.`,
    workedSolution: `1. Volume needed = 2 mL × 145 = ${mlNeed} mL.\n2. Bottles = ${mlNeed} ÷ 100 = 2.9.\n3. Round up: ${bottles} bottles (2 bottles would leave 45 cattle without vaccine).`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why some livestock diseases are made notifiable by law.",
    hints: ["Think of people, spread and trade."],
    points: [
      "They spread rapidly over large areas / between farms.",
      "So control needs government powers such as quarantine and movement control.",
      "Some can infect people (e.g. anthrax, rabies) / cause heavy losses.",
      "Outbreaks close export markets for meat and animals, harming the whole country's farmers.",
    ],
    modelAnswer: "Diseases such as foot-and-mouth spread very quickly between farms, so only the government can stop them with quarantine and movement control. Others, like anthrax, can kill people, and outbreaks close export markets for meat, harming every farmer in the country.",
    explanation: "Two developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** good practices when vaccinating a flock of chickens through their drinking water.",
    hints: ["Storage, water, timing, records."],
    points: [
      "Keep the vaccine cool and out of sunlight; check the expiry date.",
      "Use clean water with no disinfectant or chlorine, in clean drinkers.",
      "Withhold water for a short time first so the birds drink the vaccine quickly; give enough drinkers for all birds.",
      "Vaccinate only healthy birds at the right age, give boosters as directed, and record the date and batch number.",
    ],
    modelAnswer: "Keep the vaccine cool and in date, mix it in clean water without disinfectant, withhold water briefly so all birds drink it quickly from enough clean drinkers, and vaccinate healthy birds at the right age, recording the date and batch.",
    explanation: "Cold chain, clean water, uptake, records.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "Several cattle at a farm near Chipinge are drooling, limping and have blisters on their tongues and between their hooves. The dairy cows' milk yield has fallen sharply. Buffalo from a nearby conservancy sometimes break through the farm fence.",
    hints: ["Which notifiable disease causes blisters on the mouth and feet?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the disease these signs suggest.",
        accepted: ["foot-and-mouth disease", "foot and mouth disease", "foot and mouth", "FMD", "foot-and-mouth"],
        keywords: { any: ["foot", "fmd"] },
        explanation: "**Foot-and-mouth disease**.",
      }),
      P.mcq({
        label: "(b)", stem: "What type of organism causes this disease?",
        options: [
          ["A virus", "Correct."],
          ["A bacterium", "Not bacterial."],
          ["A protozoan", "Not protozoan."],
          ["A roundworm", "Worms do not cause it."],
        ],
        answer: "A",
        explanation: "FMD is viral.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest how the disease probably reached the farm, and one way to prevent this.",
        points: ["Buffalo can carry the virus and passed it to the cattle by contact / sharing grazing and water.", "Repair and strengthen (game-proof) the fence / keep cattle away from buffalo areas."],
        explanation: "Wildlife carriers.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State the farmer's legal duty and **one** action he must take while waiting for the veterinary officer.",
        points: ["Report the suspected disease to the veterinary services at once (it is notifiable).", "Keep the cattle confined / do not move or sell animals, milk or products / stop visitors and vehicles."],
        explanation: "Report and confine.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why an outbreak on one farm can affect every cattle farmer in the country.",
        points: ["The virus spreads rapidly to neighbouring farms by animals, people, vehicles and products.", "Movement controls and quarantine stop sales and auctions over a wide area.", "Importing countries ban the country's beef, so export markets are lost / prices fall."],
        explanation: "Spread, movement control, trade.",
      }),
    ],
    explanation: "Identify a notifiable disease and explain the farmer's duty and the wider effects.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Farai keeps 640 indigenous chickens near Masvingo. The veterinary officer advises vaccinating against Newcastle disease. Assume the vaccine comes in vials of 200 doses, one dose per bird. Last year a calf on the same farm died of scours after its mother died at birth.",
    hints: ["Round vials UP.", "What does a newborn calf miss if its mother dies?"],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many vials must Farai buy?",
        value: ndVials, tol: 0, wrong: [3, 3.2],
        explanation: `640 ÷ 200 = 3.2, so ${ndVials} vials.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many doses will be left over?",
        value: ndLeft, tol: 0, wrong: [40, 640 - 600],
        explanation: `${ndVials} × 200 = 800; 800 − 640 = ${ndLeft} doses.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain what type of immunity the vaccine gives the chickens.",
        points: ["Artificial active immunity.", "The birds' own bodies make antibodies (and memory) in response to the weakened virus, giving long-lasting protection."],
        explanation: "Vaccination = artificial active.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the orphaned calf died of scours, and what Farai should do for orphaned calves in future.",
        points: ["It received no colostrum, so it had no antibodies (no passive immunity) against scours pathogens.", "Feed colostrum from another cow (or stored frozen colostrum) within the first few hours of birth."],
        explanation: "Colostrum gives passive immunity.",
      }),
    ],
    explanation: "Plan a vaccination and explain active and passive immunity.",
  });

  b.card("DEFINITION", "Notifiable (scheduled) disease", "A disease that must by law be reported to the veterinary services when suspected.");
  b.card("FACT", "Anthrax: cause, sign and key rule", "Spore-forming bacterium; sudden death with dark unclotted blood from openings; never open the carcass, report it.");
  b.card("FACT", "Foot-and-mouth disease", "Virus of cloven-hoofed animals; blisters on mouth, feet and teats, drooling, lameness; control by quarantine, movement control and vaccination.");
  b.card("FACT", "Newcastle disease", "Viral disease of poultry; gasping, twisted neck, green diarrhoea, egg drop, deaths; prevent by vaccination.");
  b.card("FACT", "Trypanosomiasis", "Protozoan blood disease spread by tsetse flies; anaemia and wasting; control tsetse and use trypanocidal drugs.");
  b.card("CONCEPT", "Four types of immunity", "Natural active (recovery), artificial active (vaccination), natural passive (colostrum), artificial passive (antiserum).");
  b.card("DEFINITION", "Colostrum", "The first milk after birth, rich in antibodies; must be sucked within the first few hours.");
  b.card("CONCEPT", "Active versus passive immunity", "Active: own antibodies, slow to start, long-lasting. Passive: borrowed antibodies, immediate, lasts only weeks.");
  b.card("DEFINITION", "Vaccine", "Killed or weakened pathogens (or parts) that make an animal produce its own antibodies without getting the disease.");
});

function round2(x) {
  return Math.round(x * 100) / 100;
}
