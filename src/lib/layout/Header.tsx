import { motion } from "framer-motion";

import { NumberTicker } from "../components/motion/NumberTicker";

/**
 * Header component
 * @returns {JSX.Element}
 */
const Header = (): JSX.Element => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 4,
        delay: 1,
        ease: "easeOut",
      }}
      className="fixed flex justify-center top-0 left-0 w-full h-full bg-neutral-950 z-[1002]"
    >
      <NumberTicker value={100} className="self-center text-9xl" />
    </motion.div>
  );
};

export default Header;
