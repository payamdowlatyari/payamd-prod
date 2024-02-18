import { motion } from "framer-motion";

export default function TextReveal({ text }: any) {
  return (
    <>
      {text.split(" ").map((el: string, i: number) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
            delay: i / 10,
          }}
          key={el}
        >
          {el}{" "}
        </motion.span>
      ))}
    </>
  );
}
