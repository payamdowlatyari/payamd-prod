"use client";

import { Box } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import "@fontsource/poppins";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" width="100%">
      <GlobalCanvas style={{ pointerEvents: "none" }}>
        <ambientLight />
      </GlobalCanvas>
      <SmoothScrollbar>
        {(bind) => <article {...bind}>{children}</article>}
      </SmoothScrollbar>
    </Box>
  );
};

export default Layout;
