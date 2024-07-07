"use client";

import "../../app/globals.css";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Box } from "@chakra-ui/react";
import { type ReactNode } from "react";
import "@fontsource/poppins";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Layout component that wraps the entire application.
 * It sets up the global canvas for rendering and smooth scrollbar for scrolling.
 *
 * @param {LayoutProps} props - The layout properties.
 * @param {ReactNode} props.children - The children to be rendered inside the layout.
 * @returns {JSX.Element} The layout component.
 */
const Layout = ({ children }: LayoutProps) => {
  // Render the layout component
  return (
    // Apply a margin of 0 auto and width of 100% to center the content
    <Box margin="0 auto" width="100%">
      {/* Set up the global canvas for rendering */}
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
