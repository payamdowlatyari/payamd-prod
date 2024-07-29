"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";

import { projects } from "~/lib/components/data/data";
import Card from "~/lib/components/motion/Card";
import { BackgroundGradientAnimation } from "~/lib/components/motion/BackgroundGradientAnimation";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import { InitialTransition } from "~/lib/components/motion/Transition";
import CopyRight from "~/lib/components/motion/View/CopyRight";

const Projects = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const willChange = useWillChange();

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });
  return (
    <>
      <Menu />
      <InitialTransition />
      <div className="fixed flex top-[8%] z-[1]">
        <h1 className="text-5xl md:text-7xl lg:text-9xl ml-2 tracking-tighter">
          Projects
        </h1>
      </div>
      <motion.section
        ref={ref}
        layoutScroll
        id="projects"
        className="h-[500vh]"
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[2]">
          <motion.ul
            className="flex list-none py-1 h-[55vh]"
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
        <div className="fixed z-[998] top-1 left-3">
          <Logo light size={60} />
        </div>
      </motion.section>
      <BackgroundGradientAnimation />

      <div className="sticky bottom-0 z-[2]">
        <ParallaxText baseVelocity={0.01}>
          {" "}
          ✳︎ Portfolio ✳︎ Projects
        </ParallaxText>
        <CopyRight />
      </div>
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-neutral-200"
        style={{ scaleX }}
      />
    </>
  );
};

export default Projects;
