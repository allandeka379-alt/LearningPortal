import { chk } from "../lib.mjs";
// Server consolidation
const servers = 12, util = 0.08, target = 0.5;
const load = servers * util;
const hosts = Math.ceil(load / target);
chk(Math.round(load * 100) / 100, 0.96);
chk(hosts, 2);
// Memory on a host
const hostRam = 64, hostOs = 8, perVm = 6;
const avail = hostRam - hostOs;
const vms = Math.floor(avail / perVm);
chk(vms, 9);
const used = vms * perVm;
const spare = avail - used;
export const snips = {
  load: String(Math.round(load * 100) / 100),
  hosts: String(hosts),
  servers: String(servers),
  avail: String(avail),
  vms: String(vms),
  used: String(used),
  spare: String(spare),
  disk: String(vms * 40),
};
if (process.argv[1].endsWith("w1b-virtual-machines.mjs")) console.log(snips);
