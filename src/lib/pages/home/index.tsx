"use client";

import { Flex, Container, TabPanels, TabPanel } from "@chakra-ui/react";

import About from "~/lib/components/Sections/About/About";
import Portfolio from "~/lib/components/Sections/Portfolio/Portfolio";
import Resume from "~/lib/components/Sections/Resume";
import Title from "~/lib/components/Sections/Title/Title";

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
