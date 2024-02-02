import { motion, useWillChange } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Social from "../Title/Social";

export default function Contact() {
  const willChange = useWillChange();

  return (
    <motion.div
      id="contact"
      style={{
        display: "flex",
        willChange,
      }}
      layout
    >
      <motion.div style={{ display: "grid", padding: "0 1em" }}>
        <b>COTACT ME</b>
        <motion.a
          href="mailto:pdowlatyari@gmail.com"
          target="_blank"
          className="underlined underlinedThin"
        >
          pdowlatyari@gmail.com
        </motion.a>

        <b>FOLLOW ME</b>
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
      </motion.div>
    </motion.div>
  );
}
