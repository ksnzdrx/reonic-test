import { ARRIVAL_PROBABILITIES } from './distributions';
import { RandomGenerator, DefaultRandomGenerator, SeededRandom } from './random';
import { SimulationParams, SimulationResult, ChargingEvent, HourlyData } from '../types';

// a copy of the version in task 1, but slightly adjusted, mostly with AI to save time
// therefore, does not deliver the exact same numbers as in task 1, so simulation results arent the most accurate here.

const MINUTES_PER_TICK: number = 15;
const TICKS_PER_YEAR: number = 35040;

interface PortState {
  isFree: boolean;
  energyDemand: number;
  energyToCharge: number;
}

export function runSimulation(params: SimulationParams): SimulationResult {
  const { numChargePoints, arrivalMultiplier, consumption, chargingPower, seed } = params;
  const rng: RandomGenerator = seed !== undefined
    ? new SeededRandom(seed)
    : new DefaultRandomGenerator();

  const grid: PortState[][] = [];
  for (let port: number = 0; port < numChargePoints; port++) {
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
  const events: ChargingEvent[] = [];
  const eventsPerDay: number[] = new Array(365).fill(0);
  const startDate = new Date(2024, 0, 1);

  let actualMaxPowerYear: number = 0;
  let actualMaxPowerLastMonth: number = 0;
  const lastMonthStartTick = Math.floor((365 - 31) * 96); // Last 31 days in ticks

  for (let tick: number = 0; tick < TICKS_PER_YEAR; tick++) {
    let currentPower: number = 0;

    for (let port: number = 0; port < numChargePoints; port++) {
      const state: PortState = grid[port][tick];

      if (tick > 0) {
        const prevState: PortState = grid[port][tick - 1];
        state.energyDemand = prevState.energyDemand;
        state.energyToCharge = prevState.energyToCharge;
        state.isFree = prevState.isFree;
      }

      if (state.energyToCharge > 0) {
        const energyChargedThisTick: number = Math.min(
          state.energyToCharge,
          chargingPower * (MINUTES_PER_TICK / 60)
        );

        state.energyToCharge -= energyChargedThisTick;
        totalEnergy += energyChargedThisTick;
        currentPower += chargingPower;

        if (state.energyToCharge <= 0) {
          state.isFree = true;
          state.energyToCharge = 0;
        }
      }
    }

    // Track maximum power for year and last month
    actualMaxPowerYear = Math.max(actualMaxPowerYear, currentPower);
    if (tick >= lastMonthStartTick) {
      actualMaxPowerLastMonth = Math.max(actualMaxPowerLastMonth, currentPower);
    }

    const arrivalProbability: number = getArrivalProbability(tick, arrivalMultiplier);

    for (let port: number = 0; port < numChargePoints; port++) {
      const state: PortState = grid[port][tick];

      const randomValue: number = rng.next();
      if (state.isFree && randomValue < arrivalProbability) {
        const energyNeeded: number = consumption;

        if (energyNeeded > 0) {
          state.energyDemand = energyNeeded;
          state.energyToCharge = energyNeeded;
          state.isFree = false;

          const startTime = new Date(startDate.getTime() + tick * MINUTES_PER_TICK * 60 * 1000);
          const chargingTimeHours = energyNeeded / chargingPower;
          const endTime = new Date(startTime.getTime() + chargingTimeHours * 60 * 60 * 1000);

          events.push({
            chargePointId: port,
            startTime,
            endTime,
            energyCharged: energyNeeded,
          });

          const dayOfYear = Math.floor(tick / 96);
          if (dayOfYear < 365) {
            eventsPerDay[dayOfYear]++;
          }
        }
      }
    }
  }

  const hourlyData: HourlyData[] = [];
  for (let hour = 0; hour < 365 * 24; hour++) {
    const tickStart = Math.floor((hour * 60) / MINUTES_PER_TICK);
    const chargePointPowers = new Array(numChargePoints).fill(0);

    for (let port = 0; port < numChargePoints; port++) {
      if (tickStart < TICKS_PER_YEAR && !grid[port][tickStart].isFree) {
        chargePointPowers[port] = chargingPower;
      }
    }

    hourlyData.push({
      hour,
      timestamp: new Date(startDate.getTime() + hour * 60 * 60 * 1000),
      chargePoints: chargePointPowers,
      totalPower: chargePointPowers.reduce((sum, p) => sum + p, 0),
    });
  }

  // Calculate concurrency factors
  // Theoretical maximum power = all charge points at full power
  const theoreticalMaxPower = numChargePoints * chargingPower;

  // Concurrency factor = ratio of actual max power to theoretical max power
  const concurrencyFactorYear = theoreticalMaxPower > 0 ? actualMaxPowerYear / theoreticalMaxPower : 0;
  const concurrencyFactorLastMonth = theoreticalMaxPower > 0 ? actualMaxPowerLastMonth / theoreticalMaxPower : 0;

  return {
    events,
    hourlyData,
    totalEnergy,
    eventsPerDay,
    concurrencyFactorLastMonth,
    concurrencyFactorYear,
  };
}

function getArrivalProbability(tick: number, multiplier: number): number {
  const tickOfDay: number = tick % 96;
  const baseProbability = ARRIVAL_PROBABILITIES[tickOfDay];
  return baseProbability * (multiplier / 100);
}
