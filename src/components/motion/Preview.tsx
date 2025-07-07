"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "~/utils/cn";

/**
 * Props for the Preview component.
 */
interface PreviewProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
}

/**
 * A component that displays a number with a spring animation.
 *
 * @param {PreviewProps} props - The props for the component.
 */
export default function Preview({
  value,
  direction = "up",
  delay = 0,
  className,
}: PreviewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
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
    <motion.div
      initial={{ y: "0" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 1,
        delay: 4,
        ease: "easeInOut",
      }}
      className="fixed flex justify-center top-0 left-0 w-full h-full bg-neutral-950 z-[1002]"
    >
      <span
        className={cn(
          "inline-block tracking-wider text-3xl font-thin leading-none self-center",
          className
        )}
        ref={ref}
      />
    </motion.div>
  );
}
