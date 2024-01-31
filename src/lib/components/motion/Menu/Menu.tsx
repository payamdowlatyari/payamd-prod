import { useRef } from "react";
import {
  motion,
  useCycle,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useDimensions } from "./use-dimentions";
import Logo from "./Logo";
import Footer from "~/lib/layout/Footer";

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
        background: isOpen ? "lightgray" : "transparent",
        color: isOpen ? "#1e2125" : "transparent",
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
          justifyContent: "space-evenly",
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
            width: "300px",
          }}
        >
          <Logo />
        </motion.div>
        <Footer />
      </motion.div>
    </motion.nav>
  );
}
