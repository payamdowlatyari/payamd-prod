"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { cn } from "./utils/cn";

type ButtonMagneticProps = React.ComponentProps<"button">;

/**
 * A button component that magnetically attracts the user's mouse.
 *
 * It does this by using the `onMouseMove` event to detect the user's mouse position,
 * and then animates the button's position to follow the mouse using Framer Motion.
 *
 * When the mouse leaves the button, it resets the button's position to its initial value.
 *
 * @param {React.ReactNode} children - The children to render inside the button.
 * @param {string} [className] - A class name to add to the button.
 * @returns {JSX.Element}
 *
 * @example
 * <ButtonMagnetic>
 *   Click me!
 * </ButtonMagnetic>
 */
export function ButtonMagnetic({
  className,
  children,
}: ButtonMagneticProps): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<any>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX, y: middleY });
  }

  /**
   * Resets the position state to its initial value when the mouse leaves the button.
   */
  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 0.1,
      }}
    >
      {children}
    </motion.button>
  );
}
