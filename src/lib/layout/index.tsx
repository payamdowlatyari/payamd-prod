"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { PageTransition } from "~/components/motion/PageTransition";
import BeamsBackground from "~/components/ui/beams-background";
import Logo from "~/components/ui/Logo";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "~/app/globals.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: module has no type declarations for side-effect import
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
        {children}
        <Logo />
      </PageTransition>
    </AnimatePresence>
  );
};

export default Layout;
