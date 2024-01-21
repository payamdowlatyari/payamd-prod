import {
  motion,
  useInView,
  AnimatePresence,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Gallery() {
  const gallery = useRef(null);
  const isInView = useInView(gallery);
  const willChange = useWillChange();

  return (
    <motion.section
      id="projects"
      layoutScroll
      style={{
        height: "auto",
        willChange,
      }}
    >
      <motion.ul
        layout
        style={{ willChange }}
        ref={gallery}
        className="gallery-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.li
                layout
                key={index}
                style={{ willChange }}
                className="gallery-item"
                variants={item}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{
                  duration: 1,
                  delay: 0.2 * index,
                }}
              />
            )}
          </AnimatePresence>
        ))}
      </motion.ul>
    </motion.section>
  );
}
