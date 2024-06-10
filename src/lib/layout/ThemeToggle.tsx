import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

/**
 * ThemeToggle component
 *
 * This component renders a button that allows the user to toggle between light and dark themes.
 * It uses the useColorMode hook from the @chakra-ui/react library to manage the color mode.
 */
const ThemeToggle = () => {
  // Get the current color mode and a function to toggle it from the useColorMode hook
  const { colorMode, toggleColorMode } = useColorMode();

  /**
   * Handles the click event when the button is clicked.
   * Toggles the color mode between light and dark.
   */
  const handleClick = () => {
    toggleColorMode();
  };

  return (
    // Render the IconButton component with the appropriate icon and click event handler
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={handleClick}
    />
  );
};

export default ThemeToggle;
