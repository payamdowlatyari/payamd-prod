import { motion } from "framer-motion";
import { social } from "./data";
import { Tooltip } from "@chakra-ui/react";

export default function Social() {
  return (
    <div style={{ padding: "0.5em 0 0" }}>
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
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <motion.path d={item.icon} fill="#e1e1e1" />
              </motion.svg>
            </motion.a>
          </Tooltip>
        );
      })}
    </div>
  );
}
