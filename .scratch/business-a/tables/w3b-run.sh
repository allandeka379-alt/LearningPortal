#!/bin/sh
# usage: w3b-run.sh <questions-folder-substring>
node .scratch/business-a/build-content.mjs w3b- | tail -3
npm run content:validate -- business-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)"
npm run content:check -- business-a 2>&1 | grep -E "$1" | cut -c1-260
node .scratch/tools/length-cue.mjs business-a questions/$1 | tail -1
node .scratch/tools/longest-key.mjs business-a questions/$1 | tail -2
node .scratch/tools/literal-newlines.mjs business-a | tail -1
