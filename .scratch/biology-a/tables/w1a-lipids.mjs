const Mr = ({C=0,H=0,O=0}) => C*12+H+O*16;
const gly = Mr({C:3,H:8,O:3}), st = Mr({C:18,H:36,O:2}), w=18;
console.log("glycerol", gly, "stearic", st, "tristearin", gly+3*st-3*w, Mr({C:57,H:110,O:6}));
console.log("energy 30 g fat 38", 30*38, "starch equiv g", 30*38/17);
