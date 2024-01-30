import {
  useWillChange,
  useScroll,
  useTransform,
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

export default function MotionItemX({ start, end, title, text }: any) {
  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [start, end], [0, 20]);

  return (
    <motion.div
      layout
      ref={ref}
      style={{
        width: "25em",
        willChange,
      }}
    >
      <motion.h4
        style={{
          transition: "0.3s ease-in-out",
          x,
        }}
      >
        {title}
      </motion.h4>
      <motion.p
        style={{
          transition: "0.5s ease-in-out",
          x,
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
