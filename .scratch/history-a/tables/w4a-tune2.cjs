const fs=require('fs');const D='.scratch/history-a/slices/';
const E={'w4a-coldwar-debate-new-history.mjs':[
["Soviet and East European archives were opened to researchers","Soviet and East European archives opened to researchers"],
["It used evidence from both sides and weighted Soviet ideology more","It used evidence from both sides and stressed Soviet ideology"],
["The Cold War began again and ended the study of history","The Cold War began again and ended the study of history there"]],
'w4a-coldwar-debate-schools.mjs':[
["Disillusion over Vietnam led historians to question American motives","Disillusion over Vietnam led historians to question American aims"],
["It underplayed Stalin's repression and Soviet methods in the east","It underplayed Stalin's repression and Soviet methods"],
["Historians were influenced by their own times and by new evidence","Historians were influenced by their times and by new evidence"]]};
for(const [f,l] of Object.entries(E)){let s=fs.readFileSync(D+f,'utf8');for(const [a,b] of l){if(!s.includes('"'+a+'"'))console.log('MISSING',a);s=s.replace('"'+a+'"','"'+b+'"');}fs.writeFileSync(D+f,s);}
