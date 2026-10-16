import { cpa, cpaNodes, cpaTable } from "../lib.mjs";
const N1 = cpa([
 {id:"A",dur:2,after:[]},{id:"B",dur:3,after:["A"]},{id:"C",dur:4,after:["A"]},{id:"D",dur:5,after:["B","C"]},
 {id:"E",dur:3,after:["C"]},{id:"F",dur:4,after:["D","E"]},{id:"G",dur:1,after:["F"]}]);
console.log(cpaTable(N1), N1.duration, N1.critical);
// crash D by 2: 
const N1c = cpa([
 {id:"A",dur:2,after:[]},{id:"B",dur:3,after:["A"]},{id:"C",dur:4,after:["A"]},{id:"D",dur:3,after:["B","C"]},
 {id:"E",dur:3,after:["C"]},{id:"F",dur:4,after:["D","E"]},{id:"G",dur:1,after:["F"]}]);
console.log(N1c.duration,N1c.critical);
const N2 = cpaNodes([
 {id:"A",from:1,to:2,dur:5},{id:"B",from:1,to:3,dur:7},{id:"C",from:2,to:4,dur:6},{id:"D",from:3,to:4,dur:4},
 {id:"X",from:2,to:3,dur:0},{id:"E",from:3,to:5,dur:3},{id:"F",from:4,to:6,dur:5},{id:"G",from:5,to:6,dur:8}]);
console.log(cpaTable(N2),N2.nodes,N2.duration,N2.critical);
const N3 = cpa([
 {id:"A",dur:6,after:[]},{id:"B",dur:4,after:[]},{id:"C",dur:5,after:["A"]},{id:"D",dur:7,after:["A","B"]},{id:"E",dur:3,after:["B"]},
 {id:"F",dur:4,after:["C","D"]},{id:"G",dur:6,after:["D","E"]},{id:"H",dur:2,after:["F","G"]}]);
console.log(cpaTable(N3),N3.duration,N3.critical);
