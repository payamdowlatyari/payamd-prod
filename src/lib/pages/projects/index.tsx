"use client";

import {
  motion,
  useIsPresent,
  useScroll,
  useSpring,
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });
  return (
    <main className="relative h-full w-full m-auto bg-black">
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="fixed left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
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
        <div className="fixed z-[998] -top-4 left-3">
          <Logo light size={60} />
        </div>
      </motion.section>
      <div className="sticky bottom-0">
        <ParallaxText baseVelocity={0.01}>
          {" "}
          ✳︎ Portfolio ✳︎ Projects
        </ParallaxText>
        <CopyRight />
      </div>
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-ultra-light-gray"
        style={{ scaleX }}
      />
    </main>
  );
};

export default Projects;
