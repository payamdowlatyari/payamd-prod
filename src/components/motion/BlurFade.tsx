"use client";

import type { UseInViewOptions, Variants } from "motion/react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

/**
 * Props for the BlurFade component.
 */
interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
}

/**
 * A component that applies a blur effect to a child element when it is in view.
 * @param {BlurFadeProps} props - The component props.
 */
export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: "none" },
        visible: { opacity: 1, y: 0, filter: "none" },
      }
    : variant || defaultVariants;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={ref}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: reduceMotion ? 0 : 0.04 + delay,
          duration: reduceMotion ? 0 : duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
