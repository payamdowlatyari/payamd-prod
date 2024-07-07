"use client";

// import "../../styles/globals.css";
import { motion, useSpring, useScroll, useIsPresent } from "framer-motion";
import { useRef } from "react";

import Menu from "~/lib/components/motion/Menu/Menu";
import Resume from "~/lib/components/Sections/Resume";
import Footer from "~/lib/layout/Footer";

/**
 * The About Route component.
 *
 * This component renders the About Route, which includes the Menu, Resume, Footer, and Progress Bar.
 * It also handles the scaling of the Privacy Screen component based on the scroll position.
 *
 * @returns {JSX.Element} The About Route component.
 */
const AboutRoute = () => {
  // Create a ref for the progress bar
  const ref = useRef(null);

  // Get the scrollYProgress value for the progress bar scaling
  const { scrollYProgress } = useScroll({ target: ref });

  // Check if the component is present
  const isPresent = useIsPresent();

  // Check if scrollYProgress is defined before using it
  const scaleX = useSpring(
    scrollYProgress !== undefined ? scrollYProgress : 0,
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.1,
    }
  );

  return (
    <>
      {/* Render the Menu component */}
      <Menu />

      {/* Render the Privacy Screen component */}
      <motion.div
        // Set the initial scaleY value to 1
        initial={{ scaleY: 1 }}
        // Animate the scaleY value to 0 with a duration of 1 second and an ease-out curve
        animate={{ scaleY: 0, transition: { duration: 1, ease: "circOut" } }}
        // Animate the scaleY value back to 1 when the component is unmounted
        exit={{ scaleY: 1, transition: { duration: 1, ease: "circIn" } }}
        // Set the originY value based on the isPresent value
        style={{ originY: isPresent ? 0 : 1 }}
        // Add the 'privacy-screen' class to the component
        className="fixed top-0 left-0 right-0 bottom-0 bg-slate-100 z-[2]"
        ref={ref}
      />

      {/* Render the Resume component */}
      <Resume />

      {/* Render the Footer component */}
      <Footer />

      {/* Render the progress bar */}

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-slate-100"
        style={{ scaleX }}
      />
    </>
  );
};

export default AboutRoute;
