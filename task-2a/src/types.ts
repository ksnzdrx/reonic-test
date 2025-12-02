export interface SimulationParams {
  numChargePoints: number;
  arrivalMultiplier: number;
  consumption: number;
  chargingPower: number;
  seed?: number;
}

export interface ChargingEvent {
  chargePointId: number;
  startTime: Date;
  endTime: Date;
  energyCharged: number;
}

export interface HourlyData {
  hour: number;
  timestamp: Date;
  chargePoints: number[];
  totalPower: number;
}

export interface SimulationResult {
  events: ChargingEvent[];
  hourlyData: HourlyData[];
  totalEnergy: number;
  eventsPerDay: number[];
  concurrencyFactorLastMonth: number;
  concurrencyFactorYear: number;
}
