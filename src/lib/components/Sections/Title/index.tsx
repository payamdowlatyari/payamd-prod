import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import Link from "next/link";
import { useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const Title = () => {
  const { scrollY } = useScroll();

  const x = useTransform(scrollY, [0, 50, 60, 300], [0, 0, -500, -900]);

  const willChange = useWillChange();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 250);

  return (
    <motion.section
      id="home"
      layoutScroll
      style={{
        willChange,
      }}
      transition={{
        layout: { duration: 1 },
      }}
    >
      <motion.div
        className="second"
        style={{
          backgroundImage:
            'url("https://storage.googleapis.com/www.payamd.com/Portfolio/anim/me-home-removebg-dotted-color.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right",
          zIndex: "-1",
          height: "100vh",
          width: "50vw",
          minWidth: "400px",
          right: "0",
          bottom: "0",
          position: "absolute",
          mixBlendMode: "lighten",
        }}
      />
      <motion.div
        style={{
          height: "80vh",
          width: "50vw",
          minWidth: "400px",
          right: "0",
          bottom: "0",
          position: "absolute",
          mixBlendMode: "color-burn",
          background: "lightseagreen",
          y,
        }}
      />
      <motion.div
        style={{
          height: "400px",
          width: "400px",
          position: "absolute",
          mixBlendMode: "hue",
          background: "currentColor",
        }}
      />
      <motion.div
        ref={ref}
        layout
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignSelf: "flex-end",
        }}
      >
        <motion.div
          layout
          style={{
            padding: "1em 1em",
            display: "grid",
            transition: "1s ease-in-out",
            x,
            alignContent: "flex-end",
          }}
        >
          <motion.h4>
            I am <br />
            Payam Dowlatyari <br />
            Software Engineer <br />
            Based in California
          </motion.h4>
        </motion.div>
        <motion.div
          layout
          style={{
            maxWidth: "99vw",
          }}
        >
          <ParallaxText baseVelocity={-0.1}>
            Sofware Engineer UX Designer Photographer Blogger
          </ParallaxText>
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            display: "grid",
            left: "1em",
            top: "15em",
            fontSize: "1.1em",
          }}
        >
          <Link href="#about" className="underlined underlinedThin">
            01 Who I am
          </Link>
          <Link href="#services" className="underlined underlinedThin">
            02 What I do
          </Link>
          <Link href="/projects" className="underlined underlinedThin">
            03 Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Title;
