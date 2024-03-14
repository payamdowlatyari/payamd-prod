import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import Card from "../../motion/Card";
import data from "./data";
import Logo from "../../motion/Menu/Logo";

export default function Horizental() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const willChange = useWillChange();

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);

  return (
    <motion.section
      ref={ref}
      layoutScroll
      id="projects"
      className="portfolio-wrapper"
    >
      <div className="portfolio-container">
        <motion.ul
          style={{
            willChange,
            x,
          }}
        >
          {data?.map((project: any) => {
            return (
              <li>
                <Card item={project} />
              </li>
            );
          })}
        </motion.ul>
      </div>
      <div className="logo-pd">
        <Logo light size="60px" />
      </div>
      <svg width="50" height="50" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="3"
          style={{
            pathLength: scrollYProgress,
            willChange,
          }}
        />
      </svg>
    </motion.section>
  );
}
