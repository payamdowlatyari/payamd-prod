import { motion } from "framer-motion";
import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <motion.div
      layout
      style={{
        display: "grid",
        height: "fit-content",
        alignSelf: "center",
      }}
    >
      <HoverLink title="Home" url="/" size="1.5em" />
      <HoverLink title="About" url="/about" size="1.5em" />
      <HoverLink title="Projects" url="/projects" size="1.5em" />
    </motion.div>
  );
}
