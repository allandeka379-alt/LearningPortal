// Slice W2b: the Treaty of Versailles, the other treaties and the impact on Germany to 1923 (ZIMSEC 12.2, 0470 B1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.versailles.terms-impact", { file: "versailles/terms-impact", keyPrefix: "versailles.terms-impact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "To what size did the Treaty of Versailles limit the German army?",
    options: [
      ["100,000 men", "Correct: and conscription was banned."],
      ["30,000 men", "That was the limit for Austria under the Treaty of Saint-Germain."],
      ["35,000 men", "That was the limit for Hungary under the Treaty of Trianon."],
      ["500,000 men", "Hitler's 1935 plan aimed at an army of about this size, far above the treaty limit."],
    ],
    answer: "A",
    explanation: "The German army was limited to **100,000** volunteers, with no conscription, tanks, submarines or military aircraft.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which territory did Germany return to France under the Treaty of Versailles?",
    options: [
      ["Alsace-Lorraine", "Correct: taken by Germany in 1871."],
      ["Eupen and Malmedy", "These went to Belgium."],
      ["North Schleswig", "This went to Denmark after a plebiscite."],
      ["West Prussia", "This went to Poland, forming the Polish Corridor."],
    ],
    answer: "A",
    explanation: "**Alsace-Lorraine**, lost in 1871 after the Franco-Prussian War, was returned to France.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the purpose of Article 231 of the Treaty of Versailles?",
    options: [
      ["To make Germany accept responsibility for the war", "Correct: the war guilt clause, the basis for reparations."],
      ["To set the total of reparations Germany must pay", "The total was fixed later, in 1921, by the Reparations Commission."],
      ["To forbid any union between Germany and Austria", "That was a separate territorial term (and in the Treaty of Saint-Germain)."],
      ["To place the Saar under the League for fifteen years", "That was a territorial term, not Article 231."],
    ],
    answer: "A",
    explanation: "Article 231, the **war guilt clause**, made Germany accept responsibility for the loss and damage of the war, which justified reparations.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which treaty dealt with Hungary after the First World War?",
    options: [
      ["Trianon", "Correct: signed in June 1920; Hungary lost about two-thirds of its land."],
      ["Neuilly", "Neuilly dealt with Bulgaria."],
      ["Sèvres", "Sèvres dealt with Ottoman Turkey."],
      ["Saint-Germain", "Saint-Germain dealt with Austria."],
    ],
    answer: "A",
    explanation: "Versailles (Germany), Saint-Germain (Austria), **Trianon (Hungary)**, Neuilly (Bulgaria), Sèvres (Turkey).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which former German colony became a mandate run by South Africa?",
    options: [
      ["South West Africa", "Correct: today's Namibia."],
      ["Tanganyika", "Tanganyika became a British mandate."],
      ["Ruanda-Urundi", "Ruanda-Urundi became a Belgian mandate."],
      ["Kamerun", "Kamerun was divided between Britain and France."],
    ],
    answer: "A",
    explanation: "Germany lost all its colonies. **South West Africa** was given to South Africa to govern as a mandate.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did France and Belgium occupy the Ruhr in January 1923?",
    options: [
      ["Germany had fallen behind with reparations deliveries", "Correct: they meant to take goods such as coal directly."],
      ["The Treaty of Versailles gave them the Ruhr for fifteen years", "The treaty gave the Saar to League control, not the Ruhr to France."],
      ["The League of Nations ordered them to restore order there", "The League did not order the occupation; France acted with Belgium."],
      ["German troops had entered the demilitarised Rhineland", "German troops did not enter the Rhineland until 1936."],
    ],
    answer: "A",
    hints: ["Think about what Germany owed the Allies."],
    explanation: "When Germany defaulted on deliveries at the end of 1922, French and Belgian troops occupied the **Ruhr** to seize coal and goods.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which event was most directly linked to the military terms of the treaty?",
    options: [
      ["The Kapp Putsch of March 1920", "Correct: Freikorps units faced disbandment under the army cuts."],
      ["The assassination of Walther Rathenau in 1922", "Rathenau was murdered for his policy of fulfilment and for being Jewish, not because of army cuts."],
      ["The hyperinflation of 1923", "Hyperinflation was linked to reparations, the Ruhr and money printing."],
      ["The scuttling of the fleet at Scapa Flow", "This came before the treaty was signed and was a reaction to the naval surrender, not to army cuts."],
    ],
    answer: "A",
    hints: ["Which group of soldiers would lose their units because of the 100,000-man limit?"],
    explanation: "The 100,000-man limit meant that Freikorps brigades were to be disbanded; some of them supported Kapp's attempt to seize Berlin.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument best supports the view that the Treaty of Versailles was NOT excessively harsh?",
    options: [
      ["Germany had imposed a harsher treaty on Russia in 1918", "Correct: Brest-Litovsk took far more land and people from Russia."],
      ["Germany was not allowed to join the League of Nations at first", "This was a humiliation, which supports the opposite view."],
      ["Three million Germans were left inside Czechoslovakia", "This supports claims of unfairness to Germans."],
      ["Germany lost all of its overseas colonies", "This is evidence of harshness rather than moderation."],
    ],
    answer: "A",
    hints: ["Look for a comparison with another peace treaty of the same war."],
    explanation: "Defenders of the treaty point to Brest-Litovsk (March 1918), in which Germany took vast lands, people and resources from Russia, and to the fact that Germany kept most of its industry.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The total amount of reparations was written into the Treaty of Versailles in 1919.",
    answer: false,
    explanation: "False. The total was set by the Reparations Commission in 1921 at 132 billion gold marks (£6,600 million).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Polish Corridor separated East Prussia from the rest of Germany.",
    answer: true,
    explanation: "True. West Prussia and Posen went to Poland, giving it access to the sea and cutting East Prussia off.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term of the Treaty of Versailles to its category.",
    pairs: [
      ["Army limited to 100,000 men", "Military"],
      ["Danzig made a free city", "Territorial"],
      ["Payment of 132 billion gold marks", "Financial"],
      ["Article 231", "War guilt"],
    ],
    explanation: "Remember the headings land, army, money and blame.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Walther Rathenau assassinated",
      "The Kapp Putsch",
      "France and Belgium occupy the Ruhr",
      "Germany signs the Treaty of Versailles",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["The putsch was in 1920 and the Ruhr occupation in 1923."],
    explanation: "Treaty signed June 1919; Kapp Putsch March 1920; Rathenau murdered June 1922; Ruhr occupied January 1923.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Germans called the treaty a {{blank:a}} because they were not allowed to negotiate it. The Saar was to be run by the {{blank:b}} for fifteen years.",
    blanks: [
      { id: "a", accepted: ["Diktat"], choices: ["Diktat", "Reich", "Putsch", "Anschluss"] },
      { id: "b", accepted: ["League of Nations"], choices: ["League of Nations", "French army", "Reparations Commission", "Weimar government"] },
    ],
    explanation: "A **Diktat** is a dictated peace. The Saar was governed by the **League of Nations**, with France taking its coal, until a plebiscite in 1935.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the free city on the Baltic coast that the treaty placed under League of Nations control.",
    accepted: ["Danzig", "Gdansk", "Gdańsk"],
    wrong: ["Memel"],
    explanation: "**Danzig** (Gdańsk) became a free city so that Poland could use its port.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the military terms of the Treaty of Versailles.",
    points: [
      "Army limited to 100,000 men; conscription banned.",
      "No tanks / no military aircraft (air force).",
      "Navy limited to six battleships; no submarines.",
      "Rhineland demilitarised and occupied by the Allies for fifteen years.",
    ],
    modelAnswer: "The German army was limited to 100,000 volunteers and conscription was banned. Germany could have no tanks or military aircraft. The navy was cut to six battleships and no submarines. The Rhineland was demilitarised and occupied by Allied troops for fifteen years.",
    explanation: "One mark per term.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why many Germans hated the Treaty of Versailles.",
    points: [
      "Identifies the Diktat: Germany was excluded from the negotiations.",
      "Explains that this felt humiliating and broke expectations of a peace based on the Fourteen Points.",
      "Identifies war guilt (Article 231).",
      "Explains that Germans believed they had fought a defensive war and resented sole blame.",
      "Identifies loss of land / Germans placed under foreign rule (Polish Corridor, Sudetenland, Anschluss banned).",
      "Explains that this seemed to deny self-determination to Germans while granting it to others.",
    ],
    hints: ["Think about how the treaty was made, the blame, and the land lost."],
    modelAnswer: "Germans hated the treaty first because it was a Diktat: Germany was not allowed to negotiate, which was humiliating after it had asked for an armistice expecting a peace based on the Fourteen Points. Secondly, Article 231 blamed Germany for the war, whereas most Germans believed they had fought to defend their country. Thirdly, Germany lost land such as the Polish Corridor and was forbidden to unite with Austria, so millions of Germans were placed under foreign rule, which seemed to deny Germans the self-determination given to others.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Treaty of Versailles weakened the Weimar Republic politically before 1924.",
    points: [
      "Identifies the 'November criminals' / stab-in-the-back myth.",
      "Explains that the politicians who signed were blamed, so many Germans saw the Republic as a betrayal.",
      "Identifies violence from the right (Kapp Putsch, murders of Erzberger and Rathenau).",
      "Explains that resentment of the treaty and army cuts drove extremists to try to overthrow the Republic or kill its leaders.",
    ],
    hints: ["Who was blamed for signing, and how did extremists react?"],
    modelAnswer: "The Republic was blamed for signing the treaty: nationalists called its leaders the November criminals and claimed the army had been stabbed in the back, so many Germans saw democracy as a betrayal. The treaty also fuelled right-wing violence: Freikorps facing disbandment under the army cuts backed the Kapp Putsch of 1920, and extremists murdered Erzberger in 1921 and Rathenau in 1922.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in German satirical magazines in 1919, described in words", "A thin German worker in a cap lies strapped to a table. Three well-fed men in top hats, labelled with the flags of France, Britain and the USA, stand over him. One holds a huge saw marked \"Reparations\", another a pair of shears marked \"Colonies\", and the third is cutting off a piece of the worker's arm marked \"Upper Silesia\". In the corner a small sign on the wall reads \"Fourteen Points\" and has been crossed out.", { described: true })}`,
    hints: ["Use the details of the drawing, then test the message against what you know of the terms."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** terms of the treaty that the cartoonist refers to.", points: [
        "Reparations.",
        "Loss of colonies / loss of land such as Upper Silesia.",
      ], explanation: "Two terms named from the cartoon." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoonist? Explain your answer using details of the source.", points: [
        "Message: the Allies were cutting Germany to pieces / the treaty was cruel and unjust.",
        "Detail: the strapped worker and the saws and shears.",
        "Message: the Allies had broken their promise of a fair peace.",
        "Detail: the crossed-out Fourteen Points sign.",
      ], explanation: "Message supported by details." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far was the cartoonist's view of the treaty justified? Use your own knowledge.", points: [
        "Justified: Germany lost all colonies and about 13% of its European land, including industrial areas.",
        "Justified: reparations were large and later linked to the Ruhr crisis; Germany was not allowed to negotiate.",
        "Justified: Germans had expected a peace based on the Fourteen Points; self-determination denied to some Germans.",
        "Not justified: Germany kept most of its land, population and industry.",
        "Not justified: Brest-Litovsk was harsher; France had suffered great damage; reparations later reduced.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The cartoon is partly justified. Germany did lose all its colonies and about 13 per cent of its European land, including industrial areas such as part of Upper Silesia, and the reparations fixed in 1921 were very large and helped to cause the Ruhr crisis. Germany was not allowed to negotiate, and Germans had expected a peace based on the Fourteen Points, so the crossed-out sign reflects a real grievance. However, the cartoon exaggerates. Germany kept most of its territory, people and industry and soon recovered as a great power; Germany had imposed a harsher treaty on Russia at Brest-Litovsk; and reparations were reduced in 1924 and 1929. The cartoon is therefore a fair picture of German feeling in 1919 but an exaggerated picture of the treaty itself.", explanation: "Both sides and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh the treaty against other causes of the 1923 crisis."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the territorial terms of the Treaty of Versailles in Europe.", points: [
        "Alsace-Lorraine to France.",
        "West Prussia and Posen to Poland (Polish Corridor); Danzig a free city.",
        "Saar under the League for fifteen years (coal to France).",
        "Any other: Eupen-Malmedy to Belgium; North Schleswig to Denmark; Anschluss forbidden; Memel; Upper Silesia plebiscite.",
      ], explanation: "One mark per term." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was the Treaty of Versailles responsible for Germany's economic crisis of 1923?", points: [
        ["Treaty: reparations a heavy burden; default led to the Ruhr occupation.", 2],
        ["Treaty: loss of coal and industry (Saar, Upper Silesia, Lorraine iron) weakened the economy.", 2],
        ["Other: war debts and wartime money printing had already caused inflation before 1919.", 2],
        ["Other: the government's choice to pay passive resisters by printing money turned inflation into hyperinflation.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The treaty was an important cause. Reparations, fixed at 132 billion gold marks in 1921, placed a heavy burden on Germany, and when it fell behind with deliveries France and Belgium occupied the Ruhr in January 1923, taking over its main industrial region. The treaty had also taken coal from the Saar and Upper Silesia and the iron ore of Lorraine.\n\nHowever, other factors mattered. Germany had paid for the war by borrowing and printing money, so the mark had been losing value since 1914. In 1923 the government chose to support passive resistance in the Ruhr by printing yet more money, which turned high inflation into hyperinflation.\n\nOverall the treaty, through reparations and the Ruhr occupation, triggered the 1923 crisis, but the deeper causes were wartime finance and the government's own response, so the treaty was responsible only in part.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the Treaty of Versailles signed?", "28 June 1919, in the Hall of Mirrors at Versailles.");
  b.card("DEFINITION", "Diktat", "A dictated peace: Germans' name for the treaty because they could not negotiate it.");
  b.card("DEFINITION", "Article 231", "The war guilt clause: Germany accepted responsibility for the war's loss and damage.");
  b.card("FACT", "What were the main military terms?", "Army 100,000, no conscription, no tanks, submarines or military aircraft, six battleships, Rhineland demilitarised.");
  b.card("FACT", "How much were reparations, and when was the figure set?", "132 billion gold marks (£6,600 million), fixed in 1921.");
  b.card("FACT", "Name the treaties with Germany's allies.", "Saint-Germain (Austria), Trianon (Hungary), Neuilly (Bulgaria), Sèvres (Turkey).");
  b.card("FACT", "What happened to Germany's African colonies?", "They became League mandates: Tanganyika (Britain), Ruanda-Urundi (Belgium), South West Africa (South Africa), Togoland and Kamerun (Britain and France).");
  b.card("CONCEPT", "How did the treaty contribute to the 1923 hyperinflation?", "Default on reparations led to the Ruhr occupation; passive resistance was paid for by printing money.");
  b.card("FACT", "What was the Kapp Putsch?", "A right-wing attempt to seize Berlin in March 1920, backed by Freikorps facing disbandment; defeated by a general strike.");
});
