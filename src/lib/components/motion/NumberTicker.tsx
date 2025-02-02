/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "./utils/cn";

/**
 * A component that displays a number with a spring animation.
 *
 * @param {Object} props
 * @prop {number} value - The number to display.
 * @prop {string} [direction="up"] - The direction of the animation. "up" means the number will animate from 0 to the given `value`, while "down" means it will animate from the given `value` to 0.
 * @prop {number} [delay=0] - The delay before the animation starts, in seconds.
 * @prop {string} [className] - Additional class name to add to the element.
 * @returns {JSX.Element}
 */
export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          );
        }
      }),
    [springValue]
  );

  return (
    <span
      className={cn(
        "inline-block tracking-wider text-3xl font-bold leading-none",
        className
      )}
      ref={ref}
    />
  );
}
