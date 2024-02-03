import { motion } from "framer-motion";
import Contact from "../components/Sections/Contact";
import Nav from "../components/motion/Menu/Nav";
import Logo from "../components/motion/Menu/Logo";

const Footer = () => {
  return (
    <motion.div layout style={{ display: "grid", height: "25em" }}>
      <motion.div
        layout
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-end",
        }}
      >
        <motion.div
          style={{
            width: "140px",
            opacity: "0.9",
          }}
        >
          <Logo light />
        </motion.div>
        <Nav />
        <Contact />
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
