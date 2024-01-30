import {
  useWillChange,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useVelocity,
} from "framer-motion";
import { cubicBezier, circOut } from "framer-motion";

import { useEffect, useRef } from "react";

export default function MotionItemY({ start, end, title, text }: any) {
  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [start, end], [-100, 0]);

  const x = useMotionValue(0);
  const xVelocity = useVelocity(x);

  useEffect(() => {
    return xVelocity.onChange((latestVelocity) => {
      console.log("Velocity", latestVelocity);
    });
  }, []);

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
          // transition: '0.7s ease-in-out',
          y,
        }}
      >
        {title}
      </motion.h4>
      <motion.p
        style={{
          // transition: '0.6s ease-in-out',
          y,
          x,
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
