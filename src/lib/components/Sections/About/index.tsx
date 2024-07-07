import {
  motion,
  useWillChange,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import StaggerText from "react-stagger-text";

import ImageEffect from "../../motion/ImageEffect";

import { data } from "./data";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about">
      <motion.div
        ref={ref}
        layout
        className="flex flex-wrap justify-evenly w-full p-1"
        style={{
          willChange,
        }}
      >
        <div className="max-w-3xl mix-blend-difference">
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
                layout
                style={{
                  willChange,
                  padding: "10px",
                }}
              >
                <h2 className="text-3xl tracking-[-0.1vw] leading-none font-light mx-[0] my-[0.25em]">
                  <StaggerText
                    staggerType="letter"
                    staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                    staggerDuration={1}
                    startDelay={0.5}
                  >
                    {data.title}
                  </StaggerText>
                </h2>
                <p className="pl-2">
                  <StaggerText
                    staggerType="word"
                    staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                    staggerDuration={0.5}
                    startDelay={0.5}
                  >
                    {data.text}
                  </StaggerText>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="h-[400px] w-[400px] m-1 static right-0">
          <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
        </div>
      </motion.div>
    </section>
  );
}
