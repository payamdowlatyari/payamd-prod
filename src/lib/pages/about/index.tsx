"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

import { resume } from "~/lib/components/data/data";
import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import { ResumeCard } from "~/lib/components/motion/Card";
import { LinkPreview } from "~/lib/components/motion/LinkPreview";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import Footer from "~/lib/layout/Footer";

/**
 * About component
 * @returns {JSX.Element}
 */
const About = (): JSX.Element => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [2500, 15000], ["20%", "-120%"], {
    clamp: false,
  });
  const opacity = useTransform(
    scrollY,
    [0, 1000, 1500, 13000, 15000],
    [0, 0, 1, 0, 0],
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

      <section
        id="about"
        className="flex flex-wrap relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-col flex-1 flex-wrap md:flex-nowrap items-baseline z-10">
          <motion.div className="absolute mt-40 sm:mt-[25vh] mx-1 w-screen flex flex-wrap items-center justify-evenly">
            <BlurFade delay={0.5} inView>
              <GridBeam className="pl-4 sm:pl-16 pt-14 sm:pt-28 flex">
                <div className="grid gap-2">
                  <h1 className="text-5xl sm:text-7xl font-semibold max-w-sm">
                    About
                  </h1>
                  <p className="text-neutral-400 md:text-lg max-w-lg">
                    My name is Payam Dowlatyari a Software Engineer in
                    California
                  </p>
                </div>
              </GridBeam>
            </BlurFade>

            <BlurFade delay={0} inView>
              <Image
                src="/me-ai-red_processed.jpeg"
                width={400}
                height={400}
                alt="me"
                className="opacity-80 hover:opacity-100 scale-75 md:scale-100"
                loading="lazy"
              />
            </BlurFade>
          </motion.div>
          <ScrollReveal className="text-lg sm:text-xl md:text-2xl text-neutral-200 z-10 mx-auto">
            After obtaining my B.S. in Software Engineering from UC Irvine in
            2020, I entered the tech industry and worked at Amplify.ai for three
            years developing AI applications. I satrted working as a software
            engineer and web application architect at Avalon AI to improve
            healthcare services in the United States. Having the opportunity to
            study at UCI and work in an innovative start-up environments, I have
            improved my technical and soft skills, uncovered my passion for
            design, and expanded my mastery in software development in recent
            years. Meanwhile, I dedicated time to learning new skills and
            completed a 9-month postgraduate program in full-stack web
            development. Likewise, I gained hands-on experience with different
            tools, such as JS/TS-based frameworks, including React.js,
            server-side technologies such as Node.js, automation and DevOps
            tools, and database technologies such as SQL and NoSQL databases, as
            well as cloud technologies such as AWS, Google Cloud, and Microsoft
            Azure. I am a team player, and I am always willing to learn new
            skills and improve my skills. I have a great interest in learning
            new technologies and am always looking for new challenges.
          </ScrollReveal>
        </div>
      </section>
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
        className="block top-0 max-w-screen-lg overflow-hidden h-[1200vh] p-0"
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
                        <ResumeCard items={section.items} />
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
      <div className=" flex justify-center items-center w-screen z-10 px-4 relative bottom-0">
        <p className="text-neutral-400 text-xl md:text-2xl mx-auto mb-10">
          Check out my personal{" "}
          <LinkPreview
            url="https://payamd-blog.vercel.app/"
            className="font-bold"
          >
            Blog
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview
            url="https://payamd-photo.vercel.app/"
            className="font-bold"
          >
            Photography
          </LinkPreview>{" "}
          portfolio.
        </p>
      </div>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default About;
