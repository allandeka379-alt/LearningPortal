// W2a: ahist.liberation.early-nationalism (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.early-nationalism", { file: "liberation/early-nationalism", keyPrefix: "liberation.early-nationalism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who became the first president of the Southern Rhodesia African National Congress in 1957?",
    options: [
      ["Joshua Nkomo", "Correct: he led Congress from its formation."],
      ["Ndabaningi Sithole", "Sithole later led ZANU, formed in 1963."],
      ["Robert Mugabe", "Mugabe was not Congress president."],
      ["Benjamin Burombo", "Burombo led the African Voice Association."],
    ],
    answer: "A",
    explanation: "Joshua Nkomo, a former railway union official, became president of the Southern Rhodesia African National Congress in September 1957.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Federation of Rhodesia and Nyasaland formed?",
    options: [
      ["1953", "Correct: the Federation lasted from 1953 to 1963."],
      ["1923", "This is the year of Responsible Government."],
      ["1965", "This is the year of UDI."],
      ["1980", "This is the year of independence."],
    ],
    answer: "A",
    explanation: "The Federation was formed in 1953 and dissolved on 31 December 1963.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did African trade unions have little power in Southern Rhodesia before 1957?",
    options: [
      ["The law did not count Africans as employees, so their unions had no right to bargain", "Correct: the Industrial Conciliation Act of 1934 excluded them."],
      ["Employers had agreed to pay Africans the same wages as whites in all industries", "Pay was far lower for Africans."],
      ["The government had ordered all unions to join the Federation's Congress", "No such order existed."],
      ["African workers were all employed on farms with no wage payments at all", "Many Africans worked for wages in towns and mines."],
    ],
    answer: "A",
    explanation: "The Industrial Conciliation Act of 1934 defined 'employee' so as to exclude Africans, leaving their unions without legal rights.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Salisbury bus boycott of 1956 show?",
    options: [
      ["Mass action by Africans could win concessions, as fares were reduced", "Correct: the boycott succeeded."],
      ["Africans in the towns had no interest in political questions", "The boycott showed the opposite."],
      ["The government had agreed to provide free transport for African workers", "No such agreement was made."],
      ["The Federation had ended segregation in public transport throughout the country", "Segregation continued."],
    ],
    answer: "A",
    explanation: "The City Youth League organised the boycott and the fare rise was reduced, showing the power of mass action.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which body was formed in 1955 by young educated townsmen in Salisbury, with James Chikerema and George Nyandoro among its leaders?",
    options: [
      ["The City Youth League", "Correct: it joined Congress in 1957."],
      ["The Industrial and Commercial Workers' Union", "The ICU was a workers' union of the 1920s."],
      ["The National Democratic Party", "The NDP was formed in 1960."],
      ["The Rhodesia Bantu Voters' Association", "This association dated from 1923."],
    ],
    answer: "A",
    hints: ["It was a youth organisation in the capital."],
    explanation: "The City Youth League (1955) led the bus boycott and merged with the Bulawayo Congress in 1957.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason why the Federation increased African support for nationalism?",
    options: [
      ["It was dominated by white settlers and kept discrimination in land, jobs and the vote", "Correct: partnership did not bring change."],
      ["It gave Africans a majority of seats in the federal parliament from the year 1953", "Africans did not have a majority."],
      ["It banned all African trade unions and political associations as soon as it was formed", "Unions and associations were not banned then."],
      ["It handed all the land of Southern Rhodesia back to African chiefs and headmen", "The land was not handed back."],
    ],
    answer: "A",
    hints: ["Think of who controlled the Federation."],
    explanation: "The Federation strengthened settler power and offered 'partnership' in name only, which led many Africans to oppose it and join political organisations.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why trade unionism gave way to mass nationalism?",
    options: [
      ["Grievances over land and the vote needed political change that unions could not win", "Correct: workplace bargaining could not change laws."],
      ["Trade unions had won nearly all their main demands by 1950 and had no more work to do", "They had not won all their demands."],
      ["The government encouraged Africans to form political parties and then abolished the unions", "The government did not do this."],
      ["Africans in the towns had decided that questions of wages did not matter to them any more", "Wages mattered to the urban workers."],
    ],
    answer: "A",
    hints: ["Link the type of grievance to the type of organisation."],
    explanation: "Unions were legally weak, and grievances such as land and the franchise could only be addressed through government, so leaders turned to political parties.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that early nationalism grew from earlier African organisations?",
    options: [
      ["Joshua Nkomo, who led Congress, had been a railway trade union leader", "Correct: personal links between unions and politics."],
      ["The Federation was formed in the same year as the Congress, in 1957", "The Federation was formed in 1953, not 1957."],
      ["Congress was banned by the government on the day after it was formed in 1957", "Congress was not banned in 1957."],
      ["The ICU of South Africa had its main headquarters in the city of Salisbury", "The ICU was based in South Africa."],
    ],
    answer: "A",
    hints: ["Look for a link between a person and an earlier organisation."],
    explanation: "Many early nationalists were former trade unionists; Nkomo's career shows the continuity between unions and political parties.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Southern Rhodesia African National Congress was formed in 1957.", answer: true,
    explanation: "Congress was formed in September 1957 by the merger of the City Youth League and the Bulawayo African National Congress.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "African workers went on a general strike in 1948.", answer: true,
    explanation: "A general strike in Bulawayo and other towns in 1948 followed the railway strike of 1945.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The Industrial Conciliation Act of 1934 gave African unions the right to bargain with employers.", answer: false,
    hints: ["The Act defined 'employee'."],
    explanation: "The Act excluded Africans from the definition of employee, so their unions had no legal bargaining rights.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person or body to its description.",
    pairs: [
      ["Abraham Twala", "Founder of the Rhodesia Bantu Voters' Association in 1923"],
      ["Charles Mzingeli", "Long-time Salisbury champion of African workers and tenants"],
      ["Benjamin Burombo", "Leader of the African Voice Association during the 1948 strike"],
      ["James Chikerema", "Leader of the City Youth League in the 1950s"],
    ],
    explanation: "These leaders represent successive phases of African organisation.",
  });
  {
    const events = [
      "The Rhodesia Bantu Voters' Association is formed",
      "The railway workers' strike",
      "The Federation of Rhodesia and Nyasaland is formed",
      "The Southern Rhodesia African National Congress is formed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1923, 1945, 1953 and 1957."],
      explanation: "1923; 1945; 1953; September 1957.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The City Youth League led a boycott of {{blank:a}} buses in 1956, and in {{blank:b}} it joined the Bulawayo Congress.",
    blanks: [
      { id: "a", accepted: ["Salisbury"], choices: ["Salisbury", "Gwelo", "Umtali", "Fort Victoria"] },
      { id: "b", accepted: ["1957"], choices: ["1957", "1948", "1963", "1960"] },
    ],
    explanation: "The Salisbury bus boycott was in 1956; the League joined Congress in 1957.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which union movement from South Africa set up a branch in Southern Rhodesia in the late 1920s? Give its initials.",
    accepted: ["ICU", "the ICU", "I.C.U.", "Industrial and Commercial Workers' Union"],
    wrong: ["ANC"],
    explanation: "The **ICU**, the Industrial and Commercial Workers' Union.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the forms of African organisation in Southern Rhodesia before 1957.",
    points: ["Welfare and voters' associations of the educated class, such as the Rhodesia Bantu Voters' Association", "The ICU branch, which spoke for urban workers", "Trade unions and strikes in 1945 and 1948", "The City Youth League and the formation of Congress in 1957"],
    modelAnswer: "Educated Africans formed welfare and voters' associations in the 1920s, such as the Rhodesia Bantu Voters' Association. The ICU spoke for urban workers, and trade unions led strikes in 1945 and 1948. In the 1950s the City Youth League and then the Southern Rhodesia African National Congress in 1957 turned protest into a political movement.",
    explanation: "One mark for each form of organisation described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Federation of 1953 helped nationalism to grow.",
    points: [["It was dominated by white settlers and kept discrimination in land, jobs and the vote", 2], ["Its 'partnership' brought little change, so Africans concluded that peaceful requests had failed and joined political movements", 2]],
    hints: ["Think of the gap between partnership and reality."],
    modelAnswer: "The Federation was dominated by white settlers and kept discrimination in land, jobs and the vote. Its promise of partnership brought little change, so many Africans concluded that peaceful requests were not enough and joined political movements.",
    explanation: "Credit explained links.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why African trade unions were limited as a means of changing the position of Africans.",
    points: [["The law excluded Africans from the definition of employee, and strikes were put down by police and dismissals", 2], ["Their main grievances, land and the vote, were political and could not be won by bargaining at work", 2]],
    hints: ["Think of law, police and the type of grievance."],
    modelAnswer: "The law excluded Africans from the definition of employee, so unions had no right to bargain, and strikes were put down by police and dismissals. Their main grievances, such as land and the vote, were political and could not be won by bargaining at work.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional African clerk to a Salisbury newspaper, 1954",
        "We are told that the new Federation is a partnership. Yet in the town I cannot enter the shop by the front door, nor vote, nor buy land where I choose. Partnership between horse and rider is no partnership. We ask only to be treated as men."),
      "",
      source("Source B", "a memory told by a fictional bus passenger in the 1980s about the Salisbury boycott of 1956",
        "We walked miles to work in the morning and walked back at night. Nobody told us to stop. The bus company lost money, and the fare was lowered. That was when we learned that we had power if we stood together."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What complaints does Source A make about the Federation?", points: ["Africans cannot use the front door of shops / are treated as inferior", "Africans cannot vote or buy land where they choose; partnership is not real"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What lesson does Source B draw from the boycott?", points: ["Africans had power if they stood together", "Mass action could win a result such as lower fares"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of why nationalism grew in the 1950s?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a contemporary African view of the gap between partnership and reality, though one educated man's opinion", 1], ["B shows the confidence gained from mass action, but is a memory from the 1980s, which may have been shaped by later events", 1], ["Own knowledge: discrimination in land, jobs and the vote and the success of the 1956 boycott are confirmed elsewhere", 1], ["Judgement: together they show both the grievance and the confidence behind nationalism", 1]], modelAnswer: "Source A is useful because it was written at the time and shows the gap between the Federation's promise of partnership and the discrimination Africans faced, though it is one educated man's opinion. Source B shows how mass action gave Africans confidence, but it was told in the 1980s and may have been shaped by later events. My own knowledge confirms discrimination in land, jobs and the vote and the success of the 1956 boycott. Together they show both the grievance and the confidence that fed nationalism." }),
    ],
    hints: ["For (c), think about when and by whom each source was written."],
    explanation: "Both sources are invented: a clerk's letter and a recollection of the boycott.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Federation the main reason for the growth of mass African nationalism in Southern Rhodesia in the 1950s?",
    levels: levels(12),
    points: [
      ["The Federation: white-dominated, kept discrimination, partnership unreal, spread fear of permanent white rule", 3],
      ["Earlier grievances: land (Land Apportionment Act), the vote, low wages, discrimination in towns", 3],
      ["The limits of unionism and the growth of the urban population and a young educated leadership", 2],
      ["Wider decolonisation: Ghana 1957 as an example", 2],
      ["Supported judgement on the Federation compared with other factors", 2],
    ],
    hints: ["Weigh the Federation against earlier grievances, urbanisation and the example of Ghana."],
    modelAnswer: "The Federation was an important cause of mass nationalism, but it was not the only one. It was dominated by white settlers and kept discrimination in jobs, land and the vote, so its promise of partnership convinced many Africans that they needed political power. But the grievances were older: the Land Apportionment Act, low wages and the denial of the vote already angered Africans. Trade unions had been limited by the law, urban populations had grown, and a young educated leadership emerged in the City Youth League. The example of Ghana's independence in 1957 also gave hope. I conclude that the Federation was the immediate trigger that turned long-standing grievances into mass politics, but the deeper causes were land, the vote and discrimination.",
    explanation: "Credit explained causes and a judgement weighing the Federation against others.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the City Youth League in the development of African nationalism.",
    levels: levels(8),
    points: [
      ["Formed in 1955 by young educated townsmen such as Chikerema and Nyandoro", 2],
      ["The 1956 bus boycott showed the power of mass action", 2],
      ["It merged with the Bulawayo Congress in 1957 to form a mass party", 2],
      ["Judgement on its importance compared with earlier organisations", 2],
    ],
    hints: ["Consider both its achievements and what it built on."],
    modelAnswer: "The City Youth League was important because it brought young educated townsmen into politics and showed the power of mass action in the Salisbury bus boycott of 1956, when fares were reduced. In 1957 it merged with the Bulawayo Congress to form the Southern Rhodesia African National Congress, the first mass party. But it built on earlier organisations such as the ICU and the unions, which had taught Africans to organise. I conclude that the League was an important step in turning protest into nationalism, though it was one stage in a longer development.",
    explanation: "Credit explained importance and a balanced judgement.",
  });

  b.card("DEFINITION", "What was the Industrial Conciliation Act of 1934?", "A law that defined 'employee' so as to exclude Africans, denying African unions the right to bargain.");
  b.card("DEFINITION", "What was the Federation of Rhodesia and Nyasaland?", "A union of Southern Rhodesia, Northern Rhodesia and Nyasaland (1953-63), dominated by white settlers.");
  b.card("FACT", "Which strikes showed the power of African workers in the 1940s?", "The railway strike of 1945 and the general strike of 1948.");
  b.card("FACT", "What was the City Youth League?", "An organisation formed in 1955 in Salisbury that led the 1956 bus boycott and merged into Congress in 1957.");
  b.card("FACT", "When was the Southern Rhodesia African National Congress formed and who led it?", "September 1957; Joshua Nkomo.");
  b.card("FACT", "Who led the African Voice Association in the 1940s?", "Benjamin Burombo.");
  b.card("CONCEPT", "Why did unionism give way to mass nationalism?", "Unions were legally weak and the main grievances (land, the vote) were political; the Federation and decolonisation elsewhere also pushed Africans towards parties.");
  b.card("CONCEPT", "How did the Federation help nationalism grow?", "It strengthened white control and offered only 'partnership' in name, so Africans turned to political organisation.");
  b.card("CONCEPT", "What did the 1956 bus boycott show?", "That mass action could win concessions, as the fare rise was reduced.");
});
