"use client";

import dynamic from "next/dynamic";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import BlurFade from "~/components/motion/BlurFade";
import { Card } from "~/components/motion/Card";
import LinkPreview from "~/components/motion/LinkPreview";
import { Logos, Marquee } from "~/components/motion/Marquee";
import ScrollProgressBar, {
  ProgressiveBlur,
} from "~/components/motion/ScrollProgressBar";
import TextRevealByWord from "~/components/motion/ScrollReveal";
import { LinkArrowOut } from "~/components/ui/Button";
import RotatingText from "~/components/ui/rotating-text";
import { H2, Paragraph } from "~/components/ui/Texts";
import { ParticleText } from "~/components/ui/typing-text";
import { intro, resume } from "~/data";

// Dynamically import ImageEffect to reduce initial bundle size (~500KB savings)
const ImageEffect = dynamic(() => import("~/components/motion/ImageEffect"), {
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg animate-pulse">
      <div className="text-gray-400 dark:text-gray-600">Loading...</div>
    </div>
  ),
  ssr: false, // Disable SSR for Three.js components
});

const ROTATING_TEXT_CLASSNAME =
  "text-neutral-300 text-2xl md:text-3xl font-bold";

/**
 * Renders an introduction section with a gradient tracing animation.
 */
const Intro = ({ opacity }: { opacity: MotionValue<number> }) => (
  <div className="relative">
    <motion.div
      style={{ opacity }}
      className="fixed mx-1 h-screen w-screen flex flex-wrap items-center justify-evenly"
    >
      <div className="px-4 sm:px-8 pt-1 sm:pt-2 flex">
        <div className="grid gap-2">
          <ParticleText text={intro.title} />
          <Paragraph text={intro.summary} />
        </div>
      </div>
      <div className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 m-1">
        <ImageEffect
          item1="me-ai-red_processed.jpeg"
          item2="me_enhanced_processed.jpeg"
        />
      </div>
    </motion.div>
    <div className="z-10 flex min-h-screen justify-center pt-[200vh]">
      <TextRevealByWord text={intro.description.replace(/\s+/g, " ")} />
    </div>
  </div>
);

/**
 * Renders a resume section with a gradient tracing animation.
 */
const Resume = ({ x }: { x: MotionValue<string> }) => (
  <motion.section
    id="resume"
    className="block top-0 max-w-screen-lg overflow-hidden h-[1500vh] p-0"
    layoutScroll
  >
    <div className="flex flex-col justify-center items-center h-screen w-full max-w-screen-md mx-auto px-4 my-4 md:my-8 space-y-2">
      <RotatingText
        text={[
          {
            data: "Click on the links below",
            className: ROTATING_TEXT_CLASSNAME,
          },
          {
            data: "to view my resume",
            className: ROTATING_TEXT_CLASSNAME,
          },
          {
            data: "or keep scrolling...",
            className: ROTATING_TEXT_CLASSNAME,
          },
        ]}
      />
      <LinkArrowOut title="View Resume PDF" url="/pdf/resume.pdf" />
    </div>

    <div className="fixed flex top-0 overflow-hidden items-center h-screen">
      <motion.ul
        className="fixed flex list-none h-screen"
        style={{
          x,
        }}
      >
        {resume.map((section) => (
          <li className="w-screen max-w-screen-lg" key={section.section}>
            <div className="flex flex-row justify-center items-center h-screen m-1">
              <div className="flex flex-col justify-center max-w-screen-lg overflow-hidden">
                <div className="flex flex-col-reverse px-4">
                  <H2 label={section.section} />
                </div>

                <div className="max-w-screen-lg flex flex-col justify-evenly">
                  <BlurFade delay={0.5} inView blur="xl">
                    <Card items={section.items} />
                  </BlurFade>
                </div>
              </div>
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  </motion.section>
);

/**
 * Renders a marquee section with a gradient tracing animation.
 */
const MarqueeSection = ({ opacity }: { opacity: MotionValue<number> }) => (
  <motion.div layout style={{ opacity }} className="sticky bottom-0 z-10">
    <Marquee>
      {Object.entries(Logos).map(([key, Logo]) => (
        <div
          key={key}
          className="relative scale-75 hover:scale-90 transition-transform h-full w-fit mx-2 flex items-center justify-start"
        >
          <Logo />
        </div>
      ))}
    </Marquee>
    <ProgressiveBlur
      className="pointer-events-none absolute inset-y-0 left-0 w-16"
      direction="left"
      blurIntensity={1}
    />
    <ProgressiveBlur
      className="pointer-events-none absolute inset-y-0 right-0 w-16"
      direction="right"
      blurIntensity={1}
    />
  </motion.div>
);

/**
 * Renders a bottom section with a gradient tracing animation.
 */
const BottomSection = () => (
  <div className="relative">
    <p className="text-neutral-400 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mx-auto max-w-xl leading-10 px-4 my-10 z-10">
      Check out <br /> my{" "}
      <LinkPreview url="https://blog.payamd.com/">Blog</LinkPreview> <br /> &{" "}
      <br />
      <LinkPreview url="https://photos.payamd.com/">
        Photography
      </LinkPreview>{" "}
      <br />
      portfolio.
    </p>
  </div>
);

/**
 * A component that displays an about page.
 *
 * @returns {JSX.Element} The rendered about page.
 */
const About = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ["50%", "50%", "-125%"],
    { clamp: false }
  );
  const opacityIntro = useTransform(
    scrollYProgress,
    [0, 0.05, 0.08],
    [1, 1, 0]
  );
  const opacityMarquee = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: false }
  );

  return (
    <main ref={ref}>
      <Menu />
      <Intro opacity={opacityIntro} />
      <Resume x={x} />
      <MarqueeSection opacity={opacityMarquee} />
      <BottomSection />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
};

export default About;
