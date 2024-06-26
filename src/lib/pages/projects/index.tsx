"use client";

import "../../styles/globals.css";
import { motion, useIsPresent } from "framer-motion";

import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import CopyRight from "~/lib/components/motion/View/CopyRight";
import Portfolio from "~/lib/components/Sections/Portfolio";

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

      <div className="portfolio-title-wrapper">
        <h1>Projects</h1>
      </div>
      <Portfolio />

      <div style={{ position: "sticky", bottom: "0", fontSize: "5em" }}>
        <ParallaxText baseVelocity={0.01}>
          {" "}
          ✳︎ Portfolio ✳︎ Projects
        </ParallaxText>
        <CopyRight />
      </div>
    </>
  );
};

export default Projects;
