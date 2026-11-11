"use client";

import "lenis/dist/lenis.css";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import PageTransition from "~/components/motion/PageTransition";
import Preview from "~/components/motion/Preview";
import SmoothScrolling from "~/components/motion/SmoothScrolling";
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
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_700px_500px_at_50%_0%,hsl(var(--primary)/0.045),transparent)]"
      />
      <SmoothScrolling />
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
