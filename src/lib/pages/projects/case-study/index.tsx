"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import CaseStudyArchitecture from "~/components/motion/CaseStudyArchitecture";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import CTA from "~/components/ui/CTA";
import { projectCaseStudy } from "~/data";

const chapters = projectCaseStudy.sections.map((section) => ({
  title: section.title,
  id: section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
}));

function ChapterNavigation() {
  const [active, setActive] = useState(chapters[0].id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = chapters.reduce((previous, chapter) => {
        const element = document.getElementById(chapter.id);
        return element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.3
          ? chapter.id
          : previous;
      }, chapters[0].id);
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav
      aria-label="Case study chapters"
      className="self-start lg:sticky lg:top-28"
    >
      <p className="mb-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        In this case study
      </p>
      <ol className="space-y-1 border-l border-border">
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={active === chapter.id ? "location" : undefined}
              className={`-ml-px flex gap-3 border-l py-2 pl-4 text-xs leading-5 transition-colors ${active === chapter.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <span className="tabular-nums opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

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
    <main>
      <Menu />
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}

        <section className="section-shell pb-16 pt-28 md:pb-24 md:pt-36">
          <motion.div {...reveal} className="flex flex-col gap-4 mb-6">
            <h1 className="page-title mb-8 md:mb-12">Case Study</h1>
            <div className="flex flex-col gap-6">
              <h2 className="section-title-compact">{title}</h2>
              <p className="body-copy my-2 max-w-[60ch] md:my-4">{summary}</p>

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
        <div className="section-shell grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <ChapterNavigation />
          <div className="min-w-0 max-w-3xl space-y-16">
            {sections.map((section, index) => (
              <div
                id={chapters[index].id}
                key={section.title}
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="section-title-compact">{section.title}</h2>
                <div className="prose prose-invert max-w-none">
                  {section.description
                    .split("\n")
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph) => (
                      <p
                        key={`${section.title}-${paragraph}`}
                        className="mt-4 body-copy whitespace-pre-wrap"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
                {section.title === "System Architecture Solution" && (
                  <CaseStudyArchitecture />
                )}
                <ul className="space-y-4">
                  {section.sections &&
                    section.sections.map((subsection) => (
                      <li key={subsection.title} className="space-y-2 mt-4">
                        <h3 className="card-title mt-2 md:mt-4">
                          {subsection.title}
                        </h3>
                        {subsection.items && (
                          <ul className="list-disc list-outside space-y-1 mt-2 md:mt-4 ml-4">
                            {subsection.items.map((item) => (
                              <li
                                key={`${subsection.title}-${item}`}
                                className="body-copy"
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
                  <p className="body-copy whitespace-pre-wrap">
                    {section.ending}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-shell my-24">
          <CTA />
        </div>
      </div>

      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
