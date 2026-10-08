export const meta = {
  name: 'content-subject',
  description: 'Write real, original, reviewed curriculum content for ONE subject family (args): syllabi + concept plan, lessons/questions/flashcards per slice with adversarial review, tests + mock exams, validate + import',
  whenToUse: 'Run once per subject family with args { family, label, level, syllabi[], slices, perConcept, notes }',
  phases: [
    { title: 'Plan', detail: 'syllabus transcription + concept map + slice plan' },
    { title: 'Write', detail: 'lessons, questions, flashcards per concept slice' },
    { title: 'Review', detail: 'independent adversarial correctness review per slice (fixes in place)' },
    { title: 'Assemble', detail: 'topic tests + mock exams, validate, import, dev publish, smoke' },
  ],
}

const A = args || {}
if (!A.family || !A.syllabi) throw new Error('args.family and args.syllabi are required')
const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const SLICES = A.slices || 4
const PER = Object.assign({ questions: 20, flashcards: 10, lessons: 1 }, A.perConcept || {})

const COMMON = `You are an expert ${A.level === 'A' ? 'A-Level' : 'O-Level / IGCSE'} ${A.label} teacher and examiner AND a careful content engineer, writing REAL, ORIGINAL study content for a Zimbabwean exam-preparation platform (ZIMSEC and Cambridge). CLAUDE.md is in your context. Repo root: ${ROOT} (Windows; Git Bash + PowerShell; node available for calculations).

READ FIRST: docs/CONTENT_PIPELINE.md (the authoritative file formats, quality bar and style guide — follow it exactly), docs/CONTENT_AUTHORING.md (markdown directives + LaTeX), and the existing content/ files (formats by example; the mathematics sample is reviewed and correct).

NON-NEGOTIABLE:
- Original wording only. Never reproduce textbook passages, past-paper questions or mark schemes; writing in the exam STYLE of the board (command words, mark allocation, structure) is expected.
- Accuracy above volume: every fact must be correct for the syllabus level; every numerical answer computed (use node -e or a scratch script under .scratch/ to verify arithmetic, unit conversions, significant figures); every MCQ has exactly one defensible correct answer (or exactly the documented correct set for multi-select) and plausible distractors based on real misconceptions.
- Level-appropriate: ${A.level === 'A' ? 'A-Level depth (Cambridge International AS & A Level / ZIMSEC A-Level)' : 'O-Level / IGCSE depth; cover Core and Extended where Cambridge distinguishes them'}.
- Zimbabwean context where natural (names, towns, US dollars/ZiG, local agriculture, industry, geography, climate), SI units, British spelling.
- Marking specs accept every equivalent correct answer (units, rounding tolerance, synonyms/accepted variants) and the modelResponse scores full marks with the real marking engine.
- Validate continuously: npm run content:validate -- ${A.family} must pass for your files before you finish.
${A.notes ? 'SUBJECT NOTES: ' + A.notes : ''}

Subject family: ${A.family}. Syllabi: ${JSON.stringify(A.syllabi)}.`

phase('Plan')
const PLAN = {
  type: 'object',
  properties: {
    syllabusFiles: { type: 'array', items: { type: 'string' } },
    conceptCount: { type: 'number' },
    slices: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          concepts: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' }, notes: { type: 'string' } }, required: ['key', 'name'] } },
        },
        required: ['name', 'concepts'],
      },
    },
    uncertainties: { type: 'array', items: { type: 'string' } },
  },
  required: ['syllabusFiles', 'conceptCount', 'slices'],
}
const plan = await agent([COMMON, '',
  `PLAN TASK: (1) Write the syllabus file for EACH listed syllabus (content/syllabi/...) with the COMPLETE topic tree (all sections, topics and subtopics; learning objectives where you know them confidently) transcribed from the publicly available syllabus structure, with the official document citation and a verification note; mark uncertain parts in notes rather than inventing. If a syllabus file already exists, extend/correct it instead of duplicating. (2) Write/extend the concept registry for this family (content/concepts/${A.family}.json): one canonical concept per teachable unit (roughly one per syllabus subtopic; shared across boards when the content is the same), and make every syllabus node "covers" the right concept keys so content written once is tagged to both boards. Concepts already covered by existing content files are not re-planned. (3) Split the remaining concepts into ${SLICES} balanced slices of related concepts (each slice is written by one writer). npm run content:validate -- ${A.family} must pass (syllabus + concepts). Return the plan.`,
].join('\n'), { label: 'plan:' + A.family, phase: 'Plan', schema: PLAN })
if (!plan || !plan.slices || plan.slices.length === 0) return { error: 'planning failed', plan }
log(A.family + ': ' + plan.conceptCount + ' concepts in ' + plan.slices.length + ' slices')

const WRITE = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    lessons: { type: 'number' },
    questions: { type: 'number' },
    flashcards: { type: 'number' },
    validateClean: { type: 'boolean' },
    notes: { type: 'array', items: { type: 'string' } },
  },
  required: ['files', 'lessons', 'questions', 'flashcards', 'validateClean'],
}
const REVIEW = {
  type: 'object',
  properties: {
    itemsChecked: { type: 'number' },
    errorsFound: { type: 'number' },
    errorsFixed: { type: 'number' },
    examples: { type: 'array', items: { type: 'string' } },
    validateClean: { type: 'boolean' },
    unresolved: { type: 'array', items: { type: 'string' } },
  },
  required: ['itemsChecked', 'errorsFound', 'errorsFixed', 'validateClean'],
}

const results = await pipeline(plan.slices,
  (slice, _orig, i) => agent([COMMON, '',
    `WRITE TASK — slice "${slice.name}" (${slice.concepts.length} concepts): ${JSON.stringify(slice.concepts)}`,
    `For EACH concept write: ${PER.lessons} complete lesson(s) (typically 900-1600 words: introduction, key definitions, clear explanation, at least two fully worked examples for quantitative topics or well-developed illustrative examples otherwise, common mistakes, exam tips with command words, summary; mark about one lesson per top-level topic as freePreview); about ${PER.questions} questions spread across difficulty 1-5 and types (mostly MCQ, short answer/numerical and structured multi-part exam-style questions, plus fill-in-the-blank, matching and true/false where they fit; essays/extended responses with mark-scheme points for humanities/languages), each with explanation, worked solution where relevant, hints, modelResponse and realistic marks/time; mark 2-3 easy-to-medium auto-markable questions per concept dailyEligible; about ${PER.flashcards} flashcards (definitions, formulas, key facts, processes, dates as relevant). Organise files exactly as docs/CONTENT_PIPELINE.md prescribes (one file per concept is good). Verify every calculation with code. Run npm run content:validate -- ${A.family} and fix until clean. Do not edit other slices' files.`,
  ].join('\n'), { label: `write:${A.family}:${i + 1}`, phase: 'Write', schema: WRITE }),
  (written, slice, i) => agent([COMMON, '',
    `REVIEW TASK — you are an independent senior examiner reviewing slice "${slice.name}" written by another author. Writer report: ${JSON.stringify(written)}. Concepts: ${JSON.stringify(slice.concepts.map(c => c.key))}.`,
    'Be adversarial: assume there are errors and find them. For EVERY question: solve it yourself from the stem alone (use code for anything numerical), compare with the answer key/modelResponse, check every distractor is actually wrong, check the explanation and worked solution, check marks/difficulty are sensible and the marking spec accepts all equivalent correct answers. For EVERY lesson and flashcard: check every fact, definition, formula, unit, date and example against established knowledge at this syllabus level; check syllabus alignment and that nothing is copied from a known textbook/past paper. Fix errors directly in the files (rewrite or delete items that cannot be made correct), then run npm run content:validate -- ' + A.family + ' until clean. Report counts and representative examples of what you fixed.',
  ].join('\n'), { label: `review:${A.family}:${i + 1}`, phase: 'Review', schema: REVIEW }),
)

const ok = results.filter(Boolean)
const totals = ok.reduce((t, r) => ({ checked: t.checked + (r.itemsChecked || 0), found: t.found + (r.errorsFound || 0), fixed: t.fixed + (r.errorsFixed || 0) }), { checked: 0, found: 0, fixed: 0 })
log(A.family + ' review: checked ' + totals.checked + ', errors found ' + totals.found + ', fixed ' + totals.fixed)

phase('Assemble')
const assembled = await agent([COMMON, '',
  `ASSEMBLE TASK for ${A.family}. Review summary: ${JSON.stringify(totals)}.`,
  '1. Assessments: one topic test per top-level topic per syllabus (blueprint over that topic\'s concepts, mixed difficulty, 15-25 marks, timed), and 2-3 full mock exams per syllabus in the STYLE of the board\'s real papers (paper names/structure/duration/marks as publicly documented; label them "mock exam in the style of ..." — never claim to be official papers), built from blueprint rules so they draw from the bank; npm run content:validate -- ' + A.family + ' must confirm every blueprint is satisfiable.',
  '2. Full validation of the family, then npm run content:import -- --family ' + A.family + ' into the DEV database (run twice; the second run must report no changes), then publish for DEV PREVIEW ONLY with npm run content:publish -- --approver demo.admin@example.test --family ' + A.family + ' (production publishing requires a human reviewer — note this in your report).',
  '3. Smoke via a .scratch tsx script with --conditions=react-server: a student enrolled in each syllabus sees the topic tree, the lessons render, practice on two topics draws the new questions and marks a correct modelResponse as correct, a topic test and a mock exam start.',
  '4. Write content/subjects/' + A.family + '/README.md: coverage table (per syllabus topic: lessons, questions by type/difficulty, flashcards), known gaps (e.g. diagrams needed), review stats, and items needing a specialist teacher\'s check.',
].join('\n'), {
  label: 'assemble:' + A.family, phase: 'Assemble',
  schema: { type: 'object', properties: { lessons: { type: 'number' }, questions: { type: 'number' }, flashcards: { type: 'number' }, assessments: { type: 'number' }, imported: { type: 'boolean' }, smoke: { type: 'string' }, gaps: { type: 'array', items: { type: 'string' } } }, required: ['lessons', 'questions', 'flashcards', 'assessments', 'imported', 'smoke'] },
})

return { family: A.family, plan: { concepts: plan.conceptCount, slices: plan.slices.map(s => s.name), uncertainties: plan.uncertainties }, writers: ok.length, review: totals, assembled }
