#!/bin/sh
# usage: w1a-check.sh <folder-substring> ...
node .scratch/history-a/build-content.mjs w1a- | tail -3
npm run content:validate -- history-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)"
node .scratch/tools/length-cue.mjs history-a "$@" | tail -12
node .scratch/tools/longest-key.mjs history-a "$@" | tail -1
node .scratch/tools/shortest-key.mjs history-a "$@" | tail -1
