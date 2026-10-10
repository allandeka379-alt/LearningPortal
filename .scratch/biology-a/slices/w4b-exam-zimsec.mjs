// W4b: ZIMSEC Paper 3 essays (ZIM_P3_ESSAY: (a) 8 describe/outline + (b) 12 explain/discuss), self-marked.
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

concept(A("ecology.nitrogen-cycle"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: nitrogen cycle and human impact
  essay(b, {
    concepts: [A("ecology.nitrogen-cycle"), A("ecology.human-impact")],
    stem: "Answer both parts.",
    hints: ["In (a) follow nitrogen from the air into plants, animals, the soil and back to the air, naming each bacterium.", "In (b) link each farming practice to the bacteria involved, then follow excess nitrate into rivers and dams."],
    a: {
      stem: "Outline the nitrogen cycle, naming the bacteria involved at each stage.",
      points: [
        "Nitrogen fixation: N₂ converted to ammonium by nitrogenase in *Rhizobium* in legume root nodules",
        "Free-living bacteria (e.g. *Azotobacter*) and lightning (and the Haber process) also fix nitrogen",
        "Plants absorb nitrate (and ammonium) by active transport and use it to make amino acids and proteins (assimilation)",
        "Animals obtain nitrogen by eating plants / other animals and digesting proteins",
        "Ammonification: saprotrophic bacteria and fungi decompose proteins, urea and dead matter, releasing ammonium",
        "Nitrification: *Nitrosomonas* oxidises ammonium to nitrite",
        "*Nitrobacter* oxidises nitrite to nitrate; both are aerobic chemoautotrophs",
        "Denitrification: *Pseudomonas* / *Clostridium* reduce nitrate to N₂ in anaerobic, waterlogged soil",
      ],
      modelAnswer: "Nitrogen gas cannot be used directly by most organisms. It is fixed into ammonium by the enzyme nitrogenase in *Rhizobium*, which lives in the root nodules of legumes such as groundnuts and soya beans; free-living bacteria such as *Azotobacter*, lightning and the industrial Haber process also fix nitrogen. Plants absorb nitrate, and some ammonium, from the soil by active transport and use it to make amino acids, proteins and nucleic acids. Animals obtain nitrogen by eating plants or other animals and digesting their proteins.\n\nWhen organisms die, or excrete urea and faeces, saprotrophic bacteria and fungi break down the proteins and release ammonium (ammonification). In well-aerated soil, the chemoautotrophic bacterium *Nitrosomonas* oxidises ammonium to nitrite, and *Nitrobacter* oxidises nitrite to nitrate (nitrification). In waterlogged, anaerobic soil, denitrifying bacteria such as *Pseudomonas* and *Clostridium* reduce nitrate to nitrogen gas, which returns to the atmosphere.",
    },
    bb: {
      stem: "Explain how farming practices can increase or decrease the nitrogen available to crops, and discuss the effects on ecosystems when nitrate fertilisers are overused.",
      points: [
        "Growing legumes (groundnuts, soya, cowpeas) adds fixed nitrogen via *Rhizobium*",
        "Ploughing in legume residues / manure: ammonification and nitrification release nitrate for the next crop (crop rotation)",
        "*Rhizobium* inoculants on seed ensure nodulation where the strain is absent",
        "Ploughing and drainage aerate soil, favouring nitrifiers / reducing denitrification",
        "Waterlogging or compaction makes soil anaerobic, increasing denitrification and reducing nitrification, so nitrogen is lost",
        "Inorganic fertilisers (ammonium nitrate, urea) supply nitrogen directly but are expensive",
        "Nitrate is very soluble and not held by soil particles, so excess is leached by heavy rain into rivers and dams",
        "Eutrophication: nitrate causes rapid growth of algae (algal bloom)",
        "Algae block light; submerged plants cannot photosynthesise and die",
        "Aerobic bacteria decomposing dead material use up dissolved oxygen (high BOD), so fish and invertebrates die",
        "Biodiversity falls; water may become unsafe or expensive to treat / blooms of toxic algae",
        "Reduce harm by split doses at the right time, buffer strips, legumes and manure, soil testing",
      ],
      modelAnswer: "Farmers increase available nitrogen by growing legumes such as groundnuts, soya beans and cowpeas, whose root nodules contain *Rhizobium*. When legume residues or manure are ploughed in, decomposers release ammonium, which nitrifying bacteria convert to nitrate for the following crop, which is why rotating maize with legumes raises yields. Where the right strain is missing, seed is coated with a *Rhizobium* inoculant. Ploughing and good drainage keep soil aerated, which favours the aerobic nitrifying bacteria and reduces denitrification. In contrast, waterlogging and compaction make soil anaerobic, so nitrification stops and denitrifying bacteria convert nitrate into nitrogen gas, which is lost. Inorganic fertilisers such as ammonium nitrate and urea supply nitrogen quickly but are costly.\n\nWhen fertiliser is overused, the excess nitrate, which is very soluble and is not held by soil particles, is leached by heavy rain into rivers and dams. There it causes eutrophication. Algae grow rapidly, forming blooms that block light from submerged plants, which cannot photosynthesise and die. Aerobic bacteria decompose the dead material and use up the dissolved oxygen, so fish and invertebrates die and biodiversity falls. Some blooms produce toxins, and treating the water becomes more expensive. These effects can be reduced by applying fertiliser in split doses when the crop needs it, keeping buffer strips of vegetation beside rivers, using legumes and manure, and testing soil before applying fertiliser.",
    },
  });

  // ---------------------------------------------------------------- E2: elephants and rhinos
  essay(b, {
    concepts: [A("conservation.elephant-rhino"), A("conservation.threats-strategies")],
    stem: "Answer both parts.",
    hints: ["In (a) give threats first, then the measures used against each.", "In (b) organise the discussion around each organisation, then the conflicts of interest, and conclude."],
    a: {
      stem: "Describe the reasons for concern about the African elephant (*Loxodonta africana*) and the white rhinoceros (*Ceratotherium simum*) in Zimbabwe, and the measures used to conserve them.",
      points: [
        "Poaching for ivory and rhino horn, driven by illegal international markets",
        "Habitat loss and fragmentation from expanding settlement and farming",
        "Human-wildlife conflict: crop raiding, retaliation; elephant overpopulation damaging woodland in some parks",
        "Both are slow breeders (long gestation, long calving interval), so populations recover slowly",
        "Anti-poaching patrols, intelligence and prosecution",
        "Dehorning rhinos (horn is keratin and regrows, so repeated)",
        "Translocation to safer areas / sanctuaries, intensive protection zones and conservancies; monitoring of individuals",
        "Managing elephant numbers: translocation, water-point management, contraception or culling",
      ],
      modelAnswer: "Both species are threatened by poaching, for ivory from elephants and horn from rhinos, driven by high prices in illegal international markets. Expanding settlement and farmland cause habitat loss and fragmentation, and human-wildlife conflict arises when elephants raid crops, leading to retaliation. In some parks, such as parts of Hwange, elephants are so numerous that they damage the woodland. Both animals breed slowly, with long gestation and long intervals between calves, so losses are replaced slowly.\n\nConservation measures include ranger patrols, intelligence networks and prosecution of poachers. Rhinos are dehorned under anaesthetic, which removes the poachers' reward; because horn is keratin and regrows, this is repeated. Rhinos are translocated to sanctuaries, intensive protection zones and private conservancies, where individuals are monitored. Where elephants exceed the carrying capacity, managers may translocate animals, close some artificial water points, or, controversially, cull.",
    },
    bb: {
      stem: "Discuss the roles of EMA, CAMPFIRE and CITES in conservation, and the conflicts of interest and economic implications for Zimbabwe of conserving elephants and rhinos.",
      points: [
        "EMA: statutory body under the Environmental Management Act; requires environmental impact assessments for projects",
        "EMA regulates pollution, wetlands and land degradation, enforces environmental law and educates the public",
        "CAMPFIRE: communities in communal areas gain authority over and income from wildlife (hunting, tourism)",
        "CAMPFIRE income funds schools, clinics, boreholes, so communities have an incentive to conserve and report poachers",
        "CAMPFIRE limitations: income varies / depends on trophy hunting; benefits not always shared fairly; crop losses may exceed income",
        "CITES regulates international trade: Appendix I bans commercial trade; Appendix II needs permits",
        "International commercial trade in ivory and horn banned; Zimbabwe's elephants on Appendix II with strict conditions",
        "Ivory debate: Zimbabwe has argued that sales of stockpiles could fund conservation; others argue sales increase demand and help launder illegal ivory",
        "Conflict between farmers and wildlife: crop raiding and danger near parks",
        "Culling debate: protects habitat and other species versus ethical objections and harm to tourism",
        "Economic benefits: tourism earns foreign currency and jobs; hunting revenue; but anti-poaching is costly",
        "Balanced conclusion: conservation succeeds when communities benefit and enforcement and international cooperation (e.g. transfrontier areas) work together",
      ],
      modelAnswer: "The Environmental Management Agency is the statutory body established under the Environmental Management Act. It requires environmental impact assessments before projects such as mines and dams go ahead, regulates pollution and the use of wetlands, enforces environmental law and runs public education, protecting the habitats that wildlife depends on.\n\nCAMPFIRE gives rural communities, through their district councils, authority over wildlife on communal land and a share of the income from safari hunting and tourism. This money pays for schools, clinics and boreholes, so communities have a reason to conserve wildlife and to report poachers instead of seeing elephants only as pests. However, income has varied, has depended heavily on trophy hunting, has not always reached households fairly, and crop losses can be greater than the benefits.\n\nCITES regulates international trade in wildlife. Species on Appendix I cannot be traded commercially, and Appendix II trade needs permits. International commercial trade in ivory and rhino horn is banned, although Zimbabwe's elephants are listed on Appendix II with strict conditions. This creates a conflict: Zimbabwe has argued that selling stockpiled ivory could fund conservation, while other countries and many conservation groups argue that legal sales could raise demand and allow illegal ivory to be laundered.\n\nOther conflicts include crop raiding and danger to people living near parks, and the debate over culling where elephants exceed the carrying capacity: culling may protect woodland and other species, but many object on ethical grounds and fear damage to tourism. Economically, wildlife tourism earns foreign currency and provides jobs, and regulated hunting brings revenue, but anti-poaching operations are expensive. Overall, conservation is most successful when local communities benefit, enforcement is strong and countries cooperate, for example through transfrontier conservation areas.",
    },
  });

  // ---------------------------------------------------------------- E3: genetic fingerprinting and ethics
  essay(b, {
    concepts: [A("genetech.pcr-electrophoresis-fingerprinting"), A("genetech.ethics"), A("genetech.genetic-screening")],
    stem: "Answer both parts.",
    hints: ["In (a) explain why repeat regions differ between people before describing the steps.", "In (b) give benefits and concerns for each use, attribute views to groups, and conclude."],
    a: {
      stem: "Explain the theoretical basis of genetic fingerprinting and outline how a genetic fingerprint is produced.",
      points: [
        "Non-coding DNA contains variable number tandem repeats (VNTRs / STRs): short sequences repeated many times",
        "The number of repeats, and so the length of the region, varies between individuals; each person has two alleles (one from each parent)",
        "Using many loci makes the pattern almost unique (except identical twins)",
        "DNA extracted from cells (e.g. white blood cells, hair roots, saliva)",
        "Repeat regions amplified by PCR using primers either side (or DNA cut with restriction enzymes outside the repeats)",
        "Fragments separated by gel electrophoresis: DNA negative, moves to anode; shorter fragments travel further",
        "Bands made visible with fluorescent labels or probes",
        "Band patterns compared with other samples / a ladder of known sizes",
      ],
      modelAnswer: "Much of the human genome is non-coding, and some non-coding regions contain short sequences repeated one after another, called variable number tandem repeats. The number of repeats at each locus, and so the length of the region, differs between people; each person has two alleles at each locus, one from each parent. When many loci are examined together, the pattern is almost certainly unique to one person, except identical twins.\n\nTo produce a genetic fingerprint, DNA is extracted from cells such as white blood cells, hair roots or saliva. The repeat regions are amplified by PCR, using primers that bind either side of them. The fragments are separated by gel electrophoresis: DNA is negatively charged, so it moves towards the anode, with shorter fragments travelling further through the gel. The bands are made visible with fluorescent labels or probes, and their positions are compared with those of other samples and a ladder of known fragment sizes.",
    },
    bb: {
      stem: "Discuss the social and ethical implications of gene technology, with reference to genetic fingerprinting, genetic screening and genetically modified crops.",
      points: [
        "Fingerprinting benefits: identifies offenders, solves crimes, exclusion of innocent suspects, freeing wrongly convicted",
        "Fingerprinting/paternity: settles disputes, identifies remains; but may reveal unexpected family relationships",
        "Forensic databases: privacy and consent concerns (profiles of people not convicted, tracing relatives); risk of contamination and misinterpretation; a match is not proof of guilt",
        "Screening benefits: early treatment, informed reproductive choices (e.g. carriers of sickle cell anaemia or cystic fibrosis)",
        "Screening concerns: anxiety (e.g. untreatable Huntington's disease); need for genetic counselling",
        "Embryo/fetal screening may lead to embryo destruction or termination, which some religious groups oppose; fears of designer babies",
        "Genetic information and insurance/employment: risk of discrimination; need for confidentiality",
        "GM crop benefits: higher yields, fewer insecticide sprays (Bt cotton), drought tolerance, food security",
        "GM crop hazards: gene flow to wild relatives, resistance in pests/weeds, non-target effects",
        "GM social issues: patented seed, dependence on companies, cost to small-scale farmers, labelling and consumer choice",
        "Religious and cultural views differ: some see gene alteration as 'playing God', others accept it as a way to heal and feed people",
        "Balanced conclusion: benefits are real but require regulation, consent, confidentiality and fair access",
      ],
      modelAnswer: "Genetic fingerprinting has clear benefits. It can identify offenders from tiny samples, exclude innocent suspects and has helped free people who were wrongly convicted; it also settles paternity disputes and identifies human remains. However, paternity testing can reveal unexpected family relationships, and national DNA databases raise privacy and consent concerns, particularly when profiles of people who were never convicted are kept or relatives are traced through them. Contamination or misinterpretation can lead to injustice, and a DNA match shows only that a person's DNA was present, not that they committed a crime.\n\nGenetic screening allows early treatment and informed choices, for example for couples who are both carriers of sickle cell anaemia or cystic fibrosis. Yet a positive result for an untreatable condition such as Huntington's disease can cause great anxiety, so genetic counselling is essential. Screening of embryos and fetuses may lead to embryos being discarded or pregnancies ended, which some religious groups oppose, and some fear it could lead to designer babies. If insurers or employers obtained results, people might face discrimination, so confidentiality is vital.\n\nGM crops can raise yields, reduce insecticide spraying, as with Bt cotton, and help crops tolerate drought, contributing to food security. On the other hand, transgenes may spread to wild relatives, pests and weeds may evolve resistance, and non-target organisms may be affected. Patented seed can make small-scale farmers dependent on companies and unable to save seed, and many consumers want GM food labelled. Religious and cultural views differ: some groups regard altering genes as 'playing God', while others see it as a responsible way to heal and feed people.\n\nOverall, gene technology offers real benefits, but they can be realised fairly only with strong regulation, informed consent, confidentiality of genetic information and fair access for all.",
    },
  });
});
