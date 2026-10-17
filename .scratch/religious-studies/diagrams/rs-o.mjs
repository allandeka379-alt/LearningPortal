// religious-studies-o diagrams. Run from the repo root: node .scratch/religious-studies/diagrams/rs-o.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lessonPath, wrap, nlines, card, stack, vTimeline, insertAfterBlock } from "../../english/diagrams/_h.mjs";
const { C } = D;
const FAM = "religious-studies-o";
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  insertAfterBlock(lessonPath(FAM, lesson), after, D.md(name, alt, cap));
};

// 1. Judaism timeline (judaism/kingdom-diaspora.md)
await put("judaism-timeline", vTimeline([
  { date: "About 1,000 years before the Common Era", text: "Early monarchy: Saul, David, Solomon; the First Temple in Jerusalem." },
  { date: "After Solomon", text: "Divided kingdom: Israel and Judah; the prophets. Israel falls to Assyria in the eighth century BCE." },
  { date: "586 BCE", text: "Jerusalem and the First Temple destroyed; the Babylonian exile." },
  { date: "After the exile", text: "Return of many exiles; the Second Temple built." },
  { date: "70 CE", text: "Romans destroy the Second Temple; rabbinic Judaism and the synagogue become central." },
  { date: "Diaspora", text: "Communities across the world keep their identity through festivals and scripture; Jews expelled from Spain in 1492." },
  { date: "1941-45", text: "The Holocaust (Shoah): about six million Jewish men, women and children murdered." },
  { date: "14 May 1948", text: "State of Israel proclaimed." },
], { w: 580, dateW: 170, note: "Not drawn to scale: the gaps between events differ greatly." }),
  "Timeline of Jewish history in order: early monarchy under Saul, David and Solomon, the divided kingdom, 586 BCE destruction of Jerusalem and the exile, the Second Temple, 70 CE destruction by the Romans, the diaspora, 1941-45 the Holocaust and 14 May 1948 the State of Israel.",
  "Figure: key events in Jewish history from the early monarchy to 1948 (not to scale)", "judaism/kingdom-diaspora.md", "| Period | Event | Meaning for Judaism |");

// 2. early church timeline (christianity/early-church.md)
await put("early-church-timeline", vTimeline([
  { date: "About 30 CE", text: "Pentecost in Jerusalem (Acts 2)." },
  { date: "Mid-first century CE", text: "Paul's missionary journeys." },
  { date: "64 CE", text: "Nero blames Christians for the fire of Rome." },
  { date: "303 CE", text: "Start of the severe persecution under Diocletian." },
  { date: "313 CE", text: "Edict of Milan: Christians may worship freely." },
  { date: "325 CE", text: "Council of Nicaea, called by Constantine." },
  { date: "380-381 CE", text: "Christianity becomes the Empire's religion; Council of Constantinople." },
], { w: 580, dateW: 170, note: "Not drawn to scale." }),
  "Timeline of the early Church: Pentecost about 30 CE, Paul's journeys in the mid-first century, Nero blames Christians for the fire of Rome in 64 CE, Diocletian's persecution from 303, the Edict of Milan in 313, the Council of Nicaea in 325 and Christianity as the Empire's religion in 380-381.",
  "Figure: key dates in the early Church, from Pentecost to 381 CE (not to scale)", "christianity/early-church.md", "| Date | Event |");

// 3. caliphs timeline, proportional (islam/caliphs-spread.md)
{
  const cal = [["Abu Bakr", 632, 634, C.fillAmber], ["Umar", 634, 644, C.fillBlue], ["Uthman", 644, 656, C.fillGreen], ["Ali", 656, 661, C.fillAmber]];
  const x0 = 30, x1 = 550, y0 = 632, y1 = 661, X = (yr) => x0 + ((yr - y0) / (y1 - y0)) * (x1 - x0);
  let b = D.text(20, 22, "The four rightly guided caliphs (approximate years, CE)", { weight: 700 });
  cal.forEach(([n, a, c, f], i) => {
    b += D.rect(X(a), 90, X(c) - X(a), 44, { fill: f, width: 1.6 });
    const mid = (X(a) + X(c)) / 2;
    const up = i % 2 === 0;
    b += D.text(mid, up ? 50 : 158, `${n}
${a}-${c}`, { anchor: "middle", weight: 700, size: 14 });
  });
  // move the years under the names for the upper labels
    b += D.text(X(632), 210, "632 the Prophet's death", { size: 13, fill: C.muted }) + D.text(X(661), 210, "661 Ali killed; Umayyad rule from Damascus", { size: 13, fill: C.muted, anchor: "end" });
  const alt = "Timeline of the four rightly guided caliphs, drawn to scale: Abu Bakr 632-634, Umar 634-644, Uthman 644-656 and Ali 656-661 CE, after which power passed to the Umayyad family ruling from Damascus.";
  await put("rightly-guided-caliphs-timeline", D.svg(580, 226, b), alt, "Figure: the four rightly guided caliphs, drawn to scale (approximate years CE)", "islam/caliphs-spread.md", "| Caliph | Approximate years (CE) | Remembered for |");
}

// 4. marriage process in Indigenous Religion (indigenous/rites-marriage.md)
{
  const rows = [
    ["1  Courtship", "Young people meet and show interest; families make quiet enquiries. Shows respect.", C.fillBlue],
    ["2  Go-between", "The groom's family sends a go-between to the bride's family. Avoids direct confrontation.", C.fillBlue],
    ["3  Introduction", "The groom and his relatives visit the bride's family: a formal request to marry.", C.fillBlue],
    ["4  Bride wealth", "The families negotiate roora/lobola: thanks the bride's family and seals the alliance.", C.fillAmber],
    ["5  Aunts and uncles", "The bride's paternal aunt (vatete/ubabakazi) and the uncles advise the couple.", C.fillBlue],
    ["6  Welcoming\nthe bride", "She is received at the groom's home and introduced to his relatives and ancestors.", C.fillGreen],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 150, chars: 52, gap: 22 });
  await put("marriage-process-steps", svg,
    "Main steps of the marriage process in Indigenous Religion in order: courtship, go-between, introduction, bride wealth (roora or lobola), advice from the bride's paternal aunt and uncles, and welcoming the bride at the groom's home; details differ between families and peoples.",
    "Figure: the main steps in the marriage process (details differ between families)", "indigenous/rites-marriage.md", "## The marriage process");
}

// 5. funeral stages (indigenous/rites-death.md)
{
  const rows = [
    ["1  Announcement", "Relatives and the village headman are informed; the family gathers.", C.fillBlue],
    ["2  Preparing\nthe body", "Close relatives, usually of the same sex as the deceased, wash and dress the body.", C.fillBlue],
    ["3  Wake", "Mourners gather for singing, prayers and speeches, often through the night.", C.fillBlue],
    ["4  Burial", "Men dig the grave; the family and elders speak at the graveside.", C.fillBlue],
    ["5  Purification", "Mourners wash their hands in water, sometimes with herbs, before eating.", C.fillBlue],
    ["6  Mourning", "The close family observes mourning customs for a period.", C.fillGrey],
    ["Later:  kurova guva /\numbuyiso", "Often around a year later: the family invites the spirit home and it becomes an ancestor.", C.fillAmber],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 170, chars: 48, gap: 20 });
  await put("funeral-stages", svg,
    "Stages of funeral and burial customs in Indigenous Religion: announcement, preparing the body, wake, burial, purification and mourning, followed often about a year later by kurova guva or umbuyiso, when the spirit is received as an ancestor; practices vary between peoples and families.",
    "Figure: funeral stages and the later kurova guva / umbuyiso (practices vary)", "indigenous/rites-death.md", "## Funeral and burial customs");
}

// 6. types of family (family/concept-structure.md)
{
  let b = D.node(200, 10, 180, 36, "Types of family", { fill: C.fillAmber, weight: 700, size: 15 });
  const t = [
    ["Nuclear", "Two parents and their children"], ["Extended", "Parents, children and other relatives"],
    ["Single-parent", "One parent and children"], ["Child-headed", "Children living without an adult, led by an older sibling"],
    ["Blended", "Two families joined by remarriage, with children from earlier relationships"], ["Polygamous", "One husband with more than one wife and their children"],
  ];
  t.forEach(([n, d], i) => {
    const x = 20 + (i % 2) * 280, y = 70 + Math.floor(i / 2) * 92;
    const c = card(x, y, 260, n, d, { fill: C.fillBlue, chars: 34, h: 80 });
    b += c.svg + D.line(x < 100 ? 280 : 300, y + 40, 290, y + 40, { stroke: C.muted, width: 1.6 });
  });
  b += D.line(290, 46, 290, 70 + 2 * 92 + 40, { stroke: C.muted, width: 1.6 });
  await put("family-types", D.svg(580, 70 + 3 * 92, b),
    "Six types of family and who belongs to each: nuclear (two parents and children), extended (parents, children and other relatives), single-parent, child-headed, blended (two families joined by remarriage) and polygamous (one husband with more than one wife).",
    "Figure: the six types of family and who belongs to each", "family/concept-structure.md", "## Types of family");
}

// 7. five pillars (islam/pillars-shahadah-salah.md)
{
  const p = [
    ["Shahadah", "Declaring faith in one God and in Muhammad as God's messenger"],
    ["Salah", "Praying five times a day"],
    ["Zakat", "Giving a fixed share of wealth to those in need"],
    ["Sawm", "Fasting in the month of Ramadan"],
    ["Hajj", "Pilgrimage to Makkah, once in a lifetime for those who are able"],
  ];
  let b = "";
  p.forEach(([n, d], i) => {
    const x = 20 + i * 110, body = wrap(d, 11);
    b += D.rect(x, 20, 100, 230, { fill: C.fillBlue, r: 8, width: 1.6 }) + D.text(x + 50, 50, n, { anchor: "middle", weight: 700, size: 14 }) + D.text(x + 8, 80, body, { size: 13 });
    b += D.text(x + 50, 240, `${i + 1}`, { anchor: "middle", weight: 700, size: 14, fill: C.muted });
  });
  await put("five-pillars", D.svg(580, 270, b),
    "The Five Pillars of Islam in outline: Shahadah, declaring faith in one God and in Muhammad as God's messenger; Salah, praying five times a day; Zakat, giving a fixed share of wealth to those in need; Sawm, fasting in Ramadan; Hajj, pilgrimage to Makkah once in a lifetime for those able.",
    "Figure: the Five Pillars of Islam in outline", "islam/pillars-shahadah-salah.md", "| Pillar | Meaning | Taught in |");
}

// 8. last week of Jesus (christianity/jesus-life.md)
{
  const rows = [
    ["1  Entry into\nJerusalem", "Jesus rides in on a donkey (Mark 11:1-11): Palm Sunday.", C.fillBlue],
    ["2  The Last\nSupper", "Bread and wine, a new covenant (Mark 14:22-25): the origin of the Eucharist.", C.fillBlue],
    ["3  Gethsemane\nand arrest", "Betrayed by Judas Iscariot and arrested by the Temple authorities.", C.fillBlue],
    ["4  Trial", "Before the Sanhedrin, then Pontius Pilate, who ordered crucifixion (Mark 14-15).", C.fillBlue],
    ["5  Crucifixion", "At Golgotha, between two criminals; he died and was buried in a tomb.", C.fillGrey],
    ["On the third day", "Women find the tomb empty (Mark 16:1-8): the resurrection.", C.fillGreen],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 150, chars: 52, gap: 20 });
  await put("holy-week-sequence", svg,
    "The last week of Jesus in order: entry into Jerusalem (Mark 11:1-11), the Last Supper (Mark 14:22-25), Gethsemane and arrest, the trial before the Sanhedrin and Pilate, crucifixion at Golgotha, and on the third day the empty tomb (Mark 16:1-8).",
    "Figure: the events of the last week of Jesus in the Gospels, in order", "christianity/jesus-life.md", "## The last week in Jerusalem");
}
