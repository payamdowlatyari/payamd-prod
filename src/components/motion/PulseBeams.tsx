/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define */

"use client";

import { motion } from "framer-motion";
import React, {
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";

import { cn } from "~/utils/cn";

/**
 * Interface representing the props for the BeamPath component.
 */
export interface BeamPath {
  path: string;
  gradientConfig: {
    initial: {
      x1: string;
      x2: string;
      y1: string;
      y2: string;
    };
    animate: {
      x1: string | string[];
      x2: string | string[];
      y1: string | string[];
      y2: string | string[];
    };
    transition?: {
      duration?: number;
      repeat?: number;
      repeatType?: "loop" | "reverse" | "mirror";
      ease?: string;
      repeatDelay?: number;
      delay?: number;
    };
  };
  connectionPoints?: Array<{
    cx: number;
    cy: number;
    r: number;
  }>;
}

/**
 * Interface representing the props for the PulseBeams component.
 */
interface PulseBeamsProps {
  children?: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
  beams: BeamPath[];
  width?: number;
  height?: number;
  baseColor?: string;
  accentColor?: string;
  gradientColors?: {
    start: string;
    middle: string;
    end: string;
  };
}

/**
 * Renders an SVG element containing animated beams with gradient effects.
 *
 * @param {PulseBeamsProps} props - The component properties.
 */
const SVGs = ({
  beams,
  width,
  height,
  baseColor,
  accentColor,
  gradientColors,
}: PulseBeamsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      {beams.map((beam, index) => (
        <>
          <path d={beam.path} stroke={baseColor} strokeWidth="1" />
          <path
            d={beam.path}
            stroke={`url(#grad${index})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {beam.connectionPoints?.map((point) => (
            <circle
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill={baseColor}
              stroke={accentColor}
            />
          ))}
        </>
      ))}

      <defs>
        {beams.map((beam: BeamPath, index: React.Key | null | undefined) => (
          <motion.linearGradient
            id={`grad${index}`}
            gradientUnits="userSpaceOnUse"
            initial={beam.gradientConfig.initial}
            animate={beam.gradientConfig.animate}
            transition={beam.gradientConfig.transition}
          >
            <GradientColors colors={gradientColors} />
          </motion.linearGradient>
        ))}
      </defs>
    </svg>
  );
};

/**
 * Returns a set of <stop> elements to be used in a <linearGradient>
 * element. The gradient colors are defined by the `colors` object
 * which has the following default values:
 *
 * @param {{ start: string; middle: string; end: string; }} [colors]
 */
const GradientColors = ({
  colors = {
    start: "#18CCFC",
    middle: "#6344F5",
    end: "#AE48FF",
  },
}: {
  colors?: { start: string; middle: string; end: string };
}) => {
  return (
    <>
      <stop offset="0%" stopColor={colors.start} stopOpacity="0" />
      <stop offset="20%" stopColor={colors.start} stopOpacity="1" />
      <stop offset="50%" stopColor={colors.middle} stopOpacity="1" />
      <stop offset="100%" stopColor={colors.end} stopOpacity="0" />
    </>
  );
};

/**
 * Interface representing the props for the GradientTracing component.
 */
interface GradientTracingProps {
  width: number;
  height: number;
  baseColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
  path?: string;
  className?: string;
}

/**
 * GradientTracing
 *
 * A component that renders a gradient tracing effect with Framer Motion.
 * The gradient moves from left to right, with a duration of 2 seconds by default.
 *
 * @param {GradientTracingProps} props
 */
export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "black",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 2,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
  className,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d={path}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/**
 * A component that renders a background with a collection of animated beams.
 *
 * @param {PulseBeamsProps} props
 */
export const PulseBeams = ({
  children,
  className,
  background,
  beams,
  width = 858,
  height = 434,
  baseColor = "transparent",
  accentColor = "transparent",
  gradientColors,
}: PulseBeamsProps) => {
  return (
    <div
      className={cn(
        "w-screen h-48 relative flex items-center justify-center antialiased overflow-hidden",
        className
      )}
    >
      {background}
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs
          beams={beams}
          width={width}
          height={height}
          baseColor={baseColor}
          accentColor={accentColor}
          gradientColors={gradientColors}
        />
      </div>
    </div>
  );
};

/**
 * Interface representing the props for the Ripple component.
 */
interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

/**
 * A component that renders a collection of animated ripples.
 *
 * @param {RippleProps} props
 */
export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`[--i: absolute animate-ripple rounded-full border bg-foreground/25 shadow-xl${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
