#!/bin/sh
# W3a: build + all checks (run from repo root). Args: question folders/files to scan for longest-key.
node .scratch/mathematics-a/build-content.mjs w3a- | tail -3
npm run content:validate -- mathematics-a --strict 2>&1 | grep -vE "^\s*$|^>" | grep -E "data/|counting/|probability/|discrete/|normal/|exam/w3a|error\(s\)" | head -40
npm run content:check -- mathematics-a 2>&1 | grep -E "data[./]|counting[./]|probability[./]|discrete[./]|normal[./]|w3a|checked" | head -40
node .scratch/tools/length-cue.mjs mathematics-a 2>&1 | grep -E "data/|counting/|probability/|discrete/|normal/|w3a|flagged" | head
for d in "$@"; do node .scratch/tools/longest-key.mjs mathematics-a "questions/$d" 2>&1 | tail -1; done
