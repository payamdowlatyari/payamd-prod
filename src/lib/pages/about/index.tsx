"use client";

import { motion, useSpring, useScroll, useIsPresent } from "framer-motion";
import { useRef } from "react";

import Menu from "~/lib/components/motion/Menu/Menu";
import Resume from "~/lib/components/Sections/Resume";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: progressBarRef });
  const isPresent = useIsPresent();
  const scaleX = useSpring(scrollYProgress ?? 0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  return (
    <>
      <Menu />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleY: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originY: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[2]"
        ref={progressBarRef}
      />
      <Resume />
      <Footer />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-silver"
        style={{ scaleX }}
      />
    </>
  );
};

export default AboutRoute;
