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
import TextReveal from "../../motion/TextReveal";

const FadeInItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  return (
    <motion.div layout ref={ref} className="service-section">
      <h2>{service.name}</h2>
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <p>
              <TextReveal text={service.text} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Services() {
  const willChange = useWillChange();
  const ref = useRef(null);

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [2000, 4000], [0, 2000]);

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
      <div className="second sec-side">
        <div>
          <h3>
            <TextReveal text="About Me" />
          </h3>
          <HoverLink title="resume and skills" url="/about" />
          <ArrowForwardIcon />
        </div>
        <div>
          <h3>
            <TextReveal text="My Work" />
          </h3>
          <HoverLink title="my recent projects" url="/projects" />
          <ArrowForwardIcon />
        </div>
      </div>
      <motion.div
        className="section-number"
        style={{
          margin: "auto",
          willChange,
          y,
        }}
      >
        02
      </motion.div>
      <div
        style={{
          display: "grid",
          padding: "1em",
          justifyContent: "flex-end",
        }}
      >
        {data?.map((service) => {
          return <FadeInItem service={service} />;
        })}
      </div>
    </motion.section>
  );
}
