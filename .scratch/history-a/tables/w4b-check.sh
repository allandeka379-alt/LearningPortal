#!/bin/sh
# usage: w4b-check.sh  -> runs the checks, filters to my folders
cd "C:/Users/Lenovo/Downloads/Learning Platform"
npm run content:validate -- history-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)" | head -10
npm run content:check -- history-a 2>&1 | grep -E "^[A-Z_]+ +(russia|stalin|china|skills.interpretations|exam.w4b)" | head -20
node .scratch/tools/length-cue.mjs history-a 2>&1 | tail -3
for d in russia stalin china skills/interpretations exam/w4b; do node .scratch/tools/longest-key.mjs history-a questions/$d 2>&1 | tail -1; node .scratch/tools/shortest-key.mjs history-a questions/$d 2>&1 | tail -1; done
node .scratch/tools/literal-newlines.mjs history-a 2>&1 | tail -1
