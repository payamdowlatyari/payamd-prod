"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ComponentProps, useRef } from "react";

import { cn } from "~/utils/cn";

/**
 * Interface representing the props for the LiquidCursor component.
 */
type LiquidCursorProps = Omit<ComponentProps<"div">, "children"> & {
  size?: number;
  strong?: boolean;
};

/**
 * A component that creates a liquid cursor effect when hovered over.
 *
 * @param {LiquidCursorProps} props - The properties for the LiquidCursor component.
 * @param {number} [props.size=40] - The size of the cursor in pixels.
 * @param {boolean} [props.strong=false] - Whether the cursor should have a strong effect.
 * @param {string} [props.className] - Additional CSS class names for the component.
 */
const LiquidCursor = ({
  size = 40,
  strong = false,
  className,
  ...props
}: LiquidCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);

  useGSAP(() => {
    const clickDrop = () => {
      if (!cursorRef.current) return;

      gsap.to(cursorRef.current, {
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(cursorRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "bounce.out",
          });
        },
      });
    };

    /**
     * Moves the cursor to the specified mouse event coordinates, animating
     * the cursor to stretch and rotate based on the distance and angle between
     * the current and previous positions.
     *
     * @param {MouseEvent} e - The mouse event containing the coordinates to move the cursor to.
     */
    const moveDrop = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      let delta = angle - prevAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const smoothingFactor = 0.2;
      const smoothAngle = prevAngle.current + delta * smoothingFactor;

      const maxStretch = 1.2;
      const stretch = Math.min(distance / 30, maxStretch);

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const total = absDx + absDy || 1;
      const xRatio = absDx / total;

      const scaleX = 1 + xRatio * stretch;
      const scaleY = 1 - xRatio * stretch * 0.3;

      gsap.to(cursorRef.current, {
        duration: 1,
        left: e.clientX - size / 2,
        top: e.clientY - size / 2,
        scaleX,
        scaleY,
        rotate: smoothAngle,
        ease: "power2.out",
      });

      prevAngle.current = smoothAngle;
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("click", clickDrop);

    window.addEventListener("mousemove", moveDrop);
    return () => window.removeEventListener("mousemove", moveDrop);
  }, []);

  const lightStyle = {
    background: `
  radial-gradient(circle, 
    rgba(255, 255, 255, 0.25) 90%,  
    rgba(255, 255, 255, 0.1) 70%, 
    transparent 20%                
  )
`,
    border: "1px solid rgba(255, 255, 255, 0.25)",
  };

  const strongStyle = {
    background: `
    radial-gradient(125.95% 106.37% at 32.61% 3.41%,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.45) 28.13%,
    rgba(252, 252, 252, 0.35) 45.31%,
    rgba(248, 248, 248, 0.3) 66.67%,
    rgba(243, 243, 243, 0.25) 100%)
  `,
    boxShadow: `
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset -4px -8px 12px rgba(255, 255, 255, 0.05),
    inset 3px 3px 8px rgba(240, 240, 240, 0.04),
    inset 5px 10px 14px rgba(255, 255, 255, 0.03)
  `,
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  return (
    <div
      {...props}
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed z-999 rounded-full saturate-[180%] backdrop-blur-[2px]",
        "dark:saturate-[160%] dark:backdrop-brightness-[0.8]",
        className
      )}
      style={{
        height: size,
        width: size,
        ...(strong ? strongStyle : lightStyle),
      }}
    />
  );
};

// eslint-disable-next-line import/prefer-default-export
export { LiquidCursor };
