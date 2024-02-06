"use client";

import "../../styles/globals.css";
import { motion, useIsPresent } from "framer-motion";
import Menu from "~/lib/components/motion/Menu/Menu";
import Portfolio from "~/lib/components/Sections/Portfolio";
import BGImage from "~/lib/components/motion/View/BGImage";
import { bgImages } from "~/lib/components/data/images";
import CopyRight from "~/lib/components/motion/View/CopyRight";

const Projects = () => {
  const isPresent = useIsPresent();

  return (
    <>
      <Menu />
      <BGImage url={bgImages[2]} />

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
      <Portfolio />
      <div style={{ position: "sticky", bottom: "0" }}>
        <CopyRight />
      </div>
    </>
  );
};

export default Projects;
