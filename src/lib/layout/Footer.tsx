import { motion } from "framer-motion";
import Contact from "../components/Sections/Contact";
import Nav from "../components/motion/Menu/Nav";
import Logo from "../components/motion/Menu/Logo";
import CopyRight from "../components/motion/View/CopyRight";

const Footer = () => {
  return (
    <motion.div layout style={{ display: "grid", height: "15em" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "130px",
            opacity: "0.9",
          }}
        >
          <Logo light />
        </div>
        <Nav />
        <Contact />
      </div>

      <CopyRight />
    </motion.div>
  );
};

export default Footer;
