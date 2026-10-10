#!/bin/sh
# W2b: build + all checks (run from repo root)
node .scratch/mathematics-a/build-content.mjs w2b- | tail -4
npm run content:validate -- mathematics-a --strict 2>&1 | grep -E "^content|ERROR|WARN|error\(s\)" | head -30
npm run content:check -- mathematics-a 2>&1 | grep -E "complex|numerical|/de/|matrices|groups|exam/w2b|checked" | head -30
node .scratch/tools/length-cue.mjs mathematics-a 2>&1 | grep -E "complex|numerical|/de/|matrices|groups|w2b|flagged" | head
for d in $*; do node .scratch/tools/longest-key.mjs mathematics-a questions/$d 2>&1 | tail -2; done
