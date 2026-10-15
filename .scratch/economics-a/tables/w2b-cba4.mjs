import { cba, discount } from "../lib.mjs";
console.log(cba({ costs:[60,5,5,5], benefits:[0,30,30,30], ratePct:10 }));
console.log(cba({ costs:[900,40,40,40,40], benefits:[0,300,300,300,300], ratePct:6 }));
console.log(cba({ costs:[900,40,40,40,40], benefits:[0,300,300,300,300], ratePct:12 }));
console.log(discount(400,10,3), discount(1000,8,3), discount(500,5,2));
