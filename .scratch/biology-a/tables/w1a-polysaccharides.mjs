const n = (Mr) => (Mr - 18) / 162;
console.log("amylose Mr 81018 ->", n(81018), "check", 500*162+18);
console.log("glycogen 1200 units, branch every 10 -> branches", 1200/10, "amylopectin every 25 ->", 1200/25);
console.log("ends ratio", (1200/10+1)/(1200/25+1));
