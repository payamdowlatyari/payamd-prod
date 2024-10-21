"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { projects } from "~/lib/components/data/data";
import { HeroParallax } from "~/lib/components/motion/HeroParallax";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";

const Projects = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.01,
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <HeroParallax products={projects} />
      <Footer />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 z-10 origin-[0%] bg-gray-50"
        style={{ scaleX }}
      />
    </motion.main>
  );
};

export default Projects;
