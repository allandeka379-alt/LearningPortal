#!/bin/bash
# lists JSON/lesson spots where US$ appears without the backslash
cd "C:/Users/Lenovo/Downloads/Learning Platform/content/subjects/business-a"
for f in questions/operations/{lean,critical-path,erp-ict,strategy-flexibility,work-study}.json questions/finance/{need,working-capital,sources-internal,sources-external,choosing-source,financial-markets,cash-flow-forecast,cost-types,costing-methods}.json questions/exam/w4a-*.json flashcards/operations/*.json flashcards/finance/*.json; do
  [ -f "$f" ] && grep -Hn -F 'US$' "$f" | head -3
done
for f in lessons/operations/*.md lessons/finance/*.md; do grep -Hn -F 'US$' "$f" | head -3; done
