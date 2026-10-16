import { table, chk, r2 } from "../lib.mjs";
// Example 1: on-the-job vs off-the-job training cost for 6 trainees
const n = 6;
const onJob = { fee: 0, trainerTimePerTrainee: 60, lostOutputPerTrainee: 90 };
const offJob = { fee: 250, trainerTimePerTrainee: 0, lostOutputPerTrainee: 140 };
const c1 = n * (onJob.fee + onJob.trainerTimePerTrainee + onJob.lostOutputPerTrainee);
const c2 = n * (offJob.fee + offJob.trainerTimePerTrainee + offJob.lostOutputPerTrainee);
console.log(c1, c2);
// Example 2: payback of training
const cost = c2; const gainPerMonthPerWorker = 65; const monthlyGain = n * gainPerMonthPerWorker;
console.log(monthlyGain, cost / monthlyGain);
