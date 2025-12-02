import { ARRIVAL_PROBABILITIES, CHARGING_NEEDS_DISTRIBUTION } from './distributions';
import { RandomGenerator, SeededRandom, DefaultRandomGenerator } from './random';

const CHARGING_POWER: number = 11;
const MINUTES_PER_TICK: number = 15;
const TICKS_PER_YEAR: number = 35040;

interface PortState {
  isFree: boolean;
  energyDemand: number;
  energyToCharge: number;
}

interface SimulationResult {
  totalEnergy: number;
  theoreticalMaxPower: number;
  actualMaxPower: number;
  concurrencyFactor: number;
  grid: PortState[][];
}

export function runSimulation(
  numChargeports: number,
  chargingPower: number = CHARGING_POWER,
  seed?: number
): SimulationResult {
  // Create random generator based on seed presence
  const rng: RandomGenerator = seed !== undefined
    ? new SeededRandom(seed)
    : new DefaultRandomGenerator();

  const chargingPowerToUse: number = chargingPower;

  // 2d array [port][tick] with all ports free
  const grid: PortState[][] = [];
  for (let port: number = 0; port < numChargeports; port++) {
    grid[port] = [];
    for (let tick: number = 0; tick < TICKS_PER_YEAR; tick++) {
      grid[port][tick] = {
        isFree: true,
        energyDemand: 0,
        energyToCharge: 0
      };
    }
  }

  let totalEnergy: number = 0;
  let actualMaxPower: number = 0;

  for (let tick: number = 0; tick < TICKS_PER_YEAR; tick++) {
    let currentPower: number = 0;

    for (let port: number = 0; port < numChargeports; port++) {
      const state: PortState = grid[port][tick];

      // if there's energy to charge from previous tick, copy state
      if (tick > 0) {
        const prevState: PortState = grid[port][tick - 1];
        state.energyDemand = prevState.energyDemand;
        state.energyToCharge = prevState.energyToCharge;
        state.isFree = prevState.isFree;
      }

      // process charging if car is present
      if (state.energyToCharge > 0) {
        const energyChargedThisTick: number = Math.min(
          state.energyToCharge,
          chargingPowerToUse * (MINUTES_PER_TICK / 60)
        );

        state.energyToCharge -= energyChargedThisTick;
        totalEnergy += energyChargedThisTick;
        currentPower += chargingPowerToUse;

        // if charging is complete, mark as free
        if (state.energyToCharge <= 0) {
          state.isFree = true;
          state.energyToCharge = 0;
        }
      }
    }

    //  update max power
    actualMaxPower = Math.max(actualMaxPower, currentPower);

    const arrivalProbability: number = getArrivalProbability(tick);

    // assuming that each port's probability to get an arrival is independent
    for (let port: number = 0; port < numChargeports; port++) {
      const state: PortState = grid[port][tick];

      const randomValue: number = rng.next();
      if (state.isFree && randomValue < arrivalProbability) {
        // new car arrives
        const energyNeeded: number = getChargingNeeds(rng);

         if (energyNeeded > 0) {
          state.energyDemand = energyNeeded;
          state.energyToCharge = energyNeeded;
          state.isFree = false;
        } else {
          state.energyDemand = 0;
          state.energyToCharge = 0;
        }
      }
    }
  }

  const theoreticalMaxPower: number = numChargeports * chargingPowerToUse;
  const concurrencyFactor: number = actualMaxPower / theoreticalMaxPower;
  
  return {
    totalEnergy,
    theoreticalMaxPower,
    actualMaxPower,
    concurrencyFactor,
    grid
  };
}

function getArrivalProbability(tick: number): number {
  const tickOfDay: number = tick % 96; // 96 ticks per day (24 hours * 4 quarter-hours)
  return ARRIVAL_PROBABILITIES[tickOfDay];
}

function getChargingNeeds(rng: RandomGenerator): number {
  const rand: number = rng.next();
  let cumulativeProbability: number = 0;

  for (const { neededkWh, probability } of CHARGING_NEEDS_DISTRIBUTION) {
    cumulativeProbability += probability;
    if (rand < cumulativeProbability) {
      return neededkWh;
    }
  }

  // fallback, in case the random value is more than 0.9997
  return 0;
}

// function to run analysis for 30 chargeports
export function runAnalysisFor30Ports(): SimulationResult[] {
  const results: SimulationResult[] = [];

  for (let numChargeports: number = 1; numChargeports <= 30; numChargeports++) {
    const result: SimulationResult = runSimulation(numChargeports);
    // const result: SimulationResult = runSimulation(numChargeports, CHARGING_POWER, 6172536);
    results.push(result);
  }

  return results;
}
