import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { education } from "./data";

const Education = () => (
  <div className="resume-section">
    <div className="resume-body">
      <div className="resume-title">
        <h3>Education</h3>
        <Image
          src="/wired-gradient-486-school.gif"
          alt="wired-lineal-486-school"
          width={100}
          height={100}
        />
      </div>
      <div className="resume-content">
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
