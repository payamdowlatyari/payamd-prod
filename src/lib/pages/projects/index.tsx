"use client";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ResponsiveHeroParallax from "~/components/motion/HeroParallax";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { projects } from "~/data";

/**
 * A component that displays a list of projects.
 *
 * @returns {JSX.Element}
 */
export default function Projects(): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Menu />
      <ResponsiveHeroParallax
        products={projects.projects}
        details={projects.details}
      />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
