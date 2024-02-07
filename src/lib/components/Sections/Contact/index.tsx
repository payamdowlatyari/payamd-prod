import { motion, useWillChange } from "framer-motion";
import Social from "../Title/Social";
import HoverLink from "../../motion/View/HoverLink";

export default function Contact() {
  const willChange = useWillChange();

  return (
    <motion.div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "0 1em",
        margin: "auto",
        willChange,
      }}
      layout
    >
      <div style={{ padding: "0 0.5em" }}>
        <h5>
          <b>COTACT ME</b>
        </h5>
        <HoverLink
          title="contact@payamd.com"
          url="mailto:contact@payamd.com"
          out
        />
      </div>
      <div style={{ padding: "0 0.5em" }}>
        <h5>
          <b>LINKS</b>
        </h5>
        <HoverLink
          title="My Web Blog"
          url="https://payamd-blog.vercel.app/"
          out
        />
      </div>
      <div style={{ padding: "0 0.5em" }}>
        <h5>FOLLOW ME</h5>
        <Social />
      </div>
    </motion.div>
  );
}
