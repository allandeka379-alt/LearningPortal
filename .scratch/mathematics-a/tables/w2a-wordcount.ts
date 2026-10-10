// W2a helper: plain-text word counts of lessons as the validator counts them (run with tsx --conditions=react-server).
import fs from "node:fs";
import { renderContent } from "@/server/content/render";
for (const f of process.argv.slice(2)) {
  const body = fs.readFileSync(f, "utf8").split(/^---$/m).slice(2).join("---");
  const r = renderContent(body);
  const words = r.plainText.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  console.log(String(words).padStart(5), f.split("/lessons/")[1]);
}
