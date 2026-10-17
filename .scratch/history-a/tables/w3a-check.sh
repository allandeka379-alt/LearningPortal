#!/bin/bash
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node .scratch/history-a/build-content.mjs w3a- 2>&1 | tail -3
npm run content:validate -- history-a --strict 2>&1 | grep -E "(ERROR|WARN[A-Z]*) +((france|europe|italy|mussolini)[.]|exam[.]w3a)|error\(s\)" | head -30
npm run content:check -- history-a 2>&1 | grep -E "^[A-Z_]+ +((france|europe|italy|mussolini)[.]|exam[.]w3a)" | head -20
node .scratch/tools/length-cue.mjs history-a questions/france questions/europe questions/italy questions/mussolini questions/exam/w3a | tail -1
for t in longest shortest; do node .scratch/tools/$t-key.mjs history-a questions/france questions/europe questions/italy questions/mussolini | grep -vE "^#" ; done
node .scratch/tools/literal-newlines.mjs history-a | tail -1
