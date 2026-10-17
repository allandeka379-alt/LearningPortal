#!/bin/sh
# usage: w2b-check.sh <folder-substring> ...
node .scratch/history-a/build-content.mjs w2b- | tail -4
node .scratch/tools/length-cue.mjs history-a "$@" | tail -6
node .scratch/tools/longest-key.mjs history-a "$@" | tail -1
node .scratch/tools/shortest-key.mjs history-a "$@" | tail -1
node .scratch/tools/literal-newlines.mjs history-a | tail -1
