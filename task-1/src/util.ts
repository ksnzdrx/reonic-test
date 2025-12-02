/**
 * converts hourly probabilities to quarter-hourly probabilities with linear interpolation
 * not exactly a (skewed) Gaussian curve, therefore using interpolation.
 *
 * @param hourly - Array of 24 hourly probabilities (0-23)
 * @returns Array of 96 quarter-hourly probabilities (one per 15-minute interval)
 */
export function convertHourlyToQuarterHourly(hourly: number[]): number[] {
  const n = hourly.length; // should be 24
  const quarters: number[] = [];
  const targetTotal = 0.999;

  for (let i = 0; i < n; i++) {
    const p_i = hourly[i];
    const p_next = hourly[(i + 1) % n]; // cyclic wrap-around

    // raw linear interpolation between p_i and p_next
    const u: number[] = [];
    for (let j = 0; j < 4; j++) {
      const alpha = j / 4; // 0, 0.25, 0.5, 0.75
      const u_ij = (1 - alpha) * p_i + alpha * p_next;
      u.push(u_ij);
    }

    // normalize within this hour so sum of 4 quarters = p_i
    const S_i = u.reduce((a, b) => a + b, 0);
    const scale = S_i === 0 ? 0 : p_i / S_i;

    for (let j = 0; j < 4; j++) {
      const q_ij = u[j] * scale;
      quarters.push(q_ij);
    }
  }

  // global normalization so total sum is exactly targetTotal (0.999)
  const total = quarters.reduce((a, b) => a + b, 0);
  const globalScale = total === 0 ? 0 : targetTotal / total;
  for (let k = 0; k < quarters.length; k++) {
    quarters[k] *= globalScale;
  }

  return quarters;
}
