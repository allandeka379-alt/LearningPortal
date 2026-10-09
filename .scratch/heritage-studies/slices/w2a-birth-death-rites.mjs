// W2a: Birth and death rites and ceremonies (her.culture.birth-death-rites).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.birth-death-rites", { file: "culture/birth-death-rites", keyPrefix: "culture.birth-death-rites" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **kurova guva / umbuyiso**?",
    options: [
      ["A ceremony held some time after burial to bring the spirit of the dead home", "Correct: it welcomes the deceased back as an ancestor."],
      ["The washing of hands by mourners straight after the burial", "This is cleansing on the day of burial, not the later ceremony."],
      ["The custom of a woman giving birth to her first child at the home of her own parents", "This is masungiro, a birth custom."],
      ["The night-long gathering of mourners before the burial", "This is the wake, before the burial."],
    ],
    answer: "A",
    explanation: "Kurova guva (Shona) and umbuyiso (Ndebele) are held some time after the burial, often about a year later, to bring the spirit home as an ancestor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At an indigenous funeral, who usually digs the grave and helps with the burial?",
    options: [
      ["the sons-in-law (vakwasha/abakhwenyana)", "Correct: sons-in-law carry out many funeral duties."],
      ["the widow and her daughters alone", "The widow mourns; heavy funeral work is done by others."],
      ["the traditional midwife (nyamukuta)", "The nyamukuta helps at births, not burials."],
      ["the go-between (munyai/umkhongi)", "The go-between leads marriage negotiations, not burials."],
    ],
    answer: "A",
    explanation: "Sons-in-law (vakwasha in Shona, abakhwenyana in Ndebele) have special duties at funerals, including digging the grave.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did mother and newborn baby traditionally stay indoors for a period after the birth?",
    options: [
      ["So that they could rest and be protected from infection and harm", "Correct: the period indoors protected both mother and baby."],
      ["Because the baby could not be given a name until it was at least a year old", "Naming did not require a year indoors."],
      ["Because the father's family had not yet paid bride wealth", "Bride wealth is a marriage matter, not the reason for confinement."],
      ["So that the midwife could prepare for kurova guva", "Kurova guva is a death ceremony."],
    ],
    answer: "A",
    explanation: "The period indoors, often until the umbilical cord fell off, let the mother rest and protected both from infection and harm while relatives did the work.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does the Ndebele name **Sipho** mean?",
    options: [
      ["gift", "Correct: Sipho means gift."],
      ["hope", "Hope is Themba."],
      ["love", "Love (Shona) is Rudo."],
      ["be thankful", "Be thankful (Shona) is Tendai."],
    ],
    answer: "A",
    explanation: "Names often carry meaning: Sipho (gift), Themba (hope), Rudo (love), Tendai (be thankful).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A family names their baby Tafadzwa, meaning 'we have been made happy'. What does this show about indigenous naming?",
    options: [
      ["Names often record the family's feelings at the time of birth", "Correct: the name expresses the family's joy."],
      ["Names are always chosen from an official list that is issued by the chief", "There is no such list; families choose names."],
      ["Names are given only after kurova guva has been held", "Kurova guva is a death ceremony, unrelated to naming."],
      ["Names have no meaning and are chosen for their sound", "The example shows a name with a clear meaning."],
    ],
    answer: "A",
    hints: ["What feeling does the name express?"],
    explanation: "Many indigenous names record circumstances or feelings at the birth, giving the child a link to the family's history.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which practice is a **Muslim** death rite in Zimbabwe?",
    options: [
      ["Burying the dead quickly after washing and wrapping the body in white cloth", "Correct: Muslim burial is usually quick, with the body washed and wrapped in white cloth."],
      ["Holding kurova guva about a year after the death to bring the spirit of the dead home", "This is an indigenous ceremony."],
      ["Unveiling a tombstone at a church memorial service", "This is a common Christian practice."],
      ["Sending the widow to her parents' home to give birth", "This describes a birth custom, not a death rite."],
    ],
    answer: "A",
    hints: ["Each faith has its own rites; match the practice to the faith."],
    explanation: "Muslim families usually bury the dead quickly, often within a day, after washing the body and wrapping it in white cloth.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A burial society pays for a coffin and its members cook at the funeral. Which indigenous value does this **best** show continuing in a new form?",
    options: [
      ["sharing the burden of death among neighbours", "Correct: the society spreads cost and work, as neighbours did in the village."],
      ["the payment of bride wealth in instalments", "Bride wealth is a marriage custom."],
      ["the right of the heir to inherit all property", "The society is not about inheritance."],
      ["keeping mother and baby indoors after the birth", "This is a birth custom."],
    ],
    answer: "A",
    hints: ["The form is new; what is the value behind it?"],
    explanation: "Burial societies are modern organisations, but they keep the indigenous value of neighbours sharing the cost and work of a funeral.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about threats to death rites is **best supported**?",
    options: [
      ["Urbanisation and cost have changed funerals, but many families adapt the rites", "Correct: it recognises change and adaptation."],
      ["Death rites have disappeared completely in Zimbabwe", "Overstated: funerals and many rites continue."],
      ["Death rites have not changed at all since the days before towns and mortuaries existed", "Wrong: mortuaries, funeral companies and church services show change."],
      ["Only indigenous religion has any death rites at all", "Wrong: every faith has its own death rites."],
    ],
    hints: ["Avoid statements that use 'completely', 'not at all' or 'only'."],
    answer: "A",
    explanation: "Funerals have changed in form (mortuaries, burial societies, church services, smaller gatherings), but families adapt the rites rather than abandon them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Parents must register a baby's birth with the Registrar General to obtain a birth certificate.",
    answer: true,
    explanation: "True. The Registrar General issues birth certificates, which a child needs for school and later for an identity document.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Kurova guva/umbuyiso usually takes place on the same day as the burial.",
    answer: false,
    explanation: "False. It is a separate ceremony held some time after the burial, often about a year later.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of indigenous death rites with its purpose.",
    pairs: [
      ["announcing the death", "gathering relatives and neighbours quickly"],
      ["the wake", "comforting and supporting the bereaved"],
      ["washing hands after the burial", "marking the end of contact with death"],
      ["kurova guva / umbuyiso", "welcoming the spirit home as an ancestor"],
    ],
    explanation: "Each stage has its own purpose, from gathering the community to welcoming the deceased back as an ancestor.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In many Shona families, a woman goes to her parents' home for the birth of her first child; this custom is called {{blank:a}}. A traditional midwife is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["masungiro"], choices: ["masungiro", "kuperekwa", "kutizira", "kugova nhumbi"] },
      { id: "b", accepted: ["nyamukuta"], choices: ["nyamukuta", "munyai", "svikiro", "sekuru"] },
    ],
    explanation: "Masungiro and nyamukuta. Kuperekwa is handing over a bride; kutizira is elopement; a munyai is a marriage go-between; a svikiro is a spirit medium.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Kurova guva is often held about {{blank:a}} after the burial, and matters of {{blank:b}} are often settled at that time.",
    blanks: [
      { id: "a", accepted: ["a year"], choices: ["a year", "an hour", "a week", "ten years"] },
      { id: "b", accepted: ["inheritance"], choices: ["inheritance", "bride wealth", "land tax", "school fees"] },
    ],
    hints: ["The ceremony also decides who takes on the deceased's responsibilities."],
    explanation: "Kurova guva is often held about a year after death; the deceased's belongings and responsibilities are often shared out then.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Ndebele name for the ceremony of bringing the spirit of the dead home.",
    accepted: ["umbuyiso", "umbuyisa", "ukubuyisa"],
    wrong: ["umthimba", "kurova guva"],
    explanation: "**Umbuyiso** is the Ndebele term; kurova guva is the Shona term for the same ceremony.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** stages of indigenous death rites.",
    points: [
      "Any one of: announcing the death, preparing the body, the wake, burial, cleansing (washing hands), mourning, kurova guva/umbuyiso, sharing the deceased's belongings",
      "A second stage",
      "A third stage",
      "A fourth stage",
    ],
    modelAnswer: "Announcing the death, the wake, burial and kurova guva/umbuyiso.",
    explanation: "One mark per correct stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why death rites are important to a community.",
    points: [
      "Identifies unity and support / Unhu",
      "Explains that neighbours share work, food and grief, so the bereaved are not alone",
      "Identifies respect for the dead / link with the ancestors / education of the young",
      "Explains, e.g. many believe the rites guide the dead to join the ancestors who protect the family / children learn how to behave",
    ],
    modelAnswer: "Death rites unite the community: neighbours share the work, food and grief, so the bereaved family is not left alone, which is Unhu in action. They also show respect for the dead, and for many families the rites guide the deceased to join the ancestors who watch over the family.",
    hints: ["Think of the community and of belief."],
    explanation: "One mark for each reason and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which an urban family can keep the meaning of indigenous death rites despite living in a small flat, and explain each.",
    points: [
      "Suggests joining a burial society / church or community group",
      "Explains that members share costs and work, as neighbours did in the village",
      "Suggests holding the burial or ceremony at the rural home / involving elders by phone or video",
      "Explains that this keeps the link with the extended family, the ancestors' home or elders' guidance",
    ],
    modelAnswer: "The family can join a burial society, whose members share funeral costs and help with cooking, as neighbours did in the village. They can also hold the burial or kurova guva at the rural home and involve elders, by phone if necessary, so the extended family stays involved and the rites are carried out with guidance.",
    hints: ["Think about cost, space and the extended family."],
    explanation: "Credit sensible suggestions (1 each) with explanations (1 each).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "an extract from a fictional pupil's diary, Masvingo, 2026",
      "Gogo died on Monday. By evening the yard was full of people. Mai Tendai and other women cooked, and my uncles' sons-in-law went to dig the grave. We sang all night. After the burial on Wednesday, everyone washed their hands at the gate before coming back in. My aunt says that next year we will hold a ceremony to bring Gogo home.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which ceremony does the aunt plan for next year?",
        options: [
          ["kurova guva / umbuyiso", "Correct: the ceremony to bring the spirit home."],
          ["kuperekwa / umthimba", "This is a marriage ceremony."],
          ["masungiro", "This is a birth custom."],
          ["nhimbe / ilima", "This is a communal work party."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** stages of indigenous death rites shown in the source.",
        points: ["The wake (singing all night) / gathering of neighbours", "Burial with sons-in-law digging the grave / cleansing (washing hands at the gate)"],
        modelAnswer: "The wake, when they sang all night, and the cleansing, when everyone washed their hands at the gate.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the events in the source show Unhu.",
        points: [
          "Neighbours came at once without being asked, showing oneness",
          "Women cooked and men dug the grave, sharing the work (sharing/compassion)",
          "The community stayed with the family through the night, comforting the bereaved",
        ],
        modelAnswer: "Neighbours came at once without being asked, which shows oneness. The women cooked and the sons-in-law dug the grave, so the work was shared and the family was supported. People stayed all night singing, comforting the bereaved, which shows compassion.",
      }),
    ],
    hints: ["In (c), think of oneness, sharing and compassion."],
    explanation: "A source-based practice item on the stages and meaning of death rites.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about birth and death rites today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** threats to indigenous birth and death rites.",
        points: [
          ["Urbanisation and migration: small homes, relatives far away, people unable to travel", 2],
          ["Cost / religious change / hospitals, mortuaries and funeral companies taking over family tasks", 2],
        ],
        modelAnswer: "Urbanisation and migration mean that families live far apart in small homes, so relatives cannot always gather or carry out the rites at home. Funeral costs have risen, and hospitals, mortuaries and funeral companies now do many tasks that relatives once did.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous death rites are disappearing in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: smaller funerals in towns; funeral companies and mortuaries; cost; some churches reject kurova guva", 2],
          ["For: COVID-19 rules showed rites could be cut back; migration separates families", 2],
          ["Against: wakes, sons-in-law's duties, hand-washing and burial at the rural home continue; burial societies keep the communal value; many families still hold kurova guva/umbuyiso", 2],
          ["Supported judgement, e.g. rites are adapting rather than disappearing", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. In towns funerals are often smaller and shorter, and mortuaries and funeral companies do tasks that relatives once did. Costs have risen, and some churches discourage kurova guva. During the COVID-19 pandemic, limits on gatherings meant many funerals were very small, and migration means some relatives cannot attend at all.\n\nHowever, much remains. Neighbours still gather and sing at wakes, sons-in-law still dig graves, mourners still wash their hands after burials, and many urban families bury their dead at the rural home. Burial societies keep the old value of sharing the burden. Many families still hold kurova guva or umbuyiso, and some hold both a memorial service and the indigenous ceremony.\n\nI disagree with the statement to a large extent. Indigenous death rites are changing in form, but their main meanings of respect, unity and support survive in most families.",
      }),
    ],
    hints: ["In (b), separate changes in form from loss of meaning."],
    explanation: "A practice evaluative item on threats to death rites and how far they survive.",
  });

  b.card("DEFINITION", "Kurova guva / umbuyiso", "A ceremony held some time after burial, often about a year later, to bring the spirit of the deceased home as an ancestor.");
  b.card("DEFINITION", "Masungiro", "In many Shona families, the custom of a woman going to her parents' home for the birth of her first child.");
  b.card("FACT", "Who digs the grave at many indigenous funerals?", "The sons-in-law (vakwasha / abakhwenyana).");
  b.card("FACT", "Name four stages of indigenous death rites.", "Any four of: announcing the death, preparing the body, the wake, burial, cleansing, mourning, kurova guva/umbuyiso.");
  b.card("CONCEPT", "Why did mother and baby stay indoors after birth?", "To rest and to be protected from infection and harm while relatives did the work.");
  b.card("FACT", "What do the names Rudo, Tendai and Themba mean?", "Rudo: love. Tendai: be thankful. Themba: hope.");
  b.card("CONCEPT", "Give three reasons why death rites matter.", "Unity and support for the bereaved; respect for the dead and, for many, the link with the ancestors; teaching the young how to behave.");
  b.card("CONCEPT", "Name three threats to birth and death rites.", "Urbanisation and migration; rising costs; religious change; hospitals, mortuaries and funeral companies taking over family tasks.");
  b.card("FACT", "Who issues birth certificates in Zimbabwe?", "The Registrar General.");
});
