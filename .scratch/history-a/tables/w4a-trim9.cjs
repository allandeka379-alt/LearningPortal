const fs=require('fs');
function sec(p,h,body){let s=fs.readFileSync(p,'utf8');const a=s.indexOf('## '+h);const b=s.indexOf('\n## ',a+3);if(a<0||b<0)throw h;s=s.slice(0,a)+'## '+h+'\n\n'+body.trim()+'\n'+s.slice(b);fs.writeFileSync(p,s);}
const H='content/subjects/history-a/lessons/holocaust/nazi-policy-1933-45.md';
sec(H,'Other victims',`The Nazis also murdered or caused the death of other groups, though the aim of killing every Jew was unique to the persecution of the Jews. About 70,000 disabled people were murdered in the T4 programme before it was officially halted in August 1941, and many more in later killings. Historians estimate that between 200,000 and 500,000 Roma and Sinti were killed. About three million Soviet prisoners of war died in German captivity, as did millions of Polish and Soviet civilians. Jehovah's Witnesses, homosexual men and political prisoners were also persecuted. Whether they belong within the term "Holocaust" is discussed in a later lesson.`);
let s=fs.readFileSync(H,'utf8');
const a=s.indexOf(':::example{title="Explaining the change');const b=s.indexOf(':::\n',a)+4;
s=s.slice(0,a)+`:::example{title="Explaining the change from persecution to genocide"}
Before 1939 the policy was to push Jews out of German life and force emigration. Conquest of Poland and the USSR placed millions more Jews under German control and made "emigration" impossible; the racial war in the east, local initiative and the example of the Einsatzgruppen radicalised policy in 1941; by Wannsee it covered the whole continent. Show the links without implying that the outcome was inevitable.
:::
`+s.slice(b);
fs.writeFileSync(H,s);
const R='content/subjects/history-a/lessons/nazi/rise-dictatorship.md';
let r=fs.readFileSync(R,'utf8');r=r.replace(' Choose three or four causes, rank them, use figures, and keep apart',' Rank three or four causes, use figures, and keep apart');fs.writeFileSync(R,r);
