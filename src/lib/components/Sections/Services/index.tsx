import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import ParallaxText from "../../motion/ParallaxText";

const FadeInItem = ({ service }: any) => {
  const willChange = useWillChange();

  return (
    <motion.div
      layout
      className="second"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: "linear",
        delay: service.display[0],
      }}
      style={{
        willChange,
        mixBlendMode: "difference",
        width: "500px",
        maxWidth: "100vw",
        margin: "0.5em",
        padding: "2em",
      }}
    >
      <motion.h4
        layout
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: service.display[0],
          ease: "easeInOut",
        }}
        style={{
          willChange,
        }}
      >
        {service.name}
      </motion.h4>
      <motion.p
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.75,
          delay: service.display[1],
          ease: "easeInOut",
        }}
        style={{
          willChange,
        }}
      >
        {service.text}
      </motion.p>
    </motion.div>
  );
};

export default function Services() {
  const willChange = useWillChange();
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.section
      ref={ref}
      id="services"
      layoutScroll
      style={{
        willChange,
        maxWidth: "100vw",
        overflow: "hidden",
        display: "block",
        padding: "1em 0",
      }}
    >
      <ParallaxText baseVelocity={-0.1}>
        My Professional Services What I do
      </ParallaxText>
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "1em 0",
              margin: "0.25em",
              justifyContent: "space-evenly",
              willChange,
            }}
          >
            {data?.map((service) => {
              return <FadeInItem service={service} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
