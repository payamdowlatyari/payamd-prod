import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";

const Experience = () => {
  return (
    <div className="resume-section">
      <div className="resume-body">
        <div className="resume-title">
          <h3>Experience</h3>
          <img
            src="wired-gradient-187-suitcase.gif"
            alt="wired-lineal-187-suitcase"
          />
        </div>
        <div className="resume-content">
          {experience?.map((item) => {
            return (
              <>
                <Flex px={4} pt={4}>
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
                <List px={4} pb={4}>
                  {item.description?.map((desc) => {
                    return <ListItem fontSize="xs">{desc}</ListItem>;
                  })}
                </List>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
