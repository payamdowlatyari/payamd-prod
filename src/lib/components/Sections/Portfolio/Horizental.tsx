import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Card from "../../motion/Card";
import data from "./data";

export default function Horizental() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });

  return (
    <motion.section
      id="projects"
      style={{
        height: "110vh",
      }}
    >
      <svg
        style={{
          position: "absolute",
          transform: "rotate(-90deg)",
          top: "7em",
          left: "1em",
        }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="30" pathLength="1" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          style={{ pathLength: scrollXProgress, stroke: "lightgray" }}
        />
      </svg>
      {/* <motion.div style={{ width: '100vw', height: '10vh', position: 'fixed', top: '0'}}></motion.div> */}
      <ul ref={ref} className="cards">
        {data?.map((project: any) => {
          return (
            <li className="card">
              <Card item={project} />
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
