import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

import Card from "../../motion/Card";
import Logo from "../../motion/Menu/Logo";

import data from "./data";

export default function Horizental() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const willChange = useWillChange();

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);

  return (
    <motion.section ref={ref} layoutScroll id="projects" className="h-[500vh]">
      <div className="fixed flex top-0 overflow-hidden items-center h-screen">
        <motion.ul
          className="flex list-none py-1 h-[50vh]"
          style={{
            willChange,
            x,
          }}
        >
          {data?.map((project: any) => {
            return (
              <li className="p-[1vw] max-w-[100vw] h-[50vh]">
                <Card item={project} />
              </li>
            );
          })}
        </motion.ul>
      </div>
      <div className="fixed z-[998] -top-4 left-3">
        <Logo light size={60} />
      </div>
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        className="fixed -rotate-90 top-12 right-5"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="3"
          style={{
            pathLength: scrollYProgress,
            willChange,
          }}
          className="fill-none stroke-[5%] stroke-apple"
        />
      </svg>
    </motion.section>
  );
}
