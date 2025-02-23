"use client";

import { motion } from "framer-motion";

import { cn } from "./utils/cn";

const DURATION = 0.25;
const STAGGER = 0.025;

/**
 * TextHoverEnter component
 * @param {string} title - The title of the component.
 * @param {string} url - The URL of the component.
 * @param {string} className - The class name of the component.
 * @returns {JSX.Element}
 */
export function TextHoverEnter({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}): JSX.Element | null {
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

/**
 * Props for the AnimatedText component.
 */
interface AnimatedTextProps {
  text?: string;
  className?: string;
}

/**
 * A component that renders a hover animation on the given text.
 * @param {string} text - The text to render.
 * @param {string} className - The class name of the component.
 * @returns {JSX.Element} A JSX element representing the animated text.
 */
export function TextHover({
  text = "Hover me",
  className = "",
}: AnimatedTextProps): JSX.Element {
  return (
    <motion.span
      className={cn(
        "w-full text-center inline-block cursor-pointer text-3xl transition-all",
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
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
    </motion.span>
  );
}
