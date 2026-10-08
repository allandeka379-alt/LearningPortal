// Slice G3a: maps.thematic-maps (choropleth, isoline, dot, proportional symbols, flow, desire lines, sphere of influence).
// Values computed with code: 3 x sqrt(100/900) = 1; 2 x sqrt(1600/400) = 4; 37 x 200 = 7400; 4500/500 = 9;
// densities 12600/180 = 70, 5400/360 = 15, 22000/110 = 200, 9000/250 = 36.
import { concept, P, geographyLevels } from "../lib.mjs";

const WARDS = [
  "Table 1 shows population data for four wards of a fictional district.",
  "",
  "| Ward | Population | Area (km²) |",
  "|---|---|---|",
  "| 1 | 12,600 | 180 |",
  "| 2 | 5,400 | 360 |",
  "| 3 | 22,000 | 110 |",
  "| 4 | 9,000 | 250 |",
].join("\n");

const SHOPPERS = [
  "Table 2 shows how far ten shoppers interviewed at a fictional growth point had travelled from home (a Form 4 survey, fictional data).",
  "",
  "| Shopper | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |",
  "|---|---|---|---|---|---|---|---|---|---|---|",
  "| Distance (km) | 2 | 3 | 5 | 8 | 12 | 15 | 4 | 6 | 20 | 9 |",
].join("\n");

concept("geo.maps.thematic-maps", { file: "maps/thematic-maps", keyPrefix: "maps.thematic-maps" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **choropleth** map?",
    options: [
      ["A map with areas shaded according to the value of a statistic", "Correct: darker shades usually show higher values."],
      ["A map with lines joining places of equal value", "That is an isoline map."],
      ["A map with dots each standing for a fixed quantity", "That is a dot distribution map."],
      ["A map with lines whose width shows the amount moving", "That is a flow-line map."],
    ],
    answer: "A",
    explanation: "A **choropleth** map shades areas (wards, districts, provinces) by class of value, with a key.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a climate map, what does an **isohyet** join?",
    options: [
      ["Places with the same rainfall", "Correct: isohyets are isolines of rainfall."],
      ["Places with the same temperature", "Lines of equal temperature are isotherms."],
      ["Places with the same air pressure", "Lines of equal pressure are isobars."],
      ["Places with the same height", "Lines of equal height are contours."],
    ],
    answer: "A",
    explanation: "Isohyet = equal **rainfall**; isotherm = temperature; isobar = pressure; contour = height.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 45,
    stem: "Mean annual rainfall has been recorded at 60 weather stations across a region. Which thematic map best shows how rainfall changes across the region?",
    options: [
      ["An isoline map", "Correct: rainfall varies gradually and is measured at points, so isohyets suit it."],
      ["A flow-line map", "Flow-line maps show movement along routes."],
      ["A desire-line map", "Desire lines show journeys from origin to destination."],
      ["A route map", "Route maps show paths of roads or services."],
    ],
    answer: "A",
    explanation: "Continuous data measured at points (rainfall, temperature) is best shown by **isolines**, drawn by interpolation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "A council counts the number of vehicles using each main road into a town each day. Which map best shows the data?",
    options: [
      ["A flow-line map", "Correct: line widths along each road show the volume of traffic."],
      ["A choropleth map", "Choropleths shade areas, not routes."],
      ["An isoline map", "Isolines suit values that vary gradually across space, not along roads."],
      ["A dot distribution map", "Dots show where things are, not how much moves along a route."],
    ],
    answer: "A",
    explanation: "Movement along actual routes is shown with **flow lines** drawn to a width scale.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should a choropleth map of population use **density** rather than total population?",
    options: [
      ["Big districts would look important just for their size", "Correct: dividing by area makes districts of different sizes comparable."],
      ["Totals cannot be divided into classes", "Totals can be classed; the problem is that they ignore area."],
      ["Density figures are always more accurate than totals", "Both come from the same census; density just allows fair comparison."],
      ["Totals would need far too many shades in the key", "The number of classes is a choice, not a reason to avoid totals."],
    ],
    answer: "A",
    explanation: "Choropleths compare areas, so they need a **rate or density**. Totals make big districts look dark even when people are thinly spread.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "On a proportional circle map, Town X with **900** visitors is shown by a circle of radius **3 cm**. What radius should Town Y with **100** visitors have?",
    hints: ["The area of the circle should be proportional to the value.", "Radius is proportional to the square root of the value."],
    options: [
      ["1 cm", "Correct: 3 × √(100 ÷ 900) = 3 × 1/3 = 1 cm."],
      ["0.33 cm", "This scales the radius directly by the value (3 × 100 ÷ 900); area, not radius, should be proportional."],
      ["0.11 cm", "This divides the radius by 27; the scaling factor is √(1/9) = 1/3."],
      ["9 cm", "Town Y has fewer visitors, so its circle must be smaller."],
    ],
    answer: "A",
    explanation: "Radius ∝ √value. Y has 1/9 of X's value, so its radius is √(1/9) = 1/3 of 3 cm = **1 cm**.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "What is the main limitation of a choropleth map?",
    options: [
      ["Each area looks uniform, hiding variations within it", "Correct: a district looks evenly shaded although people cluster in towns."],
      ["It cannot show any data about areas", "Area data is exactly what choropleths show."],
      ["It needs a separate symbol for every person", "That describes dot maps with a very small dot value."],
      ["It can only be drawn for rainfall data", "Choropleths can show any rate or density by area."],
    ],
    answer: "A",
    explanation: "Choropleths imply the value is the same everywhere in an area, with sudden changes at boundaries. Real patterns change gradually and cluster.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **desire-line** map show?",
    options: [
      ["Straight lines from where journeys start to where they end", "Correct: they show the pattern of origins and destinations."],
      ["The exact roads and paths that people travel along", "Desire lines ignore the routes; they are drawn straight."],
      ["Lines joining places with the same number of journeys", "That would be an isoline map."],
      ["The volume of traffic by line width on each road", "That is a flow-line map."],
    ],
    answer: "A",
    explanation: "**Desire lines** are straight origin-to-destination lines; their length and number show the reach of a service (its sphere of influence).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On an isoline map, isolines that are **very close together** show:",
    options: [
      ["A rapid change in value over a short distance", "Correct: as with contours, close spacing means a steep gradient of change."],
      ["The highest values on the map", "Spacing shows the rate of change, not the size of the value."],
      ["An area where no data was collected", "Close lines need data; gaps in data give vague, widely spaced lines."],
      ["A gentle, gradual change in value", "Gentle change gives widely spaced isolines."],
    ],
    answer: "A",
    explanation: "Closely spaced isolines show **rapid change** (for example rainfall rising quickly towards mountains).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **sphere of influence** of a settlement or service?",
    options: [
      ["The area from which it draws its users", "Correct: e.g. the villages whose patients use one clinic."],
      ["The land inside its built-up area only", "The sphere extends well beyond the built-up area."],
      ["The route followed by its main bus service", "A route is a line, not an area served."],
      ["The highest point within its district", "Height has nothing to do with the area served."],
    ],
    answer: "A",
    explanation: "The **sphere of influence** (hinterland or catchment) is the area served by a settlement or service; desire-line surveys help map it.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "On a proportional circle map, a clinic with **400** patients a week has a circle of radius **2 cm**. Calculate the radius for a clinic with **1 600** patients a week.",
    value: 4, tol: 0.05, unit: "cm",
    wrong: [8, 16],
    hints: ["The value is four times larger. By how much does the radius grow if area is proportional to value?"],
    explanation: "Radius ∝ √value: 2 × √(1 600 ÷ 400) = 2 × √4 = 2 × 2 = **4 cm**.",
    workedSolution: "1. Ratio of values: 1 600 ÷ 400 = 4.\n2. Radius ratio = √4 = 2.\n3. New radius = 2 cm × 2 = 4 cm.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "On a dot distribution map, **1 dot represents 200 cattle**. A ward has **37** dots. How many cattle does this represent?",
    value: 7400,
    wrong: [237, 740],
    explanation: "37 × 200 = **7 400** cattle.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "A flow-line map uses a scale of **1 mm = 500 vehicles**. How wide should the line be for a road carrying **4 500** vehicles a day?",
    value: 9, unit: "mm",
    wrong: [90, 0.9],
    explanation: "4 500 ÷ 500 = **9 mm**.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the isoline that joins places with the same temperature.",
    accepted: ["isotherm", "isotherms", "an isotherm"],
    wrong: ["isobar", "isohyet"],
    explanation: "**Isotherms** join places of equal temperature.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Flow lines are drawn as straight lines from origin to destination, whatever route is used.",
    answer: false,
    feedbackFalse: "Correct: that describes desire lines. Flow lines follow the actual routes.",
    feedbackTrue: "Not so: straight origin-destination lines are desire lines; flow lines follow real routes with widths showing volume.",
    explanation: "Flow lines follow **routes** (width = volume); desire lines are **straight** origin-destination lines.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "On a dot map each dot stands for a {{blank:a}} quantity. On a proportional circle map the {{blank:b}} of each circle is proportional to the value. Choropleth maps should show rates or {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["fixed"], choices: ["fixed", "different", "random"] },
      { id: "b", accepted: ["area"], choices: ["area", "radius", "colour"] },
      { id: "c", accepted: ["densities"], choices: ["densities", "totals", "routes"] },
    ],
    explanation: "Dots have a fixed value; circle area (not radius) is proportional to value; choropleths use rates or densities.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each set of data to the most suitable thematic map.",
    pairs: [
      ["Percentage of households with electricity, by ward", "Choropleth map"],
      ["Mean January temperature at 40 weather stations", "Isoline map"],
      ["Daily number of buses on each main road", "Flow-line map"],
      ["Home villages of pupils at a boarding school", "Desire-line map"],
      ["Number of tourists at each of six lodges", "Proportional symbol map"],
    ],
    explanation: "Area rates → choropleth; point measurements of a continuous variable → isolines; movement on routes → flow lines; origin-destination → desire lines; values at places → proportional symbols.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Give one strength and two limitations of a dot distribution map of population.",
    hints: ["Think about clustering, the dot value and how hard it is to read exact figures."],
    points: [
      "Strength: shows clustering and empty areas clearly / dots are placed where people actually live.",
      "Limitation: where values are high, dots merge and become hard to count.",
      "Limitation: counting dots to get figures is slow / the chosen dot value affects the pattern / exact positions may be guessed.",
    ],
    modelAnswer: "A dot map shows clearly where people cluster and which areas are empty. However, in crowded areas the dots merge and cannot be counted, and finding totals by counting dots is slow, while the dot value chosen changes how the map looks.",
    explanation: "Dot maps are good for pattern, weak for exact values.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A student wants to show how population is distributed across the districts of a province. Evaluate the use of a choropleth map compared with a dot distribution map for this purpose.",
    hints: ["Consider what each map shows well, what each hides, and which suits district census data.", "Finish with a judgement."],
    points: [
      "Choropleth suits census data collected by district; densities let districts of different size be compared.",
      "Choropleth is quick to read and shows which districts are most densely populated.",
      "Choropleth hides variation within districts (towns versus empty land) and shows sudden changes at boundaries; class choice affects the pattern.",
      "Dot map shows where people actually cluster (towns, roads, river valleys) within districts.",
      "Dot map needs detailed location data; dots merge in crowded areas and totals are hard to read.",
      "Judgement: choropleth is better for comparing districts; dot map better for showing the real distribution; using both gives the fullest picture.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "A choropleth map suits district census data: converting totals to densities lets districts of different size be compared, and the shading is quick to read. But it makes each district look uniform, hiding the contrast between a town and empty land, and it shows abrupt changes at boundaries; the choice of classes can also change the picture. A dot map shows the real distribution, with dots clustered along roads, rivers and in towns, but it needs detailed location data, dots merge where people are crowded, and totals are hard to read. For comparing districts the choropleth is better; for showing where people actually live the dot map is better, so using both would be most informative.",
    explanation: "A strong answer weighs strengths and limitations of both maps and reaches a reasoned judgement.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${WARDS}\n\nA student will draw a choropleth map of population density with the classes 0–19, 20–59, 60–149 and 150 or more people per km².`,
    hints: ["Density = population ÷ area."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the population density of Ward 1.",
        value: 70, unit: "people/km²", wrong: [0.014],
        explanation: "12 600 ÷ 180 = 70 people per km².",
      }),
      P.num({
        label: "(b)", stem: "Calculate the population density of Ward 4.",
        value: 36, unit: "people/km²", wrong: [0.028],
        explanation: "9 000 ÷ 250 = 36 people per km².",
      }),
      P.mcq({
        label: "(c)", stem: "Which ward should be given the darkest shade?",
        options: [
          ["Ward 3", "Correct: 22 000 ÷ 110 = 200 people per km², the only ward in the 150+ class."],
          ["Ward 1", "Ward 1 has 70 people per km², in the 60–149 class."],
          ["Ward 2", "Ward 2 has only 15 people per km², the lightest class."],
          ["Ward 4", "Ward 4 has 36 people per km², in the 20–59 class."],
        ],
        answer: "A",
        explanation: "Densities: Ward 1 = 70, Ward 2 = 15, Ward 3 = 200, Ward 4 = 36. Ward 3 is darkest.",
      }),
      P.num({
        label: "(d)", stem: "How many of the four wards fall in the 20–59 class?",
        value: 1, wrong: [2],
        explanation: "Only Ward 4 (36) lies in 20–59; Ward 1 (70) is in 60–149, Ward 2 (15) in 0–19, Ward 3 (200) in 150+.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Ward 2 has the largest area but the lightest shade. Explain why the map should still not be read as 'almost nobody lives in Ward 2'.",
        points: [
          "Ward 2 still has 5 400 people; the map shows density, not total.",
          "People may be clustered (e.g. in a village or along a road) within the ward, which a choropleth cannot show.",
        ],
        explanation: "Choropleths show averages for whole areas.",
      }),
    ],
    explanation: "Choropleth construction: calculate densities, assign classes, shade from light (low) to dark (high).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: SHOPPERS,
    hints: ["Count carefully from the table."],
    parts: [
      P.num({
        label: "(a)", stem: "How many of the shoppers travelled more than 10 km?",
        value: 3, wrong: [4],
        explanation: "12, 15 and 20 km: 3 shoppers.",
      }),
      P.num({
        label: "(b)", stem: "What percentage of the shoppers travelled 5 km or less?",
        value: 40, unit: "%", wrong: [30],
        explanation: "2, 3, 5 and 4 km: 4 of 10 shoppers = 40%.",
      }),
      P.mcq({
        label: "(c)", stem: "If the home village of each shopper were also recorded, which map would best show where they came from?",
        options: [
          ["A desire-line map", "Correct: straight lines from each home village to the growth point show origins."],
          ["An isoline map", "Isolines suit continuous values measured at points, not journeys."],
          ["A choropleth map", "Choropleths shade areas by a rate; they do not show individual journeys."],
          ["A cross-section", "A cross-section shows relief along a line, not journeys."],
        ],
        answer: "A",
        explanation: "Origin-destination data is shown with desire lines.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons why ten shoppers is too small a sample to map the growth point's sphere of influence.",
        points: [
          "Ten people may not include shoppers from all the villages served.",
          "One unusual shopper (e.g. the 20 km traveller) has a large effect / the survey may reflect only one day or time.",
        ],
        explanation: "Larger, repeated samples give a more reliable sphere of influence.",
      }),
    ],
    explanation: "Survey data on journeys is summarised with counts and percentages and mapped with desire lines.",
  });

  b.card("DEFINITION", "Thematic map", "A map showing the distribution of one topic or statistic, e.g. rainfall or population density.");
  b.card("DEFINITION", "Choropleth map", "Areas shaded by class of a rate or density, darker = higher; hides variation within areas.");
  b.card("VOCABULARY", "Isolines", "Lines of equal value: contour (height), isohyet (rainfall), isotherm (temperature), isobar (pressure).");
  b.card("CONCEPT", "Proportional circles", "Circle area ∝ value, so radius ∝ √value: a quarter of the value → half the radius.");
  b.card("CONCEPT", "Dot distribution map", "Each dot = a fixed quantity placed where items are; shows clustering, but dots merge where values are high.");
  b.card("CONCEPT", "Flow lines vs desire lines", "Flow lines follow routes, width = volume. Desire lines are straight origin-destination lines.");
  b.card("VOCABULARY", "Sphere of influence", "The area from which a settlement or service draws its users.");
  b.card("CONCEPT", "Choosing a thematic map", "Area rates → choropleth; point data that varies gradually → isolines; movement → flow or desire lines; values at places → proportional symbols.");
});
