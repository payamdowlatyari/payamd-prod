import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";

const Experience = () => {
  return (
    <div style={{ padding: "1em" }}>
      <h3>Experience</h3>
      {experience?.map((item) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
};

export default Experience;
