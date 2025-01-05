"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ReactElement } from "react";

import { Chakra as ChakraProvider } from "~/lib/components/Chakra";

/**
 * Provides the Chakra UI CacheProvider and ChakraProvider to the app.
 *
 * These providers are necessary to use Chakra UI components in the app.
 * The CacheProvider is used to cache the Chakra UI theme and font styles.
 * The ChakraProvider is used to provide the Chakra UI theme to the app.
 *
 * @param {{ children: ReactNode }} props The props object.
 * @param {ReactNode} props.children The children to be rendered.
 * @returns {ReactElement} The Providers component.
 */
const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
