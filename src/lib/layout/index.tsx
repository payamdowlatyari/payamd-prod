'use client';

import { Box, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react';

import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" width="97%" transition="0.5s ease-out">
      <Box margin={3} minHeight="92vh">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>Home</Tab>
            <Tab>About</Tab>
            <Tab>Resume</Tab>
            <Tab>Portfolio</Tab>
            <Header />
          </TabList>
          <TabIndicator mt="-1.5px" height="1px" bg="CaptionText" />
          <Box as="main" w="100%" marginY={20}>
            {children}
          </Box>
        </Tabs>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
