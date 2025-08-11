"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { cn } from "~/utils/cn";

/**
 * InputSpotlightBorder
 * A component that renders a border around an input field,
 * with a spotlight effect that follows the user's mouse.
 */
export const InputSpotlightBorder = () => {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="relative w-full">
      <input
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        autoComplete="off"
        placeholder="Enter Text Here"
        type="email"
        name="email"
        className="h-12 w-full cursor-default rounded-md border border-gray-800 bg-gray-950 p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none  placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none"
      />
      <input
        ref={divRef}
        disabled
        style={{
          border: "1px solid #8678F9",
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#8678F9] bg-[transparent] p-3.5 opacity-0  transition-opacity duration-500 placeholder:select-none"
      />
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  className?: string;
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "inherit",
  },
  animate: {
    y: "-120%",
    color: "var(--color-neutral-500)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * A React component that renders an animated input field with a label that animates
 * when the input is focused or contains a value. The label animates by moving up and
 * changing color, providing a smooth transition effect.
 *
 * @param {InputProps} props - The props for the component.
 */
export const InputAnimated = ({
  label,
  className = "",
  value,
  type = "text",
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-50"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
      >
        {label.split("").map((char) => (
          <motion.span
            key={char}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {type === "textarea" ? (
        <textarea
          onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) =>
            setIsFocused(true)
          }
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
            setIsFocused(false)
          }
          // Spread all props except onFocus and onBlur to avoid type conflicts
          {...Object.fromEntries(
            Object.entries(props).filter(
              ([key]) => key !== "onFocus" && key !== "onBlur"
            )
          )}
          rows={5}
          className="outline-none border-b-2 border-neutral-50 py-2 w-full text-base font-medium text-neutral-50 bg-transparent placeholder-transparent"
        />
      ) : (
        <input
          type={type}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
            setIsFocused(true)
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            setIsFocused(false)
          }
          // Spread all props except onFocus and onBlur to avoid type conflicts
          {...Object.fromEntries(
            Object.entries(props).filter(
              ([key]) => key !== "onFocus" && key !== "onBlur"
            )
          )}
          className="outline-none border-b-2 border-neutral-50 py-2 w-full text-base font-medium text-neutral-50 bg-transparent placeholder-transparent"
        />
      )}
    </div>
  );
};
