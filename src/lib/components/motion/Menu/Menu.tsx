import { useRef } from "react";
import { motion, useCycle, useWillChange } from "framer-motion";
import { useDimensions } from "./use-dimentions";
import Nav from "./Nav";
import Contact from "../../Sections/Contact";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";

const NavToggle = ({ toggle }: any) => {
  return (
    <motion.button onClick={toggle} layout>
      <motion.span
        variants={{
          closed: { display: "contents" },
          open: { display: "none" },
        }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        MENU <TfiLineDouble />
      </motion.span>
      <motion.span
        variants={{
          closed: { display: "none" },
          open: { display: "contents" },
        }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        CLOSE <TfiClose />
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
        background: isOpen ? "#3c6e71" : "transparent",
        color: isOpen ? "rgb(225, 225, 225, 1)" : "transparent",
        height: isOpen ? "100vh" : "0vh",
        padding: "0.5em",
      }}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        style={{
          willChange,
          height: "100vh",
          width: "100vw",
          display: isOpen ? "flex" : "none",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <Nav />
        <Contact />
      </motion.div>
    </motion.nav>
  );
}
