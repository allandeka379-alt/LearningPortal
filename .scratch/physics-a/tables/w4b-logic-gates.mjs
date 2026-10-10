import { table } from "../lib.mjs";
const N = (a) => 1 - a, AND = (a, b) => a & b, OR = (a, b) => a | b, NAND = (a, b) => N(a & b), NOR = (a, b) => N(a | b), XOR = (a, b) => a ^ b;
const rows2 = [[0,0],[0,1],[1,0],[1,1]];
console.log(table(["A","B","AND","OR","NAND","NOR","EXOR"], rows2.map(([a,b])=>[a,b,AND(a,b),OR(a,b),NAND(a,b),NOR(a,b),XOR(a,b)])));
const rows3=[];for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let c=0;c<2;c++)rows3.push([a,b,c]);
console.log(table(["A","B","C","P = NAND(A,B)","Q = AND(P,C)"], rows3.map(([a,b,c])=>[a,b,c,NAND(a,b),AND(NAND(a,b),c)])));
console.log(table(["A","B","NAND(A,A)","NAND(B,B)","Q"], rows2.map(([a,b])=>[a,b,NAND(a,a),NAND(b,b),NAND(NAND(a,a),NAND(b,b))])));
