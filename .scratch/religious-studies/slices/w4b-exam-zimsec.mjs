// W4b exam-format items: Paper 2 (Contemporary issues, topics 13, 14 and 15) structured essay questions,
// 25 marks = (a) 15 + (b) 10. Plans from EXAM in lib.mjs; the paper structure is our convention (reviewer to check).
// Reviewer notes: dates (the 1890s risings; executions April 1898; CCJP 1972; Lamont 1976-77; UDHR 10 December 1948) and sections
// of the 2013 Constitution (60, 78, 81, 86) follow the lessons; scripture is paraphrased.
import { concept, EXAM, checkExam } from "../lib.mjs";
import { ex } from "../tables/w4b-helpers.mjs";

const p2 = { skill: EXAM.ZIM_P2.skill, applies: EXAM.ZIM_P2.applies, secs: EXAM.ZIM_P2.secs, examStyle: true, paper: "Paper 2" };

concept("frs.liberation.first-chimurenga", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec" }, (b) => {
  // 1. Paper 2: Indigenous Religion in the First Chimurenga.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.liberation.first-chimurenga"],
    stem: "This question is about the part played by Indigenous Religion in the First Chimurenga/Umvukela (the 1890s).",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Describe the part played by Indigenous Religion in the First Chimurenga/Umvukela.", [
        ["The Mwari shrines in the Matopo Hills (Njelele, Matonjeni) were consulted about rain and national crises, and people sought guidance from them in 1896", 2],
        ["Mkwati, a Mwari priest associated with the shrines, is remembered as a religious leader of the resistance who travelled into Mashonaland", 2],
        ["The spirit mediums Nehanda (Charwe Nyakasikana) and Kaguvi (Gumboreshumba) gave leadership in Mashonaland", 2],
        ["Beliefs about land: it belonged to the ancestors and territorial spirits, so losing it was an attack on the spiritual order and defending it was a duty", 2],
        ["Beliefs about drought, locusts and rinderpest in 1896 as signs of spiritual disorder that called the people to unity", 2],
        ["The mediums' messages carried the authority of the spirits, which united communities across kin and chiefdoms", 2],
        ["Nehanda and Kaguvi were captured in late 1897 and executed in April 1898; tradition says Nehanda foretold that her bones would rise, and they are honoured as heroes today", 2],
        ["Land, cattle, labour and tax were also causes of the risings", 1],
      ],
      "In Indigenous Religion the land belongs to the ancestors and the territorial spirits, so the loss of land and cattle after 1890 was felt as an attack on the spiritual order. When drought, locusts and the cattle disease rinderpest struck in 1896, many people took them as signs of spiritual disorder and turned for guidance to the Mwari shrines in the Matopo Hills, such as Njelele and Matonjeni, where messages about rain and national crises were sought.\n\nMkwati, a Mwari priest associated with the shrines, is remembered as a religious leader of the resistance who travelled into Mashonaland. In Mashonaland the mediums Nehanda (Charwe Nyakasikana) and Kaguvi (Gumboreshumba) gave leadership. Because the people believed that the spirit spoke through the medium, the mediums' messages carried the authority of the ancestors, and they helped to unite communities beyond their own kin and chiefdoms. Nehanda and Kaguvi were captured in late 1897 and executed in April 1898. Tradition says that Nehanda foretold that her bones would rise, and the two mediums are honoured as heroes of the resistance. Religion was not the only cause, since land, cattle, labour and tax also drove the risings.",
      "Two marks for each developed point; one mark for noting non-religious causes. Credit only what the sources support: details of Mkwati's later movements are disputed and need not be given. The tradition about Nehanda's last words should be reported as tradition.", 400),
      ex("(b)", 10, "Assess how far the First Chimurenga/Umvukela was led by religious leaders.", [
        ["For: the Mwari shrines and Mkwati, and the mediums Nehanda and Kaguvi, gave authority, a common language and leadership", 2],
        ["For: the religious message about the land and the ancestors made resistance a duty and a source of courage", 2],
        ["Against: local chiefs and headmen led in many areas, and the two risings began at different times (March and June 1896), so communication was limited", 2],
        ["Against: economic and political causes (land, cattle, forced labour, tax, drought) explain why many people joined", 2],
        ["A supported judgement, such as that religion gave unity and legitimacy in many places but was one factor among several, and historians disagree about coordination", 2],
      ],
      "Religious leaders were important in the risings. The Mwari shrines and Mkwati, and the mediums Nehanda and Kaguvi, gave the resistance authority, a common language and leadership, and the religious message about the land and the ancestors made resistance a duty and a source of courage.\n\nHowever, local chiefs and headmen led in many areas, and the two risings began at different times, in March and June 1896, so communication between them was limited. Land, cattle, forced labour, tax and drought also explain why many people joined. Historians disagree about how far the religious leaders coordinated events. I conclude that religion gave unity and legitimacy in many places, but the risings were not simply led by religious leaders; they were the result of religious, economic and political causes together.",
      "Level marking: balanced evidence about religious leadership and other leadership or causes, and a supported judgement, reach the top levels.", 300),
    ]),
    hints: ["In (a) cover the shrines, the mediums, the beliefs about land and the executions. In (b) weigh religious leadership against local leaders and other causes."],
    explanation: "A Paper 2 style question: (a) describe the part played by Indigenous Religion, (b) assess how far religious leaders led the risings.",
  });

  // 2. Paper 2: the churches in the struggle, both sides.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.liberation.churches"],
    stem: "This question is about the churches and the liberation struggle.",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Describe the roles played by Christian churches in the liberation struggle.", [
        ["Mission schools such as Kutama, Waddilove and Dadaya educated many Africans who became leaders, teachers and nationalists", 2],
        ["The Catholic Commission for Justice and Peace (formed 1972) collected evidence of abuses and in 1976 helped to publish a report on violations of human rights", 2],
        ["Bishop Donal Lamont of Umtali criticised racial laws and the treatment of villagers, was convicted in 1976 and was deported in 1977", 2],
        ["Clergy entered politics: Bishop Abel Muzorewa led the African National Council from 1971, Rev. Ndabaningi Sithole led ZANU in 1963, and Rev. Canaan Banana became the first President in 1980", 2],
        ["The World Council of Churches' Programme to Combat Racism gave humanitarian grants to groups fighting racism, including some liberation movements, which caused controversy", 2],
        ["Missions were linked with colonial rule: some received land and some missionaries and church members supported the government", 2],
        ["Mission stations were caught between guerrillas and soldiers, and some were closed or suffered", 2],
        ["Muslims' role is documented too thinly to describe in detail", 1],
      ],
      "The churches had a mixed record in the liberation struggle. Mission schools such as Kutama, Waddilove and Dadaya educated many Africans who became teachers and nationalist leaders. The Catholic Commission for Justice and Peace, formed in 1972, collected evidence of abuses and in 1976 helped to publish a report on violations of human rights. Bishop Donal Lamont of Umtali criticised racial laws and the treatment of villagers, and he was convicted in 1976 and deported in 1977.\n\nSome clergy entered politics: Bishop Abel Muzorewa led the African National Council from 1971, Rev. Ndabaningi Sithole led ZANU in 1963 and Rev. Canaan Banana became the first President in 1980. The World Council of Churches' Programme to Combat Racism gave humanitarian grants to groups fighting racism, including some liberation movements, which caused controversy among the churches. On the other side, missions were linked with colonial rule, some received land, and some missionaries and church members supported the government. Mission stations were often caught between guerrillas and soldiers, and some were closed or suffered. The role of Muslims is documented too thinly to describe in detail.",
      "Two marks for each developed point from either side; one mark for the point about Muslims. Do not credit generalisations that all churches took one side, and do not praise or blame living politicians.", 400),
      ex("(b)", 10, "Assess the view that the churches helped the liberation struggle more than they hindered it.", [
        ["Helped: mission education produced nationalist leaders, and ideas of justice and equality were used against discrimination", 2],
        ["Helped: the CCJP and Bishop Lamont documented and criticised abuses, and church bodies gave relief and humanitarian grants", 2],
        ["Hindered or limited: links with colonial rule, mission land, and church members and leaders who supported the government", 2],
        ["The churches were divided, and mission stations were caught in the middle; churches also criticised African customs", 2],
        ["A supported judgement that recognises the mixed record", 2],
      ],
      "The churches helped in important ways. Mission education produced many nationalist leaders, who used the ideas of justice and equality they had learnt to argue against discrimination. The CCJP and Bishop Lamont documented and criticised abuses, and church bodies gave relief and humanitarian grants.\n\nBut the churches also hindered or limited the struggle. They were linked with colonial rule, some missions held land, and some church members and leaders supported the government. The churches were divided, mission stations were caught in the middle, and many missions criticised African customs. I conclude that the churches' record was mixed. In the long run their schools and their witness against abuses probably helped the nationalist cause more than their links with colonial rule hindered it, but this judgement must be held with care because the churches were not united and the evidence differs by place.",
      "Level marking: evidence on both sides across more than one church or example, and a supported judgement, reach the top levels.", 300),
    ]),
    hints: ["Include both the helping and the hindering evidence in (a) and (b), with names and dates."],
    explanation: "A Paper 2 style question: (a) describe the roles of the churches, (b) assess whether they helped more than they hindered.",
  });

  // 3. Paper 2: religion and human rights.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.rights.human-rights"],
    stem: "This question is about religion and human rights.",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Explain how religions support the protection of human rights.", [
        ["Human rights are the basic freedoms of every person; they are universal, inalienable, equal and interdependent and come with responsibilities", 2],
        ["Judaism and Christianity teach that humans are made in the image of God (Genesis 1:27), so every person has equal worth", 2],
        ["Islam teaches that God has honoured the children of Adam (Qur'an 17:70), so human life and dignity are sacred", 2],
        ["Indigenous Religion teaches unhu/ubuntu: a person is a person through other people, with respect, hospitality and care for the weak", 2],
        ["Religions teach justice and care for the poor, the orphan, the widow and the stranger, which supports the right to life, food and security", 2],
        ["Religions support the Universal Declaration of Human Rights (10 December 1948) and the Declaration of Rights in Chapter 4 of the Constitution, including freedom of conscience and religion (section 60)", 2],
        ["Religious bodies speak for human rights, educate people and help victims of abuse", 2],
        ["Believers may disagree about how teachings apply in particular cases", 1],
      ],
      "Religions support human rights by teaching that every person has dignity. Judaism and Christianity teach that humans are made in the image of God (Genesis 1:27), so every person has equal worth. Islam teaches that God has honoured the children of Adam (Qur'an 17:70), so human life is sacred. Indigenous Religion teaches unhu/ubuntu, that a person is a person through other people, with respect, hospitality and care for the weak.\n\nHuman rights are the basic freedoms of every person; they are universal, inalienable, equal and interdependent, and they come with responsibilities. Religions teach justice and care for the poor, the orphan, the widow and the stranger, which supports rights to life, food and security. They support the Universal Declaration of Human Rights of 10 December 1948 and the Declaration of Rights in Chapter 4 of the Constitution, including freedom of conscience and religion in section 60. Religious bodies also speak for human rights, educate people and help victims of abuse. However, believers sometimes disagree about how teachings apply in particular cases.",
      "Two marks for each developed point, with scripture or law named; one mark for noting differences among believers. Credit at least two religions.", 400),
      ex("(b)", 10, "Discuss the view that some religious practices violate human rights.", [
        ["Some practices defended as tradition or religion, such as child marriage, pledging, virginity testing and wife inheritance without consent, harm dignity and rights", 2],
        ["Refusing medical care for a child conflicts with the child's right to health care (section 81)", 2],
        ["Other practices raise debate, such as roles reserved for men in religious leadership, which some see as unequal and others as part of freedom of religion (sections 56 and 60)", 2],
        ["Most religions teach dignity and justice, and the law can limit a practice only if fair and necessary (section 86); dialogue and reform within religions can solve many conflicts", 2],
        ["A supported judgement", 2],
      ],
      "There is some truth in the view. Practices defended as tradition or religion, such as child marriage, pledging, virginity testing and wife inheritance without consent, harm dignity and rights, and refusing medical care for a child conflicts with the child's right to health care. Other practices raise debate: roles reserved for men in religious leadership are seen by some as unequal and by others as part of freedom of religion.\n\nBut most religions teach dignity and justice, and many believers campaign against harmful practices. The law may limit a practice only if the limit is fair and necessary (section 86), and dialogue and reform within religions can solve many conflicts. I conclude that some practices do violate human rights and should be changed, but this does not describe religion as a whole, which also strongly supports human dignity.",
      "Level marking: examples of harmful practices and of contested practices, the other view, and a supported judgement reach the top levels. Do not generalise about one religion.", 300),
    ]),
    hints: ["In (a) cover at least two religions and name the law. In (b) give the harmful practices, the contested ones, and the other view."],
    explanation: "A Paper 2 style question: (a) explain how religions support human rights, (b) discuss the view that some practices violate them.",
  });

  // 4. Paper 2: children's rights and religious teaching.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.rights.children"],
    stem: "This question is about children's rights and religious teaching.",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Explain the rights and responsibilities of children, with reference to the teachings of at least two religions.", [
        ["A child is a person under 18; section 81 of the Constitution gives children rights to family or parental care, education, health care and protection from abuse and exploitation, and their best interests are paramount", 2],
        ["The UN Convention on the Rights of the Child (1989) and the African Charter (1990) cover survival, development, protection and participation; the Charter also lists duties of the child", 2],
        ["Responsibilities: to respect parents and elders, to attend school and respect teachers, to help in the community and to respect religion", 2],
        ["Judaism: Exodus 20:12 commands honour for father and mother, and parents teach children the commandments (Deuteronomy 6:7)", 2],
        ["Christianity: Ephesians 6:1-4 asks children to obey parents and fathers to bring up children with care; Jesus welcomed children (Mark 10:13-16)", 2],
        ["Islam: Qur'an 17:23-24 commands kindness to parents; parents must care for and educate children. Indigenous Religion: respect for elders and ancestors, and the community helps to raise a child", 2],
        ["Child abuse and harmful customs (child marriage, pledging) are wrong; help is available from Childline (116), the police Victim Friendly Unit, a clinic or a trusted adult", 2],
        ["Teachings speak to both children and parents", 1],
      ],
      "In the Constitution a child is a person under 18. Section 81 gives children rights to family or parental care, education, health care and protection from abuse and exploitation, and their best interests are paramount. The UN Convention on the Rights of the Child (1989) and the African Charter (1990) cover survival, development, protection and participation, and the Charter also lists the duties of the child.\n\nChildren have responsibilities: to respect parents and elders, to attend school and respect teachers, to help in the community and to respect religion. Religions teach this. Exodus 20:12 commands Jews and Christians to honour father and mother, and Deuteronomy 6:7 asks parents to teach their children. Ephesians 6:1-4 asks children to obey their parents and fathers to bring up their children with care, and Jesus welcomed children (Mark 10:13-16). Qur'an 17:23-24 commands kindness to parents, and parents must care for and educate their children. In Indigenous Religion children learn respect for elders and ancestors and the community helps to raise a child. Child abuse and harmful customs such as child marriage and pledging are wrong, and help is available from Childline (116), the police Victim Friendly Unit, a clinic or a trusted adult. The teachings speak to both children and parents.",
      "Two marks for each developed point; one mark for noting that teachings speak to both children and parents. Credit rights and responsibilities and at least two religions.", 400),
      ex("(b)", 10, "Discuss how far religious teachings and the law together protect children from abuse.", [
        ["Religious teachings: care, respect, and the duty of parents to protect and teach children; religious leaders can teach that abuse is wrong", 2],
        ["The law: section 81, the minimum age of marriage at 18 (section 78), and reporting to the police Victim Friendly Unit and Childline", 2],
        ["Limits of teachings: harmful customs defended as religion or tradition, silence of some leaders, and abuse that happens in private", 2],
        ["Limits of the law: weak enforcement, fear of reporting and poverty; religious communities can help by awareness, counselling and refuge", 2],
        ["A supported judgement that they work best together", 2],
      ],
      "Religious teachings protect children by teaching care and respect and by reminding parents of their duty to protect and teach their children. Religious leaders can teach that abuse is wrong. The law adds protection: section 81 gives children rights, section 78 sets the minimum age of marriage at 18, and abuse can be reported to the police Victim Friendly Unit and Childline.\n\nBoth have limits. Some harmful customs are defended as religion or tradition, some leaders remain silent, and abuse often happens in private. The law may be weakly enforced, and children and families may fear to report or may be held back by poverty. Religious communities can help by awareness, counselling and refuge. I conclude that religious teachings and the law protect children best when they work together, because teaching changes attitudes while the law can act when a child is in danger.",
      "Level marking: strengths and limits of both teachings and the law, and a supported judgement, reach the top levels.", 300),
    ]),
    hints: ["In (a) give both rights and responsibilities and name two religions. In (b) weigh teachings and law, strengths and limits."],
    explanation: "A Paper 2 style question: (a) explain children's rights and responsibilities with religious teaching, (b) discuss protection from abuse.",
  });

  // 5. Paper 2: teachings on peace.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.conflict.teachings-peace"],
    stem: "This question is about religious teachings on peace.",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Describe the teachings on peace in at least two religions.", [
        ["Judaism: shalom means wholeness and right relationships; Isaiah 2:4 and Micah 4:3 look to a time of swords turned into ploughshares", 2],
        ["Judaism: seek peace and pursue it (Psalm 34:14); shalom bayit, peace in the home, and the duty to make peace between neighbours", 2],
        ["Christianity: blessed are the peacemakers (Matthew 5:9) and love of enemies and no revenge (Matthew 5:38-48)", 2],
        ["Christianity: forgive again and again (Matthew 18:21-22); the pacifist and just war views", 2],
        ["Islam: salaam as greeting, As-Salam as a name of God; Qur'an 49:9-10 teaches making peace between believers; sulh (reconciliation)", 2],
        ["Islam: jihad means striving; armed defence only under strict conditions that protect civilians, and extremism is rejected by most Muslims", 2],
        ["Indigenous Religion: rugare/ukuthula as harmony with the living, ancestors and land; unhu and elders settling disputes", 2],
        ["Believers apply these teachings by forgiving, mediating and working for justice peacefully", 1],
      ],
      "In Judaism peace (shalom) means wholeness and right relationships. Isaiah 2:4 and Micah 4:3 look to a time when swords will be turned into ploughshares, Psalm 34:14 urges people to seek peace and pursue it, and shalom bayit means peace in the home.\n\nIn Christianity Jesus blessed the peacemakers (Matthew 5:9), told his followers to love their enemies and not to take revenge (Matthew 5:38-48), and taught forgiveness again and again (Matthew 18:21-22). Christians hold pacifist and just war views. In Islam salaam is the greeting and As-Salam is a name of God. Qur'an 49:9-10 teaches that believers who fight should be reconciled, and sulh is encouraged in disputes. Jihad means striving, and armed defence is permitted only under strict conditions that protect civilians, while extremism is rejected by most Muslims. In Indigenous Religion peace (rugare, ukuthula) is harmony with the living, the ancestors and the land, and unhu and the elders settle disputes. Believers apply these teachings by forgiving, mediating and working for justice peacefully.",
      "Two marks for each developed teaching with a reference or term; one mark for application. Credit any two or more religions; do not rank them.", 400),
      ex("(b)", 10, "To what extent can religious teachings on peace guide believers when they are faced with violence?", [
        ["Teachings guide believers to forgive, to refuse revenge and to seek reconciliation, which can calm tension", 2],
        ["Religious leaders and bodies act as mediators and interfaith groups, giving the teachings practical form", 2],
        ["Believers interpret teachings differently on whether force is ever justified (pacifism, just war, armed defence), so guidance is not always clear", 2],
        ["Violence has political, economic and social causes that teachings alone cannot remove; some people misuse scripture", 2],
        ["A supported judgement", 2],
      ],
      "Religious teachings can guide believers strongly. They teach forgiveness, the refusal of revenge and the search for reconciliation, and these values can calm tension. Religious leaders and bodies act as mediators and in interfaith groups, which gives the teachings practical form.\n\nHowever, believers interpret the teachings differently on whether force is ever justified: pacifists say never, supporters of the just war tradition say as a last resort under strict conditions, and Islam permits armed defence only under strict conditions. So the guidance is not always clear. Violence also has political, economic and social causes that teachings alone cannot remove, and some people misuse scripture. I conclude that the teachings are a strong guide to values and conduct, but they work best together with justice and fair institutions.",
      "Level marking: the strength of the guidance, the differences between believers, other causes of violence, and a supported judgement reach the top levels.", 300),
    ]),
    hints: ["In (a) give references and terms for at least two religions. In (b) weigh the guidance against differences among believers and other causes of violence."],
    explanation: "A Paper 2 style question: (a) describe teachings on peace, (b) judge how far they guide believers faced with violence.",
  });

  // 6. Paper 2: religion as a cause of conflict and of peace.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.conflict.religion-cause", "frs.conflict.resolution-methods"],
    stem: "This question is about religion, conflict and peace-building.",
    parts: checkExam(EXAM.ZIM_P2, [
      ex("(a)", 15, "Explain how religion can contribute to conflict.", [
        ["Religious intolerance: treating people of other beliefs as inferior or as enemies, often from ignorance and fear", 2],
        ["Extremism: a small group uses violence to impose rigid views; it is rejected by the great majority of believers", 2],
        ["Competition for converts: aggressive recruiting or insulting other faiths causes resentment in families and schools", 2],
        ["Disputes within a religion over leadership, doctrine, property or practice divide congregations", 2],
        ["Misuse of scripture: texts quoted out of context to justify hatred or violence", 2],
        ["Persecution: people attacked or discriminated against because of their faith, as with the persecution of Jews in Europe ending in the Holocaust (1941-45)", 2],
        ["Examples in outline: the Crusades from 1095 and the Northern Ireland Troubles (about 1968-1998), where religion marked communities in political conflicts", 2],
        ["Religion is seldom the only cause: politics, land and fairness are usually involved", 1],
      ],
      "Religion can contribute to conflict in several ways. Religious intolerance means treating people of other beliefs as inferior or as enemies, often from ignorance and fear. Extremism is when a small group uses violence to impose rigid views, though the great majority of believers reject it. Competition for converts can cause resentment when groups recruit aggressively or insult other faiths, and disputes within a religion over leadership, doctrine, property or practice can divide congregations.\n\nScripture can be misused when texts are quoted out of context to justify hatred or violence, and people can be persecuted because of their faith, as in the persecution of Jews in Europe which ended in the Holocaust of 1941-45. In outline, the Crusades from 1095 and the Northern Ireland Troubles of about 1968 to 1998 are examples where religion marked the communities in conflicts that also had political and economic causes. Religion is seldom the only cause, because politics, land and fairness are usually involved.",
      "Two marks for each developed point, one mark for the final point. Do not credit statements that blame one religion as a whole.", 400),
      ex("(b)", 10, "Assess the contribution of religious organisations to peace-building in Zimbabwe.", [
        ["Teaching forgiveness, justice and respect in congregations, madrasah, Sunday schools and Indigenous Religion teaching on unhu", 2],
        ["Mediation: elders at the dare/inkundla, imams and church committees (Matthew 18:15-17) settle disputes and restore relationships", 2],
        ["Joint action: the Zimbabwe Heads of Christian Denominations, interfaith councils and joint events for healing and relief", 2],
        ["Limits: religious bodies are sometimes divided, some leaders are silent, resources are limited, and political and economic causes of conflict need other action", 2],
        ["A supported judgement", 2],
      ],
      "Religious organisations make a real contribution to peace-building. They teach forgiveness, justice and respect in congregations, madrasah, Sunday schools and the teaching of unhu in Indigenous Religion. They mediate: elders at the dare or inkundla, imams and church committees following Matthew 18:15-17 settle disputes and restore relationships. They act together through the Zimbabwe Heads of Christian Denominations and interfaith councils, and in joint events for healing and relief.\n\nThere are limits. Religious bodies are sometimes divided, some leaders stay silent, resources are limited, and the political and economic causes of conflict need other action from the state and communities. I conclude that religious organisations are important and often trusted peace-builders, but they are most effective as partners with the state, the courts and the community and not as the only source of peace.",
      "Level marking: contributions with examples, limits, and a supported judgement reach the top levels.", 300),
    ]),
    hints: ["In (a) cover several ways and add an example in outline. In (b) give examples of peace-building and also the limits."],
    explanation: "A Paper 2 style question: (a) explain how religion can contribute to conflict, (b) assess religious peace-building in Zimbabwe.",
  });
});
