"use client";

import {
  motion,
  useIsPresent,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";

import { projects } from "~/lib/components/data/data";
import Card from "~/lib/components/motion/Card";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import CopyRight from "~/lib/components/motion/View/CopyRight";

const Projects = () => {
  const isPresent = useIsPresent();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const willChange = useWillChange();

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);

  return (
    <main className="relative h-full w-full m-auto bg-black">
      <div className="bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />

      <Menu />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[2]"
      />

      <div className="fixed flex top-[10%]">
        <h1>Projects</h1>
      </div>
      <motion.section
        ref={ref}
        layoutScroll
        id="projects"
        className="h-[500vh]"
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen">
          <motion.ul
            className="flex list-none py-1 h-[50vh]"
            style={{
              willChange,
              x,
            }}
          >
            {projects?.map((project: any) => {
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
      <div className="sticky bottom-0">
        <ParallaxText baseVelocity={0.01}>
          {" "}
          ✳︎ Portfolio ✳︎ Projects
        </ParallaxText>
        <CopyRight />
      </div>
    </main>
  );
};

export default Projects;
