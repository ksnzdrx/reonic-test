import { convertHourlyToQuarterHourly } from "./util";

// arrival probabilities for each 1-hour interval in a day
// we actually need quarterhourly distribution, since we have quarterhourly ticks.
// I will add a function that does so in util.ts

const hourlyProbabilities: number[] = [
  0.0094,
  0.0094,
  0.0094,
  0.0094,
  0.0094,
  0.0094,
  0.0094,
  0.0094,
  0.0283,
  0.0283,
  0.0566,
  0.0566,
  0.0566,
  0.0755,
  0.0755,
  0.0755,
  0.1038,
  0.1038,
  0.1038,
  0.0472,
  0.0472,
  0.0472,
  0.0094,
  0.0094
];

// Total adds up to 0.9990000000000001 - close enough

export const ARRIVAL_PROBABILITIES: number[] = convertHourlyToQuarterHourly(hourlyProbabilities);
