import { motion } from "framer-motion";
import HoverLink from "../View/HoverLink";
import Logo from "./Logo";

export default function Nav() {
  return (
    <motion.div
      layout
      style={{
        display: "grid",
      }}
    >
      <div
        style={{
          zIndex: 100,
          width: "100px",
          opacity: "0.9",
        }}
      >
        <Logo light />
      </div>
      <div
        style={{
          display: "inline-grid",
          height: "fit-content",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        <HoverLink title="Home" url="/" size="2em" />
        <HoverLink title="About" url="/about" size="2em" />
        <HoverLink title="Projects" url="/projects" size="2em" />
      </div>
    </motion.div>
  );
}
