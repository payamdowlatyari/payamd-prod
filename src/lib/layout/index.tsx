"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { PageTransition } from "~/components/motion/PageTransition";
import BeamsBackground from "~/components/ui/beams-background";
import Logo from "~/components/ui/Logo";

import "~/app/globals.css";
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
        <BeamsBackground />
        {children}
        <Logo />
      </PageTransition>
    </AnimatePresence>
  );
};

export default Layout;
