import { SeededRandom } from './src/random';

const random = new SeededRandom(153);

// Test: how many values < 0.01 in first 1000 calls?
let count = 0;
const testCount = 10000;

for (let i = 0; i < testCount; i++) {
  const val = random.next();
  if (val < 0.01) {
    count++;
  }
}

console.log(`Out of ${testCount} random numbers, ${count} were < 0.01`);
console.log(`Expected: ~${testCount * 0.01}`);
console.log(`Ratio: ${count / testCount}`);
