/* eslint-disable react/no-array-index-key */

"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { ReactElement, useState } from "react";

import { cn } from "./utils/cn";

interface ScrollProgressBarType {
  type?: "circle" | "bar";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  strokeSize?: number;
  showPercentage?: boolean;
}

/**
 * ScrollProgressBar component renders a progress bar that shows the scroll progress.
 *
 * @param {Object} props - The component props.
 * @param {"circle" | "bar"} props.type - The type of the progress bar.
 * @param {"top-right" | "bottom-right" | "top-left" | "bottom-left"} props.position - The position of the progress bar.
 * @param {number} props.strokeSize - The size of the progress bar stroke.
 * @param {boolean} props.showPercentage - Whether to show the percentage of the progress bar.
 */
export default function ScrollProgressBar({
  type = "circle",
  position = "bottom-right",
  strokeSize = 2,
  showPercentage = false,
}: ScrollProgressBarType) {
  const { scrollYProgress } = useScroll();

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <div
        className="fixed start-0 end-0 top-0 pointer-events-none z-20"
        style={{ height: `${strokeSize + 2}px` }}
      >
        <span
          className="bg-transparent text-neutral-400 h-full w-full block"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("fixed flex items-center justify-center z-20", {
        "top-0 end-0": position === "top-right",
        "bottom-0 end-0": position === "bottom-right",
        "top-0 start-0": position === "top-left",
        "bottom-0 start-0": position === "bottom-left",
      })}
    >
      {percentage > 0 && (
        <>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              strokeWidth={strokeSize}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              fill="none"
              strokeDashoffset="0"
              strokeWidth={strokeSize}
              style={{ pathLength: scrollYProgress }}
              className={cn("stroke-neutral-400")}
            />
          </svg>
          {showPercentage && (
            <span className="text-xs absolute ml-1">{percentage}%</span>
          )}
        </>
      )}
    </div>
  );
}

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
} & HTMLMotionProps<"div">;

/**
 * Creates a progressive blur effect that blurs the background as you scroll.
 *
 * The blur effect is created by layering multiple `div`s with a gradient mask
 * and applying a blur filter to each layer. The gradient mask is a linear
 * gradient that transitions from transparent to white and back to transparent,
 * creating a blur effect that is strongest in the middle of the element.
 *
 * @param {Object} props
 * @prop {string} [direction="bottom"] The direction of the blur effect. Can be
 * "top", "right", "bottom", or "left".
 * @prop {number} [blurLayers=8] The number of blur layers to create. A higher
 * number will create a more gradual blur effect.
 * @prop {string} [className] The class name to apply to the container element.
 * @prop {number} [blurIntensity=0.25] The intensity of the blur effect. A higher
 * number will create a stronger blur effect.
 * @returns {ReactElement}
 */
export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps): ReactElement {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", "
        )})`;

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
