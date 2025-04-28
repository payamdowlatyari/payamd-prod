"use client";

import { motion } from "framer-motion";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import { HeroParallax } from "~/components/motion/HeroParallax";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { projects } from "~/data/data";

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
