import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useEffect } from "react";

import Logo from "../components/motion/Menu/Logo";

/**
 * Header component that displays a count value and a logo.
 * The count value animates from 0 to 100 and the logo animates in.
 * The header is fixed positioned and covers the entire screen.
 */
const Header = () => {
  // Create a motion value for the count
  const count = useMotionValue(0);
  // Create a transform that rounds the count value
  const rounded = useTransform(count, Math.round);
  // Determine if the component will change
  const willChange = useWillChange();

  // Animate the count value from 0 to 100
  useEffect(() => {
    const animation = animate(count, 100, { duration: 3, delay: 0 });
    // Clean up the animation when the component unmounts
    return () => animation.stop();
  }, [count]);

  return (
    // Fixed positioned div that covers the entire screen
    <motion.div
      layout // Enable layout animations
      initial={{ y: "0%" }} // Initial position
      animate={{ y: "-100%" }} // Animate to the top of the screen
      transition={{
        duration: 2, // Duration of the animation
        delay: 7, // Delay of the animation
        ease: "anticipate", // Easing function
      }}
      style={{
        willChange, // Determine if the component will change
        position: "fixed", // Fixed position
        justifyContent: "center", // Center the content vertically
        background: "#222424", // Background color
        transformOrigin: "top", // Transform origin
        display: "flex", // Display as a flex container
        zIndex: "102", // Z-index
        top: "0", // Top position
        left: "0", // Left position
        width: "100%", // Width
        height: "100%", // Height
      }}
    >
      {/* Display the rounded count value */}
      <motion.div
        initial={{ opacity: 1, zIndex: "102" }} // Initial opacity and z-index
        animate={{ opacity: 0, zIndex: "-100" }} // Animate the opacity and z-index
        transition={{
          duration: 1, // Duration of the animation
          delay: 3, // Delay of the animation
          ease: "circIn", // Easing function
        }}
        layout // Enable layout animations
        style={{
          willChange, // Determine if the component will change
          alignSelf: "center", // Align the content horizontally
          mixBlendMode: "difference", // Mix blend mode
        }}
      >
        <motion.span>{rounded}</motion.span>
        <span>%</span>
      </motion.div>
      {/* Display the logo */}
      <motion.div
        initial={{ opacity: 0 }} // Initial opacity
        animate={{
          opacity: 1, // Animate the opacity
          transition: { duration: 2, ease: "easeIn", delay: 4 }, // Animation properties
        }}
        layout // Enable layout animations
        style={{
          willChange, // Determine if the component will change
          position: "fixed", // Fixed position
          alignSelf: "center", // Align the content horizontally
          textAlign: "center", // Text alignment
        }}
      >
        <Logo light size={400} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
