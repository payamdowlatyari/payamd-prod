/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { useRef, useEffect, useState } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

/**
 * A component that renders a grid of squares that move in a specified direction.
 *
 * @param {{ direction?: "right" | "left" | "up" | "down" | "diagonal"; speed?: number; borderColor?: string; squareSize?: number; hoverFillColor?: string; className?: string; }} props
 * @returns {JSX.Element} A JSX element representing the Squares component
 */
export default function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}: SquaresProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const numSquaresX = useRef<number>();
  const numSquaresY = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas background
    canvas.style.background = "#060606";

    /**
     * Resize the canvas to the window size, and recalculate the number of squares to render.
     * @returns {void}
     */
    const resizeCanvas = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    /**
     * Draw the grid of squares on the canvas.
     * @description
     * This function is called every frame. It clears the canvas, and then draws a
     * grid of squares with a hover effect. The grid is offset by the current scroll
     * position, and the hover effect is positioned based on the mouse position.
     * @returns {void}
     */
    const drawGrid = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      ctx.lineWidth = 0.5;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /**
     * Update the animation by adjusting the grid offset based on the direction.
     * This function is called every frame. It calculates the effective speed by
     * taking the maximum of the speed and 0.1, and then adjusts the grid offset
     * based on the direction. It then calls drawGrid to redraw the canvas with
     * the new offset, and schedules the next frame using requestAnimationFrame.
     * @returns {void}
     */
    const updateAnimation = (): void => {
      const effectiveSpeed = Math.max(speed, 0.1);

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    /**
     * Handles the mouse move event. This function is called when the user moves the
     * mouse over the canvas. It calculates the position of the mouse relative to the
     * canvas, and then calculates the hovered square by taking the floor of the
     * mouse position divided by the square size. It then sets the hoveredSquare state
     * to the calculated position.
     * @param {MouseEvent} event - The mouse move event.
     */
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    /**
     * Handles the mouse leave event. This function is called when the user moves the
     * mouse off the canvas. It sets the hoveredSquare state to null.
     */
    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initial setup
    resizeCanvas();
    requestRef.current = requestAnimationFrame(updateAnimation);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    hoveredSquare,
    squareSize,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  );
}
