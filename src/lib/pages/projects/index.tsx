"use client";

import { motion } from "framer-motion";

import { projects } from "~/lib/components/data/data";
import { HeroParallax } from "~/lib/components/motion/HeroParallax";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import Footer from "~/lib/layout/Footer";

/**
 * Projects component
 * @returns {JSX.Element}
 */
const Projects = (): JSX.Element => {
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
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default Projects;
