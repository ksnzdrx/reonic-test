/**
 * Generates an array of unique bright colors in hex format with maximum distribution
 * @param count - Number of colors to generate
 * @param seed - Optional seed for reproducible colors
 * @returns Array of hex color strings
 */

// mostly vibecoded as not crucial to the task, but wanted to have bright and distinct colors for better visualization

export function generateBrightColors(count: number, seed?: number): string[] {
  const colors: string[] = [];

  // Use seed for reproducible colors if provided
  let currentSeed = seed ?? Math.random() * 1000000;

  // Simple seeded random number generator
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  const random = seed !== undefined ? seededRandom : Math.random;

  // Use golden ratio for maximum hue distribution
  const goldenRatioConjugate = 0.618033988749895;
  let hueOffset = random() * 360; // Random starting point

  for (let i = 0; i < count; i++) {
    // Distribute hues evenly using golden ratio for maximum visual distinction
    const hue = (hueOffset + (i * goldenRatioConjugate * 360)) % 360;

    // Vary saturation and lightness slightly for more variety
    const saturation = 75 + (random() * 25); // 75-100% saturation
    const lightness = 50 + (random() * 15); // 50-65% lightness

    const color = hslToHex(hue, saturation, lightness);
    colors.push(color);
  }

  return colors;
}

/**
 * Converts HSL color values to hex format
 */
function hslToHex(h: number, s: number, l: number): string {
  const hNormalized = h / 360;
  const sNormalized = s / 100;
  const lNormalized = l / 100;

  let r: number, g: number, b: number;

  if (sNormalized === 0) {
    r = g = b = lNormalized;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lNormalized < 0.5
      ? lNormalized * (1 + sNormalized)
      : lNormalized + sNormalized - lNormalized * sNormalized;
    const p = 2 * lNormalized - q;

    r = hue2rgb(p, q, hNormalized + 1 / 3);
    g = hue2rgb(p, q, hNormalized);
    b = hue2rgb(p, q, hNormalized - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}