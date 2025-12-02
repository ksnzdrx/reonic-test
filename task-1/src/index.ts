import { runSimulation, runAnalysisFor30Ports } from './simulation';
import * as fs from 'fs';
import * as path from 'path';

/*
console.log("Arrival probabilities");
let distribution = require('./distributions').ARRIVAL_PROBABILITIES;
console.log(distribution);
console.log("Total: ", distribution.reduce((a: number, b: number) => a + b, 0));
*/
console.log('Running simulation for 20 chargepoints');

let numChargeports: number = 20;
const result = runSimulation(numChargeports);

console.log(`Total energy consumed: ${result.totalEnergy.toFixed(2)} kWh`);
console.log(`Theoretical maximum power demand: ${result.theoreticalMaxPower.toFixed(2)} kW`);
console.log(`Actual maximum power demand: ${result.actualMaxPower.toFixed(2)} kW`);
console.log(`Concurrency factor: ${(result.concurrencyFactor * 100)}%`);

let results30Chargeports = runAnalysisFor30Ports();
console.log('\nAnalysis for 1 to 30 chargeports:');
results30Chargeports.forEach((res, index) => {
  console.log(`Chargeports: ${index + 1}, Total Energy: ${res.totalEnergy.toFixed(2)} kWh, Theoretical Max Power: ${res.theoreticalMaxPower.toFixed(2)} kW, Actual Max Power: ${res.actualMaxPower.toFixed(2)} kW, Concurrency Factor: ${(res.concurrencyFactor * 100)}%`);
});

// see printed results in results.json
const resultsPath = path.join(__dirname, '..', 'results.json');
const resultsWithoutGrid = results30Chargeports.map(({ grid, ...rest }) => rest);
const jsonLines = '[\n' + resultsWithoutGrid.map(result => JSON.stringify(result)).join(',\n') + '\n]';
fs.writeFileSync(resultsPath, jsonLines);
console.log(`\nResults saved to: ${resultsPath}`);

// concurrenccy factor should be higher if the hour probabilities are not broken down into quarterhourly blocks
// seeded random generated consistent results if the seed was unchanged (as expected)

// the simultion was executed with multiple seeds and the results seemed to be a bit lower than expected in comparison to using .random()
// see /src/random.ts for details on how it was done

// The more chargeports, the lower is concurrency factor 
// because with more chargeports, the probability of multiple cars arriving at the same time statistically decreases.

// with random(), the concurrency factor for 20 chargeports is between 30% and 40%


