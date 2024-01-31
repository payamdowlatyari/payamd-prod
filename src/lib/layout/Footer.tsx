import { motion } from "framer-motion";
import Social from "../components/Sections/Title/Social";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.div style={{ display: "grid", height: "15em" }}>
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <motion.div
          style={{ display: "grid", height: "fit-content", fontSize: "2em" }}
        >
          <Link href="/" className="underlined underlinedThin">
            Home
          </Link>
          <Link href="/about" className="underlined underlinedThin">
            About
          </Link>
          <Link href="/projects" className="underlined underlinedThin">
            Projects
          </Link>
        </motion.div>
        <motion.div style={{ display: "grid" }}>
          <motion.a href="mailto:pdowlatyari@gmail.com" target="_blank">
            pdowlatyari@gmail.com
          </motion.a>
          <motion.a href="https://payamd-blog.vercel.app/" target="_blank">
            Check out my Blog
          </motion.a>
          <Social />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ textAlign: "center", fontSize: "12px", alignSelf: "center" }}
      >
        <motion.a
          className="underlined underlinedThin"
          href="https://www.payamd.com"
          target="_blank"
        >
          payamd.com
        </motion.a>
        {" © "}
        {new Date().getFullYear()}
        {" | "}
        All Rights Reserved.
      </motion.div>
    </motion.div>
  );
};

export default Footer;
