/* eslint-disable react/no-array-index-key */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useCallback, useEffect, useState } from "react";

import { cn } from "./utils/cn";

/**
 * FlipWords is a component that takes a list of words and displays them in a
 * sequential, animated manner. It cycles through the words and displays them
 * in a given duration.
 *
 * It uses Framer Motion to animate the words, and uses the AnimatePresence
 * component to manage the animation state.
 *
 * Each word is split into individual letters, and each letter is animated
 * independently. The words are displayed in a vertical list, with each word
 * being displayed on top of the previous one.
 *
 * The component can be styled with the className prop, and the animation
 * duration can be set with the duration prop.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.words - The list of words to display.
 * @param {number} props.duration - The duration of the animation in milliseconds.
 * @param {string} props.className - The class name to apply to the component.
 * @returns {ReactElement} The FlipWords component.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}): ReactElement => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn("z-10 inline-block relative text-left px-1", className)}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
