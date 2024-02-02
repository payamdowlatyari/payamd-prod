import { motion } from "framer-motion";
import Link from "next/link";

export default function Nav() {
  return (
    <motion.div
      layout
      style={{
        display: "grid",
        height: "fit-content",
        fontSize: "1.5em",
      }}
    >
      <Link href="/" className="underlined underlinedThin">
        Home
      </Link>
      <Link href="/about" className="underlined underlinedThin">
        About
      </Link>
      <Link href="/projects" className="underlined underlinedThin">
        Projects
      </Link>
    </motion.div>
  );
}
