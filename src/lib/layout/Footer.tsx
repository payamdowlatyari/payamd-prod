import Contact from "../components/Sections/Contact";
import Nav from "../components/motion/Menu/Nav";
import CopyRight from "../components/motion/View/CopyRight";
import { useRef, useEffect, MutableRefObject } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useScrollbar, useTracker } from "@14islands/r3f-scroll-rig";

const Footer = () => {
  const el: MutableRefObject<any> = useRef();
  const { onScroll } = useScrollbar();
  const { scrollState } = useTracker(el);
  const progress = useMotionValue(0);

  useEffect(() => {
    return onScroll(() => progress.set(scrollState.visibility));
  }, [onScroll, progress, scrollState]);

  const y = useTransform(progress, [0, 1], ["-100%", "1%"]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);

  return (
    <motion.footer
      ref={el}
      layout
      style={{
        display: "grid",
        height: "100vh",
        alignItems: "flex-end",
        width: "99vw",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          y,
          opacity,
          scale,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Nav />
        </div>
        <Contact />
      </motion.div>

      <CopyRight />
    </motion.footer>
  );
};

export default Footer;
