"use client";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import { HeroParallax } from "~/components/motion/HeroParallax";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { projects } from "~/data";

/**
 * Projects component
 * @returns {JSX.Element}
 */
export default function Projects(): JSX.Element {
  return (
    <main>
      <Menu />
      <HeroParallax products={projects.projects} details={projects.details} />
      <Footer />
      <ScrollProgressBar showPercentage />
    </main>
  );
}
