/**
 * Interface for random number generation
 * Allows for both seeded and non-seeded implementations
 */
export interface RandomGenerator {
  next(): number;
}

/**
 * Default random number generator using Math.random()
 * Produces non-deterministic results
 */
export class DefaultRandomGenerator implements RandomGenerator {
  next(): number {
    return Math.random();
  }
}

/**
 * Seeded random number generator using Linear Congruential Generator (LCG)
 * This ensures deterministic results for reproducibility
 */
export class SeededRandom implements RandomGenerator {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Generate next random number between 0 and 1
  next(): number {
    // LCG parameters (same as used in glibc)
    const a: number = 1103515245;
    const c: number = 12345;
    const m: number = 2 ** 31;

    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }
}
