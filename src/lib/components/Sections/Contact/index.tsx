import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useWillChange,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  const ref2 = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref2 });
  const y = useTransform(scrollYProgress, [0.7, 1], [-250, 0]);

  return (
    <motion.section
      id="contact"
      style={{
        willChange,
        display: "flex",
        alignItems: "center",
        paddingTop: "5em",
      }}
      layoutScroll
      ref={ref}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            ref={ref2}
            style={{
              padding: "1em",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "baseline",
              width: "100vw",
              minHeight: "50vh",
            }}
          >
            <motion.div style={{ y }}>
              <motion.h2>Portfolio</motion.h2>
              <Link href="/projects" className="underlined underlinedThick">
                my recent projects
                <ArrowForwardIcon />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
