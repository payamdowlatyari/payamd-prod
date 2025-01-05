/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-useless-fragment */

"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

const iconSlugs = [
  "typescript",
  "javascript",
  "java",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "amazonaws",
  "mysql",
  "mongodb",
  "framer",
  "vercel",
  "python",
  "jest",
  "docker",
  "jenkins",
  "git",
  "jira",
  "github",
  "slack",
  "visualstudiocode",
  "postman",
  "figma",
  "npm",
  "yarn",
  "reactrouter",
  "tailwindcss",
  "bootstrap",
  "graphql",
  "awsamplify",
  "svelte",
];

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

/**
 * Renders a simple icon with a light or dark background depending on the theme.
 *
 * @param icon Icon data with a name and a color.
 * @param theme The theme to use, either "light" or "dark".
 * @returns {JSX.Element} The rendered icon.
 */
export const renderCustomIcon = (
  icon: SimpleIcon,
  theme: string
): JSX.Element => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

/**
 * A component that renders a cloud of icons in a floating dock.
 *
 * It takes an array of icon slugs as a prop, fetches the icons from the server,
 * and renders them in a cloud layout.
 *
 * The cloud is interactive and can be dragged around the screen.
 *
 * @param {string[]} iconSlugs An array of icon slugs to render.
 * @returns {JSX.Element} A JSX element representing the cloud of icons.
 */
export default function IconCloud(): JSX.Element {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "dark")
    );
  }, [data, theme]);

  return (
    // @ts-expect-error
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
