export const meta = {
  name: 'subject-foundations-waveE',
  description: 'A-level foundations (accounting-a, economics-a, business-a, computer-science-a, geography-a, history-a): syllabus files, registries, writer kits and briefs (Sonnet, medium effort)',
  phases: [{ title: 'Foundations' }],
}

const COMMON = `Repo root: C:\\Users\\Lenovo\\Downloads\\Learning Platform (Windows; the Bash tool is Git Bash; run every command from the repo root).
Read .scratch/tools/FOUNDATION-BRIEF.md first and follow it exactly (deliverables, syllabus rules, hard limits). Finished foundations to copy: the A-level kits .scratch/biology-a/ and .scratch/mathematics-a/ (A-level structure, AS/A routes, exam-format plans with skills) and the O-level kit of the same subject (.scratch/accounting/, .scratch/economics/, .scratch/business/, .scratch/computer-science/, .scratch/geography/, .scratch/history/: build-syllabi.mjs, lib.mjs, build-content.mjs, BRIEF.md). In BRIEF.md propose the writer split as 8 assignments of 8-14 concepts each, prefixes w1a- w1b- w2a- w2b- w3a- w3b- w4a- w4b-, each with folders, exam rows and freePreview lessons; exam-format STRUCTURED parts use labels (a), (b) ... with sub-parts (i), (ii) one level deep, or "(1)" with sub-parts "(a)" (the validator rejects "1(a)"). Include a mock-exam plan line in BRIEF.md (papers, item sizes, minutes) and reserved mark values, as biology-a does.
In lib.mjs, if you keep a String.raw text helper (\`t\`), make it turn a typed "\\n" (not followed by a lower-case letter) into a real newline, or tell writers to use real line breaks: a literal backslash-n renders as "\\n" on screen (.scratch/tools/literal-newlines.mjs checks this; add it to the brief's commands).
ZIMSEC is the main product: build the ZIMSEC syllabus files with the same care as the Cambridge ones. ZIMSEC officialDocument.url: the copies were obtained from the zimsake.co.zw document library (record "Ministry document, copy obtained from zimsake.co.zw softidrive" in notes, and use https://www.zimsake.co.zw/softidrive/ as the URL). Note in notes that ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6 and that the version must be confirmed.
For A-level families the registry level is "A". Cambridge AS & A Level: model AS Level and A Level as routes ("AS", "A") with their components, as the pipeline supports (docs/CONTENT_PIPELINE.md §5 routes, prisma SyllabusRoute); keep AS-only and A Level content distinguishable for writers (a concept description noting "A Level only").
Other agents work in other folders at the same time: touch only your own subject folder, registry and syllabus files. Never run git, content:import, content:publish, npm install, prisma or next.
Your final answer is the report the brief asks for (under 350 words).`

const S = [
  { label: 'accounting-a', prompt: `Foundation for family accounting-a (concept prefix aacc; check no other family uses it), folder .scratch/accounting-a/.
Syllabi: zimsec/a-level/accounting from .scratch/accounting-a/sources/zimsec-accounting-a.txt (Forms 5-6, 2015-2022); cambridge/a-level/accounting (9706) 2026-2028 from .scratch/accounting-a/sources/9706-2026-2028.txt, officialDocument.url https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf.
Writers' brief notes: every figure balance-checked in code (accounts balance, ratios recomputed); IAS/IFRS terminology for Cambridge, ZIMSEC terms noted where they differ; amounts in US$ unless a question names another currency.
${COMMON}` },
  { label: 'economics-a', prompt: `Foundation for family economics-a (concept prefix aecon), folder .scratch/economics-a/.
Syllabi: zimsec/a-level/economics from .scratch/economics-a/sources/zimsec-economics-a.txt (Forms 5-6, 2015-2022); cambridge/a-level/economics (9708) 2026-2028 from .scratch/economics-a/sources/9708-2026-2028.txt, officialDocument.url https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf.
Writers' brief notes: diagrams described in words (no images) with labelled axes and curves; elasticities, multipliers, index numbers computed in code; Zimbabwean context (currency, inflation, land, mining, informal sector) factual and politically neutral; data labelled illustrative.
${COMMON}` },
  { label: 'business-a', prompt: `Foundation for family business-a (concept prefix abus), folder .scratch/business-a/.
Syllabi: zimsec/a-level/business-studies from .scratch/business-a/sources/zimsec-business-studies-a.txt; zimsec/a-level/business-enterprise-skills from .scratch/business-a/sources/zimsec-business-enterprise-a.txt (both Forms 5-6, 2015-2022; one family serves both, share concepts where the content is the same); cambridge/a-level/business (9609) 2026-2028 from .scratch/business-a/sources/9609-2026-2028.txt, officialDocument.url https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf.
Writers' brief notes: case studies are invented Zimbabwean or regional businesses, clearly fictional; ratios, break-even, investment appraisal (payback, ARR, NPV) and decision trees computed in code.
${COMMON}` },
  { label: 'computer-science-a', prompt: `Foundation for family computer-science-a (concept prefix acs), folder .scratch/computer-science-a/.
Syllabi: zimsec/a-level/computer-science from .scratch/computer-science-a/sources/zimsec-computer-science-a.txt (Forms 5-6, 2015-2022); cambridge/a-level/computer-science (9618) 2027-2029 from .scratch/computer-science-a/sources/9618-2027-2029.txt, officialDocument.url https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf.
Writers' brief notes: pseudocode in the Cambridge 9618 pseudocode guide style; trace tables, conversions, floating-point and logic results computed in code; Python is the practical language unless the syllabus requires another.
${COMMON}` },
  { label: 'geography-a', prompt: `Foundation for family geography-a (concept prefix ageo), folder .scratch/geography-a/.
Syllabi: zimsec/a-level/geography from .scratch/geography-a/sources/zimsec-geography-a.txt (Forms 5-6, 2015-2022); cambridge/a-level/geography (9696) 2027-2029 from .scratch/geography-a/sources/9696-2027-2029.txt, officialDocument.url https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf (core physical, core human and the optional topics as optional groups).
Writers' brief notes: maps, photographs and graphs described in words; statistics (Spearman, chi-squared, nearest-neighbour, means) computed in code; Zimbabwean and southern African case studies factual, data labelled with its source or as illustrative.
${COMMON}` },
  { label: 'history-a', prompt: `Foundation for family history-a (concept prefix ahist), folder .scratch/history-a/.
Syllabi: zimsec/a-level/history from .scratch/history-a/sources/zimsec-history-a.txt (Forms 5-6, 2015-2022); cambridge/a-level/history (9489) 2027-2029 from .scratch/history-a/sources/9489-2027-2029.txt, officialDocument.url https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf (the options as optional groups; note which options the platform covers first and why).
Writers' brief notes: established dates and facts only; contested interpretations presented as such with named historians only where certain; casualty figures as estimate ranges; every source in a source-based question invented and labelled as such (copy the rules in .scratch/history/BRIEF.md).
${COMMON}` },
]

phase('Foundations')
return await parallel(S.map((s) => () => agent(s.prompt, { label: s.label, phase: 'Foundations', model: 'sonnet', effort: 'medium' }).then((r) => ({ subject: s.label, report: r }))))
