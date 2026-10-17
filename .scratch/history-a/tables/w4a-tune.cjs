const fs=require('fs');
const D='.scratch/history-a/slices/';
const E={
'w4a-coldwar-debate-new-history.mjs':[
["As the result of American imperialism and the encirclement of the USSR","As the result of American imperialism and Soviet encirclement"],
["American influence in Western Europe grew because governments asked for it","American influence in Western Europe grew at governments' request"],
["Access has been partial, and documents may not show what leaders believed","Access has been partial, and documents may not show beliefs"],
["It used evidence from both sides and often gave more weight to Soviet ideology","It used evidence from both sides and weighted Soviet ideology more"]],
'w4a-coldwar-debate-schools.mjs':[
["American economic expansion for open markets helped to cause the Cold War","American economic expansion for open markets helped cause it"],
["Disillusion over the Vietnam War led historians to question American motives","Disillusion over Vietnam led historians to question American motives"],
["It underestimated Stalin's repression and the methods used in Eastern Europe","It underplayed Stalin's repression and Soviet methods in the east"],
["Historians were influenced by events of their own time and by new evidence","Historians were influenced by their own times and by new evidence"]],
'w4a-coldwar-origins-1941-49.mjs':[
["To defend its members from attack, an attack on one being an attack on all","To defend its members, an attack on one being an attack on all"],
["The USSR had been invaded twice in thirty years through Eastern Europe","The USSR had been invaded twice in thirty years from the west"]],
'w4a-holocaust-debate-origins.mjs':[
["Policy radicalised step by step through the workings of the Nazi state and war","Policy radicalised step by step through the Nazi state and war"],
["Many historians combine Hitler's aims with the radicalising effects of the state and war","Many historians combine Hitler's aims with the effects of state and war"]],
'w4a-holocaust-debate-perpetrators-victims-bystanders.mjs':[
["Most were ordinary men influenced by conformity, obedience and propaganda","Most were ordinary men influenced by conformity and obedience"],
["Standing up, a broad idea that includes acts of defiance beyond fighting","Standing up, a broad idea including defiance beyond fighting"]],
'w4a-holocaust-nazi-policy-1933-45.mjs':[
["A meeting of officials to coordinate the deportation of Europe's Jews","A meeting of officials to coordinate the deportations of Jews"],
["They were mobile killing units that shot Jews and others behind the front","They were mobile killing units that shot Jews behind the front"],
["They were made to carry out German orders affecting their own people","They had to carry out German orders affecting their own people"],
["Victims were starved, deceived, outnumbered and punished with reprisals","Victims were starved, deceived and punished with reprisals"]],
};
for(const [f,l] of Object.entries(E)){let s=fs.readFileSync(D+f,'utf8');for(const [a,b] of l){if(!s.includes('"'+a+'"'))console.log('MISSING',f,a);s=s.replace('"'+a+'"','"'+b+'"');}fs.writeFileSync(D+f,s);}
