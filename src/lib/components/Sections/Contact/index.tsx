import { motion } from "framer-motion";
import Social from "../Title/Social";
import HoverLink from "../../motion/View/HoverLink";

export default function Contact() {
  return (
    <motion.div
      layout
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div>
          <h5>Contact</h5>
          <HoverLink
            title="contact@payamd.com"
            url="mailto:contact@payamd.com"
            out
            low
          />
        </div>
        <div>
          <h5>Follow</h5>
          <Social />
        </div>
      </div>

      <div>
        <div>
          <h5>Links</h5>
          <HoverLink
            title="My Web Blog"
            url="https://payamd-blog.vercel.app/"
            out
          />
          <br />
          <HoverLink
            title="Photography"
            url="https://payamd-photo.vercel.app/"
            out
          />
        </div>
      </div>
    </motion.div>
  );
}
