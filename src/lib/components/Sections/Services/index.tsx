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
import StaggerText from "react-stagger-text";

const FadeInItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  return (
    <motion.div layout ref={ref} className="service-section">
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <h2>
              <StaggerText
                staggerType="letter"
                staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                staggerDuration={1}
                startDelay={0.5}
              >
                {service.name}
              </StaggerText>
            </h2>
            <p>
              <StaggerText
                staggerType="word"
                staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                staggerDuration={0.5}
                startDelay={0.1}
              >
                {service.text}
              </StaggerText>
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
  const y = useTransform(scrollY, [2000, 4200], [0, 2500]);

  return (
    <motion.section
      ref={ref}
      id="services"
      className="service-wrapper"
      layoutScroll
    >
      <div className="sec-side">
        <div>
          <h4>
            <TextReveal text="About" />
          </h4>
          <HoverLink title="resume and skills" url="/about" />
          <ArrowForwardIcon />
        </div>
        <div>
          <h4>
            <TextReveal text="Portfolio" />
          </h4>
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
        <span>02</span>
        <span className="section-title-bg">What I do</span>
      </motion.div>
      <div className="service-container">
        {data?.map((service) => {
          return <FadeInItem service={service} />;
        })}
      </div>
    </motion.section>
  );
}
