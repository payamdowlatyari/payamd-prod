import { motion } from "framer-motion";

import Logo from "../components/motion/Menu/Logo";
import { NumberTicker } from "../components/motion/NumberTicker";

const Header = () => {
  return (
    <motion.div
      layout
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 2,
        delay: 7,
        ease: "circInOut",
      }}
      className="fixed flex justify-center bg-black top-0 left-0 w-full h-full origin-top z-[1002]"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <motion.div
        initial={{ opacity: 1, zIndex: "102" }}
        animate={{ opacity: 0, zIndex: "-100" }}
        transition={{
          duration: 1,
          delay: 3,
          ease: "easeIn",
        }}
        layout
        className="self-center mix-blend-difference text-5xl"
      >
        <NumberTicker
          value={100}
          className="self-center mix-blend-difference text-5xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 2, ease: "easeIn", delay: 4 },
        }}
        layout
        className="self-center text-center fixed"
      >
        <Logo light size={100} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
