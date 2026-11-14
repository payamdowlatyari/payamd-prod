import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

/**
 * Logo component
 * @param {Object} props - Component properties
 * @param {number} [props.size=50] - Size of the logo
 * @param {string} [props.type="header"] - Type of the logo, affects its positioning
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
      className={
        type === "header"
          ? "fixed top-4 left-6 z-[1001] mix-blend-difference sm:left-10 lg:left-16"
          : ""
      }
    >
      <Link href="/" aria-label="Home">
        <Image
          src="/pd-logo1-removebg-preview.png"
          alt="Payam Dowlatyari logo"
          width={size}
          height={size}
          priority
        />
      </Link>
    </motion.div>
  );
}
