"use client";

import "../../app/globals.css";
import { SmoothScrollbar, GlobalCanvas } from "@14islands/r3f-scroll-rig";
// eslint-disable-next-line import/order
import { type ReactNode } from "react";
import "@fontsource/poppins";
import "@14islands/r3f-scroll-rig/css";

// eslint-disable-next-line import/order
import { motion } from "framer-motion";

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      {/* Set up the global canvas for rendering */}
      <GlobalCanvas style={{ pointerEvents: "none" }}>
        <ambientLight />
      </GlobalCanvas>

      <SmoothScrollbar>
        {(bind) => <article {...bind}>{children}</article>}
      </SmoothScrollbar>
    </motion.main>
  );
};

export default Layout;
