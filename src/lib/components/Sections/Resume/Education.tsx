import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(
    scrollY,
    [1000, 1100, 1700, 1800],
    [0.5, 1, 1, 1]
  );

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        opacity,
      }}
      ref={ref}
    >
      <h5>Education</h5>
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
                return <ListItem fontSize="xs">{desc}</ListItem>;
              })}
            </List>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Education;
