import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1000, 1100, 1400, 1600], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollY,
    [1000, 1100, 1400, 1600],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
        opacity,
        scale,
      }}
      ref={ref}
    >
      <h3>Education</h3>
      {education?.map((item) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.5,
              ease: "easeInOut",
            }}
            style={{
              willChange,
            }}
          >
            <Flex pt={4}>
              <Box>
                <Text>
                  <b>{item.school}</b>, <i>{item.major}</i>
                </Text>{" "}
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{item.date}</Text>
              </Box>{" "}
            </Flex>
            <List pl={1}>
              {item.description?.map((desc) => {
                return <ListItem fontSize="sm">{desc}</ListItem>;
              })}
            </List>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Education;
