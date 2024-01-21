import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "#1e2125",
  },
  visible: {
    pathLength: 1,
    fill: "#1e2125",
  },
};

export default function Icon(id: any) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="svg-item"
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.path
            d={id}
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut" },
              fill: { duration: 2, ease: [1, 0, 0.8, 1] },
            }}
          />
        )}
      </AnimatePresence>
    </motion.svg>
  );
}
