// Slice W2a: ZIMSEC exam-format items, 25 marks each. Paper 2: slave trade x2, Frontline States, OAU/AU, UN,
// Zimbabwe's foreign policy, China. Paper 1: constitution; democracy and human rights; one source-based question.
import { concept, P, source, sources, levels, EXAM, checkExam } from "../lib.mjs";

const Z = EXAM.ZIM_STRUCTURED;
const ZS = EXAM.ZIM_SOURCE;
const common = (plan, paper) => ({ d: 5, skill: plan.skill, applies: plan.applies, secs: plan.secs, examStyle: true, paper });

concept("hist.cooperation.united-nations", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec" }, (b) => {
  // 1. Forms, causes and methods; the triangular trade (topic 5.1-5.2)
  b.struct({
    ...common(Z, "Paper 2"), d: 4,
    concepts: ["hist.slavery.forms-causes", "hist.slavery.atlantic-trade"],
    stem: "**Slavery and the slave trade in Africa.** Answer all parts.",
    hints: ["(b) needs causes grouped and explained, not listed.", "(c) weighs African involvement against outside demand."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the slave trades.", template: "A person handed over as security for a debt was called a {{blank:a}}. Captives in the trans-Saharan trade were carried by {{blank:b}} caravans. The voyage from Africa to the Americas was called the {{blank:c}}. On the first leg of the triangle, ships carried {{blank:d}} to Africa. In the nineteenth century, many East African captives were sent to the {{blank:e}} plantations of Zanzibar.", blanks: [
        { id: "a", accepted: ["pawn"], choices: ["pawn", "chattel", "serf", "trustee"] },
        { id: "b", accepted: ["camel"], choices: ["camel", "ox-wagon", "railway", "canoe"] },
        { id: "c", accepted: ["Middle Passage"], choices: ["Middle Passage", "Great Trek", "Long March", "Northern Route"] },
        { id: "d", accepted: ["cloth and guns"], choices: ["cloth and guns", "sugar and rum", "cotton and tobacco", "gold and salt"] },
        { id: "e", accepted: ["clove"], choices: ["clove", "cotton", "coffee", "tea"] },
      ], explanation: "Pawn; camel caravans; the Middle Passage; manufactured goods such as cloth and guns; clove plantations on Zanzibar and Pemba." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the economic, social and political causes of the slave trade in Africa.", points: [
        ["Economic: demand for plantation labour in the Americas (sugar, tobacco, cotton) and later on Zanzibar.", 2],
        ["Economic: profits for merchants and rulers; desire for imported goods such as guns and cloth.", 2],
        ["Social: wealth and status measured in dependants; domestic slavery already existed.", 2],
        ["Social: debt, pawnship and punishment for crimes made people saleable.", 2],
        ["Political: wars between states produced captives; expansion of states such as Dahomey and Asante.", 2],
        ["Political: the gun-slave cycle forced states to raid to obtain guns for defence.", 2],
      ], modelAnswer: "The main economic cause was demand for labour. Plantations in the Americas, growing sugar, tobacco and later cotton, needed huge numbers of workers, and in the nineteenth century the clove plantations of Zanzibar and the sugar islands of the Indian Ocean created new demand. The trade was profitable for European merchants and ship owners and for African rulers and traders, who wanted imported goods such as guns, cloth and metal goods.\n\nSocial practices helped to supply captives. In many societies wealth and status were measured in dependants, and domestic slavery already existed. People in debt, pawns whose debts were not cleared and people convicted of crimes such as theft or witchcraft could be sold.\n\nPolitical factors also mattered. Wars between states produced prisoners who were sold, and some states, such as Dahomey and Asante, grew powerful partly by controlling the trade. Once guns entered the trade, the gun-slave cycle meant that rulers sold captives to buy guns, and neighbours had to raid in turn to obtain guns to defend themselves.", explanation: "Two causes under each heading, each explained." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far were African rulers and merchants responsible for the Atlantic slave trade?", points: [
        ["African role: rulers and merchants captured, sold and transported captives to the coast; some states profited.", 2],
        ["Outside role: European demand created and drove the trade; Europeans built forts, organised shipping and owned plantations.", 2],
        ["Outside role: European guns fed the gun-slave cycle; the scale far exceeded older African slavery; chattel slavery was a European-American system.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "African rulers and merchants played a part. On the West African coast most Europeans did not capture people themselves; they bought captives from African rulers and traders, who organised raids and wars and passed captives from inland markets to the coast. Some states, such as Dahomey, grew rich from the trade.\n\nHowever, the main responsibility lay with those who created the demand. European merchants and governments organised the trade, built forts such as Elmina, financed the ships and sold captives to plantations owned by Europeans in the Americas. The guns they sold drove the gun-slave cycle, which forced unwilling states to take part. The scale of the trade, about 12 million people embarked according to historians' estimates, far exceeded older forms of slavery in Africa, and hereditary chattel slavery based on race was a system of the Americas.\n\nOverall African rulers and merchants shared responsibility for supplying captives, but the trade existed and grew because of European demand and organisation.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the slave trade.",
  });

  // 2. Effects and abolition (topic 5.3)
  b.struct({
    ...common(Z, "Paper 2"),
    concepts: ["hist.slavery.effects-abolition"],
    stem: "**The effects and abolition of the slave trade.** Answer all parts.",
    hints: ["(b) needs negative and positive effects, each explained.", "(c) weighs economic reasons against humanitarian reasons and resistance."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "Identify **five** groups or individuals who campaigned for the abolition of the slave trade.", points: [
        "Quakers.",
        "Evangelical Christians / William Wilberforce.",
        "Thomas Clarkson / Granville Sharp (humanitarians).",
        "Olaudah Equiano / Ottobah Cugoano (formerly enslaved writers).",
        "Enslaved people who revolted (Saint-Domingue) / ordinary people who petitioned or boycotted sugar.",
      ], explanation: "One mark per group or individual from a different category." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the effects of the slave trade on the African continent.", points: [
        ["Depopulation: loss of millions of young men and women; deaths in raids and marches.", 2],
        ["Insecurity and wars: raiding, gun-slave cycle, people moved to defensive sites.", 2],
        ["Decline of agriculture: loss of workers and fear of raids cut food production.", 2],
        ["Decline of crafts: imported cloth and metal goods undercut local producers.", 2],
        ["Positive (for some): new crops such as maize and cassava; rise of states such as Dahomey and Asante; wealth for some rulers and merchants.", 2],
        ["Long-term: underdevelopment debate (Rodney); effects varied by region.", 2],
      ], modelAnswer: "The most serious effect was depopulation. Historians estimate that about 12 million Africans were embarked across the Atlantic alone, most of them young men and women, and many more died in raids and on the march to the coast.\n\nThe trade spread insecurity and war. Raids and the gun-slave cycle meant that communities lived in fear, and many moved to hilltops or other defensive sites. Agriculture declined in many areas, because young workers were taken and people were afraid to farm outlying fields. Imported cloth and metal goods undercut local weavers and smiths.\n\nSome effects are described as positive, though they benefited few. Maize, cassava and groundnuts from the Americas became important food crops. States such as Dahomey and Asante grew powerful, and some rulers and coastal merchants became rich.\n\nIn the long term, historians such as Walter Rodney argue that the trade drained Africa of labour and helped to underdevelop it, while others stress that its effects varied greatly from region to region.", explanation: "Six developed effects with balance." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was the slave trade abolished for economic reasons?", points: [
        ["Economic: Industrial Revolution wanted raw materials and markets in Africa; legitimate trade; free-trade ideas (Eric Williams).", 2],
        ["Humanitarian/religious: Quakers, evangelicals, Wilberforce, Clarkson, Equiano; petitions and boycotts.", 2],
        ["Resistance: Saint-Domingue (1791-1804), Jamaica (1831-32); trade still profitable in 1807 (critics of Williams).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "Economic reasons played a part. Eric Williams argued that an industrialising Britain had less need of slave plantations and wanted Africa as a source of raw materials such as palm oil and as a market for its goods, so \"legitimate trade\" and free-trade ideas favoured abolition.\n\nHowever, other historians point out that the trade was still profitable in 1807, which weakens a purely economic explanation. Humanitarian and religious campaigners, Quakers, evangelicals such as Wilberforce, researchers such as Clarkson and formerly enslaved writers such as Equiano, changed public opinion through evidence, petitions and a sugar boycott. Enslaved people's own resistance, above all the revolution in Saint-Domingue and the Jamaica rising of 1831-32, showed that slavery was dangerous to keep.\n\nOverall economic change made abolition easier, but the humanitarian campaign and resistance were the main forces that brought it about when it came.", explanation: "Both sides and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the effects and abolition of the slave trade.",
  });

  // 3. Frontline States (topic 13.1)
  b.struct({
    ...common(Z, "Paper 2"), d: 4,
    concepts: ["hist.cooperation.frontline-states"],
    stem: "**The Frontline States.** Answer all parts.",
    hints: ["(b) should cover bases, refugees, diplomacy and negotiations.", "(c) weighs the Frontline States against other factors."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the list of the Frontline States and their leaders.", template: "Tanzania was led by {{blank:a}}. Zambia was led by {{blank:b}}. Botswana was led by {{blank:c}}. Mozambique, independent in 1975, was led by {{blank:d}}. Angola was led by {{blank:e}}.", blanks: [
        { id: "a", accepted: ["Julius Nyerere"], choices: ["Julius Nyerere", "Hastings Banda", "Jomo Kenyatta", "Milton Obote"] },
        { id: "b", accepted: ["Kenneth Kaunda"], choices: ["Kenneth Kaunda", "Kwame Nkrumah", "Ian Smith", "Sam Nujoma"] },
        { id: "c", accepted: ["Seretse Khama"], choices: ["Seretse Khama", "Seewoosagur Ramgoolam", "Leabua Jonathan", "King Sobhuza II"] },
        { id: "d", accepted: ["Samora Machel"], choices: ["Samora Machel", "Eduardo Mondlane", "Joaquim Chissano", "Afonso Dhlakama"] },
        { id: "e", accepted: ["Agostinho Neto"], choices: ["Agostinho Neto", "Jonas Savimbi", "Holden Roberto", "Mobutu Sese Seko"] },
      ], explanation: "Nyerere (Tanzania), Kaunda (Zambia), Khama (Botswana), Machel (Mozambique), Neto (Angola)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the role of the Frontline States in the liberation of Zimbabwe.", points: [
        ["Bases and training: Tanzania (camps, OAU Liberation Committee in Dar es Salaam); Zambia (ZAPU headquarters, ZIPRA camps).", 2],
        ["Mozambique after 1975: ZANLA rear bases along the eastern border, spreading the war.", 2],
        ["Botswana: refugees and transit for recruits; Angola: some ZIPRA training.", 2],
        ["Sanctions and border closures: Zambia's border closed from 1973; Mozambique closed its border in March 1976.", 2],
        ["Diplomacy: détente and Victoria Falls 1975; Patriotic Front 1976; Geneva; rejected the internal settlement.", 2],
        ["Negotiations: Lusaka CHOGM 1979; pressure on the Patriotic Front at Lancaster House.", 2],
      ], modelAnswer: "The Frontline States gave the liberation movements places to organise and train. Tanzania hosted training camps and the OAU Liberation Committee in Dar es Salaam. Zambia hosted ZAPU's headquarters in Lusaka and ZIPRA camps. After Mozambique became independent in 1975, FRELIMO allowed ZANLA to set up rear bases along the long eastern border, which spread the war across much of Rhodesia. Botswana took in refugees and recruits, many of whom passed on to Zambia, and Angola hosted some ZIPRA training.\n\nThey also applied economic pressure. Zambia's border with Rhodesia was closed from 1973, and in March 1976 Mozambique closed its border and applied sanctions, cutting Rhodesia's routes to Beira and Maputo.\n\nDiplomatically, Frontline leaders took part in the détente exercise and the Victoria Falls conference of 1975, encouraged ZANU and ZAPU to form the Patriotic Front in 1976 and backed it at Geneva, and refused to accept the internal settlement of 1978. At the Commonwealth meeting in Lusaka in 1979 they helped persuade Britain to call a conference, and at Lancaster House Machel and Kaunda urged the Patriotic Front to accept the agreement.", explanation: "Six developed roles." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far did the Frontline States pay a high price for supporting Zimbabwe's liberation?", points: [
        ["High price: Rhodesian raids on Nyadzonia (1976), Chimoio (1977) and Freedom Camp (1978); bombing of infrastructure.", 2],
        ["High price: economic losses (Zambia's trade routes, Mozambique's transit revenue); refugees; RENAMO destabilisation.", 2],
        ["Less: costs varied (Tanzania far from fighting); gains in regional security and later co-operation (SADCC 1980).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The Frontline States, especially Mozambique and Zambia, paid a very high price. Rhodesian forces raided camps at Nyadzonia in August 1976 and Chimoio in November 1977 in Mozambique and Freedom Camp in Zambia in October 1978, killing large numbers of refugees and recruits, and bombed bridges and railways. Zambia lost its cheapest trade routes and had to rely on costly alternatives such as TAZARA, while Mozambique lost transit revenue and migrant earnings. Both had to care for tens of thousands of refugees, and Rhodesia backed the RENAMO rebels in Mozambique.\n\nThe burden was not equal. Tanzania was far from the fighting and suffered much less, and Botswana fewer raids. The states also gained: a free Zimbabwe joined them in SADCC in 1980, strengthening the region against apartheid South Africa.\n\nOverall the price was very high for Mozambique and Zambia and lower for the others, but all saw it as a necessary cost of ending minority rule.", explanation: "Both sides and a judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the Frontline States.",
  });

  // 4. OAU/AU (topic 13.3)
  b.struct({
    ...common(Z, "Paper 2"),
    concepts: ["hist.cooperation.oau-au"],
    stem: "**The OAU and the African Union.** Answer all parts.",
    hints: ["(b) needs organs and their functions.", "(c) needs successes and failures and a judgement."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** aims of the Organisation of African Unity.", points: [
        "Promote unity and solidarity of African states.",
        "Co-ordinate co-operation to achieve a better life for Africans.",
        "Defend sovereignty, territorial integrity and independence.",
        "Eradicate colonialism.",
        "Promote international co-operation (UN Charter, UDHR).",
      ], explanation: "One mark per aim." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the origins of the OAU and the functions of its main organs.", points: [
        ["Origins: independence of many states; Casablanca group (rapid union) and Monrovia group (loose co-operation).", 2],
        ["Origins: Addis Ababa conference hosted by Haile Selassie; Charter signed by 32 states on 25 May 1963.", 2],
        ["Assembly of Heads of State and Government: supreme organ, met yearly, set policy.", 2],
        ["Council of Ministers: foreign ministers prepared the Assembly's work and carried out decisions.", 2],
        ["General Secretariat: administration in Addis Ababa under the Secretary-General.", 2],
        ["Commission of Mediation, Conciliation and Arbitration (disputes) / Liberation Committee in Dar es Salaam (support for liberation movements).", 2],
      ], modelAnswer: "By the early 1960s most African states were independent, but they disagreed about unity. The Casablanca group, including Nkrumah's Ghana, wanted rapid political union, while the larger Monrovia group wanted looser co-operation that respected sovereignty. Emperor Haile Selassie hosted a conference at Addis Ababa, and on 25 May 1963 the leaders of 32 states signed the Charter of the OAU, a compromise based on co-operation between sovereign states.\n\nThe Assembly of Heads of State and Government was the supreme organ; it met once a year to decide policy. The Council of Ministers, made up of foreign ministers, prepared the Assembly's work and carried out its decisions. The General Secretariat in Addis Ababa, led by the Secretary-General, ran the organisation day to day. The Commission of Mediation, Conciliation and Arbitration was meant to settle disputes between members peacefully, and the Liberation Committee in Dar es Salaam channelled money and supplies to liberation movements in southern Africa.", explanation: "Origins and organs, each developed." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was the OAU a success?", points: [
        ["Success: liberation of southern Africa (Liberation Committee; Zimbabwe 1980, Namibia 1990, end of apartheid 1994).", 2],
        ["Success: united African voice; acceptance of colonial borders; African Charter on Human and Peoples' Rights.", 2],
        ["Failure: non-interference (Biafra, Amin, Rwanda 1994); no army; lack of money; divisions (Morocco left 1984).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The OAU had important successes. Its Liberation Committee and diplomatic pressure helped bring independence to Zimbabwe in 1980 and Namibia in 1990 and contributed to the end of apartheid. It gave Africa a united voice in the UN, its acceptance of colonial borders in 1964 prevented many border wars, and it created the African Charter on Human and Peoples' Rights.\n\nBut its failures were serious. Its principle of non-interference meant it did little during the Nigerian civil war, Amin's rule in Uganda or the genocide in Rwanda. It had no army, many members did not pay their contributions, and it was divided, for example over Western Sahara, which led Morocco to leave in 1984.\n\nOverall the OAU was successful in its central aim of ending colonial and minority rule, but it failed to protect Africans from conflicts and abuses inside their own states, which is why it was replaced by the African Union in 2002.", explanation: "Both sides with judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the OAU and AU.",
  });

  // 5. United Nations (topic 13.5)
  b.struct({
    ...common(Z, "Paper 2"), d: 4,
    concepts: ["hist.cooperation.united-nations"],
    stem: "**The United Nations.** Answer all parts.",
    hints: ["(b) should give membership and functions for each organ.", "(c) needs successes and failures with examples."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the United Nations.", template: "The UN Charter was signed at {{blank:a}} in June 1945. The UN came into existence on {{blank:b}}. The Security Council has {{blank:c}} permanent members. The International Court of Justice sits at {{blank:d}}. The Universal Declaration of Human Rights was adopted in {{blank:e}}.", blanks: [
        { id: "a", accepted: ["San Francisco"], choices: ["San Francisco", "Geneva", "Yalta", "Paris"] },
        { id: "b", accepted: ["24 October 1945"], choices: ["24 October 1945", "26 June 1945", "8 May 1945", "10 December 1948"] },
        { id: "c", accepted: ["five"], choices: ["five", "three", "ten", "fifteen"] },
        { id: "d", accepted: ["The Hague"], choices: ["The Hague", "New York", "Geneva", "Vienna"] },
        { id: "e", accepted: ["1948"], choices: ["1948", "1945", "1966", "1989"] },
      ], explanation: "San Francisco; 24 October 1945; five permanent members; The Hague; 1948." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the structure and functions of the main organs of the United Nations.", points: [
        ["General Assembly: all members, one vote each; debates, recommends, approves budget, elects non-permanent Council members.", 2],
        ["Security Council: 15 members, 5 permanent with veto; main responsibility for peace; sanctions, force, peacekeeping.", 2],
        ["Secretariat: led by the Secretary-General; runs the UN; can raise threats to peace.", 2],
        ["International Court of Justice: 15 judges at The Hague; settles legal disputes between states; advisory opinions.", 2],
        ["Economic and Social Council: co-ordinates economic and social work and the specialised agencies.", 2],
        ["Trusteeship Council (trust territories, suspended 1994) / specialised agencies such as WHO, UNICEF, FAO, UNESCO.", 2],
      ], modelAnswer: "The General Assembly includes every member state, each with one vote. It discusses any world issue, makes recommendations, approves the budget and elects the non-permanent members of the Security Council.\n\nThe Security Council has fifteen members: five permanent members, the USA, Britain, France, Russia and China, each with a veto, and ten members elected for two years. It has the main responsibility for peace and security and can order sanctions, authorise force and set up peacekeeping missions.\n\nThe Secretariat, led by the Secretary-General, runs the UN day to day, and the Secretary-General can bring threats to peace to the Council's attention. The International Court of Justice, fifteen judges at The Hague, settles legal disputes between states and gives advisory opinions. The Economic and Social Council co-ordinates economic and social work and the specialised agencies, such as the WHO, UNICEF, FAO and UNESCO. The Trusteeship Council supervised trust territories until the last became independent, and suspended its work in 1994.", explanation: "Six organs or groups, each with functions." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far has the United Nations been effective in maintaining international peace?", points: [
        ["Effective: Korea (1950-53), Suez/UNEF (1956), Congo (1960-64), Namibia (1989-90); no third world war.", 2],
        ["Effective: sanctions on Rhodesia (1966, 1968) and arms embargo on South Africa (1977).", 2],
        ["Not effective: veto paralysis in the Cold War; Rwanda 1994; Srebrenica 1995; dependence on members for troops and money.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The UN has had real successes in keeping peace. It resisted North Korea's invasion of the South in 1950, its first armed peacekeepers supervised the withdrawal of foreign forces from Suez in 1956, it helped end the Katanga secession in the Congo, and it oversaw Namibia's elections and independence in 1989-1990. It imposed sanctions on Rhodesia and an arms embargo on South Africa, and there has been no third world war.\n\nHowever, the veto often paralysed the Security Council during the Cold War, when the great powers protected themselves and their allies. The UN depends on members for troops and money, and its forces failed to prevent the genocide in Rwanda in 1994 and the massacre at Srebrenica in 1995.\n\nOverall the UN has been effective when the great powers agreed and less so when they did not, so it has been only partly effective in maintaining peace.", explanation: "Both sides with judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on the United Nations.",
  });

  // 6. Zimbabwe and the international community (topic 13.6)
  b.struct({
    ...common(Z, "Paper 2"),
    concepts: ["hist.independence.foreign-policy"],
    stem: "**Zimbabwe and the international community since 1980.** Answer all parts.",
    hints: ["(b) needs Mozambique, UN missions and the DRC.", "(c) needs the different views on Western measures."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** principles of Zimbabwe's foreign policy.", points: [
        "Sovereignty and non-interference.",
        "Non-alignment.",
        "Pan-Africanism / African solidarity.",
        "Support for liberation movements (against apartheid, for Namibia).",
        "Peaceful co-existence / peaceful settlement of disputes / multilateralism / economic development.",
      ], explanation: "One mark per principle." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe Zimbabwe's peacekeeping and peacemaking activities since independence.", points: [
        ["Mozambique: troops deployed from 1982 to protect the Beira corridor (railway, road, pipeline).", 2],
        ["Mozambique: fought RENAMO, backed by South Africa; withdrew after the Rome accords of 1992.", 2],
        ["UN missions: soldiers, police and observers, e.g. Angola and Somalia in the 1990s.", 2],
        ["DRC: August 1998 with Angola and Namibia, to support Laurent Kabila's government against rebels backed by Rwanda and Uganda.", 2],
        ["DRC: presented as a SADC operation; Lusaka Ceasefire 1999; withdrawal 2002.", 2],
        ["Diplomacy: NAM chairmanship from 1986 (AFRICA Fund); support for Namibian independence and against apartheid.", 2],
      ], modelAnswer: "From 1982 Zimbabwe deployed thousands of troops in Mozambique to protect the Beira corridor, the railway, road and oil pipeline linking Zimbabwe to the sea, against RENAMO rebels backed by South Africa. The corridor gave Zimbabwe a route that avoided South Africa. The troops withdrew after the Rome peace accords of 1992 ended Mozambique's civil war.\n\nZimbabwe has also contributed soldiers, police and military observers to United Nations missions, for example in Angola and Somalia in the 1990s.\n\nIn August 1998 Zimbabwe, Angola and Namibia sent troops to the Democratic Republic of the Congo to support the government of Laurent Kabila against rebels backed by Rwanda and Uganda. Zimbabwe presented the operation as a SADC action to defend a member's sovereignty. The Lusaka Ceasefire Agreement was signed in 1999, and Zimbabwe withdrew its troops in 2002.\n\nZimbabwe also worked for peace through diplomacy: as chairman of the Non-Aligned Movement from 1986 it promoted the AFRICA Fund to help the Frontline States, and it supported Namibia's independence and the struggle against apartheid.", explanation: "Six developed points." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far were the measures taken by the European Union and the United States after 2000 responsible for Zimbabwe's economic difficulties?", points: [
        ["Measures: EU travel ban, asset freeze, arms embargo, suspension of development co-operation (2002); US ZDERA (2001) blocked new international loans.", 2],
        ["Government view: illegal sanctions punishing land reform; loss of credit and investment hurt ordinary people.", 2],
        ["Other causes: fall in farm output, budget deficits, inflation, DRC costs; Western view that measures were targeted.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The measures had some economic effect. In 2001 the US ZDERA law directed US representatives at international lenders to oppose new loans, and in 2002 the EU imposed a travel ban and asset freeze on named individuals, an arms embargo and a suspension of most development co-operation. The government argued that these were illegal sanctions imposed to punish land reform, and that the loss of credit and investment deepened the crisis and hurt ordinary people.\n\nHowever, the EU and US argued that the measures were targeted at individuals because of concerns about human rights and elections, and humanitarian aid continued. Many economists also point to domestic causes: the fall in farm output, budget deficits and printing money, which drove inflation, and the costs of the DRC intervention.\n\nOverall the measures, and especially the loss of foreign credit, made the crisis harder to escape, but most evidence suggests they were one cause among several rather than the main cause.", explanation: "Different views and a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on Zimbabwe's foreign policy.",
  });

  // 7. China (topic 14.2)
  b.struct({
    ...common(Z, "Paper 2"),
    concepts: ["hist.china.revolution", "hist.china.mao"],
    stem: "**The Chinese Revolution and China under Mao.** Answer all parts.",
    hints: ["(b) should be organised by factors, not as a story.", "(c) weighs achievements against human costs."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about China.", template: "The Chinese Communist Party was founded in {{blank:a}}. The Long March began in {{blank:b}}. The People's Republic of China was proclaimed on {{blank:c}}. The First Five-Year Plan began in {{blank:d}}. The Cultural Revolution began in {{blank:e}}.", blanks: [
        { id: "a", accepted: ["1921"], choices: ["1921", "1911", "1927", "1949"] },
        { id: "b", accepted: ["1934"], choices: ["1934", "1931", "1937", "1946"] },
        { id: "c", accepted: ["1 October 1949"], choices: ["1 October 1949", "10 October 1911", "1 January 1950", "9 September 1976"] },
        { id: "d", accepted: ["1953"], choices: ["1953", "1950", "1958", "1966"] },
        { id: "e", accepted: ["1966"], choices: ["1966", "1958", "1957", "1972"] },
      ], explanation: "CCP 1921; Long March from October 1934; People's Republic 1 October 1949; First Five-Year Plan 1953; Cultural Revolution 1966." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain why the Communists won the struggle for power in China by 1949.", points: [
        ["Peasant support won by land reform and rent reduction.", 2],
        ["Discipline and good behaviour of the Red Army/PLA; guerrilla strategy and Mao's leadership.", 2],
        ["Resistance to Japan made the Communists patriotic; they expanded behind Japanese lines.", 2],
        ["Guomindang corruption and hyperinflation lost middle-class support.", 2],
        ["Guomindang reliance on landlords, brutal conscription, losses against Japan.", 2],
        ["Civil war: PLA victories in Manchuria and central China 1948-49; captured Japanese weapons; US aid could not save the Guomindang.", 2],
      ], modelAnswer: "The Communists won mainly because they gained the support of the peasants, the vast majority of the population. In the areas they controlled they redistributed landlords' land or cut rents and interest, which met the peasants' greatest need. Their soldiers followed strict rules of discipline, paying for food and treating peasants with respect, and Mao's strategy of guerrilla war based in the countryside used this support well.\n\nThe war with Japan helped them. The Communists fought a guerrilla war behind Japanese lines, expanded their territory and gained a reputation as patriotic defenders of China.\n\nThe Guomindang, by contrast, was weakened. Corruption was widespread, and hyperinflation in the late 1940s destroyed the savings of the middle classes. It relied on landlords and never carried out land reform, its conscription was brutal, and it lost many of its best troops fighting Japan.\n\nIn the civil war the People's Liberation Army won great victories in Manchuria and central China in 1948-1949, helped by Japanese weapons captured in 1945, and US aid could not save the Nationalists, who withdrew to Taiwan.", explanation: "Six developed reasons." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent did the Communists solve China's problems under Mao Zedong between 1949 and 1976?", points: [
        ["Solved: land reform ended landlord power; First Five-Year Plan built heavy industry; unity and international recognition.", 2],
        ["Solved: Marriage Law, literacy, barefoot doctors, rising life expectancy.", 2],
        ["Not solved / new problems: Great Leap famine (estimates 15-45 million deaths); Cultural Revolution chaos; repression (Anti-Rightist Campaign).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The Communists dealt with some of China's problems. Land reform ended the power of the landlords and gave land to millions of peasants. The First Five-Year Plan built heavy industry with Soviet help, inflation was brought under control, and China became united, independent and internationally recognised, taking the UN seat in 1971. The Marriage Law improved women's legal position, literacy rose and barefoot doctors helped raise life expectancy.\n\nBut Mao's policies also created terrible new problems. The Great Leap Forward caused a famine in which historians estimate that between about 15 and 45 million people died. The Anti-Rightist Campaign and the Cultural Revolution crushed free expression, persecuted millions and closed schools and universities for years.\n\nOverall the Communists solved some long-standing problems, especially landlord power and national weakness, but at a very high human cost, and some of their own policies caused disasters greater than the problems they set out to solve.", explanation: "Both sides with judgement." }),
    ]),
    explanation: "ZIMSEC Paper 2 style structured question on China.",
  });

  // 8. The Constitution (topic 15.1)
  b.struct({
    ...common(Z, "Paper 1"), d: 4,
    concepts: ["hist.constitution.zimbabwe"],
    stem: "**The Constitution of Zimbabwe.** Answer all parts.",
    hints: ["(b) needs two or three functions for each arm.", "(c) weighs the text against practice."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** functions of a constitution.", points: [
        "Acts as the supreme law.",
        "Sets up the organs of state and their powers.",
        "Limits government / separation of powers.",
        "Protects rights and freedoms.",
        "Defines citizenship / sets national symbols and values / explains how it may be amended.",
      ], explanation: "One mark per function." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the functions of the executive, the legislature and the judiciary under the Constitution of Zimbabwe.", points: [
        ["Executive: President (head of state and government, commander-in-chief), elected for five years, two-term limit.", 2],
        ["Executive: Vice-Presidents and Cabinet carry out laws, run ministries, conduct foreign relations, propose the budget.", 2],
        ["Legislature: Parliament of two houses (Senate and National Assembly) makes laws.", 2],
        ["Legislature: approves taxes and the budget; oversees the executive through questions and committees; represents the people.", 2],
        ["Judiciary: courts headed by the Chief Justice interpret laws and settle disputes.", 2],
        ["Judiciary: Constitutional Court rules on constitutional matters and can strike down laws; protects rights.", 2],
      ], modelAnswer: "The executive is headed by the President, who is head of state and government and commander-in-chief of the Defence Forces. The President is elected for a five-year term and may serve at most two terms. With the Vice-Presidents and Cabinet, the President carries out laws and policies, runs government ministries, conducts foreign relations and proposes laws and the budget.\n\nThe legislature is Parliament, made up of the Senate and the National Assembly. It makes laws, approves taxes and the budget, and oversees the executive by questioning ministers and examining policies in committees. Its members represent the people who elected them.\n\nThe judiciary, headed by the Chief Justice, consists of the courts. They interpret the law and settle disputes between people and between people and the state. The Constitutional Court is the highest court on constitutional matters and can declare laws and actions invalid if they conflict with the Constitution, which makes the judiciary the main protector of rights.", explanation: "Two developed functions for each arm." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent does the 2013 Constitution protect citizens against the abuse of power?", points: [
        ["Protects: separation of powers; Constitutional Court; term limits.", 2],
        ["Protects: Declaration of Rights (Chapter 4), independent commissions, devolution; rights changes need a referendum.", 2],
        ["Limits: rights may be limited by law; delays aligning laws; amendments since 2017 on judicial appointments; slow devolution.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The 2013 Constitution contains strong protections. Power is separated between the executive, legislature and judiciary, and the Constitutional Court can strike down laws and actions that break the Constitution. The President may serve only two terms. Chapter 4, the Declaration of Rights, protects a wide range of rights, and changing it requires a referendum. Independent commissions, such as the Human Rights Commission, and devolution to provincial councils add further checks.\n\nHowever, protection depends on practice. The Constitution allows rights to be limited by law in some circumstances. Some laws took years to be brought into line with it, devolution has been slow, and critics argue that amendments since 2017 on how senior judges are appointed reduced judicial independence.\n\nOverall the Constitution provides a strong framework against abuse of power, but how far it protects citizens depends on how fully its provisions are applied.", explanation: "Both sides with judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the Constitution.",
  });

  // 9. Democracy and human rights (topics 15.2-15.3)
  b.struct({
    ...common(Z, "Paper 1"),
    concepts: ["hist.constitution.democracy", "hist.constitution.human-rights"],
    stem: "**Democracy and human rights in Zimbabwe.** Answer all parts.",
    hints: ["(b) links each measure to a democratic principle.", "(c) weighs efforts against limits."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** principles of democracy.", points: [
        "Popular participation.",
        "Free and fair elections.",
        "Rule of law.",
        "Separation of powers.",
        "Accountability / freedom of expression / majority rule with minority rights / human rights.",
      ], explanation: "One mark per principle." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain how the government of Zimbabwe has promoted democracy since 1980.", points: [
        ["Universal adult suffrage from 1980 and regular elections: participation.", 2],
        ["Multi-party system; opposition contests elections and wins seats and councils.", 2],
        ["Referendums (2000, 2013); acceptance of the 2000 result.", 2],
        ["Independent commissions: ZEC (2004), Human Rights, Gender and Media Commissions: free and fair elections, accountability.", 2],
        ["Devolution and local councils; women's reserved seats: participation and representation.", 2],
        ["2013 Constitution: Declaration of Rights and presidential term limits: rights and limits on power.", 2],
      ], modelAnswer: "Since independence the government has introduced universal adult suffrage, so every citizen of 18 and over may vote, and has held regular national and local elections, allowing people to participate in choosing their leaders. A multi-party system has allowed opposition parties to contest elections and win seats in Parliament and control of many urban councils.\n\nReferendums have given citizens a direct say: in February 2000 the government accepted the rejection of its draft constitution, and in 2013 voters approved a new Constitution. The Zimbabwe Electoral Commission, set up in 2004, and the commissions created by the 2013 Constitution, such as the Human Rights, Gender and Media Commissions, are meant to make elections free and fair and to hold the state accountable.\n\nPower has been brought closer to the people through elected rural and urban councils and, under the 2013 Constitution, provincial councils, and seats reserved for women have increased their representation. The 2013 Constitution also added a Declaration of Rights and a two-term limit for the President, which protect freedoms and limit power.", explanation: "Six measures, each linked to a principle." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far has the government succeeded in promoting human and children's rights in Zimbabwe?", points: [
        ["Success: Declaration of Rights; Zimbabwe Human Rights Commission; ratification of the CRC (1990).", 2],
        ["Success: expansion of education and health care after 1980; 2016 ruling against child marriage; Domestic Violence Act (2007).", 2],
        ["Limits: economic difficulties limit free education and health; child marriage and child labour persist; reported violations of civil and political rights.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The government has done a good deal to promote rights. The 2013 Constitution contains a strong Declaration of Rights with sections for children, women, the elderly and persons with disabilities, and the Zimbabwe Human Rights Commission investigates complaints. Zimbabwe ratified the Convention on the Rights of the Child in 1990. Education and health care expanded rapidly after 1980, the Domestic Violence Act was passed in 2007, and in 2016 the Constitutional Court ruled that no one may marry before 18.\n\nHowever, there are clear limits. Economic difficulties have made free education and health care hard to provide for all. Child marriage, child labour and gaps in birth registration persist in some areas, and human rights groups have reported violations of civil and political rights at times, especially around elections.\n\nOverall the government has created a strong legal framework and made real progress in education and health, but rights are not yet fully enjoyed in practice, so it has been only partly successful.", explanation: "Both sides with judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on democracy and human rights.",
  });

  // 10. Source-based question: the Constitution and rights (Paper 1, topic 15)
  b.struct({
    ...common(ZS, "Paper 1"),
    concepts: ["hist.constitution.zimbabwe", "hist.constitution.human-rights"],
    stem: `**Source-based question: the 2013 Constitution and rights.** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "an editorial in a fictional independent weekly newspaper published in Harare, March 2013, a week before the referendum", "This draft is not perfect, but it is far better than what we have. It limits a president to two terms, creates a Constitutional Court and lists rights that no government can simply ignore: to education, to health care, to a fair trial, to protest peacefully. For the first time, children have their own section. We urge readers to vote Yes."),
      source("Source B", "a statement by a fictional rural women's association, Masvingo province, 2015", "The Constitution says women are equal and children must not be married. In our villages, girls of fifteen are still taken as wives and widows still lose their land to their husbands' relatives. A right on paper is a seed; it will not grow unless someone waters it."),
      source("Source C", "a cartoon of the kind published in a Zimbabwean newspaper in 2017, described in words", "A large book labelled \"Constitution 2013\" sits on a high shelf in a government office. A small man labelled \"Citizen\" stands on tiptoe, unable to reach it. Below, an official with a pen is busily writing \"Amendment No. 1\" on a sheet of paper.", { described: true }),
    ])}`,
    hints: ["(b) asks what the sources suggest, not just what they say.", "(c) needs provenance, content and your own knowledge for both sides."],
    parts: checkExam(ZS, [
      P.fib({ label: "(a)", stem: "Complete the statements using Source A.", template: "Source A says the draft limits a president to {{blank:a}} terms. It creates a {{blank:b}} Court. It protects the right to protest {{blank:c}}. For the first time, {{blank:d}} have their own section. The newspaper urges readers to vote {{blank:e}}.", blanks: [
        { id: "a", accepted: ["two"], choices: ["two", "one", "three", "unlimited"] },
        { id: "b", accepted: ["Constitutional"], choices: ["Constitutional", "Supreme", "Labour", "Customary"] },
        { id: "c", accepted: ["peacefully"], choices: ["peacefully", "at night", "with weapons", "only with permission"] },
        { id: "d", accepted: ["children"], choices: ["children", "chiefs", "farmers", "soldiers"] },
        { id: "e", accepted: ["Yes"], choices: ["Yes", "No", "for change", "for the opposition"] },
      ], explanation: "Source A: two terms; a Constitutional Court; the right to protest peacefully; a section for children; vote Yes." }),
      P.manual({ label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", stem: "What do Sources B and C suggest about the gap between the Constitution and everyday life? Use details from both sources.", points: [
        ["B: rights exist on paper but are not enforced in villages (inference).", 2],
        ["B detail: child marriage and widows losing land despite the Constitution.", 2],
        ["C: ordinary citizens find the Constitution out of reach; government changes it (inference).", 2],
        ["C detail: the book on a high shelf; official writing \"Amendment No. 1\".", 2],
      ], modelAnswer: "Source B suggests that rights in the Constitution are not enforced in rural areas: the women say girls of fifteen are still married and widows still lose their land, even though the Constitution says women are equal and children must not be married. Their image of a right as a seed that needs watering suggests that rights need action to become real.\n\nSource C suggests that the Constitution is out of reach for ordinary citizens, shown by the small citizen unable to reach the book on a high shelf, and that the government was already changing it, shown by the official writing \"Amendment No. 1\". Both sources suggest a gap between the text and people's experience.", explanation: "Inference supported by detail from each source." }),
      P.manual({ label: "(c)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The 2013 Constitution improved the protection of rights in Zimbabwe.\" How far do Sources A to C support this view? Use the sources and your own knowledge.", points: [
        ["Support (A): term limits, Constitutional Court, wide rights, children's section; own knowledge confirms the Declaration of Rights (Chapter 4) and ZHRC.", 2],
        ["Support (own knowledge): 2016 Constitutional Court ruling against child marriage used the Constitution.", 2],
        ["Challenge (B): child marriage and widows' land rights still violated in 2015.", 2],
        ["Challenge (C): access and amendments; own knowledge: Amendment No. 1 (2017) on judicial appointments; slow alignment of laws.", 2],
        ["Provenance: A written before the vote to persuade (\"vote Yes\"); B a campaigning group close to the problem; C a cartoonist's opinion.", 2],
        ["Supported judgement using all sources.", 2],
      ], levels: levels(12), modelAnswer: "Source A supports the view. It shows that the Constitution limits the president to two terms, creates a Constitutional Court and protects rights to education, health care, a fair trial and peaceful protest, with a special section for children. My own knowledge confirms this: Chapter 4, the Declaration of Rights, is wide-ranging, and the Constitution set up the Zimbabwe Human Rights Commission. The Constitution has been used to protect rights: in 2016 the Constitutional Court ruled that no one may marry before 18.\n\nHowever, Sources B and C challenge the view. Source B shows that in 2015 girls were still being married and widows still lost land, so the new rights were not protecting everyone. Source C suggests that ordinary citizens could not reach the Constitution and that the government was already amending it; Amendment No. 1 of 2017 did change how some senior judges are appointed, and many laws took years to be aligned with the Constitution.\n\nThe provenance matters. Source A was written before the referendum to persuade readers to vote Yes, so it describes the text at its best and says nothing about how it would be enforced. Source B comes from a group working in the villages, which gives it first-hand knowledge, though as a campaigning group it stresses problems. Source C is a cartoonist's opinion and exaggerates to make its point.\n\nOverall the sources show that the 2013 Constitution improved the protection of rights on paper and gave citizens and courts new tools, but B and C, supported by my own knowledge, show that protection in practice remained incomplete. So the sources support the view only partly.", explanation: "Use all three sources, provenance and own knowledge for a judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style source-based question on the Constitution and rights.",
  });
});
