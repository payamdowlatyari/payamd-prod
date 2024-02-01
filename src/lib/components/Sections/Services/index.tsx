import { useWillChange, useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { data } from "./data";

const FadeInItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, service.display, [-300, 0, 0, -300]);
  const y = useTransform(scrollY, service.display, [100, 0, 0, -100]);
  const scale = useTransform(scrollY, service.display, [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollY, service.display, [0, 1, 1, 0]);

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
        color: "black",
        backgroundImage: "linear-gradient(to top, #dfe9f3 0%, white 100%)",
        x,
        y,
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
        alignItems: "flex-start",
      }}
    >
      <motion.div
        layout
        style={{
          justifyContent: "center",
          willChange,
        }}
      >
        {data?.map((service) => {
          return <FadeInItem service={service} />;
        })}
      </motion.div>
    </motion.section>
  );
}
