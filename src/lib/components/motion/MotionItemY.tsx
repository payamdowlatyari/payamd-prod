import { useWillChange, useScroll, useTransform, motion } from "framer-motion";

import { useRef } from "react";

export default function MotionItemY({ start, end, title, text }: any) {
  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [start, end], [-100, 0]);

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
          y,
        }}
      >
        {title}
      </motion.h4>
      <motion.p
        style={{
          y,
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
