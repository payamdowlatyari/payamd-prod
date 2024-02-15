import { motion, useWillChange } from "framer-motion";
import Social from "../Title/Social";
import HoverLink from "../../motion/View/HoverLink";

export default function Contact() {
  const willChange = useWillChange();

  return (
    <motion.div layout>
      <div
        style={{
          padding: "0 0.5em",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h5>
            <b>COTACT ME</b>
          </h5>
          <HoverLink
            title="contact@payamd.com"
            url="mailto:contact@payamd.com"
            out
            low
          />
        </div>
        <div>
          <h5>
            <b>CHECK OUT</b>
          </h5>
          <HoverLink
            title="My Web Blog"
            url="https://payamd-blog.vercel.app/"
            out
          />
        </div>
      </div>
      <div
        style={{
          padding: "0 0.5em",
        }}
      >
        <h5>
          <b>FOLLOW ME</b>
        </h5>
        <Social />
      </div>
    </motion.div>
  );
}
