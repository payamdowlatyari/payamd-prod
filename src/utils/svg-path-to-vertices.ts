import SVGPathCommander from "svg-path-commander";

/**
 * Parses an SVG path into an array of vertices.
 *
 * @param {string} path - The SVG path string.
 * @param {number} [sampleLength=15] - The length of each sample point along the path.
 * @return {Array<{ x: number; y: number }>} An array of vertices representing the path.
 */
export function parsePathToVertices(
  path: string,
  sampleLength: number = 15
): Array<{ x: number; y: number }> {
  // Convert path to absolute commands
  const commander = new SVGPathCommander(path);

  const points: { x: number; y: number }[] = [];
  let lastPoint: { x: number; y: number } | null = null;

  // Get total length of the path
  const totalLength = commander.getTotalLength();
  let length = 0;

  // Sample points along the path
  while (length < totalLength) {
    const point = commander.getPointAtLength(length);

    // Only add point if it's different from the last one
    if (!lastPoint || point.x !== lastPoint.x || point.y !== lastPoint.y) {
      points.push({ x: point.x, y: point.y });
      lastPoint = point;
    }

    length += sampleLength;
  }

  // Ensure we get the last point
  const finalPoint = commander.getPointAtLength(totalLength);
  if (
    lastPoint &&
    (finalPoint.x !== lastPoint.x || finalPoint.y !== lastPoint.y)
  ) {
    points.push({ x: finalPoint.x, y: finalPoint.y });
  }

  return points;
}
