import { SimpleGrid } from "@chakra-ui/react";
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
import { useRef } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Skills from "./Skills";

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
        alignItems: "flex-start",
        padding: "1em",
        paddingTop: "8em",
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            style={{ background: "lightgray", padding: "1em" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <SimpleGrid
              maxWidth="100vw"
              minChildWidth="250px"
              spacing="20px"
              pb={5}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.3,
                }}
              >
                <motion.h3>Experience</motion.h3>
                <Experience />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 3,
                  }}
                >
                  <motion.h3>Projects</motion.h3>
                  <Link href="/projects" className="underlined underlinedThin">
                    check out my portfolio
                    <ArrowForwardIcon />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.4,
                }}
              >
                <motion.h3>Education</motion.h3>
                <Education />
                <motion.h3>Certificates</motion.h3>
                <Certificates />
                <motion.h3>Publications</motion.h3>
                <Publications />
              </motion.div>
            </SimpleGrid>
            <motion.h3>Skills</motion.h3>
            <Skills />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;
