import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import {
  motion,
  useInView,
  AnimatePresence,
  useWillChange,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  const ref2 = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref2 });
  const y = useTransform(scrollYProgress, [0.3, 0.6], [-300, 0]);

  return (
    <motion.section
      id="about"
      ref={ref}
      layoutScroll
      style={{
        willChange,
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              willChange,
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              height: "100vh",
            }}
          >
            <motion.div
              style={{
                maxWidth: "750px",
              }}
            >
              <Box p={3} style={{ background: "lightgray" }}>
                <motion.h1>About</motion.h1>
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                >
                  My name is <b>Payam Dowlatyari</b>.
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  I am a software engineer, UX designer, photographer, and
                  blogger. I studied Software Engineering at UC Irvine and
                  graduated in 2020. I have been working in Silicon Valley as a
                  full-stack web developer since then with focus on the design
                  and implementation of user interfaces using JavaScript-based
                  frameworks and libraries. I am interested in reading books on
                  varius topics such as psychology, sociology, philosophy,
                  history, and enjoy cycling and taking photographs.
                </motion.p>
              </Box>
            </motion.div>
            <motion.div
              ref={ref2}
              style={{
                willChange,
                alignSelf: "center",
                y,
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 2.5,
                  ease: "easeInOut",
                }}
              >
                <motion.h1>More</motion.h1>
                <Link href="/about" className="underlined underlinedThin">
                  resume and skills {"  "}
                  <ArrowForwardIcon />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 3,
                  ease: "easeInOut",
                }}
              >
                <Link href="/projects" className="underlined underlinedThin">
                  my recent projects{"  "}
                  <ArrowForwardIcon />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
