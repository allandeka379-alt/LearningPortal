#!/bin/bash
# usage: w3a-qa.sh <grep pattern for my files, e.g. "company/|standards/|departmental/|w3a-">
cd "C:/Users/Lenovo/Downloads/Learning Platform"
PAT="${1:-company/|standards/|departmental/|exam/w3a}"
echo "== validate"
npm run content:validate -- accounting-a --strict 2>&1 | grep -E "error|warning|✖|ERROR|WARN" | head -40
echo "== check"
npm run content:check -- accounting-a 2>&1 | grep -E "$PAT" | head -40
echo "== length-cue"
node .scratch/tools/length-cue.mjs accounting-a questions/company/ 2>&1 | tail -4
node .scratch/tools/length-cue.mjs accounting-a questions/standards/ 2>&1 | tail -4
node .scratch/tools/length-cue.mjs accounting-a questions/departmental/ 2>&1 | tail -4
echo "== longest-key"
for d in company standards departmental; do node .scratch/tools/longest-key.mjs accounting-a questions/$d 2>&1 | tail -2; done
echo "== literal-newlines"
node .scratch/tools/literal-newlines.mjs accounting-a 2>&1 | tail -2
