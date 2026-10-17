#!/bin/sh
# usage: w4b-one.sh <folder/name>   (builds all w4b-, then reports per-file length stats)
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node .scratch/history-a/build-content.mjs w4b- | tail -1
f=$1
node .scratch/tools/length-cue.mjs history-a questions/$f | tail -1
node .scratch/tools/longest-key.mjs history-a --list questions/$f | grep -E "^#|^  \*" | cut -c1-150
node .scratch/tools/shortest-key.mjs history-a --list questions/$f | grep -E "^#|^  \*" | cut -c1-150
