"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import type { FC, ReactNode } from "react";
import { useRef } from "react";

import { cn } from "~/utils/cn";

/**
 * Props for the Word component.
 */
interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

/**
 * A component that animates a word based on the scroll progress.
 *
 * @param {WordProps} props - The component props.
 */
const Word: FC<WordProps> = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block">
      <span className="absolute opacity-0">{children}</span>
      <motion.span style={{ opacity }} className="text-foreground">
        {children}
      </motion.span>
    </span>
  );
};

/**
 * Props for the TextRevealByWord component.
 */
interface TextRevealByWordProps {
  text: string;
  className?: string;
  revealSpanWords?: number;
  revealCompleteAt?: number;
}

/**
 * A component that reveals text word by word as the user scrolls.
 * @param {TextRevealByWordProps} props - The component properties.
 */
const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  revealSpanWords = 6,
  revealCompleteAt = 0.8,
}: TextRevealByWordProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const completeAt = Math.min(Math.max(revealCompleteAt, 0.1), 1);
  const revealProgress = useTransform(scrollYProgress, [0, completeAt], [0, 1]);
  const words = text.split(" ");
  const wordsCount = Math.max(words.length, 1);
  const revealWindow = Math.min(revealSpanWords / wordsCount, 1);
  const maxStart = 1 - revealWindow;

  // Build a stable key for each word using its character offset in the original text.
  const wordsWithOffsets = (() => {
    const result: { word: string; start: number }[] = [];
    let offset = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const w of words) {
      const found = text.indexOf(w, offset);
      const start = found === -1 ? offset : found;
      result.push({ word: w, start });
      offset = start + w.length;
    }
    return result;
  })();

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[400vh]", className)}>
      <div className="section-shell sticky top-0 flex min-h-svh items-center justify-center bg-transparent py-24">
        <p className="flex w-full max-w-[64ch] flex-wrap justify-center gap-x-[0.25em] font-display text-[clamp(1.125rem,2.1vw,1.875rem)] font-medium leading-[1.45] tracking-[-0.025em] text-center text-foreground">
          {wordsWithOffsets.map(({ word, start }, i) => {
            const startProgress =
              wordsCount <= 1 ? 0 : (i / (wordsCount - 1)) * maxStart;
            const end = startProgress + revealWindow;
            return (
              <Word
                progress={revealProgress}
                range={[startProgress, end]}
                key={`${word}-${start}`}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default TextRevealByWord;
