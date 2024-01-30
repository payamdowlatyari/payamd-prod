"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import "@fontsource/poppins";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" width="100%" transition="0.1s ease-out">
      {children}
    </Box>
  );
};

export default Layout;
