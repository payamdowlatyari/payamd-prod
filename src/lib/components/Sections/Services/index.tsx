import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import StaggerText from "react-stagger-text";

const FadeInItem = ({ service }: any) => {
  const willChange = useWillChange();

  return (
    <motion.div
      layout
      className="second"
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: "linear",
        delay: service.display[0],
      }}
      style={{
        willChange,
        width: "300px",
        maxWidth: "100vw",
        margin: "0.25em",
        padding: "0.5em",
        fontSize: "0.8em",
        borderRadius: "5px",
      }}
    >
      <motion.h6
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
      </motion.h6>
      <motion.p
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
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

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [1300, 2000], [0, 600]);

  return (
    <motion.section
      ref={ref}
      id="services"
      layoutScroll
      style={{
        willChange,
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <motion.div
        style={{
          height: "200px",
          width: "100%",
          letterSpacing: "-0.1em",
          right: "0",
          top: "0",
          position: "absolute",
          zIndex: "-1",
          mixBlendMode: "overlay",
          fontSize: "20em",
          y,
        }}
      >
        02
      </motion.div>
      <motion.div
        style={{
          willChange,
          margin: "auto",
        }}
      >
        <h1>
          <StaggerText
            staggerType="letter"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={1}
            startDelay={0.5}
          >
            Services
          </StaggerText>
        </h1>
        <HoverLink title="my recent projects" url="/projects" />
        <ArrowForwardIcon />
      </motion.div>

      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              display: "grid",
              padding: "1em",
              justifyContent: "flex-end",
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
