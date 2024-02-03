import { useRef } from "react";
import { motion, useCycle, useWillChange } from "framer-motion";
import { useDimensions } from "./use-dimentions";
import Logo from "./Logo";
import Nav from "./Nav";
import Contact from "../../Sections/Contact";

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
  const willChange = useWillChange();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={{
        background: isOpen ? "rgb(30, 33, 37, 0.95)" : "transparent",
        color: isOpen ? "rgb(225, 225, 225, 0.9)" : "transparent",
        height: isOpen ? "100vh" : "0vh",
        padding: "1em",
      }}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        style={{
          willChange,
          height: "100vh",
          maxWidth: "300px",
          display: isOpen ? "grid" : "none",
        }}
      >
        <motion.div
          layout
          style={{
            willChange,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <motion.div
            layout
            style={{
              willChange,
              zIndex: 100,
              width: "140px",
              opacity: "0.9",
            }}
          >
            <Logo light />
          </motion.div>
          <Nav />
        </motion.div>
        <Contact />
      </motion.div>
    </motion.nav>
  );
}
