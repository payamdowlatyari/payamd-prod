import { motion, useWillChange } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import StaggerText from "react-stagger-text";

import { intro } from "../../data/data";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  return (
    <motion.div
      layout
      className="flex flex-wrap flex-row justify-center h-screen w-screen p-1"
      ref={ref}
    >
      <Image
        src="/me-home-bw-removebg-EDIT.jpeg"
        alt="test"
        width={350}
        height={350}
        loading="lazy"
        className="relative z-[1] w-[350px] h-[350px] m-auto"
      />
      <motion.div
        layout
        className="relative w-[700px] max-w-[95vw] m-auto z-[1] p-2"
        style={{
          willChange,
          // y,
        }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter mb-2">
          <StaggerText
            staggerType="letter"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={1}
            startDelay={0.5}
          >
            About
          </StaggerText>
        </h1>
        <p className="text-sm md:text-base font-light">
          <StaggerText
            staggerType="word"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={0.5}
            startDelay={0.1}
          >
            {intro.text}
          </StaggerText>
        </p>
      </motion.div>
    </motion.div>
  );
}
