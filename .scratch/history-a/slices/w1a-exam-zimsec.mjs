// W1a exam-format items: ZIMSEC 25-mark essays (EXAM.ZIM_ESSAY). Paper 1: sources of history x1, Zimbabwean states x2;
// Paper 2: the Zulu state and Mfecane x1; Gaza, Mandinka and decline of states x1. Part structure and levels are our
// convention (a reviewer must check against the syllabus and ZIMSEC mark schemes).
import { concept, levels, EXAM } from "../lib.mjs";

const Z = EXAM.ZIM_ESSAY;
const base = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, marks: 25 };

concept("ahist.skills.sources-of-history", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec" }, (b) => {
  // 1. Paper 1: sources of history.
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.skills.sources-of-history", "ahist.precolonial.mapungubwe-great-zimbabwe"],
    stem: "Assess the contribution of oral tradition and archaeology to our knowledge of the pre-colonial history of Zimbabwe.",
    points: [
      ["Oral tradition: gives the African viewpoint, names of rulers, migrations and political ideas (for example the tradition of Mutota's move north and the role of spirit mediums)", 3],
      ["Oral tradition: weaknesses of telescoping, bias towards ruling families and lack of dates", 3],
      ["Archaeology: evidence where nothing was written, scientific dating and the layout of settlements (Great Zimbabwe, Mapungubwe, Khami)", 3],
      ["Archaeology: imported goods (Chinese celadon, Persian pottery, glass beads, Kilwa coins) as evidence of Indian Ocean trade", 3],
      ["Archaeology: limits such as uneven survival, cost, destruction by excavation and the need for interpretation", 3],
      ["Other sources (Portuguese and Arab documents, rock art, linguistics) and the value of combining sources, as in the refutation of the myth of foreign builders", 3],
      ["Evaluation: comparison of the two sources and a supported judgement of their relative contribution", 7],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Give each source its contribution and its limits, and use named examples before you compare them."],
    modelAnswer: `Oral tradition and archaeology have both made large contributions to our knowledge of pre-colonial Zimbabwe. Neither is sufficient on its own, and the most secure conclusions come from combining them.

Oral tradition is valuable because it records how African societies saw themselves. It preserves the names of rulers, the memory of migrations and ideas about kingship and religion that no outsider could have recorded. The tradition that Mutota left Great Zimbabwe and moved north to found the Mutapa state, for example, helps to explain the rise of a new power in the Zambezi valley. The role of spirit mediums, who spoke for the royal ancestors, is also known mainly from tradition. However, oral tradition has serious weaknesses. Memory changes as stories are retold, events of many generations can be telescoped into one, and traditions are often shaped to flatter the ruling family or to support claims to land and office. They rarely contain dates. For these reasons, a tradition that stands alone is treated with caution.

Archaeology contributes evidence for people who left no writing. Excavations at Great Zimbabwe, Khami and Mapungubwe have revealed the layout of settlements, building techniques, cattle bones, gold working and the separation of rulers from commoners, shown at Mapungubwe by the rulers living on the hill. Radiocarbon dating and stratigraphy give dates and sequences that do not depend on memory. Imported objects such as Chinese celadon, Persian pottery, glass beads and copper coins from Kilwa show that the plateau was linked to the Indian Ocean trade. Perhaps archaeology's greatest contribution was to correct a myth. In the nineteenth century, Karl Mauch and Theodore Bent suggested that Great Zimbabwe had been built by outsiders, and the idea lasted because of prejudice. The excavations of David Randall-MacIver in 1905 and Gertrude Caton-Thompson in 1929, and later radiocarbon dating, showed that the builders were the ancestors of the Shona.

Archaeology also has limits. Only some materials survive: stone, iron and pottery last, but wood, cloth and food usually do not. Excavation is slow and expensive, and it destroys what it uncovers, while early excavators sometimes dug carelessly and removed layers that can never be read again. Above all, objects do not explain themselves. Archaeology cannot tell us the names of kings, their politics or their beliefs, and debated questions, such as the reasons for the decline of Great Zimbabwe, remain open because the evidence permits several interpretations.

Other sources fill gaps. Portuguese documents of the sixteenth and seventeenth centuries describe the Mutapa state and its trade, though they were written by outsiders with narrow views and interests of their own. Arab writers mention Sofala and its gold. Rock art and linguistics add evidence on belief and on the movement of peoples. The importance of combining sources is clear in the case of Great Zimbabwe. Archaeology showed the walls to be African and medieval; Shona oral tradition had always linked the site to the ancestors of the Shona; and written records of the gold trade through Sofala agreed with the evidence of imports. Each source alone was incomplete, but together they gave a much stronger case.

Which has contributed more? Archaeology has contributed more to the study of the periods before about 1500, where tradition is weakest, and it has the advantage of scientific dating and the ability to test other claims, as it did in the case of the myth of foreign builders. Oral tradition has contributed more to the political and religious history of the later states, such as the Mutapa, Rozvi and Ndebele, where names and ideas matter. The two are not rivals. Archaeology tests oral tradition and oral tradition gives meaning to archaeology: a wall can be dated, but only tradition and written evidence suggest what the wall meant to the people who built it.

I conclude that both have contributed greatly, archaeology especially for the early centuries and for correcting false interpretations, oral tradition for the African viewpoint and the later states. The best history of pre-colonial Zimbabwe uses them together and tests each against the other and against written sources.`,
    explanation: "A top-level answer gives the contribution and limits of each source with named examples, shows how they work together and reaches a supported judgement. Level descriptors are our own wording; a reviewer should compare them with ZIMSEC mark schemes.",
  });

  // 2. Paper 1: Zimbabwean states (Great Zimbabwe, Mutapa, Rozvi).
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.precolonial.mapungubwe-great-zimbabwe", "ahist.precolonial.mutapa", "ahist.precolonial.torwa-rozvi", "ahist.precolonial.state-origins-theories"],
    stem: "To what extent was control of trade the main reason for the rise of the Great Zimbabwe, Mutapa and Rozvi states?",
    points: [
      ["Great Zimbabwe: gold and ivory trade through Sofala and Kilwa gave rulers wealth and prestige goods (porcelain, beads, Kilwa coins)", 3],
      ["Great Zimbabwe: cattle, farming surplus, good land and ritual leadership (royal ancestors, the soapstone birds)", 3],
      ["Mutapa: conquest by Mutota and Matope, tribute from conquered peoples, control of the gold and ivory trade and fairs", 4],
      ["Mutapa: religion and the role of spirit mediums in legitimising rulers", 2],
      ["Rozvi: military power of Changamire Dombo, defeat of the Torwa, Mutapa and Portuguese; cattle and tribute; Mwari cult", 4],
      ["Link to theories: trade, surplus, religion and conquest as explanations of state formation", 3],
      ["Evaluation: comparison of the three states and a supported judgement on the weight of trade", 6],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Deal with each state in turn but organise the conclusion by cause; decide where trade mattered most."],
    modelAnswer: `Control of trade was an important reason for the rise of Great Zimbabwe and the Mutapa state, but it was not the main reason in every case, and in the Rozvi state military power mattered more. The three states are best explained by a combination of causes in different proportions.

At Great Zimbabwe, trade was clearly significant. The plateau produced gold and ivory, which were carried to the coast at Sofala and sold to merchants from Kilwa and the wider Indian Ocean. The rulers of Great Zimbabwe controlled this flow of goods, and excavation has found Chinese celadon, Persian pottery, glass beads and copper coins from Kilwa in the Great Enclosure. Such imports were prestige goods which the king could give to followers and display to show his rank. However, the foundation of the state was local. Cattle were the main wealth and farming produced a surplus that supported rulers, craftsmen and builders. The land was well watered and close to gold-bearing areas. The rulers also had ritual authority as the link with the royal ancestors, and the soapstone birds may represent this. Mapungubwe had already shown, before Great Zimbabwe, how cattle and trade could support a state with rulers living apart from commoners. Therefore trade strengthened the rulers of Great Zimbabwe, but the state rested on cattle, farming and religion as well.

For the Mutapa state, conquest and tribute were at least as important as trade. According to tradition, Mutota led his people north from Great Zimbabwe into the Zambezi valley and conquered peoples such as the Tavara and Tonga, who paid tribute. His son Matope extended the state across northern Zimbabwe and into Mozambique. Trade was nevertheless important: the Mwene Mutapa allowed merchants to trade at his fairs, taxed them and distributed imported cloth and beads to reward followers. The Portuguese were interested in the state precisely because of its gold. Religion also mattered, since the ruler was regarded as sacred and spirit mediums helped to make rulers legitimate. Historians cannot be certain of the early details, which come from oral tradition and Portuguese records, but the evidence suggests that conquest created the state and trade and tribute sustained it.

The Rozvi state was different. Changamire Dombo built an army, overthrew the Torwa in the late seventeenth century, defeated the Mutapa and drove the Portuguese from the plateau. Trade was part of the story, since the Rozvi controlled cattle, tribute and gold, but the key to their rise was military strength and the weakness of rivals, since the Mutapa state was divided by succession disputes and the Portuguese were few. The Rozvi also supported the Mwari cult, which linked many peoples to the Mambo. Here the theory of conquest, supported by religion, explains the rise better than the theory of trade.

When these cases are compared, a pattern emerges. Theories of state formation each have limits: the trade theory cannot explain why some trading communities did not become states, the surplus theory does not explain why some farming communities remained small, and the conquest theory does not explain the peaceful growth of Great Zimbabwe. For Great Zimbabwe, trade was the most distinctive factor but was built on cattle and farming. For the Mutapa, trade and conquest were of about equal weight. For the Rozvi, conquest was the main cause.

I conclude that control of trade was a major reason for the rise of Great Zimbabwe and the Mutapa state, giving rulers the wealth to reward followers, but that it was not the main reason in all three states. Cattle, farming surplus, religion and above all conquest, as in the case of the Rozvi, were also essential. The rise of states on the plateau was the result of several causes working together.`,
    explanation: "A top-level answer deals with all three states, uses the theories of state formation, compares the weight of trade with other causes and reaches a supported judgement. Level descriptors are our own wording.",
  });

  // 3. Paper 1: the Ndebele state.
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.precolonial.ndebele-state"],
    stem: "How far was the regimental system the main reason for the strength of the Ndebele state in the second half of the nineteenth century?",
    points: [
      ["Army: age regiments (amabutho), military towns, discipline, raiding and defence", 4],
      ["Social unity: Zansi, Enhla and Holi, incorporation of conquered peoples, mixed service in regiments", 3],
      ["Economy: cattle, tribute from Shona communities, ivory and trade with hunters and traders", 3],
      ["Leadership and government: Mzilikazi and Lobengula, izinduna, the king's authority and caution in dealing with foreigners", 3],
      ["Religion: ancestors and the Mwari cult shrines in the Matobo Hills", 2],
      ["Limits and weaknesses: divided army, resentful tributaries, succession tension", 3],
      ["Evaluation: weighing the regiments against the other causes, with a supported judgement", 7],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Explain how the regiments worked, then show what else made the state strong, and decide."],
    modelAnswer: `The regimental system was the most important reason for the strength of the Ndebele state, but it worked together with incorporation, cattle and tribute, and skilful leadership, and it had weaknesses that appeared in the 1880s.

The system of age regiments (amabutho) was the foundation of the state. Young men from every group were enrolled in the same regiments and lived in military towns around the royal capital. They were trained and disciplined, and they served the king as warriors, herders and collectors of tribute. The regiments raided neighbouring peoples for cattle and grain, defended the state and enforced tribute, and the king rewarded successful regiments with cattle. In this way they created a loyal and mobile force that no neighbouring community could match, which allowed Mzilikazi to settle in south-western Zimbabwe about 1840 and to dominate the Shona communities and the remnants of the Rozvi state.

The regiments also helped to unite a mixed population. Ndebele society was divided into the Zansi, the original Khumalo Nguni, the Enhla, who were absorbed in the Transvaal, and the Holi, the local people incorporated in Zimbabwe, who had lower status. But young men of all three groups served together under the king's officers, which weakened older loyalties of clan and origin. Over time intermarriage and service blurred divisions, and some Holi gained high positions. The incorporation of conquered peoples increased manpower, so that a refugee group became a nation.

The economy gave the army its support. Cattle were the main wealth, and the king owned very large herds from which he could reward followers. Raiding supplied cattle, and Shona communities paid tribute in grain, cattle and labour. The state also traded ivory with white hunters and traders who came to Bulawayo. These resources fed the regiments, so the army and the economy depended on one another.

Leadership was important too. Mzilikazi had commanded under Shaka and used his knowledge of Zulu military organisation to build the state, and he united his followers during the difficult years after the migration. Lobengula, who became king in 1870, kept the kingdom together for nearly a quarter of a century, maintained the regimental system and dealt cautiously with foreigners, trying to balance the claims of concession seekers against one another. The king ruled with a council of izinduna, who advised him and governed districts. Religion also gave unity. The Ndebele honoured the royal ancestors and in their new country began to consult the Mwari shrines in the Matobo Hills for rain, adopting a belief of the Shona and Kalanga.

Yet the state had weaknesses, which show that the regiments could not secure strength on their own. The army was divided in the 1880s: young regiments wanted war, but Lobengula and older leaders wished to avoid a conflict with a powerful opponent. The Shona communities resented tribute and raiding. The succession dispute after Mzilikazi's death in 1868 showed that the throne could be contested. And a state that depended on raiding and cattle had limited ways of dealing with outsiders who came with treaties, concessions and, finally, the Maxim gun. In 1887 and 1888 the Grobler and Moffat treaties limited Lobengula's freedom to deal with other powers, and on 30 October 1888 his representatives signed the Rudd Concession, whose meaning he later disputed. Lobengula's policy of balancing one concession seeker against another bought time, but it could not save a state whose strength lay in spears and cattle from an enemy with money, rifles and the backing of a chartered company.

I conclude that the regimental system was the main reason for the strength of the Ndebele state, since it gave military power, unity and the means to collect tribute. It was not the only reason: incorporation, cattle wealth, leadership and religion all contributed, and the state's strength was limited by internal divisions. The regiments made the state strong against its neighbours, but not against a European company with modern weapons.`,
    explanation: "A top-level answer explains how the regiments worked, links them to society, economy and leadership, notes the weaknesses and reaches a supported judgement. Level descriptors are our own wording.",
  });

  // 4. Paper 2: the Zulu state and the Mfecane.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.precolonial.mfecane-zulu"],
    stem: "To what extent can the Mfecane be explained by the rise of the Zulu state under Shaka?",
    points: [
      ["Shaka's reforms: stabbing spear, shield, buffalo-horns formation, age regiments, centralisation and incorporation", 4],
      ["Zulu expansion: defeat of the Ndwandwe and conquests, which drove groups such as those of Soshangane, Zwangendaba, Nxaba and Mzilikazi to move", 3],
      ["Earlier rivalry between the Mthethwa under Dingiswayo and the Ndwandwe under Zwide, before Shaka", 3],
      ["Drought, population pressure and competition for cattle and land", 3],
      ["Ivory trade at Delagoa Bay and slave raiding from the Cape and the coast (Cobbing's argument)", 3],
      ["Historiography: Omer-Cooper and Cobbing, and the view that the scale of the Mfecane has been overstated", 3],
      ["Evaluation: weighing Zulu expansion against the other causes with a supported judgement", 6],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["State the older view and the challenges to it, and use the evidence to decide how far Shaka explains the Mfecane."],
    modelAnswer: `The rise of the Zulu state was an important part of the Mfecane, but it cannot explain it alone. Historians now see the upheaval as the result of several causes, of which Zulu expansion was one, and they disagree about how much weight each deserves.

The older view, set out by J. D. Omer-Cooper in The Zulu Aftermath (1966), put the Zulu state at the centre of the story, and there is good evidence for this. Under Shaka, who became chief of the Zulu about 1816, the army was transformed. The short stabbing spear and the large shield made close fighting decisive, the buffalo-horns formation surrounded enemies, and young men were enrolled in age regiments living in military towns. Shaka reduced the power of hereditary chiefs, appointed loyal izinduna, and took the cattle of the defeated for the king. After the death of Dingiswayo about 1818, he defeated Zwide's Ndwandwe, and the Zulu came to dominate a large area of what is now KwaZulu-Natal. Defeated or threatened groups fled. Soshangane, who had served Zwide, founded the Gaza state; Zwangendaba and Nxaba led groups north across the Limpopo and the Zambezi; Mzilikazi, who broke from Shaka, built the Ndebele state in the Transvaal and then in Zimbabwe. These movements spread Nguni military methods and caused wars across central and southern Africa. In this sense the rise of the Zulu was a major cause of the Mfecane.

However, the Zulu did not start the changes. Before Shaka became powerful, the Mthethwa under Dingiswayo and the Ndwandwe under Zwide were already competing, and Dingiswayo had begun to organise age regiments. Shaka built on a process already under way. Other causes also mattered. A long drought around the beginning of the century intensified competition for food, grazing and cattle, and population growth increased the pressure on land. The ivory trade through Delagoa Bay gave chiefs who controlled it an advantage and fed rivalry. These economic and environmental causes help to explain why chiefdoms were becoming larger and more militarised before the Zulu.

A strong challenge to the older view came from Julian Cobbing, in an article called "The Mfecane as alibi" (1988). He argued that slave raiding from Delagoa Bay and from the Cape was a major cause of the upheaval, and that blaming Shaka and the Zulu hid European responsibility. Other historians accept that the slave trade and colonial pressure have been underrated, but they point out that the evidence for Zulu expansion is strong and that Cobbing may have overstated his case. Some argue also that the whole picture of a vast catastrophe has been exaggerated, and historians disagree about how many people were killed or displaced. Evidence is mostly oral tradition and the accounts of traders and missionaries, which makes certainty difficult.

The movements to the north help to test the older view. The groups of Soshangane, Zwangendaba and Nxaba and the Ndebele of Mzilikazi all had roots in the wars between the Ndwandwe and the Zulu, and they carried organisation of age regiments and the stabbing spear into Mozambique, Zimbabwe, Zambia and Malawi. That supports the view that the Zulu rise and the rivalry that preceded it were central for those regions. On the other hand, the Sotho movements of Sebetwane and the creation of the Basotho kingdom of Moshoeshoe had other pressures behind them, including attacks by neighbouring groups and the struggle for cattle and land on the highveld, which shows that Shaka cannot explain every movement.

Weighing these arguments, I conclude that Zulu expansion was a very important cause of the Mfecane in the 1820s and 1830s, especially for the movements north of the Limpopo that created the Ndebele, Gaza and Ngoni states. It was not the only cause or the first. Rivalry among earlier chiefdoms, drought, population pressure, the ivory trade and slave raiding all contributed, and the weight to give to each is debated. The Mfecane is therefore best explained as a combination of causes, with the Zulu state as a major but not exclusive part of it.`,
    explanation: "A top-level answer states the older view and its challengers, uses evidence for each cause and reaches a supported judgement that recognises the debate. Level descriptors are our own wording.",
  });

  // 5. Paper 2: Gaza and Mandinka, decline of states.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.precolonial.gaza", "ahist.precolonial.mandinka", "ahist.precolonial.decline-of-states"],
    stem: "Compare the reasons for the fall of the Gaza state and of the Mandinka state of Samori Toure, and assess whether internal or external factors were more important in each.",
    points: [
      ["Gaza internal: succession struggle between Mawewe and Mzila, discontented tributaries (Tsonga, Chopi, Ndau), family division", 3],
      ["Gaza external: Portuguese campaign of 1895 with modern weapons (Coolela, Chaimite), international rivalry after the Berlin Conference", 3],
      ["Mandinka internal: revolts of conquered peoples against forced conversion and heavy demands, harm of scorched earth", 3],
      ["Mandinka external: French artillery and machine guns, loss of the Sierra Leone arms trade, rivals such as Sikasso, capture in 1898", 3],
      ["Similarities: both resisted but fell to European armies in the 1890s, and in both internal weaknesses helped the invaders", 3],
      ["Differences: Samori resisted for about sixteen years with modern weapons and a professional army; Gaza fell in a short campaign; Islam as ideology", 3],
      ["Evaluation: judgement on internal and external factors in each state", 7],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Treat the two states side by side by theme, and give a judgement for each as well as overall."],
    modelAnswer: `The Gaza and Mandinka states both fell to European armies in the 1890s, and in both cases external force was the immediate cause. But in each internal weaknesses made the conquest easier, and the balance between the two kinds of factor differed.

In the Gaza state, the Portuguese campaign of 1895 was the decisive blow. A modern army with rifles and machine guns defeated Ngungunyana's regiments at Coolela on 7 November 1895, and the king was captured at Chaimite on 28 December. Behind the campaign lay international rivalry. After the Berlin Conference, Portugal had to show effective occupation of its claims against Britain and the Boers, and it decided to end the independence of the Gaza kings, whom it had dealt with from weakness for most of the century. Internal weaknesses, however, made the campaign easier. The succession struggle after Soshangane's death between his sons Mawewe and Mzila had shown the divisions in the ruling family, and had increased Portuguese influence when Mzila won with their help. The Tsonga, Chopi and Ndau, who paid tribute and supplied young men, were discontented, and some did not support the king against the Portuguese. Ngungunyana tried to protect his state by seeking British support and moving his capital, but he failed to win allies.

In the Mandinka state, the French army was again the main external force. The French had artillery, machine guns and a well-supplied colonial army, and they pressed Samori from the 1880s. The loss of his arms supply also mattered: as Britain and France agreed borders, the trade through Sierra Leone on which Samori relied for breech-loading rifles was closed. Rivals such as the ruler of Sikasso sometimes helped the French. Internal weaknesses were serious as well. Samori's wars and demands for food and men, the sale of captives for arms, and forced conversion to Islam angered conquered peoples, who revolted. His scorched-earth policy slowed the French, but it also destroyed the economic base of his own state and increased local suffering. He was captured on 29 September 1898 and died in exile in 1900.

There are important similarities. Both states were military states built by conquest, and both rested on tribute from conquered peoples, which created discontent. Both rulers tried diplomacy, such as Samori's treaties with the French and Ngungunyana's appeals to Britain, before they fought. Both fell to European armies with modern weapons, and both were affected by the rivalry among European powers after the Berlin Conference. In both, the discontent of subject peoples helped the invaders.

There were also differences. Samori's state had a professional army of sofa, modern rifles, workshops to repair and copy them, and Islam as a unifying ideology; he resisted for about sixteen years. Gaza, by contrast, relied on massed regiments that were defeated in a short campaign. Samori's resistance shows that he was not defeated by weapons alone, while the Gaza case shows more clearly the effect of a short, well-prepared invasion on a state with an unreformed army. Samori's loss of arms supply was a specific external factor, whereas Gaza's weakness lay more in its family divisions and tributaries.

Weighing the evidence, I conclude that external factors were decisive in both cases, because neither state could have been defeated without a modern European army and the decisions of imperial governments. But internal weakness was more important in Gaza, where the ruling family and the tributaries were divided, while in the Mandinka state external factors, especially the French army and the loss of rifles, were the more important, although the revolts of subject peoples added to them. In both cases the most convincing explanation is that outside force defeated states whose internal weaknesses had left them unable to resist it for long.`,
    explanation: "A top-level answer compares the two states by theme, uses specific evidence and reaches a supported judgement on internal and external factors in each. Level descriptors are our own wording.",
  });
});
