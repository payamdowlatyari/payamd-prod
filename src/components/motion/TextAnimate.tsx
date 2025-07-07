"use client";

import {
  DynamicAnimationOptions,
  HTMLMotionProps,
  motion,
  stagger,
  useAnimate,
  useAnimation,
  useInView,
} from "framer-motion";
import { debounce } from "lodash";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

/**
 * Animation types for the TextAnimate component.
 */
type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "popIn"
  | "shiftInUp"
  | "rollIn"
  | "whipIn"
  | "whipInUp"
  | "calmInUp";

/**
 * Props for the TextAnimate component.
 */
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
      /**
       * Animation variant for visible state.
       */
      visible: (
        i: number = 1
      ): {
        opacity: number;
        transition: { staggerChildren: number; delayChildren: number };
      } => ({
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
      /**
       * Returns an object containing transition settings for a motion component.
       */
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
      /**
       * Returns an object containing transition settings for a motion component.
       */
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
      /**
       * Returns an object containing transition settings for a motion component.
       */
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
 * @param {Props} props - The component props.
 */
export const TextAnimate: FC<Props> = ({
  text,
  type = "whipInUp",
  ...props
}: Props) => {
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

/**
 * Props for the text animation component.
 */
interface TextProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: DynamicAnimationOptions;
  link?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
}

/**
 * A component that renders a hover animation on a given text using a variable font's font variation settings.
 *
 * @param {TextProps} props - The component props.
 */
export function VariableFontHoverByLetter({
  label,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = {
    type: "spring",
    duration: 0.7,
  },
  link,
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Merges a base transition with additional delay settings based on stagger configuration.
   *
   * @param {DynamicAnimationOptions} baseTransition - The base transition options.
   * @returns {DynamicAnimationOptions} The merged transition options including stagger delay.
   */
  const mergeTransition = (
    baseTransition: DynamicAnimationOptions
  ): DynamicAnimationOptions => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);

      animate(
        ".letter",
        { fontVariationSettings: toFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);

      animate(
        ".letter",
        { fontVariationSettings: fromFontVariationSettings },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  return (
    <motion.span
      className={`${className}`}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      {link ? (
        <Link href={link} aria-hidden="true">
          {label.split("").map((letter: string, i: number) => {
            return (
              <motion.span
                key={i as number}
                className="inline-block whitespace-pre letter"
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
        </Link>
      ) : (
        <span className="inline-block whitespace-pre letter" aria-hidden="true">
          {label.split("").map((letter: string, i: number) => {
            return (
              <motion.span key={i as number} aria-hidden="true">
                {letter}
              </motion.span>
            );
          })}
        </span>
      )}
    </motion.span>
  );
}

/**
 * Props for the TextCircle component.
 */
interface TextCircleProps {
  text: string;
  duration?: number;
  className?: string;
}

/**
 * TextCircle renders a rotating circle of text, useful for displaying
 * rotating logos or branding.
 *
 * @param {TextCircleProps} props - The component props.
 */
export const TextCircle = ({
  text,
  duration = 20,
  className,
}: TextCircleProps) => {
  const letters = Array.from(text);

  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration,
        ease: "linear",
      }}
      className={cn(
        "relative rounded-full w-[200px] h-[200px] text-zinc-900 dark:text-zinc-50 font-semibold text-center text-2xl",
        className
      )}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i;

        const factor = Number((Math.PI / letters.length).toFixed(0));
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${angle}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span key={letter} className="absolute inset-0" style={{ transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

/**
 * Props for the TextReveal component.
 */
interface TextRevealProps {
  children: string;
  className?: string;
  blur?: number;
  delay?: number;
  duration?: number;
  from?: "top" | "bottom";
  split?: "word" | "letter";
}

/**
 * A component that reveals a line of text, character by character.
 *
 * @param {TextRevealProps} props - The component properties.
 */
export const TextReveal = ({
  children,
  className,
  blur = 10,
  delay = 0.1,
  duration = 1,
  from = "bottom",
  split = "word",
}: TextRevealProps) => {
  const segments =
    split === "word" ? children.split(" ") : children.split(/(?=.)/);

  return (
    <div>
      {segments.map((c, index) => (
        <motion.span
          key={`${c}`}
          initial={{
            opacity: 0,
            y: from === "bottom" ? "50%" : "-50%",
            filter: `blur(${blur}px)`,
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: index * delay,
            duration,
            ease: [0.18, 0.89, 0.82, 1.04],
          }}
          className={cn(
            "inline-flex leading-none",
            split === "word" ? "mr-[0.2em]" : "",
            className
          )}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
      <div className="sr-only">{children}</div>
    </div>
  );
};

/**
 * Props for the TextRipple component.
 */
interface TextRippleProps {
  children: string;
  className?: string;
  maxScale?: number;
  falloff?: number;
}

/**
 * TextRipple renders a string with a ripple effect on hover.
 *
 * @param {TextRippleProps} props - The text to be rendered with the ripple effect.
 * The falloff factor determines how quickly the ripple effect fades out as
 * you move away from the hovered character.
 */
export const TextRipple = ({
  children,
  className,
  maxScale = 2,
  falloff = 0.3,
}: TextRippleProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chars = children.split("");

  const getScaleY = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1, maxScale - distance * falloff);
  };

  return (
    <div className={cn("relative font-bold", className)}>
      {chars.map((s, index) => (
        <motion.span
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block origin-bottom leading-[0.7]"
          animate={{ scaleY: getScaleY(index) }}
          key={`${s}`}
        >
          {s === " " ? "\u00A0" : s}
        </motion.span>
      ))}
    </div>
  );
};
