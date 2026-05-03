"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * A React component that represents a spotlight element.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name to apply to the spotlight element.
 * @param {React.ComponentProps<typeof motion.div>} props - The component props for the motion.div element.
 */
const Spotlight = ({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof motion.div>) => {
  return <motion.div className={`spotlight ${className}`} {...props} />;
};

/**
 * A React component that creates a dynamic spotlight background effect.
 *
 * This component renders three overlapping spotlight elements that animate in a
 * coordinated manner to create a visually appealing background. The spotlights
 * move and rotate in a loop, creating a dynamic and engaging visual effect.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed on top of the spotlight background.
 */
const SpotlightBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="spotlight-container">
      <div className="spotlight-overlay">
        <Spotlight
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={{
            x: ["-50%", "-30%", "-70%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-50%"],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="spotlight-left"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "10%", "0%"],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
          className="spotlight-mid"
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
          className="spotlight-right"
        />
      </div>

      <div className="spotlight-content">{children}</div>
    </div>
  );
};

export default SpotlightBackground;
