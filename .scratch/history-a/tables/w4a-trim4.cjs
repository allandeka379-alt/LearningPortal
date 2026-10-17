const fs=require('fs');const p='content/subjects/history-a/lessons/nazi/rise-dictatorship.md';let s=fs.readFileSync(p,'utf8');
function sec(h,body){const a=s.indexOf('## '+h);const b=s.indexOf('\n## ',a+3);s=s.slice(0,a)+'## '+h+'\n\n'+body.trim()+'\n'+s.slice(b);}
sec('The early party, 1919-29',`The German Workers' Party was founded in Munich in January 1919. Hitler, a former army corporal angered by Germany's defeat, joined in September 1919. In 1920 it became the National Socialist German Workers' Party (the Nazi party) and issued a Twenty-Five Point Programme that attacked Versailles and excluded Jews from German citizenship. Hitler became leader in 1921, and the party formed a uniformed force, the *Sturmabteilung* (SA, the Brownshirts), to protect its meetings and break up those of its enemies.

In the crisis of 1923 Hitler tried to seize power in Munich. On 8-9 November the Nazis and General Ludendorff moved in the Beer Hall Putsch and were stopped by the police. Hitler served about nine months in Landsberg prison, where he dictated the first volume of *Mein Kampf*, setting out his racism, his hatred of communism and his plan for "living space" in the east. He concluded that the Nazis must win power through elections as well as force. After refounding the party in 1925 he built a national organisation, yet in May 1928 it won only 2.6 per cent of the vote.`);
sec('Why Nazi support grew, 1929-32',`Historians point to several linked reasons and disagree about their weight.

- **Economic crisis.** The Nazis promised work and bread to the unemployed, to indebted farmers and to frightened shopkeepers.
- **Hitler's appeal.** He was a powerful speaker who offered simple answers, blamed Jews, communists and the "November criminals" who signed the armistice, and promised renewal.
- **Propaganda and organisation.** Goebbels used mass meetings, posters, films and Hitler's aeroplane tour of 1932, and local branches tailored the message to farmers or workers.
- **The SA.** By 1932 it numbered several hundred thousand men; its street violence against communists frightened many into seeking a strong government.
- **Fear of communism and elite help.** Property owners saw the Nazis as a barrier to the Communist Party, and nationalists such as Alfred Hugenberg gave publicity, though most business funding went to other parties.

The results were dramatic: 18.3 per cent in September 1930 (107 seats); 37.3 per cent and 230 seats in July 1932, making the Nazis the largest party. In the presidential election of 1932 Hitler won 36.8 per cent in the second round, and Hindenburg was re-elected. In November 1932 the vote fell to 33.1 per cent. Their voters included Protestants, farmers, the self-employed and many young people, more than the unemployed workers, who tended to vote communist.`);
s=s.replace(':::example{title="Weighing the causes',`:::example{title="Reading the election figures"}
The Nazi vote ran 2.6 per cent (1928), 18.3 (1930), 37.3 (July 1932) and 33.1 (November 1932). Asked whether Hitler's rise was inevitable, use the last figure: the vote had fallen before he was appointed, so appointment cannot be explained by popular support alone. State the figure, say what it shows, then link it to the question.
:::

:::example{title="Weighing the causes`);
fs.writeFileSync(p,s);
