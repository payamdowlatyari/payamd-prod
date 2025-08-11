/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prop-types */

"use client";

import {
  DynamicAnimationOptions,
  HTMLMotionProps,
  motion,
  stagger,
  useAnimate,
  useAnimation,
  useInView,
  Variants,
} from "framer-motion";
import { debounce } from "lodash";
import Link from "next/link";
import { FC, forwardRef, useEffect, useRef, useState } from "react";

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
    <div
      className={cn("relative font-bold hover:mt-16 transition-all", className)}
    >
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

/**
 * Props for the AnimatedText component.
 */
interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

export const AnimatedText = forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
      gradientAnimationDuration = 1,
      hoverEffect = false,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: "0 0",
      },
      animate: {
        backgroundPosition: "100% 0",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center py-8", className)}
        {...props}
      >
        <motion.h1
          className={cn(
            "text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-normal",
            textClassName
          )}
          style={{
            background: gradientColors,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.h1>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

/**
 * Props for the TextPressure component.
 */
interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
}

/**
 * TextPressure component applies interactive effects to a text string
 * based on mouse movements, allowing dynamic font variations such as
 * width, weight, and italic slant. It also supports stroke effects
 * and scaling based on container size.
 *
 * @param {TextPressureProps} props - The component properties.
 */
export const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  strokeWidth = 2,
  className = "",
  minFontSize = 24,
}: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  /**
   * Calculate the Euclidean distance between two points.
   * @param {Object} a The first point, with x and y properties.
   * @param {Object} b The second point, with x and y properties.
   * @returns {number} The Euclidean distance.
   */
  const dist = (
    a: { x: number; y: number },
    b: { x: number; y: number }
  ): number => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    /**
     * Updates the cursor position based on the latest mouse move event.
     * @param {MouseEvent} e - The mouse move event.
     */
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    /**
     * Updates the cursor position based on the latest touch move event.
     * @param {TouchEvent} e - The touch move event.
     */
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /**
   * Calculates the optimal font size for the text based on the container size,
   * and sets the font size, scale, and line height accordingly.
   *
   * The algorithm works as follows:
   * 1. Calculate the initial font size based on the container width and the
   *    number of characters in the text.
   * 2. Ensure the font size is at least the minimum allowed font size.
   * 3. Set the font size, scale, and line height to the initial values.
   * 4. In the next animation frame, measure the text's bounding box and
   *    calculate the vertical scale factor based on the container height and
   *    the text height.
   * 5. Set the scale and line height to the calculated vertical scale factor.
   */
  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [scale, text]);

  useEffect(() => {
    let rafId: number;

    /**
     * Animates the text to follow the cursor.
     */
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          /**
           * Calculates the attribute value based on the distance from the mouse cursor.
           */
          const getAttr = (
            distance: number,
            minVal: number,
            maxVal: number
          ) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : "0";
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : "1";

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-transparent"
    >
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? "flex justify-between" : ""
        } ${stroke ? "stroke" : ""} uppercase text-center`}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={char}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};
