/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

"use client";

import {
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

/**
 * Animation variants for typing text
 */
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

/**
 * Props for the TypingText component
 */
interface TypingTextProps extends Omit<MotionProps, "children"> {
  /** Text to animate */
  text?: string;
  /** Array of texts to cycle through */
  texts?: string[];
  /** Typing speed in milliseconds */
  speed?: number;
  /** Delay before starting animation */
  delay?: number;
  /** Whether to show cursor */
  showCursor?: boolean;
  /** Cursor character */
  cursor?: string;
  /** Cursor className */
  cursorClassName?: string;
  /** Whether to loop through texts */
  loop?: boolean;
  /** Pause duration between loops */
  pauseDuration?: number;
  /** Custom className */
  className?: string;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Whether to start animation when component enters viewport */
  startOnView?: boolean;
  /** Whether to animate only once */
  once?: boolean;
  /** The animation preset to use */
  animation?: AnimationVariant;
  /** Margin for in-view detection (rootMargin) */
  inViewMargin?: UseInViewOptions["margin"];
}

const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

/**
 * A component that types out a given text or array of texts with a blinking cursor.
 *
 * @param {TypingTextProps} props - The component props.
 *
 * @example
 * <TypingText text="Hello world!" />
 *
 * @example
 * <TypingText texts={["Hello world!", "This is a typing animation"]} loop />
 */
function TypingText({
  text,
  texts,
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorClassName = "",
  cursor = "|",
  loop = false,
  pauseDuration = 2000,
  className,
  onComplete,
  startOnView = true,
  once = false,
  inViewMargin,
  ...props
}: TypingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: inViewMargin as UseInViewOptions["margin"],
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Determine if we should start animation
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  const textArray = texts && texts.length > 0 ? texts : [text];
  const currentText = textArray[currentTextIndex] ?? "";

  useEffect(() => {
    if (!shouldStart) return;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      setHasAnimated(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, shouldStart]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
    // Typing complete
    onComplete?.();

    if (loop && texts && texts.length > 1) {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, pauseDuration);

      return () => clearTimeout(timeout);
    }
  }, [
    currentIndex,
    currentText,
    isTyping,
    speed,
    loop,
    texts,
    pauseDuration,
    onComplete,
  ]);

  // Animation variants for container (fadeIn by default, extendable)
  const finalVariants = {
    container: {
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { staggerChildren: 0.02 } },
      exit: { opacity: 0 },
    },
  };
  const MotionComponent = motion.span;

  return (
    <MotionComponent
      ref={ref}
      variants={finalVariants.container as Variants}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={startOnView ? undefined : "show"}
      exit="exit"
      className={cn("whitespace-pre-wrap", className)}
      viewport={{ once }}
      {...props}
    >
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {displayText}
        {showCursor && (
          <motion.span
            variants={cursorVariants}
            animate="blinking"
            className={cn(
              "inline-block ms-1 font-normal text-foreground select-none w-px",
              cursorClassName
            )}
          >
            {cursor}
          </motion.span>
        )}
      </span>
    </MotionComponent>
  );
}

/**
 * Props for the ParticleText component.
 */
interface ParticleTextProps {
  text?: string;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

/**
 * A component that renders a particle text effect.
 *
 * It creates a container and fills it with a specified number of particles.
 * Each particle is a small, rounded `div` element with a random position and
 * opacity. The particles are then animated to move around the container in a
 * way that creates a fluid, organic effect.
 *
 * @param {ParticleTextProps} props - The component props.
 */
export const ParticleText: React.FC<ParticleTextProps> = ({
  text = "PARTICLES",
  className = "",
  particleCount = 50,
  particleColor = "#3b82f6",
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed unused particlesRef

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full pointer-events-none";
      particle.style.backgroundColor = particleColor;
      particle.style.opacity = Math.random().toString();

      // Random position around the text
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const time = Date.now() * 0.001 + index;
        const x = Math.sin(time * 0.5) * 20 + Math.cos(time * 0.3) * 30;
        const y = Math.cos(time * 0.4) * 15 + Math.sin(time * 0.6) * 25;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = (Math.sin(time * 2) * 0.5 + 0.5).toString();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, particleColor]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-neutral-100 relative z-10"
        style={{
          textShadow: `0 0 20px ${particleColor}40`,
          filter: `drop-shadow(0 0 10px ${particleColor}60)`,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default TypingText;
