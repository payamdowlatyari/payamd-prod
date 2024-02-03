import { motion, useWillChange } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Social from "../Title/Social";

export default function Contact() {
  const willChange = useWillChange();

  return (
    <motion.div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "0 1em",
        willChange,
      }}
      layout
    >
      <div style={{ padding: "0 0.5em" }}>
        <h5>
          <b>COTACT ME</b>
        </h5>
        <motion.a
          href="mailto:contact@payamd.com"
          target="_blank"
          className="underlined underlinedThin"
        >
          contact@payamd.com
        </motion.a>
      </div>
      <div style={{ padding: "0 0.5em" }}>
        <h5>FOLLOW ME</h5>
        <Social />
        <motion.a
          href="https://payamd-blog.vercel.app/"
          target="_blank"
          className="underlined underlinedThin"
        >
          <b>
            MY WEB BLOG <FiArrowUpRight style={{ display: "inline" }} />
          </b>
        </motion.a>
      </div>
    </motion.div>
  );
}
