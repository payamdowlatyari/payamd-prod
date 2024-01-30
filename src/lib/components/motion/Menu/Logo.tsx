import { motion } from "framer-motion";
import { logos } from "../../data/logos";

export default function Logo({ light }: any) {
  return (
    <motion.a href="/">
      {light ? (
        <motion.img style={{ top: 0 }} src={logos[1]} />
      ) : (
        <motion.img style={{ top: 0 }} src={logos[0]} />
      )}
    </motion.a>
  );
}
