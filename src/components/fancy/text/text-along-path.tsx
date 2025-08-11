/* eslint-disable react/no-array-index-key */
/* eslint-disable sonarjs/no-identical-expressions */

"use client";

import { useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

/**
 * PreserveAspectRatio types for SVG elements.
 * Defines how the SVG content should be scaled and aligned within its viewport.
 */
type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

/**
 * PreserveAspectRatio type for SVG elements.
 * Defines how the SVG content should be scaled and aligned within its viewport.
 */
type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`;

/**
 * Props for the AnimatedPathText component.
 * This component animates text along a specified SVG path.
 */
interface AnimatedPathTextProps {
  // Path properties
  path: string;
  pathId?: string;
  pathClassName?: string;
  preserveAspectRatio?: PreserveAspectRatio;
  showPath?: boolean;

  // SVG properties
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  svgClassName?: string;

  // Text properties
  text: string;
  textClassName?: string;
  textAnchor?: "start" | "middle" | "end";

  // Animation properties
  animationType?: "auto" | "scroll";

  // Animation properties if animationType is auto
  duration?: number;
  repeatCount?: number | "indefinite";
  easingFunction?: {
    calcMode?: string;
    keyTimes?: string;
    keySplines?: string;
  };

  // Scroll animation properties if animationType is scroll
  scrollContainer?: RefObject<HTMLElement>;
  scrollOffset?: any["offset"];
  scrollTransformValues?: [number, number];
}

/**
 * AnimatedPathText
 *
 * This component animates text along a specified SVG path.
 *
 * Properties:
 *
 * - `path`: The SVG path string.
 * - `pathId`: The ID of the path element. If not provided, a random ID will be generated.
 * - `pathClassName`: The CSS class name of the path element.
 * - `preserveAspectRatio`: The `preserveAspectRatio` attribute of the SVG element.
 * - `showPath`: Whether to show the path or not.
 * - `width`, `height`, `viewBox`: The size properties of the SVG element.
 * - `svgClassName`: The CSS class name of the SVG element.
 * - `text`: The text to be animated.
 * - `textClassName`: The CSS class name of the text element.
 * - `textAnchor`: The text anchor of the text element.
 * - `animationType`: The type of animation. Can be either "auto" or "scroll".
 * - `duration`, `repeatCount`, `easingFunction`: The animation properties if `animationType` is "auto".
 * - `scrollContainer`, `scrollOffset`, `scrollTransformValues`: The scroll animation properties if `animationType` is "scroll".
 */
const AnimatedPathText = ({
  // Path defaults
  path,
  pathId,
  pathClassName,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  svgClassName,

  // Text defaults
  text,
  textClassName,
  textAnchor = "start",

  // Animation type
  animationType = "auto",

  // Animation defaults
  duration = 4,
  repeatCount = "indefinite",

  easingFunction = {},

  // Scroll animation defaults
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
}: AnimatedPathTextProps) => {
  const container = useRef<HTMLDivElement>(null);
  const textPathRefs = useRef<SVGTextPathElement[]>([]);

  // naive id for the path. you should rather use yours :)
  const id =
    pathId || `animated-path-${Math.random().toString(36).substring(7)}`;

  const { scrollYProgress } = useScroll({
    container: scrollContainer || container,
    offset: scrollOffset,
  });

  const t = useTransform(scrollYProgress, [0, 1], scrollTransformValues);

  useEffect(() => {
    // Re-initialize scroll handler when container ref changes
    const handleChange = () => {
      textPathRefs.current.forEach((textPath) => {
        if (textPath) {
          textPath.setAttribute("startOffset", `${t.get()}%`);
        }
      });
    };

    scrollYProgress.on("change", handleChange);

    return () => {
      scrollYProgress.clearListeners();
    };
  }, [scrollYProgress, t]);

  const animationProps =
    animationType === "auto"
      ? {
          from: "0%",
          to: "100%",
          begin: "0s",
          dur: `${duration}s`,
          repeatCount,
          ...(easingFunction && easingFunction),
        }
      : null;

  return (
    <svg
      className={svgClassName}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        id={id}
        className={pathClassName}
        d={path}
        stroke={showPath ? "currentColor" : "none"}
        fill="none"
      />

      {/* First text element */}
      <text textAnchor={textAnchor} fill="currentColor">
        <textPath
          className={textClassName}
          href={`#${id}`}
          startOffset="0%"
          ref={(ref) => {
            if (ref) textPathRefs.current[0] = ref;
          }}
        >
          {animationType === "auto" && (
            <animate attributeName="startOffset" {...animationProps} />
          )}
          {text}
        </textPath>
      </text>

      {/* Second text element (offset to hide the jump) */}
      {animationType === "auto" && (
        <text textAnchor={textAnchor} fill="currentColor">
          <textPath
            className={textClassName}
            href={`#${id}`}
            startOffset="-100%"
            ref={(ref) => {
              if (ref) textPathRefs.current[1] = ref;
            }}
          >
            {animationType === "auto" && (
              <animate
                attributeName="startOffset"
                {...animationProps}
                from="-100%"
                to="0%"
              />
            )}
            {text}
          </textPath>
        </text>
      )}
    </svg>
  );
};

export default function Preview() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const paths = [
    "M1 254C177 219 61 -64 269 15C477 94 332 285 214 348C96 411 155 546 331 486C507 426 410 267 667 215C872.6 173.4 951.333 264.333 965 315",
    "M1 214C177 179 61 -104 269 -25C477 54 332 245 214 308C96 371 155 506 331 446C507 386 410 227 667 175C872.6 133.4 951.333 224.333 965 275",
    "M1 294C177 259 61 -24 269 55C477 134 332 325 214 388C96 451 155 586 331 526C507 466 410 307 667 255C872.6 213.4 951.333 304.333 965 355",
    "M1 174C177 139 61 -144 269 -65C477 14 332 205 214 268C96 331 155 466 331 406C507 346 410 187 667 135C872.6 93.4 951.333 184.333 965 235",
    "M1 334C177 299 61 16 269 95C477 174 332 365 214 428C96 491 155 626 331 566C507 506 410 347 667 295C872.6 253.4 951.333 344.333 965 395",
    "M1 134C177 99 61 -184 269 -105C477 -26 332 165 214 228C96 291 155 426 331 366C507 306 410 147 667 95C872.6 53.4 951.333 144.333 965 195",
    "M1 374C177 339 61 56 269 135C477 214 332 405 214 468C96 531 155 666 331 606C507 546 410 387 667 335C872.6 293.4 951.333 384.333 965 435",
    "M1 94C177 59 61 -224 269 -145C477 -66 332 125 214 188C96 251 155 386 331 326C507 266 410 107 667 55C872.6 13.4 951.333 104.333 965 155",
  ];

  // Fun text phrases for each path
  const texts = [
    "Information is expanding daily. How to get it out visually is important.",
    "The details are not the details. They make the design.",
    "There's no other product that changes function like the computer.",
    "Innovation is the outcome of a habit, not a random act.",
    "The only important thing about design is how it relates to people.",
    "Good design is obvious. Great design is transparent.",
  ];

  return (
    <div
      className="w-dvw h-dvh overflow-auto relative font-calendas"
      ref={(node) => setContainer(node)}
    >
      <div className="h-[200%] absolute top-0 left-0 w-full flex flex-col items-center mt-40 text-4xl">
        <p>SCROLL DOWN</p>
      </div>
      <div className="sticky w-full top-0  h-full flex flex-col">
        {paths.map((path, i) => (
          <AnimatedPathText
            key={`path-${i}`}
            path={path}
            showPath
            scrollContainer={{ current: container }}
            pathId={`flowing-path-${i}`}
            svgClassName="absolute -left-[100px] top-0 w-[calc(100%+200px)] h-full"
            viewBox="0 0 900 600"
            text={texts[i]}
            textClassName="text-xl font-thin font-calendas"
            animationType="scroll"
            scrollTransformValues={[-130, 95]}
            textAnchor="start"
          />
        ))}
      </div>
    </div>
  );
}
