import { motion } from "framer-motion";
import { social } from "./data";
import { Tooltip } from "@chakra-ui/react";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "#e1e1e1",
  },
  visible: {
    pathLength: 1,
    fill: "#e1e1e1",
  },
};

export default function Social() {
  return (
    <motion.div style={{ padding: "1em 0 0" }}>
      {social.map((item) => {
        return (
          <Tooltip hasArrow label={item.name} placement="top" openDelay={1000}>
            <motion.a
              href={item.url}
              style={{
                display: "inline-flex",
              }}
            >
              <motion.svg
                style={{ width: "40px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
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
          </Tooltip>
        );
      })}
    </motion.div>
  );
}
