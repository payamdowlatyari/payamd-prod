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
import { ThreeDCardDemo } from "~/lib/components/motion/Card";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import CopyRight from "~/lib/components/motion/View/CopyRight";

const Projects = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const willChange = useWillChange();

  const x = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });
  return (
    <main className="bg-black">
      <Menu />
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
            className="flex list-none py-1 h-[60vh]"
            style={{
              willChange,
              x,
            }}
          >
            {projects?.map((item: any) => {
              return (
                <li className="p-[1vw] max-w-[100vw] min-w-fit h-[50vh]">
                  <ThreeDCardDemo item={item} />
                </li>
              );
            })}
          </motion.ul>
        </div>
      </motion.section>
      <div className="m-auto sticky bottom-0 z-[2]">
        <ParallaxText baseVelocity={0.01}>
          {" "}
          ✳︎ Portfolio ✳︎ Projects
        </ParallaxText>
        <CopyRight />
      </div>
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-10 h-2 origin-[0%] bg-neutral-50"
        style={{ scaleX }}
      />
    </main>
  );
};

export default Projects;
