import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  light,
  size,
}: {
  light: boolean;
  size: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
    >
      <Link href="/">
        {light ? (
          <Image
            src="/pd-logo1-removebg-preview.png"
            alt="logo"
            width={size}
            height={size}
          />
        ) : (
          <Image
            src="/pd-logo1-removebg-preview.png"
            width={size}
            height={size}
            alt="logo"
          />
        )}
      </Link>
    </motion.div>
  );
}
