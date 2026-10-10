// W4a: the kingdoms and their diagnostic features; major plant groups and animal phyla (phyla and identification:
// ZIMSEC detail).
import { concept, P, table, ZIM } from "../lib.mjs";

concept("abio.biodiversity.kingdoms", { file: "biodiversity/kingdoms", keyPrefix: "biodiversity.kingdoms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature is diagnostic of the kingdom Fungi?",
    options: [
      ["Cell walls made of chitin", "Correct."],
      ["Cell walls made of cellulose", "Cellulose walls are found in plants."],
      ["Chloroplasts containing chlorophyll", "Fungi do not photosynthesise."],
      ["No cell walls at all", "This is a feature of animals."],
    ],
    answer: "A",
    explanation: "Fungi have chitin cell walls, hyphae and absorptive heterotrophic nutrition.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which carbohydrate is stored by both fungi and animals?",
    options: [["Glycogen", "Correct."], ["Starch", "Starch is stored by plants."], ["Cellulose", "Cellulose is a structural polysaccharide, not a store."], ["Chitin", "Chitin is structural, in fungal walls and arthropod exoskeletons."]],
    answer: "A",
    explanation: "Fungi and animals both store glycogen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "*Plasmodium*, the malaria parasite, is placed in the kingdom Protoctista. Which feature places it there rather than in Prokaryotae?",
    options: [
      ["It has a nucleus and other membrane-bound organelles", "Correct: it is eukaryotic."],
      ["It is a parasite that causes disease", "Many prokaryotes are also parasites."],
      ["It is a single-celled organism", "Most prokaryotes are also unicellular."],
      ["It has ribosomes that it uses for synthesising its own proteins", "All cells have ribosomes."],
    ],
    answer: "A",
    explanation: "Protoctists are eukaryotic; prokaryotes have no nucleus.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "A plant has true roots and leaves with vascular tissue but produces spores instead of seeds. To which group does it belong?",
    options: [["Ferns", "Correct."], ["Mosses", "Mosses have no true roots or lignified vascular tissue."], ["Conifers", "Conifers produce seeds in cones."], ["Flowering plants", "Flowering plants produce seeds in fruits."]],
    answer: "A",
    explanation: "Ferns have vascular tissue and true roots but reproduce by spores.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "An animal has a soft, unsegmented body, a muscular foot and a mantle, but no shell. To which phylum does it belong?",
    options: [["Molluscs", "Correct: a slug, a mollusc without an external shell."], ["Annelids", "Annelids are segmented with bristles."], ["Flatworms", "Flatworms have no foot or mantle."], ["Arthropods", "Arthropods have jointed legs and an exoskeleton."]],
    answer: "A",
    explanation: "Foot and mantle are diagnostic of molluscs, even when the shell is absent, as in slugs.",
    hints: ["Which phylum has a muscular foot?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "*Schistosoma*, which causes bilharzia, is a flat, unsegmented worm with a gut that has a single opening. In which phylum is it classified?",
    options: [["Flatworms (Platyhelminthes)", "Correct."], ["Annelids", "Annelids are segmented."], ["Protoctista (single-celled eukaryotes)", "Protoctista is a kingdom of mostly single-celled eukaryotes; *Schistosoma* is a multicellular animal."], ["Cnidarians", "Cnidarians have radial symmetry and tentacles."]],
    answer: "A",
    explanation: "*Schistosoma* is a parasitic flatworm (a blood fluke) in the kingdom Animalia.",
    hints: ["Is it multicellular? Is it segmented?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does the five-kingdom scheme relate to the three-domain system?",
    options: [
      ["Prokaryotae is split between Bacteria and Archaea; the other four kingdoms are in Eukarya", "Correct."],
      ["Each domain contains exactly one of the five kingdoms", "Eukarya contains four kingdoms."],
      ["Archaea contains the Protoctista and Fungi", "These are eukaryotes."],
      ["The three domains have replaced the five kingdoms, which are no longer used by biologists", "Kingdoms are still used below the domains."],
    ],
    answer: "A",
    explanation: "Bacteria and Archaea between them contain the prokaryotes; Eukarya holds Protoctista, Fungi, Plantae and Animalia.",
    hints: ["Which kingdom contains prokaryotes?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An organism is multicellular and photosynthetic and lives in the sea. It has no roots, stems, leaves or vascular tissue, and its zygote does not develop into an embryo protected by the parent. Which kingdom is the best fit?",
    options: [
      ["Protoctista (a seaweed)", "Correct: algae such as seaweeds are photosynthetic protoctists."],
      ["Plantae, because it photosynthesises", "Photosynthesis alone does not make it a plant; plants develop from embryos protected by the parent."],
      ["Fungi, because it has cell walls", "Fungi have no chloroplasts."],
      ["Prokaryotae, because it lives in water", "It is multicellular with chloroplasts, so it is eukaryotic."],
    ],
    answer: "A",
    explanation: "Seaweeds are photosynthetic eukaryotes that do not fit Plantae; the five-kingdom scheme places them in Protoctista.",
    hints: ["Which kingdom holds eukaryotes that fit no other kingdom?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Spiders are insects because they have jointed legs and an exoskeleton.",
    answer: false,
    explanation: "False. Jointed legs and an exoskeleton make spiders arthropods; they are arachnids (eight legs, two body parts), not insects.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Maize is a monocotyledon, so its leaves have parallel veins.",
    answer: true,
    explanation: "True. Monocots such as maize have one seed leaf, parallel veins and scattered vascular bundles.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each kingdom with one of its diagnostic features.",
    pairs: [
      ["Prokaryotae", "No nucleus; 70S ribosomes; peptidoglycan wall"],
      ["Fungi", "Hyphae; chitin walls; absorptive nutrition"],
      ["Plantae", "Cellulose walls; chloroplasts; starch store"],
      ["Animalia", "Multicellular; no cell walls; ingestive heterotrophs"],
      ["Protoctista", "Eukaryotes, mostly unicellular, that fit no other kingdom"],
    ],
    explanation: "Each kingdom has a combination of cell type, wall, nutrition and storage features.",
  });
  b.match({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Match each animal with its phylum.",
    pairs: [
      ["Earthworm", "Annelids"],
      ["Freshwater crab", "Arthropods"],
      ["*Hydra*", "Cnidarians"],
      ["Tapeworm", "Flatworms"],
      ["Tilapia", "Chordates"],
    ],
    explanation: "Segments and bristles: annelid; jointed legs: arthropod; tentacles, radial symmetry: cnidarian; flat, unsegmented: flatworm; backbone: chordate.",
    hints: ["Think of the one key feature of each phylum."],
  });
  b.fib({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Choose the correct words.",
    template: "Conifers carry their seeds on {{blank:a}}, whereas flowering plants enclose their seeds in a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cones"], choices: ["cones", "fronds", "capsules"] },
      { id: "b", accepted: ["fruit"], choices: ["fruit", "spore", "rhizoid"] },
    ],
    explanation: "Conifers: naked seeds on cone scales. Flowering plants: seeds in an ovary that becomes a fruit.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the thread-like structures that make up the body of a mould fungus.",
    accepted: ["hyphae", "hypha", "mycelium", "a mycelium of hyphae"],
    wrong: ["rhizoids"],
    explanation: "Hyphae (together forming a mycelium).",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare the diagnostic features of the kingdoms Fungi and Plantae.",
    points: [
      "Fungi have chitin cell walls whereas plants have cellulose cell walls",
      "Fungi are heterotrophic (absorb digested food) whereas plants are autotrophic (photosynthesis, chloroplasts)",
      "Fungi store glycogen whereas plants store starch",
      "Fungi are made of hyphae / reproduce by spores; plants have tissues and organs (roots, stems, leaves in most); both are eukaryotic",
    ],
    modelAnswer: "Both kingdoms are eukaryotic and have cell walls, but fungal walls are made of chitin and plant walls of cellulose. Fungi are heterotrophs that digest food outside their hyphae and absorb it, whereas plants are autotrophs that photosynthesise using chloroplasts. Fungi store glycogen; plants store starch. Fungi are built of hyphae and reproduce by spores, whereas most plants have roots, stems and leaves.",
    explanation: "Matched points: wall, nutrition, storage, body form.",
    hints: ["Use 'whereas' to pair each point."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Describe the features you would use to show that a dragonfly is an insect.",
    points: [
      "Jointed legs and a chitin exoskeleton: arthropod",
      "Body in three parts (head, thorax, abdomen) with three pairs of legs on the thorax",
      "One pair of antennae and (usually) two pairs of wings",
    ],
    modelAnswer: "Its jointed legs and hard chitin exoskeleton show that it is an arthropod. Its body is divided into head, thorax and abdomen, with three pairs of legs on the thorax, and it has one pair of antennae and two pairs of wings, which are the features of insects.",
    explanation: "Arthropod features, then insect features.",
    hints: ["First the phylum, then the class."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why some biologists think the kingdom Protoctista should be divided into several kingdoms.",
    points: [
      "Protoctista contains eukaryotes that do not fit the other kingdoms: a group of convenience",
      "Its members are very diverse (photosynthetic algae, animal-like protozoa, fungus-like forms)",
      "Molecular (DNA/rRNA) evidence shows they are not all closely related / do not share one recent common ancestor, so the group does not reflect evolutionary relationships",
    ],
    modelAnswer: "Protoctista is defined by what its members are not: eukaryotes that do not fit the fungi, plants or animals. Its members are very diverse, from seaweeds to *Amoeba* and *Plasmodium*, and DNA evidence shows that they are not all closely related, so the kingdom does not reflect evolutionary relationships. Splitting it would group organisms by common ancestry.",
    explanation: "A classification should reflect common ancestry.",
    hints: ["Is Protoctista defined by shared features or by exclusion?"],
  });

  // Practice structured 1: identifying organisms (ZIMSEC detail)
  const orgs = [
    ["P", "Body of many identical segments with bristles; no legs; moist skin"],
    ["Q", "Tentacles around a single opening; radial symmetry; lives attached to pond weeds"],
    ["R", "Four pairs of jointed legs; body in two parts; no antennae"],
    ["S", "Seeds in a woody cone; needle-shaped leaves"],
    ["T", "Small plant with rhizoids instead of roots; spores in a capsule on a stalk"],
    ["U", "Backbone; scales; fins; gills"],
  ];
  b.struct({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: `Thandeka described six organisms she found near a dam in Masvingo province.\n\n${table(["Organism", "Features"], orgs)}`,
    parts: [
      P.group({ label: "(a)", stem: "Name the group (phylum, class or plant group) of each organism.", parts: [
        P.short({ label: "(i)", stem: "P.", accepted: ["annelid", "annelids", "Annelida", "annelid worm"], wrong: ["flatworm"], explanation: "Segments and bristles: annelid." }),
        P.short({ label: "(ii)", stem: "Q.", accepted: ["cnidarian", "cnidarians", "Cnidaria"], wrong: ["mollusc"], explanation: "Tentacles, radial symmetry: cnidarian (*Hydra*)." }),
        P.short({ label: "(iii)", stem: "R.", accepted: ["arachnid", "arachnids", "Arachnida"], wrong: ["insect"], explanation: "Eight legs, two body parts: arachnid." }),
        P.short({ label: "(iv)", stem: "S.", accepted: ["conifer", "conifers", "coniferophyta", "gymnosperm", "gymnosperms"], wrong: ["fern"], explanation: "Cones and needles: conifer." }),
        P.short({ label: "(v)", stem: "T.", accepted: ["moss", "mosses", "bryophyte", "bryophytes"], wrong: ["fern"], explanation: "Rhizoids, spore capsule: moss." }),
        P.short({ label: "(vi)", stem: "U.", accepted: ["fish", "bony fish", "chordate", "chordates", "Chordata", "vertebrate"], wrong: ["amphibian"], explanation: "Backbone, scales, fins and gills: a fish (chordate)." }),
      ] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why R is not an insect although it has jointed legs.", points: ["Jointed legs and exoskeleton make it an arthropod, but", "Insects have six legs, three body parts and antennae; R has eight legs, two body parts, no antennae"], modelAnswer: "Jointed legs show only that R is an arthropod. Insects have three pairs of legs, three body parts and antennae, whereas R has four pairs of legs, two body parts and no antennae, so it is an arachnid." }),
    ],
    explanation: "Identify each organism from its diagnostic features.",
    hints: ["Count legs and body parts for the arthropods."],
  });

  // Practice structured 2: comparing kingdoms
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A student examined four organisms. W: a single cell with no nucleus and a peptidoglycan wall. X: branching threads growing over bread, with chitin walls. Y: a single cell with a nucleus, a contractile vacuole and no wall, which engulfs bacteria. Z: a green multicellular organism with cellulose walls and roots.",
    parts: [
      P.group({ label: "(a)", stem: "Name the kingdom (five-kingdom scheme) of each organism.", parts: [
        P.short({ label: "(i)", stem: "W.", accepted: ["Prokaryotae", "prokaryotes", "prokaryote", "Monera", "bacteria"], wrong: ["Protoctista"], explanation: "No nucleus: Prokaryotae." }),
        P.short({ label: "(ii)", stem: "X.", accepted: ["Fungi", "fungus", "fungi"], wrong: ["Plantae"], explanation: "Hyphae, chitin: Fungi." }),
        P.short({ label: "(iii)", stem: "Y.", accepted: ["Protoctista", "protoctist", "protoctists", "Protista", "protist"], wrong: ["Animalia"], explanation: "Single eukaryotic cell: Protoctista." }),
        P.short({ label: "(iv)", stem: "Z.", accepted: ["Plantae", "plant", "plants"], wrong: ["Fungi"], explanation: "Cellulose walls, green, roots: Plantae." }),
      ] }),
      P.manual({ label: "(b)", marks: 2, stem: "Y feeds by engulfing bacteria, like an animal. Explain why it is not placed in Animalia.", points: ["Animals are multicellular", "Y is a single cell, so it is a protoctist (animal-like protozoan)"], modelAnswer: "Animalia contains only multicellular organisms, and Y is a single cell, so although it feeds like an animal it is placed in Protoctista." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how X obtains its nutrients.", points: ["Hyphae secrete enzymes onto the bread: extracellular digestion", "Soluble products (e.g. glucose, amino acids) are absorbed across the hyphal walls/membranes: saprotrophic nutrition"], modelAnswer: "The hyphae secrete enzymes onto the bread, digesting starch and protein outside the cells, and then absorb the soluble products such as glucose and amino acids. This is saprotrophic nutrition." }),
    ],
    explanation: "Cell type, wall, nutrition and body form decide the kingdom.",
    hints: ["Does it have a nucleus? What is its wall made of?"],
  });

  b.card("CONCEPT", "Diagnostic features of Fungi", "Hyphae (mycelium) or yeast cells; chitin walls; absorptive heterotrophs; glycogen; spores.");
  b.card("CONCEPT", "Diagnostic features of Plantae", "Multicellular; cellulose walls; chloroplasts; photosynthesis; starch store.");
  b.card("CONCEPT", "Diagnostic features of Animalia", "Multicellular; no cell walls; heterotrophic (usually ingest food); glycogen; nervous coordination.");
  b.card("CONCEPT", "Prokaryotae", "No nucleus; circular DNA; 70S ribosomes; peptidoglycan walls.");
  b.card("DEFINITION", "Protoctista", "Eukaryotes, mostly unicellular, that do not fit the fungi, plant or animal kingdoms.");
  b.card("FACT", "Features of arthropods", "Jointed legs, chitin exoskeleton, segmented body.", undefined, { applies: ZIM });
  b.card("FACT", "Insects versus arachnids", "Insects: 3 body parts, 6 legs, antennae, usually wings. Arachnids: 2 body parts, 8 legs, no antennae.", undefined, { applies: ZIM });
  b.card("FACT", "Mosses, ferns, conifers, flowering plants", "Mosses: rhizoids, spores, no vascular tissue. Ferns: vascular, spores. Conifers: seeds in cones. Flowering plants: seeds in fruits.", undefined, { applies: ZIM });
});
