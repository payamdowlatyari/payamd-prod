"use client";

import "../../styles/globals.css";
import { motion, useSpring, useScroll, useIsPresent } from "framer-motion";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Resume from "~/lib/components/Sections/Resume";
import { useRef } from "react";
import BGImage from "~/lib/components/motion/View/BGImage";
import { bgImages } from "~/lib/components/data/images";

const AboutRoute = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const isPresent = useIsPresent();

  return (
    <>
      <Menu />
      <BGImage url={bgImages[1]} />

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
      <Resume />
      <motion.div ref={ref} className="progress" style={{ scaleX }} />
      <Footer />
    </>
  );
};

export default AboutRoute;
