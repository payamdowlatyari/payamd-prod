"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { PageTransition } from "~/components/motion/PageTransition";
import { SmoothScrollProvider } from "~/components/providers/SmoothScrollProvider";
import BeamsBackground from "~/components/ui/beams-background";
import Logo from "~/components/ui/Logo";

import "~/app/globals.css";
import "@fontsource/poppins";

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

  if (!currentPath) {
    return null;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={currentPath}>
        <BeamsBackground />
        <SmoothScrollProvider
          options={{
            smooth: true,
            mobile: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          }}
        >
          {children}
        </SmoothScrollProvider>
        <Logo />
      </PageTransition>
    </AnimatePresence>
  );
};

export default Layout;
