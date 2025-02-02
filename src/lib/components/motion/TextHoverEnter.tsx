"use client";

import { motion } from "framer-motion";

import { cn } from "./utils/cn";

const DURATION = 0.25;
const STAGGER = 0.025;

// type TextGlitchProps = React.ComponentProps<"div">;

export function TextHoverEnter({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}) {
  if (typeof title !== "string") {
    return null;
  }

  const letters = title
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  return (
    <motion.a
      className={cn(
        "relative block select-none overflow-hidden whitespace-nowrap text-base font-semibold my-1 md:my-2 mx-2 md:mx-4 text-neutral-800 dark:text-neutral-200",
        className
      )}
      initial="initial"
      whileHover="hovered"
      style={{ lineHeight: 0.9 }}
      href={url}
    >
      <div>
        {letters.map((letter, i) => (
          <motion.span
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {letters.map((letter, i) => (
          <motion.span
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
}
