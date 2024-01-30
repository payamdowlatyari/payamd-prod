"use client";

import "../../styles/globals.css";
import { motion, useIsPresent } from "framer-motion";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Logo from "~/lib/components/motion/Menu/Logo";
import Horizental from "~/lib/components/Sections/Portfolio/Horizental";

const Projects = () => {
  const isPresent = useIsPresent();

  return (
    <>
      <Menu />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
      <Horizental />
      <Footer />
    </>
  );
};

export default Projects;
