"use client";

import "~/app/globals.css";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { BackgroundGradientAnimation } from "~/components/motion/BackgroundGradientAnimation";
import PageTransition from "~/components/motion/PageTransition";
import Logo from "~/components/View/Logo";

import "@fontsource/poppins";
import "@14islands/r3f-scroll-rig/css";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Layout component that wraps the entire application.
 *
 * @param {LayoutProps} props - The layout properties.
 */
const Layout = ({ children }: LayoutProps) => {
  const currentPath = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={currentPath}>
        <GlobalCanvas style={{ zIndex: -1 }}>
          <ambientLight />
        </GlobalCanvas>
        <SmoothScrollbar
          config={{
            damping: 0.01,
            touchAction: "auto",
            renderByPixels: true,
            dampingFactor: 0.1,
          }}
        >
          {(scrollBind) => (
            <article {...scrollBind}>
              <BackgroundGradientAnimation />
              {children}
            </article>
          )}
        </SmoothScrollbar>
        <Logo />
      </PageTransition>
    </AnimatePresence>
  );
};

export default Layout;
