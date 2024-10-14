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

  const ref2 = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const { scrollY } = useScroll({ target: ref2 });
  const willChange = useWillChange();

  const x = useTransform(
    scrollY,
    [0, 3000, 6000, 9000],
    ["50%", "35%", "-35%", "-50%"]
  );
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.01,
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
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
        className="h-[1000vh]"
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[2]">
          <motion.ul
            ref={ref2}
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
        ref={ref2}
        className="fixed bottom-0 left-0 right-0 h-2 z-10 origin-[0%] bg-gray-50"
        style={{ scaleX }}
      />
    </motion.main>
  );
};

export default Projects;
