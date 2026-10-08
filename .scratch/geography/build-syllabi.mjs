// Builds content/concepts/geography-o.json and the two Geography syllabus files:
//   content/syllabi/zimsec/o-level/geography/2015-2022.json
//   content/syllabi/cambridge/igcse/geography/2027-2029.json   (Cambridge IGCSE Geography 0460)
// Sources (local only, not in git): .scratch/geography/sources/zimsec-geography.pdf (+ .txt, Ministry file
// "GEOGRAPPHY SYLLABUS new.pdf") and 0460-2027-2029.pdf (+ .txt).
// The concept registry lives in ./concepts.mjs.
// Run from the repo root: node .scratch/geography/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase. `objectives` entries are strings (code = node code + .n) or
// [code, text] pairs when the board prints the number (Cambridge 0460).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) {
    n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  }
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Geography, Forms 1-4, 2015-2022
const ZIMSEC_TOPICS = [
  topic("weather-climate", "7.1", "Weather and climate", {
    description: "Topic 1 of the scope and sequence: weather elements, data and forecasting (Form 1), hazards and the climate of Zimbabwe (Form 2), air masses and world climates (Form 3), depressions, cyclones and climate change (Form 4).",
    children: [
      sub("weather-climate.elements", "7.1.1", "Weather elements, instruments and the weather station", {
        description: "Form 1.",
        covers: ["geo.weather.elements-instruments"],
        objectives: [
          "Distinguish between weather and climate and list the elements of weather.",
          "Describe the instruments used to measure each element and read and record weather data.",
          "Identify the factors that influence where a weather station is sited and describe the Stevenson screen.",
        ],
      }),
      sub("weather-climate.data", "7.1.2", "Weather and climatic data", {
        description: "Form 1 (weather tables, graphs, maps and statistics) and Form 3 (interpretation of climatic data).",
        covers: ["geo.weather.climate-graphs"],
        objectives: [
          "Draw weather tables and graphs from recorded data.",
          "Calculate weather statistics such as means, ranges and totals.",
          "Interpret climatic graphs and tables.",
        ],
      }),
      sub("weather-climate.rainfall", "7.1.3", "Precipitation and types of rainfall", {
        description: "Form 1.",
        covers: ["geo.weather.precipitation"],
        objectives: [
          "Identify the forms of precipitation.",
          "Describe how rain forms.",
          "Draw annotated diagrams of relief, convectional and frontal rainfall.",
        ],
      }),
      sub("weather-climate.forecasting", "7.1.4", "Synoptic charts and weather forecasting", {
        description: "Form 1: synoptic symbols and charts, the meaning and importance of forecasting, indigenous forecasting.",
        covers: ["geo.weather.synoptic-forecasting"],
        objectives: [
          "Interpret synoptic symbols and simple weather maps.",
          "Explain what weather forecasting is and why it is important.",
          "Describe how indigenous knowledge systems are used to forecast weather.",
        ],
      }),
      sub("weather-climate.hazards", "7.1.5", "Weather hazards and the influence of people on weather", {
        description: "Form 2: floods, lightning and drought; effects of activities such as deforestation, dam building and industrialisation on weather.",
        covers: ["geo.weather.hazards"],
        objectives: [
          "Outline weather hazards and describe their causes and effects.",
          "Suggest measures to reduce the impact of weather hazards.",
          "Describe and evaluate how human activities change local weather.",
        ],
      }),
      sub("weather-climate.zimbabwe", "7.1.6", "The climate of Zimbabwe and climate variability", {
        description: "Form 2: climatic zones and patterns of Zimbabwe; temperature and rainfall anomalies.",
        covers: ["geo.weather.zimbabwe-climate"],
        objectives: [
          "Describe Zimbabwe's climatic zones and relate them to economic activities.",
          "Describe climate variability in Zimbabwe and its effects.",
          "Suggest solutions to the effects of climate variability.",
        ],
      }),
      sub("weather-climate.air-masses", "7.1.7", "Air masses and the Inter-Tropical Convergence Zone", {
        description: "Form 3: classification and characteristics of air masses; air masses affecting Zimbabwe and southern Africa; the ITCZ.",
        covers: ["geo.weather.air-masses"],
        objectives: [
          "Describe and classify air masses and their characteristics.",
          "Describe the weather associated with the air masses that affect Zimbabwe and southern Africa.",
          "Describe the position of the ITCZ in January and July and the weather associated with it.",
        ],
      }),
      sub("weather-climate.world-climates", "7.1.8", "Climatic types on a global scale", {
        description: "Form 3: tropical, warm temperate and polar climates.",
        covers: ["geo.weather.world-climates"],
        objectives: [
          "Explain the basis for classifying climates on a global scale.",
          "Describe the characteristics and distribution of the world's main climatic regions.",
        ],
      }),
      sub("weather-climate.depressions", "7.1.9", "Temperate depressions and frontal systems", {
        description: "Form 4.",
        covers: ["geo.weather.depressions-fronts"],
        objectives: [
          "Describe the factors that influence the development and distribution of temperate depressions.",
          "Describe the weather associated with different types of front.",
        ],
      }),
      sub("weather-climate.cyclones", "7.1.10", "Tropical cyclones", {
        description: "Form 4.",
        covers: ["geo.weather.tropical-cyclones"],
        objectives: [
          "Discuss the distribution and development of tropical cyclones.",
          "Explain the weather conditions and hazards associated with tropical cyclones.",
        ],
      }),
      sub("weather-climate.climate-change", "7.1.11", "People's influence on climate and climate change", {
        description: "Form 4: human influence on climate (for example afforestation, desertification, dam construction); the nature, causes and effects of climate change in Zimbabwe and the world; adaptation and mitigation.",
        covers: ["geo.climate-change.causes-evidence"],
        objectives: [
          "Identify human activities that influence climate.",
          "Describe the nature, causes and effects of climate change in Zimbabwe and the world.",
          "Identify ways of adapting to and mitigating climate change.",
        ],
      }),
    ],
  }),
  topic("landforms", "7.2", "Landforms and landscape processes", {
    description: "Topic 2 of the scope and sequence: landforms (Form 1), rocks, weathering and the Earth's structure (Form 2), tectonic processes (Form 3), river and wind landforms and hazards (Form 4).",
    children: [
      sub("landforms.landforms", "7.2.1", "Landforms and their benefits", {
        description: "Form 1: landforms in the local area, Zimbabwe, Africa and the world.",
        covers: ["geo.landforms.landscapes"],
        objectives: [
          "Identify and describe landforms in the local area, Zimbabwe, Africa and the world.",
          "Explain the benefits of landforms and distinguish between landforms and landscape.",
        ],
      }),
      sub("landforms.rocks", "7.2.2", "Rocks", {
        description: "Form 2: igneous, sedimentary and metamorphic rocks and their origin.",
        covers: ["geo.landforms.rocks"],
        objectives: [
          "Identify the main rock types and describe how each forms.",
          "Describe the characteristics of rocks within each type and classify rocks.",
        ],
      }),
      sub("landforms.weathering", "7.2.3", "Weathering of rocks and resulting landforms", {
        description: "Form 2: physical (mechanical) and chemical weathering; granitic and karst landforms. Mass wasting is listed under Form 4 hazards and is taught with weathering here.",
        covers: ["geo.landforms.weathering-mass-wasting"],
        objectives: [
          "Describe the main types of weathering and distinguish mechanical from chemical weathering.",
          "Describe landforms that result from weathering, including granite and karst landforms.",
        ],
      }),
      sub("landforms.plates", "7.2.4", "The internal structure of the Earth, continental drift and plate tectonics", {
        description: "Form 2 (internal structure; continental drift in the scope and sequence) and Form 3 (continental drift and plate tectonics in the competency matrix): crust, mantle, core; constructive, destructive and transform boundaries.",
        covers: ["geo.tectonics.earth-structure-plates", "geo.tectonics.plate-boundaries"],
        objectives: [
          "Illustrate and describe the internal structure of the Earth.",
          "Outline the continental drift theory and its evidence.",
          "Describe tectonic movement at constructive, destructive and transform plate boundaries.",
          "Explain the implications of plate movements for climate.",
        ],
      }),
      sub("landforms.folding-faulting", "7.2.5", "Folding and faulting", {
        description: "Form 3.",
        covers: ["geo.tectonics.folding-faulting"],
        objectives: [
          "Describe the processes of folding and faulting.",
          "Describe the landforms that result from folding and faulting.",
        ],
      }),
      sub("landforms.volcanoes-earthquakes", "7.2.6", "Volcanoes, earthquakes and the effects of tectonic processes", {
        description: "Form 3: distribution and causes of volcanoes and earthquakes and their effects.",
        covers: ["geo.tectonics.volcanoes", "geo.tectonics.earthquakes", "geo.tectonics.hazard-impacts"],
        objectives: [
          "Outline the distribution of volcanoes and earthquakes.",
          "Explain the causes of volcanoes and earthquakes.",
          "Identify the effects of volcanic activity and earthquakes.",
        ],
      }),
      sub("landforms.rivers", "7.2.7", "Landforms resulting from water action and river processes", {
        description: "Form 4: the seasonal nature of rivers in Zimbabwe; processes along a river channel; valleys, meanders, waterfalls and rapids.",
        covers: ["geo.rivers.drainage-basin", "geo.rivers.processes", "geo.rivers.landforms-upper", "geo.rivers.landforms-lower"],
        objectives: [
          "Describe the seasonal nature of water flow in Zimbabwe's rivers.",
          "Explain how river processes shape the landscape.",
          "Describe the landforms that result from river processes.",
        ],
      }),
      sub("landforms.wind", "7.2.8", "Arid and semi-arid regions and landforms resulting from wind action", {
        description: "Form 4: characteristics and distribution of arid and semi-arid regions; wind erosion, transportation and deposition and the resulting landforms in Zimbabwe and Africa.",
        covers: ["geo.landforms.arid-wind"],
        objectives: [
          "Describe the characteristics of arid and semi-arid regions and explain their distribution.",
          "Explain the processes of wind action.",
          "Describe the landforms that result from wind action.",
        ],
      }),
      sub("landforms.hazards", "7.2.9", "Hazards associated with landform development and disaster risk management", {
        description: "Form 3 (measures to reduce the effects of volcanoes and earthquakes) and Form 4 (disaster risk management of volcanoes, earthquakes, flooding and mass wasting).",
        covers: ["geo.tectonics.hazard-management", "geo.rivers.flooding"],
        objectives: [
          "Describe the hazards associated with landform development.",
          "Identify measures to reduce the effects of volcanic activity and earthquakes.",
          "Identify methods of disaster risk management for volcanoes, earthquakes, flooding and mass wasting.",
        ],
      }),
    ],
  }),
  topic("ecosystems", "7.3", "Ecosystems", {
    description: "Topic 3 of the scope and sequence: components and interdependence (Form 1), biodiversity, biomes and sustainable management (Form 2), cycles, wetlands, conservation and benefits (Form 3), soils (Form 4).",
    children: [
      sub("ecosystems.components", "7.3.1", "Components of ecosystems, micro-ecosystems and interdependence", {
        description: "Form 1.",
        covers: ["geo.ecosystems.components"],
        objectives: [
          "Describe systems and ecosystems and identify their biotic and abiotic components.",
          "Identify the inputs, processes and outputs of a local micro-ecosystem and explain the links between them.",
          "Draw and interpret food chains, food webs and food pyramids.",
        ],
      }),
      sub("ecosystems.biodiversity", "7.3.2", "Biodiversity, benefits of ecosystems and ecosystems in entrepreneurship", {
        description: "Form 2 (biodiversity; use of ecosystems in entrepreneurship) and Form 3 (benefits of ecosystems).",
        covers: ["geo.ecosystems.biodiversity"],
        objectives: [
          "Identify habitats in a local ecosystem and the kinds of biodiversity.",
          "Explain the importance and benefits of ecosystems.",
          "Identify and plan small businesses that use local ecosystems sustainably.",
        ],
      }),
      sub("ecosystems.biomes", "7.3.3", "Tropical ecosystems (biomes)", {
        description: "Form 2: equatorial rainforest, tropical continental (savanna) and tropical desert.",
        covers: ["geo.ecosystems.rainforest", "geo.ecosystems.savanna-desert"],
        objectives: [
          "Locate the tropical biomes of Africa.",
          "Identify the inputs, processes and outputs of each biome.",
          "Explain how vegetation and animals are adapted in each biome.",
        ],
      }),
      sub("ecosystems.conservation", "7.3.4", "Sustainable management, conservation and restoration of ecosystems", {
        description: "Form 2 (sustainable management: fireguards, tree planting, erosion control) and Form 3 (conservation and restoration methods).",
        covers: ["geo.ecosystems.conservation-restoration"],
        objectives: [
          "Describe the sustainability of ecosystems and strategies for conserving local forests.",
          "Identify methods of conserving ecosystems.",
          "Explain methods of restoring degraded ecosystems and their benefits.",
        ],
      }),
      sub("ecosystems.cycles", "7.3.5", "Biogeochemical cycles", {
        description: "Form 3: nutrient, nitrogen and carbon cycles.",
        covers: ["geo.ecosystems.nutrient-cycles"],
        objectives: [
          "Explain the nutrient, nitrogen and carbon cycles.",
          "Outline the importance of biogeochemical cycles in ecosystems.",
        ],
      }),
      sub("ecosystems.wetlands", "7.3.6", "Wetlands", {
        description: "Form 3.",
        covers: ["geo.ecosystems.wetlands"],
        objectives: ["Explain the importance of wetlands and outline their benefits."],
      }),
      sub("ecosystems.soils", "7.3.7", "Soils", {
        description: "Form 4: soil components, soil-forming processes in the tropics, soil properties, soil types and profiles.",
        covers: ["geo.ecosystems.soils"],
        objectives: [
          "Identify, measure and analyse the components of soil.",
          "Describe the soil-forming processes of gleying and cheluviation and name the soils they form in the tropics.",
          "Explain soil profiles and describe soil properties and horizons.",
        ],
      }),
    ],
  }),
  topic("resources", "7.4", "Natural resources", {
    description: "Topic 4 of the scope and sequence (Forms 1 to 3).",
    children: [
      sub("resources.types", "7.4.1", "Natural resources, population and the exploitation of resources", {
        description: "Form 1 (the concept of natural resources; renewable and non-renewable resources; sustainable use in the local area) and Form 2 (population and resources; exploitation of resources in Zimbabwe and Africa).",
        covers: ["geo.resources.types-exploitation"],
        objectives: [
          "Classify resources into renewable and non-renewable.",
          "Describe how resources can be extracted sustainably in the local area.",
          "Describe population growth and its effects on resources.",
          "Describe the factors that influence the exploitation of natural resources.",
        ],
      }),
      sub("resources.conservation", "7.4.2", "Conservation of resources", {
        description: "Form 3: fish, water, soil and forest.",
        covers: ["geo.resources.conservation"],
        objectives: ["Describe resource conservation measures and identify ways of conserving fish, water, soil and forest resources."],
      }),
      sub("resources.wildlife", "7.4.3", "Wildlife management, human-wildlife conflict and CAMPFIRE", {
        description: "Form 3: game parks, conservancies, safari areas, sanctuaries and national parks; human-wildlife conflict; the Communal Areas Management Programme for Indigenous Resources (CAMPFIRE), with a Zimbabwean case study.",
        covers: ["geo.resources.wildlife-campfire"],
        objectives: [
          "Describe wildlife management and identify its advantages.",
          "Distinguish problem animals from dangerous animals and explain the causes of and solutions to human-wildlife conflict.",
          "Give reasons for the establishment of CAMPFIRE and discuss its benefits and sustainability.",
        ],
      }),
    ],
  }),
  topic("energy", "7.5", "Energy and power development", {
    description: "Topic 5 of the scope and sequence (Forms 1 to 3).",
    children: [
      sub("energy.types", "7.5.1", "Types, sources and economic importance of energy", {
        description: "Form 1 (types and sources of energy) and Form 2 (economic importance of energy types; relative importance of different sources).",
        covers: ["geo.energy.types-sources"],
        objectives: [
          "List types of energy, identify their sources and describe their uses.",
          "Explain the importance of energy in economic activities.",
          "Examine the advantages and disadvantages of different types of energy and justify the choice of a particular type.",
        ],
      }),
      sub("energy.generation", "7.5.2", "Siting of power plants, power generation and environmental impact", {
        description: "Form 1: siting of power plants and hydro-electric power; thermal (coal, gas, geothermal), solar, HEP, wind and nuclear generation; pollution, deforestation and climate change, and mitigation.",
        covers: ["geo.energy.power-generation"],
        objectives: [
          "State the factors that affect the siting of power plants and describe their siting.",
          "Describe types of power generation and explain the processes involved.",
          "Explain the environmental impact of generating and using energy and outline measures to reduce it.",
        ],
      }),
      sub("energy.conservation", "7.5.3", "Conservation of energy sources", {
        description: "Form 3: energy conservation methods; production and conservation of energy in the local area (project).",
        covers: ["geo.energy.management"],
        objectives: [
          "Explain how energy sources can be conserved.",
          "Analyse the types of energy used and the conservation measures taken in the local area.",
        ],
      }),
    ],
  }),
  topic("maps", "7.6", "Map work and geographical information systems", {
    description: "Topic 6 of the scope and sequence: map skills (Form 1), contours, gradient and land use (Form 2), GPS, time zones and remote sensing (Form 3), Boolean logic and overlay analysis (Form 4).",
    children: [
      sub("maps.maps", "7.6.1", "Characteristics and types of maps and universal symbols", {
        description: "Form 1.",
        covers: ["geo.maps.map-basics", "geo.maps.thematic-maps"],
        objectives: [
          "List and identify the components of a good map.",
          "Outline the characteristics of the major types of maps and classify maps.",
          "Draw and interpret universal symbols on maps.",
        ],
      }),
      sub("maps.location", "7.6.2", "Location: coordinates, grid references and world time zones", {
        description: "Form 1 (geographic coordinates and the Universal Transverse Mercator grid; a sketch map of home and school) and Form 3 (world time zones).",
        covers: ["geo.maps.location-coordinates"],
        objectives: [
          "Determine the latitude and longitude of a point in degrees.",
          "Give the position of a point using grid references in metres.",
          "Calculate time using longitude.",
        ],
      }),
      sub("maps.scale", "7.6.3", "Scale, distance and area", {
        description: "Form 1.",
        covers: ["geo.maps.scale-distance"],
        objectives: [
          "Explain the concept and importance of scale and distinguish among the types of scale.",
          "Use scale to draw simple maps.",
          "Measure straight and winding distances, including with Pythagoras' theorem.",
          "Estimate area on maps using grid squares and graph paper.",
        ],
      }),
      sub("maps.direction", "7.6.4", "Direction and bearing", {
        description: "Form 1.",
        covers: ["geo.maps.direction-bearings"],
        objectives: [
          "Explain the concept of direction and illustrate compass directions.",
          "Calculate bearings and navigate using a magnetic compass.",
        ],
      }),
      sub("maps.contours", "7.6.5", "Contour lines and their interpretation", {
        description: "Form 2.",
        covers: ["geo.maps.relief-contours"],
        objectives: [
          "Describe the concept of contour lines and determine altitude from them.",
          "Identify landforms from contour patterns.",
        ],
      }),
      sub("maps.gradient", "7.6.6", "Gradient", {
        description: "Form 2.",
        covers: ["geo.maps.gradient-cross-sections"],
        objectives: [
          "Describe the concept of gradient and calculate the gradient of a slope.",
          "Apply gradient data to explain features on a map.",
        ],
      }),
      sub("maps.land-use", "7.6.7", "Land use, patterns and networks on maps", {
        description: "Form 2: types of land use, factors behind land-use patterns, point, line and area data.",
        covers: ["geo.maps.land-use-patterns"],
        objectives: [
          "Describe types of land use on a map and explain what determines them.",
          "Identify and describe land-use patterns on a map and the processes that influence them.",
        ],
      }),
      sub("maps.remote-sensing", "7.6.8", "The electromagnetic spectrum and remote sensing", {
        description: "Form 3: light as a wave, the visible bands of the electromagnetic spectrum and photograph interpretation.",
        covers: ["geo.maps.photos-remote-sensing"],
        objectives: [
          "Describe light as a wave and explain the visible bands of the electromagnetic spectrum.",
          "Apply knowledge of the electromagnetic spectrum to interpret photographs.",
        ],
      }),
      sub("maps.gis", "7.6.9", "GPS and GIS: Boolean logic and overlay analysis", {
        description: "Form 3 (the Global Positioning System and navigation) and Form 4 (Boolean logic with Venn diagrams; overlay analysis). The Form 4 competency matrix numbers this topic 'Topic 5: Geographic Information Systems (GIS)'.",
        covers: ["geo.maps.gps-gis"],
        objectives: [
          "Explain the concept of GPS and use GPS to navigate.",
          "Describe the basic functions of Boolean logic and apply them to simple spatial problems.",
          "Describe overlay analysis and apply relational and conditional statements in it.",
        ],
      }),
    ],
  }),
  topic("mining", "7.7", "Minerals and mining", {
    description: "Topic 7 of the scope and sequence (Forms 1 to 4).",
    children: [
      sub("mining.minerals", "7.7.1", "Distribution, groups and importance of minerals in Zimbabwe", {
        description: "Form 1: geological formations; mines and minerals and their distribution; precious minerals; ores and mineral groups; economic importance.",
        covers: ["geo.mining.minerals-distribution"],
        objectives: [
          "Identify mines and minerals in Zimbabwe and describe their distribution.",
          "List precious minerals and identify ores and mineral groups.",
          "Describe the economic importance of minerals to Zimbabwe.",
        ],
      }),
      sub("mining.methods", "7.7.2", "Factors influencing mining and methods of mining", {
        description: "Form 2: surface and underground methods.",
        covers: ["geo.mining.factors-methods"],
        objectives: [
          "Describe the term mining and the factors that influence mining in Zimbabwe.",
          "Describe surface and underground mining methods and their advantages and disadvantages.",
        ],
      }),
      sub("mining.small-scale", "7.7.3", "Mineralogy, gold panning and small-scale mining", {
        description: "Form 2 (prospecting including indigenous knowledge, properties of alluvial minerals, gold panning) and Form 3 (small-scale mining and the legislative framework on mining rights).",
        covers: ["geo.mining.small-scale"],
        objectives: [
          "Identify methods used in prospecting for gold and describe the properties of alluvial minerals.",
          "Outline the problems of gold panning and suggest how its contribution to the economy could be increased.",
          "Describe small-scale mining, its contribution to Zimbabwe's economy, its challenges and solutions.",
          "Outline the legislative framework on mining and mining rights.",
        ],
      }),
      sub("mining.processing", "7.7.4", "Extraction, processing, beneficiation and value addition", {
        description: "Form 3: processing of selected minerals in Zimbabwe and Africa; beneficiation.",
        covers: ["geo.mining.processing-beneficiation"],
        objectives: [
          "Explain how selected minerals are processed in Zimbabwe and Africa.",
          "Describe the importance of beneficiation of minerals in Zimbabwe.",
        ],
      }),
      sub("mining.environment", "7.7.5", "Mining, the environment, safety and sustainable use", {
        description: "Form 2 (environmental impacts of mining and rehabilitation), Form 3 (health and safety in mining) and Form 4 (sustainable use of mineral resources, environmental impact assessment in mining, cost-benefit analysis).",
        covers: ["geo.mining.environment-sustainability"],
        objectives: [
          "Describe the environmental impacts of mining and identify mitigation and rehabilitation measures.",
          "Explain the importance of safety and health in mining.",
          "Explain the sustainable use of mineral resources.",
          "Explain cost-benefit analysis and its importance in mining.",
        ],
      }),
    ],
  }),
  topic("environment", "7.8", "Environmental management", {
    description: "Topic 8 of the scope and sequence (Forms 1 to 4). The Form 4 competency matrix numbers it 'Topic 7'.",
    children: [
      sub("environment.management", "7.8.1", "The environment, environmental legislation and international protocols", {
        description: "Form 1 (aspects and state of the environment; environmental management), Form 3 (environmental management legislation) and Forms 3 to 4 (international protocols and treaties and their domestication).",
        covers: ["geo.environment.management-laws"],
        objectives: [
          "Identify and describe aspects of the environment and distinguish pristine from degraded environments.",
          "Explain environmental management and outline indigenous knowledge systems in it.",
          "Explain environmental management legislation in Zimbabwe and assess its effectiveness, challenges and solutions.",
          "Identify international treaties and protocols on the environment and discuss the pros and cons of domesticating them.",
        ],
      }),
      sub("environment.degradation", "7.8.2", "Environmental deterioration", {
        description: "Form 2: veld fires, soil erosion, siltation, gullies, uncontrolled mining and sand abstraction, deforestation, wetland destruction, water and air pollution, poor waste management, noise and graffiti.",
        covers: ["geo.environment.land-degradation", "geo.environment.pollution-waste"],
        objectives: [
          "Describe the forms and causes of environmental degradation.",
          "Explain the social, economic and physical effects of environmental degradation.",
          "Outline measures to reduce environmental degradation.",
        ],
      }),
      sub("environment.climate-change", "7.8.3", "Global warming and climate change: impacts, adaptation and mitigation", {
        description: "Form 2: impact of climate change on land, water and air, positive and negative; climate change adaptation and mitigation.",
        covers: ["geo.climate-change.impacts", "geo.climate-change.responses"],
        objectives: [
          "Identify the impacts of climate change on the environment.",
          "Explain the advantages and disadvantages of climate change.",
          "Describe climate change mitigation measures.",
        ],
      }),
      sub("environment.planning", "7.8.4", "Environmental management planning, EIA and land-use planning", {
        description: "Form 4. Land-use zoning (Form 1, under Agriculture) and rural and urban land-use planning legislation (Form 1, under Settlement) are taught with this concept.",
        covers: ["geo.environment.eia-land-use"],
        objectives: [
          "Describe environmental management planning and the environmental impact assessment process.",
          "Describe land-use planning in Zimbabwe and explain it as a strategy for sustainable environmental management.",
          "Identify challenges in land-use planning and suggest mitigation measures.",
        ],
      }),
    ],
  }),
  topic("agriculture", "7.9", "Agriculture and land reform", {
    description: "Topic 9 of the scope and sequence (Forms 1 to 4). The Form 4 competency matrix numbers it 'Topic 8'.",
    children: [
      sub("agriculture.systems", "7.9.1", "Factors influencing agriculture, farming as a system and land-use zoning", {
        description: "Form 1.",
        covers: ["geo.agriculture.systems-factors"],
        objectives: [
          "Explain agriculture, identify its types and explain the factors that influence it.",
          "Name the elements of a farm and classify inputs into physical, human and economic.",
          "Identify land-use zones in a community and justify the need for zoning.",
        ],
      }),
      sub("agriculture.farming-types", "7.9.2", "Farming types in Zimbabwe", {
        description: "Form 2: subsistence and communal farming; commercial dairying, horticulture and market gardening, cattle ranching, mixed farming, plantation and irrigation farming.",
        covers: ["geo.agriculture.farming-types"],
        objectives: [
          "Identify the dominant farming types in Zimbabwe.",
          "Explain the characteristics, benefits and challenges of each farming type.",
        ],
      }),
      sub("agriculture.regions", "7.9.3", "Agro-ecological regions of Zimbabwe", {
        description: "Form 2: location, characteristics and farming activities of each region. The document lists 'Regions 1 - 6' (see notes).",
        covers: ["geo.agriculture.natural-regions"],
        objectives: [
          "Draw Zimbabwe's agro-ecological regions on a map.",
          "Describe the characteristics of each region and explain its farming activities.",
        ],
      }),
      sub("agriculture.land-reform", "7.9.4", "Land tenure and land reform in Zimbabwe", {
        description: "Form 3: freehold, leasehold, communal and state land; land consolidation and fragmentation; resettlement phases and models.",
        covers: ["geo.agriculture.land-tenure-reform"],
        objectives: [
          "Describe land tenure systems in Zimbabwe and compare their advantages and disadvantages.",
          "Describe and explain forms of land reform and the reasons for land reform in Zimbabwe.",
          "Explain the land reform process in Zimbabwe, its outcomes and challenges.",
        ],
      }),
      sub("agriculture.food-security", "7.9.5", "Small-scale farmers and food security", {
        description: "Form 3.",
        covers: ["geo.food.food-security"],
        objectives: ["Outline the contribution of small-scale farming to food security."],
      }),
      sub("agriculture.challenges", "7.9.6", "Climate change and agriculture; agricultural diseases and pests", {
        description: "Form 4.",
        covers: ["geo.agriculture.climate-pests"],
        objectives: [
          "Deduce the effects of climate change on agriculture and suggest mitigation and adaptation measures.",
          "Identify agricultural pests and diseases and describe their effects.",
          "Suggest manual, biological and chemical control measures.",
        ],
      }),
      sub("agriculture.urban-agribusiness", "7.9.7", "Urban agriculture and agribusiness", {
        description: "Form 4.",
        covers: ["geo.agriculture.urban-agribusiness"],
        objectives: [
          "Evaluate the advantages and disadvantages of urban agriculture and suggest solutions to its problems.",
          "List types of agribusiness in Zimbabwe and identify sources of funding for small-scale agribusiness.",
          "Evaluate the importance of agribusiness to the individual and the economy.",
        ],
      }),
    ],
  }),
  topic("industry", "7.10", "Industry", {
    description: "Topic 10 of the scope and sequence (Forms 1 to 4). The Form 4 competency matrix numbers it 'Topic 9'.",
    children: [
      sub("industry.types", "7.10.1", "Types of industry and their importance to Zimbabwe", {
        description: "Form 1.",
        covers: ["geo.industry.classification-employment"],
        objectives: [
          "Describe industry and identify types of industry.",
          "Explain the importance of industries to Zimbabwe.",
        ],
      }),
      sub("industry.location", "7.10.2", "Factors influencing the location of industry", {
        description: "Form 2 (secondary industry).",
        covers: ["geo.industry.location-factors"],
        objectives: ["Explain the factors that influence the location of industries."],
      }),
      sub("industry.manufacturing", "7.10.3", "Manufacturing and processing industries in Zimbabwe", {
        description: "Form 1 (nature and distribution of industries in Zimbabwe), Form 2 (types and distribution of manufacturing and processing industries) and Form 3 (problems facing manufacturing and processing industries).",
        covers: ["geo.industry.zimbabwe-industry"],
        objectives: [
          "Describe the distribution of industries in Zimbabwe.",
          "Discuss examples of manufacturing and processing industries.",
          "Identify solutions to the challenges facing manufacturing and processing industries in Zimbabwe.",
        ],
      }),
      sub("industry.tncs", "7.10.4", "Transnational corporations", {
        description: "Form 2.",
        covers: ["geo.industry.tncs"],
        objectives: ["Describe transnational corporations and discuss their advantages and disadvantages."],
      }),
      sub("industry.small-informal", "7.10.5", "Small to medium enterprises, informal industries and occupational safety and health", {
        description: "Form 3.",
        covers: ["geo.industry.small-informal"],
        objectives: [
          "Describe the causes, characteristics and location of small to medium enterprises.",
          "Discuss the role of informal industries in Zimbabwe.",
          "Discuss measures adopted in industries to promote occupational safety and health.",
        ],
      }),
      sub("industry.services-tourism", "7.10.6", "Service industries, tourism and quaternary industries", {
        description: "Form 4: tourism as a case study of a service industry; tourism in Zimbabwe; quaternary industries; problems of service industries.",
        covers: ["geo.tourism.zimbabwe"],
        objectives: [
          "Describe service industries and quaternary industries in Zimbabwe.",
          "Define tourism and describe tourism in Zimbabwe and its importance.",
          "Describe the problems of tourism and other service industries in Zimbabwe and suggest solutions.",
        ],
      }),
    ],
  }),
  topic("settlement-population", "7.11", "Settlement and population", {
    description: "Topic 11 of the scope and sequence: rural settlement (Form 1), urbanisation (Form 2), population data and distribution (Form 3), population change, migration, policy and disease (Form 4). The Form 4 competency matrix numbers it 'Topic 10'.",
    children: [
      sub("settlement.rural", "7.11.1", "Types, site and situation of settlements and rural settlement patterns", {
        description: "Form 1 (types of settlement, site and situation, rural settlement patterns, rural and urban land-use planning legislation) and Form 2 (disaster-resilient infrastructure).",
        covers: ["geo.settlement.types-site-patterns"],
        objectives: [
          "Identify types of settlement and describe their characteristics.",
          "Distinguish the site and situation of a settlement and identify the site factors of a local settlement.",
          "Identify and describe rural settlement patterns.",
          "List the laws governing rural and urban land use in Zimbabwe.",
          "Identify the features of disaster-resilient infrastructure and the factors considered in siting settlements.",
        ],
      }),
      sub("settlement.urbanisation", "7.11.2", "Urbanisation", {
        description: "Form 2: causes, process and effects of urbanisation and solutions to its problems.",
        covers: ["geo.settlement.urbanisation", "geo.settlement.urban-challenges", "geo.settlement.urban-management"],
        objectives: [
          "Explain the causes of urbanisation and describe the process.",
          "Describe the effects of urbanisation.",
          "Suggest solutions to problems of urbanisation.",
        ],
      }),
      sub("settlement.urban-land-use", "7.11.3", "Urban land-use zones and models", {
        description: "Form 2: CBD, industrial, residential and recreational zones; concentric, sector and multiple-nuclei models.",
        covers: ["geo.settlement.urban-land-use"],
        objectives: [
          "Describe urban land-use zones.",
          "Outline the main features of urban land-use models and match them to towns in Zimbabwe.",
        ],
      }),
      sub("settlement.unplanned", "7.11.4", "Unplanned urban settlements", {
        description: "Form 2.",
        covers: ["geo.settlement.unplanned"],
        objectives: [
          "State the characteristics of unplanned settlements and describe their location in urban centres.",
          "Explain the causes and outline the effects of unplanned settlements.",
          "Suggest measures to solve the problems of unplanned settlements.",
        ],
      }),
      sub("population.terms", "7.11.5", "Population terms", {
        description: "Form 3: birth rate, death rate, infant mortality rate, fertility.",
        covers: ["geo.population.terms-data"],
        objectives: ["Describe population terms and apply them at local and national levels."],
      }),
      sub("population.data", "7.11.6", "Population data collection, presentation and interpretation", {
        description: "Form 3: sample surveys and school census; presentation techniques; population pyramids (for example Zimbabwe compared with Sweden or Germany).",
        covers: ["geo.population.structure", "geo.skills.graphs", "geo.skills.data-analysis", "geo.fieldwork.human-fieldwork"],
        objectives: [
          "Collect population data within the school or local community.",
          "Analyse and present population data.",
          "Interpret population data, including population pyramids.",
        ],
      }),
      sub("population.distribution", "7.11.7", "Population distribution and density", {
        description: "Form 3: Zimbabwe, Africa and the world.",
        covers: ["geo.population.distribution-density"],
        objectives: [
          "Describe population distribution in Zimbabwe, Africa and the world.",
          "Explain differences in population density.",
        ],
      }),
      sub("population.growth", "7.11.8", "Population growth and the demographic transition model", {
        description: "Form 4: factors affecting growth; the DTM and its critique; effects of population growth and decline.",
        covers: ["geo.population.growth-dtm"],
        objectives: [
          "Identify and explain the factors that influence population growth.",
          "Describe the features of the stages of the demographic transition model.",
          "Identify countries with high and low population growth and explain the effects of growth and decline.",
        ],
      }),
      sub("population.migration", "7.11.9", "Causes and effects of migration", {
        description: "Form 4: push and pull factors; effects in sending and receiving areas; internal and international, voluntary and involuntary migration.",
        covers: ["geo.population.migration"],
        objectives: [
          "Describe the causes of migration.",
          "Explain the effects of migration.",
          "Outline the different categories of migration.",
        ],
      }),
      sub("population.policy", "7.11.10", "Population policy", {
        description: "Form 4.",
        covers: ["geo.population.policies"],
        objectives: [
          "Describe the rationale for population policies.",
          "Explain the effects of population policies in named developed and developing countries.",
        ],
      }),
      sub("population.diseases", "7.11.11", "Population and diseases", {
        description: "Form 4.",
        covers: ["geo.population.diseases"],
        objectives: [
          "Describe diseases associated with developing and developed countries.",
          "Explain the differences in diseases between developed and developing countries.",
          "Explain the social and economic effects of diseases.",
        ],
      }),
    ],
  }),
  topic("transport-trade", "7.12", "Transport and trade", {
    description: "Topic 12 of the scope and sequence (Forms 1 to 3).",
    children: [
      sub("transport.modes", "7.12.1", "Modes of transport", {
        description: "Form 1: air, rail, road, water and pipeline.",
        covers: ["geo.transport.modes"],
        objectives: [
          "Describe transport and identify its modes.",
          "Explain changes in modes of transport and their advantages and disadvantages.",
        ],
      }),
      sub("transport.networks", "7.12.2", "Transport networks and transport challenges", {
        description: "Form 1: networks in Zimbabwe, the region and Africa; transport indices; flow-line diagrams.",
        covers: ["geo.transport.networks"],
        objectives: [
          "Explain the transport networks of Zimbabwe, the region and Africa and draw them.",
          "Calculate and interpret transport indices.",
          "Discuss solutions to transport challenges.",
        ],
      }),
      sub("trade", "7.12.3", "Trade, regional imbalances and trading blocs", {
        description: "Form 2 (trade; domestic and foreign trade; trade patterns of Zimbabwe, SADC, Africa and the world) and Form 3 (regional imbalances in trade; SADC, COMESA, ECOWAS, OPEC, EU).",
        covers: ["geo.trade.patterns-blocs"],
        objectives: [
          "Explain trade and describe trade patterns in Zimbabwe, SADC, Africa and the world.",
          "Outline the characteristics of domestic and foreign trade and distinguish them.",
          "Show how trading patterns create imbalances nationally and between regions.",
          "Name economic groupings and give reasons for the formation of trading blocs.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "geography",
  versionLabel: "2015-2022",
  family: "geography-o",
  title: "ZIMSEC O-Level Geography",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Geography Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development Unit), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/GEOGRAPPHY%20SYLLABUS%20new.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development Unit) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic headings and numbers (7.1 to 7.12) are transcribed from the scope and sequence (section 7) of the Ministry's Geography Syllabus Forms 1 - 4 (2015 - 2022); the sub-topics group the scope-and-sequence items and the competency-matrix topics of each Form, and each sub-topic's description names its Form(s). Sub-topic codes (7.1.1, ...) and objective codes are ours, not the board's. Learning-objective statements are our own paraphrase of the competency matrix; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'GEOGRAPPHY SYLLABUS new.pdf' (http://www.mopsemashwest.gov.zw/files/GEOGRAPPHY%20SYLLABUS%20new.pdf; the site's https certificate has expired, so the https form of the URL is recorded), read through a pdftotext rendering. The cover prints 'Geography Syllabus, Forms 1 - 4, 2015-2022' (Curriculum Development Unit, 2015; print date 26 October 2016). The scope-and-sequence and competency-matrix tables are scrambled in the text rendering, so absence of an item is less certain than its presence. Check every heading and objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the document. ZIMSEC O-Level Geography is commonly cited as 4022; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Geography examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (9.0) as read: continuous assessment 40% (a practical assignment, a theory test and a project in each of Forms 1 to 4; each task marked out of 100) and summative examination 60%. Paper 1: 40 compulsory multiple-choice items on all topics, 1 hour 30 minutes, 40 marks, 20%. Paper 2: structured free-response and data-response questions, 2 hours 30 minutes, 100 marks, 40%; nine questions, three in each of Sections A, B and C; candidates answer four (one from each section and one more from any section), 25 marks each. The weightings on the components are shares of the whole qualification; continuous assessment is not a component here.",
    "Inconsistency to check: the paper description says Paper 2 has nine questions (three per section) but the content specification grid lists four questions in each of Section A (Physical Environment), Section B (Economic Geography) and Section C (Population, Settlement, Transport and Trade), twelve in all. Confirm with a recent Paper 2.",
    "Specification grid as read: skills weighting Paper 1 / Paper 2 = knowledge and comprehension 40% / 30%, skills and application 40% / 40%, judgement and decision-making 20% / 30%. Paper 1 content grid (scrambled, totals reconstructed): Topographical Map Work 12 items, Physical Environment 13, Economic Geography 8, Population, Settlement, Transport and Trade 7 (total 40); skill 1 14 items (35%), skill 2 17 (42.5%), skill 3 9 (22.5%). Map work is assessed in Paper 1 only according to the grid. The grid does not say which topics count as Physical Environment and which as Economic Geography; our mock blueprints assume Physical = topics 7.1-7.3 and 7.8, Economic = 7.4, 7.5, 7.7, 7.9 and 7.10, and Section C = 7.11 and 7.12. Confirm.",
    "Numbering in the competency matrix: Forms 1 to 3 follow the topic list (Topics 1 to 12), but the Form 4 matrix renumbers the topics it covers (Topic 5 = GIS, 6 = Minerals and mining, 7 = Environmental management, 8 = Agriculture, 9 = Industry, 10 = Settlement and population) and has no Form 4 entries for natural resources, energy or transport and trade. The tree follows the topic list (6.1-6.12) and the scope and sequence (7.1-7.12).",
    "Scope and sequence versus competency matrix: continental drift is listed under Form 2 in the scope and sequence but appears in the Form 3 matrix; 'Patterns and networks' (Form 2 map work) has no matrix entry beyond land-use patterns; 'Remote sensing (photo interpretation)' (Form 3) appears in the matrix only as the electromagnetic spectrum applied to photographs; Form 3 transport and trade has only regional imbalances and trading blocs.",
    "Agro-ecological regions: the Form 2 matrix lists 'Regions 1 - 6'. Zimbabwe's natural regions are conventionally numbered I to V with Region II divided into IIa and IIb (six units); lessons use the I-V (IIa/IIb) convention. Confirm.",
    "Mapwork resources: the platform cannot show Ordnance-survey-style map extracts, so map-work content uses grid-square tables and described extracts; check that Paper 1 map-work practice is still realistic.",
  ],
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice items set on all syllabus topics (topographical map work, physical environment, economic geography, and population, settlement, transport and trade).", durationMinutes: 90, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Structured free-response and data response", kind: "WRITTEN", description: "Nine structured free-response and data-response questions of 25 marks: three in Section A (physical environment), three in Section B (economic geography) and three in Section C (population, settlement, transport and trade). Candidates answer four: one from each section and one more from any section.", durationMinutes: 150, maxMarks: 100, weightingPercent: 40 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Geography 0460, 2027-2029
const P1 = ["1"];
const P2 = ["2"];
const C0460_TOPICS = [
  topic("rivers", "1", "Changing river environments", {
    description: "Paper 1 (Physical Geography).",
    components: P1,
    children: [
      sub("rivers.hydrology", "1.1", "The main hydrological characteristics and processes which operate in rivers and drainage basins", {
        covers: ["geo.rivers.drainage-basin", "geo.rivers.processes"],
        objectives: [
          ["1.1.1", "Describe the characteristics of rivers and drainage basins: long profile, width, depth, velocity, discharge, wetted perimeter, channel, watershed, tributary, confluence, source and mouth."],
          ["1.1.2", "Use the Bradshaw model to describe how channel characteristics change downstream."],
          ["1.1.3", "Explain how a drainage basin operates within the water cycle."],
          ["1.1.4", "Describe the processes in a drainage basin, from precipitation and interception to throughflow, groundwater flow and evapotranspiration."],
          ["1.1.5", "Explain river erosion, transportation and deposition processes."],
        ],
      }),
      sub("rivers.landforms", "1.2", "The main landforms associated with these processes", {
        covers: ["geo.rivers.landforms-upper", "geo.rivers.landforms-lower"],
        objectives: [["1.2.1", "Describe and explain the formation of waterfalls, rapids, gorges, V-shaped valleys, interlocking spurs, potholes, meanders, oxbow lakes, levées, floodplains and deltas."]],
      }),
      sub("rivers.people", "1.3", "Rivers present opportunities and hazards for people", {
        covers: ["geo.rivers.flooding", "geo.rivers.pollution"],
        objectives: [
          ["1.3.1", "Describe the opportunities and hazards of living near a river."],
          ["1.3.2", "Explain the human and natural causes of river flooding."],
          ["1.3.3", "Describe the impacts of river flooding."],
          ["1.3.4", "Evaluate strategies and techniques for managing river flooding, including sustainable ones."],
          ["1.3.5", "Explain the human causes of river pollution."],
          ["1.3.6", "Describe the impacts of river pollution."],
          ["1.3.7", "Evaluate strategies and techniques for managing river pollution, including sustainable ones."],
          ["1.3.8", "Detailed specific example: the causes, impacts and management of a flood on a named river."],
          ["1.3.9", "Detailed specific example: the causes, impacts and management of pollution in a named river."],
        ],
      }),
    ],
  }),
  topic("coasts", "2", "Changing coastal environments", {
    description: "Paper 1 (Physical Geography).",
    components: P1,
    children: [
      sub("coasts.processes", "2.1", "Physical processes that shape the coast", {
        covers: ["geo.coasts.processes"],
        objectives: [
          ["2.1.1", "Explain coastal erosion, transportation, deposition and longshore drift."],
          ["2.1.2", "Describe constructive and destructive waves and wave refraction."],
        ],
      }),
      sub("coasts.landforms", "2.2", "The main landforms associated with these processes", {
        covers: ["geo.coasts.landforms"],
        objectives: [
          ["2.2.1", "Describe and explain the formation of headlands, bays, cliffs, wave-cut platforms, caves, arches, stacks, stumps, beaches, spits, bars and sand dunes."],
          ["2.2.2", "Explain the formation and characteristics of concordant and discordant coastlines."],
        ],
      }),
      sub("coasts.people", "2.3", "Coasts present opportunities and hazards for people", {
        covers: ["geo.coasts.management", "geo.weather.tropical-cyclones", "geo.coasts.coral-mangroves"],
        objectives: [
          ["2.3.1", "Describe the opportunities of living near the coast."],
          ["2.3.2", "Describe the hazards of living near the coast."],
          ["2.3.3", "Evaluate hard and soft engineering for managing coastal erosion and flooding, including sustainable approaches."],
          ["2.3.4", "Describe the distribution and impacts of tropical storms (cyclones, hurricanes and typhoons)."],
          ["2.3.5", "Evaluate preparation, planning, protection and prediction for managing tropical storms."],
          ["2.3.6", "Describe the distribution and importance of coral reefs and mangroves, the threats to them and how they are protected and managed."],
          ["2.3.7", "Detailed specific example: coastal erosion and protection from tropical storms on a named coast."],
          ["2.3.8", "Detailed specific example: the importance of, threats to and management of a named coral reef."],
        ],
      }),
    ],
  }),
  topic("ecosystems", "3", "Changing ecosystems", {
    description: "Paper 1 (Physical Geography). The Antarctic content has no detailed specific example because it is based on Antarctica only.",
    components: P1,
    children: [
      sub("ecosystems.antarctic", "3.1", "Characteristics of the Antarctic ecosystem", {
        covers: ["geo.ecosystems.antarctic"],
        objectives: [
          ["3.1.1", "Locate the Antarctic ecosystem."],
          ["3.1.2", "Explain the characteristics of the Antarctic climate."],
          ["3.1.3", "Describe the features of the Antarctic ecosystem."],
          ["3.1.4", "Explain the links between abiotic and biotic factors in Antarctica and how plants and animals adapt."],
        ],
      }),
      sub("ecosystems.antarctic-threats", "3.2", "Threats to the Antarctic ecosystem and how they can be managed", {
        covers: ["geo.ecosystems.antarctic-threats"],
        objectives: [
          ["3.2.1", "Describe threats to Antarctica such as resource exploitation, climate change, fishing and tourism."],
          ["3.2.2", "Describe the impacts of damage to the Antarctic ecosystem."],
          ["3.2.3", "Evaluate strategies for managing Antarctica, such as international agreements and environmental impact surveys."],
        ],
      }),
      sub("ecosystems.rainforest", "3.3", "Characteristics of the tropical rainforest ecosystem", {
        covers: ["geo.ecosystems.rainforest"],
        objectives: [
          ["3.3.1", "Describe the global distribution of tropical rainforests."],
          ["3.3.2", "Explain the characteristics of the equatorial climate."],
          ["3.3.3", "Describe the characteristics and structure of the tropical rainforest."],
          ["3.3.4", "Explain the links between abiotic and biotic factors in the rainforest and how plants and animals adapt."],
        ],
      }),
      sub("ecosystems.rainforest-threats", "3.4", "Threats to tropical rainforest ecosystems and how they can be managed", {
        covers: ["geo.ecosystems.rainforest-threats"],
        objectives: [
          ["3.4.1", "Describe threats to tropical rainforests such as logging, farming, ranching, roads, HEP and settlement."],
          ["3.4.2", "Describe the impacts of rainforest destruction and deforestation."],
          ["3.4.3", "Evaluate strategies for managing tropical rainforests, including sustainable ones."],
          ["3.4.4", "Detailed specific example: threats, impacts and management in a named rainforest area."],
        ],
      }),
    ],
  }),
  topic("tectonics", "4", "Tectonic hazards", {
    description: "Paper 1 (Physical Geography).",
    components: P1,
    children: [
      sub("tectonics.structure", "4.1", "The structure of the Earth and distribution of earthquakes and volcanoes", {
        covers: ["geo.tectonics.earth-structure-plates", "geo.tectonics.plate-boundaries"],
        objectives: [
          ["4.1.1", "Describe the layers of the Earth: inner core, outer core, mantle, crust and lithosphere."],
          ["4.1.2", "Name and locate the main tectonic plates and explain how they move."],
          ["4.1.3", "Describe the types of plate boundary and the location of earthquakes and volcanoes."],
        ],
      }),
      sub("tectonics.processes", "4.2", "The processes and features associated with earthquakes and volcanoes", {
        covers: ["geo.tectonics.volcanoes", "geo.tectonics.earthquakes"],
        objectives: [
          ["4.2.1", "Explain the processes at each type of plate boundary that cause earthquakes and eruptions."],
          ["4.2.2", "Describe the focus, epicentre and seismic waves of an earthquake."],
          ["4.2.3", "Describe strato-volcanoes, shield volcanoes and cinder cones."],
          ["4.2.4", "Classify volcanoes as active, dormant or extinct."],
          ["4.2.5", "Describe the main features of a volcano."],
          ["4.2.6", "Describe volcanic hazards and the significance of their speed, size, frequency and spread."],
        ],
      }),
      sub("tectonics.impacts", "4.3", "The impacts of tectonic hazards", {
        covers: ["geo.tectonics.hazard-impacts"],
        objectives: [
          ["4.3.1", "Explain why people live in areas at risk from earthquakes and eruptions."],
          ["4.3.2", "Describe the impacts of earthquakes."],
          ["4.3.3", "Describe the impacts of volcanic eruptions."],
          ["4.3.4", "Describe how the magnitude of tectonic events is measured (moment magnitude, Richter and Mercalli scales; the volcanic explosivity index)."],
        ],
      }),
      sub("tectonics.management", "4.4", "Managing the impacts of tectonic hazards", {
        covers: ["geo.tectonics.hazard-management"],
        objectives: [
          ["4.4.1", "Distinguish primary and secondary responses."],
          ["4.4.2", "Evaluate monitoring, prediction, protection, planning and technology for managing earthquakes and eruptions."],
          ["4.4.3", "Detailed specific example: the causes, impacts, responses and management of a named earthquake."],
          ["4.4.4", "Detailed specific example: the causes, impacts, responses and management of a named volcanic eruption."],
        ],
      }),
    ],
  }),
  topic("climate-change", "5", "Climate change", {
    description: "Paper 1 (Physical Geography). A new topic in this version.",
    components: P1,
    children: [
      sub("climate-change.causes", "5.1", "The natural and human causes of climate change", {
        covers: ["geo.climate-change.causes-evidence"],
        objectives: [
          ["5.1.1", "Describe the evidence for climate change."],
          ["5.1.2", "Explain natural factors in climate change: orbital changes, sunspots and volcanic activity."],
          ["5.1.3", "Explain how human activity causes the enhanced greenhouse effect."],
        ],
      }),
      sub("climate-change.impacts", "5.2", "The impacts of climate change at a range of geographic scales", {
        covers: ["geo.climate-change.impacts"],
        objectives: [["5.2.1", "Describe present and predicted impacts of climate change such as sea-level rise and changes to temperature, weather and food production."]],
      }),
      sub("climate-change.responses", "5.3", "Responses to climate change", {
        covers: ["geo.climate-change.responses"],
        objectives: [
          ["5.3.1", "Describe strategies, including agreements, and techniques used to manage the impacts of climate change."],
          ["5.3.2", "Evaluate mitigation and adaptation strategies and techniques."],
          ["5.3.3", "Detailed specific example: the impacts of and responses to climate change in a named country or region."],
        ],
      }),
    ],
  }),
  topic("populations", "6", "Changing populations", {
    description: "Paper 2 (Human Geography).",
    components: P2,
    children: [
      sub("populations.growth", "6.1", "Populations grow and decline", {
        covers: ["geo.population.growth-dtm", "geo.population.terms-data", "geo.population.policies"],
        objectives: [
          ["6.1.1", "Describe patterns and trends in global population growth."],
          ["6.1.2", "Explain reasons for population growth and decline using fertility, birth and death rates, natural increase and migration."],
          ["6.1.3", "Evaluate the impacts of pro-natalist and anti-natalist policies on birth rates."],
          ["6.1.4", "Describe the demographic transition model and its strengths and limitations."],
        ],
      }),
      sub("populations.structure", "6.2", "Population structures change over time", {
        covers: ["geo.population.structure"],
        objectives: [
          ["6.2.1", "Explain how natural increase and net migration influence population structure."],
          ["6.2.2", "Explain the causes of youthful and ageing populations and evaluate their impacts."],
          ["6.2.3", "Detailed specific example: population change and a population policy in a named country."],
        ],
      }),
      sub("populations.migration", "6.3", "The causes and impacts of international migration", {
        covers: ["geo.population.migration"],
        objectives: [
          ["6.3.1", "Distinguish economic migrants, asylum seekers and refugees."],
          ["6.3.2", "Explain the causes of migration, including push and pull factors."],
          ["6.3.3", "Describe the impacts of migration on migrants and on origin and destination countries."],
          ["6.3.4", "Evaluate strategies for managing international migration."],
          ["6.3.5", "Detailed specific example: a named international migration, its causes, impacts and management."],
        ],
      }),
    ],
  }),
  topic("towns-cities", "7", "Changing towns and cities", {
    description: "Paper 2 (Human Geography).",
    components: P2,
    children: [
      sub("towns-cities.where", "7.1", "Where people live", {
        covers: ["geo.settlement.urbanisation"],
        objectives: [
          ["7.1.1", "Explain variations in urban growth rates around the world."],
          ["7.1.2", "Explain the causes of rapid urban growth in LICs."],
        ],
      }),
      sub("towns-cities.urbanisation", "7.2", "Opportunities and challenges of urbanisation", {
        covers: ["geo.settlement.urban-challenges", "geo.settlement.unplanned"],
        objectives: [
          ["7.2.1", "Describe the opportunities of urban living."],
          ["7.2.2", "Describe the opportunities and challenges of rapid urban growth, including unplanned settlements."],
          ["7.2.3", "Describe the impact of urban sprawl on the rural-urban fringe."],
        ],
      }),
      sub("towns-cities.management", "7.3", "The management of urban growth", {
        covers: ["geo.settlement.urban-management"],
        objectives: [
          ["7.3.1", "Evaluate strategies and techniques for managing urban growth, including sustainable ones."],
          ["7.3.2", "Detailed specific example: the causes, challenges, opportunities and management of growth in a named urban area."],
        ],
      }),
    ],
  }),
  topic("development", "8", "Development", {
    description: "Paper 2 (Human Geography).",
    components: P2,
    children: [
      sub("development.measuring", "8.1", "Measuring development", {
        covers: ["geo.development.measuring"],
        objectives: [
          ["8.1.1", "Describe social and economic indicators of development."],
          ["8.1.2", "Use indicators to compare countries and evaluate their usefulness."],
          ["8.1.3", "Explain the factors affecting quality of life and standard of living."],
        ],
      }),
      sub("development.uneven", "8.2", "The world is developing unevenly", {
        covers: ["geo.development.uneven"],
        objectives: [
          ["8.2.1", "Explain the reasons for differences in development and the development gap."],
          ["8.2.2", "Describe the current global pattern of LICs, MICs and HICs."],
        ],
      }),
      sub("development.sustainable", "8.3", "Achieving sustainable development", {
        covers: ["geo.development.sustainable"],
        objectives: [
          ["8.3.1", "Define sustainable development."],
          ["8.3.2", "Describe social, economic and environmental strategies for sustainable development."],
          ["8.3.3", "Evaluate trade, aid and debt relief as ways of reducing uneven development."],
          ["8.3.4", "Detailed specific example: the development and development strategies of a named LIC or MIC."],
        ],
      }),
    ],
  }),
  topic("economies", "9", "Changing economies", {
    description: "Paper 2 (Human Geography).",
    components: P2,
    children: [
      sub("economies.employment", "9.1", "Changing employment structures", {
        covers: ["geo.industry.classification-employment", "geo.industry.location-factors"],
        objectives: [
          ["9.1.1", "Classify industries as primary, secondary, tertiary and quaternary."],
          ["9.1.2", "Describe how employment structures change in LICs, MICs and HICs."],
          ["9.1.3", "Explain the factors influencing the location and distribution of industries."],
        ],
      }),
      sub("economies.globalisation", "9.2", "The impact of globalisation and the role of transnational corporations", {
        covers: ["geo.industry.globalisation", "geo.industry.tncs"],
        objectives: [
          ["9.2.1", "Explain what is meant by globalisation."],
          ["9.2.2", "Describe the key features of globalisation."],
          ["9.2.3", "Describe the impacts of globalisation on trade, transport, culture, communications and technology."],
          ["9.2.4", "Describe the role and global organisation of TNCs."],
          ["9.2.5", "Evaluate the impacts of TNCs on host countries."],
          ["9.2.6", "Detailed specific example: globalisation and a named TNC in a named country or area."],
        ],
      }),
      sub("economies.tourism", "9.3", "Tourism is a growing industry", {
        covers: ["geo.tourism.growth-management"],
        objectives: [
          ["9.3.1", "Explain the growth of tourism as an industry."],
          ["9.3.2", "Describe the Butler model and its strengths and limitations."],
          ["9.3.3", "Describe the benefits and problems of tourism at a range of scales."],
          ["9.3.4", "Evaluate strategies for managing tourism sustainably."],
          ["9.3.5", "Detailed specific example: the growth, impacts and management of tourism in a named country or area."],
        ],
      }),
    ],
  }),
  topic("resources", "10", "Resource provision", {
    description: "Paper 2 (Human Geography).",
    components: P2,
    children: [
      sub("resources.food-production", "10.1", "How food is produced", {
        covers: ["geo.agriculture.systems-factors"],
        objectives: [
          ["10.1.1", "Describe farming types, including subsistence, commercial, arable, pastoral, mixed, aeroponics, aquaponics and hydroponics."],
          ["10.1.2", "Describe farming systems as inputs, processes and outputs."],
        ],
      }),
      sub("resources.food-patterns", "10.2", "The global patterns of food supply and demand", {
        covers: ["geo.food.global-patterns"],
        objectives: [
          ["10.2.1", "Describe global patterns of calorie intake and explain the variations."],
          ["10.2.2", "Explain changes in global food production and consumption."],
          ["10.2.3", "Describe strategies used to increase food supply."],
          ["10.2.4", "Explain the globalisation of food supplies."],
          ["10.2.5", "Describe the impacts of the globalisation of food supplies."],
        ],
      }),
      sub("resources.food-challenges", "10.3", "The challenges of food supply", {
        covers: ["geo.food.food-security", "geo.environment.land-degradation"],
        objectives: [
          ["10.3.1", "Describe human and natural factors that reduce food supply."],
          ["10.3.2", "Describe the problems of food insecurity in countries at different levels of development."],
          ["10.3.3", "Describe strategies and techniques for increasing food supply."],
          ["10.3.4", "Evaluate the role of food aid in improving food security."],
          ["10.3.5", "Evaluate strategies for managing desertification and soil erosion, including sustainable ones."],
          ["10.3.6", "Detailed specific example: food supply and food insecurity in a named country or area."],
        ],
      }),
      sub("resources.energy-types", "10.4", "How our energy is produced", {
        covers: ["geo.energy.types-sources"],
        objectives: [["10.4.1", "Classify energy types as renewable, non-renewable, or (fuelwood) either."]],
      }),
      sub("resources.energy-patterns", "10.5", "The global patterns of energy supply and demand", {
        covers: ["geo.energy.supply-demand"],
        objectives: [
          ["10.5.1", "Explain the increasing global production and consumption of energy."],
          ["10.5.2", "Describe global patterns of energy surplus and deficit and explain the importance of energy security."],
          ["10.5.3", "Explain variations in energy use within and between countries at different levels of development."],
        ],
      }),
      sub("resources.energy-impacts", "10.6", "The impacts of energy production", {
        covers: ["geo.energy.management"],
        objectives: [
          ["10.6.1", "Describe the advantages and disadvantages of renewable and non-renewable energy sources."],
          ["10.6.2", "Describe strategies and techniques for increasing energy supply."],
          ["10.6.3", "Evaluate strategies for managing energy supplies, including sustainable ones."],
          ["10.6.4", "Detailed specific example: the energy mix, impacts and energy management of a named country."],
        ],
      }),
    ],
  }),
  topic("skills", "S", "Geographical skills", {
    description: "Skills that apply across all components (not numbered in the syllabus). Includes the fieldwork skills and enquiry route tested in Component 3 and Paper 4.",
    children: [
      sub("skills.cartographic", "S.1", "Cartographic skills", {
        covers: [
          "geo.maps.map-basics", "geo.maps.thematic-maps", "geo.maps.location-coordinates", "geo.maps.scale-distance",
          "geo.maps.direction-bearings", "geo.maps.relief-contours", "geo.maps.gradient-cross-sections", "geo.maps.land-use-patterns",
        ],
        objectives: [
          "Select, construct and interpret maps using direction, scale, symbols and a key.",
          "Use coordinates, latitude and longitude, and four- and six-figure grid references.",
          "Give directions with the 16-point compass and bearings from grid north; measure distances and areas.",
          "Use gradient, contours and spot heights, calculate height differences and interpret cross-sections and transects.",
          "Interpret atlas, choropleth, desire-line, flow-line, isoline, topographical and other thematic maps at 1:50 000 and 1:25 000.",
        ],
      }),
      sub("skills.graphical", "S.2", "Graphical skills", {
        covers: ["geo.skills.graphs", "geo.weather.climate-graphs"],
        objectives: [
          "Construct graphs, charts and diagrams with suitable scales and annotations.",
          "Interpret and evaluate information on graphs, including climate graphs, population pyramids and flood hydrographs.",
          "Identify variations, trends and patterns in data.",
        ],
      }),
      sub("skills.gis-images", "S.3", "GIS and image skills", {
        covers: ["geo.maps.photos-remote-sensing", "geo.maps.gps-gis"],
        objectives: [
          "Interpret photographs (ground, oblique and vertical aerial), cartoons, diagrams and satellite images.",
          "Analyse written sources and recognise bias.",
          "Use GIS to identify trends and patterns and solve problems, and recognise its benefits and limitations.",
        ],
      }),
      sub("skills.mathematical", "S.4", "Mathematical skills", {
        covers: ["geo.skills.data-analysis"],
        objectives: [
          "Use number, area, scale, standard notation and significant figures.",
          "Calculate and use mean, median, mode, range, percentages, ratios and proportions.",
          "Describe relationships and trends, interpolate and extrapolate, and identify weaknesses in statistical presentations.",
        ],
      }),
      sub("skills.fieldwork", "S.5", "Fieldwork skills and the route to geographical enquiry", {
        components: ["3", "4"],
        covers: ["geo.fieldwork.enquiry-process", "geo.fieldwork.human-fieldwork", "geo.fieldwork.physical-fieldwork"],
        objectives: [
          "Follow the route to geographical enquiry from hypothesis to evaluation.",
          "Select and use fieldwork equipment such as ranging poles, flow meters, quadrats, noise meters and clinometers.",
          "Select, conduct or describe fieldwork techniques such as questionnaires, counts, surveys, transects and field sketches.",
          "Devise data collection sheets and risk assessments.",
        ],
      }),
    ],
  }),
];

const c0460 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "geography",
  versionLabel: "2027-2029",
  family: "geography-o",
  title: "Cambridge IGCSE Geography (0460)",
  code: "0460",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Geography 0460 syllabus for 2027, 2028 and 2029 (version 2)",
    url: "https://www.cambridgeinternational.org/Images/718150-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topics 1 to 10, their numbered sub-sections (1.1, 1.2, ...) and the numbered content statements used as objective codes (1.1.1, ...) are transcribed from the syllabus. The 'Geographical skills' section is not numbered in the syllabus: its code S and sub-section codes S.1 to S.5 and their objective codes are ours. Objective statements are our own paraphrase.",
  notes: [
    "Source (read 2026-10-08): the official PDF (version 2, published October 2024) for examination in 2027, 2028 and 2029, read through a pdftotext rendering. In the rendering the content-statement numbers are sometimes misaligned with their text (for example in 1.1, 1.3, 2.1, 4.4, 5.1, 7.2, 8.1 and 9.1); the codes were matched to statements by order. Check the objective codes against the PDF.",
    "Assessment overview as read: all candidates take Paper 1 Physical Geography (1 hour 45 minutes, 75 marks, 36%: Section A one compulsory 25-mark structured question; Section B two from three 25-mark structured questions; topics 1-5) and Paper 2 Human Geography (1 hour 45 minutes, 75 marks, 36%; same structure; topics 6-10), and either Component 3 Coursework (one fieldwork assignment of 1800-2200 words, 60 marks, 28%, internally assessed) or Paper 4 Geographical Investigations (1 hour 30 minutes, 60 marks, 28%: two compulsory 30-mark questions on fieldwork methodology, hypotheses, data presentation, analysis and evaluation). Calculators may be used in all examinations. Grades A* to G; there are no Core/Extended tiers.",
    "Changes in this version (from the syllabus): content split into physical (Paper 1) and human (Paper 2) topics; a new climate-change topic; the settlement, water and weather topics removed; the specific skills paper removed (skills are tested in all components); Paper 2 now matches Paper 1 (75 marks, 1 hour 45 minutes); Paper 4 renamed Geographical Investigations; MEDC/LEDC replaced by HIC/MIC/LIC; case studies replaced by 'detailed specific examples', which the syllabus does not name.",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the 2024-2026 syllabus, which is not in the repository; the 2027-2029 version is published as the current version because new students now will sit 2027 or later.",
    "The platform cannot run the coursework component; lessons and practice cover its fieldwork skills, and the mocks simulate Papers 1, 2 and 4.",
  ],
  components: [
    { code: "1", name: "Paper 1: Physical Geography", kind: "WRITTEN", description: "Section A: one compulsory 25-mark structured question. Section B: two from three 25-mark structured questions. Short-answer and extended-response items, some based on source material; topics 1 to 5.", durationMinutes: 105, maxMarks: 75, weightingPercent: 36, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Human Geography", kind: "WRITTEN", description: "Section A: one compulsory 25-mark structured question. Section B: two from three 25-mark structured questions. Short-answer and extended-response items, some based on source material; topics 6 to 10.", durationMinutes: 105, maxMarks: 75, weightingPercent: 36, calculatorAllowed: true },
    { code: "3", name: "Component 3: Coursework", kind: "COURSEWORK", description: "Alternative to Paper 4: one teacher-set fieldwork assignment of 1800-2200 words, internally assessed and externally moderated.", maxMarks: 60, weightingPercent: 28 },
    { code: "4", name: "Paper 4: Geographical Investigations", kind: "WRITTEN", description: "Alternative to Component 3: two compulsory 30-mark questions on fieldwork-based investigations (methods, hypotheses, data presentation, analysis, conclusions and evaluation).", durationMinutes: 90, maxMarks: 60, weightingPercent: 28, calculatorAllowed: true },
  ],
  topics: C0460_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, objective codes are unique,
// and report what each syllabus leaves out. Every concept must be covered by at least one syllabus.
const coveredAnywhere = new Set();
for (const s of [zimsec, c0460]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  const walk = (nodes) => {
    for (const n of nodes) {
      if (keys.has(n.key)) throw new Error(`${s.board}/${s.subject}: duplicate node key ${n.key}`);
      keys.add(n.key);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}/${s.subject}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts covered by no syllabus: ${orphans.join(", ")}`);
console.log(`${CONCEPT_KEYS.size} concepts in the registry.`);

const registry = {
  family: "geography-o",
  name: "Geography (O-Level / IGCSE)",
  level: "O",
  prefix: "geo",
  subjects: ["zimsec/o-level/geography", "cambridge/igcse/geography"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/geography-o.json", registry);
write("content/syllabi/zimsec/o-level/geography/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/geography/2027-2029.json", c0460);
