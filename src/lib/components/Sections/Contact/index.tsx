import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpIcon } from "@chakra-ui/icons";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.section
      id="contact"
      style={{
        display: "flex",
        alignItems: "start",
        justifyContent: "",
        paddingTop: "5em",
      }}
      layoutScroll
      ref={ref}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.8,
              delay: 0.5,
            }}
          >
            <motion.div style={{ paddingLeft: "1em" }}>
              <motion.h1>contact</motion.h1>
              <motion.a href="#home">
                <ArrowUpIcon />
                <br />
                top
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
