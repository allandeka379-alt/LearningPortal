export const meta = {
  name: 'writers-a-level-wave-2',
  description: 'A-level writers (Sonnet, medium effort, 2 at a time): computer-science-a, geography-a, history-a, 8 assignments each (W1a-W4b from each BRIEF.md)',
  phases: [{ title: 'Write' }],
}

// Families written in this run, in order (8 assignments each, queued 2 at a time).
const FAMILIES = [
  { family: 'computer-science-a', dir: '.scratch/computer-science-a' },
  { family: 'geography-a', dir: '.scratch/geography-a' },
  { family: 'history-a', dir: '.scratch/history-a' },
]
const IDS = ['W1a', 'W1b', 'W2a', 'W2b', 'W3a', 'W3b', 'W4a', 'W4b']
// Assignments cut off by a restart get a RESUMING note: list "family:ID" here before resuming the run.
const RESUME = []
const NOTE = `

RESUMING: an earlier run of this assignment was cut off. Some of your slices, tables and lessons already exist: inspect them (ls the slices/tables folders for your prefix and the lesson folders), keep what is complete and correct, finish the rest, then run all the checks.`

const prompt = (FAMILY, DIR, id) => `Family ${FAMILY}, assignment ${id} (slice prefix ${id.toLowerCase()}-) exactly as defined in the "Proposed split into 8 writer assignments" section of ${DIR}/BRIEF.md (or the brief's equivalent writer-split section): its concept list, folders, exam rows and freePreview lessons are authoritative.
Repo root: C:\\Users\\Lenovo\\Downloads\\Learning Platform (Windows; the Bash tool is Git Bash; run every command from the repo root).
Read ${DIR}/BRIEF.md first and follow it exactly (what to read, targets per concept, conventions, every computed value produced in code, exam-format table, reserved marks, folders and keys, commands, hard limits). The kit is ${DIR}/lib.mjs + build-content.mjs.
Other writers work in ${FAMILY} and other families at the same time: touch only the files of your assignment. Never run git, content:import, content:publish, npm install, prisma or next.
Work concept by concept: lesson + slice, build with node ${DIR}/build-content.mjs ${id.toLowerCase()}-, then npm run content:validate -- ${FAMILY} --strict (errors in files you do not own can be ignored but mention them), npm run content:check -- ${FAMILY} (fix findings in your files), node .scratch/tools/length-cue.mjs ${FAMILY} (# 0 flagged), node .scratch/tools/longest-key.mjs ${FAMILY} questions/<your folders> (keep the key from being the unique longest option in more than about 30% of your MCQs) and node .scratch/tools/literal-newlines.mjs ${FAMILY} (# 0 total). Re-check every answer key.
Final answer: the report the brief asks for (under 300 words), including a "For a reviewer to check" list.`

const jobs = FAMILIES.flatMap(({ family, dir }) => IDS.map((id) => ({ family, dir, id })))
phase('Write')
return await parallel(
  jobs.map(({ family, dir, id }) => () =>
    agent(prompt(family, dir, id) + (RESUME.includes(`${family}:${id}`) ? NOTE : ''), {
      label: `${family} ${id}`,
      phase: 'Write',
      model: 'sonnet',
      effort: 'medium',
    }).then((r) => ({ family, id, report: r })),
  ),
)
