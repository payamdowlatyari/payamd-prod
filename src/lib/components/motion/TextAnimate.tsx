"use client";

import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { FC, useEffect, useRef } from "react";

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "popIn"
  | "shiftInUp"
  | "rollIn"
  | "whipIn"
  | "whipInUp"
  | "calmInUp";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
}

const animationVariants = {
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.3 },
      }),
    },
    child: {
      visible: {
        opacity: 1,
        y: [0, -10, 0],
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: { opacity: 0, y: 10 },
    },
  },
  fadeInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    child: {
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      hidden: { opacity: 0, y: 20 },
    },
  },
  popIn: {
    container: {
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
      },
    },
    child: {
      visible: {
        opacity: 1,
        scale: 1.1,
        transition: { type: "spring", damping: 15, stiffness: 400 },
      },
      hidden: { opacity: 0, scale: 0 },
    },
  },
  calmInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.125, 0.92, 0.69, 0.975], //  Drawing attention to dynamic content or interactive elements, where the animation needs to be engaging but not abrupt
          duration: 0.75,
          //   ease: [0.455, 0.03, 0.515, 0.955], // smooth and gradual acceleration followed by a steady deceleration towards the end of the animation
          //   ease: [0.115, 0.955, 0.655, 0.939], // smooth and gradual acceleration followed by a steady deceleration towards the end of the animation
          //   ease: [0.09, 0.88, 0.68, 0.98], // Very Gentle Onset, Swift Mid-Section, Soft Landing
          //   ease: [0.11, 0.97, 0.64, 0.945], // Minimal Start, Energetic Acceleration, Smooth Closure
        },
      },
    },
  },
  shiftInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "100%", // Starting from below but not too far to ensure a dramatic but manageable shift.
        transition: {
          ease: [0.75, 0, 0.25, 1], // Starting quickly
          duration: 0.6, // Shortened duration for a more dramatic start
        },
      },
      visible: {
        y: 0,
        transition: {
          duration: 0.8, // Slightly longer to accommodate the slow middle and swift end
          ease: [0.22, 1, 0.36, 1], // This easing function starts quickly (dramatic shift), slows down (slow middle), and ends quickly (clean swift end)
        },
      },
    },
  },

  whipInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: "200%",
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05],
          duration: 0.75,
        },
      },
    },
  },
  rollIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.65,
          ease: [0.65, 0, 0.75, 1], // Great! Swift Beginning, Prolonged Ease, Quick Finish
          //   ease: [0.75, 0.05, 0.85, 1], // Quick Start, Smooth Middle, Sharp End
          //   ease: [0.7, -0.25, 0.9, 1.25], // Fast Acceleration, Gentle Slowdown, Sudden Snap
          //   ease: [0.7, -0.5, 0.85, 1.5], // Quick Leap, Soft Glide, Snappy Closure
        },
      },
    },
  },
  whipIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,
          //   ease: [0.75, 0.05, 0.85, 1], // Quick Start, Smooth Middle, Sharp End
          //   ease: [0.7, -0.25, 0.9, 1.25], // Fast Acceleration, Gentle Slowdown, Sudden Snap
          //   ease: [0.65, 0, 0.75, 1], // Great! Swift Beginning, Prolonged Ease, Quick Finish
          ease: [0.85, 0.1, 0.9, 1.2], // Rapid Initiation, Subtle Slow, Sharp Conclusion
        },
      },
    },
  },
};

/**
 * A component that animates text using various motion effects.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be animated.
 * @param {AnimationType} [props.type='whipInUp'] - The animation type to be applied to the text.
 * @param {number} [props.delay] - Optional delay before the animation starts.
 * @param {number} [props.duration] - Optional duration for the animation.
 * @returns {JSX.Element} A JSX element with animated text.
 */

export const TextAnimate: FC<Props> = ({
  text,
  type = "whipInUp",
  ...props
}: Props): JSX.Element => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const letters = Array.from(text);
  const { container, child } = animationVariants[type];

  const ctrls = useAnimation();

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    }
    if (!isInView) {
      ctrls.start("hidden");
    }
  }, [ctrls, isInView]);

  if (type === "rollIn" || type === "whipIn") {
    return (
      <h2 className="mt-10 text-3xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl">
        {text.split(" ").map((word, index) => {
          return (
            <motion.span
              ref={ref}
              className="inline-block mr-[0.25em] whitespace-nowrap"
              aria-hidden="true"
              initial="hidden"
              animate="visible"
              variants={container}
              transition={{
                delayChildren: index * 0.13,
                staggerChildren: 0.025,
              }}
            >
              {word.split("").map((character) => {
                return (
                  <motion.span
                    aria-hidden="true"
                    key={character}
                    variants={child}
                    className="inline-block -mr-[0.01em]"
                  >
                    {character}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
      </h2>
    );
  }

  return (
    <motion.span
      style={{ display: "flex", overflow: "hidden" }}
      role="heading"
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-10 text-neutral-100 py-5 pb-8 px-8 "
      {...props}
    >
      {letters.map((letter) => (
        <motion.span variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
