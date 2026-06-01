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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
