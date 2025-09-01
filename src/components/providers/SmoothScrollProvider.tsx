"use client";

import LocomotiveScroll from "locomotive-scroll";
import { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null as LocomotiveScroll | null,
});

/**
 * Props for the SmoothScrollProvider component.
 */
interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: any;
}

/**
 * SmoothScrollProvider
 * 
 * This component provides a context for smooth scrolling to children components.
 * 
 * It uses the Locomotive Scroll library to create a smooth scrolling effect.
 * The scroll instance is stored in the context, and can be accessed by children
 * components using the `useSmoothScroll` hook.
 * 
 * You can pass options to the Locomotive Scroll constructor using the `options`
 * prop.
 * @example <SmoothScrollProvider options={{ ... }}>
  <YourApp />
</SmoothScrollProvider>
 * @param {SmoothScrollProviderProps} props - The component props.
 */
export const SmoothScrollProvider = ({
  children,
  options,
}: SmoothScrollProviderProps) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

          setScroll(
            new LocomotiveScroll({
              el: document.querySelector("[data-scroll-container]"),
              ...options,
            })
          );
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      scroll?.destroy();
    };
  }, [options, scroll]);

  return (
    <SmoothScrollContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        scroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
