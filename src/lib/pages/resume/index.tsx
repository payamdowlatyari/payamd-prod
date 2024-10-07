/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import {
  motion,
  useSpring,
  useScroll,
  useWillChange,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import Certificates from "~/lib/components/Sections/Resume/Certificates";
import Education from "~/lib/components/Sections/Resume/Education";
import Experience from "~/lib/components/Sections/Resume/Experience";
import Publications from "~/lib/components/Sections/Resume/Publications";
import Footer from "~/lib/layout/Footer";

const ResumeRoute = () => {
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [100, 13000], ["0%", "-120%"], {
    clamp: false,
  });
  const opacity = useTransform(
    scrollY,
    [0, 12000, 12500, 13000],
    [1, 1, 0, 0],
    {
      clamp: false,
    }
  );

  const arr = [
    Logos.html5,
    Logos.css3,
    Logos.javascript,
    Logos.typescript,
    Logos.framer,
    Logos.reactjs,
    Logos.tailwindcss,
    Logos.nextjs,
    Logos.nodejs,
    Logos.java,
    Logos.express,
    Logos.mongodb,
    Logos.mysql,
    Logos.graphql,
    Logos.jest,
    Logos.aws,
    Logos.git,
    Logos.npm,
    Logos.docker,
    Logos.vscode,
    Logos.vercel,
  ];

  return (
    <main className="bg-black">
      <Menu />
      <motion.section
        id="resume"
        className="block top-0 max-w-[100vw] overflow-hidden h-[1400vh] p-0"
        ref={resume}
        layoutScroll
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[2]">
          <motion.ul
            className="fixed flex list-none h-screen"
            style={{
              willChange,
              x,
            }}
          >
            <li className="w-screen">
              <Experience />
            </li>
            <li className="w-screen">
              <Education />
            </li>
            <li className="w-screen">
              <Certificates />
            </li>
            <li className="w-screen">
              <Publications />
            </li>
          </motion.ul>
        </div>
      </motion.section>

      <motion.div layout style={{ opacity }} className="sticky bottom-0 z-[2]">
        <Marquee>
          {arr.map((Logo) => (
            <div
              key={Logo.name}
              className="relative scale-75 hover:scale-100 transition h-full w-fit mx-[0.5rem] flex items-center justify-start"
            >
              <Logo />
            </div>
          ))}
        </Marquee>
      </motion.div>
      <motion.div
        layout
        className="flex flex-row flex-wrap justify-between items-center content-end h-full m-auto max-w-screen-sm p-2"
      >
        {arr.map((Logo) => (
          <div
            key={Logo.name}
            className="m-[2px] md:m-1 relative scale-75 md:scale-100 hover:scale-125 transition z-[2]"
          >
            <Logo />
          </div>
        ))}
      </motion.div>
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-2 origin-[0%] z-10 bg-neutral-50"
        style={{ scaleX, zIndex: 2, willChange: "transform" }}
      />
    </main>
  );
};

export default ResumeRoute;
