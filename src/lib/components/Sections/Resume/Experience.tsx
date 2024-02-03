import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [500, 700, 1200, 1300], [0, 1, 1, 0]);
  const scale = useTransform(scrollY, [500, 700, 1200, 1300], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        scale,
        opacity,
        backgroundImage: " linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
        color: "black",
      }}
      ref={ref}
    >
      <h3>Experience</h3>
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
                return <ListItem fontSize="sm">{desc}</ListItem>;
              })}
            </List>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Experience;
