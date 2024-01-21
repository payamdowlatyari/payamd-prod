import { SimpleGrid, VStack } from "@chakra-ui/react";

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
import { ArrowDownIcon } from "@chakra-ui/icons";

const Resume = () => {
  const resume = useRef(null);
  const isInView = useInView(resume);
  const willChange = useWillChange();

  return (
    <motion.section
      id="resume"
      ref={resume}
      layoutScroll
      style={{ willChange }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <VStack spacing={2} align="initial">
              <motion.h1>resume</motion.h1>
              <motion.div
                style={{
                  paddingLeft: "1em",
                }}
              >
                <motion.a href="#skills">
                  my skills <br />
                  <ArrowDownIcon />
                </motion.a>
              </motion.div>
              <SimpleGrid
                maxWidth="100vw"
                minChildWidth="250px"
                spacing="20px"
                className="second"
              >
                <motion.div
                  className="third"
                  style={{
                    padding: "1em",
                  }}
                >
                  <motion.h3>Experience</motion.h3>
                  <Experience />
                </motion.div>
                <motion.div className="second">
                  <motion.h3>Education</motion.h3>
                  <Education />
                  <motion.h3>Certificates</motion.h3>
                  <Certificates />
                  <motion.h3>Publications</motion.h3>
                  <Publications />
                </motion.div>
              </SimpleGrid>
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;
