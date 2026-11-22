export const SCRAMBLE_CHARS = 'AKEEL0123456789/—_';
export const CHUNK_W = 2240;
export const CHUNK_H = 3080;
export const PERIOD_X = 4480;
export const PERIOD_Y = 6160;
export const CELL_SIZE = 280;
export const WRAP_BUFFER = 420;
export const LERP_FACTOR = 0.085;
export const PARALLAX_STRENGTH = 70;
export const MOBILE_SCALE = 0.66;

/**
 * Positive mathematical modulo for seamless 2D toroidal grid wrapping.
 */
export function positiveMod(value: number, period: number): number {
  if (period <= 0) return value;
  return ((value % period) + period) % period;
}

/**
 * Computes the wrapped screen position (tx, ty) for a tile in the infinite 2D canvas.
 */
export function computeWrappedPosition(
  tileX: number,
  tileY: number,
  offsetX: number,
  offsetY: number,
  periodX: number = PERIOD_X,
  periodY: number = PERIOD_Y,
  buffer: number = WRAP_BUFFER
): { x: number; y: number } {
  const x = positiveMod(tileX + offsetX + buffer, periodX) - buffer;
  const y = positiveMod(tileY + offsetY + buffer, periodY) - buffer;
  return { x, y };
}

/**
 * Formats camera offset coordinate into Studio Loum HUD format:
 * e.g. "+0000.00" or "−0001.98" (using true Unicode minus sign U+2212).
 */
export function formatHudCoord(value: number): string {
  const rounded = Math.abs(value) < 0.005 ? 0 : value;
  const sign = rounded < 0 ? '−' : '+';
  const formatted = Math.abs(rounded).toFixed(2).padStart(7, '0');
  return `${sign}${formatted}`;
}

/**
 * Formats frame-to-frame camera movement delta into Studio Loum speed indicator:
 * e.g. "00.0" or "14.2"
 */
export function formatHudSpeed(dx: number, dy: number): string {
  const dist = Math.round(Math.hypot(dx, dy) * 10) / 10;
  return dist.toFixed(1).padStart(4, '0');
}

/**
 * Deterministic scramble text generator matching the portfolio ScrambleTextPlugin
 * charset ("AKEEL0123456789/—_").
 * @param target The final target string
 * @param progress 0 to 1 progress
 * @param seed Optional deterministic seed offset
 */
export function scrambleTextAtProgress(
  target: string,
  progress: number,
  seed: number = 0,
  charset: string = SCRAMBLE_CHARS
): string {
  if (progress >= 1) return target;
  if (progress <= 0) {
    return target
      .split('')
      .map((ch, i) => (ch === ' ' ? ' ' : charset[(i * 7 + seed) % charset.length]))
      .join('');
  }

  const revealCount = Math.floor(target.length * progress);
  return target
    .split('')
    .map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < revealCount) return ch;
      const idx = Math.abs(Math.floor(progress * 37) + i * 13 + seed) % charset.length;
      return charset[idx];
    })
    .join('');
}

/**
 * Formats a Date into 24-hour time "HH:MM".
 */
export function formatSriLankaClock(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Colombo',
  });
  return formatter.format(date);
}

/**
 * Formats a Date into Brussels local time "BE HH:MM".
 */
export function formatBrusselsClock(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Brussels',
  });
  return `BE ${formatter.format(date)}`;
}

/**
 * Formats a 0..1 scroll progress into a 3-digit padded percentage string "000".."100".
 */
export function formatScrollPercent(progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  return String(Math.round(clamped * 100)).padStart(3, '0');
}
