# agriculture-o — writing brief for content agents

You write ORIGINAL study content for the Agriculture family: ZIMSEC O-Level Agriculture (Forms 1-4, 2015-2022) and
Cambridge IGCSE Agriculture 0600 (2027-2028). Content is DEV preview only; a human reviews it later (§41), but write it
as if it ships tomorrow.

## Read first (once)

- `docs/CONTENT_PIPELINE.md` §6 (lessons), §7 (questions; §7.2 responses, §7.3 payload/answerSpec), §8 (flashcards),
  §11 (quality bar). `docs/CONTENT_AUTHORING.md` (Markdown blocks, **tables**, LaTeX, money).
- `content/concepts/agriculture-o.json` (102 concepts; each description says exactly what is IN and what is OUT, and
  "ZIMSEC only" / "Cambridge only" when one board alone covers it — stay inside it).
- The two syllabus files: `content/syllabi/zimsec/o-level/agriculture/2015-2022.json` and
  `content/syllabi/cambridge/igcse/agriculture/2027-2028.json` (which node covers each concept; ZIMSEC objectives say in
  which form an item is taught; the `notes` list what each board leaves out and the uncertainties). ZIMSEC covers 94
  concepts, Cambridge 74; 66 are shared. For a single-board concept write for that board (Zimbabwean examples and
  ZIMSEC depth for ZIMSEC-only; for Cambridge-only, a local Zimbabwean or southern African example is still welcome).
- `.scratch/agriculture/lib.mjs`: builders (`concept`, `b.mcq/tf/short/fib/match/num/calc/manualShort/ext/essay/
  struct/card`, `P.*` parts, `agricultureLevels(marks)`, selectors `ZIM`, `CAM`, `t` for LaTeX) and the **checked
  agriculture helpers** (`fertiliser`, `perStation`, `nutrientKg`, `productForNutrient`, `plantPopulation`, `seedRate`,
  `germinationPct`, `yieldPerHa`, `field`, `waterVolume`, `fcr`, `dressingPct`, `layingPct`, `mortalityPct`, `dailyGain`,
  `pearsonSquare`, `stockingRate`, `carryingCapacity`, `dilution`, `sprayVolume`, `fence`, `grossMargin`, `profitLoss`,
  `partialBudget`, `productTable`, `monohybrid`, `pct`, `pctChange`, `mean`, `round`, `fmtNum`, `money`, `table`,
  `check`). Units for numerical answers are the keys of `UNITS` in lib.mjs (kg, kg/ha, t/ha, g/plant, bags, plants/ha,
  ha, m², m, L, mL, %, °C, days, LU/ha, …); money answers use `prefix: "US$"`.
- Style examples: `.scratch/english/slices/a1-nouns-pronouns.mjs` (every MCQ option has a rationale, explanations
  teach, hints from difficulty 3), any `.scratch/geography/slices/g3a-*.mjs` (numbers, units, stimulus tables,
  structured items) and the lesson `content/subjects/combined-science-o/lessons/physics/telecommunication.md`
  (front matter + blocks).

## What to produce per concept

1. **One lesson** `content/subjects/agriculture-o/lessons/<area>/<name>.md` (key `<area>.<name>`, where the concept key
   is `agri.<area>.<name>`; e.g. `agri.crops.maize` → `lessons/crops/maize.md`, key `crops.maize`), **900-1,600 words**
   (tables do not count), template of §6: `## Introduction` (a Zimbabwean farm, school garden or community context and
   why it matters in the exam), `## Key definitions` (`:::definition{term="…"}`, precise examinable wording in your own
   words), explanation sections, **at least two worked examples** (`:::worked-solution` for calculations — fertiliser,
   seed, plant population, rations, gross margins, stocking rates, fencing, dilution, genetics; `:::example` for applied
   reasoning: diagnosing a deficiency, choosing an irrigation method, planning a rotation), `## Common mistakes`
   (`:::mistake{title="…"}`), `## Exam tips` (`:::exam-tip`; which paper and how *state, describe, explain, suggest,
   calculate, discuss* are answered for this concept), `## Summary` (one `:::summary`). Front matter: key, title
   (unique), summary, concepts ([the concept]), estimatedMinutes (honest), level "core"; `freePreview: true` ONLY on the
   lessons named in your assignment. Do not add `objectives`. Where the boards' terms differ (table below) add a short
   `:::keyfact{title="ZIMSEC and Cambridge terms"}`.
2. **16-22 questions + 8-10 flashcards** in a slice file `.scratch/agriculture/slices/<prefix><name>.mjs` using
   `concept(...)` (one module per concept; `file: "<area>/<name>"`, `keyPrefix: "<area>.<name>"`):
   - Mix per concept: MCQ (about 40%, four options, 1 mark), numerical/calculation (`b.num` / `b.calc`) wherever the
     concept has figures, true/false, matching (pest ↔ damage, nutrient ↔ deficiency sign, disease ↔ cause/vector,
     implement ↔ function, feed ↔ class), fill-in-the-blank, closed `short` answers (name the part, the nutrient, the
     disease — list every acceptable spelling), self-marked `manualShort` items (describe / explain / suggest, 2-4 marks)
     and 2-4 **practice structured** items (`b.struct`, difficulty 3-5, `examStyle: true`, marks 6, 8, 12, 14 or 16 —
     never 10, 15 or 20, see reserved marks) built on a short stimulus (a fictional results table, a farm situation, a
     described diagram) ending with an explain/suggest/discuss part.
   - Difficulty spread: ~20% d1-2 recall, ~50% d2-3 application, ~30% d4-5 exam-style. `daily: true` only on 2-3
     auto-marked items of difficulty 2-3 per concept (short; no long tables).
   - Flashcards: `b.card(type, front, back, notes?)`, types DEFINITION, FORMULA, CONCEPT, FACT ("Which nutrient
     deficiency shows as purpling of maize leaves?").
   - `skill`: RECALL / UNDERSTANDING / APPLICATION / ANALYSIS / EVALUATION. `calculator: true` on items needing one
     (Cambridge allows calculators throughout; ZIMSEC does not say — keep ZIMSEC arithmetic simple).
   - `applies`: omit when the item suits both boards; `applies: ZIM` / `applies: CAM` when an item depends on one
     board's term, depth or content (natural regions, Zimbabwean legislation; Cambridge's "one crop of local
     importance"). Single-board concepts are tagged to their board automatically.

## Agriculture quality rules (non-negotiable)

- **Facts must be right, and safe.** Crop, livestock, pest and disease facts must be standard textbook knowledge. If
  you are not sure of a fact, leave it out or state it generally. Typical values are labelled "about", "typical" or
  "for example" (rates differ by soil, region, cultivar and source). Values you may use, always as approximate:
  - Natural regions (mean annual rainfall): I more than about 1,000 mm (Eastern Highlands; plantations, dairy,
    intensive diversified farming); II about 750-1,000 mm (IIa more reliable than IIb; intensive maize, tobacco,
    cotton, wheat in winter under irrigation, livestock); III about 650-800 mm (semi-intensive; drought-resistant
    crops, livestock); IV about 450-650 mm (semi-extensive; small grains, livestock); V below about 450-650 mm
    (extensive cattle and game ranching; Lowveld irrigated sugar cane). Boundaries differ between textbooks: no MCQ may
    hinge on an exact boundary.
  - Crops: maize seed rate about 25 kg/ha; spacing for example 90 cm × 30 cm or 75 cm × 25 cm (one plant per station);
    basal compound fertiliser (for example Compound D, 7:14:7) about 300-400 kg/ha and ammonium nitrate (34.5% N) top
    dressing about 200-300 kg/ha, often split; hybrid seed must be bought every season because yield falls in the next
    generation; groundnuts need calcium (gypsum at flowering/pegging) and little nitrogen; soya beans are inoculated
    with Rhizobium; sorghum and millets suit drier regions IV and V; wheat is an irrigated winter crop.
  - Pests and diseases: maize stalk borer (Busseola fusca); fall armyworm (Spodoptera frugiperda), first reported in
    southern Africa in 2016-2017; American bollworm (Helicoverpa armigera) on cotton, tomatoes and other crops; aphids
    (piercing and sucking, transmit viruses); grain weevils in storage; witchweed (Striga) parasitises maize, sorghum
    and millets; maize streak virus spread by leafhoppers; grey leaf spot (fungal) of maize; bacterial wilt of
    solanaceous crops; tobacco mosaic virus.
  - Livestock (about): gestation cow 283 days (about 9 months), sow 114 days (3 months, 3 weeks, 3 days), ewe and doe
    about 150 days, rabbit about 31 days; incubation of hen eggs 21 days; oestrous cycle about 21 days (cow, sow, doe)
    and about 17 days (ewe); normal rectal temperature cattle about 38.5 °C, sheep and goats about 39-40 °C, pigs about
    39 °C, chickens about 41-42 °C; broilers are usually slaughtered at about 5-7 weeks; layers start laying at about
    18-22 weeks. Diseases: anthrax (bacterial; do not open a suspected carcass), foot-and-mouth disease (viral;
    cloven-hoofed animals), Newcastle disease (viral; poultry; vaccination), trypanosomiasis (protozoan; spread by
    tsetse flies), redwater (babesiosis) and gallsickness (anaplasmosis) spread by the blue tick (a one-host tick),
    heartwater by the bont tick, theileriosis (January disease) by the brown ear tick (a three-host tick).
  - Zimbabwean context, well-established facts only: AGRITEX extension officers, the Grain Marketing Board (GMB),
    tobacco auction floors and contract farming, Pfumvudza/Intwasa conservation agriculture (government programme from
    2020; three principles: minimum soil disturbance, permanent soil cover, crop rotation), ZINWA, EMA, veterinary
    services and dip tanks, CAMPFIRE, Cyclone Idai (March 2019). **No statistics** (production, yields, prices, herd
    sizes, programme numbers) presented as real. Land reform, marketing changes and other contested topics: neutral,
    factual, aims + recognised benefits + recognised problems, no blame.
- **No brand names** of chemicals, seed or equipment. Name chemicals by group and action ("a contact insecticide",
  "an organophosphate", "a systemic fungicide", "a selective pre-emergence herbicide", "a copper-based fungicide"); a
  well-known generic active ingredient may be named only when you are certain of its class and use. Never give doses
  for real products. Pesticide labels: describe hazard classes in general (WHO classes from extremely to slightly
  hazardous; colour bands and symbols on the label); do NOT state Zimbabwe's specific colour-band scheme as fact (write
  a reviewer note if you describe it) and do not set auto-marked items on label colours.
- **Every figure is computed and checked in code.** Build stimulus tables and answers with the helpers (they throw on
  impossible data: a Pearson-square target outside the two feeds, a carcass heavier than the live bird, a fence
  perimeter that is not a whole number of spans) and pass the **exact** value to `b.num` / `b.calc`; never type a
  computed answer by hand. For lessons, print tables and worked numbers from a script in
  `.scratch/agriculture/tables/<prefix><name>.mjs` (never in `slices/`, which the build imports) and paste the output.
  Re-derive every worked example from its data before you finish.
- **Numerical answers:** state the units and the rounding in the stem ("in kg/ha", "to one decimal place", "to the
  nearest whole bag", "round UP to whole bags") and pass `unit` (a UNITS key) and a `tol` that matches the rounding
  (e.g. `tol: 0.05` for one decimal place; `tol: 0` for whole bags). Money: `prefix: "US$"` (default tolerance exact
  for whole dollars, 0.005 for cents). Add 1-3 `wrong` values that are real mistakes (ha and m² confused — 1 ha =
  10,000 m²; cm not converted to m; parts of the Pearson square swapped; dressing percentage upside down; bags rounded
  down) and say why in the explanation. `b.calc` items need a numbered `workedSolution` (it defaults to the explanation,
  so write the explanation as the full calculation). Prices are fictional and labelled "assume".
- **Diagrams in words and tables, never images** (only uploaded images are possible and you cannot make them).
  Describe structures in order with labels and functions ("the rumen, the largest compartment, lies on the left…"),
  life cycles as numbered stages, flowers and seeds part by part, a soil profile as a top-to-bottom table, implements
  part by part, a farm layout or a rotation plan as a table. Questions ask "Which part…", give a labelled description,
  or ask the student to describe what a diagram would show; never "draw" or "the diagram below" unless the table is
  there. Genetic crosses are written as text (parents, gametes, offspring table, ratio).
- **Practical and safety content:** describe procedures as numbered steps with the safety precautions (protective
  clothing, handling animals calmly, humane slaughter described factually and without graphic detail, chemical
  storage). Never encourage unsafe practice.
- **MCQs:** exactly one defensible answer, four options, distractors that are definitely wrong (rationale for each),
  numerical distractors from real errors; never "all/none of the above", never refer to options by letter. **No
  length cue** — the key must not be clearly the longest option; check with
  `node .scratch/tools/length-cue.mjs agriculture-o questions/<your folder>/` → `# 0 flagged`. MCQ options render
  inline: no tables in options (put the table in the stem).
- **Self-marked items** (`manualShort`, manual parts, `ext`): one point per creditworthy idea (identify 1 + explain 1;
  "States that lime raises soil pH, making phosphorus more available"), points add up to the marks, a complete
  `modelAnswer` / example answer. Discuss/evaluate parts of 6 or more marks get `levels: agricultureLevels(marks)`.
- **Original wording**, British English (fertiliser, sulfur as Cambridge spells it, colour), SI units, names Tendai,
  Rudo, Tatenda, Nyasha, Farai, Chipo, Sipho, Thandeka; places Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi,
  Marondera, Chipinge, Gokwe, Hwange. Fictional farms and firms only. Dates as 7 October 2026. No invented quotations or
  "studies show".

### Terminology between the boards

| ZIMSEC (syllabus / common usage) | Cambridge 0600 |
|---|---|
| Crop husbandry; animal husbandry | Crop production; livestock production |
| Agro-chemicals | Farm chemicals |
| Notifiable diseases | Notifiable (scheduled) diseases |
| Tillage implements (mouldboard plough, cultivator, harrow, planter, ridger) | Farm machinery (same implements) |
| Dressing (killing-out) percentage | — (not named) |
| Natural farming regions I-V | — (land use limited by topography and climate) |
| Basal dressing and top dressing | Rates of application of fertiliser and manure |
| Maintenance and production rations; Pearson square | Maintenance and production rations (no method named) |

## Exam-format items (rows owned per assignment below)

Use `examStyle: true`, the exact type, marks, skill and `applies`, `paper:` (e.g. `"Paper 2"`), and set `concepts` on
every item to the concepts it actually examines (all covered by the item's syllabus). The mock papers draw by type +
marks (+ topic), so these must be EXACT:

| Paper item | type | marks | skill | applies | how many |
|---|---|---|---|---|---|
| ZIMSEC P1: 40 objective items, four options, single answer (1 hour) | MULTIPLE_CHOICE | 1 | any | none (both) unless board-specific | every concept's MCQs (≥ 80 per syllabus for two mocks; plenty). Cambridge has no MCQ paper: MCQs are practice for Cambridge |
| **Theory structured (10)**: ZIMSEC P2 Section A (six compulsory, whole syllabus) and Cambridge P1 Section A (compulsory short-answer/structured, 70 marks). One area of the syllabus; a short stimulus (fictional results table, farm situation or described diagram); parts (a), (b), … of 1-4 marks from *state/name* through *calculate* to *explain/suggest*; at least 4 marks auto-marked | STRUCTURED | 10 | APPLICATION | none when every concept is covered by both syllabi and the wording suits both; otherwise ZIM or CAM | 4 per writer (32); mocks need 12 ZIMSEC and 14 Cambridge |
| ZIMSEC P2 Section B, **crop production**: data or situation stimulus, parts from short answers and a calculation to a long describe/explain part (6-8 marks, `agricultureLevels`) | STRUCTURED | 20 | ANALYSIS | ZIM | 9 in total (see assignments). `concepts` must include at least one concept the ZIMSEC syllabus covers under 5.3 Crop husbandry (agri.plants.*, agri.crops.* except cotton-tobacco, agri.protection.*, agri.breeding.crop-improvement) |
| ZIMSEC P2 Section B, **animal husbandry**: as above | STRUCTURED | 20 | ANALYSIS | ZIM | 8 in total. `concepts` must include a concept covered under 5.4 Animal husbandry (agri.livestock.*, agri.nutrition.*, agri.health.*, agri.breeding.cell-division/monohybrid/livestock-breeding) |
| Cambridge P1 Section B: free-response structured question (candidates answer 2 of 5): a one-line context, three or four parts, e.g. (a) describe [4], (b) explain [5], (c) discuss/suggest [6, levels]; mostly self-marked, may include one calculation | STRUCTURED | 15 | EVALUATION | CAM | 2 per writer (16); mocks need 10 |

Each 20-mark item: difficulty 4-5, `secs: 1440`; each 15-mark item: difficulty 4-5, `secs: 945`; each 10-mark item:
difficulty 3-4, `secs: 720`. Stimuli are built and checked with the helpers. Self-marked parts have line-by-line
points. Structured part labels are flat: `(a)`, `(b)`, `(c)`, … (or `(i)`, `(ii)` inside a separate item); never
"1(a)" (the validator rejects it). The 10-mark Section A size, the 15-mark Section B part split and the ZIMSEC
Section B part split are our conventions (the syllabi give only totals); a reviewer must check them against past
papers. Put the items in three extra modules: `concept(<one of the item concepts>, { file: "exam/<prefix>theory",
keyPrefix: "exam.<prefix>theory" }, …)` for the 10-mark items (set `applies` per item), `file: "exam/<prefix>zimsec"`
with `applies: ZIM` for the 20-mark items, and `file: "exam/<prefix>cambridge"` with `applies: CAM` for the 15-mark
items (e.g. `exam/w2a-theory`, key prefix `exam.w2a-theory`).

**Reserved mark values.** STRUCTURED worth **10**, **15** or **20** marks is only for the exam-format items above.
Practice structured items use 6, 8, 12, 14 or 16 marks. One-mark single-answer MCQs feed the ZIMSEC Paper 1 mocks, so
keep every one exam-worthy.

Mock exams (built later, not by writers): ZIMSEC P1 40 × MCQ (60 min); ZIMSEC P2 Section A 6 × STRUCTURED 10 +
Section B 3 crop + 3 animal STRUCTURED 20, answer one of each (100 marks, 120 min); Cambridge P1 Section A 7 ×
STRUCTURED 10 + Section B 5 × STRUCTURED 15, answer any 2 (100 marks, 105 min). Coursework (ZIMSEC Paper 3,
Cambridge Component 2) is not simulated.

## Folders and keys

- Lessons `lessons/<area>/<name>.md`, key `<area>.<name>`; questions `questions/<area>/<name>.json` and flashcards
  `flashcards/<area>/<name>.json` (written by the build), key prefix `<area>.<name>`; exam items in `questions/exam/`.
- Areas (from the concept keys): land, environment, forestry, wildlife, soil, water, plants, crops, protection,
  livestock, nutrition, health, breeding, pasture, machinery, structures, business.
- Lesson titles must be unique (slugs come from titles).

## Commands (repo root)

- Build your slices only: `node .scratch/agriculture/build-content.mjs <your-prefix>` (prefix match on file names
  with the trailing dash, e.g. `w2a-`).
- Validate: `npm run content:validate -- agriculture-o --strict` → 0 error(s), 0 warning(s). Other writers work in the
  same family: ignore (and report) errors in files you do not own. One validation at a time.
- Self-check: `npm run content:check -- agriculture-o` → fix findings in your files (questions must not reuse a lesson
  worked example's numbers).
- Length cue: see above.

## Hard limits

- Edit ONLY your slice files, your `tables/` scripts, your lesson files and the JSON your slices generate. Never edit
  lib.mjs, build-content.mjs, build-syllabi.mjs, the registry, the syllabus files, `.scratch/tools/` or other writers'
  files: report needed changes (a missing unit, a concept description) instead.
- Never run content:import, content:publish, npm install, prisma, next, git, or start Workflows.
- Final report (under 300 words): files written, counts per concept (lessons, questions by type, cards), exam-format
  items, validation and content:check results, anything unfinished or uncertain (facts you left out, values to check).

## Proposed split into 8 writer assignments

Roughly equal effort (calculation-heavy concepts count more). Concept keys below drop the `agri.` prefix.
ZIM = ZIMSEC only, CAM = Cambridge only. Every writer also owns **4 theory structured (10)** and **2 Cambridge
Section B (15)** items, using concepts of their own assignment (at least two of the four 10-mark items without
`applies` where the concepts allow). freePreview: at most one lesson per top-level topic of each syllabus; ★ marks them.

**W1a — General agriculture** (prefix `w1a-`; 14 concepts, mostly descriptive)
land.land-use, land.land-tenure (ZIM), land.natural-regions (ZIM) ★, land.farming-systems, land.farm-planning,
land.modern-production (CAM) ★, environment.climate-rainfall, environment.adverse-conditions (ZIM),
environment.disasters (ZIM), forestry.forests-trees (ZIM), forestry.nursery-plantation (ZIM),
forestry.timber-deforestation (ZIM), wildlife.value-protection (ZIM), wildlife.conservation-management (ZIM).
Folders: `land/ environment/ forestry/ wildlife/`. Exam rows: 4 × 10, 2 × CAM 15 (land use and climate; organic
production, hydroponics and GM crops).

**W1b — Soil and soil water** (prefix `w1b-`; 12 concepts)
soil.formation-profile, soil.texture-structure, soil.types ★, soil.constituents, soil.temperature, soil.erosion,
soil.conservation, crops.conservation-agriculture, water.water-cycle (CAM), water.conservation-harvesting (ZIM),
water.drainage-leaching, water.pollution-legislation (ZIM).
Folders: `soil/` (except the fertility concepts), `crops/conservation-agriculture`, `water/water-cycle|
conservation-harvesting|drainage-leaching|pollution-legislation`. Exam rows: 4 × 10 (soil texture results table;
erosion and conservation; soil water), 2 × CAM 15.

**W2a — Soil fertility, irrigation and fencing** (prefix `w2a-`; 13 concepts, calculation-heavy)
soil.plant-nutrients, soil.organic-manures, soil.inorganic-fertilisers, soil.ph-liming, soil.nitrogen-cycle,
water.irrigation-need-sources, water.irrigation-methods, water.irrigation-equipment (ZIM), machinery.pumps-shellers
(ZIM), structures.water-supply (CAM), structures.fencing ★, structures.fence-construction, structures.farm-buildings.
Folders: `soil/plant-nutrients|organic-manures|inorganic-fertilisers|ph-liming|nitrogen-cycle`, `water/irrigation-*`,
`machinery/pumps-shellers`, `structures/fencing|fence-construction|farm-buildings|water-supply`. Exam rows: 4 × 10
(fertiliser calculation; pH and liming; irrigation; fencing materials), 2 × ZIM crop 20 (fertilising and irrigating a
named crop; each includes a crops.* concept), 2 × CAM 15.

**W2b — Plant science and breeding** (prefix `w2b-`; 13 concepts)
plants.classification, plants.roots-stems-leaves, plants.water-uptake-transpiration, plants.photosynthesis ★,
plants.translocation-storage, plants.respiration-tropisms (ZIM), plants.flowers-pollination,
plants.asexual-propagation, plants.germination, breeding.cell-division (ZIM), breeding.monohybrid,
breeding.crop-improvement, breeding.livestock-breeding.
Folders: `plants/ breeding/`. Exam rows: 4 × 10 (transpiration results; germination experiment; monohybrid cross;
hybrid maize), 2 × ZIM crop 20 (plant processes; crop improvement), 2 × CAM 15.

**W3a — Crop production and machinery** (prefix `w3a-`; 13 concepts)
crops.vegetables (ZIM), crops.orchards (ZIM), crops.land-preparation, crops.maize, crops.other-cereals, crops.legumes,
crops.cotton-tobacco (CAM) ★, land.crop-rotation, machinery.tillage-implements, machinery.mechanisation (CAM),
machinery.hand-tools (CAM), machinery.harnesses (ZIM), structures.farm-roads (ZIM).
Folders: `crops/` (except conservation-agriculture), `land/crop-rotation`, `machinery/tillage-implements|mechanisation|
hand-tools|harnesses`, `structures/farm-roads`. Exam rows: 4 × 10 (maize plant population and seed rate; a four-course
rotation; mouldboard plough; legume production), 3 × ZIM crop 20 (maize; a legume; vegetables or an orchard),
2 × CAM 15 (one crop of local importance; mechanisation).

**W3b — Crop protection and farm economics** (prefix `w3b-`; 12 concepts)
protection.pests, protection.pest-control, protection.diseases, protection.weeds, protection.weed-control,
protection.agrochemicals, business.farm-records, business.profit-loss (ZIM), business.budgets (ZIM) ★,
business.economic-principles, business.diminishing-returns, business.risk-decisions.
Folders: `protection/`, `business/farm-records|profit-loss|budgets|economic-principles|diminishing-returns|
risk-decisions`. Exam rows: 4 × 10 (sprayer calibration and dilution; a named pest; gross margin; diminishing returns
table), 2 × ZIM crop 20 (pests and diseases of a named crop; weed control), 2 × CAM 15.

**W4a — Livestock production** (prefix `w4a-`; 13 concepts)
livestock.types (ZIM), livestock.digestion ★, livestock.reproduction, livestock.birth-young-stock,
livestock.poultry-reproduction (ZIM), livestock.broilers, livestock.layers-indigenous (ZIM), livestock.rabbits (ZIM),
livestock.pigs, livestock.donkeys (ZIM), livestock.beef-cattle, livestock.dairy-cattle, livestock.goats-sheep.
Folders: `livestock/`. Exam rows: 4 × 10 (broiler growth and FCR; digestion; dressing percentage; reproduction),
4 × ZIM animal 20 (broilers; layers or rabbits; pigs; cattle, sheep or goats), 2 × CAM 15.

**W4b — Livestock nutrition and health, pasture, marketing** (prefix `w4b-`; 12 concepts)
nutrition.nutrients, nutrition.feedstuffs, nutrition.rations, health.signs-of-health, health.disease-hygiene,
health.notifiable-immunity, health.external-parasites, health.internal-parasites, pasture.vegetation-establishment
(CAM), pasture.grazing-management (CAM) ★, business.marketing (ZIM), business.cooperatives (ZIM).
Folders: `nutrition/ health/ pasture/`, `business/marketing|cooperatives`. Exam rows: 4 × 10 (Pearson square ration;
signs of ill-health; a tick life cycle; stocking rate), 4 × ZIM animal 20 (rations; notifiable diseases; parasites;
disease prevention and hygiene), 2 × CAM 15.

freePreview lessons (one per top-level topic at most, per syllabus): land.natural-regions (ZIMSEC 5.1),
land.modern-production (Cambridge 1), soil.types (ZIMSEC 5.2 / Cambridge 2), plants.photosynthesis (ZIMSEC 5.3 /
Cambridge 3), crops.cotton-tobacco (Cambridge 4), livestock.digestion (ZIMSEC 5.4 / Cambridge 6),
pasture.grazing-management (Cambridge 8), structures.fencing (ZIMSEC 5.5 / Cambridge 10), business.budgets (ZIMSEC
5.6). Cambridge topics 5, 7 and 9 have no preview (their concepts sit in ZIMSEC topics that already have one).
