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
export default function Projects(): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-neutral-950 text-neutral-50"
    >
      <Menu />
      <HeroParallax products={projects} />
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
}
