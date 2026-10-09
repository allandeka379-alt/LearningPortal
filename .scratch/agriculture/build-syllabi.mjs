// Builds content/concepts/agriculture-o.json and the two Agriculture syllabus files:
//   content/syllabi/zimsec/o-level/agriculture/2015-2022.json
//   content/syllabi/cambridge/igcse/agriculture/2027-2028.json   (Cambridge IGCSE Agriculture 0600)
// Sources (local only, not in git): .scratch/agriculture/sources/zimsec-agriculture.pdf (+ .txt; the Ministry file
// "Agriculture Forms 1-4.pdf") and 0600-2027-2028.pdf (+ .txt).
// Run from the repo root: node .scratch/agriculture/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). "ZIMSEC only" / "Cambridge only" in a description
// means only that board's syllabus covers the concept.
const CONCEPTS = [
  // General agriculture: land use
  ["agri.land.land-use", "Forms of land use and the factors that limit it", "Forms of land use (crop and livestock farming, forestry, wildlife management, aquaculture, settlement and protected areas such as national parks), the topographical, climatic, soil and other environmental factors that limit how land can be used, and how population growth creates land pressure and the need for efficient land use. Farming systems are in agri.land.farming-systems; farm layouts in agri.land.farm-planning."],
  ["agri.land.land-tenure", "Land tenure and land reform in Zimbabwe", "ZIMSEC only. Land tenure systems (freehold, leasehold, communal and resettlement tenure), land as a national heritage, land ownership in the pre-colonial, colonial and post-independence periods, the reasons for land reform and the A1 and A2 resettlement models. Taught factually and in a balanced way: aims, recognised benefits and recognised problems, no slogans and no disputed statistics."],
  ["agri.land.natural-regions", "The natural farming regions of Zimbabwe", "ZIMSEC only. The five natural farming regions (I to V, with IIa and IIb): their approximate rainfall, location, climate and the farming systems suited to each (intensive diversified farming and plantations in I, intensive crop and livestock farming in II, semi-intensive farming in III, semi-extensive farming and drought-tolerant crops in IV, extensive cattle and game ranching in V), and why the country is divided into regions. Rainfall characteristics in general are in agri.environment.climate-rainfall."],
  ["agri.land.farming-systems", "Farming systems: mixed farming, monoculture and intercropping", "Farming systems and practices: mixed farming, monoculture, intercropping and mixed cropping, subsistence and commercial farming, intensive and extensive farming, with their advantages and disadvantages. Crop rotation is in agri.land.crop-rotation; organic production and hydroponics in agri.land.modern-production."],
  ["agri.land.crop-rotation", "Crop rotation", "Principles of crop rotation (alternating deep- and shallow-rooted crops, legumes after heavy feeders, crops of different families to break pest and disease cycles, including a ley or fallow), designing a four-course rotation, and the advantages and limitations of rotation. Rotation as a pest-control method is mentioned in agri.protection.pest-control."],
  ["agri.land.farm-planning", "Physical farm planning", "Why farms are planned, the factors considered (soils, slope, water sources, roads, markets, natural region), and sketching a farm layout that places fields, paddocks, buildings, roads, conservation works and water supplies sensibly. Budgets are in agri.business.budgets."],
  ["agri.land.modern-production", "Organic production, hydroponics and GM crops", "Cambridge only. Organic production, hydroponics and genetically modified (GM) crops: what each is and the arguments for and against GM crops and organic production. How GM crops differ from selective breeding is in agri.breeding.crop-improvement."],
  // General agriculture: environment
  ["agri.environment.climate-rainfall", "Climatic factors and rainfall in agriculture", "The environmental (climatic) factors that affect agriculture: wind, light, temperature, rainfall and humidity; evaporation, evapotranspiration, temporary and permanent wilting; frost damage and frost protection; shade; the distribution, effectiveness, reliability and intensity of rainfall in Zimbabwe and their effects on farming; how climate limits land use. Ways of modifying adverse conditions are in agri.environment.adverse-conditions; soil temperature in agri.soil.temperature."],
  ["agri.environment.adverse-conditions", "Reducing the effects of adverse environmental conditions", "ZIMSEC only. Practical ways of reducing the effects of adverse conditions on crops and livestock: shading, mulching, potholing, manuring, tied ridging, watering, drought-tolerant crops, cover crops, windbreaks, conservation tillage and greenhouses. Conservation agriculture as a system is in agri.crops.conservation-agriculture."],
  ["agri.environment.disasters", "Natural disasters and disaster risk management in agriculture", "ZIMSEC only. Effects of hailstorms, floods, cyclones, whirlwinds, veld fires, drought and heat waves on agriculture, and precautionary measures: weather forecasts, disaster preparedness, conservation structures, fire guards, insurance and drought-tolerant crops. Cyclone Idai (March 2019) may be named; no casualty or damage statistics."],
  // Forestry (ZIMSEC only)
  ["agri.forestry.forests-trees", "Forests and trees in Zimbabwe", "ZIMSEC only. The social, economic, cultural and ecological importance of forests, the main forest areas of Zimbabwe, indigenous and exotic trees (common names, for example mukwa, mopane, msasa, eucalyptus, pine), and the difference between softwood and hardwood."],
  ["agri.forestry.nursery-plantation", "Tree nurseries, plantations and agroforestry", "ZIMSEC only. Choosing a nursery site, raising and managing tree seedlings, establishing and managing a tree plantation or woodlot (pitting, planting, weeding, fire guards, thinning, pruning), and agroforestry: its practices, components and benefits. Harvesting timber is in agri.forestry.timber-deforestation."],
  ["agri.forestry.timber-deforestation", "Timber harvesting, deforestation and reforestation", "ZIMSEC only. Methods of harvesting trees, treating timber against rot and termites (preservative types, no brand names), marketing timber and keeping production records; the causes and effects of deforestation and solutions to it, including afforestation and reforestation."],
  // Wildlife (ZIMSEC only)
  ["agri.wildlife.value-protection", "Wildlife: value, classification and protection", "ZIMSEC only. The socio-economic, cultural and ecological value of wildlife; flora and fauna of Zimbabwe; classifying animals by feeding habits (herbivores, carnivores, omnivores) and the big five; sustainable utilisation of wildlife (tourism, game ranching, controlled hunting); specially protected plants and animals; dangerous and problem animals and how they are dealt with."],
  ["agri.wildlife.conservation-management", "Wildlife conservation and management", "ZIMSEC only. Indigenous knowledge systems (totems, taboos) in managing natural resources; conservation versus preservation; poaching; biodiversity (genetic, species and ecosystem diversity) and habitats; human-wildlife conflict; wildlife legislation; the roles of government, community programmes such as CAMPFIRE, voluntary organisations and international conventions such as CITES. No disputed statistics."],
  // Soil
  ["agri.soil.formation-profile", "Soil formation and the soil profile", "Soil formation from parent rock by physical, chemical and biological weathering (with examples of each), the factors of soil formation, and the soil profile: topsoil, subsoil and parent material (horizons A, B and C), the appearance of each and its importance to crop growth. Texture and structure are in agri.soil.texture-structure."],
  ["agri.soil.texture-structure", "Soil texture and soil structure", "Soil particles (gravel, sand, silt, clay) in order of size, soil texture and how to find it (feel method, sedimentation, sieving, textural classes and the textural triangle), soil structure (crumb, single-grain, blocky, platy), the importance of a good crumb structure and humus, factors that build or destroy structure (oxidation of organic matter, capping, soil pans, overcultivation), and methods of improving and maintaining structure."],
  ["agri.soil.types", "Soil types: sandy, loam and clay soils", "Composition and properties of sandy, loam and clay soils (water-holding capacity, drainage, aeration, fertility, workability, warming), how to compare them by experiment, and how to improve sandy and clay soils (organic matter, manure, liming, adding anthill soil to sand)."],
  ["agri.soil.constituents", "Soil constituents, soil water and soil organisms", "Soil constituents and the composition of a good agricultural soil (mineral matter, organic matter and humus, air, water, living organisms), types of soil water (gravitational, capillary, hygroscopic), field capacity and wilting point, movement of water in soil, and soil macro- and micro-organisms (earthworms, termites, bacteria, fungi, nematodes) with their useful and harmful roles. Drainage and leaching are in agri.water.drainage-leaching."],
  ["agri.soil.temperature", "Soil temperature", "How soil temperature affects germination, root growth, plant growth and soil organisms; the danger of excessive heat to seedlings and of frost to some crops; and ways of modifying soil temperature (mulching, shading, watering, ridging)."],
  ["agri.soil.plant-nutrients", "Plant nutrients, deficiency and oversupply", "Major (macro) nutrients nitrogen, phosphorus, potassium, calcium, magnesium and sulfur and the main minor (trace) nutrients: their functions in plants, the signs and effects of deficiency, and the effects of oversupply. Fertilisers that supply them are in agri.soil.inorganic-fertilisers and agri.soil.organic-manures."],
  ["agri.soil.organic-manures", "Organic manures: manure, compost and green manure", "Organic fertilisers (farmyard manure, compost, green manure, crop residues), how compost is made, the effect of organic matter on structure and fertility, the role of legumes in soil fertility, and the advantages and disadvantages of organic compared with inorganic fertilisers."],
  ["agri.soil.inorganic-fertilisers", "Inorganic fertilisers and fertiliser application", "Straight and compound fertilisers (for example ammonium nitrate, single superphosphate, muriate of potash and a compound fertiliser such as Compound D, named generically by type and nutrient ratio, never by brand), reading a fertiliser ratio, methods of application (broadcasting, banding, side dressing, placement, foliar), basal dressing versus top dressing and timing, and calculating fertiliser quantities and bags for a given area and rate."],
  ["agri.soil.ph-liming", "Soil sampling, soil pH and liming", "Why and how soils are sampled (principles and at least one method), testing soil pH with a pH meter or universal indicator, interpreting pH values, how pH affects nutrient availability and crops, how fertilising practices acidify soil, types of liming material (agricultural lime, dolomitic lime), the difference between lime and fertiliser, and correcting acidity by liming."],
  ["agri.soil.nitrogen-cycle", "The nitrogen cycle", "The nitrogen cycle described in words: nitrogen fixation (lightning, Rhizobium in legume root nodules, free-living bacteria, industrial fixation), decomposition and ammonification, nitrification, uptake by plants, denitrification and leaching losses, and its importance to soil fertility."],
  ["agri.soil.erosion", "Soil erosion", "Types of soil erosion (splash, sheet, rill and gully erosion by water; wind erosion), agents and causes (overgrazing, deforestation, cultivating slopes, veld fires, poor tillage), signs, and consequences on and off the farm (loss of fertility, siltation of rivers and dams). Prevention and control are in agri.soil.conservation."],
  ["agri.soil.conservation", "Soil conservation methods and structures", "Biological (cover crops, mulching, contour cultivation, strip cropping, grass strips, afforestation, controlled grazing) and mechanical (contour ridges, storm drains, grass waterways, terraces, gabions, check dams) methods of soil conservation on arable and grazing land, their construction and maintenance, and the reclamation of eroded areas. Conservation agriculture is in agri.crops.conservation-agriculture."],
  // Water
  ["agri.water.water-cycle", "The water cycle and groundwater", "Cambridge only. The water cycle (evaporation, transpiration, condensation, precipitation, infiltration, runoff, groundwater flow) and its significance for agriculture, and groundwater resources (aquifers, water table, wells and boreholes)."],
  ["agri.water.conservation-harvesting", "Water conservation and rainwater harvesting", "ZIMSEC only. The importance of conserving water, methods of conserving water on arable land (mulching, tied ridges, potholes, infiltration pits, weed control, reducing evaporation), rainwater harvesting from roofs and land surfaces, storage (tanks, weirs, small dams) and ground-water sources (wells, boreholes, springs)."],
  ["agri.water.drainage-leaching", "Soil drainage, waterlogging and leaching", "How water is lost from the soil (evaporation, transpiration, runoff, drainage), drainage as the downward movement of gravitational water, causes and effects of waterlogging on root respiration, soil organisms and crop growth, methods of improving drainage (open ditches, tile and mole drains, ridging), and leaching of nutrients: causes, effects and control."],
  ["agri.water.irrigation-need-sources", "The need for irrigation and sources of irrigation water", "Why irrigation is needed (unreliable rainfall, dry season and winter cropping, higher yields and quality), sources of irrigation water (rivers, dams, boreholes, wells, springs) and water quality for irrigation (salts, silt, pollution) and how it is tested. Methods are in agri.water.irrigation-methods."],
  ["agri.water.irrigation-methods", "Methods of irrigation and choosing a system", "Surface irrigation (flood, basin, furrow), overhead (sprinkler, centre pivot), drip (trickle) and hand watering: how each works, advantages and disadvantages, effects on yield and quality, and factors in choosing a system (water supply, soil, slope, crop, cost, labour). Simple water quantity calculations (depth of water over an area). Irrigation equipment detail is in agri.water.irrigation-equipment."],
  ["agri.water.irrigation-equipment", "Irrigation equipment", "ZIMSEC only. Irrigation equipment and its functions: pipes and fittings, valves, sprinklers and risers, drip lines and emitters, filters, siphons and gated pipes, and the assembly and care of equipment. Pumps are in agri.machinery.pumps-shellers."],
  ["agri.water.pollution-legislation", "Water pollution and water legislation", "ZIMSEC only. Causes of water pollution from agriculture and other sources (fertiliser and pesticide runoff, eutrophication, siltation, sewage, mining), its effects on agricultural production, ways of reducing it, and water management in Zimbabwe: water rights and permits, catchment councils and the Zimbabwe National Water Authority (ZINWA), described in general terms."],
  // Plants
  ["agri.plants.classification", "Classification of crop plants", "Classifying crop plants by the part eaten (leaf, root, tuber, bulb, fruit, stem, seed), by life cycle (annual, biennial, perennial), as monocotyledons or dicotyledons, and by botanical family (legumes, brassicas, solanaceous crops, cereals or grasses, cucurbits), and the main types of crops grown locally (cereals, legumes, roots and tubers, fruits) and their products."],
  ["agri.plants.roots-stems-leaves", "Structure of roots, stems and leaves", "External parts of a flowering plant and their functions; the distribution and function of tissues in a root (root hairs, cortex, xylem, phloem), a dicotyledonous stem and a leaf (epidermis, palisade and spongy mesophyll, stomata, veins), and how leaf structure suits photosynthesis (no cellular detail)."],
  ["agri.plants.water-uptake-transpiration", "Water and mineral uptake and transpiration", "Diffusion, osmosis, active uptake and imbibition; absorption of water and mineral salts by root hairs and their movement through the xylem; transpiration, the transpiration stream and the role of stomata; the effects of temperature, humidity, wind and light intensity on the rate of transpiration; and wilting."],
  ["agri.plants.photosynthesis", "Photosynthesis", "Photosynthesis in terms of carbon dioxide, water, light and chlorophyll producing carbohydrates and oxygen; the word and balanced chemical equation; gas exchange by diffusion through the stomata; experiments showing the need for light, carbon dioxide and chlorophyll; factors that affect the rate and their use in crop production."],
  ["agri.plants.translocation-storage", "Translocation and food storage organs", "Translocation of synthesised food in the phloem (demonstrated by ring-barking), modification of roots, stems and leaves into storage organs (tubers, bulbs, corms, tap roots), and the foods stored (starch, sugars, oils, proteins) in named crops."],
  ["agri.plants.respiration-tropisms", "Respiration and tropisms in plants", "ZIMSEC only. Aerobic and anaerobic respiration (word and chemical equation for aerobic respiration, sites, importance, comparison with photosynthesis) and plant tropisms (responses to light, gravity, water and touch), their demonstration by experiment and their importance in crop growth."],
  ["agri.plants.flowers-pollination", "Flowers, pollination, fertilisation and dispersal", "Sexual reproduction; the structure and functions of the parts of a maize flower (tassel and silk) and a bean flower; self- and cross-pollination of maize and bean; fertilisation in a named plant; seed and fruit formation; and the dispersal of seeds and fruits and its importance in weed spread and control."],
  ["agri.plants.asexual-propagation", "Asexual reproduction and vegetative propagation", "Asexual reproduction from stem tubers (Irish potato, yam), stem cuttings (sweet potato, cassava, sugar cane), runners, bulbs, layering, budding and grafting, and the advantages and disadvantages of sexual and asexual reproduction in crop production."],
  ["agri.plants.germination", "Seeds and germination", "External and internal structure of maize and bean seeds, the conditions needed for germination (water, oxygen, suitable temperature), germination compared with emergence, epigeal and hypogeal germination, germination tests and percentage germination."],
  // Crop production
  ["agri.crops.vegetables", "Horticulture and vegetable production", "ZIMSEC only. Branches of horticulture (olericulture, pomology, floriculture) and their importance; seedbed and nursery preparation, transplanting, spacing and management of vegetable crops grown from leaves, roots, legumes, bulbs, tubers and fruits (for example rape, cabbage, carrots, onions, tomatoes, beans), and marketing vegetables."],
  ["agri.crops.orchards", "Orchard establishment and fruit production", "ZIMSEC only. Site selection, land preparation, planting patterns, pegging, preparing planting holes, planting and managing fruit trees (deciduous fruits such as apples and grapes, tropical fruits such as bananas, guavas and mangoes, citrus such as oranges and naartjies), fertiliser quantities for orchard crops, irrigation scheduling, pruning, fire guards, signs of maturity and marketing."],
  ["agri.crops.land-preparation", "Land preparation and tillage", "Reasons for land preparation, stumping and clearing, primary tillage (ploughing, digging) and secondary tillage (harrowing, raking, ridging), seedbed preparation, the tillage implements and tools used, and minimum or zero tillage compared with conventional tillage."],
  ["agri.crops.conservation-agriculture", "Conservation agriculture (Pfumvudza/Intwasa)", "The three principles of conservation agriculture (minimum soil disturbance, permanent soil cover with mulch, crop rotation or association), planting basins and precision application of manure and fertiliser, timely planting and weeding, and the Pfumvudza/Intwasa programme as Zimbabwe's smallholder conservation-agriculture approach (introduced in 2020), with benefits and limitations. No programme statistics."],
  ["agri.crops.maize", "Maize production", "Maize grown in detail as a crop of local importance: soil and climatic requirements, land preparation, choice of hybrid and open-pollinated cultivars by maturity group and natural region, planting time and method, seed rate, spacing and plant population, basal and top-dressing fertiliser rates and calculations, weed, pest (stalk borer, fall armyworm) and disease (maize streak virus, grey leaf spot) control, signs of maturity, harvesting, shelling, yield, storage and records."],
  ["agri.crops.other-cereals", "Small grains and wheat: sorghum, millets and wheat", "Production of sorghum, pearl millet and finger millet (drought tolerance, suitability for natural regions IV and V, bird damage, uses) and of wheat as an irrigated winter crop: requirements, planting, seed rates, fertiliser, management, harvesting and storage, compared with maize."],
  ["agri.crops.legumes", "Legume crops: groundnuts, soya beans and field beans", "Production of groundnuts, soya beans and field (sugar) beans: soil and climatic requirements, seed treatment and Rhizobium inoculation, planting, seed rates and spacing, fertiliser (little nitrogen; gypsum for groundnuts), weed, pest and disease control, signs of maturity, harvesting, drying, storage, marketing and the value of legumes in rotations."],
  ["agri.crops.cotton-tobacco", "Cash crops: cotton and tobacco", "Cambridge only (a crop of local importance in Zimbabwe). Cotton and flue-cured tobacco as cash crops: requirements, seedbeds and transplanting (tobacco), planting, fertiliser, topping and suckering (tobacco), main pests such as the American bollworm, aphids and red spider mite, harvesting (picking cotton; reaping and curing tobacco), grading and marketing through contract or auction systems, described in general terms without statistics."],
  // Crop protection
  ["agri.protection.pests", "Crop pests: groups, life cycles and named pests", "Effects of pests on crops; classification by feeding habit (biting and chewing, piercing and sucking, boring) with examples; complete and incomplete metamorphosis; the life cycle, damage and spread of named pests (for example termites, locusts, fall armyworm, aphids, maize stalk borer, American bollworm Helicoverpa armigera, grain weevils); scouting. Control methods are in agri.protection.pest-control."],
  ["agri.protection.pest-control", "Pest control methods and integrated pest management", "Cultural (rotation, catch and trap crops, timely planting, field hygiene), physical and mechanical, biological, biotechnical (pheromone traps, resistant varieties) and chemical control; contact, systemic and stomach pesticides and fumigants and how they act (generic groups only, no brand names); advantages and disadvantages of each method; integrated pest management (IPM)."],
  ["agri.protection.diseases", "Plant diseases: causes, spread and control", "Classification of plant diseases by causal organism (fungi, bacteria, viruses), effects, general symptoms, modes of infection and spread (wind, water, insect vectors, seed, soil, tools), and the prevention and control of one named disease from each group (for example a fungal disease such as grey leaf spot or rust, a bacterial disease such as bacterial wilt, a viral disease such as maize streak virus or tobacco mosaic virus); fungicides by type, resistant varieties, rotation and hygiene."],
  ["agri.protection.weeds", "Weeds: effects, classification and spread", "Harmful and beneficial effects of weeds, classification (annual and perennial; grasses, sedges and broad-leaved weeds; parasitic weeds such as witchweed), named local weeds (for example blackjack, couch grass, nut grass, witchweed) and their modes of spread. Weed control is in agri.protection.weed-control."],
  ["agri.protection.weed-control", "Weed control and herbicides", "Cultural, mechanical and chemical weed control; herbicides classified as selective or non-selective, contact or systemic (translocated), and by timing (pre-plant, pre-emergence, post-emergence), named by type only; comparing the effectiveness and costs of methods."],
  ["agri.protection.agrochemicals", "Safe use of agro-chemicals and knapsack sprayers", "Safe handling of farm chemicals: protective clothing, reading labels and toxicity classes, correct dilution and mixing (mixing-ratio calculations), precautions before, during and after application, cleaning sprayers without polluting water, disposal of containers and safe storage of toxic and flammable chemicals and fuels; parts, use, maintenance and calibration of a knapsack sprayer."],
  // Livestock production
  ["agri.livestock.types", "Types of livestock and their importance", "ZIMSEC only. Types of livestock (poultry, fish, ruminants and non-ruminants), identifying ruminants (cattle, sheep, goats) and non-ruminants (pigs, horses, donkeys, rabbits, poultry), the importance of livestock and their products and by-products. Digestion is in agri.livestock.digestion."],
  ["agri.livestock.digestion", "Digestion in ruminants and non-ruminants", "Structure and functions of the digestive systems of a ruminant (rumen, reticulum, omasum, abomasum, rumination, microbial fermentation) and a non-ruminant (pig and the fowl with crop and gizzard), the processes of digestion and absorption (no enzyme names), and the differences between them."],
  ["agri.livestock.reproduction", "Reproductive systems of farm mammals", "Structure and functions of the male and female reproductive systems of a named farm mammal (a ruminant such as the cow), the oestrous cycle and signs of heat, mating and fertilisation, and gestation. Birth and care of the young are in agri.livestock.birth-young-stock."],
  ["agri.livestock.birth-young-stock", "Birth, lactation and rearing young stock", "Signs of approaching birth, parturition and assistance at birth in a named farm mammal, colostrum and its importance, lactation, weaning, and the care and rearing of young stock (calves, kids, lambs, piglets): navel care, identification, feeding, castration and dehorning at the right age."],
  ["agri.livestock.poultry-reproduction", "Reproduction in poultry and the egg", "ZIMSEC only. The reproductive systems of the cock and hen, egg formation in the oviduct, the parts of an egg and their functions."],
  ["agri.livestock.broilers", "Broiler production", "Importance of broilers, breeds and strains, housing and brooders (deep litter, temperature, space, ventilation), feeding (starter, grower, finisher), brooding and rearing from day-old to slaughter, weighing and growth curves, feed conversion ratio, physical and financial records, slaughtering and dressing (dressing percentage calculation), marketing, and profit or loss for a batch."],
  ["agri.livestock.layers-indigenous", "Layers and indigenous chickens", "ZIMSEC only. Layer breeds, housing (deep litter, cages), feeding (chick, grower, layer mash), lighting, egg collection and grading, culling and off-layers; indigenous chickens (hardiness, free-range and semi-intensive systems, broodiness); slaughtering off-layers or indigenous chickens, preparing eggs for market, and production and financial records."],
  ["agri.livestock.rabbits", "Rabbit production", "ZIMSEC only. Rabbit breeds (meat and fur), hutches and siting, feeding, mating, kindling and nest boxes, care of young, management practices, slaughtering, dressing, preparing pelts and marketing, and records."],
  ["agri.livestock.pigs", "Pig production", "Pig breeds (for example Large White, Landrace, Duroc), housing systems, feeding at each stage, breeding (heat, service, gestation), farrowing, care of piglets (teeth clipping, iron injection, castration, weaning), fattening for pork and bacon, common health problems and records."],
  ["agri.livestock.donkeys", "Donkey rearing", "ZIMSEC only. Uses and breeds of donkeys, housing, feeding, breeding, care of foals, training and management of working donkeys (hoof care, harness sores, workload) and their welfare. Harnesses are in agri.machinery.harnesses."],
  ["agri.livestock.beef-cattle", "Beef cattle production", "Exotic and indigenous beef breeds in Zimbabwe (for example Mashona, Nkone, Tuli, Brahman, Hereford, Simmental) and their characteristics, breeding and calving seasons, management practices (identification by branding and ear-tagging, dehorning, castration, dipping, dosing, weaning), feeding on veld and pen fattening, and records."],
  ["agri.livestock.dairy-cattle", "Dairy cattle production", "Dairy breeds (for example Holstein-Friesian, Jersey) and their characteristics, housing, feeding for milk production, milking routine and clean milk production, mastitis prevention, care of the dry cow and replacement heifers, and milk records."],
  ["agri.livestock.goats-sheep", "Goat and sheep production", "Exotic and indigenous goat and sheep breeds (for example Matebele goat, Boer goat, Saanen, Sabi sheep, Dorper) and their characteristics, housing, browsing and grazing, breeding, kidding and lambing, management practices (identification, castration, hoof trimming, dipping and dosing) and marketing."],
  // Livestock nutrition
  ["agri.nutrition.nutrients", "Livestock nutrients", "Carbohydrates, fats and oils, proteins, minerals (for example calcium, phosphorus, iron), vitamins and water: their functions, sources in feeds, deficiency symptoms in livestock, simple food tests and the importance of an adequate clean water supply."],
  ["agri.nutrition.feedstuffs", "Feedstuffs: roughages and concentrates", "Classification of feedstuffs into roughages (hay, silage, crop residues, grazing) and concentrates (energy and protein concentrates), straight and compound feeds, the feedstuffs suited to each class of livestock, and making hay and silage."],
  ["agri.nutrition.rations", "Rations: maintenance, production and the Pearson square", "Balanced rations suited to the age and stage of production, maintenance and production rations, calculating ration quantities, mixing feeds to a target crude protein with the Pearson square, feeding practices, and feed conversion ratio."],
  // Livestock health
  ["agri.health.signs-of-health", "Signs of health and ill-health in livestock", "Defining animal health; signs of health and ill-health in behaviour, appetite, coat, eyes, droppings, posture, production, temperature, pulse and respiration (approximate normal values labelled as approximate), and observing and comparing animals."],
  ["agri.health.disease-hygiene", "Causes and spread of livestock diseases and hygiene", "Causes of disease (pathogens: bacteria, viruses, protozoa, fungi; parasites; poor nutrition; injuries; poisoning), ways infectious and contagious diseases spread (contact, vectors, contaminated feed and water, air, equipment), and prevention and control through hygiene, sanitation, isolation of sick animals, quarantine, disinfection and good management."],
  ["agri.health.notifiable-immunity", "Notifiable diseases, immunity and vaccination", "Notifiable (scheduled) diseases and why they must be reported; signs and control of named examples from each group: anthrax (bacterial), foot-and-mouth disease and Newcastle disease (viral), trypanosomiasis (protozoan); movement control, vaccination and the role of veterinary services and animal health law (named in general terms); natural and artificial, active and passive immunity, including colostrum."],
  ["agri.health.external-parasites", "External parasites of livestock", "Ticks (one-host and multi-host life cycles, tick-borne diseases named in general terms), lice, mites, fleas and biting flies: damage, signs, and prevention and control (dipping, spraying, pour-ons, hand dressing, pasture spelling), with a described life cycle of one tick."],
  ["agri.health.internal-parasites", "Internal parasites of livestock", "Roundworms, tapeworms and liver fluke: the life cycle of a roundworm described in words, symptoms, the damage they cause, and prevention and control (dosing, rotational grazing, hygiene, controlling intermediate hosts such as snails)."],
  // Breeding
  ["agri.breeding.cell-division", "Cell division: mitosis and meiosis", "ZIMSEC only. Chromosomes in the nucleus, the stages of mitosis and meiosis in outline, the differences between them and their importance in growth and in producing gametes, and how the environment affects the expression of genes. Inheritance is in agri.breeding.monohybrid."],
  ["agri.breeding.monohybrid", "Monohybrid inheritance", "Chromosome, gene, allele, homozygous, heterozygous, dominant, recessive, genotype and phenotype; genetic diagrams for monohybrid crosses giving 3:1 and 1:1 ratios; the test cross; predicting results; and the importance of genotype and phenotype in animal and plant breeding."],
  ["agri.breeding.crop-improvement", "Crop improvement and hybrid maize", "Why crops are bred (yield, disease resistance, hardiness, quality), artificial selection, open and controlled pollination, heterosis (hybrid vigour), producing single-cross, double-cross and three-way hybrids of maize, why hybrid seed must be bought each season, and the difference between selective crop breeding and genetically modified crops."],
  ["agri.breeding.livestock-breeding", "Livestock breeding and artificial insemination", "Why livestock are bred, effects of the environment on breeding, selecting animals for breeding (performance, records, conformation), artificial selection, systems of breeding (inbreeding, line breeding, cross-breeding, upgrading) with advantages and disadvantages, and the benefits and limitations of artificial insemination."],
  // Pasture (Cambridge only)
  ["agri.pasture.vegetation-establishment", "Grazing land vegetation and improved pastures", "Cambridge only. The vegetation of grazing lands (grasses, legumes and browse) and its value to livestock, and how improved pastures are established (land preparation, choice of grass and legume species, sowing, fertilising, weed control and first grazing)."],
  ["agri.pasture.grazing-management", "Grazing systems, stocking rate and veld management", "Cambridge only. Rotational grazing, paddock grazing, zero grazing, enclosed and unenclosed, intensive and extensive grazing systems; stocking rate and carrying capacity (with calculations), the dangers of overstocking, bush control and the use and misuse of fire; how fencing and rotational grazing improve pasture use."],
  // Farm machinery and tools
  ["agri.machinery.tillage-implements", "Tillage implements: parts, adjustment and maintenance", "Mouldboard plough (parts and their functions), disc plough, cultivator, harrow, planter and ridger (ox-, donkey- or tractor-drawn): their uses, adjusting depth and width of cut, and routine maintenance and storage."],
  ["agri.machinery.mechanisation", "Farm mechanisation", "Cambridge only. Advantages and disadvantages of farm mechanisation (timeliness, labour, cost, soil compaction, unemployment), animal draught compared with tractors, and choosing the level of mechanisation for a farm."],
  ["agri.machinery.hand-tools", "Farm tools: use and maintenance", "Cambridge only. Use, safe handling and maintenance of the saw, hammer, screwdriver, file, spanner, sprayers and hand tools for cultivation (hoe, spade, fork, rake, pick, slasher). Knapsack sprayer calibration is in agri.protection.agrochemicals."],
  ["agri.machinery.harnesses", "Harnesses for draught animals", "ZIMSEC only. Types of yokes (head and withers yokes) and their parts, breast-band and collar harnesses, the characteristics of wood and other materials used, making simple harnesses from local materials and harnessing cattle and donkeys correctly."],
  ["agri.machinery.pumps-shellers", "Appropriate technology: irrigation pumps and shellers", "ZIMSEC only. Parts and working principles of hand-operated and power-driven irrigation pumps (for example treadle, piston and centrifugal pumps) and their routine maintenance; parts, functions and operating principles of maize and groundnut shellers and their correct use."],
  // Farm structures
  ["agri.structures.fencing", "Fences: types, materials and treatment", "Purposes of fencing; types of fence (barbed wire, plain wire, woven or mesh, electric, live hedges and windbreaks) and their uses; fencing materials and tools; treating wooden posts against rot and termites and protecting metal (preservative types, no brand names); advantages and disadvantages of materials. Construction is in agri.structures.fence-construction."],
  ["agri.structures.fence-construction", "Fence construction, anchors and fencing calculations", "Fence specifications (spacing of posts and strands), methods of constructing a fence, anchors and straining posts (types with advantages and disadvantages), maintenance, and calculating the posts, droppers and wire needed for a given perimeter and their cost."],
  ["agri.structures.farm-buildings", "Farm buildings and livestock housing", "Properties (durability, strength, fire, termite and temperature resistance, cost) and uses of wood, concrete blocks, bricks, stone, metal, earth and thatch; requirements of suitable livestock housing (ventilation, drainage, space, light, hygiene, security); designing and drawing plans of livestock buildings and calculating their costs and cost effectiveness."],
  ["agri.structures.farm-roads", "Farm roads", "ZIMSEC only. Factors in siting a farm road, siting equipment, features of a well-sited road and their dimensions (camber, side drains, mitre drains, culverts), materials and construction, and the repair and maintenance of farm roads."],
  ["agri.structures.water-supply", "Farm water supplies", "Cambridge only. Sources of water for people, livestock and irrigation, water treatment by settling and filtration, constructing storage dams that resist water pressure (which increases with depth), storage tanks, distributing water through pipes and simple plumbing (joining plastic pipe, fitting tap washers)."],
  // Agri-business
  ["agri.business.farm-records", "Farm records", "Importance of farm records; physical records (diary of events, inventory, production, livestock, crop and labour records) and financial records (receipts, cash book); keeping records for a school agricultural project."],
  ["agri.business.profit-loss", "Profit and loss account for a farm enterprise", "ZIMSEC only. Income and expenditure of a farm enterprise, the functions of a profit and loss account, and preparing a simple profit and loss account and calculating profit or loss for a school or farm enterprise."],
  ["agri.business.economic-principles", "Farm choices, opportunity cost, demand, supply and price", "Opportunities in the agriculture industry, the factors influencing farmers' choices of enterprises, opportunity cost, the laws of demand and supply, interpreting demand and supply schedules and curves (described in words and tables), and how the market price of agricultural commodities is determined."],
  ["agri.business.diminishing-returns", "The law of diminishing returns", "The law of diminishing returns, interpreting it from tables and graphs of input and output (total, average and marginal product), and its implications for decisions on fertiliser, feed, labour and other inputs in agriculture."],
  ["agri.business.risk-decisions", "Risk, uncertainty and decision making in farming", "The difference between risk and uncertainty, risks farmers face (weather, pests and diseases, prices, theft, policy), ways of reducing their effects (diversification, insurance, irrigation, contracts, savings), the importance of decision making, economic factors in decisions and the steps in making a farm decision."],
  ["agri.business.budgets", "Farm budgets and gross margins", "ZIMSEC only. The importance of budgeting in farming, sources of information, calculating the gross margin of an enterprise (gross output minus variable costs, per hectare or per head), and preparing partial and whole-farm budgets."],
  ["agri.business.marketing", "Agricultural marketing", "ZIMSEC only. Functions of marketing (assembling, grading, processing and value addition, packaging, storage, transport, financing, selling) and factors affecting the marketing of farm produce; controlled and uncontrolled, formal and informal markets for major crops and livestock in Zimbabwe; and marketing legislation for agricultural produce (statutory marketing bodies and contract farming named in general terms, with how the rules have changed)."],
  ["agri.business.cooperatives", "Agricultural co-operatives", "ZIMSEC only. Principles of co-operatives, how a co-operative is formed, types of agricultural co-operatives (producer, marketing, supply, savings and credit), their benefits and the problems they face."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase. ZIMSEC: codes are ours (sub-topic code + .n). Cambridge: objective
// codes are the board's printed numbers (e.g. 2.3(a)), passed as [code, text].
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Agriculture, Forms 1-4, 2015-2022. Topic codes 5.1-5.6 are printed (5.0 Topics); sub-topic names are
// transcribed from the scope and sequence (6.0) and the competency matrix (7.0); sub-topic and objective codes are
// ours. The form in which each item is taught is given at the start of each objective.
const ZIMSEC_TOPICS = [
  topic("general", "5.1", "General Agriculture", {
    children: [
      sub("general.land-use", "5.1.1", "Land use", {
        covers: ["agri.land.land-use", "agri.land.land-tenure", "agri.land.farming-systems", "agri.land.farm-planning", "agri.land.crop-rotation"],
        objectives: [
          "Form 1: describe forms of land use, explain the factors that limit land use and identify protected areas in Zimbabwe.",
          "Form 1: explain land tenure and describe each tenure system (freehold, leasehold, communal, resettlement).",
          "Form 1: explain the importance of land as a national heritage, outline land ownership before, during and after colonial rule, and outline the resettlement models of the land reform programme.",
          "Form 2: explain the effects of population growth on land use.",
          "Form 2: describe farming systems such as mixed farming, monoculture and intercropping.",
          "Form 3: discuss the importance of physical farm planning and sketch a farm layout.",
          "Form 3: outline the principles of crop rotation, design a four-course rotation and discuss its advantages.",
        ],
      }),
      sub("general.environment", "5.1.2", "Environmental factors", {
        covers: ["agri.environment.climate-rainfall", "agri.environment.adverse-conditions", "agri.environment.disasters"],
        objectives: [
          "Form 1: outline the environmental factors (wind, light, temperature, rainfall, humidity) and their effects on agricultural activities.",
          "Form 1: explain water loss by evaporation and evapotranspiration, the causes and forms of wilting, frost damage and measures against adverse temperatures.",
          "Form 2: describe ways of reducing the effects of adverse environmental factors on agricultural activities.",
          "Form 3: describe the distribution, effectiveness, reliability and intensity of rainfall in Zimbabwe and their effects on agriculture.",
          "Form 4: explain the effects of natural disasters on agriculture and outline precautionary measures against them.",
        ],
      }),
      sub("general.natural-regions", "5.1.3", "Natural farming regions", {
        covers: ["agri.land.natural-regions"],
        objectives: [
          "Form 1: explain the importance of the natural farming regions of Zimbabwe (I to V).",
          "Form 1: describe the farming systems suited to each natural region.",
        ],
      }),
      sub("general.forestry", "5.1.4", "Forestry", {
        covers: ["agri.forestry.forests-trees", "agri.forestry.nursery-plantation", "agri.forestry.timber-deforestation"],
        objectives: [
          "Form 1: explain the social, economic, cultural and ecological importance of forests, identify major forests and name indigenous and exotic timber trees grown in Zimbabwe.",
          "Form 2: distinguish softwood from hardwood.",
          "Form 2: describe the choice of a nursery site, raise and manage tree seedlings, and establish and manage a tree plantation.",
          "Form 3: describe methods of harvesting trees and treating timber and identify markets for timber.",
          "Form 3: describe the causes and effects of deforestation, suggest solutions and explain the importance of afforestation and reforestation.",
          "Form 4: discuss the importance of agroforestry, identify its components and establish an agroforestry plot.",
        ],
      }),
      sub("general.wildlife", "5.1.5", "Wildlife", {
        covers: ["agri.wildlife.value-protection", "agri.wildlife.conservation-management"],
        objectives: [
          "Form 1: explain the socio-economic, cultural and ecological value of wildlife, identify flora and fauna of Zimbabwe, classify wildlife by feeding habits and name the big five.",
          "Form 2: explain sustainable methods of wildlife utilisation and identify specially protected plants and animals.",
          "Form 2: identify dangerous and problem animals in Zimbabwe and describe ways of dealing with them.",
          "Form 3: explain how cultural values, beliefs and the principles of conservation and preservation affect the management of natural resources and wildlife trade, describe the effects of poaching and discuss biodiversity and habitats.",
          "Form 4: discuss human and wildlife conflicts, explain wildlife legislation in Zimbabwe and discuss the roles of government, voluntary organisations and international conventions in wildlife management.",
        ],
      }),
    ],
  }),
  topic("soil-water", "5.2", "Soil and water", {
    children: [
      sub("soil-water.formation", "5.2.1", "Soil formation", {
        covers: ["agri.soil.formation-profile"],
        objectives: [
          "Form 1 and Form 3: discuss the forms of weathering (physical, chemical and biological) and how soil forms from rock.",
          "Form 2: describe the soil profile, the appearance and composition of each horizon and its significance to crop growth (taught under 'Soil texture, structure and profile').",
        ],
      }),
      sub("soil-water.texture-structure", "5.2.2", "Soil texture, structure and profile", {
        covers: ["agri.soil.texture-structure"],
        objectives: [
          "Form 1: identify soil particles in order of size, explain the significance of soil texture and describe soil structure, distinguishing single-grain from crumb structure and structure from texture.",
          "Form 3: list the eight textural classes and determine the textural class of a soil using the textural triangle.",
          "Form 3: explain the importance of soil structure and the factors affecting it, and identify methods of improving and maintaining a good structure.",
        ],
      }),
      sub("soil-water.types", "5.2.3", "Soil types", {
        covers: ["agri.soil.types"],
        objectives: [
          "Form 2: identify sandy, loam and clay soils and compare their composition and properties.",
          "Form 3: describe methods of improving the physical characteristics of sandy and clay soils.",
        ],
      }),
      sub("soil-water.constituents", "5.2.4", "Soil constituents", {
        covers: ["agri.soil.constituents"],
        objectives: [
          "Form 3: describe the composition of an agriculturally viable soil and explain the importance of each component.",
          "Form 3: describe the types of soil water, explain the movement of water in soil and field capacity.",
          "Form 3: explain the roles of living organisms in the soil.",
        ],
      }),
      sub("soil-water.temperature", "5.2.5", "Soil temperature", {
        covers: ["agri.soil.temperature"],
        objectives: [
          "Form 3: explain the effects of soil temperature on plant growth and soil organisms and of extreme temperatures on stages of crop growth.",
          "Form 3: outline measures that reduce the effects of extreme soil temperatures.",
        ],
      }),
      sub("soil-water.fertility", "5.2.6", "Soil fertility", {
        covers: ["agri.soil.plant-nutrients", "agri.soil.organic-manures", "agri.soil.inorganic-fertilisers", "agri.soil.ph-liming", "agri.soil.nitrogen-cycle"],
        objectives: [
          "Form 1: explain the functions of major and minor plant nutrients and the effects of their under-supply and over-supply.",
          "Form 2: distinguish organic from inorganic fertilisers, describe the types of each and differentiate compound from straight fertilisers.",
          "Form 3: describe methods of fertiliser application, differentiate basal from top dressing and calculate fertiliser quantities for a given area.",
          "Form 3: explain the importance and principles of soil sampling and sample soil by at least one method.",
          "Form 3: describe how soil pH is tested and interpreted, discuss its influence on crops, identify types of lime and explain liming and how lime differs from fertiliser.",
          "Form 4: describe the nitrogen cycle.",
        ],
      }),
      sub("soil-water.erosion", "5.2.7", "Soil erosion and conservation", {
        covers: ["agri.soil.erosion", "agri.soil.conservation"],
        objectives: [
          "Form 1: identify the types of soil erosion and describe their causes, consequences, prevention and control.",
          "Form 3: describe methods of soil conservation on arable and grazing land and the construction of basic conservation structures to standard dimensions.",
        ],
      }),
      sub("soil-water.drainage", "5.2.8", "Water loss and soil drainage", {
        covers: ["agri.water.drainage-leaching"],
        objectives: [
          "Form 1: outline the causes of water loss from the soil (listed in the scope and sequence).",
          "Form 3: describe drainage and waterlogging, explain the effects of waterlogged soils on crop growth and describe methods of improving drainage.",
          "Form 3: explain the causes of leaching and its effect on plant nutrients, and describe methods of controlling it.",
        ],
      }),
      sub("soil-water.conservation", "5.2.9", "Water conservation", {
        covers: ["agri.water.conservation-harvesting", "agri.water.pollution-legislation"],
        objectives: [
          "Form 1: explain the importance of water conservation and describe methods of conserving water on arable land.",
          "Form 3: describe methods of harvesting and storing rain water and different ground-water sources.",
          "Form 4: explain the causes and effects of water pollution on agricultural production and discuss ways of reducing it.",
          "Form 4: discuss water use legislation and water management in Zimbabwe.",
        ],
      }),
      sub("soil-water.irrigation", "5.2.10", "Irrigation", {
        covers: ["agri.water.irrigation-need-sources", "agri.water.irrigation-methods", "agri.water.irrigation-equipment"],
        objectives: [
          "Form 2: discuss the importance of irrigation, list sources of irrigation water and determine the suitability of water for irrigation.",
          "Form 3: describe and explain methods and types of irrigation with their advantages and disadvantages, and discuss the factors affecting the choice of a system.",
          "Form 4: identify irrigation equipment and describe its structure and functions.",
        ],
      }),
    ],
  }),
  topic("crops", "5.3", "Crop husbandry", {
    description: "The scope and sequence page for this topic is misprinted in the source (it repeats the Soil and water table), so the sub-topics and their forms are read from the competency matrix only.",
    children: [
      sub("crops.classification", "5.3.1", "Classification of plants", {
        covers: ["agri.plants.classification"],
        objectives: [
          "Form 1: classify plants according to the part eaten and their life cycle (annual, biennial, perennial).",
          "Form 2: differentiate monocotyledonous from dicotyledonous plants and state the botanical classes of crops (legumes, brassicas, solanaceous crops, cereals, cucurbits).",
        ],
      }),
      sub("crops.structure", "5.3.2", "Structure of flowering plants", {
        covers: ["agri.plants.roots-stems-leaves"],
        objectives: [
          "Form 1: identify the external parts of a flowering plant and state the function of each.",
          "Form 2: draw and label maize and bean flowers and state the functions of the flower parts.",
          "Form 3: identify the tissues in the internal structure of a root, stem and leaf and explain their functions.",
        ],
      }),
      sub("crops.processes", "5.3.3", "Plant processes", {
        covers: ["agri.plants.flowers-pollination", "agri.plants.asexual-propagation", "agri.plants.germination", "agri.plants.water-uptake-transpiration", "agri.plants.photosynthesis", "agri.plants.translocation-storage", "agri.plants.respiration-tropisms"],
        objectives: [
          "Form 2: differentiate sexual from asexual reproduction, state their advantages and disadvantages, describe pollination of maize and bean flowers and fertilisation, and explain methods of asexual reproduction.",
          "Form 2: state the requirements for germination, differentiate germination from emergence and identify the parts of maize and bean seeds.",
          "Form 3: describe the absorption of water by osmosis and by seeds, nutrient uptake by active uptake, the transpiration stream, the role of stomata, wilting and the factors affecting transpiration.",
          "Form 3: describe photosynthesis and state its word and chemical equations.",
          "Form 3: explain translocation, identify plant food storage organs and state the nature of the food stored.",
          "Form 4: state the equation for aerobic respiration, distinguish aerobic from anaerobic respiration, identify its sites and importance, and compare respiration with photosynthesis.",
          "Form 4: describe and demonstrate plant tropisms and evaluate their importance.",
        ],
      }),
      sub("crops.improvement", "5.3.4", "Crop improvement", {
        covers: ["agri.breeding.crop-improvement"],
        objectives: [
          "Form 3: state the importance of crop breeding, explain heterosis and differentiate open from controlled pollination.",
          "Form 3: state the three types of maize hybrid and describe how single, double and three-way hybrids are produced.",
        ],
      }),
      sub("crops.production", "5.3.5", "Crop production", {
        covers: ["agri.crops.vegetables", "agri.crops.orchards", "agri.crops.land-preparation", "agri.crops.conservation-agriculture", "agri.crops.maize", "agri.crops.other-cereals", "agri.crops.legumes"],
        objectives: [
          "Form 1: identify the branches of horticulture and explain their importance.",
          "Form 1: state the reasons for land preparation, prepare seedbeds, and establish, manage and market vegetable crops (one each of leaf, root, legume, bulb, tuber and fruit crops) at recommended spacing.",
          "Form 2: explain site selection, land preparation and planting patterns for an orchard, prepare planting holes and plant fruit trees, calculate fertiliser amounts for orchard crops, design an irrigation schedule, explain pruning, prepare fire guards, identify signs of maturity and market fruit.",
          "Form 3: state the reasons for land preparation, describe its steps, primary and secondary tillage, and conservation or minimum tillage techniques.",
          "Form 3: grow one cereal (maize, sorghum or wheat) and one legume (groundnuts, field beans or soya beans) using suitable cultivars and seed rates, carry out management practices, harvest, store and market the crops.",
        ],
      }),
      sub("crops.protection", "5.3.6", "Crop protection", {
        covers: ["agri.protection.pests", "agri.protection.pest-control", "agri.protection.diseases", "agri.protection.weeds", "agri.protection.weed-control", "agri.protection.agrochemicals"],
        objectives: [
          "Form 1: explain the effects of pests on crops and classify pests by feeding habits.",
          "Form 1: classify plant diseases by causal organism and describe their effects on crops.",
          "Form 1: discuss the harmful and beneficial effects of weeds and differentiate annual from perennial weeds.",
          "Form 2: describe one pest with complete metamorphosis and one with incomplete metamorphosis.",
          "Form 2: discuss how plant diseases spread and identify the general symptoms of fungal, bacterial and viral diseases.",
          "Form 2: classify weeds as grasses, sedges and broad-leaved weeds and identify how common weeds spread.",
          "Form 3: explain methods of pest control with their advantages and disadvantages, the significance of integrated pest management and the mode of action of the main groups of pesticides.",
          "Form 3: describe methods of disease control and identify suitable chemicals for controlling crop diseases.",
          "Form 3: describe methods of weed control, differentiate herbicides as selective or non-selective and by timing of application, compare the effectiveness of methods and calibrate a knapsack sprayer.",
          "Form 4: explain precautions in using and storing agro-chemicals, describe their toxicity levels, calculate mixing ratios and label the parts of a knapsack sprayer.",
        ],
      }),
    ],
  }),
  topic("animals", "5.4", "Animal husbandry", {
    children: [
      sub("animals.types", "5.4.1", "Types of livestock", {
        covers: ["agri.livestock.types"],
        objectives: [
          "Form 1: name types of livestock, explain their importance and list their products and by-products.",
          "Form 2: identify ruminant and non-ruminant animals and distinguish between them.",
        ],
      }),
      sub("animals.anatomy", "5.4.2", "Anatomy and physiology", {
        covers: ["agri.livestock.poultry-reproduction", "agri.livestock.digestion", "agri.livestock.reproduction"],
        objectives: [
          "Form 2: draw and label the reproductive systems of a hen and a cock, describe egg formation and state the functions of the parts of an egg.",
          "Form 3: identify the parts of the digestive systems of a ruminant and a non-ruminant, explain their functions and distinguish between the two systems.",
          "Form 4: identify, draw and label the parts of the male and female reproductive systems of a ruminant and explain their functions.",
        ],
      }),
      sub("animals.nutrition", "5.4.3", "Animal nutrition", {
        covers: ["agri.nutrition.nutrients", "agri.nutrition.feedstuffs", "agri.nutrition.rations"],
        objectives: [
          "Form 2: name the main livestock nutrients, explain their functions, describe deficiency symptoms and identify their sources.",
          "Form 3: classify feedstuffs and identify the feedstuffs for each class of livestock.",
          "Form 4: calculate maintenance and production rations (including the Pearson square) and prepare rations for ruminants and non-ruminants.",
        ],
      }),
      sub("animals.small-livestock", "5.4.4", "Small livestock production", {
        covers: ["agri.livestock.broilers", "agri.livestock.layers-indigenous", "agri.livestock.rabbits"],
        objectives: [
          "Form 1: explain the importance of broilers, state broiler breeds, describe their housing requirements and rear broilers.",
          "Form 2: select feeds for broilers from day-old to slaughter, assess growth rates and keep physical and financial records.",
          "Form 2: slaughter and dress broilers, calculate the dressing (killing-out) percentage and identify markets.",
          "Form 3: for rabbits, layers or indigenous chickens: identify breeds, choose a housing site, design and construct housing, describe nutritional requirements and manage the young.",
          "Form 4: slaughter and dress rabbits, off-layers or indigenous chickens, prepare pelts or eggs for market and compile financial and production records.",
        ],
      }),
      sub("animals.non-ruminants", "5.4.5", "Non-ruminants", {
        covers: ["agri.livestock.pigs", "agri.livestock.donkeys"],
        objectives: ["Form 3: for pigs or donkeys: identify the breeds, describe housing systems and manage the animal to maturity."],
      }),
      sub("animals.ruminants", "5.4.6", "Ruminants", {
        covers: ["agri.livestock.beef-cattle", "agri.livestock.dairy-cattle", "agri.livestock.goats-sheep", "agri.livestock.birth-young-stock"],
        objectives: [
          "Form 4: list exotic and indigenous breeds of cattle, sheep or goats in Zimbabwe and describe their characteristics.",
          "Form 4: describe the management practices for cattle, sheep or goats, including the care of young stock.",
        ],
      }),
      sub("animals.health", "5.4.7", "Animal health", {
        covers: ["agri.health.signs-of-health", "agri.health.disease-hygiene", "agri.health.notifiable-immunity", "agri.health.external-parasites", "agri.health.internal-parasites"],
        objectives: [
          "Form 1: define animal health and distinguish healthy from unhealthy livestock.",
          "Form 2: explain the causes of diseases and their modes of transmission, justify hygiene and discuss methods of disease control.",
          "Form 3: recognise the signs of notifiable diseases (anthrax; foot-and-mouth or Newcastle disease; trypanosomiasis) and describe their control.",
          "Form 4: identify internal and external parasites and describe the life cycles of one tick and one roundworm, and their prevention and control.",
          "Form 4: explain the Animal Health Act and describe the types of immunity in livestock.",
        ],
      }),
      sub("animals.improvement", "5.4.8", "Animal improvement", {
        covers: ["agri.breeding.cell-division", "agri.breeding.monohybrid", "agri.breeding.livestock-breeding"],
        objectives: [
          "Form 3: explain the stages of mitosis and meiosis and outline the effects of the environment on genes.",
          "Form 4: explain the importance of breeding and the effects of the environment on breeding, distinguish cross-breeding from inbreeding, select animals for breeding and solve test-cross problems with genetic diagrams.",
        ],
      }),
    ],
  }),
  topic("structures", "5.5", "Farm structures and machinery", {
    children: [
      sub("structures.implements", "5.5.1", "Farm implements", {
        covers: ["agri.machinery.tillage-implements"],
        objectives: [
          "Form 1: list five tillage implements, draw and label a mouldboard plough and explain the functions of its parts.",
          "Form 2: adjust the depth and width of animal-drawn implements (plough, cultivator, harrow).",
          "Form 3: describe the routine maintenance of the plough, cultivator and harrow.",
        ],
      }),
      sub("structures.fencing", "5.5.2", "Fencing", {
        covers: ["agri.structures.fencing", "agri.structures.fence-construction"],
        objectives: [
          "Form 1: explain the reasons for fencing and identify different types of fences.",
          "Form 2: identify fencing materials and tools and discuss the advantages and disadvantages of fencing materials.",
          "Form 3: describe the treatment of wooden and metal fencing materials and the standard specifications for fencing (spacing of posts and strands).",
          "Form 4: explain the role of anchors and the advantages and disadvantages of different anchors, and determine the materials needed for a given perimeter.",
        ],
      }),
      sub("structures.buildings", "5.5.3", "Farm buildings", {
        covers: ["agri.structures.farm-buildings"],
        objectives: [
          "Form 3: identify materials used to construct farm buildings and describe their properties.",
          "Form 4: draw plans of livestock buildings, calculate construction costs and determine the cost effectiveness of materials.",
        ],
      }),
      sub("structures.roads", "5.5.4", "Farm roads", {
        covers: ["agri.structures.farm-roads"],
        objectives: [
          "Form 2: discuss the factors in siting a farm road, list siting equipment and describe a well-sited road.",
          "Form 3: describe the features of a farm road and their dimensions, and repair a farm road.",
          "Form 4: identify materials for road construction, describe the construction of a farm road and maintain farm roads.",
        ],
      }),
      sub("structures.technology", "5.5.5", "Appropriate technology", {
        covers: ["agri.machinery.pumps-shellers"],
        objectives: [
          "Form 3: identify the parts of a hand- or power-operated irrigation pump, discuss its working principles and describe its routine maintenance.",
          "Form 4: identify the parts of maize and groundnut shellers, explain their functions and operating principles.",
        ],
      }),
      sub("structures.harnessing", "5.5.6", "Harnessing", {
        covers: ["agri.machinery.harnesses"],
        objectives: [
          "Form 1: list and describe types of yokes, draw and label their parts and describe the wood used to make them.",
          "Form 2: differentiate breast-band from collar harnesses, label their parts, describe materials for harnesses and harness specific animals.",
        ],
      }),
    ],
  }),
  topic("business", "5.6", "Agri-business", {
    children: [
      sub("business.records", "5.6.1", "Farm records and accounts", {
        covers: ["agri.business.farm-records", "agri.business.profit-loss"],
        objectives: [
          "Form 1: describe the importance of farm records and differentiate physical from financial records.",
          "Form 2: explain the functions of a profit and loss account, identify the income and expenditure of a farm enterprise and prepare a profit and loss account.",
        ],
      }),
      sub("business.economics", "5.6.2", "Principles of economics", {
        covers: ["agri.business.economic-principles", "agri.business.diminishing-returns", "agri.business.risk-decisions"],
        objectives: [
          "Form 3: explain the opportunities available to the farmer, the factors influencing farmers' choices and the concept of opportunity cost.",
          "Form 3: describe the laws of demand and supply, interpret demand and supply schedules and curves and describe the determinants of market price for agricultural commodities.",
          "Form 4: explain and interpret the law of diminishing returns and describe its implications in agriculture.",
          "Form 4: distinguish risk from uncertainty, outline the risks in agriculture and explain ways of minimising their effects.",
          "Form 4: explain the importance of decision making, outline the economic factors influencing it and the steps in making a farm decision.",
        ],
      }),
      sub("business.budgeting", "5.6.3", "Farm budgeting", {
        covers: ["agri.business.budgets"],
        objectives: [
          "Form 3: explain the importance of budgeting and identify sources of information for budgeting.",
          "Form 3: calculate the gross margin of an enterprise and prepare partial and whole-farm budgets.",
        ],
      }),
      sub("business.marketing", "5.6.4", "Agricultural marketing", {
        covers: ["agri.business.marketing"],
        objectives: [
          "Form 2: distinguish controlled from uncontrolled markets and describe formal and informal markets for major crops and livestock in Zimbabwe.",
          "Form 3: explain the functions of marketing and state the factors affecting the marketing of agricultural produce.",
          "Form 4: explain the marketing legislation for agricultural produce and commodities.",
        ],
      }),
      sub("business.cooperatives", "5.6.5", "Agricultural co-operatives", {
        covers: ["agri.business.cooperatives"],
        objectives: [
          "Form 1: explain the principles of co-operatives, how they are formed and the types of agricultural co-operatives.",
          "Form 2: explain the benefits of agricultural co-operatives and identify their problems.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "agriculture",
  versionLabel: "2015-2022",
  family: "agriculture-o",
  title: "ZIMSEC O-Level Agriculture",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Agriculture Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Agriculture%20Forms%201-4.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their numbers (5.1 to 5.6) are transcribed from the topic list (5.0) of the Ministry's Agriculture Syllabus Forms 1 - 4 (2015 - 2022); sub-topic names come from the scope and sequence (6.0) and the competency matrix (7.0), and the form in which each item is taught from the matrix. Sub-topic and objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Agriculture Forms 1-4.pdf' (http://www.mopsemashwest.gov.zw/files/Agriculture%20Forms%201-4.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The cover prints 'Form 1 - 4', '2015-2022' and 'Revised 2015'. The competency-matrix tables come out of the rendering with their columns interleaved; objectives were read from the 'Objectives' column and cross-checked against the 'Content' column and the scope and sequence. Check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Defects in the source itself: the scope-and-sequence page headed 'Topic 3: Crop husbandry' (page 8) repeats the Soil and water table, so Crop husbandry sub-topics are read from the competency matrix only; the Form 1 'Soil formation' matrix page repeats the Form 1 Wildlife page, so Form 1 weathering is taken from the scope and sequence. The matrix has no Form 4 crop production entry: no cash crop (tobacco, cotton) is named, and crop production content is limited to vegetables (Form 1), orchards (Form 2) and one cereal and one legume (Form 3). Confirm with ZIMSEC whether cash crops are examined.",
    "Subject code: not printed in the syllabus document; confirm the ZIMSEC O-Level Agriculture subject code (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Agriculture examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (8.0) as read: continuous assessment 30% (projects, theory tests and practical tests; a project portfolio in each of Forms 1 to 4) and summative assessment 70%: Paper 1, 40 compulsory objective (multiple-choice) items, 1 hour, 40 marks, 20%; Paper 2, 2 hours, 100 marks, 35%, Section A six compulsory structured questions on the whole syllabus (60 marks; 10 marks each is our reading) and Section B six 20-mark questions, three on crop production and three on animal husbandry, of which candidates answer two, one from each; Paper 3, practical coursework marked by the teacher and moderated by ZIMSEC, 100 marks, 15% (the duration column prints '5 Terms'). Skills weighting printed: knowledge and understanding 40%, application 35%, practical skills and investigation 25%. The assessment text refers to 'animal science' throughout (an apparent copy from another syllabus).",
    "Where a matrix item sits under a different sub-topic from the closest concept, the concept is covered where most of its content is taught: the Form 2 soil profile objective (under 'Soil texture, structure and profile') is covered with soil formation; the Form 2 flower-structure objective (under 'Structure of flowering plants') is covered with pollination under 'Plant processes'; care of young stock is covered under 'Ruminants'. Water legislation (Form 4) is listed in the scope and sequence under Water conservation.",
    "Zimbabwe-specific items (land tenure and land reform, natural regions, Pfumvudza/Intwasa conservation agriculture, marketing legislation, wildlife legislation, ZINWA, CAMPFIRE) are taught with well-established facts only, neutrally and without disputed statistics. Conservation agriculture is covered under the Form 3 objective on conservation or minimum tillage.",
    "Not in this syllabus (taught in the family for Cambridge IGCSE only): organic production, hydroponics and GM crops as a topic, the water cycle, cotton and tobacco production, pasture establishment and grazing management, farm mechanisation, hand tools, and farm water supplies. Paper 3 coursework is not simulated.",
  ],
  overview: "The ZIMSEC O-Level Agriculture syllabus (Forms 1-4) is an applied science course with six topics: general agriculture (land use and tenure, environmental factors, natural farming regions, forestry and wildlife), soil and water (soil formation, properties and fertility, erosion and conservation, drainage, water conservation and irrigation), crop husbandry (plant classification, structure and processes, crop improvement, crop production and protection), animal husbandry (livestock types, anatomy, nutrition, small livestock, non-ruminants and ruminants, health and improvement), farm structures and machinery, and agri-business (records and accounts, principles of economics, budgeting, marketing and co-operatives). It is taught with Zimbabwean examples and practical projects.",
  assessmentOverview: "Continuous assessment (projects, theory and practical tests in Forms 1-4) carries 30%. The summative examination carries 70%: Paper 1 has 40 multiple-choice items (1 hour, 20%); Paper 2 (2 hours, 100 marks, 35%) has six compulsory structured questions in Section A (60 marks) and, in Section B, one 20-mark crop production question and one 20-mark animal husbandry question chosen from six; Paper 3 is practical coursework moderated by ZIMSEC (15%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory objective (multiple-choice) items on the whole syllabus.", durationMinutes: 60, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Structured questions", kind: "WRITTEN", description: "Section A: six compulsory structured questions on the whole syllabus (60 marks). Section B: six 20-mark questions, three on crop production and three on animal husbandry; candidates answer two, one from each.", durationMinutes: 120, maxMarks: 100, weightingPercent: 35 },
    { code: "3", name: "Paper 3: Coursework", kind: "COURSEWORK", description: "Practical coursework marked by the teacher and moderated by ZIMSEC (details from ZIMSEC).", maxMarks: 100, weightingPercent: 15 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Agriculture 0600, 2027-2028. Topic and subtopic numbers are printed; objective codes are the printed
// content letters, e.g. 2.3(a).
const C0600_TOPICS = [
  topic("general", "1", "General agriculture", {
    children: [
      sub("general.land-use", "1.1", "General principles of land use", {
        covers: ["agri.land.land-use", "agri.land.farming-systems", "agri.land.crop-rotation", "agri.land.farm-planning", "agri.environment.climate-rainfall"],
        objectives: [
          ["1.1(a)", "Describe forms of land use, including agricultural systems and practices (rotations, mixed farming, monoculture), forestry and aquaculture."],
          ["1.1(b)", "Describe and explain how topography, climate and other environmental factors limit land use in different areas."],
          ["1.1(c)", "Understand that population growth requires efficient land use and farm planning."],
        ],
      }),
      sub("general.economics", "1.2", "Principles of agricultural economics", {
        covers: ["agri.land.modern-production", "agri.business.economic-principles", "agri.business.diminishing-returns", "agri.business.risk-decisions"],
        objectives: [
          ["1.2(a)", "Describe organic production, hydroponics and GM crops and discuss the arguments for and against GM crops and organic production."],
          ["1.2(b)", "Explain supply and demand, diminishing returns, the opportunities and choices facing farmers and decision making based on economic factors."],
        ],
      }),
    ],
  }),
  topic("soil", "2", "Soil", {
    children: [
      sub("soil.formation", "2.1", "Soil formation", {
        covers: ["agri.soil.formation-profile"],
        objectives: [["2.1(a)", "Explain how soil forms from parent material by physical, chemical and biological weathering."]],
      }),
      sub("soil.types", "2.2", "Soil types, composition, texture and temperature", {
        covers: ["agri.soil.texture-structure", "agri.soil.types", "agri.soil.constituents", "agri.soil.temperature"],
        objectives: [
          ["2.2(a)", "Describe the soil profile: topsoil, subsoil and underlying material."],
          ["2.2(b)", "Describe soil texture in terms of sand, silt and clay particle sizes."],
          ["2.2(c)", "Understand soil structure: forming and keeping a good crumb structure, the role of humus and organic matter, and how oxidation of organic matter leads to capping and soil pans."],
          ["2.2(d)", "Describe sandy, loam and clay soils and their properties, including water-holding capacity and drainage."],
          ["2.2(e)", "Outline soil constituents: mineral matter, organic matter, air, water (gravitational, capillary, hygroscopic) and living organisms."],
          ["2.2(f)", "Understand how soil temperature affects plant growth, the dangers of excessive heat and frost, and how mulching and shading reduce extremes."],
        ],
      }),
      sub("soil.fertility", "2.3", "Soil fertility", {
        covers: ["agri.soil.plant-nutrients", "agri.soil.organic-manures", "agri.soil.inorganic-fertilisers", "agri.soil.ph-liming", "agri.soil.nitrogen-cycle"],
        objectives: [
          ["2.3(a)", "Explain the importance of nitrogen, phosphorus, potassium, calcium, magnesium and sulfur and describe the signs and effects of their deficiency."],
          ["2.3(b)", "Carry out soil sampling and soil pH tests."],
          ["2.3(c)", "Describe the nitrogen cycle and its importance to soil fertility."],
          ["2.3(d)", "Explain the importance of legumes, manure and compost in maintaining soil structure and fertility."],
          ["2.3(e)", "Describe the use of inorganic fertilisers (one mainly phosphorus, one mainly potassium and one compound fertiliser)."],
          ["2.3(f)", "Explain how fertilising and liming affect soil pH."],
        ],
      }),
      sub("soil.erosion", "2.4", "Soil erosion and soil conservation", {
        covers: ["agri.soil.erosion", "agri.soil.conservation", "agri.crops.conservation-agriculture"],
        objectives: [["2.4(a)", "Describe the types, causes and agents of soil erosion and its prevention and control."]],
      }),
      sub("soil.drainage-irrigation", "2.5", "Drainage and irrigation", {
        covers: ["agri.water.drainage-leaching", "agri.water.irrigation-need-sources", "agri.water.irrigation-methods"],
        objectives: [
          ["2.5(a)", "Describe drainage as the downward movement of gravitational water, the draining of waterlogged land by ditches and the loss of nutrients by leaching."],
          ["2.5(b)", "Understand the effects of poor drainage on soil organisms and root respiration."],
          ["2.5(c)", "Explain the need for irrigation and describe irrigation methods and their effects on crop yield and quality (no crop programmes or equipment specifications)."],
        ],
      }),
      sub("soil.water-cycle", "2.6", "Water cycle", {
        covers: ["agri.water.water-cycle"],
        objectives: [["2.6(a)", "Describe the water cycle and ground-water resources and their significance."]],
      }),
    ],
  }),
  topic("plants", "3", "Principles of plant growth", {
    children: [
      sub("plants.movement", "3.1", "Movement of materials through plants", {
        covers: ["agri.plants.roots-stems-leaves", "agri.plants.water-uptake-transpiration", "agri.plants.photosynthesis", "agri.plants.translocation-storage"],
        objectives: [
          ["3.1(a)", "Describe the distribution and function of root tissues and the structure and function of root hairs."],
          ["3.1(b)", "Explain the absorption of water and mineral salts by diffusion and osmosis and their passage through vascular tissue."],
          ["3.1(c)", "Explain how leaf structure is related to function (no cellular detail)."],
          ["3.1(d)", "Outline gas exchange by diffusion through stomata."],
          ["3.1(e)", "Describe photosynthesis in terms of carbon dioxide, water, light and chlorophyll producing carbohydrates and oxygen."],
          ["3.1(f)", "Describe the distribution and function of tissues in a dicotyledonous stem."],
          ["3.1(g)", "Define translocation and explain how plant parts are modified as food storage organs and the foods they store."],
          ["3.1(h)", "Explain transpiration: the transpiration stream, evaporation and diffusion of water vapour through stomata."],
          ["3.1(i)", "Describe the effects of temperature, humidity, wind and light intensity on transpiration."],
        ],
      }),
      sub("plants.reproduction", "3.2", "Reproduction in plants", {
        covers: ["agri.plants.flowers-pollination", "agri.plants.asexual-propagation"],
        objectives: [
          ["3.2(a)", "Define sexual reproduction."],
          ["3.2(b)", "Describe the structure and functions of maize and bean flowers."],
          ["3.2(c)", "Define pollination."],
          ["3.2(d)", "Describe fertilisation in a named plant."],
          ["3.2(e)", "Describe seed and fruit dispersal and explain its importance in weed control."],
          ["3.2(f)", "Describe asexual reproduction from stem tubers and stem cuttings."],
        ],
      }),
      sub("plants.germination", "3.3", "Germination", {
        covers: ["agri.plants.germination"],
        objectives: [["3.3(a)", "Describe seed structure and germination of maize and a legume and the conditions for germination."]],
      }),
    ],
  }),
  topic("crops", "4", "Crop production", {
    children: [
      sub("crops.land-preparation", "4.1", "Land preparation", {
        covers: ["agri.crops.land-preparation"],
        objectives: [["4.1(a)", "Describe stumping and clearing and primary and secondary cultivation by hand or machine."]],
      }),
      sub("crops.cash-crops", "4.2", "Cultivation of cash crops", {
        covers: ["agri.plants.classification", "agri.crops.maize", "agri.crops.other-cereals", "agri.crops.legumes", "agri.crops.cotton-tobacco", "agri.business.farm-records"],
        objectives: [
          ["4.2(a)", "Name the main types of crop grown locally (legumes, roots and tubers, fruits, cereals) and their products."],
          ["4.2(b)", "Describe in detail the cultivation of one crop of local importance: requirements, soil preparation, sowing, cultivars, seed rate and spacing, fertiliser and manure rates, pest, weed and disease control, maturity, harvesting, yield, storage and record keeping."],
        ],
      }),
    ],
  }),
  topic("protection", "5", "Crop protection", {
    children: [
      sub("protection.weeds", "5.1", "Weed control", {
        covers: ["agri.protection.weeds", "agri.protection.weed-control"],
        objectives: [
          ["5.1(a)", "Identify one named local weed of a crop and describe its harmful effects and mode of spread."],
          ["5.1(b)", "Explain cultural, mechanical and chemical methods of weed control."],
        ],
      }),
      sub("protection.pests", "5.2", "Pest control", {
        covers: ["agri.protection.pests", "agri.protection.pest-control"],
        objectives: [
          ["5.2(a)", "Describe the life cycle, effect and spread of one biting and chewing pest, one piercing and sucking pest and one boring pest."],
          ["5.2(b)", "Name and describe the mode of action of contact and systemic pesticides and their appropriate use."],
          ["5.2(c)", "Describe biological and biotechnical methods of pest control."],
          ["5.2(d)", "Describe cultural pest control, including rotation and catch cropping."],
        ],
      }),
      sub("protection.diseases", "5.3", "Disease control", {
        covers: ["agri.protection.diseases"],
        objectives: [["5.3(a)", "Describe the infection, harmful effects, prevention and control of one named bacterial, one fungal and one viral plant disease."]],
      }),
      sub("protection.chemicals", "5.4", "The use of farm chemicals", {
        covers: ["agri.protection.agrochemicals"],
        objectives: [
          ["5.4(a)", "Explain safe handling of farm chemicals: protective clothing, dilution and mixing, precautions before, during and after use, and avoiding pollution when cleaning sprayers."],
          ["5.4(b)", "Explain the safe storage of toxic chemicals and flammable fuels."],
        ],
      }),
    ],
  }),
  topic("anatomy", "6", "Livestock anatomy and physiology", {
    children: [
      sub("anatomy.digestion", "6.1", "Digestion in ruminants and non-ruminants", {
        covers: ["agri.livestock.digestion"],
        objectives: [
          ["6.1(a)", "Describe the structure and function of the digestive systems of a ruminant and a non-ruminant."],
          ["6.1(b)", "Describe digestion and absorption in a ruminant and a non-ruminant (no enzymes)."],
        ],
      }),
      sub("anatomy.reproduction", "6.2", "Sexual reproduction in mammals", {
        covers: ["agri.livestock.reproduction"],
        objectives: [
          ["6.2(a)", "Describe the male and female reproductive systems of a named farm mammal."],
          ["6.2(b)", "Describe fertilisation and birth in a named farm mammal."],
          ["6.2(c)", "Define weaning and lactation and understand the importance of colostrum."],
        ],
      }),
    ],
  }),
  topic("livestock", "7", "Livestock production and health", {
    description: "The syllabus asks for the study of one ruminant and one non-ruminant with particular reference to housing, nutrition and health. The node 'Study of one ruminant and one non-ruminant' is ours and holds the species concepts.",
    children: [
      sub("livestock.species", "7.0", "Study of one ruminant and one non-ruminant", {
        description: "Our node (code ours): the named animals studied under 7.1 to 7.3.",
        covers: ["agri.livestock.broilers", "agri.livestock.pigs", "agri.livestock.beef-cattle", "agri.livestock.dairy-cattle", "agri.livestock.goats-sheep"],
        objectives: [["7.0", "Apply the housing, nutrition and health content of 7.1 to 7.3 to one named ruminant and one named non-ruminant (our objective)."]],
      }),
      sub("livestock.housing", "7.1", "Livestock housing", {
        covers: ["agri.livestock.birth-young-stock"],
        objectives: [
          ["7.1(a)", "Describe suitable housing and living conditions for livestock."],
          ["7.1(b)", "Describe the care and rearing of young stock."],
        ],
      }),
      sub("livestock.nutrition", "7.2", "Livestock nutrition", {
        covers: ["agri.nutrition.nutrients", "agri.nutrition.feedstuffs", "agri.nutrition.rations"],
        objectives: [
          ["7.2(a)", "Describe nutritional requirements, deficiency signs and feeding practices, including balanced rations for the age and stage of the animal."],
          ["7.2(b)", "Outline maintenance and production rations."],
          ["7.2(c)", "Explain the importance of an adequate, clean water supply."],
          ["7.2(d)", "Demonstrate stockmanship: careful handling of animals and keeping a diary of events and production records."],
        ],
      }),
      sub("livestock.health", "7.3", "Livestock health", {
        covers: ["agri.health.signs-of-health", "agri.health.disease-hygiene", "agri.health.notifiable-immunity", "agri.health.external-parasites", "agri.health.internal-parasites"],
        objectives: [
          ["7.3(a)", "Recognise signs of health and ill-health in livestock."],
          ["7.3(b)", "Explain how infectious and contagious diseases spread."],
          ["7.3(c)", "Explain the problems caused by parasites."],
          ["7.3(d)", "Explain notifiable (scheduled) diseases."],
          ["7.3(e)", "Explain the importance of hygiene and isolating sick animals."],
        ],
      }),
    ],
  }),
  topic("pasture", "8", "Pasture management", {
    children: [
      sub("pasture.management", "8.1", "Extensive and intensive pasture management", {
        covers: ["agri.pasture.vegetation-establishment", "agri.pasture.grazing-management"],
        objectives: [
          ["8.1(a)", "Describe the vegetation of grazing lands: grasses and legumes for grazing and bush for browsing."],
          ["8.1(b)", "Describe how improved pastures are established."],
          ["8.1(c)", "Explain rotational, paddock and zero grazing, enclosed and unenclosed systems and intensive and extensive grazing."],
          ["8.1(d)", "Describe extensive management: stocking rates, carrying capacity, overstocking, bush control and the use and misuse of fire."],
          ["8.1(e)", "Explain how fencing and rotational grazing improve pasture use."],
        ],
      }),
    ],
  }),
  topic("breeding", "9", "Livestock and crop breeding", {
    children: [
      sub("breeding.monohybrid", "9.1", "Monohybrid inheritance", {
        covers: ["agri.breeding.monohybrid"],
        objectives: [
          ["9.1(a)", "Define chromosome, gene, allele, homozygous, heterozygous, dominant and recessive."],
          ["9.1(b)", "Calculate and predict the results of monohybrid crosses giving 1:1 and 3:1 ratios."],
          ["9.1(c)", "Explain genotype and phenotype and their importance in animal and plant breeding."],
        ],
      }),
      sub("breeding.selective", "9.2", "Selective breeding in animals and plants", {
        covers: ["agri.breeding.crop-improvement", "agri.breeding.livestock-breeding"],
        objectives: [
          ["9.2(a)", "Describe how breeding improves yield, disease resistance, hardiness and appearance in livestock and crops."],
          ["9.2(b)", "Understand the role of artificial selection in producing improved varieties."],
          ["9.2(c)", "Understand the benefits of artificial insemination."],
          ["9.2(d)", "Understand the differences between selective crop breeding and GM crops."],
        ],
      }),
    ],
  }),
  topic("structures", "10", "Farm structures and tools", {
    children: [
      sub("structures.fencing", "10.1", "Fencing", {
        covers: ["agri.structures.fencing", "agri.structures.fence-construction"],
        objectives: [["10.1(a)", "Describe the treatment of fencing posts, fence construction, types of fence for different purposes, and hedges and windbreaks."]],
      }),
      sub("structures.buildings", "10.2", "Farm buildings", {
        covers: ["agri.structures.farm-buildings"],
        objectives: [["10.2(a)", "Outline the properties and uses of wood, concrete blocks, metal, stone, brick, earth and thatch in farm buildings."]],
      }),
      sub("structures.water", "10.3", "Farm water supplies", {
        covers: ["agri.structures.water-supply"],
        objectives: [
          ["10.3(a)", "List sources of water for people, livestock and irrigation."],
          ["10.3(b)", "Outline water treatment by settling and filtration."],
          ["10.3(c)", "Outline the construction of storage dams that resist water pressure, which increases with depth."],
          ["10.3(d)", "Describe storage tanks, pipe distribution and simple plumbing, including joining pipes and fitting tap washers."],
        ],
      }),
      sub("structures.tools", "10.4", "Farm tools", {
        covers: ["agri.machinery.hand-tools"],
        objectives: [["10.4(a)", "Describe the use and maintenance of a saw, hammer, screwdriver, file, spanner, sprayers and hand tools for cultivation."]],
      }),
      sub("structures.machinery", "10.5", "Farm machinery", {
        covers: ["agri.machinery.mechanisation", "agri.machinery.tillage-implements"],
        objectives: [
          ["10.5(a)", "Explain the advantages and disadvantages of farm mechanisation."],
          ["10.5(b)", "Describe the use and maintenance of the mouldboard plough, cultivator, harrow, planter and ridger (ox-, donkey- or tractor-drawn)."],
        ],
      }),
    ],
  }),
];

const c0600 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "agriculture",
  versionLabel: "2027-2028",
  family: "agriculture-o",
  title: "Cambridge IGCSE Agriculture (0600)",
  code: "0600",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Agriculture 0600 syllabus for 2027 and 2028 (version 1)",
    url: "https://www.cambridgeinternational.org/Images/721347-2027-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and subtopic headings and their numbers (1 to 10, 1.1 to 10.5) are transcribed from the subject content of the official syllabus; objective codes are the syllabus's own content letters (for example 2.3(e)). The node 7.0 'Study of one ruminant and one non-ruminant' and its objective are ours, built from the sentence that introduces topic 7. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-08 from the official PDF (version 1, published September 2024, for exams in 2027 and 2028; November series only; not available in all administrative zones): the ten topics, every numbered subtopic and content item, the assessment overview, the details of the assessment and the list of changes ('no significant changes which affect teaching').",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the previous syllabus version, which is not in the repository; because the list of changes reports no significant changes to teaching, the content is expected to match. The 2027-2028 version is published as the current version because new students now will sit 2027 or later.",
    "Assessment as read: Paper 1 Theory (1 hour 45 minutes, 100 marks, 70%, externally assessed): Section A, 70 marks, short-answer and structured questions, all compulsory; Section B, two of five free-response structured questions of 15 marks each (30 marks). Component 2 Practical Coursework (90 marks, 30%, internally assessed and externally moderated): four practical exercises of 15 marks each (60 marks; criteria responsibility, initiative, technique, perseverance and quality, 3 marks each) and one practical investigation reported in no more than 1000 words (30 marks). Calculators may be used in all parts of the assessment. Grades A* to G; no tiers. AO weightings: AO1 30%, AO2 40%, AO3 30% overall (Paper 1: AO1 45%, AO2 55%).",
    "The number and marks of Section A questions are not given in the syllabus; the mock convention of seven 10-mark structured questions is ours and should be checked against the specimen paper. The content overview names topic 10 'Farm structure and tools'; the subject content heading 'Farm structures and tools' is used here.",
    "Not in this syllabus (taught in the family for ZIMSEC only): land tenure and land reform, natural farming regions, adverse-condition modification and natural disasters, forestry, wildlife, water conservation and harvesting, irrigation equipment, water pollution and legislation, respiration and tropisms, vegetable and orchard production, types of livestock, poultry reproduction, layers and indigenous chickens, rabbits, donkeys, mitosis and meiosis, harnesses, pumps and shellers, farm roads, profit and loss accounts, budgets and gross margins, agricultural marketing and co-operatives. Component 2 coursework is not simulated.",
  ],
  overview: "Cambridge IGCSE Agriculture is an applied, practical science course in ten topics: general agriculture (land use and agricultural economics), soil (formation, properties, fertility, erosion, drainage, irrigation and the water cycle), principles of plant growth, crop production, crop protection, livestock anatomy and physiology, livestock production and health, pasture management, livestock and crop breeding, and farm structures and tools.",
  assessmentOverview: "All candidates take Paper 1 Theory (1 hour 45 minutes, 100 marks, 70%: Section A 70 marks of compulsory short-answer and structured questions; Section B two 15-mark questions from a choice of five) and Component 2 Practical Coursework (90 marks, 30%: four practical exercises and a practical investigation, internally assessed and externally moderated). Calculators may be used.",
  components: [
    { code: "1", name: "Paper 1: Theory", kind: "WRITTEN", description: "Section A (70 marks): compulsory short-answer and structured questions. Section B (30 marks): two free-response structured questions of 15 marks each from a choice of five.", durationMinutes: 105, maxMarks: 100, weightingPercent: 70, calculatorAllowed: true },
    { code: "2", name: "Component 2: Practical Coursework", kind: "COURSEWORK", description: "Four practical exercises (60 marks) and one practical investigation with a written report (30 marks), internally assessed and externally moderated.", maxMarks: 90, weightingPercent: 30 },
  ],
  topics: C0600_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, every concept is covered
// by at least one syllabus, node keys and objective codes are unique, and report what each syllabus leaves out.
const coveredAnywhere = new Set();
const coverage = {};
for (const s of [zimsec, c0600]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if (!(n.covers ?? []).length && !(n.children ?? []).length) throw new Error(`${s.board}: leaf ${n.key} covers nothing`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  coverage[s.board] = seen;
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept keys");
for (const [k, , d] of CONCEPTS) {
  if (!/^agri\.[a-z-]+\.[a-z-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
  // "ZIMSEC only" / "Cambridge only" must match the coverage.
  const z = coverage.zimsec.has(k);
  const c = coverage.cambridge.has(k);
  if (d.startsWith("ZIMSEC only") !== (z && !c)) throw new Error(`${k}: description says ZIMSEC only = ${d.startsWith("ZIMSEC only")}, coverage zimsec=${z} cambridge=${c}`);
  if (d.startsWith("Cambridge only") !== (c && !z)) throw new Error(`${k}: description says Cambridge only = ${d.startsWith("Cambridge only")}, coverage zimsec=${z} cambridge=${c}`);
  if (d.length > 2000) throw new Error(`${k}: description too long`);
}
const shared = [...CONCEPT_KEYS].filter((k) => coverage.zimsec.has(k) && coverage.cambridge.has(k)).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared by both syllabi)`);

const registry = {
  family: "agriculture-o",
  name: "Agriculture (O-Level / IGCSE)",
  level: "O",
  prefix: "agri",
  subjects: ["zimsec/o-level/agriculture", "cambridge/igcse/agriculture"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/agriculture-o.json", registry);
write("content/syllabi/zimsec/o-level/agriculture/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/agriculture/2027-2028.json", c0600);
