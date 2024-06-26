import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import LinkOut from "../../motion/View/LinkOut";

import { certificate } from "./data";

const Certificates = () => (
  <div className="resume-section">
    <div className="resume-body">
      <div className="resume-title">
        <h3>Certificates</h3>
        <Image
          src="/wired-gradient-112-book.gif"
          alt="wired-gradient-112-book"
          width={100}
          height={100}
        />
      </div>
      <div className="resume-content">
        {certificate?.map(({ major, link, date, description, school }) => (
          <React.Fragment key={link}>
            <Flex p={4}>
              <Box>
                <LinkOut title={major} url={link} out />
                <Text fontSize="sm" pl={2}>
                  {school}
                </Text>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{date}</Text>
              </Box>
            </Flex>
            <Text px={6} fontSize="xs">
              {description}
            </Text>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default Certificates;
