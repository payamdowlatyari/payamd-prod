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
import { data } from "./data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  const ref2 = useRef(null);
  const { scrollY } = useScroll({ target: ref2 });
  const y = useTransform(scrollY, [800, 1200], [0, 100]);
  const x = useTransform(scrollY, [300, 500, 1000, 1200], [-300, 0, 0, 300]);
  const scale = useTransform(scrollY, [300, 500, 1000, 1200], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollY, [300, 500, 1000, 1200], [0, 1, 1, 0]);

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
                x,
                scale,
                opacity,
              }}
            >
              <Box p={3}>
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
                  {data.title}
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
                  {data.text}
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
              <motion.h1>More</motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  willChange,
                  display: "grid",
                }}
              >
                <Link href="/about" className="underlined underlinedThin">
                  resume and skills {"  "}
                  <ArrowForwardIcon />
                </Link>
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
