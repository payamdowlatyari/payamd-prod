"use client";

import { motion, useReducedMotion } from "motion/react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import CTA from "~/components/ui/CTA";
import { projectCaseStudy } from "~/data";

/**
 * CaseStudy component displays a detailed case study of a project
 */
export default function CaseStudy(): JSX.Element {
  const { title, summary, demo, sections } = projectCaseStudy;
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduceMotion ? 0 : 0.45 },
  };

  return (
    <main className="overflow-hidden">
      <Menu />
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <motion.div {...reveal} className="flex flex-col gap-4 mb-6">
            <h1 className="mb-8 text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] md:mb-12">
              Case Study
            </h1>
            <div className="flex flex-col gap-6">
              <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.15] tracking-tight">
                {title}
              </h2>
              <p className="my-2 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:my-4 md:text-lg">
                {summary}
              </p>

              <figure className="mt-4 w-full max-w-4xl">
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={demo.poster}
                  width={demo.width}
                  height={demo.height}
                  aria-label="PhysicianGPS product demo"
                  aria-describedby="physician-demo-caption"
                  className="h-auto w-full rounded-xl border border-border bg-card"
                >
                  <source src={demo.url} type="video/mp4" />
                  Your browser does not support embedded video.{" "}
                  <a href={demo.url}>Download the demo</a>.
                </video>
                <figcaption
                  id="physician-demo-caption"
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {demo.caption}
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section) => (
              <motion.div {...reveal} key={section.title} className="space-y-4">
                <h2 className="text-2xl font-semibold uppercase tracking-tight text-foreground md:text-3xl">
                  {section.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {section.description
                    .split("\n")
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph) => (
                      <p
                        key={`${section.title}-${paragraph}`}
                        className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-wrap"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
                <ul className="space-y-4">
                  {section.sections &&
                    section.sections.map((subsection) => (
                      <li key={subsection.title} className="space-y-2 mt-4">
                        <h3 className="mt-2 text-lg font-semibold leading-tight text-foreground md:mt-4 md:text-xl">
                          {subsection.title}
                        </h3>
                        {subsection.items && (
                          <ul className="list-disc list-outside space-y-1 mt-2 md:mt-4 ml-4">
                            {subsection.items.map((item) => (
                              <li
                                key={`${subsection.title}-${item}`}
                                className="text-base text-muted-foreground leading-relaxed"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
                {section.ending && (
                  <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {section.ending}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="px-4 my-24 mx-auto max-w-3xl">
          <CTA />
        </div>
      </div>

      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
