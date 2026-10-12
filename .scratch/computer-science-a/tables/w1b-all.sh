#!/bin/bash
# usage: w1b-all.sh <folder-substring>...   (build w1b-, validate, check, cues)
cd "C:/Users/Lenovo/Downloads/Learning Platform"
node --no-warnings .scratch/computer-science-a/build-content.mjs w1b- | grep -v "^MCQ balance" | tail -22
npm run content:validate -- computer-science-a --strict 2>&1 | grep -E "warning|error|FAILED|passed" 
npm run content:check -- computer-science-a 2>&1 | tail -12
node .scratch/tools/length-cue.mjs computer-science-a "$@" | tail -15
node .scratch/computer-science-a/tables/w1b-lk.mjs "$@"
node .scratch/tools/literal-newlines.mjs computer-science-a | tail -1
