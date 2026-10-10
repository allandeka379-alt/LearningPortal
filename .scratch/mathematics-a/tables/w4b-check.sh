#!/bin/sh
# W4b: build my slices, validate, self-check, length cue (run from the repo root)
node .scratch/mathematics-a/build-content.mjs w4b- 2>&1 | grep -v "^    at " | tail -${1:-4}
npm run content:validate -- mathematics-a --strict 2>&1 | grep -E "ERROR|WARN|error\(s\)|^content/"
npm run content:check -- mathematics-a 2>&1 | tail -n +4
node .scratch/tools/length-cue.mjs mathematics-a forces/moments projectiles/ com/ elasticity/ circular/ variable/ shm/ vectors/cross vectors/lines-planes continuous/rect inference/t-dist inference/chi bivariate/ timeseries/ exam/w4b | tail -1
