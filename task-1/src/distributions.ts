import { convertHourlyToQuarterHourly } from "./util";

interface ChargingNeed {
  neededkWh: number;
  probability: number;
};

// arrival probabilities for each 1-hour interval in a day
// we actually need quartehourly distribution, since we have quartehourly ticks.
// I will add a function that does so in util.ts

const hourlyProbablities: number[] = [
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

export const ARRIVAL_PROBABILITIES: number[] = convertHourlyToQuarterHourly(hourlyProbablities); 

// we do not really care about the km, but about the potentially comsumed kWh, so converted
export const CHARGING_NEEDS_DISTRIBUTION: ChargingNeed[] = [
  { neededkWh: 0, probability: 0.3431 },
  { neededkWh: 0.9, probability: 0.0490 },
  { neededkWh: 1.8, probability: 0.0980 },
  { neededkWh: 3.6, probability: 0.1176 },
  { neededkWh: 5.4, probability: 0.0882 },
  { neededkWh: 9, probability: 0.1176 },
  { neededkWh: 18, probability: 0.1078 },
  { neededkWh: 36, probability: 0.0490 },
  { neededkWh: 54, probability: 0.0294 }
];
