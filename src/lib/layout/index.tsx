"use client";

import "../../app/globals.css";
import { SmoothScrollbar, GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { type ReactNode } from "react";
import "@fontsource/poppins";

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
const Layout = ({ children }: LayoutProps) => {
  // Render the layout component
  return (
    // Apply a margin of 0 auto and width of 100% to center the content
    <main className="relative h-full w-full m-auto bg-black">
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
      {/* Set up the global canvas for rendering */}

      <GlobalCanvas style={{ pointerEvents: "none" }}>
        <ambientLight />
      </GlobalCanvas>

      <SmoothScrollbar>
        {(bind) => <article {...bind}>{children}</article>}
      </SmoothScrollbar>
    </main>
  );
};

export default Layout;
