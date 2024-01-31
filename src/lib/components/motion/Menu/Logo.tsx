import { motion } from "framer-motion";
import { logos } from "../../data/logos";

export default function Logo({ light }: any) {
  return (
    <motion.a href="/">
      {light ? (
        <motion.img src={logos[1]} alt="logo" />
      ) : (
        <motion.img src={logos[0]} alt="logo" />
      )}
    </motion.a>
  );
}
