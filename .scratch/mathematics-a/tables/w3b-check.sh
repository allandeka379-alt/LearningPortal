#!/bin/sh
# W3b: build + all checks (run from repo root). Args: question folders/files to scan for longest-key.
node .scratch/mathematics-a/build-content.mjs w3b- | tail -4
npm run content:validate -- mathematics-a --strict 2>&1 | grep -vE "^\s*$|^>" | grep -E "normal/binomial-approximation|discrete/poisson|rv/|continuous/(pdf|cdf)|sampling/|estimation/|inference/(hypothesis-basics|binomial-poisson-tests|normal-mean-test|errors)|exam/w3b|error\(s\)" | head -60
npm run content:check -- mathematics-a 2>&1 | grep -E "binomial-approximation|discrete[./]poisson|rv[./]|continuous[./](pdf|cdf)|sampling[./]|estimation[./]|inference[./](hypothesis-basics|binomial-poisson-tests|normal-mean-test|errors)|w3b|checked" | head -60
node .scratch/tools/length-cue.mjs mathematics-a 2>&1 | grep -E "binomial-approximation|poisson|rv/|continuous/|sampling/|estimation/|inference/|w3b|flagged" | head -20
for d in "$@"; do node .scratch/tools/longest-key.mjs mathematics-a "questions/$d" 2>&1 | tail -1; done
