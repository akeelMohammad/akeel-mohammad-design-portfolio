import test from 'node:test';
import assert from 'node:assert/strict';
import {
  positiveMod,
  computeWrappedPosition,
  formatHudCoord,
  formatHudSpeed,
  scrambleTextAtProgress,
  formatBrusselsClock,
  formatSriLankaClock,
  formatScrollPercent,
  PERIOD_X,
  PERIOD_Y,
} from './gridMath';

test('positiveMod wraps positive and negative values within period', () => {
  assert.equal(positiveMod(100, 4480), 100);
  assert.equal(positiveMod(4580, 4480), 100);
  assert.equal(positiveMod(-100, 4480), 4380);
});

test('computeWrappedPosition keeps tiles seamlessly within [-buffer, period - buffer)', () => {
  const pos1 = computeWrappedPosition(74, 49, 0, 0, PERIOD_X, PERIOD_Y, 420);
  assert.equal(pos1.x, 74);
  assert.equal(pos1.y, 49);

  // When camera pans far left (-500), tile at x=74 wraps around PERIOD_X (4480)
  const pos2 = computeWrappedPosition(74, 49, -500, 0, PERIOD_X, PERIOD_Y, 420);
  assert.equal(pos2.x, 4054);
});

test('formatHudCoord matches Studio Loum +0000.00 and −0001.98 format', () => {
  assert.equal(formatHudCoord(0), '+0000.00');
  assert.equal(formatHudCoord(32.02), '+0032.02');
  assert.equal(formatHudCoord(-1.98), '−0001.98');
  assert.equal(formatHudCoord(1420.5), '+1420.50');
});

test('formatHudSpeed formats Euclidean frame velocity to 00.0 padded string', () => {
  assert.equal(formatHudSpeed(0, 0), '00.0');
  assert.equal(formatHudSpeed(3, 4), '05.0');
  assert.equal(formatHudSpeed(10, 10), '14.1');
});

test('scrambleTextAtProgress reveals full string at progress=1 and preserves spaces', () => {
  const target = 'DESIGNING VISUALS';
  assert.equal(scrambleTextAtProgress(target, 1), target);
  const mid = scrambleTextAtProgress(target, 0.5, 3);
  assert.equal(mid.length, target.length);
  assert.equal(mid.slice(0, 8), 'DESIGNIN');
  assert.equal(mid[9], ' ');
});

test('formatScrollPercent outputs 3-digit padded percentage from 000 to 100', () => {
  assert.equal(formatScrollPercent(0), '000');
  assert.equal(formatScrollPercent(0.07), '007');
  assert.equal(formatScrollPercent(0.642), '064');
  assert.equal(formatScrollPercent(1), '100');
});

test('formatSriLankaClock formats 24h time as HH:MM', () => {
  const sample = new Date('2026-11-22T12:02:00Z');
  const formatted = formatSriLankaClock(sample);
  assert.match(formatted, /^\d{2}:\d{2}$/);
  assert.equal(formatted, '17:32');
});

test('formatBrusselsClock prefixes Brussels 24h time with BE', () => {
  const sample = new Date('2026-11-22T12:02:00Z');
  const formatted = formatBrusselsClock(sample);
  assert.match(formatted, /^BE \d{2}:\d{2}$/);
  assert.equal(formatted, 'BE 13:02');
});
