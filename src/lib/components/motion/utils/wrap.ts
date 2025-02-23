/**
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @param {number} v The value to wrap
 * @returns {number} The wrapped value
 */
export const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
