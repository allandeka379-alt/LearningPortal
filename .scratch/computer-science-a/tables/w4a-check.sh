#!/bin/bash
# usage: w4a-check.sh <folder-substring>...
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node --no-warnings .scratch/computer-science-a/build-content.mjs w4a- 2>&1 | grep -v "^    at" | tail -25
npm run content:validate -- computer-science-a --strict 2>&1 | grep -E "^content|ERROR|warning|passed|error\(s\)" | grep -E "algo|ds\.|ds/|exam.w4a|exam/w4a|error\(s\)|passed" | head -40
npm run content:check -- computer-science-a 2>&1 | grep -E "algo\.|ds\.(data|arrays|text|adt|user|stack|linked|binary)|exam.w4a|QUESTION_REUSE.*(algo|ds)" | head -40
node .scratch/tools/length-cue.mjs computer-science-a "$@" | tail -8
node .scratch/tools/longest-key.mjs computer-science-a "$@" | tail -8
node .scratch/tools/literal-newlines.mjs computer-science-a | tail -1
