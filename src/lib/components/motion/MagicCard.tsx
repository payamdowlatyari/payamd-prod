/* eslint-disable react/prop-types */

"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, {
  MouseEvent as ReactMouseEvent,
  useState,
  useCallback,
  useEffect,
} from "react";

import { CanvasRevealEffect } from "./CanvasRevealEffect";
import { cn } from "./utils/cn";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

/**
 * @description A component that renders a card with a magic gradient effect that follows the user's mouse.
 *
 * @param {ReactNode} children - The children to render inside the card.
 * @param {string} [className] - A class name to add to the card.
 * @param {number} [gradientSize=200] - The size of the gradient effect.
 * @param {string} [gradientColor="#2f02d1"] - The color of the gradient effect.
 * @param {number} [gradientOpacity=0.8] - The opacity of the gradient effect.
 * @returns {JSX.Element}
 *
 */
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#2f02d1",
  gradientOpacity = 0.8,
}: MagicCardProps): JSX.Element {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex h-fit min-w-[750px] overflow-hidden rounded-lg bg-blueGray-100/5 p-1 md:p-2",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}

/**
 * Creates a card component with a spotlight effect.
 *
 * The spotlight effect is a radial gradient that follows the user's mouse.
 * The gradient is white in the center and transparent at the edges.
 * The effect is reversed when the user hovers over the component.
 *
 * The component accepts the following props:
 * - radius: The radius of the spotlight effect.
 * - color: The color of the spotlight effect.
 * - className: The class name of the component.
 * - children: The children of the component.
 *
 * The component will automatically add the following classes to the root element:
 * - p-10: Adds padding to the component.
 * - rounded-md: Adds a rounded corner to the component.
 * - relative: Sets the position of the component to relative.
 * - border: Adds a border to the component.
 * - border-neutral-800: Sets the color of the border to neutral-800.
 * - bg-black: Sets the background color of the component to black.
 * - dark:border-neutral-800: Sets the color of the border to neutral-800 when the user is in dark mode.
 *
 * The component will also add the following classes to the spotlight element:
 * - pointer-events-none: Disables mouse events on the spotlight element.
 * - absolute: Sets the position of the spotlight element to absolute.
 * - z-0: Sets the z-index of the spotlight element to 0.
 * - inset-px: Sets the position of the spotlight element to inset-px.
 * - rounded-md: Adds a rounded corner to the spotlight element.
 * - opacity-0: Sets the opacity of the spotlight element to 0.
 * - transition: Adds a transition effect to the spotlight element.
 * - duration-300: Sets the duration of the transition effect to 300ms.
 * - group-hover/spotlight:opacity-100: Sets the opacity of the spotlight element to 100 when the user hovers over the component.
 *
 * @param {number} radius - The radius of the spotlight effect.
 * @param {string} color - The color of the spotlight effect.
 * @param {string} className - The class name of the component.
 * @param {React.ReactNode} children - The children of the component.
 * @returns {JSX.Element}
 */
export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
};
