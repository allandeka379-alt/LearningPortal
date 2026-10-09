// Slice W1b: ZIMSEC Paper 1 exam-format items (9 structured questions, 1 source-based question), 25 marks each.
import { concept, P, source, sources, levels, EXAM, checkExam } from "../lib.mjs";

const Z = EXAM.ZIM_STRUCTURED;
const ZS = EXAM.ZIM_SOURCE;
const common = (plan) => ({ d: 5, skill: plan.skill, applies: plan.applies, secs: plan.secs, examStyle: true, paper: "Paper 1" });

concept("hist.colonisation.anglo-ndebele-war", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec" }, (b) => {
  // 1. Anglo-Ndebele War (topic 7.3)
  b.struct({
    ...common(Z), d: 4,
    concepts: ["hist.colonisation.anglo-ndebele-war"],
    stem: "**The Anglo-Ndebele War, 1893-1894.** Answer all parts.",
    hints: ["(b) needs reasons that are explained, not just listed.", "(c) needs the role of weapons and other factors, then a judgement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about the Anglo-Ndebele War.", template: "The war was triggered by the {{blank:a}} incident of July 1893. Jameson promised volunteers land, gold claims and cattle in the {{blank:b}} Agreement. The Ndebele suffered heavy losses at the battles of Shangani and {{blank:c}}. Lobengula fled north after ordering the burning of {{blank:d}}. Major Allan Wilson's patrol was wiped out near the {{blank:e}} River.", blanks: [
        { id: "a", accepted: ["Victoria"], choices: ["Victoria", "Jameson", "Rudd", "Moffat"] },
        { id: "b", accepted: ["Victoria"], choices: ["Victoria", "Lancaster House", "Grobler", "Unity"] },
        { id: "c", accepted: ["Bembesi"], choices: ["Bembesi", "Chinhoyi", "Mazowe", "Hwange"] },
        { id: "d", accepted: ["Bulawayo"], choices: ["Bulawayo", "Fort Salisbury", "Fort Victoria", "Gwelo"] },
        { id: "e", accepted: ["Shangani"], choices: ["Shangani", "Limpopo", "Zambezi", "Save"] },
      ], explanation: "Victoria incident (July 1893); Victoria Agreement (August 1893); Shangani and Bembesi; Bulawayo burnt; the Shangani Patrol (4 December 1893)." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain why the British South Africa Company went to war with the Ndebele in 1893.", points: [
        ["Gold in Mashonaland was disappointing, the Company's shares fell, and it hoped for richer gold in Matabeleland.", 2],
        ["Settlers wanted Ndebele land for farms (the Victoria Agreement promised farms).", 2],
        ["Settlers and the Company wanted Ndebele cattle (a share of captured cattle promised).", 2],
        ["Ndebele raids on Shona communities disrupted the labour supply on farms and mines.", 2],
        ["Dispute over authority: Lobengula claimed tribute from Shona communities the Company said were under its rule; no agreed border.", 2],
        ["The Victoria incident (July 1893) gave Jameson an excuse; he persuaded the High Commissioner and Rhodes and planned the invasion.", 2],
      ], modelAnswer: "The Company went to war mainly for economic reasons. It had promised its shareholders a second Rand, but the gold of Mashonaland was small and costly to mine, so its shares lost value. Many believed that richer gold lay in Matabeleland, so conquering the Ndebele seemed a way to rescue the Company.\n\nSettlers also wanted Ndebele land and cattle. In the Victoria Agreement of August 1893 Jameson promised every volunteer a farm, gold claims and a share of captured cattle, which shows how important these were.\n\nThe Ndebele state was also seen as an obstacle to settler control. Its regiments raided Shona communities that refused tribute, and these raids frightened workers away from farms and mines. Lobengula regarded many Shona as under his authority while the Company regarded Mashonaland as its own, and there was no agreed border.\n\nFinally, the Victoria incident of July 1893, when an Ndebele force entered the Fort Victoria district and Company troopers fired on it, gave Jameson the excuse he needed. He persuaded the High Commissioner and Rhodes that war was necessary and prepared the columns that invaded in October 1893.", explanation: "Six developed reasons, two marks each." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far was the Maxim gun responsible for the defeat of the Ndebele in 1893?", points: [
        ["Maxim gun: machine-gun fire from laagers cut down regiments at Shangani and Bembesi.", 2],
        ["Other factor: Ndebele tactics of frontal attack on defended positions in open country.", 2],
        ["Other factor: divisions in the kingdom over war; Lobengula's flight; horses and mobility of the invaders.", 2],
        ["Supported judgement on relative importance.", 2],
      ], levels: levels(8), modelAnswer: "The Maxim gun was very important. At the Shangani and at Bembesi the Ndebele regiments charged the wagon laagers, and machine-gun and rifle fire killed very large numbers before they could close. These two battles broke Ndebele resistance.\n\nHowever, other factors made the guns so effective. The Ndebele attacked defended positions across open ground, the tactic most exposed to machine-gun fire. The kingdom was divided over whether to fight, and Lobengula, who had tried diplomacy to the end, burnt Bulawayo and fled north. The invaders also had horses and wagons, which gave them mobility and secure camps.\n\nOverall the Maxim gun was the most important single factor in the battles, but it decided the war because of the tactics used against it and the divisions in the kingdom.", explanation: "Both sides and a supported judgement for level 4." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the Anglo-Ndebele War.",
  });

  // 2. First Chimurenga (topic 7.4)
  b.struct({
    ...common(Z),
    concepts: ["hist.colonisation.first-chimurenga"],
    stem: "**The First Chimurenga/Umvukela, 1896-1897.** Answer all parts.",
    hints: ["(b) should cover both Matabeleland and Mashonaland in order.", "(c) should weigh the mediums against grievances, disasters and opportunity."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "Name **five** leaders, religious or political, of the risings of 1896-1897.", points: [
        "First correct leader (e.g. Mkwati).",
        "Second correct leader (e.g. Kaguvi / Gumboreshumba).",
        "Third correct leader (e.g. Nehanda / Charwe Nyakasikana).",
        "Fourth correct leader (e.g. Mashayamombe).",
        "Fifth correct leader (e.g. Makoni / Nyamanda / Ndebele indunas).",
      ], explanation: "One mark per correct leader." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the course of the risings in Matabeleland and Mashonaland.", points: [
        ["Matabeleland rose in late March 1896; settlers on outlying farms and mines were killed.", 2],
        ["Settlers gathered in laagers at Bulawayo, Gwelo and elsewhere; Bulawayo was besieged but not taken.", 2],
        ["Reinforcements relieved Bulawayo and drove the Ndebele into the Matopo hills.", 2],
        ["Rhodes's indabas in the Matopos (August-October 1896) ended most Ndebele fighting.", 2],
        ["Mashonaland rose from June 1896 under chiefs such as Mashayamombe and Makoni, encouraged by Kaguvi and Nehanda; settlers were surprised.", 2],
        ["Shona fought from hills and caves and were defeated one by one in 1897 (dynamite used); Nehanda and Kaguvi executed April 1898.", 2],
      ], modelAnswer: "The rising began in Matabeleland in late March 1896, when Ndebele fighters attacked settlers on outlying farms and mines. The survivors gathered in laagers at Bulawayo, Gwelo and other centres. Ndebele forces besieged Bulawayo but did not take it, and reinforcements from South Africa and Britain relieved the town and pushed the Ndebele back into the Matopo hills. Fighting there was costly, so from August 1896 Rhodes held indabas with Ndebele leaders, and most Ndebele fighting ended by late 1896.\n\nIn June 1896 the rising spread to Mashonaland, surprising settlers who thought the Shona would not fight. Chiefs such as Mashayamombe and Makoni led their people, encouraged by the spirit mediums Kaguvi and Nehanda. The Shona fought from fortified hills and caves. With no single leader to negotiate for them, they were overcome area by area during 1897, sometimes with dynamite. Makoni was executed and Mashayamombe killed in 1897, and Nehanda and Kaguvi were captured, tried and executed in April 1898.", explanation: "Six developed points covering both regions." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent were spirit mediums responsible for the outbreak of the risings?", points: [
        ["Mediums' role: Mkwati, Kaguvi and Nehanda encouraged and spread the call to rise, giving it authority.", 2],
        ["Other: long-term grievances (land, cattle, forced labour, hut tax, Native Police).", 2],
        ["Other: disasters of 1896 and the opportunity of the Jameson Raid; debate over coordination (Ranger vs Cobbing/Beach).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "Spirit mediums played an important part. Mkwati, linked to the Mwari shrines of the Matopos, encouraged the Ndebele, and Kaguvi and Nehanda urged Shona communities to fight, presenting the rising as the will of the ancestors. Terence Ranger argued that they linked the two risings.\n\nBut the mediums could only mobilise people who already had reasons to fight. Africans had lost land and cattle and suffered forced labour, the hut tax and the brutality of the Native Police. In 1896 rinderpest, drought and locusts struck, and the Jameson Raid had left the Company with few police. Historians such as Cobbing and Beach argue that many communities rose for local reasons rather than at the mediums' call.\n\nThe mediums were therefore important in turning anger into action and spreading it, but the grievances and the opportunity were the main causes.", explanation: "Both sides plus a supported judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the First Chimurenga/Umvukela.",
  });

  // 3. Company rule and Responsible Government (topics 8.1-8.2)
  b.struct({
    ...common(Z), d: 4,
    concepts: ["hist.colonial.company-rule", "hist.colonial.responsible-government"],
    stem: "**Company rule and Responsible Government, 1890-1953.** Answer all parts.",
    hints: ["(b) needs political, economic and social policies of the Company.", "(c) compares conditions before and after 1923."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements.", template: "Company rule ended after a referendum in {{blank:a}}. Responsible Government began on {{blank:b}}. The Land Apportionment Act was passed in {{blank:c}}. The Industrial Conciliation Act of {{blank:d}} excluded Africans from registered unions. Destocking was enforced under the Native Land Husbandry Act of {{blank:e}}.", blanks: [
        { id: "a", accepted: ["1922"], choices: ["1922", "1918", "1930", "1953"] },
        { id: "b", accepted: ["1 October 1923"], choices: ["1 October 1923", "12 September 1890", "27 October 1922", "11 November 1965"] },
        { id: "c", accepted: ["1930"], choices: ["1930", "1923", "1951", "1969"] },
        { id: "d", accepted: ["1934"], choices: ["1934", "1931", "1945", "1959"] },
        { id: "e", accepted: ["1951"], choices: ["1951", "1930", "1941", "1965"] },
      ], explanation: "Referendum 1922; Responsible Government 1 October 1923; Land Apportionment Act 1930; Industrial Conciliation Act 1934; Native Land Husbandry Act 1951." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain the political, economic and social policies of the British South Africa Company between 1890 and 1923.", points: [
        ["Political: rule by an Administrator; 1898 Legislative Council with elected settlers; Resident Commissioner.", 2],
        ["Political: Native Affairs Department and Native Commissioners controlled chiefs and collected tax.", 2],
        ["Economic: land alienation and reserves (Gwaai and Shangani, later reserves fixed 1914-15).", 2],
        ["Economic: hut tax (1894) and labour recruitment (Labour Bureau 1903, chibaro) to supply mines and farms.", 2],
        ["Economic: support for mining and, from about 1908, white settler farming; railways.", 2],
        ["Social: segregation, pass laws, education left to missionaries, little spent on African health.", 2],
      ], modelAnswer: "Politically, the Company ruled through an Administrator. After the risings the 1898 Order in Council created a Legislative Council in which elected settlers sat alongside nominated members, and a British Resident Commissioner to supervise the Company. Africans were controlled through the Native Affairs Department, whose Native Commissioners collected tax, recruited labour and supervised chiefs.\n\nEconomically, the Company aimed to make the colony profitable. It alienated land for settlers and pushed Africans into reserves on poorer land. It introduced the hut tax in 1894 so that Africans had to earn cash, and when local labour was scarce it recruited workers, many from neighbouring territories, through the Rhodesia Native Labour Bureau, often on harsh chibaro contracts. It supported mining and, when great goldfields did not appear, promoted white settler farming from about 1908, helped by railways to Bulawayo and Salisbury.\n\nSocially, it kept Africans and Europeans apart, with separate locations in towns and pass laws to control movement. African education was left mainly to missionaries, and little was spent on African health.", explanation: "Six developed policies across the three areas." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far did the change from Company rule to Responsible Government in 1923 improve conditions for Africans?", points: [
        ["Some change: Britain kept reserved powers over discriminatory laws; some economic growth after 1923.", 2],
        ["Little/no improvement: Land Apportionment Act (1930) entrenched racial land division.", 2],
        ["Little/no improvement: Maize Control Act (1931), Industrial Conciliation Act (1934), Native Land Husbandry Act (1951); still almost no vote.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "In theory, Responsible Government offered Africans some protection, because Britain kept reserved powers to refuse laws that discriminated against them, and the economy grew, especially during and after the Second World War.\n\nIn practice, conditions did not improve and in some ways became worse. Britain never used its reserved powers. The settler parliament passed the Land Apportionment Act in 1930, which gave Europeans about half the land and turned the earlier pattern of reserves into a permanent racial division. The Maize Control Act cut African farm incomes, the Industrial Conciliation Act kept African workers out of registered unions, and the Native Land Husbandry Act brought destocking. Africans still had almost no vote.\n\nOverall the change in 1923 transferred power from a company to the settlers themselves, and Africans gained little; the main colonial grievances deepened.", explanation: "Both sides and a judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on Company rule and Responsible Government.",
  });

  // 4. Federation (topic 8.3)
  b.struct({
    ...common(Z), d: 4,
    concepts: ["hist.colonial.federation"],
    stem: "**The Federation of Rhodesia and Nyasaland, 1953-1963.** Answer all parts.",
    hints: ["(b) needs policies and developments with examples.", "(c) needs economic successes and political failures, then a judgement."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** reasons why the Federation of Rhodesia and Nyasaland was formed.", points: [
        "To combine Northern Rhodesian copper, Southern Rhodesian industry and Nyasaland labour.",
        "A larger market to attract investment / big projects such as Kariba.",
        "To strengthen settler political control / move towards dominion status.",
        "To create a British-led bloc against Afrikaner nationalism in South Africa.",
        "To hold back African nationalism / Britain's wish to cut costs and promote partnership.",
      ], explanation: "One mark per reason." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the policies and developments of the Federation between 1953 and 1963.", points: [
        ["Federal government in Salisbury controlled defence, economy, railways, European education and health; territories kept African affairs.", 2],
        ["Partnership: some petty segregation relaxed, but land laws, pass laws and colour bars remained; few African federal seats.", 2],
        ["Kariba Dam built 1955-1959 for hydro-electric power to the Copperbelt and industry.", 2],
        ["About 57,000 Tonga (widely cited estimate) moved from the Zambezi valley.", 2],
        ["Multiracial University College in Salisbury; economic growth and investment, mostly benefiting Southern Rhodesia.", 2],
        ["Growing opposition: 1959 emergencies, Monckton Commission (1960), secession of Nyasaland and Northern Rhodesia; dissolved 31 December 1963.", 2],
      ], modelAnswer: "The Federation had a federal government and parliament in Salisbury responsible for defence, the economy, railways and European education and health, while the three territorial governments kept African affairs, land and African education. Africans held only a handful of federal seats.\n\nIts official policy was partnership. Some petty segregation was relaxed, for example in some hotels and post offices, but land laws, pass laws and job colour bars stayed, especially in Southern Rhodesia.\n\nThe main development was the Kariba Dam, built across the Zambezi between 1955 and 1959 to supply electricity to the Copperbelt and to Southern Rhodesian industry. To make way for the lake about 57,000 Tonga people, a widely cited estimate, were moved, many against their will. A multiracial University College opened in Salisbury, and the economy grew with foreign investment, though most new industry was in Southern Rhodesia.\n\nFrom 1959 the Federation was in crisis. Emergencies were declared in Southern Rhodesia and Nyasaland, the Monckton Commission of 1960 recommended a right to secede, and after Nyasaland and Northern Rhodesia were allowed to leave the Federation was dissolved on 31 December 1963.", explanation: "Six developed points." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was the Federation a success?", points: [
        ["Success: economic growth and investment; Kariba power; university college.", 2],
        ["Failure: partnership hollow; colour bars; few African seats; never won African consent.", 2],
        ["Failure: benefits concentrated in Southern Rhodesia; Tonga displaced; collapse in 1963.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The Federation had economic successes. The economy grew in the 1950s, investment came in, Kariba provided power for industry and the Copperbelt, and a multiracial university college opened.\n\nPolitically it failed. Partnership changed little: land laws, pass laws and colour bars remained and Africans had few seats. Africans had opposed federation from the start and never consented to it. Most benefits went to Southern Rhodesia while much revenue came from Northern Rhodesian copper, and tens of thousands of Tonga lost their homes for Kariba. Its collapse after only ten years is the clearest evidence of failure.\n\nOverall it was a limited economic success for some, mainly Europeans in Southern Rhodesia, but a political failure, because it could not win the support of the African majority.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the Federation.",
  });

  // 5. UDI (topic 8.4)
  b.struct({
    ...common(Z),
    concepts: ["hist.colonial.udi"],
    stem: "**The Unilateral Declaration of Independence, 1965-1979.** Answer all parts.",
    hints: ["(b) needs British and international reactions explained.", "(c) needs evidence for and against the effectiveness of sanctions."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements about UDI.", template: "UDI was declared on {{blank:a}} by the {{blank:b}} government of Ian Smith. Talks were held on HMS Tiger in 1966 and HMS {{blank:c}} in 1968. Britain's policy of no independence before majority rule was known as {{blank:d}}. In 1972 the {{blank:e}} Commission found that Africans rejected the Smith-Home proposals.", blanks: [
        { id: "a", accepted: ["11 November 1965"], choices: ["11 November 1965", "31 December 1963", "2 March 1970", "28 April 1966"] },
        { id: "b", accepted: ["Rhodesian Front"], choices: ["Rhodesian Front", "United Federal Party", "African National Council", "Patriotic Front"] },
        { id: "c", accepted: ["Fearless"], choices: ["Fearless", "Victory", "Beira", "Gibraltar"] },
        { id: "d", accepted: ["NIBMAR"], choices: ["NIBMAR", "UDI", "ESAP", "SADCC"] },
        { id: "e", accepted: ["Pearce"], choices: ["Pearce", "Monckton", "Devlin", "Carrington"] },
      ], explanation: "11 November 1965; Rhodesian Front; HMS Fearless; NIBMAR; the Pearce Commission." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain how Britain and the international community reacted to UDI between 1965 and 1972.", points: [
        ["Britain declared UDI illegal and refused to recognise it, but ruled out the use of force.", 2],
        ["Britain imposed economic sanctions, including an oil embargo; Royal Navy patrol off Beira.", 2],
        ["Talks on HMS Tiger (1966) and HMS Fearless (1968) failed; NIBMAR adopted December 1966.", 2],
        ["Smith-Home proposals (1971) tested by the Pearce Commission (1972), which found African rejection.", 2],
        ["UN: non-recognition; mandatory sanctions from 1966, widened in 1968.", 2],
        ["OAU condemned UDI and backed nationalists; Zambia suffered; South Africa and Portugal ignored sanctions.", 2],
      ], modelAnswer: "Britain declared UDI illegal and never recognised it, but Harold Wilson ruled out military force. Instead Britain relied on economic sanctions, including an oil embargo, and the Royal Navy patrolled off the port of Beira to stop tankers.\n\nBritain also tried to negotiate. Wilson met Smith on HMS Tiger in 1966 and HMS Fearless in 1968, but both talks failed because Smith would not accept guarantees of progress to majority rule; in December 1966 Britain adopted NIBMAR. In 1971 a later British government agreed the Smith-Home proposals, but the Pearce Commission of 1972 found that most Africans rejected them, so they lapsed.\n\nThe United Nations called on all states not to recognise Rhodesia and in 1966 imposed its first mandatory economic sanctions, widened in 1968. The OAU condemned UDI and supported the nationalist movements. Zambia suffered because its trade routes ran through Rhodesia. South Africa and Portugal, however, did not apply sanctions, which allowed Rhodesia to survive.", explanation: "Six developed points." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far were economic sanctions effective against the Smith regime between 1965 and 1979?", points: [
        ["Not effective: sanctions-busting through South Africa and Mozambique; oil continued to arrive.", 2],
        ["Not effective: import substitution and growth in the late 1960s; UDI lasted 14 years.", 2],
        ["Effective: raised costs, cut investment and foreign currency, isolated Rhodesia; combined with the war after 1975 they weakened the regime.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "In the short term sanctions were not very effective. South Africa and Portuguese-ruled Mozambique did not apply them, so oil and other goods reached Rhodesia and exports were sold secretly. Local factories made goods that had been imported, and the economy grew in the late 1960s. UDI lasted fourteen years.\n\nIn the longer term sanctions did have an effect. They raised the cost of trade, cut investment and foreign currency, and kept Rhodesia isolated, since no state recognised it. After Mozambique became independent in 1975 and closed its border in 1976, and as the war intensified, these pressures helped to force Smith into negotiations.\n\nOverall sanctions alone did not bring down the regime, but together with the armed struggle they contributed to its weakness by the late 1970s.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on UDI.",
  });

  // 6. Early armed struggle (topic 10.2)
  b.struct({
    ...common(Z), d: 4,
    concepts: ["hist.liberation.early-armed-struggle"],
    stem: "**The turn to armed struggle and its early phase, 1964-1970.** Answer all parts.",
    hints: ["(b) needs causes that explain why peaceful politics was abandoned.", "(c) weighs Rhodesian strength against the guerrillas' own weaknesses."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "Name **five** countries where Zimbabwean freedom fighters were trained in the 1960s and 1970s.", points: [
        "First country (e.g. Tanzania).",
        "Second country (e.g. Zambia).",
        "Third country (e.g. Ghana / Algeria / Egypt).",
        "Fourth country (e.g. the Soviet Union).",
        "Fifth country (e.g. China / Cuba / North Korea).",
      ], explanation: "One mark per correct country." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain why the nationalists moved from peaceful politics to armed struggle.", points: [
        ["Every nationalist party was banned (SRANC 1959, NDP 1961, ZAPU 1962, ZANU and PCC 1964).", 2],
        ["Leaders were detained or restricted under laws such as the Law and Order (Maintenance) Act.", 2],
        ["Negotiations and petitions (e.g. 1961 constitution, UN petitions) failed to bring majority rule.", 2],
        ["The Rhodesian Front came to power (1962) and declared UDI (1965).", 2],
        ["Britain refused to use force after UDI, so no outside power would remove the regime.", 2],
        ["Land grievances and examples of armed struggle in Algeria, Kenya, Mozambique and Angola.", 2],
      ], modelAnswer: "Peaceful politics had been made impossible. Every nationalist party was banned in turn: the SRANC in 1959, the NDP in 1961, ZAPU in 1962, and ZANU and the PCC in 1964. Laws such as the Unlawful Organisations Act and the Law and Order (Maintenance) Act allowed the government to detain leaders without trial, and by 1964 the main leaders were detained or restricted.\n\nNegotiation had also failed. The 1961 constitution offered Africans only 15 of 65 seats, and petitions to Britain and the United Nations brought words but no action. The Rhodesian Front, which rejected majority rule, won power in 1962 and declared UDI on 11 November 1965. Britain declared UDI illegal but refused to use force, so nationalists concluded that no one else would remove the settler government.\n\nLand grievances, from the Land Apportionment Act to the Native Land Husbandry Act, gave people strong reasons to fight, and armed struggles in Algeria and Kenya, and the wars beginning in Mozambique and Angola, showed that colonial powers could be forced to give way.", explanation: "Six developed causes." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent was the failure of the early phase of the armed struggle (1966-1970) due to the strength of the Rhodesian forces?", points: [
        ["Rhodesian strength: trained forces, aircraft, helicopters and trackers; South African police from 1967.", 2],
        ["Guerrilla weaknesses: conventional tactics in large groups; no political preparation of the people; informers.", 2],
        ["Other: thinly populated Zambezi valley; Portuguese Mozambique hostile; divisions between ZANU and ZAPU.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The Rhodesian forces were strong. They were well trained and equipped, with aircraft, helicopters and skilled trackers, and from 1967 South African police units reinforced them. At Chinhoyi in 1966 and at Hwange in 1967 they were able to find and defeat the guerrillas.\n\nBut the guerrillas' own methods made this easier. They moved in large groups and sought battle, which suited the Rhodesians. The people in the areas they entered had not been prepared politically, so they lacked food and shelter and were sometimes reported. They crossed the thinly populated Zambezi valley, there were no bases along the Mozambique border, and ZANU and ZAPU fought separately.\n\nThe strength of the Rhodesian forces was important, but the main reason was the guerrillas' strategy; when that changed in the 1970s, the same forces could not stop them.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the early armed struggle.",
  });

  // 7. Second phase (topic 10.3)
  b.struct({
    ...common(Z),
    concepts: ["hist.liberation.second-phase"],
    stem: "**The second phase of the armed struggle, 1972-1979.** Answer all parts.",
    hints: ["(b) needs events in order with dates and places.", "(c) weighs external support against the role of the masses."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "Identify **five** ways in which ordinary people inside the country supported the guerrillas.", points: [
        "Providing food.",
        "Providing shelter / hiding fighters and weapons.",
        "Giving information about security forces (mujibhas and chimbwidos as lookouts).",
        "Carrying messages and supplies.",
        "Attending pungwes / joining the struggle as recruits.",
      ], explanation: "One mark per way." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the main events of the second phase of the armed struggle.", points: [
        ["ZANLA attack on Altena Farm, Centenary, 21 December 1972, opened the north-eastern front (through Tete with FRELIMO).", 2],
        ["Rhodesian response: collective fines, protected villages from 1973, Selous Scouts.", 2],
        ["Détente 1974-75: leaders released; ceasefire efforts failed.", 2],
        ["Mozambique independent 25 June 1975: ZANLA bases along the eastern border; ZIPRA from Zambia; Patriotic Front 1976.", 2],
        ["Raids on Nyadzonia (9 August 1976), Chimoio (23 November 1977) and Freedom Camp (19 October 1978).", 2],
        ["War at its height by 1979: martial law over most of the country; civilian aircraft shot down by ZIPRA; leading to Lancaster House.", 2],
      ], modelAnswer: "The second phase began on 21 December 1972, when ZANLA attacked Altena Farm in the Centenary district. ZANLA had entered the north-east through Tete province, where FRELIMO helped it. The Rhodesian government responded with collective fines, moved people into protected villages from 1973 and formed the Selous Scouts.\n\nIn 1974-75 détente led to the release of detained leaders and a ceasefire attempt, but the fighting soon resumed. When Mozambique became independent on 25 June 1975, ZANLA set up bases along the whole eastern border and the war spread across the country, while ZIPRA operated from Zambia. In October 1976 ZANU and ZAPU formed the Patriotic Front.\n\nRhodesian forces raided camps abroad: Nyadzonia on 9 August 1976, Chimoio on 23 November 1977 and Freedom Camp in Zambia on 19 October 1978, killing many people, including refugees. ZIPRA shot down two civilian Air Rhodesia aircraft in 1978 and 1979. By 1979 martial law covered most of the country and the war had reached its height, leading to the Lancaster House Conference.", explanation: "Six developed points in sequence." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far was external support responsible for the success of the second phase of the armed struggle?", points: [
        ["External support: bases in Mozambique (after 1975) and Zambia; Frontline States; OAU Liberation Committee.", 2],
        ["External support: weapons and training from the USSR (ZIPRA) and China (ZANLA); UN sanctions.", 2],
        ["Other: support of the masses (food, shelter, intelligence, recruits); new guerrilla strategy and politicisation.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "External support was very important. After 1975 independent Mozambique allowed ZANLA to operate along the whole eastern border, and Zambia hosted ZIPRA. The Frontline States sheltered refugees, the OAU Liberation Committee provided funds, the Soviet Union armed ZIPRA and China armed ZANLA, while UN sanctions weakened Rhodesia.\n\nHowever, the success of the second phase depended above all on what happened inside the country. Guerrillas moved in small groups and politicised the people at pungwes. Peasants provided food and shelter, mujibhas and chimbwidos gathered intelligence, and thousands of young people joined. This allowed guerrillas to stay in areas for long periods.\n\nOverall the support of the masses and the new strategy were the main reasons, because bases and weapons from outside could only be used effectively with local support; but external support explains how the war could spread so quickly after 1975.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on the second phase of the armed struggle.",
  });

  // 8. Lancaster House (topic 10.4)
  b.struct({
    ...common(Z), d: 4,
    concepts: ["hist.liberation.peace-settlement"],
    stem: "**Attempts at a peaceful settlement, 1974-1979.** Answer all parts.",
    hints: ["(b) takes each failed attempt in turn.", "(c) weighs the war against other pressures for a settlement."],
    parts: checkExam(Z, [
      P.fib({ label: "(a)", stem: "Complete the statements.", template: "The Victoria Falls conference met in {{blank:a}}. The Geneva conference was attended by the {{blank:b}}, formed by ZANU and ZAPU. The Internal Settlement was signed on {{blank:c}}. Lancaster House was chaired by {{blank:d}}, and the agreement was signed on {{blank:e}}.", blanks: [
        { id: "a", accepted: ["1975"], choices: ["1975", "1972", "1977", "1979"] },
        { id: "b", accepted: ["Patriotic Front"], choices: ["Patriotic Front", "Rhodesian Front", "African National Council", "Frontline States"] },
        { id: "c", accepted: ["3 March 1978"], choices: ["3 March 1978", "1 June 1979", "11 November 1965", "18 April 1980"] },
        { id: "d", accepted: ["Lord Carrington"], choices: ["Lord Carrington", "Lord Soames", "Lord Pearce", "Henry Kissinger"] },
        { id: "e", accepted: ["21 December 1979"], choices: ["21 December 1979", "15 December 1979", "4 March 1980", "22 December 1987"] },
      ], explanation: "Victoria Falls 1975; the Patriotic Front (1976); Internal Settlement 3 March 1978; Lord Carrington; signed 21 December 1979." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Explain why attempts to end the war by negotiation failed between 1974 and 1979.", points: [
        ["Détente (1974-75): leaders released, but the ceasefire broke down.", 2],
        ["Victoria Falls (August 1975): Smith refused majority rule; disputes over immunity/conditions for talks; nationalists divided.", 2],
        ["Geneva (1976): disagreement over the length of transition and control of the army and police.", 2],
        ["Internal Settlement (1978): Patriotic Front excluded.", 2],
        ["Whites kept 28 of 100 seats and control of army, police, judiciary and civil service.", 2],
        ["Zimbabwe-Rhodesia (1979) not recognised; war intensified; sanctions stayed.", 2],
      ], modelAnswer: "Détente in 1974-75, pushed by Vorster and Kaunda, led to the release of the detained leaders, but the ceasefire broke down. At the Victoria Falls conference in August 1975 Smith still refused to accept majority rule, the two sides could not agree on conditions for further talks, such as immunity for exiled leaders, and the nationalists themselves were divided.\n\nAfter Smith accepted majority rule in principle in 1976, the Geneva conference met, but it failed over the length of the transition and, above all, over who would control the army and police during it.\n\nSmith then made the Internal Settlement of March 1978 with Muzorewa, Sithole and Chirau. It excluded the Patriotic Front, whose armies were doing the fighting. Under its constitution whites kept 28 of the 100 seats and control of the army, police, judiciary and civil service, so real power changed little. Zimbabwe-Rhodesia, formed in June 1979, was recognised by no country, sanctions stayed and the war grew more intense.", explanation: "Six developed reasons covering the attempts." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far was the military situation responsible for the success of the Lancaster House Conference?", points: [
        ["Military situation: Rhodesia could not win; martial law, emigration, failing economy; Frontline States suffering raids.", 2],
        ["Other: Frontline States pressed the Patriotic Front; Commonwealth (Lusaka 1979) and international non-recognition.", 2],
        ["Other: Britain took direct control of the transition; compromises including land clauses and assurances on funding.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "The military situation was central. By 1979 the war had spread across most of the country, martial law covered most areas, whites were emigrating and the economy was failing, so the Rhodesian leaders knew they could not win.\n\nOther factors were also needed. Mozambique and Zambia, suffering raids and economic damage, pressed the Patriotic Front to accept a settlement. At the Commonwealth meeting in Lusaka in 1979 Britain was persuaded not to recognise Zimbabwe-Rhodesia and to call a conference. Britain then took direct responsibility for the transition through a Governor, which removed the obstacle that had broken up Geneva, and compromises such as the land clauses, eased by assurances on funding, allowed agreement.\n\nOverall the military situation made a settlement necessary, but British control of the transition and Frontline pressure explain why it was achieved at Lancaster House.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on attempts at a settlement.",
  });

  // 9. Post-independence developments (topic 11.2)
  b.struct({
    ...common(Z),
    concepts: ["hist.independence.policies", "hist.independence.reconciliation"],
    stem: "**Developments in Zimbabwe since independence.** Answer all parts.",
    hints: ["(b) should be factual and balanced on the disturbances of the 1980s.", "(c) needs achievements and problems of social policy."],
    parts: checkExam(Z, [
      P.manual({ label: "(a)", marks: 5, stem: "State **five** social policies introduced by the Zimbabwean government in the 1980s.", points: [
        "Free primary education / rapid school building.",
        "Free health care for people on low incomes / rural health centres.",
        "Immunisation and village health worker programmes.",
        "Legal Age of Majority Act (1982) / women's rights.",
        "Adult literacy / teacher training (ZINTEC) / sport and recreation opened to all.",
      ], explanation: "One mark per policy." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "Describe the political developments in Zimbabwe between 1980 and 1990.", points: [
        ["1980: ZANU-PF won 57 of 80 common-roll seats; Mugabe Prime Minister, Banana ceremonial President; reconciliation and a broad cabinet.", 2],
        ["Integration of ZANLA, ZIPRA and Rhodesian forces; Entumbane clashes 1980-81.", 2],
        ["1982: arms caches found; Nkomo and ZAPU ministers dismissed; dissidents active.", 2],
        ["1983-1987: Fifth Brigade in Matabeleland and the Midlands; many thousands of civilians killed (estimates up to about 20,000).", 2],
        ["Unity Accord 22 December 1987: PF-ZAPU merged into ZANU-PF; amnesty 1988.", 2],
        ["1987: reserved white seats abolished; executive presidency from 31 December 1987; Senate abolished 1990.", 2],
      ], modelAnswer: "In the February 1980 elections ZANU-PF won 57 of the 80 common-roll seats. Robert Mugabe became Prime Minister and Canaan Banana ceremonial President. The government followed a policy of reconciliation and included ZAPU leaders and white ministers in the cabinet. ZANLA, ZIPRA and the Rhodesian forces were integrated into the Zimbabwe National Army, although clashes broke out between former guerrillas at Entumbane in Bulawayo in 1980-81.\n\nIn 1982 arms caches were found on properties linked to ZAPU, and Joshua Nkomo and other ZAPU ministers were dismissed. Armed dissidents became active in parts of Matabeleland. From January 1983 the army's Fifth Brigade was deployed in Matabeleland North and later in Matabeleland South and the Midlands, and many thousands of civilians were killed, beaten or detained; estimates of the dead range up to about 20,000.\n\nThe conflict ended with the Unity Accord of 22 December 1987, when PF-ZAPU merged into ZANU-PF, followed by an amnesty in 1988. In 1987 the reserved white seats were abolished and, from 31 December 1987, Mugabe became executive President. The Senate was abolished in 1990.", explanation: "Six developed points in order." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "To what extent were the social policies of the 1980s successful?", points: [
        ["Success: rapid growth in school enrolment and literacy.", 2],
        ["Success: health gains (clinics, immunisation, lower child deaths); women's legal status (1982).", 2],
        ["Limits: crowded classes, untrained teachers, school leavers without jobs; HIV/AIDS from late 1980s; customary barriers for women; cost (later cuts under ESAP).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(8), modelAnswer: "Social policy in the 1980s had major successes. Primary education became free and enrolment grew very fast, giving Zimbabwe one of the highest literacy rates in Africa. Rural clinics, immunisation and village health workers reduced child deaths, and the Legal Age of Majority Act of 1982 made women legal adults at 18.\n\nThere were limits. Classes were crowded and many teachers untrained at first, and many school leavers could not find jobs. From the late 1980s HIV/AIDS began to reverse health gains, customary practices still restricted women, and the cost of the programmes became hard to sustain, leading to fees under ESAP in the 1990s.\n\nOverall the social policies of the 1980s were largely successful in widening access to education and health, but their quality and sustainability were weaker than their reach.", explanation: "Both sides plus judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style structured question on post-independence developments.",
  });

  // 10. Source-based question on the Federation (topic 8.3)
  b.struct({
    ...common(ZS), d: 5,
    concepts: ["hist.colonial.federation"],
    stem: `**Source-based question: the Federation of Rhodesia and Nyasaland.** Study Sources A, B and C and answer all parts.\n\n${sources([
      source("Source A", "an advertisement placed by a fictional federal investment board in a British magazine, 1956", "Invest in the heart of Africa! The Federation of Rhodesia and Nyasaland offers copper, tobacco, coal and a growing home market of millions. Kariba will bring cheap power to every factory. A stable government and a policy of partnership between the races make the Federation the safest place in Africa for your capital."),
      source("Source B", "a petition by a fictional group of chiefs and teachers in Nyasaland to the British Colonial Secretary, 1953", "We, the people of Nyasaland, do not want to be joined to Southern Rhodesia. We have seen how our sons who work there are treated: they carry passes, they cannot buy land, and they are paid less than a European for the same work. Partnership is a word in a speech. We ask that the British Government keep its promise to protect us until we govern ourselves."),
      source("Source C", "a description of a photograph of the kind published in newspapers in 1959, described in words", "Armed police in riot helmets stand behind a roll of barbed wire. On the other side a crowd of Africans, many of them young men, hold up a banner reading \"Secession now\". In the background are the burned remains of a government building. The caption describes the scene as \"the emergency in Nyasaland\".", { described: true }),
    ])}`,
    hints: ["(b) asks what the sources suggest and why they were produced.", "(c) needs every source, your own knowledge and a judgement."],
    parts: checkExam(ZS, [
      P.manual({ label: "(a)", marks: 5, stem: "Using the sources, give **five** pieces of information about the Federation.", points: [
        "It had copper, tobacco and coal (A).",
        "Kariba was being built to supply power (A).",
        "Its official policy was partnership (A or B).",
        "Africans in Southern Rhodesia carried passes, could not buy land and were paid less (B).",
        "There was an emergency in Nyasaland with protests demanding secession (C).",
      ], explanation: "One mark per correct piece of information from the sources." }),
      P.manual({ label: "(b)", marks: 8, stem: "What can you learn from Sources A and B about the attitudes of different groups to the Federation? Explain the purpose of each source.", points: [
        "A suggests federal leaders saw the Federation as an economic opportunity.",
        "A presents partnership and stability as real.",
        "Purpose of A: to attract British investment, so it gives a favourable picture.",
        "B suggests Africans in Nyasaland opposed joining Southern Rhodesia.",
        "B shows Africans saw partnership as empty words.",
        "B shows fear of Southern Rhodesian racial laws (passes, land, pay).",
        "Purpose of B: to persuade Britain to stop or protect them from federation.",
        "Comparison: the two groups had opposite attitudes because of their different interests.",
      ], explanation: "Credit supported inferences and the purpose of each source." }),
      P.manual({ label: "(c)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far do Sources A, B and C show that the Federation failed because Africans opposed it? Use the sources and your own knowledge.", points: [
        ["Source B shows African opposition from 1953, before the Federation began.", 2],
        ["Source C shows mass protest and the 1959 emergency in Nyasaland; own knowledge: Banda's arrest, deaths, Devlin Report.", 2],
        ["Source A shows the Federation's economic strengths, which on their own could not save it; it was written to attract investors, so less reliable on partnership.", 2],
        ["Own knowledge: other causes, e.g. Monckton Commission (1960), British policy and the \"wind of change\", African majority governments in the north demanding secession.", 2],
        ["Evaluation of provenance: B and C from opponents' side / C a press image; reliability considered.", 2],
        ["Supported judgement on how far the sources show the main cause.", 2],
      ], levels: levels(12), modelAnswer: "The sources give strong evidence that African opposition was a main reason for failure. Source B, a petition from Nyasaland in 1953, shows that Africans opposed federation from the very beginning because they feared Southern Rhodesian passes, land laws and unequal pay, and saw partnership as empty words. Source C shows that by 1959 this opposition had become mass protest, with crowds demanding secession and an emergency declared in Nyasaland. My own knowledge confirms this: Banda and many others were arrested, dozens of Africans were killed, and the Devlin Report criticised the government.\n\nSource A gives the other side. Written to attract British investors, it presents the Federation as stable and successful, and its economic claims about copper and Kariba were largely true. But it is less reliable on partnership, and its confidence in stability was proved wrong within three years.\n\nThe sources do not show everything. From my own knowledge, the Monckton Commission of 1960 recommended a right to secede, Macmillan's \"wind of change\" signalled a change in British policy, and new constitutions gave Africans majorities in Nyasaland and Northern Rhodesia, whose governments demanded to leave. These factors were themselves largely responses to African opposition.\n\nOverall the sources show to a large extent that African opposition caused the Federation's failure, but own knowledge is needed to show how that opposition worked through changes in British policy.", explanation: "Level 3 uses all three sources, evaluates them and adds own knowledge to reach a judgement." }),
    ]),
    explanation: "ZIMSEC Paper 1 style source-based question on the Federation.",
  });
});
