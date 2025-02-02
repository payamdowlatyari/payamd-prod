import { motion } from "framer-motion";

import { NumberTicker } from "../components/motion/NumberTicker";

/**
 * Header component
 * @returns {JSX.Element}
 */
const Header = (): JSX.Element => {
  return (
    <motion.div
      layout
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 2,
        delay: 4,
        ease: "circInOut",
      }}
      className="fixed flex justify-center top-0 left-0 w-full h-full origin-center bg-neutral-950 z-[1002]"
    >
      <motion.div
        initial={{ opacity: 1, zIndex: "102" }}
        animate={{ opacity: 0, zIndex: "-100" }}
        transition={{
          duration: 1,
          delay: 3,
          ease: "easeIn",
        }}
        layout
        className="self-center text-9xl"
      >
        <NumberTicker value={100} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
