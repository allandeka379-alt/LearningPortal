// Builds content/concepts/combined-science-o.json and content/syllabi/zimsec/o-level/combined-science/2015-2022.json.
// The syllabus borrows the concepts of biology-o, chemistry-o, physics-o and mathematics-o (conceptFamilies), so their
// lessons, questions and flashcards are tagged to it; only content unique to Combined Science gets cs.* concepts.
// Source: .scratch/combined-science/sources/combined-science.pdf (Ministry of Primary and Secondary Education,
// Combined Science Syllabus Forms 1-4, 2015-2022). Run: node .scratch/combined-science/build-syllabus.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const CONCEPTS = [
  ["cs.health.hygiene-and-transmission", "Health, hygiene and the spread of disease", "A healthy person (physical, mental and social well-being); personal and food hygiene; disposing of litter and waste by burying, recycling and burning; how diseases spread through water (cholera), food, contact (Ebola) and vectors (malaria, bilharzia)."],
  ["cs.health.ebola", "Ebola virus disease", "Ebola virus disease: its cause (the Ebola virus), spread by direct contact with the blood and body fluids of infected people, living or dead, and of infected animals; its signs and symptoms; supportive treatment; and prevention by isolation, protective clothing, safe burials, hand-washing and vaccination."],
  ["cs.industry.peanut-processing", "Processing groundnuts: peanut butter and peanut oil", "Value addition to groundnuts: the processes of shelling, roasting, grinding and packaging peanut butter and the equipment used (sheller, roaster, peanut butter making machine, grinding stone and mortar and pestle); pressing peanut butter to separate oil, and the uses of the oil."],
  ["cs.physics.fluid-systems", "Siphons, hydraulic systems and pumps", "The siphon; hydraulic systems (the hydraulic jack and car braking system); the lift pump (the Blair pump) and the force pump (the bicycle pump), explained using atmospheric and fluid pressure."],
  ["cs.physics.gears", "Gears", "Gears as simple machines: driver and driven gears, the velocity ratio from the numbers of teeth, changing speed, turning force and direction; gear trains; gears in bicycles, hand drills, egg beaters and vehicle gearboxes."],
  ["cs.physics.solar-heating", "Solar cookers and solar water heaters", "Qualitative design and function of box and reflector (curved) solar cookers and of solar water heaters: absorbing radiation with black surfaces, reflecting it with shiny curved surfaces, reducing losses by insulation and glazing, and convection in thermosiphon heaters."],
  ["cs.physics.telecommunication", "Telecommunication", "Communicating over a distance by cell phone and email: transmitters, receivers, encoding and decoding, energy conversions; transmission media (sheathed twisted-pair cables, coaxial cables, optical fibres and Wi-Fi radio links) and their advantages."],
];

// Node helpers. o = [text] objectives (our own paraphrase); covers = concept keys.
const topic = (key, code, name, description, children) => ({ key, code, name, kind: "TOPIC", description, children });
const sub = (key, code, name, description, covers, objectives) => ({
  key,
  code,
  name,
  description,
  covers,
  objectives: objectives.map((text, i) => ({ code: `${code}.${i + 1}`, text })),
});

const BIOLOGY = {
  key: "biology",
  code: "7.1",
  name: "Biology",
  kind: "SECTION",
  children: [
    topic("biology.laboratory", "7.1.1", "Laboratory safety and apparatus", "Form 1.", [
      sub("biology.laboratory.safety-apparatus", "7.1.1.1", "Laboratory rules and apparatus", "Form 1.",
        ["bio.introduction.laboratory-safety", "chem.practical.apparatus-and-measurement"],
        ["Explain the rules for working safely in a laboratory.", "Identify common laboratory apparatus such as beakers, measuring cylinders, test tubes, crucibles, evaporating dishes, tripods, gauze, burners, spatulas and funnels.", "Use laboratory apparatus correctly and take readings from instruments such as measuring cylinders and balances."]),
    ]),
    topic("biology.cells", "7.1.2", "Cells and levels of organisation", "Forms 1 to 4: cells (Forms 1 and 3), variation (Form 2) and ecosystems (Form 4).", [
      sub("biology.cells.structure", "7.1.2.1", "Plant, animal and specialised cells", "Forms 1 and 3.",
        ["bio.cells.cell-structure", "bio.cells.specialised-cells"],
        ["Describe the structure of plant and animal cells.", "Compare plant and animal cells.", "Identify specialised cells (red blood cells, muscle cells, palisade cells and root hair cells) and relate their structure to their functions.", "Use a microscope or bio-viewer to observe cells."]),
      sub("biology.cells.variation", "7.1.2.2", "Types of variation", "Form 2.",
        ["bio.variation.variation"],
        ["State differences between living organisms.", "Compare continuous and discontinuous variation.", "Draw bar graphs to show variation in living organisms."]),
      sub("biology.cells.ecosystems", "7.1.2.3", "Ecosystems", "Form 4.",
        ["bio.ecology.populations", "bio.ecology.food-chains-and-webs", "bio.ecology.energy-flow-and-pyramids", "bio.ecology.carbon-cycle", "bio.ecology.nitrogen-cycle", "bio.ecology.ecosystem-management", "bio.human-impact.conservation"],
        ["Explain the term ecosystem and list its physical and biological components.", "Explain natural and artificial ecosystems such as forests, ponds, gardens and plantations.", "Construct food chains, food webs and pyramids of biomass.", "Explain how energy is lost along food chains and food webs.", "Describe the carbon and nitrogen cycles.", "Explain biodiversity, its advantages and the problems caused when it is limited."]),
    ]),
    topic("biology.nutrition", "7.1.3", "Nutrition", "Forms 1 to 4.", [
      sub("biology.nutrition.diet", "7.1.3.1", "Diet, malnutrition and food tests", "Forms 1 and 4.",
        ["bio.human-nutrition.balanced-diet", "bio.human-nutrition.malnutrition", "bio.molecules.food-tests", "bio.molecules.carbohydrates-proteins-lipids"],
        ["Define a balanced diet and list its components and their functions.", "Plan balanced meals for different groups of people.", "Explain malnutrition and deficiency diseases, including kwashiorkor, goitre, rickets, scurvy, anaemia and night blindness.", "Describe food tests for starch, simple sugars, proteins and fats."]),
      sub("biology.nutrition.photosynthesis", "7.1.3.2", "Photosynthesis", "Forms 2 and 3.",
        ["bio.plant-nutrition.photosynthesis", "bio.plant-nutrition.limiting-factors-and-gas-exchange", "bio.plant-nutrition.leaf-structure"],
        ["Explain the importance of plants as producers and state the word equation for photosynthesis.", "State and investigate the factors that affect the rate of photosynthesis, and test a leaf for starch.", "Describe what happens to the products of photosynthesis.", "Describe the internal structure of a leaf and how it is adapted for photosynthesis."]),
      sub("biology.nutrition.digestion", "7.1.3.3", "Human digestion and teeth", "Forms 2 and 3.",
        ["bio.human-nutrition.digestive-system", "bio.human-nutrition.teeth-and-physical-digestion", "bio.human-nutrition.chemical-digestion", "bio.human-nutrition.absorption-and-assimilation", "bio.enzymes.enzyme-action"],
        ["Draw and label the alimentary canal and its associated organs, and state their functions.", "Outline the processes of ingestion, digestion, absorption, assimilation and egestion.", "Name the types of teeth and their functions.", "Describe mechanical and chemical digestion and the action of amylase.", "Identify the end products of digestion."]),
    ]),
    topic("biology.respiratory", "7.1.4", "Respiratory systems", "Forms 1 to 4.", [
      sub("biology.respiratory.gas-exchange", "7.1.4.1", "Air, breathing and gaseous exchange", "Forms 1 to 3.",
        ["bio.gas-exchange.breathing-system", "bio.gas-exchange.breathing-and-exercise", "chem.practical.tests-for-gases"],
        ["State the composition of air and identify the respiratory gases.", "Describe the tests for carbon dioxide and oxygen.", "Label the parts of the respiratory system and describe the breathing mechanism.", "Compare inhaled and exhaled air.", "Describe gaseous exchange in the alveoli and how alveoli are adapted for it."]),
      sub("biology.respiratory.respiration", "7.1.4.2", "Aerobic and anaerobic respiration", "Forms 2 and 4.",
        ["bio.respiration.aerobic-respiration", "bio.respiration.anaerobic-respiration"],
        ["State the word equation for aerobic respiration.", "Describe aerobic and anaerobic respiration and give their word equations.", "Show that energy and carbon dioxide are released by respiring organisms and germinating seeds."]),
    ]),
    topic("biology.transport", "7.1.5", "Transport systems", "Forms 1 to 4.", [
      sub("biology.transport.plants", "7.1.5.1", "Transport in plants", "Forms 1 to 4.",
        ["bio.cells.diffusion-and-active-transport", "bio.cells.osmosis", "bio.plant-transport.xylem-phloem-and-water-uptake", "bio.plant-transport.transpiration"],
        ["Describe water movement in plants by diffusion and osmosis.", "Outline the internal structure of a dicotyledonous root and stem.", "Describe the uptake of water and mineral ions by plants.", "Explain transpiration, the factors that affect its rate and its importance, and measure it with a potometer.", "Explain plasmolysis and turgidity.", "Describe how plant leaves are adapted to reduce water loss."]),
      sub("biology.transport.humans", "7.1.5.2", "Blood, the heart and blood vessels", "Forms 1 to 4.",
        ["bio.animal-transport.blood", "bio.animal-transport.heart-and-circulation", "bio.animal-transport.blood-vessels"],
        ["Identify the components of blood and state their functions.", "Draw and label the heart, and name its valves and the main blood vessels.", "Describe the double circulatory system.", "Describe the structure of arteries, veins and capillaries and the differences between them."]),
    ]),
    topic("biology.reproduction", "7.1.6", "Reproductive systems", "Forms 1 to 4.", [
      sub("biology.reproduction.plants", "7.1.6.1", "Reproduction in flowering plants", "Forms 1 to 4.",
        ["bio.reproduction.flowers-and-pollination", "bio.reproduction.fertilisation-and-germination", "bio.reproduction.seeds-and-dispersal", "bio.reproduction.asexual-and-sexual"],
        ["Describe the structure of a simple flower, and of wind- and insect-pollinated flowers.", "Describe pollination and fertilisation.", "Compare monocotyledonous and dicotyledonous seeds and state the functions of the cotyledon and endosperm.", "Describe germination, investigate the conditions it needs and calculate percentage germination.", "Explain asexual reproduction in plants and compare it with sexual reproduction."]),
      sub("biology.reproduction.humans", "7.1.6.2", "Human reproduction", "Forms 1 to 4.",
        ["bio.reproduction.human-reproductive-systems", "bio.reproduction.puberty-and-menstrual-cycle", "bio.reproduction.pregnancy", "bio.reproduction.contraception"],
        ["State the signs of puberty.", "State the functions of the male and female reproductive systems and describe the sex cells.", "Describe fertilisation, the menstrual cycle and the role of the placenta.", "Describe methods of contraception with their advantages and disadvantages."]),
      sub("biology.reproduction.inheritance", "7.1.6.3", "Inheritance", "Form 4. Listed in the scope and sequence chart; the competency matrix gives no objectives for it.",
        ["bio.inheritance.chromosomes-and-genes", "bio.inheritance.monohybrid-inheritance"],
        ["Describe how characteristics are inherited through genes."]),
    ]),
    topic("biology.health", "7.1.7", "Health and diseases", "Forms 1 to 4.", [
      sub("biology.health.hygiene", "7.1.7.1", "Health, hygiene and the spread of disease", "Form 1.",
        ["cs.health.hygiene-and-transmission", "bio.disease.pathogens-and-disease-control", "chem.environment.waste-disposal"],
        ["Describe a healthy person.", "State the importance of personal and food hygiene.", "List ways of disposing of litter and waste, with their advantages and disadvantages.", "Describe how diseases are transmitted through water, food, contact and vectors."]),
      sub("biology.health.diseases", "7.1.7.2", "Bilharzia, malaria, cholera, typhoid and immunity", "Forms 2 to 4.",
        ["bio.disease.bilharzia", "bio.disease.malaria", "bio.disease.cholera", "bio.disease.tuberculosis-and-typhoid", "cs.health.ebola", "bio.disease.immunity-and-vaccination"],
        ["State causes of diseases and describe the life cycle of the bilharzia parasite and how its spread is prevented.", "Describe the causes, signs, symptoms and treatment of malaria, typhoid, Ebola and cholera.", "Describe the life cycle of the malaria parasite and methods of controlling malaria.", "Explain immunity, describe its types and explain how infants acquire it."]),
      sub("biology.health.stis", "7.1.7.3", "Sexually transmitted infections and HIV/AIDS", "Forms 3 and 4.",
        ["bio.reproduction.stis-and-hiv"],
        ["Describe the signs, symptoms, causes, control and treatment of gonorrhoea, syphilis, chancroid and genital herpes.", "Describe how HIV is spread, its effects on the body and how its spread can be controlled."]),
      sub("biology.health.drugs", "7.1.7.4", "Smoking, alcohol and drug misuse", "Form 3.",
        ["bio.gas-exchange.smoking", "bio.drugs.drug-abuse"],
        ["Describe the effects of tobacco smoking on health.", "Describe the effects of excessive alcohol consumption, of mandrax and cannabis, and of inhaling solvents."]),
    ]),
  ],
};

const CHEMISTRY = {
  key: "chemistry",
  code: "7.2",
  name: "Chemistry",
  kind: "SECTION",
  children: [
    topic("chemistry.separation", "7.2.1", "Separation", "Forms 1 to 4.", [
      sub("chemistry.separation.methods", "7.2.1.1", "Separating mixtures", "Forms 1 to 4.",
        ["chem.practical.separating-mixtures", "chem.practical.fractional-distillation", "chem.practical.chromatography"],
        ["State methods of separating mixtures: filtration, magnetism, winnowing, decanting and evaporation.", "State applications of these methods, such as treating water, separating grain and removing metal objects from grain before grinding.", "Describe distillation and fractional distillation.", "Describe paper chromatography and its applications."]),
    ]),
    topic("chemistry.matter", "7.2.2", "Matter", "Forms 1 to 4.", [
      sub("chemistry.matter.states", "7.2.2.1", "States of matter, elements, compounds and mixtures", "Form 1.",
        ["chem.matter.states-of-matter", "chem.matter.diffusion", "chem.matter.elements-compounds-mixtures", "chem.metals.metals-and-non-metals"],
        ["Identify the three states of matter and describe the arrangement of their particles.", "Describe the properties of solids, liquids and gases using the kinetic theory.", "Describe the factors that affect solubility.", "Identify elements, compounds and mixtures, and metals and non-metals on the Periodic Table."]),
      sub("chemistry.matter.concentration", "7.2.2.2", "Concentration of solutions", "Forms 2 and 3.",
        ["chem.stoichiometry.concentration"],
        ["Compare concentrations of coloured solutions by their colour intensity.", "Express concentration as the mass of solute in a given volume, in g/dm³ and mol/dm³."]),
      sub("chemistry.matter.atoms", "7.2.2.3", "Atomic structure and bonding", "Form 3.",
        ["chem.atoms.atomic-structure", "chem.atoms.isotopes", "chem.atoms.electronic-configuration", "chem.bonding.ionic", "chem.bonding.covalent"],
        ["Name the sub-atomic particles and state their relative charges, masses and positions.", "Define proton number and mass number, use nuclide notation, calculate numbers of neutrons and define isotopes.", "Name the first 20 elements with their symbols and write their electronic configurations.", "Describe ionic and covalent bonding."]),
      sub("chemistry.matter.mole", "7.2.2.4", "The mole", "Form 3.",
        ["chem.stoichiometry.relative-masses", "chem.stoichiometry.mole", "chem.stoichiometry.empirical-formulae"],
        ["Define the Avogadro number and relate the mole to relative atomic and molecular masses.", "Calculate relative molecular masses, empirical formulae and concentrations of solutions."]),
      sub("chemistry.matter.periodic-table", "7.2.2.5", "The Periodic Table and the reactivity of metals", "Form 4.",
        ["chem.periodic.periodic-table-and-trends", "chem.periodic.group-i", "chem.periodic.group-ii", "chem.periodic.group-vii", "chem.periodic.noble-gases", "chem.metals.reactivity-series"],
        ["Describe the physical and chemical properties of groups I, II, VII and VIII, and the uses of halogens.", "Describe and write equations for the reactions of metals with air, water, steam and dilute acids.", "List metals in order of reactivity and predict a metal's reactivity from its position in the series."]),
      sub("chemistry.matter.rates", "7.2.2.6", "Rates of reaction", "Form 4. Listed in the scope and sequence chart.",
        ["chem.kinetics.factors-and-collision-theory"],
        ["Describe the factors that affect the rate of a reaction."]),
    ]),
    topic("chemistry.acids", "7.2.3", "Acids, bases and salts", "Forms 1 to 4.", [
      sub("chemistry.acids.properties", "7.2.3.1", "Acids, bases, indicators and pH", "Forms 1 to 3.",
        ["chem.acids.acids-and-bases", "chem.acids.indicators-and-ph"],
        ["Identify acids and bases using litmus and list their properties.", "Identify acidity, neutrality and alkalinity on the pH scale using universal indicator."]),
      sub("chemistry.acids.reactions", "7.2.3.2", "Reactions of acids and titration", "Forms 2 to 4.",
        ["chem.acids.soluble-salts", "chem.practical.titration"],
        ["Describe acid-base reactions, including neutralisation.", "Describe the reactions of dilute acids with metals, bases and carbonates and write word and chemical equations for them.", "Carry out an acid-base titration and name the apparatus used."]),
    ]),
    topic("chemistry.industry", "7.2.4", "Industrial processes", "Forms 1 to 4.", [
      sub("chemistry.industry.peanuts", "7.2.4.1", "Peanut butter and cooking oil", "Form 1.",
        ["cs.industry.peanut-processing"],
        ["Outline the production of peanut butter: shelling, roasting, grinding and packaging, and the equipment used.", "Outline how oil is obtained by pressing peanut butter, and state uses of the oil."]),
      sub("chemistry.industry.soap", "7.2.4.2", "Making soap", "Form 2.",
        ["chem.organic.soaps"],
        ["Outline the manufacture of soap by saponification."]),
      sub("chemistry.industry.electrolysis", "7.2.4.3", "Gases from air and electrolysis", "Form 3.",
        ["chem.industry.air-separation", "chem.electrochemistry.electrolysis-principles", "chem.electrochemistry.electrolysis-of-solutions", "chem.electrochemistry.electroplating-and-refining"],
        ["Outline the production of nitrogen and oxygen from liquid air.", "Define electrolysis, label an electrolytic cell and describe the electrolysis of molten lead bromide.", "Describe the electrolysis of water and state the uses of hydrogen and oxygen.", "Describe copper electroplating and give reasons for electroplating."]),
      sub("chemistry.industry.haber-contact", "7.2.4.4", "The Haber and Contact processes", "Form 4.",
        ["chem.industry.haber-process", "chem.industry.contact-process", "chem.industry.fertilisers"],
        ["Describe the manufacture of ammonia, its raw materials, conditions and uses.", "Describe the manufacture of sulphuric acid, its raw materials, conditions and uses.", "Describe the production of ammonium nitrate."]),
    ]),
    topic("chemistry.redox", "7.2.5", "Oxidation and reduction", "Forms 1 to 4.", [
      sub("chemistry.redox.rusting", "7.2.5.1", "Rusting", "Form 1.",
        ["chem.metals.corrosion"],
        ["State the conditions necessary for rusting and explain methods of preventing it."]),
      sub("chemistry.redox.reactions", "7.2.5.2", "Chemical changes and redox reactions", "Forms 2 and 3.",
        ["chem.matter.physical-and-chemical-changes", "chem.stoichiometry.equations", "chem.redox.oxidation-and-reduction"],
        ["Distinguish between physical and chemical changes and write simple word equations.", "Define oxidation and reduction in terms of oxygen, electrons and hydrogen."]),
      sub("chemistry.redox.iron", "7.2.5.3", "Extracting iron and its alloys", "Forms 3 and 4.",
        ["chem.metals.extraction-and-iron", "chem.metals.alloys"],
        ["List the raw materials for extracting iron and their sources.", "Describe the reactions in the blast furnace and how iron and slag separate.", "State the composition, properties and uses of alloys of iron (mild steel, stainless steel and cast iron)."]),
    ]),
    topic("chemistry.organic", "7.2.6", "Organic chemistry", "Forms 1 to 4.", [
      sub("chemistry.organic.fuels", "7.2.6.1", "Fuels and combustion", "Forms 1 and 2.",
        ["chem.fuels.types-of-fuels", "chem.fuels.fuel-efficiency", "chem.environment.air-pollutants"],
        ["Identify solid, liquid and gaseous fuels and compare their efficiency.", "Define complete and incomplete combustion and list their products.", "Describe the effects of burning fuels."]),
      sub("chemistry.organic.hydrocarbons", "7.2.6.2", "Hydrocarbons", "Form 3.",
        ["chem.organic.homologous-series", "chem.organic.alkanes", "chem.organic.alkenes"],
        ["Define the term hydrocarbon.", "Name and draw the displayed structures of methane, ethane, propane, ethene and propene, and state their uses."]),
      sub("chemistry.organic.biogas", "7.2.6.3", "Biogas", "Form 3.",
        ["chem.fuels.coal-wood-and-biofuels"],
        ["Outline the production of biogas, the factors that affect it and its uses."]),
      sub("chemistry.organic.ethanol", "7.2.6.4", "Ethanol", "Form 4.",
        ["chem.organic.making-ethanol", "chem.organic.ethanol"],
        ["Describe the production of ethanol by fermentation and its concentration by fractional distillation.", "Draw the displayed formula of ethanol and list its uses."]),
      sub("chemistry.organic.global-warming", "7.2.6.5", "Global warming", "Form 4.",
        ["chem.environment.climate-change", "bio.human-impact.greenhouse-effect"],
        ["Define global warming and list its causes, including combustion, veld fires and deforestation."]),
    ]),
  ],
};

const PHYSICS = {
  key: "physics",
  code: "7.3",
  name: "Physics",
  kind: "SECTION",
  children: [
    topic("physics.data", "7.3.1", "Data presentation", "Forms 1 to 4.", [
      sub("physics.data.presentation", "7.3.1.1", "Presenting and interpreting data", "Forms 1 to 4.",
        ["math.statistics.data-collection-and-classification", "math.statistics.charts-and-diagrams", "math.statistics.interpreting-data", "math.coordinate.linear-graphs", "math.graphs.practical-situations", "phys.practical.experimental-skills"],
        ["Present and interpret data as tallies, tables and bar graphs.", "Construct and interpret straight-line graphs.", "Construct, interpret and analyse pie charts and line graphs."]),
    ]),
    topic("physics.measurement", "7.3.2", "Measurement", "Forms 1 to 4.", [
      sub("physics.measurement.quantities", "7.3.2.1", "Measuring physical quantities", "Forms 1 to 4.",
        ["phys.measurement.length-volume-time", "phys.measurement.si-units", "phys.thermal.thermometers"],
        ["Estimate and measure length, mass, time and temperature with suitable instruments, reading scales to the nearest division.", "Identify parallax and zero errors.", "Use SI units and prefixes, convert between units, and express derived units in terms of base units.", "Measure the volume and thickness of small and irregular objects, including with vernier callipers and a micrometer screw gauge."]),
      sub("physics.measurement.density", "7.3.2.2", "Density", "Forms 2 and 3.",
        ["phys.matter.density"],
        ["Calculate density and determine the density of solids and liquids experimentally."]),
    ]),
    topic("physics.force", "7.3.3", "Force", "Forms 1 to 4.", [
      sub("physics.force.effects", "7.3.3.1", "Forces and their effects", "Forms 1 and 2.",
        ["phys.forces.elasticity", "phys.forces.resultant-newton", "phys.forces.friction-drag"],
        ["Demonstrate the effects of forces on position, shape and size, and identify types of force.", "State the newton as the unit of force and measure forces with a spring balance or forcemeter.", "Calculate the resultant of forces in a line and distinguish balanced from unbalanced forces.", "Define friction, measure it and state its applications."]),
      sub("physics.force.moments", "7.3.3.2", "Moments", "Form 2.",
        ["phys.forces.moments"],
        ["Define and calculate the moment of a force.", "State the principle of moments and apply it in simple calculations."]),
      sub("physics.force.motion", "7.3.3.3", "Weight, mass, momentum and Newton's laws", "Form 3.",
        ["phys.forces.mass-weight", "phys.forces.momentum", "phys.motion.acceleration"],
        ["Define weight, momentum and inertia and distinguish weight from mass.", "State Newton's laws of motion and their applications.", "Calculate force from mass and acceleration using F = ma."]),
      sub("physics.force.machines", "7.3.3.4", "Machines", "Forms 2 and 3.",
        ["phys.machines.simple-machines", "phys.energy.efficiency", "cs.physics.gears"],
        ["Define a machine and construct a simple machine.", "Describe the uses of levers, pulley systems, inclined planes and gears.", "Determine the mechanical advantage, velocity ratio and efficiency of simple machines.", "Explain energy losses in machines and ways of improving efficiency."]),
      sub("physics.force.pressure", "7.3.3.5", "Pressure and fluid systems", "Form 4.",
        ["phys.forces.pressure", "phys.forces.atmospheric-pressure", "cs.physics.fluid-systems"],
        ["Define and calculate pressure, including pressure in fluids, and describe how it changes with depth.", "Describe atmospheric pressure, and build and use a simple manometer.", "Explain the action of a siphon and of hydraulic systems such as the car braking system and the hydraulic jack.", "Describe the structure and operation of a lift pump (the Blair pump) and a force pump (the bicycle pump)."]),
    ]),
    topic("physics.energy", "7.3.4", "Energy", "Forms 1 to 4.", [
      sub("physics.energy.forms", "7.3.4.1", "Forms of energy, conversion and work", "Forms 1 and 2.",
        ["phys.energy.stores-transfers", "phys.energy.ke-gpe", "phys.energy.work"],
        ["Describe the effects of energy and identify its forms and sources, including the forms of potential energy.", "Identify energy conversions and converters, and construct energy chains.", "State the law of conservation of energy.", "Define work and energy, state their unit and calculate work done."]),
      sub("physics.energy.light-sound", "7.3.4.2", "Light and sound", "Form 2.",
        ["phys.light.reflection", "phys.waves.sound"],
        ["List sources of light and show that light travels in straight lines.", "Describe how sound is produced and transmitted, and show that it needs a material medium."]),
      sub("physics.energy.engines", "7.3.4.3", "Petrol and diesel engines", "Form 3.",
        ["phys.engines.four-stroke"],
        ["Describe the operation of four-stroke petrol and diesel engines.", "Explain the roles of the carburettor and the fuel injector.", "Outline the advantages of modern petrol and diesel engines."]),
      sub("physics.energy.heat-transfer", "7.3.4.4", "Heat transfer", "Form 3.",
        ["phys.thermal.conduction", "phys.thermal.convection", "phys.thermal.radiation", "phys.thermal.transfer-applications"],
        ["Describe conduction, and good and bad conductors.", "Explain convection in liquids and gases using the kinetic theory.", "Identify good and bad reflectors, absorbers and emitters of heat."]),
      sub("physics.energy.solar", "7.3.4.5", "Solar cookers and solar water heaters", "Form 4.",
        ["cs.physics.solar-heating"],
        ["Describe the functions and designs of a solar cooker and a solar water heater."]),
      sub("physics.energy.telecommunication", "7.3.4.6", "Telecommunication", "Form 4 (competency matrix 8.12.5).",
        ["cs.physics.telecommunication"],
        ["Describe communication over a distance by cell phone and email.", "List types of media for transmitting signals and describe how signals pass through them.", "Describe the operation of cell phones and their transmitters and receivers."]),
    ]),
    topic("physics.magnetism", "7.3.5", "Magnetism", "Forms 1 to 4.", [
      sub("physics.magnetism.magnets", "7.3.5.1", "Magnets and magnetic fields", "Forms 1 and 2.",
        ["phys.magnetism.magnets", "phys.magnetism.uses-of-magnets"],
        ["Distinguish magnetic from non-magnetic materials and identify the poles of a magnet, using the Earth as a magnet.", "Describe the properties of magnets and state the law of magnetism.", "Draw magnetic field patterns."]),
      sub("physics.magnetism.electromagnetism", "7.3.5.2", "Electromagnetism, motors and generators", "Form 3.",
        ["phys.em.magnetic-effect", "phys.em.motor-effect", "phys.em.dc-motor", "phys.em.induction", "phys.em.generators"],
        ["Describe an experiment showing the magnetic field around a current-carrying conductor and a solenoid.", "Explain how movement is produced in a current-carrying wire in a magnetic field, and describe the d.c. motor and the factors that affect its rotation.", "Describe an experiment showing that a changing magnetic field induces an e.m.f., and state the factors that affect its size.", "Describe the operation of a.c. and d.c. generators."]),
      sub("physics.magnetism.power-generation", "7.3.5.3", "Hydro and thermal power generation", "Form 4.",
        ["phys.energy.resources"],
        ["Describe hydro and thermal power generation and the energy conversions involved."]),
    ]),
    topic("physics.electricity", "7.3.6", "Electricity", "Forms 1 to 4.", [
      sub("physics.electricity.static", "7.3.6.1", "Static electricity and lightning", "Forms 1 and 3.",
        ["phys.electricity.electrostatics"],
        ["State the two types of charge and describe how charges are produced.", "Describe experiments that show electrostatic charging using an electroscope, and the forces between charges.", "Describe how lightning is produced, its dangers and precautions against it, and explain the lightning conductor."]),
      sub("physics.electricity.current", "7.3.6.2", "Current, voltage and circuits", "Forms 1 to 3.",
        ["phys.electricity.current", "phys.electricity.emf-pd", "phys.electricity.circuit-diagrams", "phys.electricity.series-parallel", "phys.electricity.cells"],
        ["Define current and voltage, state their units, and measure them.", "Distinguish between conductors and insulators.", "Draw, label and interpret circuit diagrams using standard symbols, and construct simple circuits.", "Calculate the total resistance of resistors in series and in parallel."]),
      sub("physics.electricity.resistance", "7.3.6.3", "Ohm's law and resistance", "Form 3.",
        ["phys.electricity.resistance"],
        ["State Ohm's law and its limitations, and use V = IR.", "Describe an experiment to determine resistance and state the factors that affect it."]),
      sub("physics.electricity.power", "7.3.6.4", "Electrical power, energy and the home", "Forms 2 to 4.",
        ["phys.electricity.energy-power"],
        ["Define and calculate electrical power and energy (P = VI, E = VIt), including in kilowatt-hours.", "State uses of electricity in the home, calculate the cost of electricity from meter readings and describe ways of saving electricity.", "Explain the use of solar photovoltaic systems."]),
      sub("physics.electricity.safety", "7.3.6.5", "Electrical hazards and safety", "Form 4.",
        ["phys.electricity.mains-safety"],
        ["Describe electrical hazards and safety precautions.", "Describe the wiring of a three-pin plug, and explain the use of a two-pin plug and double insulation."]),
    ]),
  ],
};

const registry = {
  family: "combined-science-o",
  name: "Combined Science (O-Level)",
  level: "O",
  prefix: "cs",
  subjects: ["zimsec/o-level/combined-science"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const syllabus = {
  board: "zimsec",
  qualification: "o-level",
  subject: "combined-science",
  versionLabel: "2015-2022",
  family: "combined-science-o",
  conceptFamilies: ["biology-o", "chemistry-o", "physics-o", "mathematics-o"],
  title: "ZIMSEC O-Level Combined Science",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Combined Science Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development Unit), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Combined%20Science.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development Unit) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic headings and numbers are transcribed from the Ministry's Combined Science Syllabus Forms 1 - 4 (2015 - 2022): sections and topics from '6.0 Topics' and the '7.0 Scope and sequence' chart (7.1 Biology, 7.2 Chemistry, 7.3 Physics), subtopics from the '8.0 Competency matrix' (which repeats each topic in every Form), each with its Form. Learning-objective statements are our own paraphrase of the competency matrix; subtopic codes and objective codes are ours, not the board's.",
  notes: [
    "Source (checked 2026-10-08): the whole Ministry document was read from the Mashonaland West provincial education office's copy (http://www.mopsemashwest.gov.zw/files/Combined%20Science.pdf, dated 2016; the site's https certificate has expired), including the competency matrix for Forms 1 to 4 and section 9.0 Assessment. The text rendering of tables can drop words, so absence of an item is less certain than its presence. Check every heading and objective against a clean copy from ZIMSEC and replace the officialDocument URL if a better official copy is found.",
    "Content is borrowed from the biology-o, chemistry-o, physics-o and mathematics-o families (conceptFamilies), which were written for the pure-science O-Level and IGCSE syllabi: they cover the Combined Science statements, often in more depth than Combined Science requires. Only six topics have content written for Combined Science itself (cs.* concepts).",
    "Assessment (section 9.0): 35% continuous assessment (practical tests, written tests and end-of-term tests in Forms 1 to 4) and 65% summative examination. The examination has Paper 1 (multiple choice, 1 hour, 40 marks), Paper 2 (theory, 2 hours, 100 marks: Section A six compulsory structured questions worth 40 marks; Sections B, C and D are Biology, Chemistry and Physics, each with three free-response questions of which candidates answer two, 20 marks per section) and Paper 3 (practical, 1 hour 30 minutes, 40 marks: two compulsory 20-mark questions from any two sections). The document weights the papers 30%, 40% and 30%, which are shares of the 65% summative part, so the components carry no weightingPercent. The subject code is not printed in the document (ZIMSEC's Combined Science is commonly cited as 4003).",
    "The specification grid lists the examined topics as Cells and levels of organisation, Nutrition, Respiratory system, Transport systems, Reproductive systems and Health and diseases (Biology); Matter, Acids, bases and salts, Industrial processes, Oxidation and reduction and Organic chemistry (Chemistry); and Measurements, Force, Energy, Magnetism and Electricity (Physics). Laboratory safety, separation and data presentation are taught but not listed in the grid.",
    "Inheritance (7.1.6, Form 4) and rates of reaction (7.2.2, Form 4) appear in the scope and sequence chart but have no objectives in the competency matrix; they are included with one general objective each.",
  ],
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice items on the whole syllabus.", durationMinutes: 60, maxMarks: 40, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Theory", kind: "WRITTEN", description: "Section A: six compulsory structured questions (40 marks). Sections B (Biology), C (Chemistry) and D (Physics): three free-response questions each, answer any two (20 marks per section).", durationMinutes: 120, maxMarks: 100, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Practical", kind: "PRACTICAL", description: "Two compulsory practical questions of 20 marks each from any two sections of the syllabus.", durationMinutes: 90, maxMarks: 40, calculatorAllowed: true },
  ],
  topics: [BIOLOGY, CHEMISTRY, PHYSICS],
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/combined-science-o.json", registry);
write("content/syllabi/zimsec/o-level/combined-science/2015-2022.json", syllabus);
