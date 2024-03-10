import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "../../motion/Card";
import data from "./data";
import Logo from "../../motion/Menu/Logo";

export default function Horizental() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);

  return (
    <motion.section
      ref={ref}
      id="projects"
      style={{
        height: "500vh",
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
            height: "100vh",
            x,
          }}
        >
          {data?.map((project: any) => {
            return (
              <li
                style={{
                  width: "100vw",
                  padding: "1em",
                }}
              >
                <Card item={project} />
              </li>
            );
          })}
        </motion.ul>
      </div>
      <div className="logo-pd">
        <Logo light size="60px" />
      </div>
      <svg
        style={{
          position: "fixed",
          transform: "rotate(-90deg)",
          top: "3em",
          right: "1em",
        }}
        width="50"
        height="50"
        viewBox="0 0 100 100"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="3"
          style={{
            pathLength: scrollYProgress,
            stroke: "#e1e1e1",
            strokeDashoffset: "0",
            strokeWidth: "5%",
            fill: "none",
          }}
        />
      </svg>
    </motion.section>
  );
}
