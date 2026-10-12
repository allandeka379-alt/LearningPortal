#!/bin/bash
cd "C:/Users/Lenovo/Downloads/Learning Platform"
npm run content:validate -- computer-science-a --strict 2>&1 | tail -25
npm run content:check -- computer-science-a 2>&1 | tail -25
node .scratch/tools/length-cue.mjs computer-science-a questions/asm questions/os questions/translation questions/ai questions/ethics/ai-impact questions/ds/graphs-dictionaries questions/exam/w2a | tail -15
node .scratch/computer-science-a/tables/w2a-lk.mjs asm/assembly-programs asm/bit-manipulation os/ translation/ ai/ ethics/ai-impact graphs-dictionaries exam/w2a
node .scratch/tools/literal-newlines.mjs computer-science-a | tail -3
