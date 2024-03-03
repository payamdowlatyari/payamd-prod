import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";

const Experience = () => {
  return (
    <div className="second resume-section">
      <h3>Experience</h3>
      <div className="resume-content">
        {experience?.map((item) => {
          return (
            <>
              <Flex pt={4} px={4}>
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
              <List px={6} pb={4}>
                {item.description?.map((desc) => {
                  return <ListItem fontSize="xs">{desc}</ListItem>;
                })}
              </List>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
