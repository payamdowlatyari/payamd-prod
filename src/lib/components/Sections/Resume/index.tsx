import { useRef } from "react";
import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";
import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";
import Skills from "./Skills";
import Intro from "./Intro";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Resume = () => {
  const resume = useRef(null);
  const isInView = useInView(resume);
  const willChange = useWillChange();

  return (
    <motion.section
      id="resume"
      ref={resume}
      layoutScroll
      style={{
        willChange,
        display: "block",
        padding: "6em 0",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <>
            <Intro />
            <Experience />
            <Education />
            <Certificates />
            <Publications />

            <Skills />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 5,
              }}
              style={{
                padding: "3em 1em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              <h3>Projects</h3>
              <HoverLink title="check out my portfolio" url="/projects" />
              <ArrowForwardIcon />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;
