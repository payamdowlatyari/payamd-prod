import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Logo component
 * @param {number} size
 * @returns {JSX.Element}
 */
export default function Logo({ size }: { size: number }): JSX.Element {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
    >
      <Link href="/">
        <Image
          src="/pd-logo1-removebg-preview.png"
          alt="logo"
          width={size}
          height={size}
        />
      </Link>
    </motion.div>
  );
}
