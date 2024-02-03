import { useWillChange, useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import ParallaxText from "../../motion/ParallaxText";

const FadeInItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const scale = useTransform(scrollY, service.display, [0.8, 1]);
  const opacity = useTransform(scrollY, service.display, [0, 1]);

  return (
    <motion.div
      layout
      ref={ref}
      style={{
        willChange,
        width: "500px",
        maxWidth: "100vw",
        margin: "10em 1em 10em",
        padding: "2em",
        scale,
        opacity,
      }}
    >
      <motion.h3>{service.name}</motion.h3>
      <motion.p>{service.text}</motion.p>
    </motion.div>
  );
};

export default function Services() {
  const willChange = useWillChange();

  return (
    <motion.section
      id="services"
      layoutScroll
      style={{
        willChange,
        maxWidth: "100vw",
        overflow: "hidden",
        display: "block",
        padding: "5em 0",
      }}
    >
      {/* <motion.div 
         style={{
            willChange,
            // maxWidth: "100vw",
         }}
        > */}
      <ParallaxText baseVelocity={0.1}>
        Professional Services Professional Services
      </ParallaxText>
      {/* </motion.div> */}
      <motion.div
        layout
        style={{
          display: "grid",
          justifyContent: "center",
          willChange,
          //   padding: '5em 0'
        }}
      >
        {data?.map((service) => {
          return <FadeInItem service={service} />;
        })}
      </motion.div>
    </motion.section>
  );
}
