"use client";

import { motion, Variants } from "framer-motion";
import { forwardRef, useState } from "react";

import { cn } from "~/utils/cn";

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
      className={cn(
        "relative font-bold hover:mt-16 ease-in-out duration-1000",
        className
      )}
    >
      {chars.map((s, index) => (
        <motion.span
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block origin-bottom leading-[0.7]"
          animate={{ scaleY: getScaleY(index), transition: { duration: 0.3 } }}
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
