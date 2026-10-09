// Slice W4b: Cambridge IGCSE History 0470 exam-format items for Option A key questions 1, 2, 4 and 5.
// Paper 1 structured essays (9: 1848 x2, Italy x2, US Civil War x2, imperialism x3) and Paper 2 document questions
// (7: 1848 x2, Italy x2, imperialism x2 - prescribed 2027-28 - and the US Civil War x1). All sources are invented.
import { concept, P, source, sources, levels, EXAM, checkExam } from "../lib.mjs";

const C1 = EXAM.CAM_P1;
const C2 = EXAM.CAM_P2;
const p1 = { d: 4, skill: C1.skill, applies: C1.applies, secs: C1.secs, examStyle: true, paper: "Paper 1" };
const p2 = { d: 5, skill: C2.skill, applies: C2.applies, secs: C2.secs, examStyle: true, paper: "Paper 2" };
const X = "EXTENDED_RESPONSE";

concept("hist.revolutions-1848.causes", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge" }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Paper 1 structured essays.

  // 1. 1848: causes and spread.
  b.struct({
    ...p1,
    concepts: ["hist.revolutions-1848.causes"],
    stem: "**The revolutions of 1848.** Answer all parts.",
    hints: ["(b) needs reasons for the speed of the spread, not a list of risings.", "(c) compares liberal and national aims using named countries."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe what happened in Vienna in 1848.", points: [
        "Rising on 13 March; Metternich resigned and fled.",
        "Emperor Ferdinand promised a constitution / an elected assembly met (July).",
        "The assembly abolished the robot and feudal dues (September).",
        "October rising crushed by Windischgrätz; Ferdinand abdicated for Franz Joseph (December).",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why revolution spread so quickly across Europe in the spring of 1848.", points: [
        ["The example of Paris: Louis Philippe's fall (24 February) encouraged reformers and frightened rulers.", 2],
        ["Similar grievances already existed everywhere: economic crisis of 1845-47 and blocked liberal and national demands.", 2],
        ["Rulers gave way quickly / armies were not used at first; news spread fast by railway, telegraph and press.", 2],
      ], levels: levels(6), modelAnswer: "The fall of Louis Philippe in Paris on 24 February 1848 acted as a signal. Reformers elsewhere were encouraged, and rulers, who remembered how revolution had spread from France after 1789, lost confidence. Revolution could spread because the same conditions existed in many countries: the harvest failures and financial crisis of 1845-47 had caused hunger and unemployment, and liberals and nationalists had been frustrated by censorship and repression for thirty years. News travelled quickly by railway, telegraph and newspaper, and most rulers gave way within days rather than use their armies, so Vienna, Berlin, Milan and Budapest all rose within a few weeks.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Liberalism was more important than nationalism in the revolutions of 1848.\" How far do you agree? Explain your answer.", points: [
        ["Liberalism: demands for constitutions, parliaments and a free press (Paris, Vienna, Berlin); middle-class leadership.", 2],
        ["Liberalism: constitutions granted in many states; the Frankfurt Parliament's basic rights.", 2],
        ["Nationalism: Italy (Milan, Venice, Piedmont's war), Hungary (April Laws, Kossuth), Czechs, German unity.", 2],
        ["Nationalism also divided the revolutionaries (Croats against Magyars); in France there was no national question; both often combined.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Liberalism was central to most of the revolutions. In Paris, Vienna and Berlin the crowds and their middle-class leaders demanded constitutions, elected parliaments and a free press, and rulers across Europe responded by granting constitutions. The Frankfurt Parliament spent months drafting a list of basic rights.\n\nHowever, nationalism was just as important in many places. In Lombardy and Venetia the risings were against Austrian rule, and Piedmont went to war to drive Austria out of Italy. In Hungary the April Laws gave the country its own government, and Kossuth's movement became a war for independence. Czechs sought self-government, and Germans tried to create a united state. Nationalism also shaped the failure of 1848, because Croats and other minorities fought against the Hungarians.\n\nOverall the two ideas were usually combined. In France, where there was no national question, liberalism (and social demands) mattered most, but in central Europe and Italy nationalism decided both what the revolutionaries wanted and why they were divided. So I only partly agree: liberalism was the most common demand, but nationalism had the greater long-term effect.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the revolutions of 1848 (Option A, key question 1).",
  });

  // 2. 1848: failure and results.
  b.struct({
    ...p1,
    concepts: ["hist.revolutions-1848.events-outcomes"],
    stem: "**The failure of the revolutions of 1848.** Answer all parts.",
    hints: ["(b) explains how the Habsburg state recovered.", "(c) compares divisions with the strength of the old order."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the changes made in France in 1848.", points: [
        "Louis Philippe abdicated and the Second Republic was proclaimed (February).",
        "Universal male suffrage introduced; censorship ended.",
        "National Workshops set up, then closed, leading to the June Days.",
        "New constitution with an elected president; Louis Napoleon elected (December).",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why the Austrian Empire survived the revolutions of 1848-49.", points: [
        ["The army stayed loyal: Windischgrätz (Prague, Vienna) and Radetzky (Custoza, Novara).", 2],
        ["National rivalries were used against the rebels: Croats under Jelačić fought Hungary; peasants satisfied by the end of the robot.", 2],
        ["Russian intervention crushed Hungary (1849); new leadership under Schwarzenberg and Franz Joseph.", 2],
      ], levels: levels(6), modelAnswer: "The Austrian Empire survived mainly because its army stayed loyal. Windischgrätz bombarded Prague in June 1848 and retook Vienna in October, while Radetzky defeated Piedmont at Custoza and Novara. The government also exploited divisions among its enemies: Croats under Jelačić fought for the emperor against the Hungarians, and peasants lost interest once the robot was abolished in September 1848. New leaders, Schwarzenberg and the young Franz Joseph, were determined to restore imperial power, and when Hungary still held out, Tsar Nicholas I sent a Russian army that forced its surrender in August 1849.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How far were divisions among the revolutionaries the main reason why the revolutions of 1848 failed? Explain your answer.", points: [
        ["Divisions: middle class against workers (June Days); moderates against radicals.", 2],
        ["Divisions: national rivalries (Croats, Romanians against Magyars; Czechs against German nationalists); republicans against monarchists in Italy.", 2],
        ["Other: loyalty of the armies and recovery of rulers (Windischgrätz, Radetzky, Prussian army).", 2],
        ["Other: foreign intervention (Russia in Hungary, France in Rome); peasants satisfied; little mass support.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Divisions among the revolutionaries were very important. In France the middle class, frightened by socialism, supported the army when the workers rose in the June Days. In the Austrian Empire national rivalries were fatal: Croats, Serbs and Romanians fought against the Hungarian government, and Czech and German nationalists wanted different futures. In Italy, Charles Albert distrusted the republicans of Milan and Venice.\n\nHowever, the revolutionaries also faced powerful enemies. The armies had not been defeated in March; they had simply not been used, and loyal generals such as Windischgrätz and Radetzky later retook the cities. Foreign intervention was decisive in places: a Russian army crushed Hungary in 1849, and French troops ended the Roman Republic. Peasants, once freed from labour services, stayed out of the struggle.\n\nOverall divisions were the main reason because they gave the old rulers time and allies, but they mattered only because the armies of the old order were still intact and ready to strike once the revolutionaries had split.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the failure of the revolutions of 1848 (Option A, key question 1).",
  });

  // 3. Italy: Mazzini and Cavour.
  b.struct({
    ...p1,
    concepts: ["hist.italy.before-1850", "hist.italy.cavour"],
    stem: "**Italian unification to 1860.** Answer all parts.",
    hints: ["(b) needs Cavour's aims, not a narrative of the war.", "(c) weighs French help against Piedmont's own strengths and Italian action."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Mazzini's ideas and activities before 1850.", points: [
        "Founded Young Italy (1831) in exile.",
        "Wanted a united, independent Italian republic.",
        "Believed in education and popular risings by the people; organised risings that failed in the 1830s-40s.",
        "Leader (triumvir) of the Roman Republic, 1849.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why Piedmont took part in the Crimean War.", points: [
        ["To win the goodwill of Britain and France, whose help Piedmont needed against Austria.", 2],
        ["To gain a place at the peace conference and raise the Italian question (Congress of Paris, 1856).", 2],
        ["To raise Piedmont's prestige as the leading Italian state / show its modern army.", 2],
      ], levels: levels(6), modelAnswer: "Cavour knew from 1848-49 that Piedmont could not defeat Austria alone, so he needed powerful friends. Joining Britain and France against Russia in 1855 was a way to win their goodwill. It also gave Piedmont a seat at the peace conference: at the Congress of Paris in 1856 Cavour was able to raise the Italian question and criticise Austria's role in Italy in front of the great powers. Finally, sending a modern army of about 18,000 men raised Piedmont's prestige and showed other Italians that it was the state that could lead them.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"French help was the main reason for Piedmont's success in 1859-60.\" How far do you agree? Explain your answer.", points: [
        ["French help: Plombières; the French army won Magenta and Solferino; Austria could not be beaten alone (1848-49).", 2],
        ["French help: Napoleon accepted the annexation of central Italy in 1860 (for Nice and Savoy).", 2],
        ["Other: Cavour's diplomacy and modernisation of Piedmont; Piedmontese army.", 2],
        ["Other: action by Italians in central Italy (rulers fled, assemblies, National Society, plebiscites); British support; Villafranca showed limits of French help.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "French help was essential. In 1848-49 Piedmont had been defeated twice by Austria fighting alone. In 1859 the French army did most of the fighting at Magenta and Solferino, which won Lombardy. In 1860 Napoleon III accepted Piedmont's annexation of the central duchies, in return for Nice and Savoy.\n\nHowever, other factors also mattered. Cavour's diplomacy brought France into the war, and his reforms had made Piedmont strong enough to be a credible ally. In central Italy, Italians themselves acted: the rulers of Tuscany, Parma and Modena fled, nationalist assemblies voted for union, and the National Society organised support. Britain backed the Italians' right to choose their own government. French help also had limits, since Napoleon made peace at Villafranca and left Venetia to Austria.\n\nOverall French military help was the main reason Austria was defeated, but Piedmont's gains in 1860 came from Cavour's diplomacy and Italian action, so French help was necessary but not sufficient.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on Italian unification to 1860 (Option A, key question 2).",
  });

  // 4. Italy: completion and foreign powers.
  b.struct({
    ...p1,
    concepts: ["hist.italy.garibaldi-completion", "hist.italy.cavour"],
    stem: "**The completion of Italian unification.** Answer all parts.",
    hints: ["(b) explains the tension between the two men.", "(c) weighs each foreign power against Italian efforts."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Italy gained Venetia in 1866.", points: [
        "Italy allied with Prussia (April 1866).",
        "Italy was defeated by Austria at Custoza and at sea at Lissa.",
        "Prussia defeated Austria at Königgrätz (Sadowa).",
        "Austria handed Venetia to Napoleon III, who passed it to Italy; plebiscite.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why there was distrust between Cavour and Garibaldi.", points: [
        ["Different aims and politics: Garibaldi a democrat and former Mazzinian; Cavour a moderate monarchist.", 2],
        ["Nice: Cavour gave Garibaldi's birthplace to France (1860).", 2],
        ["Rome and France: Cavour feared Garibaldi would attack Rome and provoke war with France; Piedmont's army moved south to stop him.", 2],
      ], levels: levels(6), modelAnswer: "The two men had different politics. Garibaldi had been a follower of Mazzini and remained a democrat who believed in popular action, while Cavour was a moderate monarchist who relied on diplomacy and distrusted revolutionaries. Garibaldi was furious when Cavour gave Nice, his birthplace, to France in 1860. Above all they disagreed about Rome: Cavour feared that Garibaldi, after taking Naples, would attack Rome, which was protected by French troops, and provoke a war with France, so he sent the Piedmontese army south through the Papal States to stop him.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "How important were other European countries in the unification of Italy between 1859 and 1870? Explain your answer.", points: [
        ["France: war of 1859 (Lombardy); accepted central Italy (1860); but protected Rome until 1870.", 2],
        ["Prussia: alliance of 1866 won Venetia; Franco-Prussian War allowed the capture of Rome (1870).", 2],
        ["Britain: diplomatic support in 1860; did not interfere with Garibaldi.", 2],
        ["Italian factors: Cavour's diplomacy, Garibaldi's conquest of the south, Victor Emmanuel, plebiscites; Italian defeats in 1866 and failures at Aspromonte and Mentana show limits of Italian strength.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Other European countries were very important. France's army defeated Austria in 1859 and won Lombardy, and in 1860 Napoleon III accepted Piedmont's annexation of central Italy. Prussia was even more important for the completion of unification: in 1866 Italy lost at Custoza and Lissa, but Prussia's victory at Königgrätz forced Austria to give up Venetia, and in 1870 the Franco-Prussian War made France withdraw its garrison from Rome. Britain gave diplomatic support in 1860.\n\nHowever, Italians also made unification happen. Cavour's diplomacy used foreign powers for Italian ends, and Garibaldi's expedition conquered the south in 1860, which no foreign power did. Plebiscites showed popular support for union under Victor Emmanuel.\n\nOverall foreign countries were decisive for Lombardy, Venetia and Rome, because Italy could not defeat Austria or France alone, but the south was won by Italians. Other countries were therefore the most important factor in 1866 and 1870 and very important in 1859, but not the only one.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the completion of Italian unification (Option A, key question 2).",
  });

  // 5. US Civil War: causes.
  b.struct({
    ...p1,
    concepts: ["hist.us-civil-war.causes"],
    stem: "**The coming of the American Civil War.** Answer all parts.",
    hints: ["(b) explains why the result mattered, not how the election was won.", "(c) shows how far economic differences were linked to slavery."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Kansas-Nebraska Act (1854) and its consequences.", points: [
        "Proposed by Stephen Douglas; settlers to decide on slavery by popular sovereignty.",
        "Overturned the Missouri Compromise line of 1820.",
        "Violence between pro- and anti-slavery settlers ('Bleeding Kansas').",
        "The Republican Party was founded to oppose the spread of slavery.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain the significance of Lincoln's election as President in 1860.", points: [
        ["A purely Northern victory: no Southern electoral votes; showed the North could control the presidency.", 2],
        ["Southern fears: Republicans opposed the spread of slavery; Southerners believed slavery would be contained and destroyed.", 2],
        ["Led directly to secession: South Carolina (December 1860), the Confederacy (February 1861), and war.", 2],
      ], levels: levels(6), modelAnswer: "Lincoln's election was significant because he won without a single Southern electoral vote, which showed that the more populous North could now control the presidency on its own. Lincoln and the Republicans were committed to stopping the spread of slavery into the territories, and Southern leaders believed that slavery, unable to expand, would eventually be destroyed. As a result South Carolina seceded on 20 December 1860, six more states followed and formed the Confederate States of America in February 1861, and the conflict that led to war at Fort Sumter began before Lincoln even took office.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Economic differences between North and South were the main cause of the Civil War.\" How far do you agree? Explain your answer.", points: [
        ["Economic: industrial North and agricultural South; tariffs (Nullification crisis); different interests in Congress.", 2],
        ["Economic differences rested on slavery: cotton and enslaved labour; free labour in the North.", 2],
        ["Slavery and its expansion: 1820, 1850, 1854, Dred Scott; abolitionism; secession declarations named slavery.", 2],
        ["Political breakdown: Democrats split; Lincoln's election; states' rights; Fort Sumter.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Economic differences were real. The North was developing industry, banking and free wage labour, while the South depended on growing cotton for export. They disagreed about tariffs, which Northern industry wanted and the South opposed, and this had caused the Nullification crisis of 1832-33.\n\nHowever, the Southern economy rested on slavery, so economic differences were bound up with it. Every major crisis before the war concerned the expansion of slavery: the Missouri Compromise, the Compromise of 1850, the Kansas-Nebraska Act and the Dred Scott decision. Abolitionists and the Fugitive Slave Act deepened mistrust. When Lincoln, who opposed the spread of slavery, was elected, seceding states such as South Carolina named the protection of slavery as their reason for leaving. Political breakdown, including the split in the Democratic Party, was also caused by slavery.\n\nOverall I disagree. Economic differences contributed, but tariffs were not the issue that broke the Union. Slavery was the main cause, and the economic differences mattered mainly because the South's economy depended on enslaved labour.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the causes of the American Civil War (Option A, key question 4).",
  });

  // 6. US Civil War: victory and Reconstruction.
  b.struct({
    ...p1,
    concepts: ["hist.us-civil-war.northern-victory", "hist.us-civil-war.reconstruction"],
    stem: "**The Civil War and Reconstruction.** Answer all parts.",
    hints: ["(b) needs several explained reasons.", "(c) balances achievements against what was lost after 1877."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the part played by Black Americans in the Civil War.", points: [
        "Thousands of enslaved people escaped to Union lines.",
        "After the Emancipation Proclamation, about 180,000 Black soldiers served in the Union army (and others in the navy).",
        "Regiments such as the 54th Massachusetts fought in major actions (Fort Wagner, 1863).",
        "Faced unequal pay at first and danger of enslavement or death if captured.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why the North won the Civil War.", points: [
        ["Resources: population, industry, railways; the blockade starved the South.", 2],
        ["Strategy and turning points: Vicksburg and the Mississippi; Gettysburg; Grant's and Sherman's campaigns.", 2],
        ["Leadership and emancipation: Lincoln kept the border states, was re-elected in 1864, and emancipation brought Black soldiers and kept Britain out.", 2],
      ], levels: levels(6), modelAnswer: "The North had far greater resources: more than twice the population, most of the industry and railways, and a navy whose blockade caused shortages and inflation in the South. It used them through an effective strategy: Grant's capture of Vicksburg in July 1863 gave the Union the Mississippi and split the Confederacy, Lee's invasion was defeated at Gettysburg, and in 1864-65 Sherman destroyed the South's economy while Grant wore down Lee's army. Lincoln's leadership held the Union together: he kept the border states loyal and won re-election in 1864, and his Emancipation Proclamation brought about 180,000 Black soldiers into the army and made British recognition of the Confederacy unlikely.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"Reconstruction was a failure.\" How far do you agree? Explain your answer.", points: [
        ["Failure: Black Codes, Klan violence; no land, sharecropping and debt.", 2],
        ["Failure: after 1877 voting rights removed (poll taxes, literacy tests) and segregation introduced.", 2],
        ["Success: 13th, 14th and 15th Amendments; Freedmen's Bureau schools; Black officeholders (Hiram Revels).", 2],
        ["Success: Union restored; amendments later used by the civil rights movement.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "There is strong evidence that Reconstruction failed. Southern states passed Black Codes in 1865-66, and the Ku Klux Klan and other groups used terror to stop Black people voting. Freedpeople received no land, so many became sharecroppers trapped in debt. When federal troops were withdrawn in 1877, Southern governments used poll taxes, literacy tests and violence to remove Black voting rights and introduced segregation.\n\nHowever, Reconstruction achieved lasting changes. The 13th Amendment abolished slavery for ever, and the 14th and 15th Amendments wrote citizenship, equal protection and voting rights into the Constitution. The Freedmen's Bureau helped to set up thousands of schools, and Black men voted and held office, including Hiram Revels in the Senate. The Union was restored, and in the twentieth century the civil rights movement used the amendments to win equality in law.\n\nOverall Reconstruction failed in its aim of securing equal rights in the South, but it was not a complete failure, because it established the legal basis for later change.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the Civil War and Reconstruction (Option A, key question 4).",
  });

  // 7. Imperialism: motives and impacts in Africa.
  b.struct({
    ...p1,
    concepts: ["hist.imperialism.motives", "hist.imperialism.belgian-congo", "hist.imperialism.french-british-africa"],
    stem: "**European imperialism in Africa.** Answer all parts.",
    hints: ["(b) needs a range of motives with examples.", "(c) compares Senegal, Nigeria and the Congo."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the international campaign against Leopold II's rule in the Congo.", points: [
        "Missionaries and visitors reported abuses (Williams' open letter 1890; Harris's photographs).",
        "Morel showed from shipping records that rubber was taken without payment.",
        "Casement's report (1904); Congo Reform Association founded (1904) with mass meetings.",
        "Leopold's own commission confirmed abuses (1905); Belgium annexed the Congo (1908).",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why European powers wanted colonies in Africa in the late nineteenth century.", points: [
        ["Economic: raw materials (rubber, palm oil, minerals), markets and investment.", 2],
        ["Strategic and political: routes (Suez and Egypt, 1882), rivalry, prestige (France after 1871, Germany, Italy).", 2],
        ["Religious and cultural: missionaries; ideas of a civilising mission and racial superiority (presented critically).", 2],
      ], levels: levels(6), modelAnswer: "Industrial economies needed raw materials such as rubber, palm oil and minerals, and manufacturers and investors wanted new markets and profitable projects, especially after the depression of the 1870s. There were also strategic and political motives: Britain occupied Egypt in 1882 to protect the Suez route to India, and powers claimed land to block rivals. France sought colonies to restore its pride after defeat in 1871, while Germany and Italy wanted them as signs of great-power status. Missionaries pressed for European control to spread Christianity and end the slave trade, and false ideas of racial superiority and a 'civilising mission' made conquest seem acceptable to European voters.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"The impacts of European imperialism on Africans were much the same everywhere.\" How far do you agree? Explain your answer.", points: [
        ["Same: taxes, labour demands and export crops in Senegal, Nigeria and the Congo; no political say for most.", 2],
        ["Same: rule backed by force; African rulers made into agents or supervised.", 2],
        ["Different: Congo Free State's forced-labour rubber system and huge loss of life (estimates vary).", 2],
        ["Different: citizenship in the Four Communes; emirs kept power in Northern Nigeria; warrant chiefs in the south-east; elites versus ordinary people.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Some impacts were similar everywhere. In Senegal, Nigeria and the Congo, Africans paid taxes, were pressed to produce export crops or rubber, and had no real say in how they were governed. Colonial rule everywhere was backed by force, and African rulers either became agents of the colonial power or ruled under its supervision.\n\nHowever, the differences were very large. In the Congo Free State, forced labour to collect rubber was enforced by hostage-taking and killing, and the population fell severely; estimates vary, but many historians believe millions died. Nothing on that scale happened in Senegal or Nigeria. In Senegal the Four Communes had French citizenship and a deputy in Paris, while most other Africans were subjects under the indigénat. In Northern Nigeria the emirs kept much of their power, while in the south-east the British imposed unpopular warrant chiefs. Educated elites often had very different experiences from peasants.\n\nOverall I disagree. All Africans lost their independence and paid for colonial rule, but the type of rule, the colonial power and a person's class and region produced very different impacts, with the Congo an extreme case.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on imperialism in Africa (Option A, key question 5).",
  });

  // 8. Imperialism: India.
  b.struct({
    ...p1,
    concepts: ["hist.imperialism.india-1857"],
    stem: "**The British in India.** Answer all parts.",
    hints: ["(b) groups the grievances of different Indians.", "(c) compares what changed with what stayed the same."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the policies of Lord Dalhousie as Governor-General of India (1848-1856).", points: [
        "Doctrine of Lapse: refused to recognise adopted heirs.",
        "Annexed states such as Satara, Jhansi and Nagpur.",
        "Annexed Awadh (1856), claiming misgovernment.",
        "Modernising projects / reforms (railways, telegraph; Widows' Remarriage Act 1856) seen by some as interference.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why many Indians resisted British rule in 1857.", points: [
        ["Political: annexations (Doctrine of Lapse, Awadh) angered princes, landowners and sepoys.", 2],
        ["Religious and social fears: missionaries, reforms, overseas service; the greased cartridges.", 2],
        ["Economic: land revenue demands dispossessed landowners and burdened peasants; weavers hurt by imports.", 2],
      ], levels: levels(6), modelAnswer: "Many princes, landowners and soldiers resisted because of political grievances. Dalhousie's Doctrine of Lapse had annexed states such as Jhansi, and the annexation of Awadh in 1856 angered the many Bengal sepoys who came from there. Religious fears were widespread: missionaries were active, and reforms such as the Widows' Remarriage Act and the law on overseas service seemed to threaten religion and caste, so the rumour about greased cartridges was believed. Economic grievances also mattered: heavy land revenue demands had taken estates from landowners and burdened peasants, who joined the sepoys in many areas.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"The rising of 1857 completely changed British rule in India.\" How far do you agree? Explain your answer.", points: [
        ["Change: Government of India Act 1858 ended Company rule; Crown, Secretary of State, Viceroy.", 2],
        ["Change: Victoria's proclamation (toleration, no more annexations, respect for princes); army reorganised; Mughal Empire ended.", 2],
        ["Continuity: Britain still ruled without Indian consent; same officials and economic policies; more British troops meant firmer control.", 2],
        ["Continuity: mistrust and racial attitudes hardened rather than eased; Indians had no political power until later.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The rising brought major changes. The Government of India Act 1858 ended the rule of the East India Company, and India was governed by the Crown through a Secretary of State in London and a Viceroy in India. Victoria's proclamation promised religious toleration and respect for the princes, and the Doctrine of Lapse was abandoned. The army was reorganised with more British soldiers and recruits from groups that had stayed loyal, and the Mughal Empire came to an end.\n\nHowever, much stayed the same. Britain still ruled India without the consent of Indians, many of the same officials remained, and economic policies continued to serve British interests. In some ways control became firmer, because there were more British troops and racial attitudes hardened, so relations between rulers and ruled became more distant.\n\nOverall I partly agree. The system of government changed completely, from a company to the Crown, but the fact of British rule and its purposes did not change; Indians gained little say in their own government until much later.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on the British in India and 1857 (Option A, key question 5).",
  });

  // 9. Imperialism: the USA.
  b.struct({
    ...p1,
    concepts: ["hist.imperialism.us-empire"],
    stem: "**The United States and the former Spanish colonies.** Answer all parts.",
    hints: ["(b) needs the arguments of the anti-imperialists, each explained.", "(c) compares Cuba with the Philippines, Puerto Rico and Guam."],
    parts: checkExam(C1, [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the terms of the Treaty of Paris (December 1898).", points: [
        "Spain gave up its claim to Cuba.",
        "Spain ceded Puerto Rico and Guam to the USA.",
        "Spain ceded the Philippines to the USA.",
        "The USA paid Spain 20 million dollars; ratified by the US Senate by a narrow margin (February 1899).",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 6, type: X, stem: "Explain why there was opposition in the United States to the annexation of the Philippines.", points: [
        ["Principle: rule without consent betrayed the Declaration of Independence and the Constitution.", 2],
        ["Cost and danger: a costly colonial war (Philippine-American War) and entanglement in Asia.", 2],
        ["Racist fears among some opponents of non-white peoples becoming part of the USA; economic competition (labour, sugar).", 2],
      ], levels: levels(6), modelAnswer: "Many Americans, including members of the Anti-Imperialist League such as Mark Twain and Andrew Carnegie, believed that ruling people without their consent betrayed the Declaration of Independence and the Constitution, since the USA had itself been born in a revolt against an empire. Others pointed to the cost: from February 1899 the USA was fighting a long and brutal war against Filipinos, and colonies in Asia might drag the country into conflicts with other powers. Some opponents also had racist reasons, fearing that annexation would make non-white peoples part of the United States, and some farmers and workers feared competition from Philippine goods and labour.", explanation: "Explained reasons reach the top level." }),
      P.manual({ label: "(c)", marks: 10, type: X, stem: "\"The United States became an imperial power in the years 1898-1906.\" How far do you agree? Explain your answer.", points: [
        ["Agree: annexed Puerto Rico, Guam and the Philippines (and Hawaii) without consent.", 2],
        ["Agree: Philippine-American War; Platt Amendment, Guantánamo, intervention in Cuba (1906).", 2],
        ["Disagree: Teller Amendment; Cuba independent (1902); promises of self-government in the Philippines (Assembly 1907).", 2],
        ["Disagree: small empire compared with Britain or France; strong anti-imperialist opposition at home.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "There is strong evidence that the USA became an imperial power. In 1898 it annexed Hawaii and, by the Treaty of Paris, took Puerto Rico, Guam and the Philippines without the consent of their people. It then fought a war from 1899 against Filipinos seeking independence, at great cost in Filipino lives. In Cuba it forced the Platt Amendment into the constitution, gained the base at Guantánamo and sent troops back in 1906.\n\nHowever, the USA was not an imperial power in the same way as Britain or France. The Teller Amendment ruled out annexing Cuba, which became independent in 1902, and American officials promised the Philippines eventual self-government, setting up an elected assembly in 1907. Its overseas territories were small, and there was strong opposition to empire in the USA, as the close vote on the treaty showed.\n\nOverall I largely agree. The USA used different methods, such as informal control in Cuba, but by 1906 it ruled colonies and intervened in a supposedly independent state, which made it an imperial power.", explanation: "Both sides and a supported judgement for the top level." }),
    ]),
    explanation: "Cambridge 0470 Paper 1 style structured essay on US imperialism, 1898-1906 (Option A, key question 5).",
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Paper 2 document questions.
  // 10. 1848: why did revolution break out?
  b.struct({
    ...p2,
    concepts: ["hist.revolutions-1848.causes"],
    stem: `**Why did revolution break out in 1848?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in German satirical magazines in April 1848, described in words", "An elderly statesman in a powdered wig and court dress sits in a carriage piled high with trunks, whipping the horses towards a signpost marked 'To London'. Behind him a crowd of students, workers and men in top hats wave banners reading 'Constitution' and 'Freedom of the Press'. In the road lies a huge broken pair of scissors labelled 'Censor'.", { described: true }),
      source("Source B", "a petition from a fictional group of unemployed weavers to the council of a small Prussian town, January 1848", "We have woven cloth for this town all our lives. Now the factory in the next valley sells it for less than our thread costs us, and the merchant gives us no more work. Bread costs half as much again as it did two years ago. We do not ask for charity, only for work and bread at a price an honest man can pay."),
      source("Source C", "an article in a fictional liberal newspaper in Baden, 1 March 1848", "France is a republic! The king who boasted that his throne was safe has fled in a hired cab. Let our own princes take note. The people of Germany ask for no more than the French have taken: a free press, trial by jury, a parliament for all Germany. Grant them now, and in peace, or the people will take them."),
      source("Source D", "a report from a fictional police official in Vienna to the Ministry of Police, December 1847", "The students and young lawyers talk openly in the coffee houses of a constitution and read forbidden newspapers smuggled from abroad. The lower classes care nothing for such ideas; their only complaint is the price of bread and the lack of work in the suburbs. So long as bread becomes cheaper, I see no danger of disorder."),
      source("Source E", "from the memoirs of a fictional member of the French parliament, written in 1860", "We did not want a revolution. We wanted the vote for a few hundred thousand more men of property, and we held our banquets to ask for it. When the government banned the banquet and the soldiers fired on the crowd, everything changed in a night. By the morning of the 24th the king was gone, and we who had asked for reform found ourselves governing a republic."),
      source("Source F", "a letter from a fictional British diplomat in Berlin to the Foreign Office in London, 20 March 1848", "The King has given way on every point: a constitution, a free press, liberal ministers. He has not been defeated, for his army is intact; he has been frightened. Every courier from Paris and Vienna has shaken him further. The people here seem to want what the people everywhere want this spring, and they have learned from the newspapers that it can be had."),
    ])}`,
    hints: ["For every source, ask who produced it, when, and why.", "In (e), group the sources by the cause they support and test each one."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: Metternich is fleeing / the old order has collapsed.", 2],
        ["Big message: the people's liberal demands (constitution, press freedom) have driven out the system of repression, and censorship is broken.", 3],
        ["Supported by details (carriage, 'To London', banners, broken scissors) and knowledge (Metternich resigned 13 March 1848 and fled to Britain; censorship under his system).", 2],
      ], levels: levels(7), modelAnswer: "On the surface the cartoon shows Metternich fleeing in a carriage towards London, chased by a crowd. Its main message is that the people's liberal demands have overthrown the system of repression: the banners call for a constitution and a free press, and the broken scissors show that censorship has been destroyed. The crowd includes students, workers and middle-class men, suggesting that all classes united against him. This fits my knowledge: after the rising in Vienna on 13 March 1848 Metternich resigned and fled, eventually to Britain, and his system had relied on censorship and police control.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and D. How far does Source D support what Source B says about discontent before 1848?", points: [
        ["Support: D agrees that the lower classes complained about bread prices and lack of work, as B does.", 2],
        ["Support: both suggest workers' discontent was economic rather than political.", 2],
        ["Difference: D adds that educated people wanted a constitution, which B does not mention; D thinks there is no danger.", 2],
        ["Judgement: D supports B's account of economic hardship but underestimates its danger; different places (Prussia, Vienna).", 2],
      ], levels: levels(8), modelAnswer: "Source D largely supports Source B. Both say that the poorer classes were suffering from high bread prices and a lack of work: B's weavers complain that bread costs half as much again and that they have no work, and D reports that the lower classes complain only of the price of bread and unemployment. Both suggest that workers' grievances were economic rather than political. However, D adds a political element missing from B: students and young lawyers wanted a constitution and read forbidden newspapers. D also concludes that there was no danger of disorder, while B's petition shows desperate people. So D supports B on the nature of workers' discontent but not on how serious it was, and the two describe different places, Prussia and Vienna.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source C. Why was this article published on 1 March 1848? Use the source and your knowledge to explain your answer.", points: [
        ["Context: news of the February Revolution in Paris (Louis Philippe's abdication, 24 February) had just arrived.", 2],
        ["Purpose: to pressure the German princes to grant liberal reforms (free press, juries, a German parliament) by warning that otherwise the people would act.", 3],
        ["Supported by details ('Grant them now... or the people will take them') and knowledge (princes did grant reforms in March; Frankfurt Parliament).", 2],
      ], levels: levels(7), modelAnswer: "The article was published because news had just arrived that Louis Philippe had abdicated on 24 February and France had become a republic. Its purpose was to use this news to put pressure on the German princes. It reminds them that a king who thought he was safe has fled, sets out the liberal demands of a free press, trial by jury and a parliament for all Germany, and warns that if the princes do not grant them peacefully, the people will take them. The tactic worked: in March 1848 rulers across the German states appointed liberal ministers and promised reforms, and elections were held for the Frankfurt Parliament.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Source E. How reliable is this account of the February Revolution in Paris? Use the source and your knowledge to explain your answer.", points: [
        ["Provenance: written in 1860 by a deputy involved in the reform campaign; hindsight and self-justification (presents himself as a moderate who did not want revolution).", 2],
        ["Content confirmed: banquet campaign for a wider franchise; banquet banned; shots fired on the crowd; king gone by 24 February.", 2],
        ["Content plausible: the reformers' aim was a limited extension of the vote, not a republic.", 2],
        ["Judgement: reliable on events, less so on motives; written under the Second Empire, which may affect tone.", 2],
      ], levels: levels(8), modelAnswer: "Source E was written in 1860, twelve years after the events, by a member of parliament who took part in the reform campaign, so it may be affected by hindsight and by his wish to present himself as a moderate who never intended revolution. By 1860 France was ruled by Napoleon III, so a former reformer might want to distance himself from the republic. However, its account of events is confirmed by my knowledge: the reformers held political banquets to demand a wider franchise, the government banned one in February 1848, troops fired on the crowd, and by 24 February Louis Philippe had abdicated. Its claim that the reformers wanted only a limited extension of the vote also fits what is known of the moderate opposition. It is reliable about what happened, but less reliable about the motives of everyone involved.", explanation: "Uses provenance and knowledge to judge reliability." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that economic hardship was the main cause of the revolutions of 1848? Use the sources to explain your answer.", points: [
        ["Sources supporting economic hardship (B, D) explained with details.", 3],
        ["Sources supporting other causes: liberal demands and censorship (A, C, D), the example of Paris and rulers' fear (C, E, F).", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Some sources support the view that economic hardship was the main cause. Source B shows unemployed weavers facing bread prices half as high again and competition from factories, and Source D, a police report not written to persuade anyone, confirms that the lower classes were angry about bread prices and lack of work. My knowledge supports this: the harvest failures of 1845-47 and the financial crisis of 1847 caused hunger and unemployment.\n\nHowever, most of the sources point to other causes. Source A shows the crowd demanding a constitution and press freedom, and Source D itself says students and lawyers wanted a constitution. Sources C, E and F show the importance of Paris: news of the French king's fall encouraged reformers and frightened rulers, and the diplomat in F says the Prussian king was not defeated but frightened. Source E also shows that the Paris revolution began with political demands for a wider franchise.\n\nThe sources are of mixed reliability: C is a persuasive liberal article and E a memoir written with hindsight, but D and F are reports written for officials, which makes them more convincing. Overall the sources show that economic hardship gave the revolutions mass support, but they provide more convincing evidence that political demands and the example of Paris explain why revolution broke out, so they do not prove that hardship was the main cause.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the outbreak of the 1848 revolutions (prescribed November 2027).",
  });

  // 11. 1848: why did the revolutions fail?
  b.struct({
    ...p2,
    concepts: ["hist.revolutions-1848.events-outcomes"],
    stem: `**Why did the revolutions of 1848 fail?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in French conservative newspapers in July 1848, described in words", "A plump shopkeeper in an apron and a soldier in a kepi shake hands warmly in a Paris street. Between them lies a heap of paving stones from a dismantled barricade. In the background, a ragged figure holding a broken red flag slinks away down an alley. The caption reads: 'Order restored: the honest citizen thanks his protector.'", { described: true }),
      source("Source B", "a proclamation by a fictional assembly of Croatian notables, summer 1848", "The Magyars demand freedom for themselves and deny it to us. They would force their language on our schools and our courts. We will not exchange the rule of Vienna for the rule of Pest. Croatia stands with the Emperor, who alone can protect the rights of all his peoples."),
      source("Source C", "a letter written by a fictional Hungarian officer to his wife, August 1849", "We beat the Austrians in the spring, and we would have beaten them again. But no army can fight two empires at once. When the Tsar's columns crossed the mountains, there were three of them for every one of us. The General has decided to lay down our arms to the Russians. God forgive us, there was no other way."),
      source("Source D", "a diary entry by a fictional student in Vienna, November 1848", "In March the whole city was with us; the peasants who came to market cheered our banners. Since the robot was abolished they stay at home and care nothing for the constitution. The workers fought bravely in October, but the shopkeepers closed their doors to them. Now Windischgrätz's soldiers are everywhere, and our leaders are shot or in hiding."),
      source("Source E", "an order of the day issued by a fictional Austrian general to his troops, 1849 (published in an army newspaper)", "Soldiers! While lawyers and students talked in Vienna, you stood firm. While the provinces quarrelled, you remained one army under one Emperor. The Empire lives because you live. Remember that the colours of your regiment are older than any parliament."),
      source("Source F", "an article in a fictional radical newspaper published by exiles in London, 1850", "The revolution was not defeated by kings; it was betrayed by those who feared the people more than the kings. The liberals of 1848 wanted constitutions for the rich. When the workers asked for bread and work, the liberals called in the soldiers. Next time the people will not trust them."),
    ])}`,
    hints: ["Identify which cause of failure each source supports.", "Consider how the provenance of each source affects how far you trust it."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: the army has crushed the rising and restored order.", 2],
        ["Big message: the middle class (shopkeeper) has allied with the army against the workers and welcomes it; the radical cause is defeated and disgraced.", 3],
        ["Supported by details (handshake, dismantled barricade, broken red flag) and knowledge (June Days, Cavaignac, middle-class fear of socialism).", 2],
      ], levels: levels(7), modelAnswer: "The cartoon shows a shopkeeper thanking a soldier after a barricade has been pulled down, while a ragged figure with a broken red flag slinks away. Its message is that the middle class welcomed the army's defeat of the workers and saw it as the restoration of order. The cartoonist approves of this alliance: the shopkeeper is 'honest' and the soldier is his 'protector', while the radical is shown as a defeated, shameful figure. This fits the June Days of 1848, when General Cavaignac crushed the rising of Paris workers after the National Workshops were closed, with the support of a middle class that feared socialism.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources D and F. How far do these two sources agree about why the revolutions failed?", points: [
        ["Agree: both say the middle class / shopkeepers / liberals abandoned the workers.", 2],
        ["Agree: both point to the role of soldiers in defeating the revolution.", 2],
        ["Disagree: D adds the peasants' loss of interest after the end of the robot; F blames the liberals' betrayal above all.", 2],
        ["Disagree: D is sorrowful and descriptive; F is angry and political; judgement on the extent of agreement.", 2],
      ], levels: levels(8), modelAnswer: "The two sources agree on an important point. Both say that the middle classes turned against the workers: in D the shopkeepers close their doors to the workers in October, and in F the liberals call in the soldiers when workers ask for bread and work. Both also show soldiers defeating the revolution. But they differ in their explanation. Source D also blames the peasants, who lost interest once the robot was abolished, and the military power of Windischgrätz; Source F says the revolution was betrayed, not defeated by kings, and puts all the blame on the liberals. D is a private diary recording events with regret, while F is a political article written to persuade. They agree about the split between classes but disagree about whether it was the only cause.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source F. Why was this article published in 1850? Use the source and your knowledge to explain your answer.", points: [
        ["Context: the revolutions had been crushed by 1849; radical exiles in London; reaction across Europe (Louis Napoleon, Franz Joseph).", 2],
        ["Purpose: to blame the liberals for the failure and persuade workers not to trust them in a future revolution.", 3],
        ["Supported by details ('Next time the people will not trust them') and knowledge (June Days; liberals' fear of socialism).", 2],
      ], levels: levels(7), modelAnswer: "The article was published in 1850, after the revolutions had been crushed and many radicals had fled into exile in London, where they argued about why they had lost. Its purpose was to blame the liberals for the defeat and to persuade workers that in any future revolution they must not trust the middle class. It says the liberals wanted constitutions only for the rich and called in the soldiers when workers asked for bread, which refers to events such as the June Days in Paris. The final sentence, 'Next time the people will not trust them', shows that it was looking ahead to another revolution.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Sources B and C. How useful are these sources as evidence about why the Hungarian revolution failed? Use the sources and your knowledge to explain your answer.", points: [
        ["B useful: shows national rivalry; minorities (Croats) feared Magyar rule and sided with the Emperor (Jelačić invaded in September 1848).", 2],
        ["C useful: shows Russian intervention decided the war; surrender at Világos (August 1849).", 2],
        ["Provenance: B a public proclamation with a persuasive purpose; C a private letter by a participant, who may exaggerate Russian numbers to explain defeat.", 2],
        ["Judgement: together they show the main reasons (national divisions and Russia) but miss other factors (Austria's recovery).", 2],
      ], levels: levels(8), modelAnswer: "Both sources are useful. Source B shows the national rivalries within Hungary: Croats feared that the Magyars would deny them their language and rights, so they sided with the Emperor. My knowledge confirms that Jelačić, the governor of Croatia, invaded Hungary in September 1848. Source C shows the decisive role of Russian intervention: the officer says the Hungarians had beaten the Austrians but could not fight two empires, and the army surrendered to the Russians at Világos in August 1849. B is a public proclamation designed to justify Croatia's choice, and C is a private letter written in grief, which may exaggerate the Russian numbers to explain the defeat. Together they explain two key reasons for failure, though they say little about how Austria itself recovered under Schwarzenberg and Franz Joseph.", explanation: "Uses content, provenance and knowledge." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that the revolutions of 1848 failed because the revolutionaries were divided? Use the sources to explain your answer.", points: [
        ["Sources supporting division (A, B, D, F) explained with details.", 3],
        ["Sources supporting other causes: the army (A, D, E) and foreign intervention (C).", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Several sources show that divisions caused the failure. Source A shows the middle class welcoming the army's defeat of the workers, Source F blames liberals who feared the people, and Source D describes shopkeepers closing their doors to the workers and peasants losing interest once the robot was abolished. Source B shows national division: Croats preferred the Emperor to Magyar rule. My knowledge supports these points, from the June Days to Jelačić's invasion of Hungary.\n\nHowever, other sources stress the strength of the old order. Source E says the army stood firm and united while others quarrelled, and Source D mentions Windischgrätz's soldiers. Source C shows that Hungary, which had beaten Austria, was defeated by Russian intervention, not by division.\n\nThe sources vary in reliability: F is radical propaganda and E is an army proclamation praising its own troops, while D and C are private writings by participants, which makes them more convincing. Overall the sources provide convincing evidence that divisions weakened the revolutions, but they also show that divisions only proved fatal because loyal armies and foreign intervention were ready to take advantage of them.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the failure of the 1848 revolutions (prescribed November 2027).",
  });

  // 12. Italy: Garibaldi and Cavour in 1860.
  b.struct({
    ...p2,
    concepts: ["hist.italy.garibaldi-completion", "hist.italy.cavour"],
    stem: `**Garibaldi, Cavour and the south, 1860.** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in British magazines in November 1860, described in words", "Garibaldi, in a red shirt and with a sword at his side, kneels to hand a crown labelled 'Naples and Sicily' to a smiling Victor Emmanuel. Half hidden behind a curtain at the side stands a small man in spectacles labelled 'Cavour', holding a map on which an arrow pointing to 'Rome' has been crossed out.", { described: true }),
      source("Source B", "a letter from a fictional Piedmontese diplomat in Naples to the government in Turin, August 1860", "The General's popularity here is beyond description; the crowds would follow him anywhere. That is the danger. Around him are men of Mazzini's party who speak openly of marching on Rome and proclaiming a republic. If he moves on Rome, the French will fight, and all we have gained may be lost. The King's army must reach the south before he does."),
      source("Source C", "an article in a fictional Palermo newspaper, June 1860", "Sicily is free! The Bourbon soldiers who bombarded our city have sailed away, and the tricolour flies over the royal palace. It was not diplomats who freed us but a thousand brave men and the people of Palermo who rose to meet them. Long live Garibaldi! Long live Italy and Victor Emmanuel!"),
      source("Source D", "from the memoirs of a fictional officer of the Neapolitan (Bourbon) army, written in 1875", "We had more men, more guns and the forts. What we lacked was the will to fight. Our generals were old and many had already made their peace with the other side. Orders came late or not at all. When the King left Naples for Gaeta, many officers simply went home. I do not say Garibaldi was not brave; I say we made his task easy."),
      source("Source E", "a speech by a fictional deputy in the Piedmontese parliament in Turin, October 1860", "Let no one forget whose hand guided these events. While the volunteers fought in Sicily, Count Cavour kept Europe quiet. It was the King's army that secured the Marches and Umbria and defeated the Pope's mercenaries, and it is the King's government that will give the south order and good laws. Enthusiasm wins battles; statesmanship wins nations."),
      source("Source F", "a letter written by a fictional English volunteer with Garibaldi, near Teano, October 1860", "Today the General rode to meet the King and greeted him as King of Italy. He asked for nothing for himself, not even that his men be given commissions in the royal army. The regular officers looked at our red shirts as if we were bandits. Tomorrow he leaves for his island with a bag of seed corn and little else."),
    ])}`,
    hints: ["Decide which sources give credit to Garibaldi and which to Cavour and the King.", "Check every claim against what you know about 1860."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: Garibaldi handed the south to Victor Emmanuel.", 2],
        ["Big message: Garibaldi made the conquest and selflessly gave it away, while Cavour worked behind the scenes and stopped the advance on Rome.", 3],
        ["Supported by details (kneeling, crown, curtain, crossed-out arrow) and knowledge (Teano, 26 October 1860; Piedmontese army through the Papal States; Rome left alone).", 2],
      ], levels: levels(7), modelAnswer: "The cartoon shows Garibaldi kneeling to hand the crown of Naples and Sicily to Victor Emmanuel, which refers to the meeting at Teano on 26 October 1860. Its wider message is that Garibaldi did the conquering and then generously gave his conquest to the king, while Cavour stayed behind the curtain, controlling events quietly; the crossed-out arrow to Rome shows that Cavour stopped Garibaldi from marching on Rome. This fits my knowledge: Cavour sent the Piedmontese army through the Papal States to reach the south first, deliberately avoiding Rome, which was protected by French troops.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and E. How far do these two sources agree about the role of Cavour and the Piedmontese government in 1860?", points: [
        ["Agree: both show the government acting to control events in the south (the King's army moving south).", 2],
        ["Agree: both stress the danger of war with France / Cavour keeping Europe quiet.", 2],
        ["Disagree: B shows the government anxious and reacting to Garibaldi's popularity; E presents Cavour as guiding events from the start.", 2],
        ["Disagree: B admits Garibaldi's huge popularity; E plays down the volunteers ('enthusiasm wins battles'); judgement.", 2],
      ], levels: levels(8), modelAnswer: "The sources agree that the Piedmontese government acted to control the south. Source B urges that the King's army must reach the south before Garibaldi moves on Rome, and Source E praises the King's army for securing the Marches and Umbria. Both also show that avoiding conflict with France and the other powers was central: B fears that the French will fight, and E says Cavour kept Europe quiet. However, they differ in tone and in what they claim. Source B, a private letter, shows a government that is anxious and reacting to Garibaldi's enormous popularity, while Source E, a public speech, claims that Cavour guided events all along and dismisses the volunteers as mere enthusiasm. They agree on what the government did but disagree about whether it was in control.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source E. Why was this speech made in October 1860? Use the source and your knowledge to explain your answer.", points: [
        ["Context: Garibaldi had conquered the south; the Piedmontese army had invaded the Papal States; plebiscites and the handover were taking place.", 2],
        ["Purpose: to claim the credit for the King and Cavour rather than Garibaldi, and to justify the government taking control of the south.", 3],
        ["Supported by details ('whose hand guided these events'; 'statesmanship wins nations') and knowledge (Castelfidardo; plebiscites; Teano).", 2],
      ], levels: levels(7), modelAnswer: "The speech was made in October 1860, when Garibaldi had conquered Sicily and Naples, the Piedmontese army had invaded the Papal States and defeated the papal army at Castelfidardo, and plebiscites were being held on union with Piedmont. The question of who would govern the south, Garibaldi's followers or the King's ministers, was urgent. The deputy's purpose was to claim the credit for Cavour and the King and to justify the government taking over the south. He reminds listeners that Cavour kept Europe quiet and the King's army won in the Marches and Umbria, and contrasts mere 'enthusiasm' with 'statesmanship' to play down Garibaldi's role.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Source D. How reliable is this account of the collapse of the Bourbon army? Use the source and your knowledge to explain your answer.", points: [
        ["Provenance: written in 1875 by a Bourbon officer; hindsight; may wish to explain or excuse the defeat (blaming generals and the King).", 2],
        ["Also: a defeated officer admitting weakness and praising the enemy's courage is less likely to be exaggerating in his own favour.", 2],
        ["Content confirmed: the Bourbon army was larger but poorly led; Francis II left Naples for Gaeta; Garibaldi entered Naples (7 September).", 2],
        ["Judgement on reliability, supported.", 2],
      ], levels: levels(8), modelAnswer: "Source D was written in 1875, fifteen years later, by an officer of the defeated army, so it may suffer from hindsight, and he may want to blame his generals and the King rather than himself. On the other hand, he admits his own side's weakness and praises Garibaldi's courage, which suggests he is not simply making excuses. Its content is supported by my knowledge: the Bourbon army was much larger than Garibaldi's force but poorly led and demoralised, King Francis II left Naples for Gaeta, and Garibaldi entered the city on 7 September 1860 without a fight. It is a fairly reliable account of why the army collapsed, although it gives only one officer's view.", explanation: "Uses provenance and knowledge to judge reliability." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that Garibaldi was more important than Cavour in the events of 1860? Use the sources to explain your answer.", points: [
        ["Sources supporting Garibaldi (A, B, C, F) explained with details.", 3],
        ["Sources supporting Cavour and the government or other factors (A, B, D, E) explained with details.", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Several sources suggest that Garibaldi was more important. Source C says that Sicily was freed not by diplomats but by the Thousand and the people of Palermo, Source B describes Garibaldi's enormous popularity, Source F shows that he handed over his conquest and asked for nothing, and Source A shows him giving the crown of the south to the king.\n\nOther sources point to Cavour and the government. Source E says Cavour kept Europe quiet and the King's army secured the Marches and Umbria, Source B shows the government planning to take control before Garibaldi reached Rome, and Source A shows Cavour stopping the advance on Rome. Source D suggests that the Bourbon army's collapse, not only Garibaldi's skill, explains his success.\n\nThe sources must be weighed. C is a celebratory Sicilian newspaper and E a partisan speech by a supporter of the government, so both exaggerate; B is a private diplomatic letter and D a defeated officer's memoir, which are more convincing. Overall the sources provide convincing evidence that Garibaldi was more important in conquering the south, but also that Cavour's diplomacy and the King's army decided how the south became part of Italy, so they show that both were essential.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on Garibaldi and Cavour in 1860 (Italy prescribed March and June 2028).",
  });

  // 13. Italy: Napoleon III and unification, 1858-1860.
  b.struct({
    ...p2,
    concepts: ["hist.italy.cavour"],
    stem: `**Did Napoleon III help Italian unification?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in French illustrated magazines in June 1859, described in words", "The French emperor, in a gardener's apron, waters a young tree labelled 'Italy' in a garden pot. An Austrian double-headed eagle perched on the garden wall pecks at the leaves, while a small boy labelled 'Piedmont' holds the watering can for the emperor. Behind them, a French soldier stands guard with a bayonet.", { described: true }),
      source("Source B", "an editorial in a fictional French Catholic newspaper, July 1859", "The Emperor has shown wisdom as well as courage. He has punished Austria at Solferino, but he has stopped before the revolution could reach the lands of the Holy Father. The peace of Villafranca preserves the Papal States and the rights of the Italian princes. French Catholics thank him."),
      source("Source C", "a letter from a fictional Piedmontese officer to his family, written the day after the battle of Solferino, June 1859", "The French bore the heaviest fighting in the centre, and without their guns we could never have held the ridge. Our own regiments fought well on the left. The cost is terrible: the wounded lie everywhere and the villages are full of them. Some of our officers say the Emperor is shaken by what he has seen."),
      source("Source D", "a letter from a fictional Tuscan nationalist to a friend in Turin, January 1860", "Paris tells us to take back our Grand Duke. We will not. Our assembly has voted for union with Piedmont, and the people will confirm it whenever they are asked. We did not wait for the Emperor's permission to drive out our rulers, and we will not wait for it now."),
      source("Source E", "an editorial in a fictional London newspaper, March 1860", "So the price is paid. Savoy and Nice, whose people never asked to be French, are handed to the Emperor as payment for his services in Lombardy. The Italian cause is a noble one, but it has a mercenary friend. Let Europe watch where Napoleon's ambitions turn next."),
      source("Source F", "from the memoirs of a fictional French diplomat, written in 1880", "The Emperor loved the idea of Italy, but he never wanted one strong Italy on France's border. A kingdom in the north, a kingdom in the centre, the Pope in Rome and the Bourbons in Naples, all looking to Paris: that was his dream. He did not foresee Garibaldi, and when the south fell he could only accept what he could not prevent."),
    ])}`,
    hints: ["Think about what Napoleon III wanted and what he actually did.", "Each source's nationality and date affect its view."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: Napoleon III is helping Italy to grow, protecting it from Austria.", 2],
        ["Big message: Italy's growth depends on France; Napoleon is the true protector and Piedmont is a junior helper (favourable to Napoleon, a French view).", 3],
        ["Supported by details (gardener, small boy with the can, eagle, guard) and knowledge (Plombières; French army at Magenta and Solferino, June 1859).", 2],
      ], levels: levels(7), modelAnswer: "The cartoon shows Napoleon III as a gardener watering a young tree called Italy while an Austrian eagle pecks at it. Its message is that Italy is growing thanks to France: Napoleon is its protector against Austria, and Piedmont is shown as a small boy who merely holds the watering can. The French soldier on guard shows French military power defending the new Italy. As a French cartoon of June 1859, it flatters the emperor. It fits my knowledge: after the Plombières agreement the French army fought alongside Piedmont and won at Magenta and Solferino in June 1859.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and E. How far would the writer of Source B have agreed with Source E?", points: [
        ["Agree: both accept that Napoleon helped to defeat Austria in Lombardy.", 2],
        ["Disagree: B praises Napoleon for stopping (Villafranca) to protect the pope and the princes; E criticises him as mercenary for taking Nice and Savoy.", 2],
        ["Disagree: B is a French Catholic view welcoming limits on Italian change; E is a British view sympathetic to the Italian cause and suspicious of Napoleon's ambitions.", 2],
        ["Judgement: little agreement; different dates (July 1859, March 1860) and different concerns.", 2],
      ], levels: levels(8), modelAnswer: "The writer of Source B would have agreed with Source E only that Napoleon had helped to defeat Austria, since B praises his victory at Solferino and E mentions his 'services in Lombardy'. Otherwise they would disagree strongly. B praises Napoleon for stopping at Villafranca before revolution reached the pope's lands and for protecting the Italian princes, while E is sympathetic to the Italian cause and attacks Napoleon as a mercenary friend who took Nice and Savoy as payment. B is a French Catholic paper concerned for the pope; E is a British paper suspicious of French ambitions. They were also written at different times: B after Villafranca, E after the Treaty of Turin. Overall there would be very little agreement.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source E. Why was this editorial published in March 1860? Use the source and your knowledge to explain your answer.", points: [
        ["Context: Treaty of Turin (March 1860) ceded Nice and Savoy to France; plebiscites in central Italy.", 2],
        ["Purpose: to criticise Napoleon as self-interested and warn British readers / Europe about his ambitions.", 3],
        ["Supported by details ('mercenary friend'; 'where Napoleon's ambitions turn next') and knowledge (British suspicion of France; Britain's support for Italian self-determination).", 2],
      ], levels: levels(7), modelAnswer: "The editorial was published in March 1860, when, by the Treaty of Turin, Piedmont ceded Nice and Savoy to France so that Napoleon III would accept its annexation of the central Italian states. The writer wanted to criticise Napoleon as self-interested: he calls him a 'mercenary friend' of Italy who has taken territory as payment. It also aims to warn British readers that French ambitions were growing ('Let Europe watch where Napoleon's ambitions turn next'). This reflects British attitudes at the time: Britain sympathised with Italians' right to choose their government but was deeply suspicious of Napoleon III.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Source F. Are you surprised by what this French diplomat says about Napoleon III's aims? Use the source and your knowledge to explain your answer.", points: [
        ["Not surprised: matches the Plombières plan (kingdom of Upper Italy, central kingdom, confederation under the pope).", 2],
        ["Not surprised: Villafranca and French protection of Rome until 1870 show Napoleon's limits; he did not plan Garibaldi's conquest.", 2],
        ["Could be surprising: a French diplomat criticising his former emperor; but written in 1880 after Napoleon's fall (1870), so freer to criticise.", 2],
        ["Judgement, supported by provenance and knowledge.", 2],
      ], levels: levels(8), modelAnswer: "I am not surprised by what the diplomat says, because it matches what I know of Napoleon's plans. At Plombières in 1858 he agreed to a Kingdom of Upper Italy and a central Italian kingdom, with the pope as president of an Italian confederation, not a single strong state. His armistice at Villafranca and his protection of the pope in Rome until 1870 show that he did not want unification to go too far. It might seem surprising that a French diplomat should say his own emperor's plans failed, but he was writing in 1880, ten years after Napoleon III had fallen in 1870, when the Second Empire no longer existed and he was free to be critical. So the source is consistent with my knowledge and its provenance explains its frankness.", explanation: "Tests the source against knowledge and provenance." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that Napoleon III helped the unification of Italy? Use the sources to explain your answer.", points: [
        ["Sources showing help (A, C, and E's 'services in Lombardy') explained with details.", 3],
        ["Sources showing limits or self-interest (B, D, E, F) explained with details.", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Some sources show that Napoleon III helped. Source C, a Piedmontese officer's private letter, says the French bore the heaviest fighting at Solferino, and Source A shows France protecting the young tree of Italy from Austria. Even the hostile Source E admits his 'services in Lombardy'. My knowledge confirms that the French army won Magenta and Solferino, and Lombardy was gained.\n\nHowever, other sources show the limits of his help. Source B praises him for stopping at Villafranca to protect the pope and the princes, Source F says he never wanted a strong united Italy, and Source E says he took Nice and Savoy as payment. Source D shows that Tuscans acted against his wishes to join Piedmont, so central Italy was gained despite him rather than because of him.\n\nA, B and E reflect French and British opinions with their own interests, but C, a private letter from the battlefield, and F, a memoir by an insider written after his fall, are more convincing. Overall the sources provide convincing evidence that Napoleon helped to defeat Austria, which made unification possible, but they also show that he tried to limit it and acted for French interests, so his help was real but partial.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on Napoleon III and Italian unification (Italy prescribed March and June 2028).",
  });

  // 14. Imperialism: Leopold II and the Congo.
  b.struct({
    ...p2,
    concepts: ["hist.imperialism.belgian-congo", "hist.imperialism.motives"],
    stem: `**Leopold II's Congo Free State.** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a photograph of the kind taken by missionaries in the Congo around 1904, described in words", "A line of thin men carries large baskets of raw rubber towards a wooden building with a flag. Beside the doorway a European in a white suit and helmet sits at a table with a pair of scales and a ledger. Two African sentries with rifles stand behind the line of men. In the background, a group of women and children sits on the ground inside a fenced enclosure.", { described: true }),
      source("Source B", "a statement issued by a fictional official of the Congo Free State to European newspapers, 1905", "The State has suppressed the slave raiders, built steamers, posts and a railway, and opened the heart of Africa to civilisation. Like any government, it requires the natives to pay taxes, which they pay in labour since they have no money. Where agents have committed crimes, they have been punished. The State's critics are rival traders who want its wealth for themselves."),
      source("Source C", "evidence given by a fictional villager from the Equator district to a commission of inquiry in 1905, recorded through an interpreter", "Each moon the sentries came for rubber. If the baskets were light, they took our wives to the post until we brought more. My brother went into the forest for twenty days and came back with too little. They beat him with the chicotte before the whole village. Now the young men have run away and there is no one to clear the fields."),
      source("Source D", "a statement by a fictional former shipping clerk in Antwerp, published in a British newspaper in 1903", "For four years I recorded the cargoes. The ships from the Congo came in loaded with rubber and ivory worth millions. The ships returning to the Congo carried rifles, cartridges, chains and officers' baggage, but almost nothing that a trader would use to buy rubber. I asked myself how the rubber was being paid for. The answer was: it was not."),
      source("Source E", "an article in a fictional Belgian newspaper that supported the King, 1906", "His Majesty has given Belgium a colony eighty times its own size without asking the Belgian taxpayer for a single franc. The parks, avenues and monuments of our cities are his gift. Foreign jealousy now seeks to rob Belgium of what its King has won. Belgians should be proud, not ashamed."),
      source("Source F", "a speech by a fictional church minister at a Congo Reform Association meeting in Liverpool, 1907", "We do not attack the Belgian people. We attack a system that makes a man's life worth less than a basket of rubber. Let the Congo be governed by a responsible state, answerable to a parliament, under the treaties that Europe signed in Berlin. Until that day, every British Christian has a duty to speak."),
    ])}`,
    hints: ["Separate sources that defend the regime from those that attack it.", "Use your knowledge of the rubber system and the campaign of 1903-1908."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What can you learn from this photograph about how rubber was collected in the Congo Free State? Use details of the source and your knowledge.", points: [
        ["Surface: men delivered rubber that was weighed at a post.", 2],
        ["Inferences: collection was forced and supervised by armed sentries; women and children were held (hostages) to ensure delivery.", 3],
        ["Supported by details (scales, ledger, sentries, enclosure) and knowledge (quotas, hostage-taking, Force Publique, bonuses for agents).", 2],
      ], levels: levels(7), modelAnswer: "At the simplest level the photograph shows men bringing rubber to a post where a European agent weighs it and records it in a ledger, which suggests a quota system. It also shows that collection was enforced: armed African sentries stand behind the men. The women and children inside a fenced enclosure suggest that they were being held as hostages until the men delivered their rubber. This fits my knowledge: villages were given rubber quotas, the Force Publique and company sentries took hostages and punished shortfalls, and agents earned bonuses according to how much rubber they collected.", explanation: "Inference supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and C. How far does Source C challenge what Source B says?", points: [
        ["B: labour is a tax like any government's; crimes are rare and punished.", 2],
        ["C challenges: rubber taken by force, hostages, flogging; the system itself caused abuses.", 2],
        ["C challenges B's claim of civilisation: villages ruined, young men fled, fields not cleared (famine).", 2],
        ["Judgement: C strongly challenges B, though B's points about steamers and posts are not denied; provenance of each considered.", 2],
      ], levels: levels(8), modelAnswer: "Source C strongly challenges Source B. B claims that the State simply requires taxes paid in labour, like any government, and that crimes by agents are rare and punished. C describes a system of regular force: sentries came every month, took wives as hostages if the baskets were light and flogged the villager's brother with the chicotte in public. This suggests the abuses were part of the system, not occasional crimes. C also challenges B's claim to bring civilisation, since the young men have fled and the fields are not cleared, which would lead to hunger. C does not deny that the State built posts and steamers, but it shows what they were used for. B is propaganda by an official of the State, while C is the testimony of a victim to a commission, which makes C more convincing.", explanation: "Compares specific points of challenge and agreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source F. Why was this speech made in 1907? Use the source and your knowledge to explain your answer.", points: [
        ["Context: Casement Report (1904) and Leopold's commission (1905) had confirmed abuses; debate in Belgium about annexation; Leopold still in control in 1907.", 2],
        ["Purpose: to keep up British public pressure for the Congo to be taken from Leopold and governed by a responsible state (Belgium) under the Berlin treaties.", 3],
        ["Supported by details ('responsible state, answerable to a parliament'; 'duty to speak') and knowledge (Congo Reform Association meetings; annexation in 1908).", 2],
      ], levels: levels(7), modelAnswer: "The speech was made in 1907 because, although the Casement Report of 1904 and Leopold's own commission of 1905 had confirmed the abuses, Leopold still ruled the Congo, and the question of whether Belgium would take it over was being debated. The minister wanted to keep British public pressure on governments so that the Congo would be taken from Leopold and ruled by a responsible state answerable to a parliament, as the treaties signed at Berlin required. He is careful not to attack the Belgian people, only the system, so that Belgians might accept annexation. The campaign succeeded: Belgium annexed the Congo in 1908.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Sources D and E. Does Source E prove that the writer of Source D was wrong? Explain your answer.", points: [
        ["D's claim: rubber and ivory were taken without payment; ships carried weapons and chains, not trade goods.", 2],
        ["E's claim: the Congo cost Belgian taxpayers nothing and paid for Belgian monuments.", 2],
        ["E actually supports D: a colony that paid for monuments without cost suggests profits extracted without paying the Congolese.", 2],
        ["Provenance: E a pro-King paper in 1906 defending Leopold; D an insider's record, confirmed by the Casement Report and Leopold's own commission; judgement that E does not prove D wrong.", 2],
      ], levels: levels(8), modelAnswer: "Source D claims that the rubber and ivory leaving the Congo were not paid for, because ships going to the Congo carried rifles, cartridges and chains rather than trade goods. Source E does not prove D wrong. E boasts that the Congo cost the Belgian taxpayer nothing and that Leopold paid for parks and monuments with its wealth. This actually supports D: if huge profits came out of the Congo and nothing of value went in, the wealth must have been taken without paying the Congolese. E is a pro-King newspaper written in 1906 to defend Leopold against foreign criticism, so it ignores how the wealth was obtained. D is an insider's account of shipping records, and its conclusion was confirmed by the Casement Report of 1904 and Leopold's own commission in 1905. So E does not prove D wrong.", explanation: "Uses content, provenance and knowledge to reach a judgement." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that the Congo Free State was run only for profit? Use the sources to explain your answer.", points: [
        ["Sources supporting 'only for profit' (A, C, D, E, F) explained with details.", 3],
        ["Sources suggesting other aims (B's claims of ending slave raids and building steamers and railways; E's national pride) explained.", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Most of the sources suggest the Congo was run for profit. Source A shows rubber being weighed and recorded under armed guard, Source C describes quotas enforced by hostage-taking and flogging, and Source D shows that rubber and ivory worth millions left the Congo while little was sent to pay for them. Even the pro-King Source E boasts that the Congo paid for Belgian monuments at no cost to taxpayers, and Source F attacks a system in which life is worth less than rubber.\n\nSource B claims other aims: suppressing slave raiders, building steamers and a railway and bringing civilisation. Source E also suggests national prestige for Belgium mattered.\n\nHowever, B is propaganda by an official of the State, and E is a pro-King newspaper; both have reasons to hide the truth. C is a victim's testimony and D an insider's record, both supported by the Casement Report and Leopold's own commission, so they are more convincing. Overall the sources provide convincing evidence that profit was the driving aim and that the infrastructure B describes served the extraction of rubber, although the regime also used humanitarian claims and national pride to justify itself, so 'only' is slightly too strong.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the Congo Free State (overseas empires prescribed June 2027).",
  });

  // 15. Imperialism: the USA and the Philippines.
  b.struct({
    ...p2,
    concepts: ["hist.imperialism.us-empire", "hist.imperialism.motives"],
    stem: `**Why did the United States keep the Philippines?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in American anti-imperialist newspapers in 1899, described in words", "Uncle Sam stands at an auction, handing a bag marked '20 million dollars' to a Spanish auctioneer. On the auction block stands a Filipino man in chains, labelled 'Philippines'. Behind Uncle Sam, a statue of Liberty turns her face away and covers her eyes. A notice on the wall reads 'Consent of the governed: not required'.", { described: true }),
      source("Source B", "a speech by a fictional senator who supported annexation, made in the US Senate in 1900", "The Philippines are ours, and we will not give them up. They are the gateway to China, the greatest market the world has known. Our navy needs harbours in the Pacific, and if we leave, Germany or Japan will be in Manila within a year. And the islanders are not yet fit to govern themselves; it is our duty to teach them."),
      source("Source C", "a letter from a fictional American soldier on the island of Luzon to his mother, 1900", "We were told we came to free these people from Spain. Now we burn their villages because the men in them shoot at us from the rice fields, and the men shoot at us because we burn their villages. I do not know who is right any more. I only know that the people here hate us, and I cannot say I blame them."),
      source("Source D", "a manifesto issued by a fictional Filipino revolutionary committee, 1899", "For three hundred years we were slaves of Spain. We rose, we fought, and in June 1898 we declared our independence before the world. The Americans came as allies and now remain as masters. They bought us from Spain as one buys cattle. We will fight them as we fought the Spaniards, until the flag of the Philippines flies alone."),
      source("Source E", "an editorial in a fictional American business journal, September 1898", "Manila is the key to the commerce of the East. Our factories already produce more than our people can buy. China, with its hundreds of millions, lies a few days' steaming from the Philippine coast. Whatever sentimental objections may be raised, the business of the United States requires that we keep what Dewey has won."),
      source("Source F", "a statement by a fictional American Protestant missionary society, 1899", "Providence has placed eight million souls under the American flag. They need schools, honest government and the Gospel. We call on the churches of America to send teachers and missionaries, so that the islands may become a model of Christian civilisation in the Pacific."),
    ])}`,
    hints: ["Sort the sources into economic, strategic and ideological reasons, and Filipino responses.", "Remember that most Filipinos were already Christian (Catholic) in 1899."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: the USA bought the Philippines from Spain (Treaty of Paris, 20 million dollars).", 2],
        ["Big message: buying a people without their consent betrayed American principles of liberty; the USA was acting like an imperial power (anti-imperialist view).", 3],
        ["Supported by details (chains, auction, Liberty covering her eyes, notice on consent) and knowledge (Treaty of Paris, Declaration of Independence, Anti-Imperialist League).", 2],
      ], levels: levels(7), modelAnswer: "On the surface the cartoon shows Uncle Sam paying Spain 20 million dollars for the Philippines, which refers to the Treaty of Paris of December 1898. Its main message is that buying a people without their consent was a betrayal of American ideals: the Filipino is shown in chains like a slave at auction, the statue of Liberty covers her eyes in shame, and the notice mocks the Declaration of Independence's principle of government by consent. It reflects the view of the Anti-Imperialist League, whose members, including Mark Twain, argued that colonial rule contradicted America's founding principles.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and E. How far do these two sources agree about why the United States should keep the Philippines?", points: [
        ["Agree: both give the economic motive of trade with China / markets for American goods.", 2],
        ["Agree: both dismiss objections and insist the islands must be kept.", 2],
        ["Difference: B adds strategic (navy, rivals) and 'civilising' arguments; E is purely about business.", 2],
        ["Judgement: they agree strongly on the economic case; B is broader; provenance (politician, business journal).", 2],
      ], levels: levels(8), modelAnswer: "The two sources agree strongly about the economic reason. Source B calls the Philippines the gateway to China, the greatest market in the world, and Source E says Manila is the key to the commerce of the East because American factories produce more than Americans can buy. Both insist that the islands must be kept and brush aside objections. However, Source B gives further reasons that E does not: the navy needs Pacific harbours, Germany or Japan would take the islands if the USA left, and Filipinos supposedly need to be taught to govern themselves. E, a business journal, is concerned only with trade. So they agree on economics, but B, a politician's speech, offers a wider set of justifications.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source D. Why was this manifesto issued in 1899? Use the source and your knowledge to explain your answer.", points: [
        ["Context: Treaty of Paris (December 1898) ceded the Philippines to the USA; fighting began in February 1899.", 2],
        ["Purpose: to rally Filipinos to resist American rule and justify the war to the world by appealing to their declaration of independence.", 3],
        ["Supported by details ('bought us... as one buys cattle'; 'declared our independence') and knowledge (Aguinaldo's declaration of June 1898; guerrilla war).", 2],
      ], levels: levels(7), modelAnswer: "The manifesto was issued in 1899 because the Treaty of Paris of December 1898 had handed the Philippines to the United States, and in February 1899 fighting broke out between American and Filipino forces. Its purpose was to rally Filipinos to resist and to justify their struggle to the world. It reminds readers that Filipinos had fought Spain and declared independence in June 1898, presents the Americans as false allies who became masters, and condemns the purchase of the islands 'as one buys cattle'. It ends with a call to keep fighting, which the Filipinos did, turning to guerrilla warfare after 1899.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Source C. Are you surprised by what this American soldier writes? Use the source and your knowledge to explain your answer.", points: [
        ["Not surprised: the war became a guerrilla war; US forces burned villages and moved civilians into camps.", 2],
        ["Not surprised: Filipinos had expected independence; hostility to Americans is understandable.", 2],
        ["Could be surprising: a soldier expressing doubts and sympathy for the enemy; but it is a private letter to his mother, not for publication; abuses caused scandal in the USA.", 2],
        ["Judgement, supported by provenance and knowledge.", 2],
      ], levels: levels(8), modelAnswer: "I am not very surprised by what the soldier writes. My knowledge shows that the Philippine-American War became a guerrilla war, in which American forces burned villages and moved civilians into camps, and that many Filipinos, who had declared independence in 1898, saw the Americans as new colonial masters, so their hatred is understandable. It might seem surprising that an American soldier expresses doubts and even sympathy for the enemy, but this is a private letter to his mother, not a statement for publication, so he could write honestly. Reports of American brutality also caused a scandal in the USA, which shows that he was not alone in his doubts. The source is consistent with what I know.", explanation: "Tests the source against knowledge and provenance." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that the United States kept the Philippines for selfish reasons? Use the sources to explain your answer.", points: [
        ["Sources supporting selfish reasons (A, B, D, E) explained: markets, naval bases, rivalry, purchase without consent.", 3],
        ["Sources suggesting other motives (B's and F's duty to educate and 'civilise'; C's 'free these people') explained, with comment on their racist or paternalist assumptions.", 3],
        ["Evaluation of how convincing the sources are (provenance, purpose, knowledge; most Filipinos already Catholic).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Several sources show selfish motives. Source E, a business journal, says the islands must be kept because American factories need the markets of China, and Source B, a senator's speech, gives the same economic reason and adds naval bases and the fear that Germany or Japan would take the islands. Source A and Source D condemn the USA for buying a people without consent, suggesting that American interests outweighed Filipino rights.\n\nSome sources claim more generous motives. Source B says the USA has a duty to teach Filipinos to govern themselves, Source F wants to bring schools, honest government and the Gospel, and Source C says soldiers were told they came to free the people from Spain. However, these claims rested on the assumption that Filipinos were not fit to rule themselves, an idea of racial superiority, and F ignores the fact that most Filipinos were already Catholic Christians.\n\nA and D are written by opponents of annexation, so they are one-sided, but E and B are written by supporters, so their admission of economic and strategic motives is especially convincing. Overall the sources provide convincing evidence that selfish reasons were central, while the 'civilising' arguments were mainly used to justify them.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on the USA and the Philippines (overseas empires prescribed June 2027).",
  });

  // 16. US Civil War: Lincoln's election and secession.
  b.struct({
    ...p2,
    concepts: ["hist.us-civil-war.causes"],
    stem: `**Why did the Southern states secede, 1860-1861?** Study the sources and answer all parts.\n\n${sources([
      source("Source A", "a cartoon of the kind published in Northern newspapers in December 1860, described in words", "A small, angry boy labelled 'South Carolina' sits far out on the branch of a large, healthy oak tree labelled 'The Union'. He is sawing through the branch between himself and the trunk. Below him, the ground is labelled 'Ruin'. Other boys, labelled with the names of Southern states, watch from nearby branches, some reaching for saws of their own.", { described: true }),
      source("Source B", "an editorial in a fictional Georgia newspaper, November 1860", "A sectional party has elected a sectional President. Mr Lincoln's party has declared that slavery shall spread no further, and that it is a wrong which must one day end. The South will not wait to be strangled. The Union our fathers made was a Union of equals; it no longer exists."),
      source("Source C", "a letter from a fictional Georgia planter to his son at college in Virginia, December 1860", "You ask why the state must leave. Look at our fields: everything we own, the land, the crop, the house, rests on our property in slaves. A government that hates that property cannot be trusted to protect it. Tariffs we have borne before, and we could bear them again. This is something different."),
      source("Source D", "resolutions passed by a fictional public meeting in a county of western Virginia, January 1861", "Resolved, that we deplore the hasty action of South Carolina. Resolved, that Virginia should remain in the Union so long as the Federal Government makes no war upon a Southern state. Resolved, that Congress should seek a fair compromise to secure the rights of all the states."),
      source("Source E", "an editorial in a fictional Northern abolitionist newspaper, January 1861", "Let the slave states go, if they must, but let them go knowing why. They leave not because their rights have been taken, but because they fear that the North will no longer help them hold four million human beings in bondage. A Union bought by more compromises with slavery is not worth keeping."),
      source("Source F", "from the memoirs of a fictional former Confederate officer, written in 1885", "We did not fight for slavery. We fought for the rights of the states, for our homes, and against the tariffs that made the North rich at the South's expense. Few of the men in my regiment owned a single slave. History has been written by the victors."),
    ])}`,
    hints: ["Compare what sources written in 1860-61 say with what was written after the war.", "Use your knowledge of the secession declarations and of Lincoln's position in 1860."],
    parts: checkExam(C2, [
      P.manual({ label: "(a)", marks: 7, type: X, stem: "Study Source A. What is the cartoonist's message? Support your answer with details of the source and your knowledge.", points: [
        ["Sub-message: South Carolina is leaving the Union / other states may follow.", 2],
        ["Big message: secession is foolish and self-destructive, harming the South more than the Union (Northern view).", 3],
        ["Supported by details (sawing the branch he sits on, 'Ruin', other boys reaching for saws, healthy oak) and knowledge (South Carolina seceded 20 December 1860; six more states by February 1861).", 2],
      ], levels: levels(7), modelAnswer: "The cartoon shows South Carolina as a small, angry boy sawing off the branch he is sitting on, which refers to its secession on 20 December 1860. Its main message is that secession is foolish and self-destructive: South Carolina will fall to ruin, while the Union, shown as a large healthy oak, will survive. Showing the state as a child suggests it is acting in a temper. The other boys reaching for saws show the cartoonist's fear that other Southern states would follow, which they did: six more seceded by February 1861.", explanation: "Top level: big message supported by details and knowledge." }),
      P.manual({ label: "(b)", marks: 8, type: X, stem: "Study Sources B and C. How far do these two sources agree about why the Southern states seceded?", points: [
        ["Agree: both say the new government was hostile to slavery and could not be trusted to protect it.", 2],
        ["Agree: both see Lincoln's election as a turning point that made remaining in the Union impossible.", 2],
        ["Difference: B is a public editorial stressing politics (a sectional president; Union of equals); C is a private letter stressing property in slaves and explicitly rejecting tariffs as the cause.", 2],
        ["Judgement: they agree closely that slavery was the reason.", 2],
      ], levels: levels(8), modelAnswer: "The two sources agree closely. Both say that Lincoln's election had made the Union unsafe for the South because the new government was hostile to slavery: B says Lincoln's party has declared that slavery must spread no further and is a wrong that must one day end, and C says a government that hates property in slaves cannot be trusted to protect it. There are differences of emphasis: B is a public editorial that presents secession in political terms, as a response to a 'sectional President' and the end of a Union of equals, while C is a private letter that speaks plainly about wealth resting on enslaved people and says tariffs are not the issue. Overall they agree that the protection of slavery was the reason for secession.", explanation: "Compares specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 7, type: X, stem: "Study Source D. Why were these resolutions passed in January 1861? Use the source and your knowledge to explain your answer.", points: [
        ["Context: South Carolina and other Deep South states were seceding; Virginia (an Upper South state) had not yet decided; compromise proposals in Congress.", 2],
        ["Purpose: to keep Virginia in the Union unless the federal government used force, and to press for compromise.", 3],
        ["Supported by details ('deplore the hasty action', 'so long as... no war') and knowledge (Virginia seceded only after Fort Sumter and Lincoln's call for troops in April 1861; western Virginia later formed West Virginia).", 2],
      ], levels: levels(7), modelAnswer: "The resolutions were passed in January 1861, when South Carolina had seceded and other Deep South states were following, but Virginia and the other states of the Upper South had not decided, and compromise proposals were being discussed in Congress. The meeting's purpose was to keep Virginia in the Union and to press for compromise: it criticises South Carolina's haste and says Virginia should stay as long as the federal government did not make war on a Southern state. This is what happened at first: Virginia seceded only in April 1861, after Fort Sumter and Lincoln's call for troops, and many people in western Virginia opposed secession so strongly that they later formed the state of West Virginia.", explanation: "Purpose in context, supported." }),
      P.manual({ label: "(d)", marks: 8, type: X, stem: "Study Source F. How reliable is this account of why the South fought? Use the source and your knowledge to explain your answer.", points: [
        ["Provenance: written in 1885 by a former Confederate officer, twenty years later, after defeat; purpose to defend the Confederate cause ('Lost Cause' view).", 2],
        ["Content challenged: secession declarations and sources from 1860-61 (B, C) name slavery; C explicitly says tariffs were not the issue.", 2],
        ["Partly accurate: many Confederate soldiers did not own enslaved people and fought for their homes.", 2],
        ["Judgement: unreliable as an account of why the states seceded, but useful evidence of how ex-Confederates later explained the war.", 2],
      ], levels: levels(8), modelAnswer: "Source F is not a reliable account of why the South seceded. It was written in 1885, twenty years after defeat, by a former Confederate officer who wanted to defend the cause he had fought for. Its claim that the war was about states' rights and tariffs, not slavery, is contradicted by sources written at the time: in Source C a planter says tariffs are not the issue, and the declarations of several seceding states named the protection of slavery as their reason. Some of what it says is accurate: most Confederate soldiers did not own enslaved people, and many fought to defend their homes. But that explains why ordinary men fought, not why the states left the Union. F is useful as evidence of how former Confederates later explained the war, but unreliable about its causes.", explanation: "Uses provenance and knowledge to judge reliability." }),
      P.manual({ label: "(e)", marks: 10, type: X, stem: "How far do these sources provide convincing evidence that the Southern states seceded to protect slavery? Use the sources to explain your answer.", points: [
        ["Sources supporting slavery as the reason (B, C, E) explained with details.", 3],
        ["Sources suggesting other reasons (F's states' rights and tariffs; B's 'Union of equals'; A and D on hasty action and coercion) explained.", 3],
        ["Evaluation of how convincing the sources are (date, provenance, purpose; contemporary versus later).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Several sources provide strong evidence that the states seceded to protect slavery. Source B, a Georgia editorial, says the South was leaving because Lincoln's party had declared that slavery must spread no further and must one day end. Source C, a planter's private letter, says everything his family owns rests on enslaved people and that tariffs are not the issue. Source E, a Northern abolitionist paper, says the South was leaving to keep four million people in bondage.\n\nOther sources suggest different reasons. Source F says the South fought for states' rights and against tariffs, and B talks of a 'Union of equals', which could suggest political rights. Source D shows that some Southerners did not support secession at all, and Source A presents it as a hasty act of temper.\n\nThe most convincing sources are B and C, because they were written by Southerners at the time of secession, and C was a private letter with no reason to hide the truth. E is a Northern abolitionist view, so it is one-sided, but it agrees with them. F was written twenty years later to defend the Confederacy and is contradicted by the sources of 1860. Overall the sources provide convincing evidence that the Deep South seceded to protect slavery, although D shows that the Upper South was more hesitant.", explanation: "Uses sources on both sides with evaluation and a judgement." }),
    ]),
    explanation: "Cambridge 0470 Paper 2 style document question on secession, 1860-1861 (Option A key question 4; not a prescribed topic in 2027-28).",
  });
});
