/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */

"use client";

import "../../app/globals.css";
import { SmoothScrollbar, GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { type ReactNode } from "react";
import "@fontsource/poppins";
import "@14islands/r3f-scroll-rig/css";

import { BackgroundGradientAnimation } from "../components/motion/BackgroundGradientAnimation";
import Logo from "../components/motion/Menu/Logo";
import { Transition } from "../components/motion/Transition";
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
const Layout = ({ children }: LayoutProps): JSX.Element => {
  // Render the layout component
  return (
    <div className="w-full h-full">
      <GlobalCanvas style={{ zIndex: -1 }}>
        <ambientLight />
      </GlobalCanvas>
      <SmoothScrollbar
        config={{
          damping: 0.05,
          stiffness: 0.1,
        }}
      >
        {(bind) => (
          <article {...bind}>
            <BackgroundGradientAnimation />
            <Transition />
            {children}
          </article>
        )}
      </SmoothScrollbar>
      <div className="fixed z-[998] top-1 left-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.5, ease: "backInOut" }}
        >
          <Logo size={60} />
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
