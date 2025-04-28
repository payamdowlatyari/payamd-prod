"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

const BLUR_EFFECT = "blur(8px)";
const BLUR_EFFECT_EXIT = "blur(0px)";

/**
 * FlipWords is a component that takes a list of words and displays them in a
 * sequential, animated manner. It cycles through the words and displays them
 * in a given duration.
 * @param words - The list of words to display.
 * @param duration - The duration to display each word.
 * @param className - The class name of the component.
 * @returns A JSX element representing the FlipWords component.
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
          filter: BLUR_EFFECT,
          scale: 2,
          position: "absolute",
        }}
        className={cn("z-10 inline-block relative text-left px-1", className)}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 10, filter: BLUR_EFFECT }}
            animate={{ opacity: 1, y: 0, filter: BLUR_EFFECT_EXIT }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10, filter: BLUR_EFFECT }}
                animate={{ opacity: 1, y: 0, filter: BLUR_EFFECT_EXIT }}
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

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

/**
 * GooeyText is a component that takes a list of texts and displays them in a
 * continuous, animated manner. It morphs between the texts using a blur and
 * opacity effect. The component can be customized with a morph time and cooldown
 * time, which determines the duration of the morph and the time between morphs.
 * @param {string[]} texts - The list of texts to display.
 * @returns {JSX.Element} The GooeyText component.
 */
export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps): JSX.Element {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    /**
     * Adjusts the visual morph effect between two text elements based on the given fraction.
     * The function calculates and applies a blur and opacity filter to both text elements
     * to create a morphing animation effect. The fraction determines the interpolation
     * between the two elements, with 0 representing the start and 1 the end of the morph.
     *
     * @param {number} fraction - A value between 0 and 1 representing the progression
     * of the morphing effect. A value of 0 means the start of the morph, while 1 indicates
     * the completion of the morph.
     */
    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${fraction ** 0.4 * 100}%`;

        // eslint-disable-next-line no-param-reassign
        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${fraction ** 0.4 * 100}%`;
      }
    };

    /**
     * Resets the morphing effect by setting the `morph` variable to 0 and
     * restoring the initial style properties of the text elements. This
     * includes setting the filter to an empty string and adjusting the
     * opacity to fully show the second text element while hiding the first one.
     */
    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    /**
     * Updates the morphing effect by subtracting the cooldown time from the morph time,
     * resetting the cooldown time to 0, and calculating the new fraction of the morph
     * time that has passed. If the fraction is greater than 1 (i.e., the morph time has
     * expired), sets the cooldown time to the cooldown time and sets the fraction to 1.
     * Finally, calls `setMorph` with the new fraction.
     */
    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    /**
     * Continuously animates the text morphing effect by using `requestAnimationFrame`.
     * It updates the timing, checks if the cooldown period is over, and determines whether
     * to increment the text index. If the cooldown is over, it updates the text content
     * of the referenced elements to display the next set of texts and performs the morphing
     * effect. Otherwise, it maintains the cooldown state.
     */
    function animate() {
      requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      // Cleanup function if needed
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
