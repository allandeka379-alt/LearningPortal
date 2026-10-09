// Slice W4b: the British in India and the events of 1857 (0470 Option A key question 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.imperialism.india-1857", { file: "imperialism/india-1857", keyPrefix: "imperialism.india-1857" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where did the sepoy rising of 10 May 1857 begin?",
    options: [
      ["Meerut", "Correct: the rebels then marched to Delhi."],
      ["Lucknow", "Lucknow, capital of Awadh, saw a long siege of the British Residency."],
      ["Bombay", "The Bombay army stayed largely loyal."],
      ["Calcutta", "Calcutta was the seat of the Company's government and did not rise."],
    ],
    answer: "A",
    explanation: "The rising began at **Meerut** on 10 May 1857.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which law transferred the government of India from the East India Company to the Crown?",
    options: [
      ["The Government of India Act 1858", "Correct: India was then ruled through a Secretary of State and a Viceroy."],
      ["The Royal Titles Act 1876", "This act let Victoria take the title Empress of India (1877)."],
      ["The Hindu Widows' Remarriage Act 1856", "This was a social reform passed before the rising."],
      ["The General Service Enlistment Act 1856", "This required new sepoy recruits to serve overseas."],
    ],
    answer: "A",
    explanation: "The **Government of India Act 1858** ended Company rule.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the Doctrine of Lapse?",
    options: [
      ["Annexing a state whose ruler died without a natural male heir", "Correct: adopted sons were not recognised, as at Jhansi."],
      ["Allowing sepoys to leave the army after twenty years' service", "This was not the Doctrine of Lapse."],
      ["Ending the use of Persian in Indian law courts", "This was a different language policy."],
      ["Taking land from farmers who failed to pay their land revenue on time", "Land could be sold for unpaid revenue, but that was not the Doctrine of Lapse."],
    ],
    answer: "A",
    explanation: "Under the **Doctrine of Lapse**, Dalhousie annexed states such as Satara, Jhansi and Nagpur.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the new Enfield rifle cartridges anger sepoys in 1857?",
    options: [
      ["They were rumoured to be greased with cow and pig fat", "Correct: biting them would offend both Hindus and Muslims."],
      ["They were too expensive and sepoys had to buy them", "Cost was not the issue; the grease was."],
      ["They were made in Russia, Britain's rival", "The cartridges were British."],
      ["They could only be fired by British officers, not by sepoys", "Sepoys were issued with them; that was the problem."],
    ],
    answer: "A",
    explanation: "The **greased cartridges** rumour struck at the religious beliefs of Hindus and Muslims alike.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was proclaimed leader of the rebels in Delhi in 1857?",
    options: [
      ["Bahadur Shah II, the Mughal emperor", "Correct: he was later exiled to Burma."],
      ["Lord Canning, the Governor-General", "Canning was the British Governor-General who led the response."],
      ["Mangal Pandey, a sepoy at Barrackpore", "Pandey attacked officers in March 1857 and was hanged; he did not lead the rising."],
      ["Ranjit Singh, ruler of the Punjab", "Ranjit Singh died in 1839."],
    ],
    answer: "A",
    explanation: "The rebels proclaimed the elderly **Bahadur Shah II** as their leader, a symbol of Indian rule.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the annexation of Awadh in 1856 especially dangerous for the British?",
    options: [
      ["Many sepoys of the Bengal army came from Awadh", "Correct: the annexation offended them and their families directly."],
      ["Awadh was the home of the Sikh soldiers on whom the British depended", "Sikhs came mainly from the Punjab, which helped the British in 1857."],
      ["Awadh had a large French army ready to fight Britain", "There was no French army in Awadh."],
      ["Awadh controlled all India's ports and trade", "Awadh was an inland state."],
    ],
    hints: ["Think about where the soldiers were recruited."],
    answer: "A",
    explanation: "Annexing **Awadh**, the home of many Bengal sepoys, turned soldiers' loyalty into resentment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these helps to explain why the rising of 1857 failed?",
    options: [
      ["The Bombay and Madras armies and many princes stayed loyal", "Correct: the rising never became India-wide."],
      ["The rebels captured Calcutta and lost interest", "The rebels never captured Calcutta."],
      ["Russia sent an army to help the British", "No Russian army intervened."],
      ["The Mughal emperor ordered the rebels to surrender in May 1857", "He was proclaimed leader by the rebels; he did not order surrender at the start."],
    ],
    hints: ["How far did the rising spread?"],
    answer: "A",
    explanation: "The rising was **confined to the north and centre**; loyal troops and princes allowed the British to recover.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports calling the events of 1857 more than a military mutiny?",
    options: [
      ["Peasants, landlords and princes joined the sepoys in many areas", "Correct: civilian participation shows a wider rebellion."],
      ["The rising began with soldiers at Meerut", "This supports the 'mutiny' interpretation."],
      ["Sepoys complained about pay and overseas service", "This is a military grievance, supporting 'mutiny'."],
      ["The trigger was the issue of new rifle cartridges to the Bengal regiments", "This is a military trigger, supporting 'mutiny'."],
    ],
    hints: ["Who took part apart from soldiers?"],
    answer: "A",
    explanation: "**Civilian participation** is the main evidence that 1857 was a rebellion, not only a mutiny.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rani Lakshmibai of Jhansi was a leader of the rising of 1857-58.",
    answer: true,
    explanation: "True. Jhansi had been annexed under the Doctrine of Lapse; she was killed in battle in June 1858.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After 1858 the proportion of Indian soldiers in the army in India was increased to reward their loyalty.",
    answer: false,
    explanation: "False. The proportion of British soldiers was increased, and artillery was kept in British hands.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Sepoy", "An Indian soldier in the Company's army"],
      ["Doctrine of Lapse", "Annexation of states whose rulers had no natural heir"],
      ["The Raj", "British Crown rule in India from 1858"],
      ["Viceroy", "The Crown's representative who governed India"],
    ],
    explanation: "Sepoy, Doctrine of Lapse, the Raj and Viceroy are the key terms of this topic.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Rising at Meerut",
      "Battle of Plassey",
      "Government of India Act",
      "Annexation of Awadh",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["One of these happened a century before the others."],
    explanation: "Plassey (1757); Awadh (1856); Meerut (May 1857); Government of India Act (1858).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The British recaptured Delhi in {{blank:a}} of the year 1857. The last Mughal emperor was exiled to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["September"], choices: ["May", "September", "December", "March"] },
      { id: "b", accepted: ["Burma"], choices: ["Burma", "Britain", "Ceylon", "Persia"] },
    ],
    explanation: "Delhi fell to the British in **September** 1857; Bahadur Shah was exiled to **Burma** (Rangoon).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Governor-General (1848-1856) who annexed several Indian states under the Doctrine of Lapse.",
    accepted: ["Dalhousie", "Lord Dalhousie", "Marquess of Dalhousie", "James Broun-Ramsay"],
    wrong: ["Canning"],
    explanation: "**Lord Dalhousie** annexed Satara, Jhansi, Nagpur and Awadh.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the changes made to British rule in India after 1858.",
    points: [
      "Company rule ended; Crown rule through a Secretary of State and a Viceroy (Government of India Act 1858).",
      "Victoria's proclamation promised religious toleration and respect for princes.",
      "Doctrine of Lapse / annexations ended.",
      "Army reorganised: more British soldiers, artillery in British hands, recruitment from loyal groups.",
    ],
    modelAnswer: "The Government of India Act 1858 ended the rule of the East India Company; India was governed by the Crown through a Secretary of State in London and a Viceroy in India. Queen Victoria's proclamation of November 1858 promised religious toleration and respect for the rights of the princes, and the Doctrine of Lapse was abandoned. The army was reorganised: the proportion of British soldiers was increased, artillery was kept in British hands and more recruits came from groups that had stayed loyal, such as Sikhs and Gurkhas.",
    explanation: "One mark per accurate change.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why many Indians feared that British rule threatened their religion.",
    points: [
      "Identifies the activity of Christian missionaries.",
      "Explains that many feared the British intended to convert them.",
      "Identifies laws seen as interference (ban on sati 1829; Widows' Remarriage Act 1856; overseas service 1856).",
      "Explains that these seemed to attack custom and caste, so the cartridge rumour was believed.",
    ],
    hints: ["Think about missionaries and about laws."],
    modelAnswer: "Christian missionaries were active in India, and many Indians believed the British intended to convert them. Laws such as the ban on sati (1829) and the Hindu Widows' Remarriage Act (1856), which the British saw as reforms, seemed to many to interfere with religion and custom, and the 1856 law requiring overseas service threatened high-caste sepoys with loss of caste. Because of these fears, the rumour that cartridges were greased with cow and pig fat was easily believed.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the British were able to defeat the rising of 1857.",
    points: [
      "Identifies the limited spread of the rising.",
      "Explains that the Bombay and Madras armies and many princes stayed loyal.",
      "Identifies help from loyal troops (Sikhs, Gurkhas).",
      "Explains that troops from the Punjab helped to recapture Delhi.",
      "Identifies weaknesses of the rebels (no single leader or plan) / British reinforcements.",
      "Explains that rebels acted separately, while Britain brought troops by sea and used superior weapons and organisation.",
    ],
    hints: ["Where did the British find support, and what did the rebels lack?"],
    modelAnswer: "The rising was confined mainly to the north and centre of India; the Bombay and Madras armies stayed largely loyal, and many princes supported the British. The British also had help from troops who had not joined the rising, especially Sikhs from the recently conquered Punjab and Gurkhas from Nepal, who helped recapture Delhi in September 1857. The rebels had no single leader or common plan, and each centre fought separately, while Britain could bring in reinforcements by sea and had better organisation and supplies.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter from a fictional British officer in the Bengal army to his father in England, June 1857", "The sepoys have been led astray by agitators and by foolish tales about cartridges. They had good pay, a pension and the honour of serving the Company. This is a mutiny of ungrateful soldiers, nothing more, and once Delhi is retaken the country will be quiet.")}\n\n${source("Source B", "an account by a fictional Indian scholar of Awadh, written in the 1880s from his memories as a young man", "In my village it was not only the soldiers who rose. The landowners who had lost their estates to the new revenue settlement gathered their men. Our king had been sent away and his state taken. People said the Company meant to take our faith next, as it had taken our land.")}`,
    hints: ["Compare who took part and why, according to each writer."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about how this British officer understood the rising?", points: [
        "As a mutiny of soldiers only / not a popular rising.",
        "Caused by agitators and rumours, not real grievances; expected it to end quickly.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the causes of the rising?", points: [
        "Agree: both mention a religious or rumour element (cartridge tales; fear for faith).",
        "Disagree: A says only soldiers rose; B says landowners and villagers rose too.",
        "Disagree: A denies real grievances (good pay); B gives political and economic grievances (land, annexation of Awadh).",
        "Judgement: they disagree about the nature of the rising.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source B for understanding why people in Awadh joined the rising? Use the source and your own knowledge.", points: [
        "Useful: an Indian voice from Awadh, showing civilian participation.",
        "Confirmed: Awadh annexed in 1856, its king deposed; revenue settlement dispossessed landowners (taluqdars).",
        "Confirmed: fears about religion (missionaries, reforms).",
        "Limitation: written in the 1880s from memory, possibly shaped by later events or views.",
        "Limitation: one village; may not represent all of Awadh or India.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is useful because it gives an Indian view from Awadh, the centre of the rising, and shows that civilians as well as soldiers took part. My knowledge supports its points: Awadh was annexed in 1856 and its king deposed, and the new revenue settlement took estates from many landowners, who then led their followers into revolt; fears that the British would attack religion were also widespread. However, the account was written in the 1880s from memories of youth, so it may be shaped by later events and by growing Indian nationalism, and it describes only one village. It is very useful for Awadh's grievances, though less useful for India as a whole.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the cartridges with the deeper grievances."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the rising of 1857-58.", points: [
        "Meerut rising (10 May 1857); march to Delhi; Bahadur Shah proclaimed.",
        "Spread across northern and central India: Kanpur, Lucknow, Jhansi.",
        "Violence on both sides: killings of British civilians at Kanpur; mass British reprisals.",
        "British recaptured Delhi (September 1857) and Lucknow (March 1858); Rani of Jhansi killed (June 1858); rising crushed by 1858.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"The greased cartridges were the main cause of the rising of 1857.\" How far do you agree? Explain your answer.", points: [
        ["Agree: the cartridges triggered the Meerut rising; the rumour united Hindus and Muslims.", 2],
        ["Agree: wider military grievances (pay, promotion, overseas service) explain why the rumour was believed.", 2],
        ["Disagree: political grievances: Doctrine of Lapse, annexation of Awadh, the Mughal emperor.", 2],
        ["Disagree: economic and religious grievances: land revenue, missionaries, reforms; civilians joined.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The cartridges were important because they triggered the rising. The rumour that they were greased with cow and pig fat offended both Hindus and Muslims, and when sepoys at Meerut were punished for refusing them, their comrades rose on 10 May 1857. The rumour was believed because sepoys already had grievances over pay, promotion and the 1856 law on overseas service.\n\nHowever, the deeper causes were much broader. Dalhousie's Doctrine of Lapse had annexed states such as Jhansi, and the annexation of Awadh in 1856 angered the many sepoys who came from there and its landowners. Heavy land revenue demands had dispossessed landlords, and missionaries and reforms made many fear for their religion. These grievances explain why peasants, landlords and princes joined the soldiers, which the cartridges alone cannot explain.\n\nOverall I disagree. The cartridges were the trigger, but the main causes were the political, economic and religious grievances built up under Company rule.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Sepoy", "An Indian soldier in the armies of the East India Company.");
  b.card("DEFINITION", "Doctrine of Lapse", "Annexation of a princely state whose ruler died without a natural male heir (Dalhousie, 1848-1856).");
  b.card("FACT", "When and where did the rising of 1857 begin?", "At Meerut on 10 May 1857.");
  b.card("FACT", "When was Awadh annexed?", "1856, on grounds of misgovernment; many Bengal sepoys came from there.");
  b.card("FACT", "When did the British recapture Delhi?", "September 1857.");
  b.card("FACT", "What did the Government of India Act 1858 do?", "Ended East India Company rule; India was ruled by the Crown through a Secretary of State and a Viceroy.");
  b.card("DEFINITION", "The Raj", "British Crown rule over India, 1858-1947.");
  b.card("FACT", "What three names are given to the events of 1857?", "The Indian Mutiny, the Rebellion (or Rising) of 1857, and the First War of Independence.");
  b.card("CONCEPT", "Why did the rising of 1857 fail?", "It was limited to the north and centre; Bombay and Madras armies, Sikhs, Gurkhas and many princes stayed loyal; the rebels lacked unity.");
});
