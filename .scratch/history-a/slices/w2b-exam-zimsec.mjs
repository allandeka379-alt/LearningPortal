// W2b exam-format items: ZIMSEC 25-mark essays (EXAM.ZIM_ESSAY). Paper 1: economic and social developments x1,
// indigenisation and land reform x1, the Constitution x1. Paper 2: the Paris peace settlement x1, regional and
// international organisations x1. Part structure and levels are our convention (a reviewer must check against the
// syllabus and ZIMSEC mark schemes). All five are in one module because the builder writes one file per module.
import { concept, levels, EXAM } from "../lib.mjs";

const Z = EXAM.ZIM_ESSAY;
const base = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, marks: 25, wordLimit: { min: 600, max: 1100 }, levels: levels(25) };

concept("ahist.independence.economic", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec" }, (b) => {
  // 1. Paper 1: economic and social developments, 1980-2000.
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.independence.economic", "ahist.independence.social"],
    stem: "To what extent did ordinary Zimbabweans benefit from economic and social developments between 1980 and 2000? [25]",
    points: [
      ["The inheritance of 1980 and the aims of Growth with Equity, ZIMCORD and the early development plans", 3],
      ["Economic gains of the 1980s: rebound after sanctions, smallholder maize and cotton sales, credit and marketing, social spending", 3],
      ["Economic difficulties: droughts of 1982-84 and 1991-92, deficits, debt, shortages of foreign currency, controls, regional war", 3],
      ["ESAP (1991) and ZIMPREST: aims, job losses, user fees, Black Friday in 1997 and food riots in 1998", 3],
      ["Education: free primary schooling, expansion of secondary schools and colleges, literacy, ZINTEC; limits in quality and jobs", 3],
      ["Health and other social change: primary health care, clinics, immunisation, the Legal Age of Majority Act, housing shortage", 3],
      ["The challenges of the 1990s: HIV/AIDS, cost recovery, loss of nurses and teachers, unemployment", 3],
      ["Judgement on how far and for whom people benefited, and how this changed over time", 4],
    ],
    modelAnswer: `Ordinary Zimbabweans benefited a great deal in the 1980s, above all through education, health and better support for small farmers, but a large part of these gains was threatened or reversed in the 1990s by drought, structural adjustment and the HIV/AIDS epidemic. The benefits therefore varied greatly according to the decade and to who the people were.

In 1980 the government inherited an economy that was diverse but unequal. A modern sector owned largely by whites and foreign companies existed beside poor communal areas. The policy statement Growth with Equity of 1981 promised to keep the economy growing while spreading benefits through spending on education, health and rural development, and the donors' conference known as ZIMCORD pledged large sums of aid and loans. A Transitional National Development Plan and then the first Five-Year National Development Plan set targets for the 1980s.

There were real economic gains in the early years. After sanctions ended and the rains were good, the economy rebounded in 1980 and 1981. For ordinary rural families the most important change was in agriculture. New Grain Marketing Board depots were opened near communal areas, the Agricultural Finance Corporation lent to small farmers and extension officers were sent to advise them. In good seasons in the mid-1980s communal farmers supplied roughly half of the maize that reached the market, a big change from the colonial period, and the country exported maize in some years. A minimum wage and the state's heavy spending on services also helped workers and their families.

However, the economy also faced serious difficulties. The droughts of 1982-84 and 1991-92 reduced harvests and export earnings and forced the state to import food. Budget deficits grew as spending rose faster than revenue, debt increased, and shortages of foreign currency left factories without spare parts and raw materials. The controls on prices, wages and imports protected some workers but discouraged investment and exports. Critics add that job creation was too slow for a growing population, while the government points to the cost of drought, the world recession and the war in Mozambique and South African destabilisation, which disrupted the trade routes on which a landlocked country depended.

The Economic Structural Adjustment Programme of 1991, agreed with the IMF and the World Bank, was meant to restore growth by removing controls, devaluing the currency, cutting the deficit and charging fees for services. Its results were mixed. Some sectors, such as horticulture, grew, but many local industries suffered from competition from cheaper imports, and jobs were lost in textiles and other manufacturing. Prices of food and transport rose, and real wages fell. ESAP was followed in 1996 by ZIMPREST, but the situation worsened. In November 1997 the Zimbabwe dollar lost much of its value on Black Friday, and in January 1998 there were food riots.

The social record of the 1980s was stronger than the economic record. Racial barriers were removed, primary school fees were abolished, and the number of primary and secondary pupils rose very quickly. Communities built classrooms, the state paid the teachers, and programmes such as ZINTEC trained thousands of teachers while they taught. New colleges and universities opened, and adult literacy became one of the highest in Africa. Under the primary health care policy, rural clinics were built, village health workers were trained and a national immunisation programme brought down child deaths. Women received adult legal status through the Legal Age of Majority Act of 1982. But the quality of teaching and equipment suffered from the speed of expansion, and school leavers often found no formal jobs. There was also a housing shortage in the towns.

In the 1990s the social gains came under strain. User fees for clinics and schools, introduced as part of cost recovery under ESAP, made it harder for poor families to use services, and many experienced nurses and teachers left for better pay. HIV/AIDS, first identified in 1985, spread rapidly, and by the late 1990s roughly a quarter of adults were thought to be infected in the worst years. The epidemic cut life expectancy, left many orphans and placed a heavy burden on families, hospitals and schools.

In conclusion, ordinary Zimbabweans, especially the rural majority, gained substantially in the 1980s from schooling, health care, access to markets and legal changes that ended racial discrimination, even though the economy itself was only moderately successful. In the 1990s many of these benefits were eroded by drought, the costs of ESAP and disease, and the poorest were hit hardest. The overall judgement must therefore be that people benefited considerably but not securely: the foundations laid in the 1980s were real, yet they were not protected from the shocks of the following decade.`,
    hints: ["Contrast the 1980s with the 1990s, and economic with social change, before you judge."],
    explanation: "A level 5 answer separates the decades, uses specific policies and dates, weighs benefits against costs, and reaches a supported judgement.",
  });

  // 2. Paper 1: indigenisation and land reform.
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.empowerment.indigenisation", "ahist.empowerment.land-1980-99", "ahist.empowerment.land-third-chimurenga"],
    stem: "To what extent have land reform and indigenisation achieved their aims in Zimbabwe since 1980? [25]",
    points: [
      ["The inheritance and the aims: racial inequality in land and ownership, expectations of independence", 3],
      ["Land reform 1980-99: Lancaster House terms, resettlement models A to D, about 52,000 families by 1990, 162,000 target missed", 3],
      ["Laws and obstacles before 2000: Land Acquisition Acts of 1985 and 1992, Amendment 11, cost, poor land, 1997-98 disputes with Britain", 3],
      ["Fast-track reform from 2000: causes, referendum, occupations, A1 and A2, amendments and the Utete figures", 3],
      ["Outcomes of land reform: land for many families, lower output, farm workers displaced, tenure insecurity, sanctions debate", 3],
      ["Indigenisation: public service and small business in the 1980s; the 2007 Act and 51 per cent, NIEEB, CSOTs and ESOPs; later narrowing", 3],
      ["Criticisms and different views: investors, capital and skills, unequal benefits; justice and national pride", 3],
      ["Judgement on how far the aims were achieved, distinguishing aims from methods", 4],
    ],
    modelAnswer: `Land reform and indigenisation have achieved their aim of changing who owns land and businesses to a considerable degree, but they have been much less successful in producing the secure, productive and widely shared prosperity that was also promised. The aims were largely achieved in terms of ownership, and only partly achieved in terms of results.

The aims arose from the inheritance of 1980. Colonial laws such as the Land Apportionment Act and the Land Tenure Act had left about 6,000 white farmers with roughly two-fifths of the farmland, mostly the best land, while hundreds of thousands of African families crowded in communal areas. Mines, factories and commerce were largely owned by whites and foreign firms. The liberation struggle had promised change, so the government wished to reduce overcrowding, to give black Zimbabweans a stake in the economy, and to do so without destroying production.

Land reform before 2000 was constrained. The Lancaster House constitution protected property for ten years and required prompt and adequate compensation, so the government relied mainly on buying farms offered for sale. Resettlement used four models, of which Model A, with individual family plots, was the most common. By 1990 about 52,000 families had been settled and by the late 1990s about 70,000, which was far short of the target of 162,000. Studies of settled families found improved incomes and services for many. Progress was slow because money was short, many farms offered were poor land at high prices, and administration lagged. The Land Acquisition Acts of 1985 and 1992 and Constitution Amendment No. 11 widened the state's powers, and the Rukuni Commission examined tenure, but disagreements about compensation and the British letter of November 1997, which denied a special responsibility to pay, left the issue unresolved after the donors' conference of 1998.

The fast-track programme from 2000 changed the pace. Slow progress, the dispute with Britain and pressure from war veterans and landless people were joined by the political shock of the "No" vote in the referendum of February 2000, after which farm occupations began. Parliament amended the Constitution and the Land Acquisition Act, and the programme was launched in July 2000. Government figures given by the Utete Committee in 2003 spoke of about 11 million hectares acquired, over 140,000 families on A1 plots and about 16,000 farmers on A2 farms. In terms of ownership, this was a transformation: the land held by a few thousand large farmers was redistributed among many.

The results, however, are strongly disputed. The supporters of the programme stress that it corrected a historical injustice and gave land to many landless families. Critics stress that the output of maize, wheat and tobacco fell sharply in the early 2000s, that hundreds of thousands of farm workers lost homes and jobs, that there was violence during the occupations, and that permits and offer letters gave weaker security than title, so that many farmers could not borrow. The economy contracted and by 2008 inflation was extreme, although this had several causes. Relations with Britain and Western states deteriorated, and the dispute over sanctions continues. Later recovery of some crops, notably tobacco, owed much to small-scale growers on contract.

Indigenisation followed a similar pattern. In the 1980s the government Africanised the public service and security forces, trained people and supported small business through bodies such as SEDCO. The Indigenisation and Economic Empowerment Act of 2007 required at least 51 per cent indigenous ownership in large businesses, supervised by the NIEEB. It led to community share ownership trusts and employee share schemes, such as those at Mhondoro-Ngezi-Chegutu, which paid for clinics and schools in some districts. But the rule created uncertainty for investors, local owners often lacked capital and skills, the benefits went mainly to a few, and the rules were changed and narrowed from about 2013 and in 2018.

In conclusion, the aim of correcting racial inequality in land and ownership was widely supported, and the two policies did change who owns land and some firms, and gave many families a stake. But the methods were criticised: the early land reform was slow, the fast-track programme was accompanied by disruption, violence and lower output, and indigenisation deterred investment and benefited some groups more than others. The policies were therefore successful in their purpose of redistribution, but only partly successful in building lasting prosperity, which remains the test by which many Zimbabweans judge them.`,
    hints: ["Treat land and indigenisation separately, then compare how far each achieved its aims."],
    explanation: "A level 5 answer uses dates, laws and figures accurately, treats both policies, presents different views neutrally and reaches a supported judgement distinguishing aims from results.",
  });

  // 3. Paper 1: the Constitution (human rights and democracy).
  b.essay({
    ...base, paper: "Paper 1",
    concepts: ["ahist.constitution.human-rights", "ahist.constitution.democracy"],
    stem: "Assess the extent to which the Constitution of 2013 has strengthened human rights and democracy in Zimbabwe. [25]",
    points: [
      ["Background: Lancaster House constitution and its amendments, the constitution-making process, COPAC outreach and the referendum of March 2013", 3],
      ["The Declaration of Rights: civil, political, economic, social rights; rights of children, women and others; limitation test; enforcement in court", 3],
      ["International instruments and institutions: UDHR, African Charter, CRC; the ZHRC and other independent commissions", 3],
      ["Democracy: separation of powers, term limits, the structure of Parliament, independence of the judiciary", 3],
      ["Elections and participation: ZEC, harmonised elections, public hearings, quotas for women", 3],
      ["Devolution under Chapter 14, the 5 per cent allocation and the 2020 policy", 3],
      ["Criticisms and the government's response: alignment of laws, restrictions on assembly and expression, disputes over elections, resources", 3],
      ["Judgement: strong framework, contested practice", 4],
    ],
    modelAnswer: `The 2013 Constitution has strengthened human rights and democracy considerably on paper and in some practical cases, but how far it has done so in everyday practice is disputed, and the gap between the written framework and its application is the main theme of any assessment.

The Lancaster House constitution of 1979 had a short Declaration of Rights centred on civil and political freedoms, and it was amended many times, notably to create an executive presidency in 1987. Calls for a new constitution grew in the 1990s, and after the Global Political Agreement of 2009 a parliamentary committee, COPAC, held outreach meetings in all parts of the country. The draft was approved in a referendum on 16 March 2013 by a large majority, and it came into force in May 2013. Having been made through consultation and approved directly by the people, it has a stronger claim to legitimacy than its predecessor.

On human rights the improvement is clear. Chapter 4, the Declaration of Rights, is long and detailed. It protects the right to life, personal liberty, dignity and freedom from torture, equality between women and men, freedom of expression, the media, assembly and association, access to information, political rights, a fair trial, property, labour rights and the rights of particular groups such as children, older people, persons with disabilities and war veterans. Unlike the earlier text it also includes social and economic rights, such as education, health care, food, water and a clean environment. It states that the state must respect, protect, promote and fulfil rights, allows limits only by law that is fair, reasonable, necessary and justifiable in a democratic society, and lets any person go to court. The courts must take international law into account, and Zimbabwe is influenced by the Universal Declaration of Human Rights, the African Charter and the Convention on the Rights of the Child. There have been real changes: the Constitutional Court's judgment in 2016 fixed 18 as the minimum age of marriage, and the Education Act was amended in 2020 to prevent the exclusion of pupils for pregnancy. The Zimbabwe Human Rights Commission and other independent commissions promote awareness and monitor violations.

On democracy the Constitution sets out a separation of powers among the executive, the legislature and the judiciary. The President is elected directly for five years and may serve only two terms. Parliament has a National Assembly of 210 constituency members, with a quota of seats for women, and a Senate of 80 members, which includes chiefs. The courts, headed by the Constitutional Court, are described as independent. The Zimbabwe Electoral Commission runs the harmonised elections every five years, and citizens may take part through public hearings and petitions. Chapter 14 provides for devolution to the provinces and local authorities and sets aside at least 5 per cent of national revenue for them, although the policy to implement it was approved only in 2020.

Nevertheless there are serious criticisms. Human rights groups, opposition parties and some foreign governments argue that many older laws were slow to be aligned with the Constitution, that laws on public order and the media restrict assembly and expression, that peaceful gatherings have been restricted, and that violence and disputes have accompanied some elections and the voters' roll. They also argue that the executive remains dominant and that the independence of the courts and commissions has at times been questioned. The government replies that the Constitution is among the most progressive in Africa, that restrictions are lawful limits needed for peace and order, that courts are open to any citizen and have ruled against the state, and that the full implementation of social rights and devolution depends on resources and takes time. Observers also note that public awareness of rights is uneven, particularly in rural areas.

In conclusion, the 2013 Constitution has strengthened human rights and democracy in important ways. It widened the rights protected, created stronger institutions and gave citizens a share in making the document, and some specific legal changes have followed. But its effect depends on the willingness of all branches of government to be bound by it, on the alignment of other laws, and on resources for commissions and devolution. The most balanced judgement is that the framework is strong and has made progress possible, while the practical protection of rights and the working of democracy remain contested and uneven.`,
    hints: ["Separate what the Constitution says from how it works, and give the views of critics and of the government."],
    explanation: "A level 5 answer covers rights and democracy with accurate detail, separates framework from practice, presents different views neutrally and reaches a supported judgement.",
  });

  // 4. Paper 2: the Paris peace settlement.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.peace.paris-settlement"],
    stem: "Assess how far the Paris Peace Settlement of 1919 achieved the aims of the leading Allied statesmen. [25]",
    points: [
      ["Context: the conference from January 1919, Germany excluded, the Treaty of Versailles signed on 28 June 1919", 3],
      ["Wilson's aims (Fourteen Points, self-determination, League) and how far they were met; the US Senate's rejection", 3],
      ["Clemenceau's aims (security, Alsace-Lorraine, Rhineland, reparations) and how far they were met", 3],
      ["Lloyd George's aims (trade, empire, navy, a moderate peace) and how far they were met", 3],
      ["Terms: territory, colonies and mandates, armed forces", 3],
      ["War guilt and reparations (132 billion gold marks in 1921); German reaction as a Diktat", 3],
      ["Other treaties and other aims: Austria, Hungary, Bulgaria and the Ottoman Empire; Italy's claims; new states", 3],
      ["Judgement on how far the aims were achieved and whether the settlement was workable", 4],
    ],
    modelAnswer: `The Paris Peace Settlement achieved some of the aims of each of the leading statesmen but fully satisfied none of them. It was a compromise between conflicting aims, and for that reason it left Germany resentful and France insecure, and it was weakly enforced.

The conference opened in Paris on 18 January 1919, and the dominant figures were Woodrow Wilson of the United States, Georges Clemenceau of France and David Lloyd George of Britain, with Vittorio Orlando of Italy. Germany was not allowed to negotiate. The Treaty of Versailles was presented to the German delegates in May and signed on 28 June 1919, five years after Sarajevo.

Wilson's aims were set out in the Fourteen Points of January 1918. He wished for open diplomacy, freedom of the seas, free trade, a reduction of armaments, a fair adjustment of colonial claims, self-determination for the peoples of Europe and, above all, a League of Nations to prevent future wars. In part, he succeeded. The League was created and its Covenant was made part of the treaty, and new states such as Poland and Czechoslovakia were created on the principle of self-determination. But the application was uneven: Germans and Austrians were forbidden to unite, millions of Germans, Hungarians and others were left as minorities in the new states, colonial peoples were not consulted and became mandates, and the treaty was far harsher than Wilson had hoped. His greatest failure came at home, since the United States Senate refused to ratify the treaty and the United States never joined the League.

Clemenceau's main aim was the security of France, which had been invaded twice in fifty years and had suffered terrible losses on its own soil. He wanted Germany weakened, with the Rhineland detached from it and heavy reparations. He gained a great deal: Alsace-Lorraine was returned, the Saar's coal went to France for fifteen years, the German army was limited to 100,000 men with no tanks, military aircraft or submarines, the Rhineland was demilitarised, and Germany had to accept responsibility for the war and pay reparations. But he did not obtain a permanent separation of the Rhineland or a break-up of Germany. The promised American and British guarantees collapsed when the Senate rejected the treaty, and Germany remained the largest economy in Europe. For France, therefore, the settlement gave less security than Clemenceau had wanted.

Lloyd George held a middle position. Having campaigned in 1918 on the promise that Germany would pay, he nevertheless wished to restore trade, to avoid a peace so harsh that it would provoke revenge or drive Germany to communism, and to protect the British Empire and its naval supremacy. Many of his aims were achieved. The German navy was reduced and its fleet scuttled at Scapa Flow, the German colonies in Africa and the Pacific passed to Britain and the Dominions as mandates, and Britain gained territory in the Middle East. His wish for a moderate settlement was met only partly, because the reparations and the war guilt clause were harsh, and he feared that Germany's resentment would endanger the peace.

The terms themselves show the balance. Germany lost roughly 13 per cent of its territory, including Alsace-Lorraine, areas in the east given to Poland and a corridor to the sea, and all its colonies. Its armed forces were severely limited. Article 231 made it accept responsibility for the war, and in 1921 the reparations bill was fixed at 132 billion gold marks. Germans called it a Diktat and the republican government that signed it was blamed by nationalists. The other treaties dismantled Austria-Hungary and reduced Hungary and Bulgaria, while the Treaty of Sèvres was replaced by the Treaty of Lausanne in 1923 after Turkish resistance. Italy, represented by Orlando, felt cheated of the territory promised in 1915.

In conclusion, the settlement achieved Wilson's League but not his peace of justice, gave Clemenceau gains in territory and arms limits but not lasting security, and satisfied Lloyd George's imperial and naval aims but not his hope of a moderate peace. Some historians argue that it was too harsh, others that it was too weakly enforced and not harsh enough to keep Germany down; both views point to the same conclusion that it was a compromise which left the main parties dissatisfied. Its workability depended on the support of the United States and the co-operation of Britain and France, and when these were lacking its provisions could not be sustained.`,
    hints: ["Take each leader in turn, say what he wanted and what he got, then judge the settlement as a whole."],
    explanation: "A level 5 answer shows the aims of each leader, compares them with the terms and outcomes, and reaches a judgement about the settlement as a compromise.",
  });

  // 5. Paper 2: regional and international organisations.
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.orgs.united-nations", "ahist.orgs.african-union", "ahist.orgs.sadc"],
    stem: "To what extent have international and regional organisations contributed to peace and development in Africa since 1945? [25]",
    points: [
      ["The United Nations: origins and aims, the Security Council and General Assembly, agencies such as WHO, UNICEF and FAO", 3],
      ["UN action in Africa and southern Africa: the Congo operation, sanctions on Rhodesia, the arms embargo on South Africa, Namibia", 3],
      ["The OAU: aims, the Liberation Committee, the support of liberation struggles, borders, refugee convention and the African Charter", 3],
      ["Weaknesses of the OAU: non-interference, no force or funds, failures such as Rwanda", 3],
      ["The African Union: Constitutive Act, Peace and Security Council, peace operations, Agenda 2063 and AfCFTA", 3],
      ["SADCC and SADC: dependence on South Africa, transport corridors, the Free Trade Area, Zimbabwe's role", 3],
      ["Limits: veto, funding, sovereignty, overlapping memberships, uneven results", 3],
      ["Judgement on the contribution of each and overall", 4],
    ],
    modelAnswer: `International and regional organisations have made a significant contribution to peace and development in Africa since 1945, especially in ending colonialism and apartheid and in providing health, relief and development assistance, but their contribution to preventing and ending conflicts and to economic integration has been limited by weak powers, scarce resources and the unwillingness of states to give up sovereignty.

The United Nations was created in 1945 to maintain peace and security, to promote friendly relations and to encourage co-operation on economic, social and humanitarian problems. In Africa its agencies have had lasting effects. The World Health Organization, UNICEF, the Food and Agriculture Organization, the World Food Programme and the UN High Commissioner for Refugees have supported vaccination, nutrition, food relief and refugees, and the UN set global targets for development such as the Millennium Development Goals. Politically, the General Assembly adopted the declaration on the independence of colonial peoples in 1960 and condemned apartheid. The Security Council imposed the first mandatory sanctions in its history on Rhodesia, in 1966 and 1968, and an arms embargo on South Africa in 1977, and the UN supervised the independence of Namibia in 1989-90. It also sent peacekeepers to the Congo in 1960-64, to Mozambique and elsewhere. But the United Nations was also limited. The veto of the five permanent members could paralyse the Security Council during the Cold War, the UN has no army and depends on members, and its failure to stop the Rwandan genocide in 1994 showed its weakness.

The Organisation of African Unity, founded on 25 May 1963 by 32 states at Addis Ababa, played an important part in decolonisation. Its Liberation Committee, based in Dar es Salaam, channelled money, training and arms to liberation movements, including those of Zimbabwe, and OAU diplomacy kept colonialism and apartheid before the world. The Cairo Declaration of 1964 respected colonial borders and reduced the risk of border wars, the OAU adopted a convention on refugees in 1969, and the African Charter on Human and Peoples' Rights in 1981. On the other hand, its principle of non-interference stopped it acting when governments mistreated their own people. It had no force and little money, since many members did not pay dues, and it failed to prevent or end conflicts in Nigeria, Liberia, Somalia and Rwanda. Critics called it a club of presidents.

The African Union, launched in 2002, was designed to correct these faults. Its Constitutive Act gives the Union the right to intervene in grave circumstances such as genocide and allows the suspension of governments that take power by unconstitutional means. The Peace and Security Council, operational from 2004, has authorised peace operations in Burundi, Darfur and Somalia, and the Union has mediated in disputes. Agenda 2063, adopted in 2015, and the African Continental Free Trade Area, in force from 2019, set long-term goals for development and integration. Yet the AU depends heavily on outside funding, members hesitate to criticise one another, and implementation is slow, so conflicts in the Sahel and the Horn of Africa continue.

In southern Africa the Southern African Development Coordination Conference, set up at Lusaka on 1 April 1980 by nine states including Zimbabwe, aimed to reduce dependence on apartheid South Africa and concentrated on projects, such as transport corridors to the ports of Beira and Maputo and a regional food security programme coordinated by Zimbabwe. It became the Southern African Development Community through the Windhoek Treaty of 1992, with South Africa joining in 1994. SADC launched a Free Trade Area in 2008 and has built regional infrastructure such as the Kazungula Bridge and a shared power pool, and has mediated in political disputes. But the planned customs union has been delayed, and integration is hampered by the dominance of South Africa's economy, overlapping memberships of other blocs, poor infrastructure and political differences.

In conclusion, the contribution of these organisations has been greatest in areas where their members shared a clear aim and a common enemy, as with the end of colonialism and apartheid, in which the UN, the OAU and the Frontline States and SADCC all played roles. It has been more limited in preventing wars and building economic integration, where the veto, the lack of force and money and the protection of sovereignty have held them back. The United Nations has been most important for relief and legitimacy, the OAU and AU for political unity and liberation, and SADC for regional development, but none has fully delivered on its promises, and so the judgement must be that their contribution has been significant but partial.`,
    hints: ["Treat the UN, the OAU/AU and SADC in turn, then compare the areas where they succeeded with the areas where they did not."],
    explanation: "A level 5 answer gives accurate evidence for each organisation, separates peace from development, weighs achievements against limits and reaches a supported judgement.",
  });
});
