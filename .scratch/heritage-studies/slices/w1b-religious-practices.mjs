// W1b: indigenous religious practices (her.identity.religious-practices). Descriptive and respectful throughout.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.religious-practices", { file: "identity/religious-practices", keyPrefix: "identity.religious-practices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which name is used in **Ndebele** for God in indigenous belief?",
    options: [
      ["uMlimo", "Correct: uMlimo (also Mwali) is used in Ndebele."],
      ["Mwari", "Mwari is the usual Shona name."],
      ["amadlozi", "Amadlozi are ancestral spirits, not God."],
      ["isangoma", "An isangoma is a traditional healer or diviner."],
    ],
    answer: "A",
    explanation: "God is Mwari or Nyadenga in Shona and uMlimo (Mwali) in Ndebele: the creator, usually approached through the ancestors.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The spirits of a family's departed elders are called …",
    options: [
      ["midzimu / amadlozi", "Correct."],
      ["mhondoro", "Mhondoro are territorial or clan spirits linked to the land and rain."],
      ["mashave", "Mashave are alien or wandering spirits believed to give skills."],
      ["ngozi", "Ngozi is the avenging spirit of a person who was seriously wronged."],
    ],
    answer: "A",
    explanation: "Midzimu (Shona) and amadlozi (Ndebele) are family ancestral spirits, believed to protect and guide their descendants.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which form of spirit is believed to be the guardian of a whole territory and linked to rain?",
    options: [
      ["mhondoro", "Correct: territorial or clan spirits concerned with the land and rain."],
      ["midzimu", "Midzimu are the ancestors of a particular family."],
      ["mashave", "Mashave are believed to give individual skills."],
      ["ngozi", "Ngozi is an avenging spirit."],
    ],
    answer: "A",
    explanation: "Mhondoro are spirits of founding or royal ancestors and are consulted on matters affecting the whole community, such as rain.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Njelele, a shrine associated with Mwari/uMlimo where people have long sought rain, is in …",
    options: [
      ["the Matobo Hills", "Correct."],
      ["the Chimanimani Mountains", "Njelele is not in the Eastern Highlands."],
      ["the Zambezi Valley", "Njelele is in the south-west of the country."],
      ["the Great Dyke", "The Great Dyke is a mineral-rich ridge, not the site of Njelele."],
    ],
    answer: "A",
    explanation: "Njelele is in the Matobo Hills, south of Bulawayo. The Matobo Hills are also a UNESCO World Heritage Site (2003).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of a **spirit medium (svikiro)**?",
    options: [
      ["A person through whom a spirit is believed to speak to the living", "Correct."],
      ["A person chosen by the family to inherit a dead man's name and property", "That is an heir (mugari wenhaka/indlalifa)."],
      ["A go-between in marriage negotiations", "That is a munyai/umkhongi."],
      ["A paternal aunt who advises girls", "That is the vatete/ubabakazi."],
    ],
    answer: "A",
    explanation: "Spirit mediums are believed to carry the voice of a spirit, especially a mhondoro, and give guidance to families and communities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How do rules protecting sacred places help the environment?",
    options: [
      ["Bans on cutting trees and hunting there conserve forests, water and wildlife", "Correct: religious rules have a conservation effect."],
      ["They require farmers to clear new fields close to the sacred place every season", "This would harm the environment."],
      ["They allow unlimited harvesting by the medium's family", "Sacred places are protected from harvesting."],
      ["They move wildlife away from the area to towns", "This is not what the rules do."],
    ],
    hints: ["What is forbidden at a sacred place?"],
    answer: "A",
    explanation: "Sacred groves, pools and hills are protected by rules that, in practice, conserve vegetation, springs and animals.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A family whose member once caused a death agrees to pay compensation and holds a ceremony of reconciliation with the dead person's family. Which belief is this practice linked to?",
    options: [
      ["the belief in the avenging spirit (ngozi)", "Correct: the wrong must be put right between the families."],
      ["the belief in wandering or alien spirits (mashave)", "Mashave are linked to skills, not to wrongs done."],
      ["the rain-making ceremony", "Rain-making asks for rain."],
      ["the sharing of an estate", "Estate sharing follows a death in the family, not a wrong done to another family."],
    ],
    hints: ["Which spirit is linked to a serious wrong?"],
    answer: "A",
    explanation: "The ngozi belief teaches that serious wrongs, especially taking a life, must be acknowledged and put right through compensation and reconciliation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** describes relations between indigenous religion and Christianity in Zimbabwe today?",
    options: [
      ["They range from opposition to coexistence and blending, with many people following both", "Correct: relations take several forms."],
      ["All Christians fully reject every indigenous custom", "Many Christians keep customs such as kurova guva."],
      ["Indigenous religion has completely disappeared", "Many people still follow indigenous practices."],
      ["The law requires every citizen to follow the one religion chosen by the government of the day", "The Constitution protects freedom of religion."],
    ],
    hints: ["Avoid statements that say 'all' or 'completely'."],
    answer: "A",
    explanation: "Some churches oppose indigenous practices, many people combine them with Christianity, and African-initiated churches blend the two.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In indigenous belief there is one supreme God, the creator, usually approached through the ancestors.",
    answer: true,
    explanation: "True. God (Mwari/uMlimo/Nyadenga) is the creator; ancestors act as go-betweens.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mhondoro and midzimu are two names for exactly the same kind of spirit.",
    answer: false,
    explanation: "False. Midzimu are family ancestors; mhondoro are territorial or clan spirits concerned with the land and rain.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of spirit with its role in indigenous belief.",
    pairs: [
      ["midzimu / amadlozi", "protect and guide a family"],
      ["mhondoro", "guardians of a territory, linked to rain"],
      ["mashave", "believed to give special skills such as healing or dancing"],
      ["ngozi", "spirit of a person seriously wronged, seeking redress"],
    ],
    explanation: "Learn the forms of spirits with their roles; give the indigenous term and the English meaning in answers.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "An all-night ceremony with mbira music to honour and consult the spirits is a {{blank:a}}. The ceremony that brings home the spirit of a deceased person is kurova guva in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["bira"], choices: ["bira", "nhimbe", "roora", "zunde"] },
      { id: "b", accepted: ["umbuyiso"], choices: ["umbuyiso", "ilima", "lobola", "inxwala"] },
    ],
    explanation: "Bira; umbuyiso.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona word for a spirit medium.",
    accepted: ["svikiro", "masvikiro"],
    wrong: ["sekuru"],
    explanation: "**Svikiro** (plural masvikiro).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** indigenous religious practices.",
    points: ["One of: family offerings (kupira), bira", "A second (e.g. rain-making, mukwerera/ukucela izulu)", "A third (e.g. kurova guva/umbuyiso)", "A fourth (e.g. respect for sacred places, consulting spirit mediums)"],
    modelAnswer: "Bira; rain-making (mukwerera/ukucela izulu); kurova guva/umbuyiso; respecting sacred places.",
    explanation: "One mark per practice.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which indigenous religious practices are significant to a community.",
    points: [
      "Unity",
      "ceremonies such as rain-making bring the whole community together",
      "Moral guidance",
      "belief that ancestors watch over people, and the ngozi belief, encourage good behaviour and putting wrongs right",
      "Environmental care or heritage",
      "sacred places protect forests and water / mbira music and oral tradition are kept alive",
    ],
    modelAnswer: "Ceremonies such as rain-making and bira bring the whole community together, building unity. Beliefs that the ancestors watch over their descendants, and the belief in the avenging spirit, encourage good behaviour and the putting right of wrongs. Rules protecting sacred places conserve forests, springs and wildlife, and ceremonies keep mbira music and oral traditions alive.",
    hints: ["Think of people, morals and the environment."],
    explanation: "Two marks per point. Identity, continuity and comfort in grief are also creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A school has pupils from Christian, Muslim and indigenous-religion families. Suggest **two** ways it could promote respect between faiths.",
    points: [
      "Suggests teaching about each faith factually, e.g. a lesson or project on beliefs and festivals",
      "Explains that understanding reduces prejudice and mockery",
      "Suggests rules or agreements against mocking any faith, or an inter-faith event",
      "Explains that pupils learn tolerance (Unhu) and freedom of religion",
    ],
    modelAnswer: "The school could teach about each faith factually, for example through projects on beliefs, festivals and ceremonies, so pupils understand one another and prejudice falls. It could also agree a rule that no faith is mocked and hold an event where pupils share their traditions respectfully, teaching tolerance and the constitutional right to freedom of religion.",
    hints: ["Think of knowledge and rules of behaviour."],
    explanation: "Credit sensible, respectful suggestions with explanations.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "an account by a fictional elder in Chiredzi District, 2026",
      "Every year before the rains we gather at the foot of the hill. The women brew beer from grain each family gives. The medium leads us, and we sing and dance until late. Nobody cuts trees on that hill, and nobody fishes in the pool below it. Some of our young people now go to church instead, but many come back for this ceremony because it is who we are.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which ceremony is the elder describing?",
        options: [
          ["mukwerera / ukucela izulu (rain-making)", "Correct: it is held every year before the rains."],
          ["kurova guva / umbuyiso", "That follows a death, not the start of the rains."],
          ["nhimbe / ilima", "A work party is held to help with farm work, not before the rains with a medium."],
          ["a harvest thanksgiving ceremony after reaping", "Thanksgiving follows the harvest, not the start of the rains."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** rules about the sacred place mentioned in the account.",
        points: ["Nobody cuts trees on the hill", "Nobody fishes in the pool below"],
        modelAnswer: "No cutting trees on the hill; no fishing in the pool.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why many young people return for the ceremony, according to the elder.",
        points: [
          "The ceremony is part of their identity ('who we are')",
          "it links them to their community and ancestors",
          "so even those who attend church value it as heritage / coexistence of faiths",
        ],
        modelAnswer: "The elder says the ceremony is 'who we are': it is part of the young people's identity, linking them to their community and ancestors. So even those who now go to church return for it, showing that many people value it as heritage and keep more than one tradition.",
      }),
    ],
    hints: ["Use the elder's own words in (c)."],
    explanation: "A source-based practice item (6 marks) on rain-making, sacred places and coexistence of faiths.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous religion today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** forms of spirits in indigenous belief.",
        points: [
          ["Midzimu/amadlozi: family ancestors who protect and guide descendants and are honoured at family rituals", 2],
          ["Mhondoro: territorial/clan spirits of founding or royal ancestors, guardians of the land and linked to rain (or mashave/ngozi described)", 2],
        ],
        modelAnswer: "Midzimu (amadlozi) are the spirits of a family's departed elders, believed to protect and guide their descendants, who honour them at family rituals. Mhondoro are territorial or clan spirits of founding or royal ancestors, believed to be guardians of the land and consulted about rain through spirit mediums.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous religious practices still play an important part in Zimbabwean life.\" Discuss.",
        points: [
          ["For: kurova guva/umbuyiso, family offerings and ceremonies are still widely held; identity and heritage", 2],
          ["For: sacred places and rules still conserve environments; mbira and ceremonies keep culture alive", 2],
          ["Against: many people follow Christianity or Islam; some churches oppose indigenous practices; urbanisation reduces ceremonies", 2],
          ["Supported judgement, e.g. important for many, often alongside other faiths", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous practices remain important for many Zimbabweans. Kurova guva and umbuyiso are still widely held, many families inform and honour their ancestors at important moments, and rain-making ceremonies continue in some areas. These practices give identity and keep mbira music and oral tradition alive, and rules at sacred places still protect forests and water.\n\nHowever, most Zimbabweans also follow Christianity, and some follow Islam or other faiths. Some churches discourage indigenous practices, and in towns people have fewer opportunities to take part.\n\nOn balance, indigenous practices still play an important part, but usually alongside other faiths rather than instead of them. Many people combine traditions, and the Constitution's protection of freedom of religion allows each person to choose.",
      }),
    ],
    hints: ["In (b), remember that many people follow more than one tradition."],
    explanation: "A practice evaluative item on the place of indigenous religion today.",
  });

  b.card("FACT", "Give three names for God in indigenous belief.", "Mwari and Nyadenga (Shona); uMlimo or Mwali (Ndebele).");
  b.card("DEFINITION", "Midzimu / amadlozi", "Family ancestral spirits, believed to protect and guide their descendants.");
  b.card("DEFINITION", "Mhondoro", "Territorial or clan spirits of founding or royal ancestors, guardians of the land and linked to rain.");
  b.card("DEFINITION", "Mashave", "Alien or wandering spirits believed to give special skills such as healing, hunting or dancing.");
  b.card("DEFINITION", "Ngozi", "The avenging spirit of a person seriously wronged; the wrong must be put right through compensation and reconciliation.");
  b.card("DEFINITION", "Spirit medium (svikiro)", "A person through whom a spirit is believed to speak to the living.");
  b.card("FACT", "Where is the Njelele shrine?", "In the Matobo Hills; it is associated with Mwari/uMlimo and rain.");
  b.card("CONCEPT", "How do sacred places help the environment?", "Bans on cutting trees, hunting or fishing there conserve forests, springs and wildlife.");
  b.card("CONCEPT", "How do indigenous religion and Christianity relate today?", "Opposition from some, coexistence for many (following both), blending in African-initiated churches, and dialogue.");
});
