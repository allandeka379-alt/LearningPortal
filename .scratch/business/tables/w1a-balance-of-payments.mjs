import { f } from "../lib.mjs";
// E1: Country K (US$ million)
const vx=4800, vm=5600, ix=900, im=1300;
console.log("E1 BoT", f.balanceOfTrade(vx,vm), "inv", f.invisibleBalance(ix,im), "CA", f.currentAccount(vx,vm,ix,im));
// E2: classify items, Country L
const items={"tobacco exports":2100,"mineral exports":3400,"fuel imports":1900,"machinery imports":2600,"tourism receipts from foreigners":650,"freight paid to foreign shipping":480,"insurance paid abroad":170,"remittances received":800};
const VX=2100+3400, VM=1900+2600, IX=650+800, IM=480+170;
console.log("E2", VX, VM, f.balanceOfTrade(VX,VM), IX, IM, f.invisibleBalance(IX,IM), f.currentAccount(VX,VM,IX,IM));
