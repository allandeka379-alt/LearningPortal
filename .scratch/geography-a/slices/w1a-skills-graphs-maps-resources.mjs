// W1a: skills.graphs-maps-resources (free preview lesson). Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, sum, range, pctChange, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const mon = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const T2 = [26.8, 26.4, 25.8, 24.1, 21.0, 18.2, 18.0, 20.6, 24.0, 26.7, 27.0, 26.9];
const R2 = [105, 95, 60, 18, 6, 2, 1, 1, 5, 28, 65, 98];
const totalR2 = sum(R2);
const R3 = [88, 74, 52, 20, 8, 1, 0, 2, 6, 24, 59, 81];
const totalR3 = sum(R3);
const rangeT2 = range(T2);
const tob = pctChange(580, 612);
chk(Math.sqrt(900 / 100) * 4, 12, 1e-9);

concept("ageo.skills.graphs-maps-resources", { file: "skills/graphs-maps-resources", keyPrefix: "skills.graphs-maps-resources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of graph is best for showing how a river's discharge changes over time during a storm?",
    options: [
      ["A line graph", "Correct: lines show continuous change over time."],
      ["A pie chart", "A pie chart shows parts of a whole at one moment."],
      ["A triangular graph", "A triangular graph shows three parts that add to 100%."],
      ["A dot map", "A dot map shows distribution in space, not change over time."],
    ],
    answer: "A",
    explanation: "A line graph is the standard way to show continuous change over time, as in a storm hydrograph.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does an anomaly on a graph mean?",
    options: [
      ["A value that does not fit the general pattern", "Correct: it stands out from the trend."],
      ["The highest value on the graph", "The highest value may fit the pattern perfectly well."],
      ["The average value of the data", "The average is a summary, not an anomaly."],
      ["A value that has been estimated by the author", "Estimated values are not the same as anomalies."],
    ],
    answer: "A",
    explanation: "An anomaly is a value outside the general pattern; it may be an error or need a special explanation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main limitation of a choropleth map of population density by district?",
    options: [
      ["It hides variation within each district", "Correct: the whole district gets one shade."],
      ["It cannot show any numbers", "Classes of shading represent numerical ranges."],
      ["It only works for rivers", "Choropleths can show any area-based value."],
      ["It must be drawn in one colour only", "Several tones or colours are usually used."],
    ],
    answer: "A",
    explanation: "A choropleth gives each area a single class, so differences inside an area (for example a dense town in a sparse district) are hidden.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On a proportional circle map, town A (50 000 people) has a circle of radius 4 mm. The circle areas are proportional to population. What is the radius of the circle for town B with 200 000 people?",
    options: [
      ["8 mm", "Correct: area is four times larger, so the radius is twice as long."],
      ["16 mm", "That would make the radius proportional to population, not the area."],
      ["12 mm", "Radius does not rise in steps of 4 mm per 50 000 people."],
      ["4 mm", "A larger town needs a larger circle."],
    ],
    answer: "A",
    explanation: "200 000 is four times 50 000. Area is proportional to population, so radius is multiplied by √4 = 2: 8 mm.",
    hints: ["Area is proportional to radius squared."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A bar chart of exports has a vertical axis that starts at 300 instead of 0, so a rise from 340 to 362 looks very large. What is the problem?",
    options: [
      ["The graph exaggerates a small change", "Correct: a truncated axis makes small differences look big."],
      ["The graph hides the largest value", "The largest value is shown in the bars."],
      ["The graph has too many categories", "The problem is the axis, not the number of categories."],
      ["The graph shows secondary data only", "Both primary and secondary data can be graphed."],
    ],
    answer: "A",
    explanation: "Starting the axis at a non-zero value exaggerates the change, which is a source of bias.",
    hints: ["Think of the height of the bars compared with the real change."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which map would be most suitable for showing the number and direction of migrants moving between provinces?",
    options: [
      ["A flow map with arrows of different widths", "Correct: width shows quantity and the arrow shows direction."],
      ["A choropleth map of provincial populations", "A choropleth shows values per area, not movements."],
      ["An isoline map of provincial rainfall", "Isolines show values that change smoothly over space."],
      ["A dot map of provincial farms", "Dots show the location of items, not movement."],
    ],
    answer: "A",
    explanation: "Flow maps use lines or arrows whose width shows the amount of movement between places.",
    hints: ["Which map shows both direction and quantity?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a logarithmic scale used on a graph of the populations of cities from 10 000 to 10 million people?",
    options: [
      ["It lets very different values be shown on one graph", "Correct: each step represents a tenfold increase."],
      ["It makes all the cities appear the same size", "A log scale preserves rank order and differences in size."],
      ["It removes the need for labels on the axes", "Axes must be labelled whatever the scale."],
      ["It always gives a straight line on a scatter graph", "The line is straight only if the relationship is of a particular kind."],
    ],
    answer: "A",
    explanation: "A logarithmic scale compresses a wide range of values (here a thousand-fold) so that all can be read.",
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a sample of 180 households, 45 use charcoal as their main fuel. What angle represents charcoal on a pie chart, in degrees?",
    value: (45 / 180) * 360, unit: "°",
    wrong: [25, 45],
    explanation: "45 ÷ 180 = 0.25; 0.25 × 360° = 90°. Giving 25 is the percentage.",
    hints: ["Share of the whole × 360°."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Cotton production rose from 150 000 tonnes to 195 000 tonnes. Calculate the percentage increase.",
    value: pctChange(150000, 195000), unit: "%", dp: 0,
    wrong: [23, 45000],
    explanation: "Change = 45 000; 45 000 ÷ 150 000 × 100 = 30%. Dividing by the new value gives 23%.",
    hints: ["Divide the change by the original value."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "On a proportional circle map the circle for a town of 100 000 people has a radius of 4 mm. Circle area is proportional to population. What radius, in mm, should be used for a town of 900 000 people?",
    value: 12, unit: "mm",
    wrong: [36, 9],
    explanation: "The population is 9 times larger, so the area is 9 times larger and the radius is √9 = 3 times larger: 3 × 4 = 12 mm.",
    hints: ["Take the square root of the population ratio."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`The monthly rainfall at a station (mm) is: ${R3.join(", ")}. Calculate the annual rainfall, in mm.`,
    value: totalR3, unit: "mm",
    wrong: [totalR3 / 12, 88],
    explanation: `Add the twelve monthly totals: ${R3.join(" + ")} = ${totalR3} mm. The mean monthly value is ${dpStr(totalR3 / 12, 1)} mm.`,
    hints: ["Add all twelve months."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a histogram of continuous data the bars normally touch each other.",
    answer: true,
    explanation: "True. The bars touch because the classes are continuous; in a bar chart of separate categories there are gaps.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain when a scatter graph with a line of best fit is more suitable than a bar chart.",
    points: ["A scatter graph shows the relationship between two continuous (measured) variables, such as rainfall and yield", "The line of best fit shows the direction and strength of the relationship and allows estimates and anomalies to be seen", "A bar chart shows separate categories or totals and cannot show a relationship between two measured variables"],
    modelAnswer: "A scatter graph is suitable when two measured variables, such as rainfall and yield, are compared. The line of best fit shows the direction and strength of the relationship and makes anomalies visible. A bar chart shows separate categories or totals and cannot show a relationship between two measured variables.",
    explanation: "Match the graph to the type of data and the purpose.",
    hints: ["Which graph shows the relationship between two measured variables?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each graph or map to the data it shows best.",
    pairs: [
      ["Scatter graph with a line of best fit", "The relationship between two variables"],
      ["Climate graph", "Monthly temperature and rainfall for one place"],
      ["Age-sex pyramid", "Population structure by age and gender"],
      ["Isoline map", "Places of equal value, such as rainfall"],
      ["Pie chart", "Shares of a whole"],
    ],
    explanation: "Each graph or map is designed for a specific kind of data.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about map lines.",
    template: "Lines joining places of equal rainfall are called {{blank:a}}, and lines joining places of equal pressure are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["isohyets"], choices: ["isohyets", "isobars", "isotherms"] },
      { id: "b", accepted: ["isobars"], choices: ["isohyets", "isobars", "isotherms"] },
    ],
    explanation: "Isohyets join equal rainfall; isobars join equal pressure; isotherms join equal temperature.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a map in which areas are shaded according to the class into which a value falls?",
    accepted: ["choropleth", "choropleth map", "a choropleth map"],
    wrong: ["dot map", "isoline map"],
    explanation: "A **choropleth** map shades areas by class.",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe the points to make when asked to describe the trend shown on a line graph.",
    points: ["State the overall direction (rising, falling or fluctuating)", "Quote figures with units (highest, lowest or start and end values)", "Identify any anomaly, peak or change in rate"],
    modelAnswer: "State whether the line is rising, falling or fluctuating overall, quote figures with units such as the start, end, highest and lowest values, and point out any anomaly or sudden change.",
    explanation: "Trend, figures, anomaly.",
    hints: ["Think of direction, figures and exceptions."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why a choropleth map can be misleading when used to show the density of population in a large rural district that contains one town.",
    points: ["The whole district is shaded in one class", "The town's high density is averaged with large empty rural areas / the map hides the variation within the district", "Readers may wrongly think the whole district has that density"],
    modelAnswer: "The whole district receives a single shade, so the high density in the town is averaged with the sparsely populated rural areas. The map hides variation inside the district and readers may assume the whole area has the same density.",
    explanation: "One class per area hides internal variation.",
    hints: ["How many shades does one district get?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A newspaper extract says: 'Tourist arrivals have doubled in the last year, showing that the industry has recovered fully.' State two checks you would make before accepting this claim.",
    points: ["Check the source (who produced the figures and for what purpose)", "Check the base figures: doubling from a very low number may still be below earlier levels (compare with several years)", "Check the date and definition of 'tourist arrival' (day visitors included?)", "Check whether other data support the claim (hotel occupancy, receipts)"],
    modelAnswer: "I would check the source of the figures and whether it has a reason to exaggerate. I would also look at the actual numbers over several years, because doubling from a very low base may still be below earlier levels, and check how 'tourist arrival' is defined.",
    explanation: "Source, base figures, date and definitions, corroborating evidence.",
    hints: ["What if the year before was very low?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The table gives climate data for a station in the Zimbabwe lowveld (illustrative data).\n\n${tab(["Month", ...mon], [["Temperature (°C)", ...T2.map((x) => dpStr(x, 1))], ["Rainfall (mm)", ...R2]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the annual temperature range, in °C.", value: rangeT2, dp: 1, unit: "°C", wrong: [27], explanation: t`$${dpStr(Math.max(...T2), 1)} - ${dpStr(Math.min(...T2), 1)} = ${dpStr(rangeT2, 1)}$ °C.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total annual rainfall, in mm.", value: totalR2, unit: "mm", wrong: [totalR2 / 12], explanation: `Sum of the twelve months = ${totalR2} mm.` }),
      P.short({ label: "(c)", marks: 1, stem: "Name the hottest month. (Give the month, e.g. 'July'.)", accepted: ["november", "nov"], explanation: "November has the highest temperature, 27.0 °C." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the pattern of rainfall through the year.", points: ["Wet season from November to March with a peak of 105 mm in January", "Dry season from April to October, with only 1 to 6 mm a month from May to September", "Clearly seasonal; most of the rain falls in the summer months (quote totals)"], modelAnswer: "Rainfall is strongly seasonal. The wet season runs from November to March with a peak of 105 mm in January, and the dry season lasts from April to October, with only 1 to 6 mm a month from May to September." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest how the climate affects farming at the station.", points: ["Rainfall is low in total (under about 500 mm) so crops depend on irrigation or drought-tolerant crops (sorghum, cotton) / ranching", "Rain falls in a short season so only one growing season is possible without irrigation", "High temperatures increase evaporation and so reduce soil moisture"], modelAnswer: "The annual rainfall is low and falls in a short summer season, so only one rain-fed crop season is possible and drought-tolerant crops such as sorghum or cotton, or ranching, suit the area. High temperatures increase evaporation, so irrigation is needed for reliable yields." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two limitations of using the data for one year only.", points: ["One year may be unusually wet or dry and so may not be typical (rainfall varies from year to year)", "It does not show variability, extremes or the timing of dry spells within the season"], modelAnswer: "One year may not be typical because rainfall varies between years, and monthly totals do not show variability or dry spells within the wet season." }),
    ],
    explanation: "Range, total, description and application of climate data, with an evaluation of the data.",
    hints: ["Quote figures with units in the description."],
  });
  b.struct({
    d: 3, skill: "EVALUATION", calculator: true,
    stem: t`A newspaper bar chart shows tobacco sales (US\$ million) as 580 in 2023 and 612 in 2024. The vertical axis starts at 560, not 0, so the 2024 bar looks more than twice as tall as the 2023 bar.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage increase in sales from 2023 to 2024, to one decimal place.", value: tob, dp: 1, unit: "%", wrong: [32, 5.2], explanation: t`Increase $= 612 - 580 = 32$; $32 \div 580 \times 100 = ${dpStr(tob, 1)}\%$. Using 612 as the base gives 5.2%.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the axis starting at 560 misleads readers.", points: ["The bar heights show 20 and 52 above the base line, so the 2024 bar looks more than twice as large", "Real change is only about 5%; the axis exaggerates a small change"], modelAnswer: "With the axis starting at 560 the bars show only 20 and 52 above the base, so the 2024 bar looks over twice as tall, although the real increase is only about 5%." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two things you would check about the source of the chart.", points: ["Who produced the figures and whether they have a reason to make the change look large", "The date, definition of 'sales' and whether the figures are estimates or final"], modelAnswer: "I would check who produced the figures and whether they have a reason to exaggerate, and also the date and definition of sales and whether the figures are final or estimated." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest a better way to show several years of sales data.", points: ["A line graph (or bar chart) with the vertical axis starting at zero", "Show more years so that the trend can be seen / label axes with units and give the source"], modelAnswer: "Use a line graph, or a bar chart, with the axis starting at zero and more years of data, with labelled axes and the source." }),
    ],
    explanation: "A calculation, then evaluation of a misleading graph.",
    hints: ["Divide the change by the starting value."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of a choropleth map for showing the pattern of poverty across the districts of a country. [8]",
    points: [
      "Shows the pattern at a glance, so clusters of poorer districts are easy to see",
      "Easy to compare with other maps (rainfall, services, distance to markets)",
      "Suitable for rates or proportions (percentage of households below a poverty line) rather than raw totals",
      "Classes and colours chosen by the cartographer can change the apparent pattern",
      "Hides the variation within districts (urban pockets of poverty in rich districts)",
      "Large, sparsely populated districts attract the eye although they contain few people",
      "Data may be old or collected at different times in different districts",
      "Judgement: very useful as an overview, but should be supported by tables, more detailed maps and local data before decisions are made",
    ],
    levels: geographyLevels(8),
    modelAnswer: "A choropleth map shows the pattern of poverty at a glance, so clusters of poorer districts are easy to see and the map can be compared with maps of rainfall or services. It is suited to rates, such as the percentage of households in poverty, rather than raw numbers. However, the classes and colours chosen can change the apparent pattern and each district is given one shade, so variation inside districts is hidden, for example urban pockets of poverty in a richer district. Large, thinly populated districts also dominate the eye although few people live there, and the data may be old. Overall the map is a useful overview, but it should be supported by tables, more detailed local maps and recent data before decisions are made.",
    wordLimit: { max: 300 },
    explanation: "Uses and limitations followed by a judgement.",
    hints: ["Say what the map shows well and what it hides."],
  });

  b.card("CONCEPT", "Describing a graph: what four things to include?", "Overall trend, figures with units, anomalies and (where relevant) a comparison.");
  b.card("FORMULA", "Pie chart angle?", "Angle = (value ÷ total) × 360°.");
  b.card("DEFINITION", "Choropleth map?", "A map in which areas are shaded by class of value; it hides variation within each area.");
  b.card("CONCEPT", "Proportional symbols: how do radii scale?", "Area is proportional to the value, so radius is proportional to the square root of the value.");
  b.card("FACT", "Names of isolines: rainfall, pressure, temperature, height?", "Isohyets, isobars, isotherms and contours.");
  b.card("CONCEPT", "Which map shows movement?", "A flow map (arrows whose width shows amount) or a desire-line map.");
  b.card("CONCEPT", "Why use a log scale?", "To show a very wide range of values on one graph; each step is a tenfold increase.");
  b.card("CONCEPT", "Checks on a resource's reliability?", "Source and purpose, date, scale and classes, axis start, sample and whether the data are estimated.");
  b.card("CONCEPT", "Describe versus explain?", "Describe says what the pattern is (with figures); explain gives reasons. Do not explain when asked to describe.");
});
