"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "~/utils/cn";

const BLUR_EFFECT = "blur(8px)";
const BLUR_EFFECT_EXIT = "blur(0px)";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

/**
 * ContainerTextFlip is a component that displays a list of words in a flipping
 * animation. It cycles through the words at a specified interval and applies
 * a transition effect to each word as it appears.
 *
 * @param {ContainerTextFlipProps} props - The properties for the component.
 */
export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the width state to match the current word's width plus padding.
   * It calculates the width of the current word by measuring the scrollWidth
   * of the text element and adds a total of 60px padding (30px on each side).
   */
  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.p
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-1 pb-2 text-center text-4xl font-bold text-black md:text-7xl",
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={letter.slice(0, index + 1)}
              initial={{
                opacity: 0,
                filter: BLUR_EFFECT,
              }}
              animate={{
                opacity: 1,
                filter: BLUR_EFFECT_EXIT,
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.p>
  );
}
