import { useScrollbar, useTracker } from "@14islands/r3f-scroll-rig";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, MutableRefObject } from "react";

import Nav from "../components/motion/Menu/Nav";
import CopyRight from "../components/motion/View/CopyRight";
import Contact from "../components/Sections/Contact/Details";

/**
 * Footer component that handles the scrolling animation and rendering of the
 * navigation, contact details, and copyright information.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
  // Reference to the footer element
  const el: MutableRefObject<any> = useRef();

  // Get the scrollbar event handler and scroll state tracker
  const { onScroll } = useScrollbar();
  const { scrollState } = useTracker(el);

  // Create a motion value to track the progress of the scrolling animation
  const progress = useMotionValue(0);

  /**
   * UseEffect hook that attaches a scroll event listener to the scrollbar
   * event handler. Updates the progress motion value based on the scroll
   * state visibility.
   */
  useEffect(() => {
    return onScroll(() => progress.set(scrollState.visibility));
  }, [onScroll, progress, scrollState]);

  // Create motion values for the y, opacity, and scale transformations
  const y = useTransform(progress, [0, 1], ["-100%", "0%"]);
  const opacity = useTransform(progress, [0.75, 1], [0, 1]);
  const scale = useTransform(progress, [0.5, 1], [0.75, 1]);

  // Render the footer component with the motion values applied
  return (
    <motion.footer
      ref={el}
      layout
      className="grid h-[90vh] items-end w-screen bg-white text-black top-0 z-[-2]"
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
        }}
        className="flex flex-wrap items-center justify-around min-h-[70vh]"
      >
        <Nav />
        <Contact />
      </motion.div>
      <CopyRight />
    </motion.footer>
  );
};

export default Footer;
