"use client";

import { Link, Sun } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { LinkOverlay } from "~/components/ui/Button";
import CTA from "~/components/ui/CTA";
import { H1, H2, Paragraph } from "~/components/ui/Texts";
import { projectCaseStudy } from "~/data";

/**
 * CaseStudy component displays a detailed case study of a project
 */
export default function CaseStudy(): JSX.Element {
  const { title, summary, images, sections } = projectCaseStudy;

  return (
    <main className="overflow-hidden">
      <Menu />
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* Hero Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col gap-4 mb-6">
            <H1 label="Case Study" className="mb-8 md:mb-12" />
            <div className="flex flex-col gap-6">
              <H2 label={title} />
              <Paragraph text={summary} className="my-2 md:my-4 p-2" />

              {/* Featured Images */}
              {images && images.length > 0 ? (
                <div className="relative overflow-hidden rounded-lg w-full max-w-xl ">
                  <Image
                    src={images[0].url}
                    alt={images[0].alt}
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  {images.length > 1 && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Image
                        src={images[1].url}
                        alt={images[1].alt}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Sun size={48} className="text-neutral-500" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <H2 label={section.title} />
                <div className="prose prose-invert max-w-none">
                  {section.description.split("\n").map((paragraph) => (
                    <p
                      key={paragraph + Math.random()}
                      className="text-xs md:text-sm text-neutral-400 leading-relaxed whitespace-pre-wrap mt-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="list-inside space-y-2 mt-4">
                  {section.sections &&
                    section.sections.map((subsection) => (
                      <li key={subsection.title} className="space-y-2 mt-4">
                        <h3 className="text-xl sm:text-2xl font-medium text-neutral-200 mb-2 md:mb-4 text-balance">
                          {subsection.title}
                        </h3>
                        {subsection.items && (
                          <ul className="list-disc list-inside space-y-1 mt-2 md:mt-4 ml-4">
                            {subsection.items.map((item) => (
                              <li
                                key={item + Math.random()}
                                className="text-xs md:text-sm text-neutral-400 leading-relaxed"
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
                  <Paragraph
                    text={section.ending}
                    className="text-xs md:text-sm text-neutral-400 leading-relaxed whitespace-pre-wrap"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="px-4 my-24 mx-auto max-w-4xl">
          <CTA />
        </div>
      </div>

      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
