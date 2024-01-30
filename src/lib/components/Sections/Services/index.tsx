import {
  useWillChange,
  useScroll,
  useTransform,
  motion,
  useInView,
  cubicBezier,
  easeIn,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ParallaxText from "../../motion/ParallaxText";

export default function Services() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0.5, 0.9], [-1000, 1000], {
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
      }}
    >
      <motion.div
        layout
        style={{
          display: "flex",
          alignSelf: "flex-start",
          justifyContent: "space-evenly",
          willChange,
        }}
      >
        {data?.map((service) => {
          return (
            <motion.div
              ref={ref}
              style={{
                width: "500px",
                maxWidth: "100vw",
                margin: "1em",
                padding: "1em",
                background: "lightgray",
                x,
              }}
            >
              <motion.h3
                style={{
                  transition: "2s ease-in-out",
                }}
              >
                {service.name}
              </motion.h3>
              <motion.p
                style={{
                  transition: "2.2s ease-in-out",
                }}
              >
                {service.text}
              </motion.p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
