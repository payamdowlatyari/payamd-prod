import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Logo component
 * @param {number} size
 */
export default function Logo({
  size = 50,
  type = "header",
}: {
  size?: number;
  type?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      className={type === "header" ? "fixed top-1 left-3 z-auto" : ""}
    >
      <Link href="/">
        <Image
          src="/pd-logo1-removebg-preview.png"
          alt="logo"
          width={size}
          height={size}
          priority
        />
      </Link>
    </motion.div>
  );
}
