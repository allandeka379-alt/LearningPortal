// W4a: ZIMSEC Paper 3 essays (ZIM_P3_ESSAY: (a) 8 describe/outline + (b) 12 explain/discuss), self-marked.
import { concept, P, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const essay = (b, { concepts, d = 5, stem, a, bb, hints }) =>
  b.struct({
    d, examStyle: true, skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, paper: "ZIMSEC Paper 3",
    concepts, stem,
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, ...a }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 }, ...bb }),
    ]),
    explanation: "Mark each part against the points: one mark for each point clearly made, up to the marks for the part.",
    hints,
  });

concept(A("evolution.natural-selection"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: variation and natural selection
  essay(b, {
    concepts: [A("evolution.variation"), A("evolution.natural-selection")],
    stem: "Answer both parts.",
    hints: ["In (a) give matched differences with examples, then the sources of genetic variation.", "In (b) follow each example from mutation to change in allele frequency, then describe the three types of selection."],
    a: {
      stem: "Describe the differences between continuous and discontinuous variation, and outline how genetic variation arises in a population.",
      points: [
        "Discontinuous: distinct categories with no intermediates; continuous: a complete range of values between extremes",
        "Discontinuous: one or a few genes, alleles with large effects; continuous: many genes (polygenes) with small additive effects",
        "Discontinuous: little or no environmental effect; continuous: strongly affected by environment",
        "Discontinuous shown as a bar chart (qualitative, counted); continuous as a histogram, often a normal distribution (quantitative, measured)",
        "Examples: ABO blood groups / sickle cell (discontinuous); height, mass, leaf length, milk yield (continuous)",
        "Mutation produces new alleles",
        "Meiosis: independent assortment of homologous chromosomes and crossing over between non-sister chromatids",
        "Random fertilisation / random mating combines alleles from two parents",
      ],
      modelAnswer: "In discontinuous variation, individuals fall into a few distinct categories with no intermediates, whereas continuous variation shows a complete range of values between two extremes. Discontinuous variation is controlled by one or a few genes whose alleles have large effects, while continuous variation is controlled by many genes, polygenes, each allele adding a small, additive effect. The environment has little or no effect on discontinuous characteristics but strongly affects continuous ones. Discontinuous data are counted and shown in a bar chart; continuous data are measured and shown in a histogram, often as a normal distribution. ABO blood groups are discontinuous; height, mass and milk yield are continuous.\n\nGenetic variation arises from mutation, which creates new alleles; from meiosis, in which homologous chromosomes assort independently and crossing over between non-sister chromatids recombines alleles; and from random fertilisation, in which any male gamete can fuse with any female gamete.",
    },
    bb: {
      stem: "Explain how natural selection leads to antibiotic resistance in bacteria and maintains the sickle cell allele in areas where malaria is common, and discuss the three types of natural selection.",
      points: [
        "Populations overproduce; competition / struggle for existence; individuals vary genetically",
        "A random mutation produces an allele for antibiotic resistance (e.g. an enzyme that breaks down the antibiotic)",
        "The antibiotic is a selection pressure: susceptible bacteria die, resistant ones survive and reproduce by binary fission",
        "The allele is passed on vertically and horizontally on plasmids by conjugation, so its frequency rises over generations",
        "$Hb^S Hb^S$ causes sickle cell anaemia, reducing survival, so there is selection against $Hb^S$",
        "Heterozygotes are partly protected against severe malaria and have mild or no symptoms",
        "In malarial regions heterozygotes leave more offspring than $Hb^A Hb^A$ (heterozygote advantage), so $Hb^S$ is maintained",
        "Where there is no malaria the allele has no advantage and is rare",
        "Stabilising selection favours the mean phenotype; extremes are selected against; the range narrows, e.g. human birth mass",
        "Directional selection favours one extreme, often after environmental change, so the mean shifts, e.g. resistance",
        "Disruptive selection favours both extremes over intermediates and may split a population / lead to speciation",
        "Selection acts on phenotypes but changes allele frequencies in the population over many generations",
      ],
      modelAnswer: "Organisms produce more offspring than can survive, so there is competition, and individuals vary genetically. In a bacterial population a random mutation may produce an allele that gives resistance to an antibiotic, for example by coding for an enzyme that breaks it down. When the antibiotic is used it acts as a selection pressure: susceptible bacteria are killed, while resistant ones survive and divide by binary fission, passing the allele to their offspring. Resistance genes on plasmids can also pass to other bacteria by conjugation. Over many generations the frequency of the resistance allele rises.\n\nPeople with the genotype $Hb^S Hb^S$ have sickle cell anaemia, which reduces survival, so there is selection against the allele. However, heterozygotes, $Hb^A Hb^S$, are partly protected against severe malaria and usually have few symptoms. In areas where falciparum malaria is common, they survive and reproduce more than people with normal haemoglobin, so the $Hb^S$ allele is passed on and maintained at a relatively high frequency. Where there is no malaria, heterozygotes have no advantage and the allele is rare.\n\nStabilising selection favours phenotypes near the mean and acts against the extremes, so the mean stays the same and the range narrows, as with human birth mass. Directional selection favours one extreme, often after the environment changes, so the mean shifts, as with antibiotic resistance. Disruptive selection favours both extremes over intermediates and may split a population into two, sometimes leading to speciation. In each case selection acts on phenotypes but changes the allele frequencies of the population over many generations.",
    },
  });

  // ---------------------------------------------------------------- E2: kingdoms and their economic importance
  essay(b, {
    concepts: [A("biodiversity.kingdoms"), A("biodiversity.economic-importance")],
    stem: "Answer both parts.",
    hints: ["In (a) give at least one diagnostic feature for each kingdom, covering cell type, wall, nutrition and storage.", "In (b) name organisms and say what they do for or against people, with Zimbabwean examples."],
    a: {
      stem: "Describe the diagnostic features of the five kingdoms of living organisms.",
      points: [
        "Prokaryotae: no nucleus or membrane-bound organelles; circular DNA (plasmids)",
        "Prokaryotae: 70S ribosomes; cell wall of peptidoglycan",
        "Protoctista: eukaryotic; mostly unicellular or simple; organisms that do not fit other kingdoms",
        "Fungi: eukaryotic; body of hyphae / mycelium (or yeast cells); cell walls of chitin",
        "Fungi: heterotrophic, extracellular digestion and absorption (saprotrophic or parasitic); store glycogen; spores",
        "Plantae: multicellular; cellulose cell walls; chloroplasts / photosynthesis (autotrophic)",
        "Plantae: store starch; Animalia: multicellular, no cell walls",
        "Animalia: heterotrophic, usually ingest food; store glycogen; nervous coordination",
      ],
      modelAnswer: "Members of the Prokaryotae have no nucleus or membrane-bound organelles; their DNA is a circular chromosome, often with plasmids, their ribosomes are 70S and their cell walls contain peptidoglycan. The other four kingdoms are eukaryotic. Protoctista contains mostly unicellular or simple organisms that do not fit the other kingdoms, such as *Amoeba* and *Plasmodium*. Fungi are made of thread-like hyphae forming a mycelium, or single cells in yeasts; their walls are made of chitin; they are heterotrophs that digest food outside their bodies and absorb it, store glycogen and reproduce by spores. Plants are multicellular, with cellulose cell walls and chloroplasts, are autotrophic by photosynthesis and store starch. Animals are multicellular with no cell walls, are heterotrophic, usually ingesting their food, store glycogen and have nervous coordination.",
    },
    bb: {
      stem: "Discuss the socio-economic importance of bacteria, protoctists and fungi in Zimbabwe.",
      points: [
        "Bacteria: lactic acid bacteria ferment milk to sour milk (amasi) / yoghurt",
        "Bacteria: *Rhizobium* fixes nitrogen in legumes (groundnuts, soya), reducing fertiliser costs",
        "Bacteria: decomposition and sewage treatment recycle nutrients / GM bacteria make insulin",
        "Bacteria harmful: cholera (*Vibrio cholerae*) from contaminated water, TB, anthrax; food spoilage",
        "Protoctists: *Plasmodium* causes malaria (vector *Anopheles*): lost work and school days, treatment costs",
        "Protoctists: *Trypanosoma* (vector tsetse) causes sleeping sickness and nagana in cattle, limiting livestock farming in the Zambezi valley",
        "Protoctists: algae are producers of aquatic food chains supporting fisheries such as kapenta on Lake Kariba",
        "Protoctists harmful: algal blooms in polluted lakes (e.g. Lake Chivero) deplete oxygen, kill fish and raise water treatment costs",
        "Fungi: yeast ferments sugar for baking (CO₂) and brewing (ethanol), e.g. sorghum beer",
        "Fungi: *Penicillium* gives penicillin / decomposers recycle nutrients / edible mushrooms for food and income",
        "Fungi harmful: food spoilage; *Aspergillus* produces aflatoxins in damp stored groundnuts and maize",
        "Fungi harmful: crop diseases such as rusts reduce yields; note that *Schistosoma* (bilharzia) is a flatworm (Animalia), not a protoctist",
      ],
      modelAnswer: "Bacteria are both useful and harmful. Lactic acid bacteria ferment milk to sour milk (*amasi*) and yoghurt. *Rhizobium* in the root nodules of groundnuts and soya beans fixes nitrogen, so farmers need less expensive fertiliser. Decomposing bacteria recycle nutrients and treat sewage, and genetically modified bacteria make insulin. On the other hand, *Vibrio cholerae* causes cholera when water is contaminated, *Mycobacterium tuberculosis* causes TB, anthrax affects livestock, and bacteria spoil food.\n\nAmong the protoctists, *Plasmodium* causes malaria, carried by *Anopheles* mosquitoes; in the lowveld it costs working and school days and money for treatment and prevention. *Trypanosoma*, carried by tsetse flies, causes sleeping sickness in people and nagana in cattle, which limits cattle farming in parts of the Zambezi valley. Algae, however, are the producers of aquatic food chains, which support fisheries such as kapenta on Lake Kariba. When lakes such as Lake Chivero are polluted with sewage and fertiliser, algal blooms die and decompose, using up oxygen, killing fish and raising the cost of treating drinking water.\n\nFungi include yeast, which ferments sugar to produce carbon dioxide for baking and ethanol for brewing, including sorghum beer. *Penicillium* produces penicillin, fungi decompose dead plant matter, and edible mushrooms provide food and income. Moulds also spoil food, and *Aspergillus* on damp stored groundnuts and maize can produce aflatoxins that damage the liver. Rusts and other fungal diseases reduce crop yields. *Schistosoma*, which causes bilharzia, is sometimes listed with the protoctists but is a parasitic flatworm in the kingdom Animalia.",
    },
  });

  // ---------------------------------------------------------------- E3: artificial selection and speciation
  essay(b, {
    concepts: [A("evolution.artificial-selection"), A("evolution.speciation")],
    stem: "Answer both parts.",
    hints: ["In (a) give the steps for maize, then for dairy cattle.", "In (b) explain both kinds of speciation and give named isolating mechanisms."],
    a: {
      stem: "Outline how hybrid maize is produced and how selective breeding has improved milk yield in dairy cattle.",
      points: [
        "Maize: selected plants are self-pollinated (bagged) for several generations to give homozygous inbred lines",
        "Inbred lines show inbreeding depression (harmful recessives expressed)",
        "Two different inbred lines are crossed (tassels removed from one line / detasselling)",
        "F1 hybrid is heterozygous at many loci: hybrid vigour; uniform because parents are homozygous; seed bought each season",
        "Cattle: milk yields of cows recorded",
        "Progeny testing: bulls judged by the milk yield of their daughters",
        "Semen of the best bulls used by artificial insemination on many cows",
        "Highest-yielding daughters selected for breeding; repeated over many generations, raising the frequency of alleles for high yield",
      ],
      modelAnswer: "To produce hybrid maize, breeders self-pollinate selected plants, covering tassels and silks with bags, for several generations. This produces homozygous inbred lines, which are uniform but weak because harmful recessive alleles are expressed. Two different inbred lines are then crossed, with the tassels removed from one so that it is pollinated only by the other. The F1 hybrid seed is heterozygous at many loci and shows hybrid vigour, and because both parents were homozygous all the plants are genetically the same and uniform. Farmers must buy new hybrid seed each season.\n\nIn dairy cattle, the milk yield of every cow is recorded. Because bulls give no milk, young bulls are progeny-tested: they are mated with many cows and the yields of their daughters are measured. Semen from the bulls with the highest-yielding daughters is used to inseminate many cows by artificial insemination, and the best daughters are kept for breeding. Repeating this over many generations raises the frequency of alleles for high milk yield.",
    },
    bb: {
      stem: "Explain how new species can arise by allopatric and sympatric speciation, and describe the mechanisms that keep species reproductively isolated.",
      points: [
        "A species: organisms that interbreed to produce fertile offspring; speciation requires reproductive isolation / no gene flow",
        "Allopatric: a geographical barrier (mountain, river, sea) separates populations",
        "Different mutations arise in each population",
        "Different selection pressures favour different alleles by natural selection / genetic drift in small populations",
        "Over many generations the gene pools diverge until they cannot interbreed to give fertile offspring even if they meet",
        "Sympatric: in the same area, by ecological separation (different habitats or food) or behavioural separation (courtship, mate choice), reducing gene flow",
        "Sympatric by polyploidy: chromosome number doubles (e.g. after hybridisation), so the polyploid cannot form fertile offspring with the parent species",
        "Prezygotic: ecological / habitat isolation",
        "Prezygotic: temporal isolation (different breeding seasons or flowering times)",
        "Prezygotic: behavioural (courtship, song) or mechanical (incompatible reproductive organs) or gametic isolation",
        "Postzygotic: hybrid inviability (hybrid dies) or hybrid breakdown",
        "Postzygotic: hybrid sterility, e.g. mule, because chromosomes cannot pair in meiosis",
      ],
      modelAnswer: "A species is a group of organisms that can interbreed to produce fertile offspring, so a new species arises only when a population becomes reproductively isolated and gene flow stops. In allopatric speciation, a geographical barrier such as a mountain range, a river or the sea separates two populations. Different mutations arise in each, different selection pressures favour different alleles, and genetic drift acts in small populations. Over many generations the gene pools diverge so much that, even if the barrier disappears, the populations cannot interbreed to produce fertile offspring.\n\nIn sympatric speciation the populations share one area. Groups may use different habitats or foods, or choose mates by different courtship displays or colours, so that they rarely interbreed and their gene pools diverge. In plants, polyploidy can create a species in one generation: if the chromosome number of a hybrid doubles, the new plant is fertile but cannot produce fertile offspring with either parent species.\n\nReproductive isolation is maintained by prezygotic mechanisms, which prevent fertilisation: species may live in different habitats, breed or flower at different times (temporal isolation), fail to recognise each other's courtship (behavioural isolation), have incompatible reproductive organs (mechanical isolation), or have gametes that cannot fuse. Postzygotic mechanisms act after fertilisation: the hybrid may die (hybrid inviability), be sterile, like the mule, whose chromosomes from horse and donkey cannot pair in meiosis, or produce weak offspring (hybrid breakdown).",
    },
  });
});
