"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import type { FC, ReactNode } from "react";
import { useRef } from "react";

import { cn } from "~/utils/cn";

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

/**
 * A component that animates a word based on the scroll progress.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be animated.
 * @param {MotionValue<number>} props.progress - The scroll progress value.
 * @param {[number, number]} props.range - The range of opacity values for the word.
 */
const Word: FC<WordProps> = ({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-[2px] lg:mx-1">
      <span className="absolute opacity-0">{children}</span>
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
 * @param {string} text - The text to be revealed.
 */
const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}: TextRevealByWordProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[400vh]", className)}>
      <div className="sticky top-40 mx-auto flex h-1/6 max-w-screen-xl items-center bg-transparent px-2 py-20">
        <p
          ref={targetRef}
          className="flex flex-wrap p-3 md:p-5 text-base sm:text-xl lg:text-2xl lg:p-10 xl:text-3xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word progress={scrollYProgress} range={[start, end]} key={word}>
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
