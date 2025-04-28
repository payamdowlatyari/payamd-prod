"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ReactElement } from "react";

import Chakra from "~/components/Chakra";

/**
 * Provides the Chakra UI CacheProvider and ChakraProvider to the app.
 * @param {ProvidersProps} props - The component props.
 * @returns {JSX.Element} A JSX element representing the Providers component.
 */
const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  return (
    <CacheProvider>
      <Chakra>{children}</Chakra>
    </CacheProvider>
  );
};

export default Providers;
