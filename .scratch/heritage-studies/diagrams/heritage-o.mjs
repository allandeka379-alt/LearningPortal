// heritage-studies-o diagrams. Run from the repo root: node .scratch/heritage-studies/diagrams/heritage-o.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lessonPath, wrap, nlines, card, stack, vTimeline, insertAfterBlock } from "../../english/diagrams/_h.mjs";
const { C } = D;
const FAM = "heritage-studies-o";
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  insertAfterBlock(lessonPath(FAM, lesson), after, D.md(name, alt, cap));
};

// 1. treaties and the Charter (colonisation/colonisation.md)
await put("colonisation-timeline", vTimeline([
  { date: "1884-85", text: "Berlin Conference." },
  { date: "1887", text: "Grobler Treaty between Lobengula and the Transvaal." },
  { date: "February 1888", text: "Moffat Treaty." },
  { date: "30 October 1888", text: "Rudd Concession." },
  { date: "29 October 1889", text: "Royal Charter granted to the British South Africa Company." },
  { date: "12 September 1890", text: "Pioneer Column reaches Fort Salisbury." },
], { w: 580, dateW: 190, note: "Not drawn to scale." }),
  "Timeline of the occupation of Zimbabwe: Berlin Conference 1884-85, Grobler Treaty 1887, Moffat Treaty February 1888, Rudd Concession 30 October 1888, Royal Charter to the British South Africa Company 29 October 1889 and the Pioneer Column reaching Fort Salisbury on 12 September 1890.",
  "Figure: key dates from the Berlin Conference to the Pioneer Column (not to scale)", "colonisation/colonisation.md", "| Date | Treaty or document | Main terms (outline) | Significance |");

// 2. First Chimurenga (colonisation/first-chimurenga.md)
await put("first-chimurenga-timeline", vTimeline([
  { date: "March 1896", text: "Rising begins in Matabeleland." },
  { date: "June 1896", text: "Rising begins in Mashonaland." },
  { date: "1896", text: "Fighting in Matabeleland largely ends after indabas between Cecil Rhodes and Ndebele leaders in the Matobo Hills." },
  { date: "1897", text: "Mashonaland resistance continues." },
  { date: "April 1898", text: "Nehanda and Kaguvi are executed." },
], { w: 580, dateW: 150, note: "Not drawn to scale." }),
  "Timeline of the First Chimurenga: rising in Matabeleland from March 1896, in Mashonaland from June 1896, Matabeleland fighting largely ended after the 1896 indabas in the Matobo Hills, Mashonaland resistance continued into 1897 and Nehanda and Kaguvi were executed in April 1898.",
  "Figure: key dates of the First Chimurenga, 1896 to 1898 (not to scale)", "colonisation/first-chimurenga.md", "## The course of the risings (outline)");
