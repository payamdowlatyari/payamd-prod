import { motion } from "framer-motion";
import HelperImage from "../HelperImage";

export default function Logo() {
  return (
    <motion.div>
      <motion.a href="/">
        <HelperImage
          src="https://storage.googleapis.com/www.payamd.com/Portfolio/payamd-new-logo-v4-removebg.png"
          size={100}
        />
      </motion.a>
    </motion.div>
  );
}
