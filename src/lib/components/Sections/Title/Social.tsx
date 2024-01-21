import { motion } from "framer-motion";
import { data } from "./data";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "#1e2125",
  },
  visible: {
    pathLength: 1,
    fill: "#1e2125",
  },
};

export default function Social() {
  return (
    <motion.div>
      {data.map((item) => {
        return (
          <motion.a
            href={item.url}
            style={{
              display: "inline-flex",
            }}
          >
            <motion.svg
              style={{ width: "50px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
            >
              <motion.path
                d={item.icon}
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                  default: { duration: 2, ease: "easeInOut" },
                  fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  delay: 1,
                }}
              />
            </motion.svg>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
