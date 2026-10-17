// biology-o: human-nutrition/digestive-system (front view; person's left on the reader's right)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

{
  let b = "";
  const pink = "#f3d3cf", tan = "#ecd3a6", brown = "#d9b08c";
  // mouth + salivary gland
  b += ell(300, 34, 26, 14, { fill: pink, stroke: C.red });
  b += ell(348, 44, 11, 8, { fill: C.fillAmber, stroke: C.amber, width: 1.6 });
  // liver (reader's left)
  b += D.path_("M188,118 C215,104 290,108 312,120 L312,160 C292,188 232,192 206,172 C190,152 184,134 188,118 Z", { fill: brown, stroke: C.ink, width: 2 });
  // stomach (reader's right)
  b += D.path_("M308,112 C340,104 394,116 392,162 C390,204 352,218 330,196 C318,182 334,172 346,166 C350,152 330,150 318,140 Z", { fill: pink, stroke: C.ink, width: 2 });
  // gall bladder
  b += ell(262, 184, 8, 12, { fill: C.fillGreen, stroke: C.green, width: 1.8 });
  // pancreas (leaf shape below the stomach)
  b += ell(338, 222, 46, 9, { fill: C.fillAmber, stroke: C.amber, width: 1.8 });
  // large intestine (colon): ascending, transverse, descending, then rectum
  const colon = "M214,338 L214,248 L398,248 L398,338 C398,352 340,352 332,366";
  b += D.path_(colon, { stroke: C.ink, width: 20 }) + D.path_(colon, { stroke: tan, width: 15 });
  // small intestine: coils
  const si = "M335,200 C335,236 372,246 360,268 C348,286 280,266 266,282 C254,296 330,300 346,312 C356,326 290,338 262,322 C244,312 240,332 214,332";
  b += D.path_(si, { stroke: C.ink, width: 12 });
  b += D.path_(si, { stroke: pink, width: 8 });
  b += D.circle(330, 370, 4, { fill: C.ink });
  // oesophagus (drawn last so it joins the mouth and the stomach)
  b += D.rect(294, 46, 12, 74, { fill: tan, stroke: C.ink, width: 1.8, r: 4 });
  // labels, left
  b += call(150, 40, "Mouth", 275, 34, { anchor: "end" });
  b += call(150, 160, "Liver", 200, 150, { anchor: "end" });
  b += call(150, 200, "Gall bladder", 254, 188, { anchor: "end" });
  b += call(150, 290, "Colon (large intestine)", 213, 292, { anchor: "end" });
  // labels, right
  b += call(420, 40, "Salivary gland", 355, 44);
  b += call(420, 86, "Oesophagus", 306, 84);
  b += call(420, 150, "Stomach", 388, 152);
  b += call(420, 224, "Pancreas", 384, 224);
  b += call(420, 284, "Small intestine", 366, 276);
  b += call(420, 332, "Rectum", 346, 354);
  b += call(420, 374, "Anus", 336, 370);
  const alt = "Front view of the digestive system: the mouth and salivary glands, oesophagus, stomach on the reader's right, liver on the reader's left with the gall bladder beneath it, pancreas below the stomach, coiled small intestine framed by the colon, then the rectum and anus.";
  await D.figure(FAMILY, "digestive-system", D.svg(560, 395, b), { alt, caption: "Figure: the human digestive system in front view, labelled" });
  place(LES("human-nutrition/digestive-system"), "Remember that a diagram shows the person's left", D.md("digestive-system", alt, "Figure: the human digestive system in front view, labelled"));
}
