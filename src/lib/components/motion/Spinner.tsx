/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

"use client";

import { motion, Transition, Variants } from "framer-motion";
import React, { CSSProperties, useEffect, useRef } from "react";

import { cn } from "./utils/cn";

type SpinningTextProps = {
  children: string | string[];
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: "linear",
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

/**
 * A component that renders a spinning text effect.
 * @param {string | string[]} children - The text to spin. Can be a string or an array of strings.
 * @returns {JSX.Element} The SpinningText component.
 */
export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  radius = 5,
  transition,
  variants,
}: SpinningTextProps): JSX.Element {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }

  if (Array.isArray(children)) {
    // Validate all elements are strings
    if (!children.every((child) => typeof child === "string")) {
      throw new Error("all elements in children array must be strings");
    }
    children = children.join("");
  }

  const letters = children.split("");
  letters.push(" ");

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        ...style,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="absolute left-1/2 top-1/2 inline-block"
          style={
            {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center",
            } as React.CSSProperties
          }
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.div>
  );
}

/**
 * A component that displays a grid of lines that react to the mouse or touch.
 *
 * @param {object} props The component props.
 * @prop {number} [rows=9] The number of rows in the grid.
 * @prop {number} [columns=9] The number of columns in the grid.
 * @prop {string} [containerSize="80vmin"] The size of the container.
 * @prop {string} [lineColor="#efefef"] The color of the lines.
 * @prop {string} [lineWidth="1vmin"] The width of the lines.
 * @prop {string} [lineHeight="6vmin"] The height of the lines.
 * @prop {number} [baseAngle=-10] The base angle of the lines.
 * @prop {string} [className=""] The class name of the container.
 * @prop {object} [style={}] The style object of the container.
 */
export function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current as HTMLElement | null;
    if (!container) return;

    const items = container.querySelectorAll("span");

    /**
     * Given a pointer object, rotates all the child elements of the container
     * so that they are facing the pointer.
     *
     * @param {{ x: any; y: any }} pointer The pointer object.
     */
    const onPointerMove = (pointer: { x: any; y: any }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r =
          ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={
        {
          backgroundColor: lineColor,
          width: lineWidth,
          height: lineHeight,
          transform: "rotate(var(--rotate))",
          willChange: "transform",
          "--rotate": `${baseAngle}deg`,
        } as React.CSSProperties
      }
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}
