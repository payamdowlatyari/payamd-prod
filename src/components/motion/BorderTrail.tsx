"use client";

import { motion, Transition } from "framer-motion";

import { cn } from "~/utils/cn";

/**
 * Props for the BorderTrail component.
 */
type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

/**
 * A component that renders a border that animates to follow the shape of the
 * parent element.
 *
 * @param {{ className?: string; size?: number; transition?: object; delay?: number; onAnimationComplete?: () => void; style?: CSSProperties; }} props
 * @param {string} [props.className] Additional class names to be applied to the
 *   outermost element.
 * @param {number} [props.size=60] The size of the border.
 * @param {object} [props.transition] The transition to apply to the animation.
 *   See the Framer Motion documentation for more information.
 * @param {number} [props.delay] The delay before the animation starts.
 * @param {(() => void) | undefined} [props.onAnimationComplete] A callback
 *   function to be called when the animation is complete.
 * @param {CSSProperties} [props.style] Additional styles to be applied to the
 *   innermost element.
 */
export default function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: "linear",
  };

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square bg-zinc-500", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
