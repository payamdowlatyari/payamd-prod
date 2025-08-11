"use client";

import {
  useMotionTemplate,
  motion,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { useState, useEffect } from "react";

import { cn } from "~/utils/cn";

/**
 * Props for the CardPattern component.
 */
interface CardPatternProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
}

/**
 * A motion component that renders a card pattern, with a gradient background
 * and a pseudo-random string that is revealed on hover.
 *
 * @param {CardPatternProps} props - The component props.
 */
export function CardPattern({
  mouseX,
  mouseY,
  randomString,
}: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

/**
 * Generates a pseudo-random string of characters.
 *
 * @param {number} length - The length of the string to generate.
 * @param {string} [characters] - The characters to use in the string.
 * @returns {string} A string of the specified length, composed of characters from the
 */
const generateRandomString = (
  length: number,
  characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string => {
  const charactersArray = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  );
  return charactersArray.join("");
};

/**
 * A motion component that renders an Evervault card with a gradient background
 * and a pseudo-random string that is revealed on hover. The card also has a
 * centered text element with a blurred background.
 *
 * @param {{ text?: string; className?: string }} props - The component props.
 * @param {string} [props.text] - The text to be displayed on the card.
 * @param {string} [props.className] - The class name to be applied to the outermost
 * element.
 */
export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  /**
   * Handles the mouse move event to update mouse position and random string.
   *
   * @param {React.MouseEvent<HTMLDivElement>} event - The mouse move event.
   */
  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    if (!currentTarget) return;
    const rect = (currentTarget as Element).getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-32 md:h-36 w-32 md:w-36 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
            <div className="absolute w-full h-full bg-black blur-md rounded-full" />
            <span className="text-white text-center z-20">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
