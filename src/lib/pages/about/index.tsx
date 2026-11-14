"use client";

import { motion, useReducedMotion } from "motion/react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import BlurFade from "~/components/motion/BlurFade";
import { Card } from "~/components/motion/Card";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import TextRevealByWord from "~/components/motion/ScrollReveal";
import { LinkArrowOut } from "~/components/ui/Button";
import { IntroImage } from "~/components/ui/Images";
import { Paragraph } from "~/components/ui/Texts";
import { intro, resume } from "~/data";

/** A quiet scroll cue with the same entrance reveal as the introduction. */
const ScrollCue = () => {
  const reduceMotion = useReducedMotion();

  return (
    <BlurFade delay={0.6} duration={0.7}>
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <span>Scroll to explore</span>
        <div
          aria-hidden="true"
          className="flex h-10 w-6 justify-center rounded-full border border-border pt-2"
        >
          <motion.span
            className="h-1.5 w-1 rounded-full bg-foreground/80"
            animate={reduceMotion ? { y: 0 } : { y: [0, 14, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                  }
            }
          />
        </div>
      </div>
    </BlurFade>
  );
};

/** Introduction stays in the document flow, without an empty scroll runway. */
const Intro = () => (
  <>
    <div className="section-shell flex min-h-svh flex-col justify-center gap-7 pb-12 pt-32 md:pt-40">
      <div>
        <p className="heading-label mb-7">{intro.title}</p>
        <h1 className="page-title max-w-5xl">A little about me.</h1>
      </div>
      <div className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:gap-16">
        <div className="grid gap-5">
          <Paragraph text={intro.summary} />
          <LinkArrowOut title="Download Resume PDF" url="/pdf/resume.pdf" />
        </div>
        <IntroImage />
      </div>
      <div className="flex justify-center pt-4">
        <ScrollCue />
      </div>
    </div>
    <TextRevealByWord
      text={intro.description.replace(/\s+/g, " ")}
      revealSpanWords={8}
      revealCompleteAt={0.75}
    />
  </>
);

/** Each chapter has its own sticky label; entries remain in normal reading order. */
const Resume = () => (
  <div
    id="resume"
    role="region"
    aria-label="Resume"
    className="section-shell py-16 md:py-24"
  >
    {resume.map((chapter, index) => (
      <div
        key={chapter.section}
        className="grid gap-6 border-t border-border py-10 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
      >
        <div className="self-start lg:sticky lg:top-28">
          <p className="mb-4 text-xs tabular-nums tracking-[0.1em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(resume.length).padStart(2, "0")}
          </p>
          <h2 className="section-title-compact">{chapter.section}</h2>
        </div>
        <div className="min-w-0 lg:border-l lg:border-border/60 lg:pl-10">
          <Card items={chapter.items} />
        </div>
      </div>
    ))}
  </div>
);

const toolkitGroups = [
  {
    title: "Interfaces",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & Data",
    tools: ["Python", "FastAPI", "Node.js", "OpenSearch", "MongoDB"],
  },
  {
    title: "Cloud & Delivery",
    tools: ["AWS", "Amplify", "Lambda", "Step Functions", "Docker"],
  },
];

/** A quiet typographic index of technologies used across the portfolio. */
const SelectedToolkit = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div
      role="region"
      aria-labelledby="toolkit-title"
      className="section-shell py-12 md:py-20"
    >
      <div className="mb-10 border-t border-border pt-8">
        <h2 id="toolkit-title" className="section-title-compact">
          Selected toolkit
        </h2>
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-12">
        {toolkitGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : index * 0.08,
            }}
            className="border-t border-border/60 pt-5"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className="text-xs tabular-nums text-muted-foreground"
              >
                0{index + 1}
              </span>
              <h3 className="item-title">{group.title}</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * A component that displays an about page.
 *
 * @returns {JSX.Element} The rendered about page.
 */
const About = (): JSX.Element => {
  return (
    <main>
      <Menu />
      <Intro />
      <Resume />
      <SelectedToolkit />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
};

export default About;
