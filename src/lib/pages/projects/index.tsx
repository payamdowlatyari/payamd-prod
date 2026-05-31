"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ResponsiveHeroParallax from "~/components/motion/HeroParallax";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { Paragraph } from "~/components/ui/Texts";

/**
 * Case Study Section component
 */
const CaseStudySection = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-8 md:px-16 w-full left-0 top-0">
      <Link
        href="/projects/case-study"
        className="flex justify-between flex-col md:flex-row items-start md:items-center gap-8 hover:bg-neutral-100/5 rounded-lg transition-all duration-300 ease-in-out"
      >
        <div className="grid gap-2 md:gap-4 my-8 mx-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Case Study
          </h2>
          <Paragraph
            className="max-w-xl"
            text="A detailed look into one of my projects, showcasing the process, challenges, and solutions."
          />
        </div>

        <div className="relative my-8 mx-4 rounded-lg overflow-hidden w-auto max-w-md">
          <Image
            src="/projects/case/search.png"
            alt="Case Study Preview"
            className="w-auto h-auto object-cover rounded-lg shadow-lg"
            width={200}
            height={50}
          />
        </div>
      </Link>
    </div>
  );
};

/**
 * A component that displays a list of projects.
 *
 * @returns {JSX.Element}
 */
export default function Projects(): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Menu />
      <ResponsiveHeroParallax />
      <CaseStudySection />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
