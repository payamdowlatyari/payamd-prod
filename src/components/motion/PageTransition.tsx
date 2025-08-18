/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/**
 * A Framer Motion component to animate page transitions.
 *
 * @param {Object} props - The component accepts a `children` prop
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Forces animation on route change

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

const rectangleVariants = {
  initial: {
    x: "0%",
  },
  /**
   * Animation variant for the rectangles.
   * @param {number} i - Index of the rectangle in the array, used for staggering the animation.
   * @returns {Object} Animation variant with staggered delay
   */
  animate: (i: number): object => ({
    x: "100%",
    transition: {
      delay: 0.1 * i, // Staggered delay for each rectangle
      duration: 0.5,
      ease: "easeIn",
    },
  }),
};

/**
 * A full-screen loading animation, containing 5 rectangles
 * that slide in from left to right. The third rectangle
 * contains the platform logo.
 */
const Loading = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full z-50"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-1/5 bg-slate-900 flex items-center justify-center"
          initial="initial"
          animate="animate"
          custom={i}
          variants={rectangleVariants}
          style={{ top: `${i * 20}%` }}
        >
          {i === 2 && (
            <img
              src="https://res.cloudinary.com/dl2adjye7/image/upload/v1715757108/logo_platform_v4_oa3b8c.png"
              alt="Logo"
              className="h-32 w-32"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * A wrapper component to animate page transitions with a loading animation.
 *
 * @param {Object} props - The component accepts `children`, `isAnimating`, and `setIsAnimating` props.
 *   `children` is the content to be rendered with the animation.
 *   `isAnimating` is a boolean that indicates whether the animation is happening.
 *   `setIsAnimating` is a function to set `isAnimating` to `true` or `false`.
 */
export const PageLoadingTransition = ({
  children,
  isAnimating,
  setIsAnimating,
}: {
  children: React.ReactNode;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Total duration of the animations
    }
    return () => clearTimeout(timer);
  }, [isAnimating, setIsAnimating]);

  return (
    <>
      <AnimatePresence>{isAnimating && <Loading />}</AnimatePresence>
      <div
        className={`relative ${isAnimating ? "pointer-events-none" : "pointer-events-auto"}`}
      >
        {children}
      </div>
    </>
  );
};

/**
 * A component that displays a loading page with an animation.
 *
 * It uses a `PageLoadingTransition` to animate the loading state. The animation can be
 * restarted by clicking the provided button.
 *
 */
export const LoadingPage = () => {
  const [isAnimating, setIsAnimating] = useState(true); // Start animation on load

  /**
   * Handles the button click to restart the loading animation.
   */
  const handleButtonClick = () => {
    setIsAnimating(true);
  };

  return (
    <PageLoadingTransition
      isAnimating={isAnimating}
      setIsAnimating={setIsAnimating}
    >
      <div className="h-96 flex items-center justify-center">
        <button
          onClick={handleButtonClick}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Restart Loading Animation
        </button>
      </div>
    </PageLoadingTransition>
  );
};
