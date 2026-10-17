const fs=require('fs');
function edit(f,pairs){const p='content/subjects/history-a/lessons/'+f+'.md';let s=fs.readFileSync(p,'utf8');for(const [a,b] of pairs){if(!s.includes(a))throw new Error(f+': '+a.slice(0,60));s=s.replace(a,b);}fs.writeFileSync(p,s);}
function cut(f,start,end){const p='content/subjects/history-a/lessons/'+f+'.md';let s=fs.readFileSync(p,'utf8');const a=s.indexOf(start);const b=s.indexOf(end,a);if(a<0||b<0)throw new Error(f+start);s=s.slice(0,a)+s.slice(b);fs.writeFileSync(p,s);}
// holocaust
cut('holocaust/nazi-policy-1933-45',':::mistake{title="Using wrong figures"}',':::mistake{title="Describing victims only as passive"}');
edit('holocaust/nazi-policy-1933-45',[
[' This lesson sets out what happened and in what order; it is written to inform and not to shock, and it asks you to treat the subject with the respect it deserves. The debates about causes and responsibility belong to the two lessons that follow.',' This lesson sets out what happened and in what order, to inform and not to shock; the debates about causes and responsibility belong to the two lessons that follow.'],
[' Historians study it so that the victims are remembered as individuals and so that societies understand how prejudice, state power and indifference can combine in genocide.',' Historians study it so that victims are remembered as individuals and societies understand how prejudice, state power and indifference can combine in genocide.'],
[' Trains carried Jews from across Europe, from France, the Netherlands, Greece, Italy and elsewhere. Most people arriving',' Trains carried Jews from across Europe. Most people arriving'],
[' Starvation, disease and forced labour killed many thousands. Jewish Councils',' Starvation and disease killed many thousands. Jewish Councils'],
]);
// origins
edit('coldwar/origins-1941-49',[
[' The Cold War mattered far beyond Europe: it shaped the liberation wars in southern Africa, where the two sides gave support to rival movements, and it influenced Zimbabwe\'s own path to independence.',' The Cold War also shaped the liberation wars in southern Africa, where the two sides backed rival movements.'],
[' Each side later accused the other of breaking the spirit of the agreements.',''],
[' They quarrelled about reparations, the governments of eastern Europe and the fate of Germany. The atomic bomb, which the United States had tested on 16 July, made the Americans more confident. Cold War historians debate how far the suspicion of 1945 was already deep.',' They quarrelled about reparations, the governments of eastern Europe and the fate of Germany, and the atomic bomb, tested on 16 July, made the Americans more confident.'],
]);
cut('coldwar/origins-1941-49',':::example{title="Using the evidence of Yalta and Potsdam"}',':::example{title="Reading a famous speech"}');
edit('holocaust/debate-perpetrators-victims-bystanders',[[' and asks you to remember that behind each category are real people.','.']]);
