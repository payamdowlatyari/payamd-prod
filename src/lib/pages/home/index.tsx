"use client";

import { Flex, Container, TabPanels, TabPanel } from "@chakra-ui/react";

import About from "../../components/Sections/About/index";
import Portfolio from "../../components/Sections/Portfolio/index";
import Resume from "../../components/Sections/Resume/index";
import Title from "../../components/Sections/Title/index";

const Home = () => {
  return (
    <Container size="lg">
      <TabPanels>
        <TabPanel>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            minHeight="70vh"
            gap={2}
            mb={8}
            w="full"
          >
            <Title />
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            minHeight="70vh"
            gap={2}
            mb={8}
            w="full"
          >
            <About />
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            minHeight="70vh"
            gap={2}
            mb={8}
            w="full"
          >
            <Resume />
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            minHeight="70vh"
            gap={2}
            mb={8}
            w="full"
          >
            <Portfolio />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Container>
  );
};

export default Home;
