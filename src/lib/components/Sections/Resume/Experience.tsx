import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [500, 600, 1300, 1500], [0.5, 1, 1, 1]);

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
      <h5>Experience</h5>
      {experience?.map((item) => {
        return (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <Flex pt={4}>
              <Box>
                <Text>
                  <b>{item.title}</b>, <i>{item.company}</i>
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

export default Experience;
