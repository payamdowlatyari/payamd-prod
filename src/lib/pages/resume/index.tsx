"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

import { resume } from "~/lib/components/data/data";
import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import { HoverEffect } from "~/lib/components/motion/Card";
import IconCloud from "~/lib/components/motion/IconCloud";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import Footer from "~/lib/layout/Footer";

/**
 * ResumeRoute component
 * @returns {JSX.Element}
 */
const Resume = (): JSX.Element => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [1500, 13000], ["20%", "-120%"], {
    clamp: false,
  });
  const opacity = useTransform(
    scrollY,
    [0, 11000, 11500, 12000],
    [1, 1, 0, 0],
    {
      clamp: false,
    }
  );

  return (
    <motion.main
      className="bg-black"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Menu />
      <div className="relative flex flex-col gap-4 h-screen w-screen items-center justify-center overflow-hidden p-8 z-0 mx-auto">
        <BlurFade delay={0.5} inView>
          <GridBeam className="sm:pl-16 pt-28 pl-4 flex">
            <div className="grid gap-2">
              <h1 className="text-5xl sm:text-7xl font-semibold max-w-sm text-center">
                Resume
              </h1>
              <p className="text-neutral-400 max-w-sm text-center">
                Here is a summary of my experience, education, professional
                certifications, academic publications, and technical skills.{" "}
              </p>
              <p className="text-neutral-100 mx-auto z-10 flex flex-col items-center text-center gap-2 mt-12">
                Scroll down
                <IoIosArrowRoundDown />
              </p>
            </div>
          </GridBeam>
        </BlurFade>
      </div>
      <motion.section
        id="resume"
        className="block top-0 max-w-screen-lg overflow-hidden h-[1400vh] p-0"
        ref={ref}
        layoutScroll
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[2]">
          <motion.ul
            className="fixed flex list-none h-screen"
            style={{
              x,
            }}
          >
            {resume.map((section) => (
              <li className="w-screen max-w-screen-lg" key={section.section}>
                <div className="flex flex-row justify-center items-center h-screen m-1 z-0">
                  <div className="flex flex-col justify-center max-w-[98vw] h-[90vh] overflow-hidden z-10">
                    <div className="flex flex-col-reverse px-4">
                      <BlurFade delay={0.5} inView>
                        <div className="w-full flex mt-2 items-center justify-center">
                          <h2 className="text-center text-5xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-700 select-none">
                            {section.section}
                          </h2>
                        </div>
                      </BlurFade>
                    </div>

                    <div className="max-w-screen-lg flex flex-col justify-evenly">
                      <BlurFade delay={1} inView>
                        <HoverEffect items={section.items} />
                      </BlurFade>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>
      <motion.div layout style={{ opacity }} className="sticky bottom-0 z-10">
        <div className="absolute left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent z-10 bg-opacity-50" />
        <div className="absolute right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent z-10 bg-opacity-50" />
        <Marquee>
          {Object.values(Logos).map((Logo) => (
            <div
              key={Logo.name}
              className="relative scale-75 hover:scale-100 transition h-full w-fit mx-[0.5rem] flex items-center justify-start"
            >
              <Logo />
            </div>
          ))}
        </Marquee>
      </motion.div>

      <div className="relative flex flex-wrap gap-4 size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-10 pb-10 pt-8 mx-auto">
        <BlurFade delay={0.5} inView>
          <div className="w-full flex mt-4 items-center justify-center">
            <h2 className="text-center text-5xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-700 select-none">
              Skills
            </h2>
          </div>
        </BlurFade>
        <IconCloud />
      </div>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default Resume;
