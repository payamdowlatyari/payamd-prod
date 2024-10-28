import { useScrollbar, useTracker } from "@14islands/r3f-scroll-rig";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, MutableRefObject } from "react";

import { DockDemo } from "../components/motion/FloatingDock";
import Logo from "../components/motion/Menu/Logo";
import CopyRight from "../components/motion/View/CopyRight";

/**
 * Footer component that handles the scrolling animation and rendering of the
 * navigation, contact details, and copyright information.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer = (): JSX.Element => {
  // Reference to the footer element
  const el: MutableRefObject<any> = useRef();

  // Get the scrollbar event handler and scroll state tracker
  const { onScroll } = useScrollbar();
  const { scrollState } = useTracker(el);

  // Create a motion value to track the progress of the scrolling animation
  const progress = useMotionValue(0);

  useEffect(() => {
    return onScroll(() => progress.set(scrollState.visibility));
  }, [onScroll, progress, scrollState]);

  // Create motion values for the y, opacity, and scale transformations
  const opacity = useTransform(progress, [0.5, 1], [0, 1]);
  const scale = useTransform(progress, [0.5, 1], [0.75, 1]);

  // Render the footer component with the motion values applied
  return (
    <motion.footer
      ref={el}
      layout
      className="flex justify-center items-end w-screen h-full min-h-[40vh]"
    >
      <motion.div
        style={{
          opacity,
          scale,
        }}
        className="flex flex-col items-center justify-end h-full z-10"
      >
        <div className="w-screen h-full flex flex-col items-center justify-center">
          <Logo light={false} size={50} />
          <div className="flex flex-row mt-4 w-full justify-center">
            <Link
              href="/about"
              className="uppercase text-xs px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
            >
              About
            </Link>
            <Link
              href="/resume"
              className="uppercase text-xs px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
            >
              Resume
            </Link>
            <Link
              href="/projects"
              className="uppercase text-xs px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="uppercase text-xs px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center h-full w-full py-2 social">
            <DockDemo />
          </div>
        </div>
        <CopyRight />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
