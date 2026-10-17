const fs=require('fs');const p='content/subjects/history-a/lessons/nazi/rise-dictatorship.md';let s=fs.readFileSync(p,'utf8');
function blk(start,end,rep){const a=s.indexOf(start);const b=s.indexOf(end,a);if(a<0||b<0)throw start;s=s.slice(0,a)+rep+s.slice(b);}
blk(':::keyfact{title="Dates and names to learn"}',':::keyfact{title="ZIMSEC and Cambridge"}',`:::keyfact{title="Dates and names to learn"}
- 8-9 November 1923: Munich Putsch. Nazi vote: 2.6 per cent (1928), 18.3 (1930), 37.3 (July 1932), 33.1 (November 1932).
- 30 January 1933: Hitler Chancellor. 27 February: Reichstag Fire. 23 March: Enabling Act.
- 30 June-2 July 1934: Night of the Long Knives. 2 August 1934: Hindenburg dies; Hitler becomes Führer.
:::

`);
blk(':::keyfact{title="ZIMSEC and Cambridge"}','## The early party',`:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC also asks about the background of 1919-29. Cambridge Paper 4 key question 3.1, "How did Hitler gain control of Germany?", begins in 1929 and needs only brief context for earlier years.
:::

`);
s=s.replace(/Jews and political opponents were removed from the civil service in April, and early camps such as Dachau held the first prisoners\./,'Early camps such as Dachau held the first prisoners.');
s=s.replace(/ Papen is reported to have said that they had "hired" Hitler, a remark that shows how badly the conservatives misjudged him\./,'');
blk(':::summary',':::\n',`:::summary
- After the failed Putsch of 1923 Hitler decided to seek power through elections.
- The Depression, decree government and Weimar's divisions created a crisis; Nazi support grew through distress, Hitler's appeal, propaganda, the SA and fear of communism.
- Conservatives who believed they could control him brought Hitler into office in January 1933.
- The Reichstag Fire decree, the Enabling Act, Gleichschaltung and the Night of the Long Knives gave him total power by August 1934.
`);
fs.writeFileSync(p,s);
