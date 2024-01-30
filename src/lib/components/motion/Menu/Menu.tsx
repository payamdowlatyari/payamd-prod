import { useRef } from "react";
import {
  motion,
  useCycle,
  useScroll,
  useTransform,
  useViewportScroll,
  useWillChange,
} from "framer-motion";
import { useDimensions } from "./use-dimentions";
import Logo from "./Logo";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -200 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Navigation = ({ toggle }: any) => (
  <motion.ul layout variants={variants} onClick={toggle}>
    <motion.li variants={menuVariants}>
      {/* <motion.h4> */}
      <motion.a className="underlinedRise" href="/">
        Home
      </motion.a>
      {/* </motion.h4> */}
    </motion.li>
    <motion.li variants={menuVariants}>
      {/* <motion.h4> */}
      <motion.a className="underlinedRise" href="/about">
        About
      </motion.a>
      {/* </motion.h4> */}
    </motion.li>
    <motion.li variants={menuVariants}>
      {/* <motion.h4> */}
      <motion.a className="underlinedRise" href="/projects">
        Projects
      </motion.a>
      {/* </motion.h4> */}
    </motion.li>
  </motion.ul>
);

const NavToggle = ({ toggle }: any) => {
  return (
    <motion.button onClick={toggle} layout>
      <motion.span
        variants={{
          closed: { display: "contents" },
          open: { display: "none" },
        }}
        transition={{ duration: 0.3 }}
      >
        MENU
      </motion.span>
      <motion.span
        variants={{
          closed: { display: "none" },
          open: { display: "contents" },
        }}
        transition={{ duration: 0.3 }}
      >
        CLOSE
      </motion.span>
    </motion.button>
  );
};

export default function Menu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 500, 800], [0.9, 0.9, 0]);
  const scale = useTransform(scrollY, [0, 500, 800], [1, 1, 0]);

  const willChange = useWillChange();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={{
        background: isOpen ? "#1e2125" : "#e1e1e1",
        color: isOpen ? "#e1e1e1" : "transparent",
        height: isOpen ? "100vh" : "0vh",
      }}
    >
      <motion.div
        style={{
          willChange,
          zIndex: 100,
          width: "100px",
          opacity,
          scale,
          display: isOpen ? "none" : "flex",
        }}
      >
        <Logo />
      </motion.div>

      <NavToggle toggle={() => toggleOpen()} />

      <motion.div
        variants={sidebar}
        style={{
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexWrap: "wrap",
          display: isOpen ? "flex" : "none",
        }}
      >
        <motion.div
          style={{
            willChange,
            zIndex: 100,
            width: "250px",
            height: "250px",
          }}
        >
          <Logo light={true} />
        </motion.div>
        <Navigation toggle={() => toggleOpen()} />
      </motion.div>
    </motion.nav>
  );
}
