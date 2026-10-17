#!/bin/sh
# usage: w3b-check.sh <folder-substring> ...
npm run content:validate -- history-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)" | head -30
npm run content:check -- history-a 2>&1 | grep -iE "germany|ww1|skills/(source-eval|essay)|w3b" | head -20
node .scratch/tools/length-cue.mjs history-a "$@" | tail -8
node .scratch/tools/longest-key.mjs history-a "$@" | tail -2
node .scratch/tools/shortest-key.mjs history-a "$@" | tail -2
node .scratch/tools/literal-newlines.mjs history-a | tail -1
