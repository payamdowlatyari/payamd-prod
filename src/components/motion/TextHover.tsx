"use client";

import { motion } from "framer-motion";

import { cn } from "~/utils/cn";

const DURATION = 0.25;
const STAGGER = 0.025;

/**
 * Props for the AnimatedText component.
 */
interface AnimatedTextProps {
  text: string;
  url: string;
  className?: string;
}

/**
 * TextHoverEnter component
 * @param {string} title - The title of the component.
 */
export function TextHoverEnter({ text, url, className }: AnimatedTextProps) {
  if (typeof text !== "string") {
    return null;
  }

  const letters = text
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  return (
    <motion.a
      className={cn(
        "relative block cursor-pointer select-none overflow-hidden whitespace-nowrap text-base font-semibold my-1 md:my-2 mx-2 md:mx-4 text-neutral-200",
        className
      )}
      initial="initial"
      whileHover="hovered"
      href={url}
    >
      <div>
        {letters.map((letter, i) => (
          <motion.span
            key={letter}
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
            key={letter}
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

/**
 * A component that renders a hover animation on the given text.
 * @param {string} text - The text to render.
 */
export function TextHover({ text, url, className }: AnimatedTextProps) {
  if (typeof text !== "string") {
    return null;
  }

  const letters = text
    .split("")
    .map((letter) => (letter === " " ? "\u00A0" : letter));

  return (
    <motion.a
      href={url}
      className={cn(
        "inline-block cursor-pointer text-base font-semibold transition-all tracking-widest m-1 md:m-2",
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {letters.map((char, index) => (
        <motion.span
          key={char}
          className="inline-block"
          variants={{
            initial: {
              y: 0,
              scale: 1,
            },
            hover: {
              y: -4,
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.03,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.a>
  );
}
