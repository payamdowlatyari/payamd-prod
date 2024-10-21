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

import IconCloud from "~/lib/components/motion/IconCloud";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import Certificates from "~/lib/components/Sections/Resume/Certificates";
import Education from "~/lib/components/Sections/Resume/Education";
import Experience from "~/lib/components/Sections/Resume/Experience";
import Publications from "~/lib/components/Sections/Resume/Publications";
import Footer from "~/lib/layout/Footer";

const slugs = [
  "typescript",
  "javascript",
  "java",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "amazonaws",
  "mysql",
  "mongodb",
  "framer",
  "vercel",
  "jest",
  "docker",
  "git",
  "jira",
  "github",
  "visualstudiocode",
  "figma",
  "npm",
  "yarn",
  "reactrouter",
  "tailwindcss",
  "bootstrap",
  "graphql",
];

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
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
      <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 mx-auto">
        <IconCloud iconSlugs={slugs} />
      </div>
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-2 origin-[0%] z-10 bg-neutral-50"
        style={{ scaleX, zIndex: 2, willChange: "transform" }}
      />
    </motion.main>
  );
};

export default ResumeRoute;
