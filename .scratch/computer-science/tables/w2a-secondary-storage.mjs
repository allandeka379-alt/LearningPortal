// Values for lessons/hardware/secondary-storage.md worked examples (computed, not typed).
const cardGiB = 32, photoMiB = 4;
console.log(`photos on ${cardGiB} GiB card at ${photoMiB} MiB:`, (cardGiB * 1024) / photoMiB);
const dvdGB = 4.7, filmMB = 700; // ZIMSEC style (1 GB = 1024 MB)
console.log(`${dvdGB} GB DVD = ${dvdGB * 1024} MB; films of ${filmMB} MB:`, Math.floor((dvdGB * 1024) / filmMB));
