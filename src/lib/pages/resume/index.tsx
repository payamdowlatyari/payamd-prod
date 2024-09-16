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

import { BackgroundGradientAnimation } from "~/lib/components/motion/BackgroundGradientAnimation";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import { InitialTransition } from "~/lib/components/motion/Transition";
import Certificates from "~/lib/components/Sections/Resume/Certificates";
import Education from "~/lib/components/Sections/Resume/Education";
import Experience from "~/lib/components/Sections/Resume/Experience";
import Publications from "~/lib/components/Sections/Resume/Publications";
import Footer from "~/lib/layout/Footer";

const ResumeRoute = () => {
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [100, 14000], ["0%", "-120%"], {
    clamp: false,
  });
  const opacity = useTransform(scrollY, [0, 12000, 13000], [1, 1, 0], {
    clamp: false,
  });

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
    Logos.jest,
    Logos.aws,
    Logos.git,
    Logos.npm,
    Logos.vscode,
    Logos.vercel,
  ];

  return (
    <>
      <Menu />
      <InitialTransition />
      <motion.section
        id="resume"
        className="block top-0 max-w-[100vw] overflow-hidden h-[1400vh] p-0"
        ref={resume}
        layoutScroll
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[1]">
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
        <div className="fixed z-[998] top-1 left-3">
          <Logo light size={60} />
        </div>
      </motion.section>

      <motion.div layout style={{ opacity }} className="sticky bottom-0 z-[2]">
        <Marquee>
          {arr.map((Logo) => (
            <div className="relative scale-75 hover:scale-100 transition h-full w-fit mx-[0.5rem] flex items-center justify-start">
              <Logo />
            </div>
          ))}
        </Marquee>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center items-center content-end h-screen m-auto max-w-96 pb-20">
        {arr.map((Logo) => (
          <span className="m-1 z-[2]">
            <Logo />
          </span>
        ))}
      </div>
      <BackgroundGradientAnimation />
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-neutral-400"
        style={{ scaleX }}
      />
    </>
  );
};

export default ResumeRoute;
