import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box, VStack } from "@chakra-ui/react";
import {
  motion,
  useInView,
  AnimatePresence,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  return (
    <motion.section
      id="about"
      className="second"
      ref={ref}
      layoutScroll
      style={{ willChange }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            className="third"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <VStack spacing={2} align="initial">
              <motion.h1>about</motion.h1>
              <Box m={5} mb={10} p={2}>
                <motion.h4>
                  My name is <b>Payam Dowlatyari</b>.
                </motion.h4>
                <motion.p style={{ maxWidth: "720px" }}>
                  I am a software engineer, UX designer, photographer, and
                  blogger. I studied Software Engineering at UC Irvine and
                  graduated in 2020. I have been working in Silicon Valley as a
                  full-stack web developer since then with focus on the design
                  and implementation of user interfaces using JavaScript-based
                  frameworks and libraries. I am interested in reading books on
                  varius topics such as psychology, sociology, philosophy,
                  history, and enjoy cycling and taking photographs.
                </motion.p>
                <motion.a href="#resume">
                  my resume <br />
                  <ArrowDownIcon />
                </motion.a>
              </Box>
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
