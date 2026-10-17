const fs=require('fs');const p='content/subjects/history-a/lessons/nazi/rise-dictatorship.md';let s=fs.readFileSync(p,'utf8');
// add the lost example back, short, after the January 1933 section
s=s.replace('## From Chancellor to dictator, 1933-34',`:::example{title="Weighing the causes of Hitler's appointment"}
Separate the conditions from the trigger. The Depression, Weimar's weakness and fear of communism made the Nazis the largest party. The trigger was a decision by a small group around Hindenburg to bring Hitler in, after the Nazi vote had fallen in November 1932. Some historians therefore give more weight to political miscalculation than to popular support.
:::

## From Chancellor to dictator, 1933-34`);
function sec(h,body){const a=s.indexOf('## '+h);const b=s.indexOf('\n## ',a+3);s=s.slice(0,a)+'## '+h+'\n\n'+body.trim()+'\n'+s.slice(b);}
sec('Common mistakes',`:::mistake{title="Saying Hitler was elected with a majority"}
The Nazis never won more than 37.3 per cent in a free national election. Hindenburg appointed Hitler after negotiations, and the dictatorship was built afterwards.
:::

:::mistake{title="Blaming the Depression alone"}
Other countries suffered it without a dictatorship. Explain the part played by Weimar's political weakness, Nazi methods and the decisions of the elite.
:::

:::mistake{title="Confusing the Reichstag Fire with the Enabling Act"}
The Fire (27 February) led to the decree that removed civil rights. The Enabling Act (23 March) allowed Hitler to legislate without the Reichstag.
:::`);
fs.writeFileSync(p,s);
