import { concept, P } from "../lib.mjs";

const O = (...codes) => codes.map((c) => `zimsec/o-level/combined-science:${c}`);

// =====================================================================================================================
concept("cs.health.hygiene-and-transmission", {
  file: "health/hygiene-and-transmission",
  keyPrefix: "health.hygiene",
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", objectives: O("7.1.7.1.1"),
    stem: "Which statement best describes a healthy person?",
    options: [
      ["A person who is physically, mentally and socially well", "Correct: health has all three parts."],
      ["A person who has never needed to visit a clinic", "Health is more than not being ill."],
      ["A person who is physically strong and fit", "Physical health is only one part of health."],
      ["A person who eats a lot of food every day", "Eating a lot is not the same as eating a balanced diet, and diet is only one part of health."],
    ],
    answer: "A", explanation: "Health is a state of complete physical, mental and social well-being, not just the absence of disease." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: O("7.1.7.1.1"),
    stem: "A person who has no disease is always healthy.",
    answer: false,
    explanation: "False. Health also includes mental and social well-being: a person who is free of disease but constantly anxious, or isolated from others, is not fully healthy." });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: O("7.1.7.1.1"),
    stem: "Tendai is physically fit and is never ill, but he spends every break alone, has no friends at school and avoids taking part in class activities. Which part of his health is poor?",
    options: [
      ["Social health", "Correct: he does not mix with or relate to other people."],
      ["Physical health", "He is fit and never ill."],
      ["Personal hygiene", "Nothing is said about his cleanliness."],
      ["Food hygiene", "Nothing is said about how his food is handled."],
    ],
    answer: "A", explanation: "Social health is about getting on with other people and taking part in community life. Tendai is physically healthy but socially isolated.",
    hints: ["Health has three parts: physical, mental and social. Which one is about relationships with other people?"] });

  q.mcq({ d: 1, skill: "RECALL", objectives: O("7.1.7.1.2"),
    stem: "When is it most important to wash your hands with soap and water?",
    options: [
      ["After using the toilet and before handling food", "Correct: this stops germs from faeces reaching food and the mouth."],
      ["Only when they look dirty", "Germs are too small to see, so clean-looking hands can still carry them."],
      ["Only after playing sport", "Hands must be washed after the toilet and before eating."],
      ["Only before going to bed", "The key times are after the toilet and before handling food."],
    ],
    answer: "A", explanation: "Washing hands with soap after using the toilet and before handling or eating food removes pathogens before they can reach food or the mouth." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: O("7.1.7.1.2", "7.1.7.1.4"),
    stem: "Why should cooked food at a market stall be kept covered?",
    options: [
      ["Houseflies that have landed on faeces or rubbish can leave bacteria on uncovered food.", "Correct."],
      ["Covering food makes it cook faster.", "The food is already cooked; covering it is about keeping flies away."],
      ["Covering food stops the vitamins from evaporating.", "Vitamins do not evaporate from food; the reason is hygiene."],
      ["Uncovered food becomes poisonous in sunlight.", "Sunlight does not make food poisonous; flies carry bacteria to it."],
    ],
    answer: "A", explanation: "Houseflies carry bacteria on their feet and mouthparts from faeces and rubbish to food. Covering food breaks this route of transmission." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", multiple: true, objectives: O("7.1.7.1.2"),
    stem: "Which of these are good food hygiene practices? Select all that apply.",
    options: [
      ["Cooking meat thoroughly and eating it while hot", "Correct: heat kills bacteria."],
      ["Keeping raw meat away from cooked food", "Correct: bacteria on raw meat can spread to food that will not be cooked again."],
      ["Drying washed plates on a raised dish rack", "Correct: plates kept off the ground stay clean."],
      ["Washing vegetables in water from an unprotected well", "Unsafe water can add pathogens to the food."],
      ["Leaving cooked food uncovered so that it cools faster", "Uncovered food attracts flies."],
      ["Using the same unwashed knife for raw meat and bread", "This transfers bacteria from raw meat to bread."],
    ],
    answer: ["A", "B", "C"],
    explanation: "Thorough cooking, separating raw and cooked food and keeping clean utensils off the ground all stop pathogens reaching food. Unsafe water, uncovered food and dirty knives spread them." });

  q.short({ d: 2, skill: "RECALL", daily: true, objectives: O("7.1.7.1.2"),
    stem: "Diarrhoea from cholera can kill a young child quickly. Name the condition, caused by the loss of water and salts from the body, that is responsible.",
    accepted: ["dehydration", "severe dehydration"], wrong: ["anaemia"],
    explanation: "Dehydration: diarrhoea and vomiting remove water and salts faster than the child can replace them." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: O("7.1.7.1.2"),
    stem: "Mixing bleach with another toilet cleaner makes a safer and stronger disinfectant.",
    answer: false,
    explanation: "False. Some cleaning products react with bleach to give off poisonous gases. Use one disinfectant at a time, diluted as the label says, in a well-ventilated place." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: O("7.1.7.1.2", "7.1.7.1.4"),
    stem: "Learners clear rubbish out of a blocked drain and then pour disinfectant into it. How does this help to prevent disease?",
    options: [
      ["Water no longer stands in the drain, so mosquitoes cannot breed there, and the disinfectant kills pathogens.", "Correct."],
      ["The disinfectant makes the water safe to drink.", "Drain water is never safe to drink."],
      ["It stops the drain smelling, which is the main cause of disease.", "Smells do not cause disease; pathogens and vectors do."],
      ["The rubbish removed from the drain can be eaten by livestock.", "Rubbish is harmful to livestock."],
    ],
    answer: "A", explanation: "A clear drain carries water away instead of letting it stand where mosquitoes breed, and the disinfectant kills germs that multiply in the dirty water." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: O("7.1.7.1.3"),
    stem: "Which method of waste disposal releases poisonous fumes when the waste contains plastics and rubber?",
    options: [
      ["Burning", "Correct."],
      ["Burying in a refuse pit", "Buried plastic does not rot, but it does not give off fumes."],
      ["Recycling", "Recycling collects plastics to make new products."],
      ["Composting", "Plastics are not composted."],
    ],
    answer: "A", explanation: "Burning plastics and rubber releases poisonous gases and smoke that pollute the air and harm health." });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: O("7.1.7.1.3"),
    stem: "A family plans to dig a refuse pit next to their shallow well because it is close to the kitchen. What is the main danger?",
    options: [
      ["Substances and pathogens from the rotting waste may soak through the soil into the well water.", "Correct."],
      ["The pit will fill up more quickly near a well.", "The distance from the well does not change how fast the pit fills."],
      ["Waste cannot rot in damp soil.", "Waste rots well in damp soil; that is not the danger."],
      ["Smoke from the pit will reach the kitchen.", "Burying does not produce smoke."],
    ],
    answer: "A", explanation: "Liquid from rotting waste can carry chemicals and pathogens down through the soil into underground water, so refuse pits must be dug well away from wells and boreholes.",
    hints: ["Think about where rainwater goes after it falls on the waste in the pit."] });

  q.mcq({ d: 3, skill: "ANALYSIS", objectives: O("7.1.7.1.3"),
    stem: "A school has a large amount of each kind of waste below. Which is the best to recycle rather than bury?",
    options: [
      ["Empty aluminium drink cans", "Correct: metal does not rot when buried and can be melted down and used again."],
      ["Potato peelings from the kitchen", "These rot quickly and can be composted or buried."],
      ["Leaves swept from the school grounds", "These rot and make good compost."],
      ["Used paper towels from the toilets", "These are soiled and are not suitable for recycling."],
    ],
    answer: "A", explanation: "Aluminium cans do not rot in a pit, but they can be collected, melted and made into new cans, saving raw materials and energy.",
    hints: ["Which waste would still be in the pit, unchanged, many years later?"] });

  q.short({ d: 2, skill: "RECALL", objectives: O("7.1.7.1.3"),
    stem: "Name the government agency that is responsible for protecting the environment in Zimbabwe and can fine people who litter.",
    accepted: ["Environmental Management Agency", "EMA", "the Environmental Management Agency", "Environment Management Agency"], wrong: ["ZESA"],
    explanation: "The Environmental Management Agency (EMA)." });

  q.match({ d: 2, skill: "RECALL", objectives: O("7.1.7.1.4"),
    stem: "Match each route of disease transmission with the disease the syllabus links it to.",
    pairs: [["Water", "Cholera"], ["Contact", "Ebola"], ["Vector (mosquito)", "Malaria"], ["Food", "Typhoid"]],
    explanation: "Cholera is spread through contaminated water, Ebola through contact with body fluids, malaria by the female Anopheles mosquito and typhoid mainly through contaminated food." });

  q.fib({ d: 2, skill: "RECALL", objectives: O("7.1.7.1.4"),
    stem: "Complete the sentence.",
    template: "Cholera is spread mainly through contaminated {{blank:a}}, while malaria is carried from person to person by a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["water", "drinking water"], wrong: "air" },
      { id: "b", accepted: ["mosquito", "female mosquito", "Anopheles mosquito", "female Anopheles mosquito", "vector", "female anopheles mosquito", "anopheles mosquito"], wrong: "fly" },
    ],
    explanation: "Cholera bacteria are carried in water contaminated with faeces; the malaria parasite is carried by the female Anopheles mosquito." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: O("7.1.7.1.4"),
    stem: "How does the way a housefly spreads disease differ from the way a mosquito spreads malaria?",
    options: [
      ["The fly carries bacteria on the outside of its body to food; the mosquito carries the parasite inside its body and injects it when it bites.", "Correct."],
      ["The fly injects bacteria when it bites; the mosquito leaves parasites on food.", "This is the wrong way round."],
      ["Both inject pathogens into the blood when they bite.", "Houseflies do not bite people to feed on blood."],
      ["Neither spreads disease; they are only a nuisance.", "Both spread disease."],
    ],
    answer: "A", explanation: "A housefly picks up bacteria on its feet and mouthparts from faeces and leaves them on food. The female Anopheles mosquito carries Plasmodium in its body and injects it into the blood when it feeds.",
    hints: ["Does a housefly bite people? Where on its body are the germs it carries?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: O("7.1.7.1.4"),
    stem: "People catch bilharzia when they wade, wash or swim in infected water. Which animal carries the parasite in that water?",
    options: [
      ["Freshwater snails", "Correct: the larvae leave the snails and burrow through human skin."],
      ["Mosquito larvae", "Mosquitoes carry malaria, not bilharzia."],
      ["Fish", "Fish do not carry the bilharzia parasite."],
      ["Frogs", "Frogs do not carry the bilharzia parasite."],
    ],
    answer: "A", explanation: "The bilharzia parasite develops in freshwater snails; its larvae leave the snails and burrow through the skin of people in the water." });

  q.num({ d: 2, skill: "APPLICATION", daily: true, objectives: O("7.1.7.1.4"),
    stem: "In a boarding hostel of 120 learners, 18 fell ill with diarrhoea in the same week. What percentage of the learners fell ill?",
    value: 15, unit: "%", wrong: [18, 6.67, 85],
    explanation: "Percentage = 18 ÷ 120 × 100% = 15%." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true, objectives: O("7.1.7.1.3"),
    stem: "A secondary school produces food waste from its kitchen, paper from its classrooms and plastic bottles from its tuck shop.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two advantages of burying the food waste in a refuse pit.",
        points: ["It is cheap and simple / needs no machinery", "Covering it keeps away flies, rats and dogs, or the waste rots and enriches the soil"] }),
      P.manual({ label: "(b)", marks: 2, stem: "State two disadvantages of burning the plastic bottles.",
        points: ["Burning plastics releases poisonous fumes or smoke that pollute the air and harm health", "Fire may spread (veld fire) / carbon dioxide is released / the ash still has to be disposed of"] }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why recycling is a better way to deal with the plastic bottles than burying them.",
        points: ["Plastics do not rot, so buried bottles stay in the pit for many years and fill it up", "Recycling turns them into new products, saving raw materials and energy (and can earn money)"] }),
    ],
    explanation: "Burying is cheap and keeps pests away but uses land; burning plastics gives poisonous fumes and risks fires; plastics do not rot, so recycling them saves resources and pit space.",
    hints: ["For each method think about cost, pests, pollution of air and water, and whether the waste rots."] });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, objectives: O("7.1.7.1.2", "7.1.7.1.4"),
    stem: "A village draws its drinking water from an unprotected river. Some families have no toilet.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how cholera could spread through this village.",
        points: ["Faeces of an infected person (from open defecation) are washed into the river", "Other people drink the untreated river water (or use it on food) and take in the bacteria"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest two ways in which the families could prevent cholera.",
        points: ["Boil or chlorinate drinking water, or use a protected borehole", "Build and use toilets (latrines) so faeces do not reach the river; or wash hands with soap after the toilet and before food"] }),
    ],
    explanation: "Cholera bacteria pass from faeces into water and then into people who drink it. Safe water and proper sanitation break the chain.",
    hints: ["Follow the bacteria: where do they leave an infected person, and how do they reach the next person?"] });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, objectives: O("7.1.7.1.2"),
    stem: "A rural school has built a tippy-tap beside its toilets: a container of water tipped by a foot pedal, with soap on a string.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Explain why tipping the container with a foot pedal is more hygienic than tipping it by hand.",
        points: ["Hands do not touch the container, so germs are not passed from one user to the next"] }),
      P.manual({ label: "(b)", marks: 1, stem: "Suggest why the waste water should drain into a soak pit filled with stones.",
        points: ["So that no puddle forms where mosquitoes could breed or the ground becomes muddy"] }),
      P.manual({ label: "(c)", marks: 2, stem: "State two times at which learners should wash their hands.",
        points: ["After using the toilet", "Before handling or eating food"] }),
    ],
    explanation: "A tippy-tap lets people wash without touching anything that others have touched, uses little water and should drain into a soak pit so that no stagnant water forms.",
    hints: ["Think about what passes germs from one person's hands to the next."] });

  q.card("FACT", "What is health?", "A state of complete physical, mental and social well-being, not just the absence of disease.");
  q.card("FACT", "When must hands be washed with soap?", "After using the toilet and before handling or eating food.");
  q.card("CONCEPT", "Why is food hygiene important?", "Pathogens in food and water cause cholera, typhoid, dysentery and food poisoning; diarrhoea can kill through dehydration.");
  q.card("FACT", "Four food hygiene practices", "Wash hands; cover food from flies; cook meat thoroughly and eat it hot; keep raw meat away from cooked food (also: safe water, clean utensils on a raised rack).");
  q.card("CONCEPT", "Burying waste: one advantage and one disadvantage", "Advantage: cheap, and covering it keeps away flies and rats. Disadvantage: needs land, plastics do not rot, and it can pollute groundwater.");
  q.card("CONCEPT", "Burning waste: one advantage and one disadvantage", "Advantage: quickly reduces the volume and kills pathogens. Disadvantage: poisonous fumes from plastics, air pollution and the risk of veld fires.");
  q.card("CONCEPT", "Recycling waste: one advantage and one disadvantage", "Advantage: saves raw materials and energy and creates income. Disadvantage: waste must be sorted, collected and transported to a buyer.");
  q.card("FACT", "Four routes of disease transmission, with examples", "Water (cholera), food (typhoid), contact (Ebola), vectors (malaria by mosquitoes; bilharzia by snails).");
  q.card("CONCEPT", "How does a housefly spread disease?", "It carries bacteria on its feet and mouthparts from faeces and rubbish to uncovered food.");
});

// =====================================================================================================================
concept("cs.health.ebola", {
  file: "health/ebola",
  keyPrefix: "health.ebola",
  objectives: { zimsec: ["7.1.7.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What type of pathogen causes Ebola?",
    options: [
      ["A virus", "Correct: the Ebola virus."],
      ["A bacterium", "Cholera and typhoid are bacterial; Ebola is viral."],
      ["A single-celled parasite", "That is Plasmodium, which causes malaria."],
      ["A fungus", "Fungi cause diseases such as ringworm, not Ebola."],
    ],
    answer: "A", explanation: "Ebola virus disease is caused by the Ebola virus." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is Ebola usually spread from one person to another?",
    options: [
      ["By direct contact with the blood or body fluids of a sick or dead person", "Correct."],
      ["By the bite of an infected mosquito", "That is how malaria spreads."],
      ["By drinking water contaminated with faeces", "That is how cholera mainly spreads."],
      ["By breathing in droplets from the air in the same room", "Ebola is not spread through the air."],
    ],
    answer: "A", explanation: "Ebola spreads through direct contact, via broken skin or the eyes, nose and mouth, with the blood and body fluids of an infected person or with objects soiled by them." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ebola can be caught by breathing the same air as an infected person.",
    answer: false,
    explanation: "False. Ebola spreads by direct contact with body fluids, not through the air, so gloves, gowns, hand-washing and safe burials can control it." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "A person infected with Ebola can spread it to others before any symptoms appear.",
    answer: false,
    explanation: "False. People do not spread Ebola before their symptoms begin, which is why tracing contacts and isolating anyone who develops symptoms works." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is the incubation period of Ebola?",
    options: [
      ["2 to 21 days", "Correct."],
      ["A few minutes to an hour", "Far too short for any infectious disease of this kind."],
      ["6 to 12 months", "Far too long."],
      ["Exactly 7 days", "The period varies from person to person."],
    ],
    answer: "A", explanation: "Symptoms of Ebola appear between 2 and 21 days after infection." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are antibiotics not used to cure Ebola?",
    options: [
      ["Ebola is caused by a virus, and antibiotics do not kill viruses.", "Correct."],
      ["Antibiotics are too expensive for treatment centres.", "Cost is not the reason: they would not work."],
      ["Ebola patients are allergic to antibiotics.", "This is not true."],
      ["Ebola is caused by a parasite carried by mosquitoes.", "Ebola is caused by a virus and is not carried by mosquitoes."],
    ],
    answer: "A", explanation: "Antibiotics kill bacteria but have no effect on viruses. Ebola patients receive supportive care and, where available, antibody medicines." });

  q.mcq({ d: 2, skill: "RECALL", multiple: true,
    stem: "Which of these are early symptoms of Ebola? Select all that apply.",
    options: [
      ["Sudden fever", "Correct."],
      ["Muscle pain", "Correct."],
      ["Extreme tiredness and weakness", "Correct."],
      ["A cough lasting more than three weeks", "This is a sign of tuberculosis."],
      ["A painless sore on the genitals", "This is a sign of syphilis."],
      ["A swelling in the front of the neck", "This is goitre, caused by a lack of iodine."],
    ],
    answer: ["A", "B", "C"],
    explanation: "Ebola begins suddenly with fever, weakness, muscle pain, headache and sore throat; vomiting, diarrhoea and sometimes bleeding follow." });

  q.short({ d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to keeping an infected person apart from other people, in a separate ward or treatment centre, so that the disease cannot spread?",
    accepted: ["isolation", "isolating", "isolation of the patient"], wrong: ["vaccination"],
    explanation: "Isolation keeps the patient's body fluids away from family and the community. (Quarantine is the related word for separating healthy contacts who may have been exposed.)" });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each disease with its cause.",
    pairs: [["Malaria", "Plasmodium, a single-celled parasite"], ["Typhoid", "Salmonella Typhi, a bacterium"], ["Cholera", "Vibrio cholerae, a bacterium"], ["Ebola", "Ebola virus"]],
    explanation: "Malaria is caused by Plasmodium, typhoid and cholera by bacteria, and Ebola by a virus." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "During an Ebola outbreak, trained teams carry out burials instead of families. Why?",
    options: [
      ["The bodies of people who died of Ebola contain large amounts of virus, and mourners who wash or touch them can be infected.", "Correct."],
      ["The virus spreads through the air from the grave.", "Ebola does not spread through the air."],
      ["Burial teams can bring the dead person back to life with medicines.", "This is not possible."],
      ["Families might bury the body too close to a borehole and spread the virus in water.", "Water is not the main way Ebola spreads; touching the body is."],
    ],
    answer: "A", explanation: "Virus levels are very high late in the illness and after death. Washing and touching the body at funerals has spread Ebola, so trained teams with protective clothing carry out safe burials.",
    hints: ["Ebola spreads by contact with body fluids. Who touches the body at a traditional funeral?"] });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A health worker checks the temperature of everyone who had contact with an Ebola patient every day for 21 days. Why 21 days?",
    options: [
      ["21 days is the longest incubation period, so anyone still well after 21 days was not infected.", "Correct."],
      ["The vaccine takes 21 days to work.", "That is not the reason for the 21-day check."],
      ["Ebola patients always die within 21 days.", "This is not the reason, and many patients survive."],
      ["Fever only appears on day 21.", "Symptoms can appear on any day from day 2 to day 21."],
    ],
    answer: "A", explanation: "The incubation period is 2 to 21 days. Checking contacts for 21 days means anyone who falls ill is isolated at once, and those still well afterwards were not infected.",
    hints: ["Link the number to the incubation period of Ebola."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "In an area with an Ebola outbreak, which person is at the greatest risk of catching the disease?",
    options: [
      ["A relative who nurses a sick family member at home without gloves", "Correct: they are in direct contact with body fluids."],
      ["A farmer working alone in fields far from the village", "No contact with patients."],
      ["A learner who sits in the same bus as a person who has no symptoms", "People do not spread Ebola before symptoms begin, and it is not airborne."],
      ["A shopkeeper who sells bread to healthy customers", "No contact with body fluids of the sick."],
    ],
    answer: "A", explanation: "Caring for the sick without protection brings direct contact with vomit, blood and other body fluids, the main way Ebola spreads.",
    hints: ["Which person touches the body fluids of someone who is ill?"] });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "Of the four diseases malaria, typhoid, cholera and Ebola, which one is treated first and most urgently with oral rehydration solution (ORS)?",
    options: [
      ["Cholera", "Correct: severe watery diarrhoea dehydrates the patient within hours."],
      ["Malaria", "Malaria is treated with antimalarial drugs."],
      ["Typhoid", "Typhoid is treated mainly with antibiotics."],
      ["Ebola", "Ebola patients also need fluids, but cholera is the disease whose main treatment is immediate ORS."],
    ],
    answer: "A", explanation: "Cholera causes sudden, severe watery diarrhoea. Replacing water and salts at once with ORS (or a drip in severe cases) is the most important treatment.",
    hints: ["Which disease is best known for causing very rapid dehydration?"] });

  q.struct({ d: 4, skill: "UNDERSTANDING", examStyle: true,
    stem: "An outbreak of Ebola is reported in a neighbouring country, and health workers prepare a treatment centre.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of pathogen that causes Ebola.", accepted: ["virus", "a virus", "Ebola virus", "the ebola virus"], wrong: ["bacterium"],
        explanation: "A virus." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two ways in which Ebola is spread from person to person.",
        points: ["Direct contact with the blood or body fluids (vomit, faeces, urine, saliva, sweat) of a sick or dead person", "Contact with objects soiled with body fluids, such as bedding, clothing or used needles; or washing and touching bodies at funerals"] }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why health workers in the centre wear gloves, gowns and goggles.",
        points: ["Ebola spreads through body fluids entering broken skin or the eyes, nose and mouth", "The clothing stops patients' body fluids reaching the workers' skin and eyes"] }),
      P.manual({ label: "(d)", marks: 2, stem: "State two signs or symptoms of Ebola.",
        points: ["Sudden fever, or extreme weakness, or muscle pain, or headache, or sore throat", "Vomiting, or diarrhoea, or a rash, or bleeding from the gums or nose"] }),
      P.manual({ label: "(e)", marks: 1, stem: "Explain why antibiotics will not cure the patients.",
        points: ["Antibiotics kill bacteria but Ebola is caused by a virus"] }),
    ],
    explanation: "Ebola is a viral disease spread by contact with body fluids. Protective clothing blocks that route, and antibiotics do not act on viruses, so treatment is isolation and supportive care.",
    hints: ["Ebola spreads by contact, not through the air.", "What kind of pathogen do antibiotics kill?"] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Malaria, typhoid and Ebola can all begin with a fever, so a clinic must find out which disease a patient has.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the organism that causes malaria.", accepted: ["Plasmodium", "plasmodium", "a plasmodium", "the plasmodium parasite"], wrong: ["mosquito"],
        explanation: "Plasmodium (the mosquito is only the vector)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Typhoid and cholera are both spread through contaminated food and water. State one difference between their main symptoms.",
        points: [["Cholera: sudden, severe watery diarrhoea and vomiting causing rapid dehydration; typhoid: a high fever that rises over several days, with headache, weakness and stomach pain", 2]] }),
      P.manual({ label: "(c)", marks: 3, stem: "State the main treatment for each of malaria, typhoid and Ebola.",
        points: ["Malaria: antimalarial drugs", "Typhoid: antibiotics (with fluids)", "Ebola: isolation with supportive care (fluids and medicines for fever and pain), or antibody medicines"] }),
    ],
    explanation: "The pathogen decides the treatment: antimalarials for Plasmodium, antibiotics for bacteria such as Salmonella Typhi, and supportive care for the Ebola virus.",
    hints: ["Match each disease to its pathogen type first: parasite, bacterium or virus."] });

  q.card("FACT", "Cause of Ebola", "The Ebola virus. Fruit bats are thought to be its natural hosts.");
  q.card("FACT", "How does Ebola spread?", "Direct contact with the blood and body fluids of sick or dead people, with soiled objects, and with infected wild animals. Not through the air.");
  q.card("FACT", "Incubation period of Ebola", "2 to 21 days. Contacts are checked for 21 days.");
  q.card("FACT", "Signs and symptoms of Ebola", "Early: sudden fever, weakness, muscle pain, headache, sore throat. Later: vomiting, diarrhoea, rash and sometimes bleeding.");
  q.card("FACT", "Treatment of Ebola", "Isolation with supportive care (fluids and salts, medicines for fever and pain) and antibody medicines.");
  q.card("FACT", "Prevention of Ebola", "Isolation, protective clothing, safe burials, hand-washing, contact tracing for 21 days, vaccination, avoiding sick or dead wild animals.");
  q.card("CONCEPT", "Why do antibiotics not cure Ebola?", "Antibiotics kill bacteria; Ebola is caused by a virus.");
  q.card("FACT", "Pathogen types: malaria, typhoid, cholera, Ebola", "Malaria: Plasmodium (single-celled parasite). Typhoid and cholera: bacteria. Ebola: a virus.");
});
