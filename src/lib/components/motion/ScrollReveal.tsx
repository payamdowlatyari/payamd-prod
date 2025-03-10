"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { FC, ReactNode } from "react";
import { useRef } from "react";

import { cn } from "./utils/cn";

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

/**
 * A single word component that has a scrolling reveal effect.
 *
 * @param {ReactNode} children - The word to render.
 * @param {number} progress - The progress of the scroll (0-1).
 * @param {number[]} range - The range of the scroll (start, end).
 *
 * @returns {React.ReactElement} The word component.
 */
const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-[2px] lg:mx-1">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }} className="text-neutral-100">
        {children}
      </motion.span>
    </span>
  );
};

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

/**
 * A component that reveals text word by word as the user scrolls.
 *
 * @param {string} text - The text to be revealed.
 * @param {string} [className] - Additional CSS classes to apply to the component.
 * @returns {JSX.Element} The TextRevealByWord component.
 */
export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[400vh]", className)}>
      <div className="sticky top-60 md:top-20 mx-auto flex h-1/6 max-w-screen-xl items-center bg-transparent px-2 py-10">
        <p
          ref={targetRef}
          className="flex flex-wrap p-3 md:p-5 text-lg sm:text-xl lg:text-2xl lg:p-10 xl:text-3xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};
