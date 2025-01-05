"use client";

import type { Variants } from "framer-motion";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  inViewMargin?: string;
  blur?: string;
}

/**
 * A component that blurs and fades its children as they come into view.
 * By default, it applies a blur of 6px and fades the children in over a duration of 0.4 seconds.
 * The children are translated up by 6px as they fade in.
 * The component watches for the element to come into view and then applies the animation.
 * The animation is triggered when the top of the element comes into view.
 * The animation is cancelled if the element is no longer in view.
 * You can customize the animation by passing in a custom variant object.
 * The variant object should have a 'hidden' and 'visible' key, each with a 'y', 'opacity', and 'filter' key.
 * The 'hidden' key should have a 'y' value that is the negative of the 'y' value of the 'visible' key.
 * The 'filter' key of the 'hidden' key should have a blur value, and the 'filter' key of the 'visible' key should have a blur value of 0px.
 * The 'opacity' key of the 'hidden' key should have a value of 0, and the 'opacity' key of the 'visible' key should have a value of 1.
 * You can also customize the animation by passing in a custom duration, delay, and yOffset.
 * The duration is the length of the animation in seconds.
 * The delay is the time in seconds to wait before starting the animation.
 * The yOffset is the amount to translate the children up as they fade in.
 * You can also customize the animation by passing in a custom inView and inViewMargin.
 * The inView prop is a boolean that determines whether to watch for the element to come into view.
 * The inViewMargin prop is a string that determines the margin around the element to watch for it to come into view.
 * The default value for inViewMargin is "-50px".
 * @param {ReactNode} children The children of the component.
 * @param {string} className The className to apply to the component.
 * @param {Variants} variant The variant object to customize the animation.
 * @param {number} duration The duration of the animation in seconds.
 * @param {number} delay The time in seconds to wait before starting the animation.
 * @param {number} yOffset The amount to translate the children up as they fade in.
 * @param {boolean} inView Whether to watch for the element to come into view.
 * @param {string} inViewMargin The margin around the element to watch for it to come into view.
 * @param {string} blur The blur value to apply to the children as they fade in.
 */
export function BlurFade({
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
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
