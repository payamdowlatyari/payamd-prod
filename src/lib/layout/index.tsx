/* eslint-disable import/order */

"use client";

import "../../app/globals.css";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import "@fontsource/poppins";
import "@14islands/r3f-scroll-rig/css";

import { BackgroundGradientAnimation } from "../components/motion/BackgroundGradientAnimation";
import Logo from "../components/motion/Menu/Logo";

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
  const pathname = usePathname(); // Get current route path
  // Render the layout component
  return (
    <motion.div
      key={pathname} // Ensures animation runs on route change
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <GlobalCanvas style={{ zIndex: -1 }}>
        <ambientLight />
      </GlobalCanvas>
      <SmoothScrollbar
        config={{
          damping: 0.01,
          renderByPixels: true,
          dampingFactor: 0.1,
        }}
      >
        {(bind) => (
          <article {...bind}>
            <BackgroundGradientAnimation />
            {children}
          </article>
        )}
      </SmoothScrollbar>
      <div className="fixed z-[998] top-1 left-3">
        <Logo size={50} />
      </div>
    </motion.div>
  );
};

export default Layout;
