"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { PageTransition } from "~/components/motion/PageTransition";
import Preview from "~/components/motion/Preview";
import Logo from "~/components/ui/Logo";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "~/app/globals.css";
import SpotlightBackground from "~/components/ui/spotlight-background";

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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <SpotlightBackground>
      <Preview />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={currentPath}>
          {children}
          <Logo />
        </PageTransition>
      </AnimatePresence>
    </SpotlightBackground>
  );
};

export default Layout;
