#!/bin/sh
# usage: w2a-_chk.sh <folder substring>   (runs build + all checks for W2a)
cd "C:/Users/Lenovo/Downloads/Learning Platform" || exit 1
node .scratch/geography-a/build-content.mjs w2a- 2>&1 | grep -E "^Error|BOUNDARY|CHECK|slice file|MCQ balance" | cut -c1-300
npm run content:validate -- geography-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)"
npm run content:check -- geography-a 2>&1 | grep -E "tectonics|geomorph|hydro|water|landforms-granite|w2a" | cut -c1-260
node .scratch/tools/length-cue.mjs geography-a "$@" | tail -12
node .scratch/tools/longest-key.mjs geography-a "$@" | tail -6
node .scratch/tools/literal-newlines.mjs geography-a | tail -2
