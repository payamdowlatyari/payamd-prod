"use client";

import { useReducedMotion } from "motion/react";
import React from "react";
import type { IconType } from "react-icons";

import { cn } from "~/utils/cn";

import { TiltCardItem } from "./tilt-card";

/**
 * Props for the InfiniteMovingCards component.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.items - An array of items to display in the cards.
 * @param {string} props.direction - The direction of the scrolling (left or right).
 * @param {string} props.speed - The speed of the scrolling (fast, normal, slow).
 * @param {boolean} props.pauseOnHover - Whether to pause the scrolling on hover.
 * @param {string} props.className - Additional CSS classes for styling.
 */
const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: IconType;
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const duration = { fast: "20s", normal: "40s", slow: "80s" }[speed];
  const copies = reduceMotion ? [0] : [0, 1];

  return (
    <div
      className={cn(
        "scroller relative z-20 w-full max-w-7xl overflow-x-auto [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        style={
          {
            "--animation-duration": duration,
            "--animation-direction":
              direction === "left" ? "forwards" : "reverse",
          } as React.CSSProperties
        }
        className={cn(
          "flex w-max min-w-full shrink-0 items-stretch flex-nowrap gap-4 py-4 focus-within:[animation-play-state:paused]",
          !reduceMotion && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {copies.flatMap((copy) =>
          items.map((item) => (
            <li className="relative flex shrink-0" key={`${copy}-${item.name}`}>
              <TiltCardItem
                icon={item.icon}
                title={item.name}
                description={item.title}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
