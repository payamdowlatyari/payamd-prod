import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Certificates = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1200, 1300, 1600, 1700], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollY,
    [1200, 1300, 1600, 1700],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        backgroundImage: " linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
        color: "black",
        opacity,
        scale,
      }}
      ref={ref}
    >
      <h3>Certificates</h3>
      {certificate?.map((item) => {
        return (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <Flex pt={2}>
              <Box>
                <Link href={item.link} className="underlined underlinedThin">
                  <b>{item.major}</b> <b>{item.school}</b>{" "}
                  <FiArrowUpRight
                    style={{
                      display: "inline",
                    }}
                  />
                </Link>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{item.date}</Text>
              </Box>{" "}
            </Flex>
            <Text pl={1} fontSize="sm">
              {item.description}
            </Text>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Certificates;
