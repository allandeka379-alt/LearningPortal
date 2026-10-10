// Builds content/concepts/geography-a.json and the two A-Level Geography syllabus files:
//   content/syllabi/zimsec/a-level/geography/2015-2022.json      (ZIMSEC A-Level Geography, Forms 5-6)
//   content/syllabi/cambridge/a-level/geography/2027-2029.json   (Cambridge International AS & A Level Geography 9696)
// Sources (local only, not in git): .scratch/geography-a/sources/zimsec-geography-a.pdf (+ .txt) and 9696-2027-2029.pdf
// (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's coverage label.
// Run from the repo root: node .scratch/geography-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^ageo\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage` (Cambridge: "AS Level" / "A Level only ...")
// are build-time metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (optional) n.optional = true;
  if (optionGroup) n.optionGroup = optionGroup;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level Geography, Forms 5-6, 2015-2022. Top-level topics 1-15 are the fifteen compulsory topics of the topic
// list (6.1-6.15). The competency matrix (8.0) has no printed numbers for its key concepts, so sub-topic codes (1.1 ...)
// are OURS: each sub-topic is one key concept of the matrix (or a few closely related ones, named together as printed in
// the scope and sequence). Objective codes are ours (sub-topic code + .n). The node P (map interpretation and
// examination skills) is ours too. Paper components: 1 Physical, 2 Human, 3 Practical.
const PHYS = ["1"];
const HUM = ["2"];
const PRAC = ["3"];
const F5 = "Form 5";
const F6 = "Form 6";
const F56 = "Forms 5-6";

const ZIMSEC_TOPICS = [
  topic("gis-remote-sensing", "1", "Geographic Information Systems and Remote Sensing", {
    description: "Form 5: coordinates, projection, GPS, conceptual models, georeferencing and data capture. Form 6: the remote sensing system, image acquisition, resolution and interpretation. Examined in Paper 3 (Section B).",
    components: PRAC,
    children: [
      sub("gis-remote-sensing.coordinates-projection", "1.1", "Coordinates and coordinate systems; Projection", {
        form: F5,
        covers: ["ageo.gis.coordinates-projections"],
        objectives: [
          "Locate features using geographic, plane and polar coordinates and distinguish the major coordinate systems, including UTM.",
          "Explain forward and inverse projection and compare cylindrical, conical and azimuthal projections.",
          "Project a vector layer from one coordinate system to another.",
        ],
      }),
      sub("gis-remote-sensing.gps", "1.2", "Global Positioning Systems (GPS)", {
        form: F5,
        covers: ["ageo.gis.gps-field-capture"],
        objectives: [
          "Explain how GPS measures location by trilateration.",
          "Mark locations, navigate and collect field data with GPS and display them in a GIS.",
          "Identify sources of error in a GPS position and suggest solutions.",
        ],
      }),
      sub("gis-remote-sensing.data-models-capture", "1.3", "Conceptual models of geographic space; Georeferencing and spatial data capture", {
        form: F5,
        covers: ["ageo.gis.data-models-georeferencing"],
        objectives: [
          "Distinguish vector (point, line, polygon) from raster models and choose the right one for a dataset.",
          "Georeference a scanned or embossed map with ground control points and calculate the georeferencing error (RMSE).",
          "Capture vector data by on-screen digitising, account for digitising error, and produce a map layout.",
        ],
      }),
      sub("gis-remote-sensing.remote-sensing-system", "1.4", "The remote sensing system; Image acquisition and structure", {
        form: F6,
        covers: ["ageo.rs.system-reflectance"],
        objectives: [
          "Identify the components of the remote sensing system and their role in image acquisition.",
          "Predict the reflectance of vegetation, bare ground, water and built surfaces and interpret spectral signatures.",
          "Distinguish passive from active sensors, identify bands on the electromagnetic spectrum, and distinguish image space from feature space.",
        ],
      }),
      sub("gis-remote-sensing.resolution-interpretation", "1.5", "Resolution; Image interpretation", {
        form: F6,
        covers: ["ageo.rs.resolution-interpretation"],
        objectives: [
          "Distinguish spatial, temporal and spectral resolution and select suitable remote sensing data for a task.",
          "Apply colour theory to produce natural, pseudo-natural and false-colour composites.",
          "Interpret images using size, shape and context.",
        ],
      }),
    ],
  }),
  topic("geo-statistics", "2", "Geo-statistical Analysis and Presentation", {
    description: "Form 5: levels of measurement, univariate and bivariate statistics, graphs and maps, research techniques. Form 6: spatial interpolation and measures of spatial autocorrelation. Examined in Paper 3 (Sections A and C).",
    components: PRAC,
    children: [
      sub("geo-statistics.levels-univariate", "2.1", "Levels of measurement; Univariate statistics", {
        form: F5,
        covers: ["ageo.stats.descriptive"],
        objectives: [
          "Distinguish nominal, ordinal, interval, ratio and cyclic data and decide which analyses suit each.",
          "Describe geographic data with the mean, median, mode, frequency, quartiles and standard deviation.",
          "Test a dataset for normality and apply simple probability to geographic questions.",
        ],
      }),
      sub("geo-statistics.hypothesis-testing", "2.2", "Hypotheses setting and testing", {
        form: F5,
        description: "A content item of Univariate statistics in the matrix, given its own node because it is taught as a separate lesson.",
        covers: ["ageo.stats.hypothesis-testing"],
        objectives: [
          "Set null and alternative hypotheses for a geographic question.",
          "Test a hypothesis with a suitable statistic (including chi-squared) and state the conclusion in geographic terms.",
        ],
      }),
      sub("geo-statistics.bivariate", "2.3", "Bivariate statistics", {
        form: F5,
        covers: ["ageo.stats.correlation-regression"],
        objectives: [
          "Describe the association between two geographic variables with Spearman's and Pearson's correlation.",
          "Perform and interpret a simple linear regression test.",
          "Describe geographic data associations based on correlation and regression.",
        ],
      }),
      sub("geo-statistics.graphs-maps", "2.4", "Graphs and maps", {
        form: F5,
        covers: ["ageo.skills.graphs-maps-resources"],
        objectives: [
          "Present geographic data on histograms, bar and line graphs, pie charts and scatter graphs.",
          "Present data on choropleth maps, dot maps, proportional circles and population pyramids, with a proper map layout.",
          "Interpret graphs and maps.",
        ],
      }),
      sub("geo-statistics.research-techniques", "2.5", "Research techniques", {
        form: F5,
        covers: ["ageo.skills.research-techniques"],
        objectives: [
          "Explain the stages of geographical research: problem identification, hypothesis, data collection, presentation, analysis and hypothesis testing, conclusion and recommendations.",
          "Apply research techniques to a real geographic problem.",
        ],
      }),
      sub("geo-statistics.spatial", "2.6", "Spatial interpolation; Measures of spatial autocorrelation", {
        form: F6,
        covers: ["ageo.stats.spatial-analysis"],
        objectives: [
          "Collect data on a continuous geographic variable in the field and apply ordinary and inverse distance weighting interpolation.",
          "Explain the importance of spatial autocorrelation and test for it with Moran's I and Geary's C.",
        ],
      }),
    ],
  }),
  topic("environmental-management", "3", "Environmental Management", {
    description: "Form 5, with Environmental Impact Assessment and environmental management projects continued in Form 6. Examined in Paper 1.",
    components: PHYS,
    children: [
      sub("environmental-management.pollution", "3.1", "Environmental pollution and environmental degradation; Causes, effects and control measures of pollution", {
        form: F5,
        covers: ["ageo.env.pollution"],
        objectives: [
          "Describe and identify water, land, air, visual and noise pollution and contrast pollution in urban and rural areas.",
          "Outline the causes and effects of pollution and measure indicators such as temperature, pH, turbidity and E. coli.",
          "Evaluate measures to control pollution.",
        ],
      }),
      sub("environmental-management.degradation", "3.2", "Causes, effects and control measures of environmental degradation", {
        form: F5,
        covers: ["ageo.env.degradation"],
        objectives: [
          "Describe soil and land degradation and outline its causes and effects in rural and urban areas.",
          "Evaluate measures that reduce or reverse degradation, including indigenous knowledge systems.",
        ],
      }),
      sub("environmental-management.eia-projects", "3.3", "Environmental Impact Assessment (EIA); Environmental management projects", {
        form: F56,
        covers: ["ageo.env.eia-projects"],
        objectives: [
          "Outline the stages of an EIA (scoping and screening, identification of impacts, mitigation, monitoring plan, EIA document) and the role of EMA.",
          "Conduct an EIA of a development project in the local area.",
          "Plan and report a local environmental management project (waste management, land reclamation or restoration).",
        ],
      }),
    ],
  }),
  topic("atmosphere", "4", "Atmospheric Processes and Phenomena", {
    description: "Form 5: energy budgets, the Earth-atmosphere energy budget, weather processes, air masses (with cyclones and anticyclones). Form 6: micro-climates, climate change, weather and climatic hazards. Examined in Paper 1.",
    components: PHYS,
    children: [
      sub("atmosphere.energy-budgets", "4.1", "Energy budgets", {
        form: F5,
        covers: ["ageo.atmos.energy-budget"],
        objectives: [
          "Differentiate diurnal from nocturnal solar radiation for a given day.",
          "Explain inputs, outputs and transfers in the energy budget, including the natural greenhouse effect.",
        ],
      }),
      sub("atmosphere.earth-atmosphere-budget", "4.2", "The Earth-Atmosphere energy budget", {
        form: F5,
        covers: ["ageo.atmos.global-transfers"],
        objectives: [
          "Illustrate heat transfer from areas of surplus to areas of deficit.",
          "Explain vertical and lateral transfer of heat in the atmosphere and oceans.",
        ],
      }),
      sub("atmosphere.weather-processes", "4.3", "Weather processes and phenomena", {
        form: F5,
        covers: ["ageo.atmos.moisture-precipitation"],
        objectives: [
          "Contrast atmospheric stability and instability using the ELR, DALR and SALR.",
          "Explain theories of raindrop formation and the types of precipitation.",
        ],
      }),
      sub("atmosphere.air-masses", "4.4", "Air masses (with cyclones and anticyclones)", {
        form: F5,
        covers: ["ageo.atmos.air-masses-pressure-systems"],
        objectives: [
          "Distinguish air masses by source region and explain how they are modified.",
          "Examine the effects of air masses, including those affecting Zimbabwe.",
          "Explain the weather associated with cyclones and anticyclones.",
        ],
      }),
      sub("atmosphere.micro-climates", "4.5", "Micro-climates", {
        form: F6,
        covers: ["ageo.atmos.microclimates"],
        objectives: [
          "Describe how micro-climates such as urban heat islands, land and sea breezes and forests develop.",
          "Explain their effects and compare temperature and rainfall in a micro-climate with an adjacent area.",
        ],
      }),
      sub("atmosphere.climate-change", "4.6", "Climate change", {
        form: F6,
        covers: ["ageo.atmos.climate-evidence-causes", "ageo.climate.impacts-vulnerability", "ageo.climate.mitigation-adaptation-governance"],
        objectives: [
          "Explain natural and human causes of climate change, including global warming, El Niño and La Niña.",
          "Discuss the effects of climate change on Zimbabwe, southern Africa and the world.",
          "Evaluate climate change mitigation and adaptation measures.",
        ],
      }),
      sub("atmosphere.hazards", "4.7", "Weather and climatic hazards and mitigation", {
        form: F6,
        covers: ["ageo.hazard.weather-climatic", "ageo.hazard.tropical-cyclones"],
        objectives: [
          "Explain the causes of droughts, floods, tropical cyclones and other storms, and heatwaves.",
          "Discuss their effects and assess the effectiveness of adaptation and mitigation measures.",
        ],
      }),
    ],
  }),
  topic("geomorphology", "5", "Geomorphology", {
    description: "Form 5: plate tectonics, rocks and weathering, slope development. Form 6: tropical landform development, hazards, impact and mitigation (mass movements). Examined in Paper 1.",
    components: PHYS,
    children: [
      sub("geomorphology.plate-tectonics", "5.1", "Plate tectonics", {
        form: F5,
        covers: ["ageo.tectonics.plates-evidence", "ageo.tectonics.processes-landforms"],
        objectives: [
          "Distinguish features related to constructive and destructive plate boundaries.",
          "Explain tectonic processes and related features: earthquakes, vulcanicity, folding and faulting.",
        ],
      }),
      sub("geomorphology.rocks-weathering", "5.2", "Rocks and weathering", {
        form: F5,
        covers: ["ageo.geomorph.weathering"],
        objectives: [
          "Justify weathering types for different climatic conditions using the Peltier diagram.",
          "Explain the non-climatic factors affecting weathering: rock characteristics, relief, vegetation and human influence.",
        ],
      }),
      sub("geomorphology.slope-development", "5.3", "Slope development", {
        form: F5,
        covers: ["ageo.geomorph.slopes"],
        objectives: [
          "Identify different slope profiles and measure slope angle and height.",
          "Evaluate the factors and processes of slope development, including pediplanation, peneplanation and etchplanation.",
        ],
      }),
      sub("geomorphology.tropical-landforms", "5.4", "Tropical landform development", {
        form: F6,
        covers: ["ageo.tropical.landforms-granite-karst"],
        objectives: [
          "Discuss theories of inselberg formation and the formation of duricrust.",
          "Explain landform development in limestone regions and identify the resulting karst landforms.",
        ],
      }),
      sub("geomorphology.hazards", "5.5", "Hazards, impact and mitigation", {
        form: F6,
        covers: ["ageo.geomorph.mass-movements"],
        objectives: [
          "Explain the distribution, causes and effects of mass movements: mudflows, landslides and rock falls.",
          "Assess the effectiveness of mitigation and adaptation measures.",
        ],
      }),
    ],
  }),
  topic("hydrology", "6", "Hydrology and Fluvial Processes", {
    description: "Form 5 only; the matrix notes that the topic was completed in Form 5. Examined in Paper 1.",
    components: PHYS,
    children: [
      sub("hydrology.drainage-basin", "6.1", "The drainage basin system", {
        form: F5,
        covers: ["ageo.hydro.drainage-basin-system", "ageo.water.supply-demand-security"],
        description: "Includes ground water (occurrence, quantity and quality, sustainable management), taught in the water supply and security lesson.",
        objectives: [
          "Analyse the drainage basin system: inputs, processes and flows, stores and outputs.",
          "Evaluate the sustainable management of ground water sources, using indigenous knowledge and scientific methods.",
        ],
      }),
      sub("hydrology.rainfall-discharge", "6.2", "Rainfall-discharge relationships within drainage basins", {
        form: F5,
        covers: ["ageo.hydro.hydrographs-morphometry"],
        objectives: [
          "Interpret storm hydrographs and test hypotheses about rainfall-discharge relationships.",
          "Calculate stream morphometry: stream ordering, density and intensity.",
          "Manage a drainage basin sustainably.",
        ],
      }),
      sub("hydrology.river-channels", "6.3", "River channel processes and landforms", {
        form: F5,
        covers: ["ageo.hydro.river-processes-landforms"],
        objectives: [
          "Relate river processes and landforms to each section of the long profile.",
          "Calculate the channel efficiency of local streams.",
        ],
      }),
      sub("hydrology.hazards", "6.4", "Hydrological hazards and mitigation", {
        form: F5,
        covers: ["ageo.hydro.river-floods", "ageo.hydro.flood-management"],
        objectives: [
          "Explain river flooding and identify its effects.",
          "Assess mitigation measures and interpret river regimes.",
        ],
      }),
    ],
  }),
  topic("biogeography", "7", "Biogeography", {
    description: "Form 5: vegetation distribution, plant succession, biogeochemical cycles, Gersmehl (printed 'Gerschmel') diagrams, biomes, biodiversity, adaptation. Form 6: soils and sustainable management of ecosystems. Examined in Paper 1.",
    components: PHYS,
    children: [
      sub("biogeography.vegetation-biomes", "7.1", "Factors affecting vegetation distribution; Biomass and biomes (tropical and temperate biomes); Plant and animal adaptation", {
        form: F5,
        covers: ["ageo.bio.vegetation-biomes"],
        objectives: [
          "Explain the factors affecting vegetation distribution.",
          "Describe the characteristics of tropical and temperate biomes.",
          "Explain how plants and animals adapt to the climate of each biome.",
        ],
      }),
      sub("biogeography.plant-succession", "7.2", "Plant succession", {
        form: F5,
        covers: ["ageo.bio.plant-succession"],
        objectives: [
          "Outline the sequence of secondary plant succession after fire or clearance.",
          "Describe types of primary succession such as the lithosere.",
        ],
      }),
      sub("biogeography.nutrient-cycles", "7.3", "Biogeochemical cycles; Gerschmel diagrams", {
        form: F5,
        covers: ["ageo.bio.nutrient-cycles"],
        objectives: [
          "Illustrate and describe the carbon, nitrogen and oxygen cycles.",
          "Draw a Gersmehl diagram, identify its compartments and apply nutrient cycling to tropical biomes.",
        ],
      }),
      sub("biogeography.biodiversity-ecosystems", "7.4", "Biodiversity (plant and animal diversity); Sustainable management of ecosystem", {
        form: F56,
        covers: ["ageo.bio.biodiversity-ecosystems"],
        objectives: [
          "Describe biodiversity and measure plant diversity locally, using quadrats.",
          "Evaluate measures used to conserve tropical ecosystems against logging, veld fires, poaching and encroachment.",
        ],
      }),
      sub("biogeography.soils", "7.5", "Soil forming factors, soil profiles and soil catena; Measurement of soil characteristics", {
        form: F6,
        covers: ["ageo.bio.soils"],
        objectives: [
          "Explain Jenny's formula of soil-forming factors and describe soil profiles and the soil catena.",
          "Sample soils, measure texture, structure, pH, moisture, organic content, colour and depth, and present and analyse the data.",
        ],
      }),
    ],
  }),
  topic("population-migration", "8", "Population and Migration", {
    description: "Form 5: population indicators, health and diseases, growth, population-resource relationships. Form 6: migration, patterns, causes and impacts, population policies. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("population-migration.indicators", "8.1", "Population indicators", {
        form: F5,
        covers: ["ageo.pop.indicators-components"],
        objectives: [
          "Calculate birth rate, death rate, dependency and other population indicators.",
          "Assess the importance of population indicators and the factors that affect them.",
        ],
      }),
      sub("population-migration.growth", "8.2", "Population growth; Population-resource relationships", {
        form: F5,
        covers: ["ageo.pop.distribution-growth", "ageo.pop.structure-dtm"],
        description: "The demographic transition model and population pyramids are taught here (trends in population growth).",
        objectives: [
          "Explain the causes of population growth and trends shown by the demographic transition model.",
          "Assess the impact of population growth on development and on resources.",
        ],
      }),
      sub("population-migration.health-diseases", "8.3", "Population health and diseases", {
        form: F5,
        covers: ["ageo.disease.zimbabwe-health", "ageo.disease.cholera", "ageo.disease.malaria"],
        objectives: [
          "Identify diseases that affect population (cholera, tuberculosis, malaria, Ebola, HIV/AIDS, cancer) and outline their effects.",
          "Explain scientific ways of preventing and curing them and assess indigenous ways.",
        ],
      }),
      sub("population-migration.migration-patterns", "8.4", "Migration; Patterns of migration", {
        form: F6,
        covers: ["ageo.pop.migration-types-patterns"],
        objectives: [
          "Explain the forms of migration and describe its trends.",
          "Describe patterns of migration and assess the applicability of migration models.",
        ],
      }),
      sub("population-migration.migration-causes-impacts", "8.5", "Causes and impact of migration", {
        form: F6,
        covers: ["ageo.pop.migration-causes-impacts"],
        objectives: ["Describe the causes of migration.", "Evaluate the impact of migration."],
      }),
      sub("population-migration.policies", "8.6", "Population policies", {
        form: F6,
        covers: ["ageo.pop.policies"],
        objectives: [
          "Explain pro- and anti-natalist theories with reference to countries such as Zimbabwe, China, Sweden and Germany.",
          "Evaluate the impact of population policies on the economies of countries.",
        ],
      }),
    ],
  }),
  topic("settlement", "9", "Settlement Dynamics", {
    description: "Form 5: site and location, hierarchy, growth points, land reform and resettlement, functions, rural-urban interaction, urbanisation. Form 6: urban morphology, settlement development, spheres of influence, CBD delimitation, land use planning. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("settlement.site-location", "9.1", "Site and location of settlements; Functions of rural and urban settlements; Rural-urban interaction", {
        form: F5,
        covers: ["ageo.settle.site-location-functions"],
        objectives: [
          "Explain the factors influencing the site and location of settlements and assess a site's suitability.",
          "Explain the functions of rural and urban settlements and describe rural-urban interaction.",
        ],
      }),
      sub("settlement.hierarchy", "9.2", "Settlement hierarchy", {
        form: F5,
        covers: ["ageo.settle.hierarchy-theories"],
        objectives: [
          "Explain how settlements are classified by size and function and rank them in a hierarchy.",
          "Discuss settlement classification theories: primacy, the binary index, the rank-size rule and nearest neighbour analysis.",
        ],
      }),
      sub("settlement.growth-points", "9.3", "Growth points", {
        form: F5,
        covers: ["ageo.settle.growth-points"],
        objectives: [
          "Describe growth points and the reasons for establishing them.",
          "Evaluate the growth point policy in Zimbabwe.",
        ],
      }),
      sub("settlement.land-reform", "9.4", "Land reform and resettlement", {
        form: F5,
        covers: ["ageo.settle.land-reform-resettlement"],
        objectives: ["Explain the importance of land reform for settlement development, with reference to A1 and A2 settlements."],
      }),
      sub("settlement.urbanisation", "9.5", "Urbanisation and counter urbanisation", {
        form: F5,
        covers: ["ageo.urban.urbanisation-processes"],
        objectives: [
          "Outline the causes of urbanisation and counter-urbanisation and explain their impacts.",
          "Evaluate solutions to urbanisation and counter-urbanisation.",
        ],
      }),
      sub("settlement.urban-morphology", "9.6", "Urban morphology; Settlement development", {
        form: F6,
        covers: ["ageo.urban.structure-change"],
        objectives: ["Describe urban morphology and land-use zones and explain how settlements develop and change."],
      }),
      sub("settlement.sphere-cbd", "9.7", "Spheres of influence; Delimitation of the CBD", {
        form: F6,
        covers: ["ageo.settle.sphere-cbd"],
        objectives: [
          "Explain how the sphere of influence of a service centre is determined and why it matters.",
          "Delineate the extent of the CBD with indices and counts.",
        ],
      }),
      sub("settlement.land-use-planning", "9.8", "Rural and urban land use planning", {
        form: F6,
        covers: ["ageo.urban.sustainability-management"],
        objectives: ["Identify and apply planning techniques for rural and urban land use, with GIS and maps."],
      }),
    ],
  }),
  topic("agriculture", "10", "Agricultural Production and Food Security", {
    description: "Form 5: factors, location, farming systems in the tropics, the Green Revolution. Form 6: land reform and food security, value addition and agribusiness, climate change and other threats. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("agriculture.factors-location", "10.1", "Factors affecting agricultural production; Agricultural location", {
        form: F5,
        covers: ["ageo.agri.factors-location"],
        objectives: [
          "Explain the factors affecting agricultural production and the agro-ecological regions of Zimbabwe.",
          "Explain von Thünen's theory of agricultural location and assess its applicability.",
        ],
      }),
      sub("agriculture.farming-systems", "10.2", "Farming systems in the Tropics; The Green Revolution", {
        form: F5,
        covers: ["ageo.agri.farming-systems-green-revolution"],
        objectives: [
          "Describe subsistence and commercial farming systems in the tropics and their importance.",
          "Describe the techniques of the Green Revolution and assess its success.",
        ],
      }),
      sub("agriculture.land-reform", "10.3", "Land reform and food security", {
        form: F6,
        covers: ["ageo.agri.land-reform-food-security"],
        objectives: [
          "Explain the need for land reform in Zimbabwe.",
          "Evaluate the contribution of land reform to food production, using trends since 2000.",
        ],
      }),
      sub("agriculture.value-addition", "10.4", "Value addition and agribusiness", {
        form: F6,
        covers: ["ageo.agri.value-addition-agribusiness"],
        objectives: [
          "Explain the forms and importance of agribusiness.",
          "Explain forms of value addition and assess its role in agribusiness.",
        ],
      }),
      sub("agriculture.threats-responses", "10.5", "Climate change and other threats to food security; Responses to climatic change", {
        form: F6,
        covers: ["ageo.agri.threats-responses"],
        objectives: [
          "Describe threats to food security (climate change, droughts, floods, pests and diseases) and assess their impact.",
          "Explain ways of increasing production in the face of climate change: indigenous crops, conservation farming and post-harvest techniques.",
        ],
      }),
    ],
  }),
  topic("mining", "11", "Mining and Mineral Beneficiation", {
    description: "Form 5: legislation, EIA, prospecting, mineralogy, enterprises, impacts. Form 6: value addition and beneficiation, marketing, safety and health. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("mining.legislation", "11.1", "Mining legislation and mining policies in Zimbabwe", {
        form: F5,
        covers: ["ageo.mining.legislation-policy"],
        objectives: [
          "Outline the steps taken to gain mining rights over a claim.",
          "Summarise the main contents of each relevant Act and evaluate the effects of policies on mining.",
        ],
      }),
      sub("mining.prospecting-mineralogy", "11.2", "Prospecting methods; Mineralogy", {
        form: F5,
        covers: ["ageo.mining.prospecting-mineralogy"],
        objectives: [
          "Test ore samples with different prospecting methods and conclude on the results.",
          "Identify minerals that co-occur in Zimbabwe and describe the physico-chemical properties of the main ones.",
        ],
      }),
      sub("mining.enterprises-impacts", "11.3", "Environmental Impact Assessment in mining; Small and large scale mining enterprises; Impact of mining and mitigation; Safety and health in mining", {
        form: F56,
        covers: ["ageo.mining.enterprises-impacts-safety"],
        objectives: [
          "Draw up a proposal for a mining enterprise and assess the successes and failures of a mining project.",
          "Analyse the importance of EIA in mining and determine the environmental impacts of a mining project.",
          "Identify diseases and hazards related to mining and evaluate solutions.",
        ],
      }),
      sub("mining.beneficiation-marketing", "11.4", "Value addition and beneficiation methods; Marketing of minerals", {
        form: F6,
        covers: ["ageo.mining.beneficiation-marketing"],
        objectives: [
          "Describe and apply beneficiation methods and the value addition process of diamonds.",
          "Outline the legislation and procedure for selling minerals in Zimbabwe and determine the demand for a mineral.",
        ],
      }),
    ],
  }),
  topic("industrial-dynamics", "12", "Industrial Dynamics", {
    description: "Form 5 only; the matrix notes that the topic was completed in Form 5. Includes the tourism industry. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("industrial-dynamics.location-linkages", "12.1", "Industrial location and relocation; Industrial linkages and agglomeration", {
        form: F5,
        covers: ["ageo.industry.location-linkages"],
        objectives: [
          "Describe theories of industrial location such as Weber's and assess their applicability in Zimbabwe.",
          "Explain industrial linkages, agglomeration and economies and diseconomies of scale and their importance.",
        ],
      }),
      sub("industrial-dynamics.sme-hightech", "12.2", "Small and medium scale enterprises; Hi-tech industries", {
        form: F5,
        description: "The Form 6 item 'SMEs in Zimbabwe and their impact on economic development' (topic 15 in the scope and sequence) is taught in the same lesson.",
        covers: ["ageo.industry.smes-hightech"],
        objectives: [
          "Describe small and medium scale enterprises and evaluate their importance to the growth of the economy.",
          "Describe hi-tech industries and evaluate their importance to the country's economy.",
        ],
      }),
      sub("industrial-dynamics.tourism", "12.3", "Tourism industry", {
        form: F5,
        covers: ["ageo.tourism.patterns-trends", "ageo.tourism.impacts-management"],
        objectives: [
          "Explain the importance of tourism and describe trends in tourism in Zimbabwe.",
          "Investigate ways of improving tourist attractions and tourism infrastructure in the local area.",
        ],
      }),
    ],
  }),
  topic("energy", "13", "Energy Sources and Development", {
    description: "Form 5: energy sources in Zimbabwe, clean sources, green energy generation. Form 6: global distribution, global trends, sustainable management. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("energy.zimbabwe", "13.1", "Sources of energy in Zimbabwe: actual and potential; Clean sources of energy (going green); Green energy generation", {
        form: F5,
        covers: ["ageo.energy.zimbabwe-clean-green"],
        objectives: [
          "Identify actual and potential energy sources in Zimbabwe and explore opportunities for new ones.",
          "Analyse the environmental impact of dirty energy sources and identify gadgets that generate clean energy.",
          "Draw up a proposal for green energy generation.",
        ],
      }),
      sub("energy.global", "13.2", "Global distribution of energy sources; Global trends in energy use", {
        form: F6,
        covers: ["ageo.energy.sources-patterns"],
        objectives: [
          "Describe the distribution of the major energy sources (oil, uranium, coal) and assess the impact of scarcity.",
          "Analyse changing patterns of energy use and the factors affecting them.",
        ],
      }),
      sub("energy.sustainable", "13.3", "Sustainable management of energy sources", {
        form: F6,
        covers: ["ageo.energy.transition-security"],
        objectives: [
          "Assess international control of oil by OPEC and of nuclear material by the United Nations.",
          "Evaluate ways of conserving energy and devise measures of sustainable energy use.",
        ],
      }),
    ],
  }),
  topic("transport-trade", "14", "Transport Systems and Trade", {
    description: "Form 5: transport systems, their patterns and transport enterprise. Form 6: trade policies, trends, global inequalities in trade, factors influencing global trade, trade opportunities. Examined in Paper 2.",
    components: HUM,
    children: [
      sub("transport-trade.distribution", "14.1", "Distribution of transport systems and their purposes in Zimbabwe; Factors governing patterns of transport networks", {
        form: F5,
        covers: ["ageo.transport.distribution-factors"],
        objectives: [
          "Explain the distribution of transport systems in Zimbabwe and assess the factors affecting the network.",
          "Evaluate the impact of the nature of transport systems on development.",
        ],
      }),
      sub("transport-trade.enterprise", "14.2", "Transport enterprise", {
        form: F5,
        description: "Network indices (for example the beta index) listed under the previous item's content are taught here.",
        covers: ["ageo.transport.network-indices-enterprise"],
        objectives: [
          "Calculate network indices to determine route characteristics.",
          "Draw up a proposal for a transport business and design a road network to ease connectivity problems.",
        ],
      }),
      sub("transport-trade.zimbabwe-trade", "14.3", "Trade policies in Zimbabwe and their impact on trade; Current trends in Zimbabwean trade; Trade opportunities in the local area", {
        form: F6,
        covers: ["ageo.trade.zimbabwe-policy-opportunities"],
        objectives: [
          "Identify trade policies in Zimbabwe and evaluate their impact.",
          "Distinguish forms of trade in Zimbabwe and evaluate the factors influencing trade flows.",
          "Design a trade enterprise and defend its viability.",
        ],
      }),
      sub("transport-trade.global-inequalities", "14.4", "Global inequalities in trade flows and solutions", {
        form: F6,
        covers: ["ageo.trade.global-flows-balance"],
        objectives: [
          "Identify the major exports and imports of Zimbabwe and assess the effects of the balance of trade.",
          "Propose ways of improving the balance of trade.",
        ],
      }),
      sub("transport-trade.global-factors", "14.5", "Factors influencing global trade patterns", {
        form: F6,
        covers: ["ageo.trade.global-factors-cases"],
        objectives: ["Explain the factors influencing trade, such as transport networks, trading blocs, ideology, consumption patterns and history."],
      }),
    ],
  }),
  topic("regional-inequalities", "15", "Regional Inequalities and Development", {
    description: "Form 5. Examined in Paper 2. The scope and sequence also lists 'SMEs in Zimbabwe and their impact on economic development' under Form 6; the matrix of the copy read has no row for it (taught with node 12.2).",
    components: HUM,
    children: [
      sub("regional-inequalities.indicators", "15.1", "Indicators of economic development; Economic activities (primary, secondary, tertiary, quaternary) and their role in economic development", {
        form: F5,
        covers: ["ageo.dev.indicators-sectors"],
        objectives: [
          "Determine the level of development of the local area using indicators of development.",
          "Assess the advantages and disadvantages of each indicator and the role of the economic sectors.",
        ],
      }),
      sub("regional-inequalities.inequalities", "15.2", "Regional inequalities (causes, nature, impacts and solutions)", {
        form: F5,
        covers: ["ageo.dev.regional-inequalities"],
        objectives: [
          "Describe regional inequalities in Zimbabwe, Africa and the world and explain the core-periphery concept.",
          "Explain the causes and impacts of regional disparities and evaluate solutions.",
        ],
      }),
    ],
  }),
  topic("exam-skills", "P", "Map interpretation and examination skills", {
    description: "Ours, not a printed topic. The syllabus assumes map interpretation skills (1.4 Assumptions) and Paper 3 Section B sets a topographical map question; the answering skills serve all three papers.",
    components: ["1", "2", "3"],
    children: [
      sub("exam-skills.topographic-map", "P1", "Topographical map interpretation", {
        form: F56,
        covers: ["ageo.skills.topographic-maps"],
        objectives: [
          "Use grid references, scale, bearings, contours and gradient to describe locations, distances and relief on a topographic map extract.",
          "Interpret physical and human features from a topographic map extract and write a short geographical description.",
        ],
      }),
      sub("exam-skills.answering", "P2", "Answering structured and data-response questions", {
        form: F56,
        covers: ["ageo.skills.extended-writing"],
        objectives: [
          "Interpret command words and plan responses to 25-mark structured, free-response and data-response questions.",
          "Support explanations with located detail and reach a supported judgement.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "geography",
  versionLabel: "2015-2022",
  family: "geography-a",
  title: "ZIMSEC A-Level Geography",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Geography Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their order (1 to 15) are transcribed from the topic list (6.0) of the Ministry's Geography Syllabus Forms 5 - 6 (2015 - 2022). Sub-topics are the key concepts of the competency matrix (8.0) and the items of the scope and sequence (7.0), joined into one node where one lesson teaches several printed items; the form in which each is taught comes from the matrix and the scope and sequence. The matrix has no printed numbers for key concepts, so all sub-topic codes (1.1 ...), all objective codes and the node P (Map interpretation and examination skills) are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's address because the file has no stable direct link). The cover prints 'Geography Syllabus Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, 2015). It was read through pdftotext renderings in which the scope and sequence, the competency matrix and the assessment tables come out with columns interleaved or overprinted; check every heading, the form of each item, the assessment tables and the Paper 3 structure against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document; confirm the ZIMSEC A-Level Geography code (code left null).",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6, and a newer Geography syllabus may exist. Confirm which Geography syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Numbering and structure: the topic list numbers the fifteen topics 6.1-6.15 (6.14 and 6.15 are repeated on the next page of the copy), the scope and sequence 7.1-7.15; the competency matrix lists the topics by form (Form 5 topics 1-15, then the Form 6 rows). This tree follows the topic list (1-15) and tags each sub-topic Form 5, Form 6 or Forms 5-6. Topic 3 (EIA and projects) and topic 7 (biodiversity and ecosystem management) continue in Form 6 and are tagged Forms 5-6. Topics 6 and 12 are marked in the Form 6 matrix as completed in Form 5.",
    "Gaps in the copy read: the scope and sequence lists 'Economic activities (primary, secondary, tertiary, quaternary) and their role in economic development' (Form 5) and 'SMEs in Zimbabwe and their impact on economic development' (Form 6) under topic 15, but the matrix rows for topic 15 cover only indicators of development and regional inequalities; the economic-activities item is recorded with indicators (15.1) and the SMEs item with SMEs (12.2). 'Cyclones and anticyclones' appears in the matrix under air masses; the scope lists weather processes and air masses only. Gersmehl diagrams are printed 'Gerschmel'.",
    "Assessment (9.0) as read: continuous assessment 40% (individual research project 10%, community project 10%, practical 10%, theory tests 10%, each spread over Forms 5 and 6; project report of 2 500 to 3 000 words) and a summative examination 60%: Paper 1 physical component (3 hours, 100 marks, 25%: ten structured questions of 25 marks, two per physical topic, candidates answer any four), Paper 2 human component (3 hours, 100 marks, 25%: ten structured free-response and data-response questions of 25 marks, each topic contributing at least one, candidates answer any four) and Paper 3 practical (3 hours, 75 marks, 10%: seven questions of 25 marks; Section A one compulsory statistics question; Section B three questions on topographical map, GIS and remote sensing, answer one; Section C three questions on research techniques (physical component, human component, mitigation and adaptation), answer one; GIS work on computers may be included). The papers total 275 marks. Skill weightings: knowledge and comprehension 25% / 25% / 20%, skills and application 50% / 50% / 40%, judgement and decision making 25% / 25% / 40% for Papers 1, 2 and 3. These tables are partly overprinted in the copy: confirm the Paper 3 section rules and the weightings.",
    "Which topics feed which paper (our reading): Paper 1 physical component = topics 3-7 (environmental management, atmospheric processes, geomorphology, hydrology, biogeography; ten questions, two per topic); Paper 2 human component = topics 8-15 (population, settlement, agriculture, mining, industry, energy, transport and trade, regional inequalities); Paper 3 = topics 1 and 2 with research techniques across all topics. The syllabus does not state this mapping; confirm it.",
    "Many concepts are shared with Cambridge 9696 (concepts ageo.*). Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (GIS, remote sensing, statistics, mining, agriculture, industry, transport, Zimbabwean trade, regional inequalities, EIA projects) are ZIMSEC only. The shared concept on water supply (ageo.water.supply-demand-security) also carries the ZIMSEC ground-water item.",
  ],
  overview: "The ZIMSEC A-Level Geography syllabus (Forms 5-6) has fifteen compulsory topics. It begins with practical geography: GIS and remote sensing, and geo-statistical analysis and presentation (levels of measurement, correlation, regression, hypothesis tests, graphs and maps, research techniques, spatial interpolation and autocorrelation). The physical topics are environmental management, atmospheric processes, geomorphology (plate tectonics, weathering, slopes, tropical landforms, mass movements), hydrology and fluvial processes, and biogeography (vegetation, succession, nutrient cycles, biodiversity, soils). The human topics are population and migration, settlement dynamics, agricultural production and food security, mining and mineral beneficiation, industrial dynamics (with tourism), energy sources, transport systems and trade, and regional inequalities and development, with strong Zimbabwean and southern African emphasis, enterprise projects and indigenous knowledge systems.",
  assessmentOverview: "Continuous assessment (research project, community project, practical, theory tests) carries 40%. The examination carries 60%: Paper 1 physical geography (3 hours, 100 marks, 25%), Paper 2 human geography (3 hours, 100 marks, 25%) and Paper 3 practical (3 hours, 75 marks, 10%: statistics, mapping and GIS, research techniques).",
  components: [
    { code: "1", name: "Paper 1: Physical component", kind: "WRITTEN", description: "Ten structured and data-response questions of 25 marks, two per physical topic (topics 3-7); candidates answer any four.", durationMinutes: 180, maxMarks: 100, weightingPercent: 25 },
    { code: "2", name: "Paper 2: Human component", kind: "WRITTEN", description: "Ten structured free-response and data-response questions of 25 marks on topics 8-15, each topic contributing at least one; candidates answer any four.", durationMinutes: 180, maxMarks: 100, weightingPercent: 25 },
    { code: "3", name: "Paper 3: Practical", kind: "PRACTICAL", description: "Seven questions of 25 marks based on experiments, investigations, observations and calculations: Section A one compulsory statistics question; Section B topographical map, GIS and remote sensing questions (answer one); Section C research techniques questions (physical, human, mitigation and adaptation: answer one). Total 75 marks.", durationMinutes: 180, maxMarks: 75, weightingPercent: 10 },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Geography 9696, 2027-2029. Topics 1-14 and sub-topics (1.1 ...) are numbered as
// printed; objective codes are the printed content-heading references (1.1.4 = topic 1.1, heading 4; a suffix a/b where
// one heading is split in two objectives). The three sections (AS, A, SK) and the skills node codes S1-S3 are ours.
const P1 = ["1"];
const P2 = ["2"];
const P3 = ["3"];
const P4 = ["4"];
const ASL = "AS Level";
const A3 = "A Level only, Paper 3 option";
const A4 = "A Level only, Paper 4 option";
const SKL = "Skills (all papers)";
const o = (code, text) => [code, text];

const C9696_TOPICS = [
  section("as-content", "AS", "AS Level subject content", {
    description: "Topics 1-6: studied by all candidates; examined in Papers 1 (physical) and 2 (human) and assumed knowledge for Papers 3 and 4.",
    children: [
      topic("hydrology", "1", "Hydrology, river processes and hazards", {
        components: P1,
        children: [
          sub("hydrology.drainage-basin", "1.1", "The drainage basin system", {
            stage: ASL,
            covers: ["ageo.hydro.drainage-basin-system", "ageo.hydro.hydrographs-morphometry"],
            objectives: [
              o("1.1.1", "Describe the drainage basin as an open system with inputs, outputs, stores and transfers and how they relate."),
              o("1.1.2", "Describe the movement of water: precipitation inputs; evaporation, evapotranspiration, condensation and channel-flow outputs; stores; and transfers such as stemflow, throughfall, infiltration, overland flow, throughflow, percolation and baseflow."),
              o("1.1.3", "Explain how basin size, shape, drainage density, soils, rocks, vegetation, land use and climate influence the movement of water."),
              o("1.1.4a", "Read and interpret annual hydrographs and explain the factors behind variations in discharge through the year."),
              o("1.1.4b", "Identify the parts of a storm hydrograph and explain the factors that influence its shape."),
            ],
          }),
          sub("hydrology.river-channels", "1.2", "River channel processes and landforms", {
            stage: ASL,
            covers: ["ageo.hydro.river-processes-landforms"],
            objectives: [
              o("1.2.1", "Explain river erosion, load transport and deposition and the relationship between velocity, discharge and load size."),
              o("1.2.2", "Describe river flow: velocity and discharge, laminar, turbulent and helicoidal flow, and the thalweg."),
              o("1.2.3", "Explain the formation of meanders, riffles and pools, waterfalls, gorges, bluffs, floodplains and levees."),
            ],
          }),
          sub("hydrology.floods", "1.3", "River flood hazards and impacts", {
            stage: ASL,
            covers: ["ageo.hydro.river-floods", "ageo.hydro.flood-management"],
            objectives: [
              o("1.3.1", "Explain the physical and human causes of river floods."),
              o("1.3.2", "Describe the short- and long-term impacts of river floods and the factors of vulnerability."),
              o("1.3.3", "Evaluate prediction, forecasting, warning, hard and soft engineering and emergency responses, with a detailed specific example of one recent river flood."),
            ],
          }),
        ],
      }),
      topic("atmosphere", "2", "Atmospheric processes and global climate change", {
        description: "Candidates need an outline understanding of the vertical structure and composition of the atmosphere.",
        components: P1,
        children: [
          sub("atmosphere.energy-budgets", "2.1", "Energy budgets", {
            stage: ASL,
            covers: ["ageo.atmos.energy-budget", "ageo.atmos.global-transfers"],
            objectives: [
              o("2.1.1", "Explain energy budget systems: inputs, outputs, absorption, reflection, scattering, conduction, back radiation, latent and sensible heat."),
              o("2.1.2", "Describe the global energy budget: latitudinal excesses and deficits and the natural greenhouse effect."),
              o("2.1.3", "Explain atmospheric and oceanic transfers of energy: the tri-cellular model, ITCZ, wind belts, jet streams, ocean currents and gyres, and how they interact."),
              o("2.1.4", "Explain seasonal variations in temperature, pressure and wind belts."),
              o("2.1.5", "Compare daytime and night-time (diurnal) energy budgets."),
            ],
          }),
          sub("atmosphere.weather-processes", "2.2", "Weather processes and phenomena", {
            stage: ASL,
            covers: ["ageo.atmos.moisture-precipitation"],
            objectives: [
              o("2.2.1", "Describe evaporation, condensation, freezing, melting and sublimation."),
              o("2.2.2", "Explain convectional, frontal, orographic and radiation-cooling causes of precipitation."),
              o("2.2.3", "Describe the types of precipitation: clouds, rain, hail, snow, dew and fog."),
            ],
          }),
          sub("atmosphere.climate-change", "2.3", "Global warming and climate change", {
            description: "Candidates need an outline understanding of climate change over the last 100 million years.",
            stage: ASL,
            covers: ["ageo.atmos.climate-evidence-causes"],
            objectives: [
              o("2.3.1", "Evaluate the evidence for global warming and climate change: proxy records, temperature records since 1850, carbon dioxide, sea level, sea ice and glaciers."),
              o("2.3.2", "Explain the causes: greenhouse gases and their global warming potential, natural factors (solar output, volcanoes, ENSO) and human factors, and the significance of the enhanced greenhouse effect."),
            ],
          }),
        ],
      }),
      topic("earth-processes", "3", "Earth processes and mass movements", {
        description: "Candidates need an outline understanding of the structure of the Earth.",
        components: P1,
        children: [
          sub("earth-processes.plate-tectonics", "3.1", "Plate tectonics", {
            stage: ASL,
            covers: ["ageo.tectonics.plates-evidence"],
            objectives: [
              o("3.1.1", "Compare continental and oceanic plates and describe plate movement."),
              o("3.1.2", "Explain continental drift, geological and fossil evidence, sea-floor spreading and palaeomagnetism, convection currents, slab pull and ridge push."),
              o("3.1.3", "Describe the global distribution of divergent, convergent (destructive), collision and conservative plate boundaries."),
            ],
          }),
          sub("earth-processes.tectonic-processes", "3.2", "Tectonic processes and landforms", {
            stage: ASL,
            covers: ["ageo.tectonics.processes-landforms"],
            objectives: [
              o("3.2.1", "Describe faulting, rifting, sea-floor spreading, subduction, shearing and thrusting at each boundary type."),
              o("3.2.2", "Explain the formation of fold mountains, volcanoes, mid-ocean ridges, ocean trenches, island arcs, fault scarps and rift valleys."),
            ],
          }),
          sub("earth-processes.mass-movements", "3.3", "Mass movement hazards and impacts", {
            stage: ASL,
            covers: ["ageo.geomorph.mass-movements"],
            objectives: [
              o("3.3.1", "Describe heaves, flows, slides and falls."),
              o("3.3.2", "Explain the physical and human causes of mass movement."),
              o("3.3.3", "Evaluate prediction, slope stability measures and emergency responses, with a detailed specific example of one recent mass movement."),
            ],
          }),
        ],
      }),
      topic("population-migration", "4", "Population and migration", {
        components: P2,
        children: [
          sub("population-migration.global-population", "4.1", "Global population", {
            stage: ASL,
            covers: ["ageo.pop.distribution-growth", "ageo.pop.indicators-components"],
            objectives: [
              o("4.1.1", "Describe global population distribution and density and the factors that influence them."),
              o("4.1.2", "Explain trends in global population growth and their regional variations."),
              o("4.1.3", "Explain natural increase and net migration, birth and death rates, TFR, IMR and life expectancy, and the factors that affect fertility and mortality."),
            ],
          }),
          sub("population-migration.population-structure", "4.2", "Population structure", {
            stage: ASL,
            covers: ["ageo.pop.structure-dtm", "ageo.pop.policies"],
            objectives: [
              o("4.2.1", "Describe the components of population structure and interpret age-sex structure diagrams."),
              o("4.2.2", "Critically evaluate the demographic transition model and explain the impacts of youthful and ageing populations."),
              o("4.2.3", "Explain why governments manage natural increase and evaluate the population policies of two contrasting countries."),
            ],
          }),
          sub("population-migration.migration", "4.3", "Migration", {
            stage: ASL,
            covers: ["ageo.pop.migration-types-patterns", "ageo.pop.migration-causes-impacts"],
            objectives: [
              o("4.3.1", "Distinguish voluntary, forced, temporary and permanent international migration."),
              o("4.3.2", "Explain push and pull factors and the constraints on migration."),
              o("4.3.3", "Evaluate the impacts of migration on source areas, destinations and migrants, with a detailed specific example of one country."),
            ],
          }),
        ],
      }),
      topic("water-resources", "5", "Water resources and management", {
        description: "Candidates need the drainage basin system from Topic 1.",
        components: P2,
        children: [
          sub("water-resources.global-resources", "5.1", "Global water resources", {
            stage: ASL,
            covers: ["ageo.water.global-resources"],
            objectives: [
              o("5.1.1", "Describe types of water resource and the global pattern of supply."),
              o("5.1.2", "Explain the human water cycle and how human activities modify the water cycle."),
              o("5.1.3", "Explain trends in water consumption, water stress and scarcity."),
            ],
          }),
          sub("water-resources.regional-factors", "5.2", "Factors influencing water resources at the regional/national scale", {
            stage: ASL,
            covers: ["ageo.water.supply-demand-security"],
            objectives: [
              o("5.2.1", "Explain the physical and human factors that influence the supply of water."),
              o("5.2.2", "Explain the population, economic and seasonal factors that influence demand."),
              o("5.2.3", "Explain water security and insecurity, access issues and the impact of drought."),
            ],
          }),
          sub("water-resources.management", "5.3", "Management of water resources at the regional/national scale", {
            stage: ASL,
            covers: ["ageo.water.management-strategies"],
            objectives: [
              o("5.3.1", "Evaluate strategies to increase water resources and access to water."),
              o("5.3.2", "Evaluate strategies to manage demand for water."),
              o("5.3.3", "Evaluate the challenges of managing water resources, with a detailed specific example from one country."),
            ],
          }),
        ],
      }),
      topic("urban-areas", "6", "Urban areas and management", {
        components: P2,
        children: [
          sub("urban-areas.urban-growth", "6.1", "Urban growth", {
            stage: ASL,
            covers: ["ageo.urban.urbanisation-processes", "ageo.settle.hierarchy-theories"],
            objectives: [
              o("6.1.1", "Describe processes of urban growth: urbanisation, suburbanisation, sprawl, counter-urbanisation, re-urbanisation and regeneration."),
              o("6.1.2", "Explain the causes and consequences of urban growth for urban and rural areas."),
              o("6.1.3", "Explain the hierarchy of urban areas, primate cities and world cities."),
            ],
          }),
          sub("urban-areas.structure-change", "6.2", "Urban structure and change", {
            stage: ASL,
            covers: ["ageo.urban.structure-change"],
            objectives: [
              o("6.2.1", "Explain the factors that influence urban structure and land-use zones, place identity and perception."),
              o("6.2.2", "Explain the changing location of the CBD, retail, manufacturing, services and residential activities."),
              o("6.2.3", "Explain the zonation of residential areas."),
            ],
          }),
          sub("urban-areas.sustainable-development", "6.3", "Sustainable urban development", {
            stage: ASL,
            covers: ["ageo.urban.sustainability-management"],
            objectives: [
              o("6.3.1", "Explain the challenges of sustainability and the different views of groups of people."),
              o("6.3.2", "Describe sustainability issues: waste, transport, housing, green space and water."),
              o("6.3.3", "Evaluate strategies for the sustainable management of urban areas, with a detailed specific example of one urban area."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("a-level-content", "A", "A Level subject content", {
    description: "Topics 7-14: A Level candidates study all the AS Level content and choose two of the four Paper 3 topics (7-10) and two of the four Paper 4 topics (11-14).",
    children: [
      topic("tropical-environments", "7", "Tropical environments", {
        description: "Paper 3 option (choose two of topics 7-10).",
        components: P3,
        optional: true,
        optionGroup: "paper-3-global-environments",
        children: [
          sub("tropical-environments.climates", "7.1", "Tropical climates", {
            stage: A3,
            covers: ["ageo.tropical.climates"],
            objectives: [
              o("7.1.1", "Describe the global distribution of humid tropical (rainforest) and seasonally humid tropical (savanna) environments."),
              o("7.1.2", "Describe their climates, including monsoons, annual and diurnal variations."),
              o("7.1.3", "Explain the distribution and climate using the ITCZ, subtropical anticyclones, monsoons and ENSO."),
            ],
          }),
          sub("tropical-environments.processes-landforms", "7.2", "Processes and landforms in tropical environments", {
            stage: A3,
            covers: ["ageo.geomorph.weathering", "ageo.tropical.landforms-granite-karst"],
            objectives: [
              o("7.2.1", "Explain chemical, physical and biological weathering processes in tropical environments."),
              o("7.2.2", "Describe and explain granite landforms: bornhardts (dwala, ruware), kopjes and tors."),
              o("7.2.3", "Describe and explain tropical karst: cone, tower and cockpit karst."),
            ],
          }),
          sub("tropical-environments.vegetation-soils", "7.3", "Vegetation, soils and ecosystems in tropical environments", {
            stage: A3,
            covers: ["ageo.tropical.vegetation-soils", "ageo.bio.nutrient-cycles"],
            objectives: [
              o("7.3.1", "Explain the development of plant communities in rainforest and savanna and the effects of climate and people."),
              o("7.3.2", "Describe tropical soil-forming processes, soil types and profiles."),
              o("7.3.3", "Explain nutrient cycling using Gersmehl diagrams and the effects of burning, clearing and deforestation."),
            ],
          }),
          sub("tropical-environments.challenges", "7.4", "Changes and challenges in tropical environments", {
            stage: A3,
            covers: ["ageo.tropical.challenges"],
            objectives: [
              o("7.4.1", "Explain population pressure, exploitation and climate-change challenges for tropical environments."),
              o("7.4.2", "Evaluate management strategies in a detailed specific example of one rainforest or savanna ecosystem."),
            ],
          }),
        ],
      }),
      topic("coastal-environments", "8", "Coastal environments", {
        description: "Paper 3 option (choose two of topics 7-10).",
        components: P3,
        optional: true,
        optionGroup: "paper-3-global-environments",
        children: [
          sub("coastal-environments.processes", "8.1", "Coastal processes", {
            stage: A3,
            covers: ["ageo.coastal.waves-erosion-transport"],
            objectives: [
              o("8.1.1", "Explain the factors influencing coastal environments: waves, rock type and structure, climate and human activity."),
              o("8.1.2", "Describe marine erosion processes."),
              o("8.1.3", "Describe sub-aerial weathering and mass movement on coasts."),
              o("8.1.4", "Explain marine transportation and deposition, longshore drift and sediment cells."),
            ],
          }),
          sub("coastal-environments.landforms", "8.2", "Characteristics and formation of coastal landforms", {
            stage: A3,
            covers: ["ageo.coastal.erosional-landforms", "ageo.coastal.depositional-landforms", "ageo.coastal.dunes-saltmarsh-mangrove"],
            objectives: [
              o("8.2.1", "Explain the role of coastal processes in forming and shaping landforms."),
              o("8.2.2", "Describe and explain erosional landforms and concordant and discordant coastlines."),
              o("8.2.3", "Describe and explain beaches, spits, tombolos and barrier beaches."),
              o("8.2.4", "Explain the formation of sand dunes, saltmarshes and mangrove swamps."),
            ],
          }),
          sub("coastal-environments.coral-reefs", "8.3", "Coral reefs", {
            description: "Candidates need a basic understanding of what coral is, its slow growth and the importance of reefs.",
            stage: A3,
            covers: ["ageo.coastal.coral-reefs"],
            objectives: [
              o("8.3.1", "Describe the distribution of coral reefs and the conditions for coral growth."),
              o("8.3.2", "Explain the threats to coral reefs and evaluate management strategies."),
            ],
          }),
          sub("coastal-environments.challenges", "8.4", "Physical and human challenges to the coastal environment", {
            stage: A3,
            covers: ["ageo.coastal.management-case"],
            objectives: [o("8.4.1", "Evaluate hard and soft engineering management strategies in a detailed specific example of a stretch of coastline.")],
          }),
        ],
      }),
      topic("hazardous-environments", "9", "Hazardous environments", {
        description: "Paper 3 option (choose two of topics 7-10).",
        components: P3,
        optional: true,
        optionGroup: "paper-3-global-environments",
        children: [
          sub("hazardous-environments.earthquakes-volcanoes", "9.1", "Earthquake and volcanic hazards and impacts", {
            stage: A3,
            covers: ["ageo.hazard.earthquakes", "ageo.hazard.volcanoes", "ageo.hazard.eq-volcano-management"],
            objectives: [
              o("9.1.1", "Describe the global distribution of earthquakes and volcanoes and the related plate boundaries."),
              o("9.1.2", "Explain the severity, hazards, vulnerability and impacts of earthquakes."),
              o("9.1.3", "Explain volcano formation, types, eruption styles, hazards, the VEI, vulnerability and impacts."),
              o("9.1.4", "Evaluate prediction, risk perception, design and planning, and emergency response and recovery."),
            ],
          }),
          sub("hazardous-environments.tropical-cyclones", "9.2", "Tropical cyclone hazards and impacts", {
            stage: A3,
            covers: ["ageo.hazard.tropical-cyclones"],
            objectives: [
              o("9.2.1", "Explain the distribution, conditions, formation and strength scale of tropical cyclones."),
              o("9.2.2", "Describe the hazards, vulnerability, impacts and climate-change links."),
              o("9.2.3", "Evaluate prediction, warning and management strategies."),
            ],
          }),
          sub("hazardous-environments.wildfires", "9.3", "Wildfire hazards and impacts", {
            stage: A3,
            covers: ["ageo.hazard.wildfires"],
            objectives: [
              o("9.3.1", "Describe the global distribution of wildfire risk and the physical and human causes."),
              o("9.3.2", "Explain wildfire spread, vulnerability, impacts and climate-change effects."),
              o("9.3.3", "Evaluate prediction and management of wildfires."),
            ],
          }),
          sub("hazardous-environments.multi-hazard", "9.4", "Challenges in multi-hazard environments", {
            stage: A3,
            covers: ["ageo.hazard.multi-hazard-case"],
            objectives: [o("9.4.1", "Evaluate management of two or more hazards in a detailed specific example of one multi-hazard environment.")],
          }),
        ],
      }),
      topic("arid-environments", "10", "Arid environments", {
        description: "Paper 3 option (choose two of topics 7-10).",
        components: P3,
        optional: true,
        optionGroup: "paper-3-global-environments",
        children: [
          sub("arid-environments.climates", "10.1", "Arid climates", {
            stage: A3,
            covers: ["ageo.arid.climates-causes"],
            objectives: [
              o("10.1.1", "Describe the global distribution of hot arid and hot semi-arid environments."),
              o("10.1.2", "Describe their climatic characteristics."),
              o("10.1.3", "Explain the causes of aridity."),
            ],
          }),
          sub("arid-environments.processes-landforms", "10.2", "Processes and landforms in arid environments", {
            stage: A3,
            covers: ["ageo.arid.weathering-wind", "ageo.arid.water-landforms"],
            objectives: [
              o("10.2.1", "Explain physical and chemical weathering in arid environments."),
              o("10.2.2", "Explain wind erosion, transportation and deposition."),
              o("10.2.3", "Explain fluvial processes, episodic rainfall, sheet floods and flash floods."),
              o("10.2.4", "Describe and explain wind and water erosional and depositional landforms."),
            ],
          }),
          sub("arid-environments.vegetation-soils", "10.3", "Vegetation and soils in arid environments", {
            stage: A3,
            covers: ["ageo.arid.vegetation-soils"],
            objectives: [
              o("10.3.1", "Describe vegetation characteristics and plant adaptations to extreme temperatures and drought."),
              o("10.3.2", "Describe soil-forming processes and the characteristics of solonetz and solonchaks."),
            ],
          }),
          sub("arid-environments.challenges", "10.4", "Changes and challenges in arid environments", {
            stage: A3,
            covers: ["ageo.arid.challenges"],
            objectives: [
              o("10.4.1", "Explain population pressure, desertification and climate-change challenges."),
              o("10.4.2", "Evaluate management strategies in a detailed specific example of one arid or semi-arid environment."),
            ],
          }),
        ],
      }),
      topic("climate-change-governance", "11", "Climate change impacts and governance", {
        description: "Paper 4 option (choose two of topics 11-14). Topic 2.3 is assumed knowledge. Candidates need only an outline knowledge of the IPCC; details of RCPs and SSPs are not required.",
        components: P4,
        optional: true,
        optionGroup: "paper-4-global-themes",
        children: [
          sub("climate-change-governance.future-climate", "11.1", "Our future global climate", {
            stage: A4,
            covers: ["ageo.climate.projections-environments", "ageo.climate.tipping-points"],
            objectives: [
              o("11.1.1", "Interpret the five categories of projected climate change in terms of warming, emissions, peak and net-zero years, and their impacts on sea level, precipitation and extreme weather."),
              o("11.1.2", "Explain climate change impacts on cold and marine environments."),
              o("11.1.3", "Explain feedback loops, tipping points and their possible effects."),
            ],
          }),
          sub("climate-change-governance.socio-economic", "11.2", "Socio-economic impacts of climate change", {
            stage: A4,
            covers: ["ageo.climate.impacts-vulnerability"],
            objectives: [
              o("11.2.1", "Describe the global socio-economic impacts of climate change and their distribution."),
              o("11.2.2", "Explain patterns of human vulnerability and the groups the IPCC identifies as most vulnerable."),
            ],
          }),
          sub("climate-change-governance.governance", "11.3", "Governance of climate change", {
            description: "Candidates need an outline knowledge of the UNFCCC and COP meetings and their links to the IPCC.",
            stage: A4,
            covers: ["ageo.climate.mitigation-adaptation-governance"],
            objectives: [
              o("11.3.1", "Describe the Paris Agreement and major agreements since 2015."),
              o("11.3.2", "Evaluate mitigation and adaptation strategies and the challenges of implementing them."),
              o("11.3.3", "Compare the management strategies of two countries (detailed specific examples), including justice issues."),
            ],
          }),
        ],
      }),
      topic("environmental-issues", "12", "Environmental issues and management", {
        description: "Paper 4 option (choose two of topics 11-14).",
        components: P4,
        optional: true,
        optionGroup: "paper-4-global-themes",
        children: [
          sub("environmental-issues.energy", "12.1", "Energy supplies", {
            stage: A4,
            covers: ["ageo.energy.sources-patterns", "ageo.energy.transition-security"],
            objectives: [
              o("12.1.1", "Describe energy resources used to produce electricity and domestic fuels, their uses and issues, and global patterns and trends."),
              o("12.1.2", "Explain the challenges of the transition from fossil fuels to sustainable energy."),
              o("12.1.3", "Explain the national factors that affect the balance between energy sources."),
              o("12.1.4", "Evaluate electricity production and energy security in two contrasting countries (detailed specific examples)."),
            ],
          }),
          sub("environmental-issues.rural", "12.2", "Pollution and environmental degradation in rural areas", {
            stage: A4,
            covers: ["ageo.env.degradation"],
            objectives: [
              o("12.2.1", "Explain how mining and quarrying, agriculture and large infrastructure projects cause pollution and degradation."),
              o("12.2.2", "Evaluate sustainable practices in extraction and agriculture, monitoring and legislation."),
              o("12.2.3", "Evaluate a detailed specific example of environmental degradation in one rural area."),
            ],
          }),
          sub("environmental-issues.urban", "12.3", "Pollution and environmental degradation in urban areas", {
            stage: A4,
            covers: ["ageo.env.pollution"],
            objectives: [
              o("12.3.1", "Explain the factors and sources of pollution and degradation in urban environments in LICs, MICs and HICs."),
              o("12.3.2", "Evaluate sustainable practices in domestic environments, construction, energy, transport and waste management."),
              o("12.3.3", "Explain the reasons for urban planning and controls."),
              o("12.3.4", "Evaluate a detailed specific example of environmental degradation in one urban area."),
            ],
          }),
        ],
      }),
      topic("trade-aid-tourism", "13", "Trade, aid and tourism", {
        description: "Paper 4 option (choose two of topics 11-14).",
        components: P4,
        optional: true,
        optionGroup: "paper-4-global-themes",
        children: [
          sub("trade-aid-tourism.trade-patterns", "13.1", "Global trade patterns and change", {
            stage: A4,
            covers: ["ageo.trade.global-flows-balance", "ageo.trade.global-factors-cases"],
            objectives: [
              o("13.1.1", "Describe flows and patterns of visible trade and inequalities in volume and value."),
              o("13.1.2", "Explain the physical, historical, economic and political factors influencing trade patterns."),
              o("13.1.3", "Compare two contrasting countries' trade, one dependent on primary commodity exports (detailed specific examples)."),
            ],
          }),
          sub("trade-aid-tourism.organisations", "13.2", "International organisations involved in trade and aid", {
            stage: A4,
            covers: ["ageo.trade.igos-aid"],
            objectives: [
              o("13.2.1", "Explain the role and impact of the WTO and UNCTAD on global trade flows."),
              o("13.2.2", "Evaluate types of international aid and the roles of NGOs and IGOs."),
            ],
          }),
          sub("trade-aid-tourism.tourism", "13.3", "International tourism", {
            stage: A4,
            covers: ["ageo.tourism.patterns-trends", "ageo.tourism.impacts-management"],
            objectives: [
              o("13.3.1", "Describe patterns and trends in international tourism and the factors behind them."),
              o("13.3.2", "Evaluate the economic, social and environmental impacts of tourism and the issues of sustainability."),
              o("13.3.3", "Evaluate tourism development and management in two contrasting tourist areas or resorts (detailed specific examples)."),
            ],
          }),
        ],
      }),
      topic("disease-geography", "14", "Disease and geography", {
        description: "Paper 4 option (choose two of topics 11-14). The focus is on the environmental, social, economic and political aspects of disease, not the medical and biological detail.",
        components: P4,
        optional: true,
        optionGroup: "paper-4-global-themes",
        children: [
          sub("disease-geography.distribution", "14.1", "Distribution of diseases", {
            stage: A4,
            covers: ["ageo.disease.geography-patterns"],
            objectives: [
              o("14.1.1", "Use terms for the spread and impact of disease: outbreak, epidemic, pandemic, endemic, prevalence, morbidity, death rate, IMR, life expectancy, GDP and healthcare spending."),
              o("14.1.2", "Explain the spatial variation in disease and in causes of death between LICs, MICs and HICs."),
            ],
          }),
          sub("disease-geography.pathogenic-diseases", "14.2", "Pathogenic diseases, their spread and impacts", {
            stage: A4,
            covers: ["ageo.disease.influenza", "ageo.disease.cholera", "ageo.disease.malaria"],
            objectives: [
              o("14.2.1", "Explain the transmission, distribution and impacts of influenza and one country's control strategies."),
              o("14.2.2", "Explain the transmission, distribution and impacts of cholera and one country's control strategies."),
              o("14.2.3", "Explain the transmission, distribution and impacts of malaria and one country's control strategies."),
            ],
          }),
          sub("disease-geography.monitoring-response", "14.3", "Monitoring and response to pathogenic diseases", {
            stage: A4,
            covers: ["ageo.disease.monitoring-response", "ageo.disease.pandemic-eradication"],
            objectives: [
              o("14.3.1", "Explain the factors in effective disease monitoring and the controls of disease."),
              o("14.3.2", "Explain the factors in an effective response to outbreaks."),
              o("14.3.3", "Compare two contrasting countries' responses to one pandemic since 2000."),
              o("14.3.4", "Critically evaluate a global programme to eradicate one pathogenic disease."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("geographical-skills", "SK", "Geographical skills", {
    description: "Skills used throughout the course and in every paper. Fieldwork and geographical investigations are encouraged but not assessed; GIS and technology are encouraged but not used in exam papers.",
    children: [
      topic("skills", "S", "Geographical skills, resources and evaluation", {
        components: ["1", "2", "3", "4"],
        children: [
          sub("skills.resources", "S1", "Resource skills", {
            stage: SKL,
            covers: ["ageo.skills.graphs-maps-resources", "ageo.skills.topographic-maps"],
            objectives: [
              o("S1.1", "Interpret survey map extracts (1:25 000 and 1:50 000), thematic and distribution maps and sketch maps."),
              o("S1.2", "Interpret photographs and satellite images, graphs and diagrams, written extracts and numeric data, and recognise their limitations."),
            ],
          }),
          sub("skills.fieldwork", "S2", "Fieldwork and geographical investigations", {
            stage: SKL,
            covers: ["ageo.skills.research-techniques"],
            objectives: [
              o("S2.1", "Plan and carry out small-scale fieldwork or a classroom-based investigation and collect primary data (not assessed)."),
              o("S2.2", "Evaluate the reliability and limitations of data collected."),
            ],
          }),
          sub("skills.evaluation", "S3", "Argument, evaluation and command words", {
            stage: SKL,
            covers: ["ageo.skills.extended-writing"],
            objectives: [
              o("S3.1", "Respond to the command words (describe, explain, assess, evaluate, compare, suggest and others) in structured questions and essays."),
              o("S3.2", "Present a logical, structured, evidence-based argument supported by examples and a conclusion."),
            ],
          }),
        ],
      }),
    ],
  }),
];

const c9696 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "geography",
  versionLabel: "2027-2029",
  family: "geography-a",
  title: "Cambridge International AS & A Level Geography (9696)",
  code: "9696",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Geography 9696 syllabus for 2027, 2028 and 2029 (version 1, published September 2024)",
    url: "https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Hydrology, river processes and hazards ... 14.3 Monitoring and response to pathogenic diseases) are transcribed with their printed numbers; objective codes are the printed content-heading references (topic, sub-topic, heading, e.g. 1.1.4, with a suffix a or b where one heading yields two objectives). Objectives paraphrase the content in our own words. The three sections (AS, A, SK) and the skills topic S (S1-S3) are ours, summarising the geographical skills, resource skills and assessment objectives sections. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the official PDF 'Cambridge International AS & A Level Geography 9696 syllabus for 2027, 2028 and 2029', version 1, published September 2024, read through a pdftotext rendering (content overview, assessment overview and objectives, all subject content, details of the assessment and the changes page). Exams in the June and November series. Check the headings and codes against the PDF.",
    "This version is examined from 2027. A candidate sitting the examination in 2026 is examined on the previous syllabus (for exams up to 2026), which is not in the repository and has a different topic structure (for example Population and Migration were separate topics, Settlement dynamics and Production, location and change existed). Do not use this version for 2026 candidates.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4, which must be taken in the same series); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Papers 1 and 2 are 50% of AS Level and 25% of A Level each; Papers 3 and 4 are 25% of A Level each. weightingPercent records the A Level share; the AS shares are in each paper's description. Assessment objectives: AO1 Knowledge and understanding, AO2 Skills and analysis, AO3 Evaluation; the printed weightings table is partly overprinted in the copy read (AS Level about 53 / 35 / 12; A Level about 50 / 26 / 24 across the whole qualification): check it.",
    "Paper structures as read: Paper 1 and Paper 2 (1 hour 30 minutes, 60 marks) each have Section A (all questions: one 15-mark structured question on each of the three topics, based on resources in an insert) and Section B (one 15-mark essay from a choice of three, one per topic); candidates write on the question paper. Paper 3 and Paper 4 (1 hour 30 minutes, 60 marks) each ask candidates to choose two of four topics; each chosen topic has one compulsory structured question worth 10 marks (resource-based) and one 20-mark essay from a choice of two; separate answer booklet. The overview page prints Section A as 45 marks and Section B as 15 marks, consistent with the details.",
    "Detailed specific examples ('case studies') are not prescribed: teachers choose them, and the syllabus recommends examples from CE 2000 to the present. Where two contrasting countries are required, the syllabus suggests World Bank income groups. Writers choose real, dated, factual examples and label data with its source.",
    "Topics 7-10 (Paper 3) and 11-14 (Paper 4) are optional groups: candidates choose two from each. The whole set is modelled so that every topic has content. Sub-topics 7.2 (weathering, 7.2.1, with granite landforms and karst), 8.1.3 (sub-aerial processes) and 10.2.1 (arid weathering) each deal with weathering; the shared weathering concept is covered once, at 7.2, and the coastal and arid applications sit in their own concepts.",
    "Statistical tests, GIS and remote sensing are not part of the Cambridge content (the syllabus encourages GIS and technology in the classroom but states they are not used in exam papers; geography fieldwork is not assessed). Those concepts are ZIMSEC only.",
    "The Cambridge syllabus gives no part marks or sub-question structure for the structured questions beyond the totals above; the structures used by our practice items are conventions a reviewer must check against the specimen papers.",
  ],
  overview: "Cambridge International AS & A Level Geography (9696) is a two-stage course. The AS Level content has six topics: Paper 1 Physical Geography (hydrology, river processes and hazards; atmospheric processes and global climate change; Earth processes and mass movements) and Paper 2 Human Geography (population and migration; water resources and management; urban areas and management). The A Level adds two options from Paper 3 Global Environments (tropical, coastal, hazardous and arid environments) and two from Paper 4 Global Themes (climate change impacts and governance; environmental issues and management; trade, aid and tourism; disease and geography), with resource-based and evaluative essay skills and detailed specific examples throughout.",
  assessmentOverview: "AS Level candidates take Paper 1 Physical Geography and Paper 2 Human Geography (each 1 hour 30 minutes, 60 marks: Section A three 15-mark structured questions, Section B one 15-mark essay from three). A Level candidates also take Paper 3 Global Environments and Paper 4 Global Themes (each 1 hour 30 minutes, 60 marks: two chosen topics, each with a compulsory 10-mark structured question and one 20-mark essay from two), either in the same series or later, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Physical Geography", kind: "WRITTEN", description: "Section A: three compulsory 15-mark resource-based structured questions, one per physical topic. Section B: one 15-mark essay from a choice of three. Answers on the question paper. 50% of AS Level, 25% of A Level.", durationMinutes: 90, maxMarks: 60, weightingPercent: 25 },
    { code: "2", name: "Paper 2: Human Geography", kind: "WRITTEN", description: "Section A: three compulsory 15-mark resource-based structured questions, one per human topic. Section B: one 15-mark essay from a choice of three. Answers on the question paper. 50% of AS Level, 25% of A Level.", durationMinutes: 90, maxMarks: 60, weightingPercent: 25 },
    { code: "3", name: "Paper 3: Global Environments", kind: "WRITTEN", description: "Two topics chosen from tropical, coastal, hazardous and arid environments; each has a compulsory 10-mark resource-based structured question and one 20-mark essay from a choice of two. Separate answer booklet. 25% of A Level.", durationMinutes: 90, maxMarks: 60, weightingPercent: 25 },
    { code: "4", name: "Paper 4: Global Themes", kind: "WRITTEN", description: "Two topics chosen from climate change impacts and governance, environmental issues and management, trade, aid and tourism, and disease and geography; each has a compulsory 10-mark resource-based structured question and one 20-mark essay from a choice of two. Separate answer booklet. 25% of A Level.", durationMinutes: 90, maxMarks: 60, weightingPercent: 25 },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4 in the same series) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9696_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9696]) {
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
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "geography-a",
  name: "Geography (A-Level / AS & A Level)",
  level: "A",
  prefix: "ageo",
  subjects: ["zimsec/a-level/geography", "cambridge/a-level/geography"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/geography-a.json", registry);
write("content/syllabi/zimsec/a-level/geography/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/geography/2027-2029.json", c9696);
