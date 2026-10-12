#!/bin/bash
# usage: w1b-_chk.sh <area>/<name> ... ; builds and runs the checks for the given question folders
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node .scratch/geography-a/build-content.mjs w1b- 2>&1 | grep -v "^ageo\|^$\|MCQ balance"
for f in "$@"; do
  npm run content:check -- geography-a 2>&1 | grep -i "$f"
done
node .scratch/tools/length-cue.mjs geography-a "${@/#/questions/}" | tail -30
node .scratch/tools/longest-key.mjs geography-a "${@/#/questions/}" | tail -3
