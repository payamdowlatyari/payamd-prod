/**
 * Calculate the position of an element within a container.
 *
 * @param value - The position value. Can be a number representing pixels, a string representing a percentage, or undefined.
 * @param containerSize - The size of the container.
 * @param elementSize - The size of the element.
 * @returns The calculated position of the element.
 */
export function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
): number {
  // Handle percentage strings (e.g. "50%")
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }

  // Handle direct pixel values
  if (typeof value === "number") {
    return value;
  }

  // If no value provided, center the element
  return (containerSize - elementSize) / 2;
}
