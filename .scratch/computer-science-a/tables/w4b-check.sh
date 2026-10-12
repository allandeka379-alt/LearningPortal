#!/bin/sh
# usage: w4b-check.sh <slice-prefix-for-build> <question folder filter>
node --no-warnings .scratch/computer-science-a/build-content.mjs "$1" 2>&1 | grep -E "Error|questions|slice" | head -20
npm run content:validate -- computer-science-a --strict 2>&1 | grep -E "ERROR|warning|FAILED|error\(s\)" | head -30
npm run content:check -- computer-science-a 2>&1 | tail -n +4 | head -20
node .scratch/tools/length-cue.mjs computer-science-a "$2" | tail -12
node .scratch/tools/longest-key.mjs computer-science-a "$2" | tail -2
node .scratch/tools/literal-newlines.mjs computer-science-a | tail -1
