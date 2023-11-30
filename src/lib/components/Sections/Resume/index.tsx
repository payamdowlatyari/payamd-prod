import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";

import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Publications from "./Publications";
import Skills from "./Skills";

const Resume = () => {
  return (
    <Box textAlign="left" width="100%">
      <Heading as="h1" size="3xl" mb={4} color="#319795">
        my <br />
        Resume
      </Heading>
      <Text m={4} fontSize="2xl">
        <b> Full Stack Engineer</b>
      </Text>

      <Grid>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Experience
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Experience />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Education
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Education />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Skills
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Skills />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Projects
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Projects />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Publications
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Publications />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#319795", color: "white" }}>
                <Box as="b" flex="1" textAlign="left">
                  Certificates
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Certificates />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Grid>
    </Box>
  );
};

export default Resume;
