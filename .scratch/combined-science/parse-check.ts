import { readFileSync } from "node:fs";
import { syllabusFileSchema } from "../../src/server/content-pipeline/schemas";
const raw = JSON.parse(readFileSync("content/syllabi/zimsec/o-level/combined-science/2015-2022.json", "utf8"));
const r = syllabusFileSchema.safeParse(raw);
if (r.success) console.log("OK"); else console.log(JSON.stringify(r.error.issues.slice(0, 20), null, 1));
