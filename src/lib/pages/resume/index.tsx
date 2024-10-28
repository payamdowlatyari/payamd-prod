"use client";

import {
  motion,
  useSpring,
  useScroll,
  useWillChange,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { resume } from "~/lib/components/data/data";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import { HoverEffect } from "~/lib/components/motion/Card";
import IconCloud from "~/lib/components/motion/IconCloud";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";

const ResumeRoute = () => {
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const ref = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [1000, 13000], ["10%", "-120%"], {
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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <div className="relative flex flex-col gap-4 h-screen w-screen items-center justify-center overflow-hidden p-8 z-[2] mx-auto">
        <BlurFade delay={0.5} inView>
          <h1 className="relative z-10 text-xl sm:text-5xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center tracking-tighter">
            Resume
          </h1>
        </BlurFade>
        <BlurFade delay={0.75} inView>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-center text-lg relative z-10">
            Here you can find my resume including my education, experience,
            certifications, publications, and skills.
          </p>
        </BlurFade>
      </div>
      <motion.section
        id="resume"
        className="block top-0 max-w-[100vw] overflow-hidden h-[1400vh] p-0"
        ref={ref}
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
            {resume && resume?.length > 0 ? (
              resume?.map((section) => (
                <li className="w-screen">
                  <div className="flex flex-row justify-center items-center h-screen m-1 z-0">
                    <div className="flex flex-col justify-center max-w-[98vw] h-[90vh] overflow-hidden z-10">
                      <div className="flex flex-col-reverse px-4">
                        <BlurFade delay={0.5} inView>
                          <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
                            {section.section}
                          </h3>
                        </BlurFade>
                      </div>

                      <div className="max-w-[98vw] flex flex-col justify-evenly">
                        <BlurFade delay={1} inView>
                          <HoverEffect items={section.items} />
                        </BlurFade>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col justify-evenly h-screen">
                <div className="flex flex-col-reverse px-4">
                  <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
                    Resume
                  </h3>
                </div>
              </div>
            )}
          </motion.ul>
        </div>
      </motion.section>
      <motion.div layout style={{ opacity }} className="sticky bottom-0 z-[2]">
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
          <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.2vw]">
            Skills
          </h3>
        </BlurFade>
        <IconCloud />
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
