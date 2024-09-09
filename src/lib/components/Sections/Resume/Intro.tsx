// import { motion, useWillChange } from "framer-motion";
// import Image from "next/image";
// import { useRef } from "react";
// import StaggerText from "react-stagger-text";

// import { intro } from "../../data/data";
import ScrollReveal from "../../motion/ScrollReveal";
// import { TextAnimate } from "../../motion/TextAnimate";

export default function Intro() {
  // const ref = useRef(null);
  // const willChange = useWillChange();

  return (
    <div
      // layout
      className="flex flex-col h-[500vh] w-full"
      // ref={ref}
    >
      {/* <Image
        src="/me-home-bw-removebg-EDIT.jpeg"
        alt="test"
        width={350}
        height={350}
        loading="lazy"
        className="relative z-[1] w-[350px] h-[350px] m-auto"
      /> */}
      <div className="h-[300vh]">
        {/* <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter mb-2"> */}
        {/* <TextAnimate text="About" /> */}
        {/* <StaggerText
            staggerType="letter"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={1}
            startDelay={0.5}
          >
            About
          </StaggerText> */}
        {/* </h1> */}
        <ScrollReveal className="md:text-3xl text-blue-200">
          {/* {intro.text} */}
          It uses a sticky container with a fixed height and a large space at
          the bottom. Finally, it calculates the scroll position and applies an
          opacity effect to each child based on its position.
        </ScrollReveal>
        {/* <p className="text-sm md:text-base font-light">
          <StaggerText
            staggerType="word"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={0.5}
            startDelay={0.1}
          >
            {intro.text}
          </StaggerText>
        </p> */}
      </div>
    </div>
  );
}
