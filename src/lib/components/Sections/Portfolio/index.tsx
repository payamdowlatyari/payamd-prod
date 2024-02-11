import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "../../motion/Card";
import data from "./data";

export default function Horizental() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <motion.section
      ref={ref}
      id="projects"
      style={{
        height: "200vh",
      }}
    >
      <div
        style={{
          position: "fixed",
          display: "flex",
          top: "0",
          overflow: "hidden",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.ul
          style={{
            display: "flex",
            listStyle: "none",
            padding: "5px 0",
            height: "55vh",
            x,
          }}
        >
          {data?.map((project: any) => {
            return (
              <li
                style={{
                  width: "45em",
                  maxWidth: "95vw",
                  padding: "10px",
                  margin: "0 5em",
                }}
              >
                <Card item={project} />
              </li>
            );
          })}
        </motion.ul>
      </div>
      <svg
        style={{
          position: "fixed",
          transform: "rotate(-90deg)",
          top: "1em",
          right: "1em",
        }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="3"
          style={{
            pathLength: scrollYProgress,
            stroke: "#c2a76b",
            strokeDashoffset: "0",
            strokeWidth: "15%",
            fill: "none",
          }}
        />
      </svg>
    </motion.section>
  );
}
