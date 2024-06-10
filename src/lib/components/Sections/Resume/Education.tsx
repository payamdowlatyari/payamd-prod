import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { FcGraduationCap } from "react-icons/fc";
import React from "react";

const Education = () => (
  <div className="resume-section">
    <div className="resume-header">
      <FcGraduationCap />
    </div>
    <div className="resume-body">
      <div className="resume-title">
        <h3>Education</h3>
      </div>
      <div className="resume-content second">
        {education?.map(({ school, major, date, description }) => (
          <React.Fragment key={school}>
            <Flex p={4}>
              <Box>
                <Text>
                  <b>{school}</b>, <i>{major}</i>
                </Text>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{date}</Text>
              </Box>
            </Flex>
            <List px={4} pb={4}>
              {description?.map((desc) => (
                <ListItem fontSize="xs" key={desc}>
                  {desc}
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default Education;
