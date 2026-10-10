const Mr = ({C=0,H=0,O=0}) => C*12+H*1+O*16;
const glu = Mr({C:6,H:12,O:6}), w = Mr({H:2,O:1});
console.log("glucose", glu, "water", w, "maltose", 2*glu - w, Mr({C:12,H:22,O:11}));
console.log("ribose C5H10O5", Mr({C:5,H:10,O:5}));
console.log("trisaccharide 3 glucose", 3*glu-2*w);
