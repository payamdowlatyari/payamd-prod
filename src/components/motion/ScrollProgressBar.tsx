"use client";

import { motion, useScroll, HTMLMotionProps, useSpring } from "framer-motion";
import { ReactElement } from "react";

import { cn } from "~/utils/cn";

/**
 * ScrollProgressBar component renders a progress bar that shows the scroll progress.
 * It uses Framer Motion's `useScroll` hook to track the scroll position
 * and animates the width of the bar based on the scroll progress.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 bottom-0 right-0 origin-[0] z-20 h-2 bg-neutral-200"
    />
  );
}

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

/**
 * ProgressiveBlurProps interface defines the props for the ProgressiveBlur component.
 */
type ProgressiveBlurProps = {
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
 * @param {ProgressiveBlurProps} props - The component props.
 * @returns {ReactElement} The rendered ProgressiveBlur component.
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
            // eslint-disable-next-line react/no-array-index-key
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
