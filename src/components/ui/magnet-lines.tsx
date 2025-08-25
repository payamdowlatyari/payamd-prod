/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */

"use client";

import { useRef, useEffect } from "react";

/**
 * Props for the MagnetLines component.
 */
interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that renders a grid of lines that react to the mouse or touch.
 *
 * The lines are placed in a grid, and the size of the grid is determined by the
 * `rows` and `columns` props. The container size is determined by the
 * `containerSize` prop. The color, width, and height of the lines are determined
 * by the `lineColor`, `lineWidth`, and `lineHeight` props. The base angle of the
 * lines is determined by the `baseAngle` prop.
 *
 * The lines are placed in the middle of the container, and are rotated based on
 * the position of the mouse or touch. The rotation is calculated based on the
 * distance from the middle of the container to the mouse or touch position.
 *
 * @param {MagnetLinesProps} props - The component props.
 */
function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}: MagnetLinesProps) {
  const containerRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const container: HTMLElement | null = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");

    /**
     * Handler for pointer move events.
     *
     * When the pointer moves, this function iterates over all the lines and
     * calculates the angle between the line and the pointer. The angle is then
     * used to set the CSS variable --rotate on the line, which is used to rotate
     * the line.
     *
     * @param {Object} pointer - An object with x and y properties, representing
     * the pointer position.
     */
    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(
        (item: {
          getBoundingClientRect: () => any;
          style: { setProperty: (arg0: string, arg1: string) => void };
        }) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.x + rect.width / 2;
          const centerY = rect.y + rect.height / 2;

          const b = pointer.x - centerX;
          const a = pointer.y - centerY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r =
            ((Math.acos(b / c) * 180) / Math.PI) *
            (pointer.y > centerY ? 1 : -1);

          item.style.setProperty("--rotate", `${r}deg`);
        }
      );
    };

    window.addEventListener("pointermove", onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={
        {
          backgroundColor: lineColor,
          width: lineWidth,
          height: lineHeight,
          transform: "rotate(var(--rotate))",
          willChange: "transform",
          "--rotate": `${baseAngle}deg`,
        } as any
      }
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}

export { MagnetLines };
