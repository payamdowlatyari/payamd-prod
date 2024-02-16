import { motion } from "framer-motion";
import HoverLink from "../View/HoverLink";
import Logo from "./Logo";

export default function Nav() {
  return (
    <motion.div
      layout
      style={{
        display: "flex",
        alignSelf: "center",
      }}
    >
      <div
        style={{
          zIndex: 100,
          width: "120px",
          opacity: "0.9",
        }}
      >
        <Logo light />
      </div>
      <div
        style={{
          display: "inline-grid",
          height: "fit-content",
          alignSelf: "center",
        }}
      >
        <HoverLink title="Home" url="/" size="1.5em" />
        <HoverLink title="About" url="/about" size="1.5em" />
        <HoverLink title="Projects" url="/projects" size="1.5em" />
      </div>
    </motion.div>
  );
}
