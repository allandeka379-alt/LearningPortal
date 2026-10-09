// Tables / checks for lessons/data/storage-units.md
const units = ["byte", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
units.forEach((u, i) => console.log(u, 1024 ** i, `2^${10 * i}`));
console.log("3 GiB in MiB", 3 * 1024);
console.log("6291456 bytes in MiB", 6291456 / 1024 / 1024);
console.log("2 TiB in GiB", 2 * 1024);
console.log("40 bits in bytes", 40 / 8, "nibbles", 40 / 4);
console.log("12288 KiB in MiB", 12288 / 1024);
console.log("ZIM: 4 GB in MB", 4 * 1024);
console.log("8 KiB in bits", 8 * 1024 * 8);
console.log("photos: 64 GiB / 4 MiB", 64 * 1024 / 4);
