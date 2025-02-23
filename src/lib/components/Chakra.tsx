import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from "@chakra-ui/react";

import customTheme from "~/lib/styles/theme/index";

interface ChakraProps {
  children: React.ReactNode;
}

/**
 * The ChakraProvider component is used to provide the Chakra UI theme to the app.
 * It also sets the initial color mode to "light" and the color mode manager to "cookie".
 * @param {ChakraProps} props - The component props.
 * @returns {JSX.Element} A JSX element representing the ChakraProvider component.
 */
export const Chakra = ({ children }: ChakraProps): JSX.Element => {
  return (
    <>
      <ColorModeScript
        initialColorMode={customTheme.config?.initialColorMode}
        type="cookie"
      />
      <ChakraProvider
        colorModeManager={cookieStorageManager}
        theme={customTheme}
      >
        {children}
      </ChakraProvider>
    </>
  );
};
