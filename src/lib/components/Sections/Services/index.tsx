import {
  useWillChange,
  useScroll,
  useTransform,
  motion,
  easeIn,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";

export default function Services() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [1000, 1500], [1400, -1400], {
    ease: easeIn,
  });

  return (
    <motion.section
      id="services"
      layoutScroll
      style={{
        willChange,
        maxWidth: "100vw",
        overflow: "hidden",
        alignItems: "flex-start",
        mixBlendMode: "color-burn",
      }}
    >
      <motion.div
        layout
        style={{
          display: "flex",
          justifyContent: "center",
          willChange,
        }}
      >
        {data?.map((service) => {
          return (
            <motion.div
              ref={ref}
              style={{
                width: "400px",
                maxWidth: "100vw",
                margin: "1em",
                padding: "1em",
                background: "lightslategray",
                x,
              }}
            >
              <motion.h3>{service.name}</motion.h3>
              <motion.p>{service.text}</motion.p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
