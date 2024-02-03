import { Text, Box } from "@chakra-ui/react";
import { publication } from "./data";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Publications = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1300, 1400, 1800, 1900], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollY,
    [1300, 1400, 1800, 1900],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        opacity,
        scale,
        backgroundImage: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",
      }}
      ref={ref}
    >
      <h3>Publications</h3>
      {publication?.map((item) => {
        return (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <Box py={1}>
              <Link href={item.link} className="underlined underlinedThin">
                <b>{item.title}</b>{" "}
                <FiArrowUpRight style={{ display: "inline" }} />
              </Link>
              <Text fontSize="sm" pl={1}>
                {item.description}
              </Text>
            </Box>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Publications;
