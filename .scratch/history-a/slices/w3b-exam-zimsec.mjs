// W3b exam-format items: ZIMSEC Paper 2 25-mark essays (EXAM.ZIM_ESSAY): German unification x1, the First World War x1.
// Part structure and levels are our convention (a reviewer must check against the syllabus and ZIMSEC mark schemes).
import { concept, levels, EXAM } from "../lib.mjs";

const Z = EXAM.ZIM_ESSAY;
const base = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, marks: 25, paper: "Paper 2" };

concept("ahist.germany.unification-1871", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec" }, (b) => {
  b.essay({
    ...base,
    concepts: ["ahist.germany.vienna-to-1848", "ahist.germany.bismarck-to-1866", "ahist.germany.unification-1871", "ahist.germany.austria-prussia-1850-62"],
    stem: "To what extent was Bismarck the main reason why Germany was unified by 1871?",
    points: [
      ["Bismarck: appointment in 1862, governing without a budget, diplomacy over Schleswig-Holstein and Gastein, isolation of Austria (Biarritz, Italy, Russia)", 4],
      ["Bismarck: moderate peace at Prague, the North German Confederation, the Luxemburg crisis, the Ems Telegram and the war of 1870", 3],
      ["Prussian economic strength: the Zollverein, coal, iron and railways, and the contrast with Austria's finances", 3],
      ["Military factors: Roon's army reforms, Moltke's planning, the needle gun and the victories of 1866 and 1870", 3],
      ["Nationalism and liberalism: 1848, the Frankfurt Parliament, the Nationalverein, the National Liberals and the Indemnity Bill", 3],
      ["Other factors: Austrian weakness and isolation, the French mistakes of Napoleon III, the attitude of the great powers", 3],
      ["Evaluation: weighing Bismarck against the other factors and a supported judgement", 6],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Treat Bismarck's actions, then the factors that made them possible, and decide which was the main reason."],
    modelAnswer: `Bismarck was a major reason why Germany was unified by 1871, because he chose the moments and methods of the wars of 1864, 1866 and 1870. But he was not the main reason in the sense that he alone made unification possible. Economic strength, the army, nationalism and the weakness of Austria and France created the conditions in which his diplomacy could succeed.

The case for Bismarck is strong. Appointed Minister-President on 23 September 1862 during a crisis over army reform, he governed without an approved budget, using the gap theory, and carried the reforms through. He then used the Schleswig-Holstein question to draw Austria into the war against Denmark in 1864, and the Convention of Gastein of 1865 created an arrangement that he could turn into a quarrel. In the next year he isolated Austria: he kept Russia friendly, left Napoleon III hoping for compensation at Biarritz, and allied with Italy. After the victory at Königgrätz on 3 July 1866 he insisted on a lenient peace at Prague, because he wanted Austria as a future friend and feared outside intervention, and he created the North German Confederation under Prussian leadership. In 1870 he encouraged the Hohenzollern candidature and edited the Ems Telegram, so that France declared war and the south German states joined Prussia. Few leaders have shaped the timing and form of a national unification so clearly.

Yet Prussia's economic strength made his policy possible. The Zollverein, which began in 1834 and was renewed without Austria in 1853, tied the German states to a market led by Prussia. Coal and iron in the Ruhr and Silesia and the building of railways gave Prussia revenue and industry, while Austria struggled with debt. Without that strength Bismarck could not have paid for the army, and the southern states could not easily have left the Prussian market.

The army also mattered. The reforms of Roon and the planning of Moltke gave Prussia a force that used railways and the telegraph to mobilise quickly, and the breech-loading needle gun helped it to win in 1866. These reforms began before Bismarck was appointed, and it was the king and Roon who proposed them. Bismarck's contribution was to keep them in place against the liberal Landtag, but the army was an independent factor.

Nationalism and liberalism were also important. The revolutions of 1848 and the Frankfurt Parliament showed that many Germans wanted unity, and although the revolutions failed, the Nationalverein of 1859 and the National Liberal Party that supported Bismarck after the Indemnity Bill of 1866 gave him support. Nationalism was strong enough to bring the south German states into the war of 1870. However, nationalism alone had failed in 1848-49, and it was only when it was joined to Prussian power that it succeeded, so it was a necessary condition and not a sufficient one.

Other powers made his task easier. Austria was weakened by its finances, by its defeat in Italy in 1859 and by its isolation after the Crimean War. France under Napoleon III misjudged Prussia in 1866 and in 1870 declared war without allies. Britain was not interested in the continent and Russia was friendly. Bismarck exploited these weaknesses but did not create them.

Weighing these factors, I conclude that Bismarck was the most important single individual cause, because he took decisions that determined when and how unification happened, and without him it might have come later or in a different form, perhaps with Austria included. But the underlying reasons were the economic and military strength of Prussia and the weakness of its rivals, and Bismarck's genius was to use them. It is therefore better to say that Bismarck was the main agent of unification, and Prussian power its main cause. Historians disagree about whether he planned each step or exploited opportunities, but on either view his role was decisive in the method and timing, though not in the conditions that made success possible.`,
    explanation: "A top-level answer deals with Bismarck's actions, weighs them against economic, military, nationalist and international factors and reaches a supported judgement. Level descriptors are our own wording; a reviewer should compare them with ZIMSEC mark schemes.",
  });

  b.essay({
    ...base,
    concepts: ["ahist.ww1.long-term-causes", "ahist.ww1.july-crisis"],
    stem: "Assess the relative importance of the alliance system and of the Balkans in causing the First World War.",
    points: [
      ["Alliance system: Dual and Triple Alliances, the Franco-Russian alliance, the Entente Cordiale and the Anglo-Russian Convention, and the sense of encirclement", 4],
      ["Alliances in the crisis: the blank cheque, Russian support for Serbia, French support for Russia, and the limits (Britain and Italy not bound)", 3],
      ["The Balkans: Ottoman decline, Austrian fear of Serbia, the annexation of Bosnia in 1908, the Balkan Wars and the Black Hand", 4],
      ["The assassination and the July Crisis as the point where the Balkans and the alliances met", 3],
      ["Other causes: the naval race, Moroccan crises, militarism and the Schlieffen Plan", 3],
      ["Historians' debate on long-term and short-term causes and on responsibility", 2],
      ["Evaluation: comparison of the two factors and a supported judgement", 6],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Treat each factor, then show how they combined, and decide which mattered more."],
    modelAnswer: `The alliance system and the Balkans were both essential causes of the First World War, but they worked in different ways. The Balkans provided the spark and the quarrel; the alliances turned a local conflict into a general war. I will argue that the Balkans were the more important cause of the outbreak, while the alliances were more important in explaining why the war spread.

The alliance system divided Europe into two groups. Bismarck made the Dual Alliance of Germany and Austria-Hungary in 1879, and Italy joined in 1882. After Bismarck's dismissal the Reinsurance Treaty with Russia lapsed, and Russia and France made an alliance confirmed in 1894. Britain settled its quarrels with France by the Entente Cordiale in 1904 and with Russia in 1907. Germany felt encircled, and each side believed it could not afford to see its partner defeated. In July 1914 these commitments mattered. Germany gave Austria-Hungary the blank cheque on 5-6 July; Russia supported Serbia, and Germany therefore declared war on Russia on 1 August; France supported Russia, and Germany declared war on France on 3 August. The alliances thus explain why a quarrel between Austria and Serbia involved four great powers within a week.

However, the alliances had limits. They were not binding on everyone: Italy declared neutrality in 1914, and Britain had no treaty obligation to fight for France or Russia; it entered the war after the invasion of Belgium on 4 August. The alliances also did not make war certain, since earlier crises, in Morocco in 1905 and 1911 and in Bosnia in 1908, had been settled without a general war although the blocs existed. They increased the risk, but they needed a cause.

The Balkans supplied that cause. The decline of the Ottoman Empire left a vacuum in south-eastern Europe. Austria-Hungary, with millions of Slavs, feared the nationalism of Serbia, and annexed Bosnia-Herzegovina in October 1908, to Serbia's fury. Russia saw itself as the protector of the Slavs and had been humiliated in 1908-09. In the Balkan Wars of 1912-13 Serbia grew in size, and Austria resolved that it must be checked. Serbian nationalist societies, such as the Black Hand, wanted to challenge Austrian rule in Bosnia. When Franz Ferdinand was shot at Sarajevo on 28 June 1914, Austria saw the chance to deal with Serbia, and the ultimatum of 23 July led to the war declared on 28 July. Without this Balkan quarrel there would have been no crisis.

The two causes were also connected. The Balkans were dangerous because of the alliances: Austria acted because it believed in German support, and Russia stood behind Serbia because it had the backing of France. Equally, the alliances might never have been tested if the Balkans had been quiet. Other factors increased the risk. The naval race had poisoned relations between Britain and Germany, the Moroccan crises of 1905 and 1911 made the blocs more rigid, and the Schlieffen Plan meant that Germany had to attack France quickly once Russia mobilised. Historians disagree about the weight of long-term and short-term causes: some see structures such as alliances and the arms race as making war probable, while others stress the decisions of July 1914 and the part played by chance.

On balance, I conclude that the Balkans were the more important cause of the outbreak, since they produced the crisis that no previous crisis had matched, and the war began as a Balkan quarrel. The alliance system was the more important cause of the war's extent, because it ensured that the quarrel became a European war within days. Neither alone is sufficient. The war came when a Balkan crisis occurred in a Europe divided into alliances, with war plans that left little time for diplomacy.`,
    explanation: "A top-level answer explains both factors with evidence, shows how they interacted, recognises the limits of the alliances and reaches a supported judgement. Level descriptors are our own wording.",
  });
});
