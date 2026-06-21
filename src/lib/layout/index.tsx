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
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
      <Preview />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={currentPath}>
          {children}
          <Logo />
        </PageTransition>
      </AnimatePresence>
    </>
  );
};

export default Layout;
