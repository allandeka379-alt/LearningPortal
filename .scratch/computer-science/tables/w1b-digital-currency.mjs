// Tables for lessons/internet/digital-currency.md (w1b): a toy "fingerprint" (hash) to show why altered blocks are detected.
// Toy hash: sum of (position x character code) of the block text, remainder after dividing by 1000.
const toy = (s) => [...s].reduce((a, c, i) => a + (i + 1) * c.charCodeAt(0), 0) % 1000;
const b1 = "Rudo pays Farai 5";
const h1 = toy("000|" + b1);
const b2 = "Farai pays Sipho 2";
const h2 = toy(h1 + "|" + b2);
const b3 = "Sipho pays Chipo 1";
const h3 = toy(h2 + "|" + b3);
console.log({ h1, h2, h3 });
const b1x = "Rudo pays Farai 9";
const h1x = toy("000|" + b1x);
console.log("tampered h1", h1x, "block2 recomputed", toy(h1x + "|" + b2));
