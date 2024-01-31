import { motion } from "framer-motion";
import Social from "../components/Sections/Title/Social";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.div style={{ display: "grid", height: "14em" }}>
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <motion.div style={{ display: "grid", height: "fit-content" }}>
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
        <motion.div>
          <motion.a
            className="underlined underlinedThin"
            href="mailto:pdowlatyari@gmail.com"
            target="_blank"
          >
            Email
          </motion.a>
          {" | "}
          <motion.a
            className="underlined underlinedThin"
            href="https://payamd-blog.vercel.app/"
            target="_blank"
          >
            Blog
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
