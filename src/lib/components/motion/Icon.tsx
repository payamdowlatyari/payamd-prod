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

export default function Icon({ id, del }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      style={{
        width: "4em",
        overflow: "visible",
        stroke: "black",
        strokeWidth: "2",
        strokeLinejoin: "round",
        strokeLinecap: "round",
        padding: "0.3em",
      }}
    >
      {/* <AnimatePresence initial={false}>
        {isInView && ( */}
      <motion.path
        d={id}
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { delay: del, duration: 2, ease: "easeInOut" },
          fill: { duration: 1, ease: [0, 0, 0.8, 1] },
        }}
      />
      {/* )}
      </AnimatePresence>  */}
    </motion.svg>
  );
}
