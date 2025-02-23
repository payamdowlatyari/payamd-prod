/* eslint-disable consistent-return */
/* eslint-disable react/jsx-pascal-case */

"use client";

import { Tooltip } from "@chakra-ui/react";
import { type VariantProps, cva } from "class-variance-authority";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import { cn } from "./utils/cn";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto mt-8 flex h-[58px] w-max gap-2 rounded-2xl p-2"
);

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

/**
 * A single dock icon component, used by the Dock component.
 *
 * @param {Object} props - The props for the component.
 * @param {number} [props.size] - The size of the icon.
 * @param {number} [props.magnification] - The magnification of the icon.
 * @param {number} [props.distance] - The distance of the icon from the center.
 * @param {number} [props.mouseX] - The x position of the mouse.
 * @param {string} [props.className] - The class name of the icon.
 * @param {React.ReactNode} [props.children] - The content of the icon.
 * @param {Object} [props.props] - The props for the icon.
 * @returns {JSX.Element} The dock icon component.
 */
function DockIcon({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX,
            magnification,
            distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  medium: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 6A7 7 0 107 20 7 7 0 107 6zM18 6.5A3 6.5 0 1018 19.5 3 6.5 0 1018 6.5zM23 8A1 5 0 1023 18 1 5 0 1023 8z"
      />
    </svg>
  ),
};

const DATA = {
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/payamdowlatyari",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/payamdowlatyari/",
        icon: Icons.linkedin,
      },
      X: {
        name: "X",
        url: "https://x.com/payamyam",
        icon: Icons.x,
      },
      Medium: {
        name: "Medium",
        url: "https://medium.com/@pdowlatyari",
        icon: Icons.medium,
      },
    },
  },
};

/**
 * A demo of the Dock component, displaying a dock in the middle of the screen
 * with the social media links from the DATA object.
 *
 * @returns {JSX.Element} A JSX element representing the dock demo.
 */
export function SocialDock(): JSX.Element {
  return (
    <div className="bg-transparent relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <Tooltip>
        <Dock direction="middle">
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip label={name}>
                <Link
                  href={social.url}
                  aria-label={social.name}
                  className={cn("size-12 rounded-full")}
                >
                  <social.icon className="size-4" />
                </Link>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </Tooltip>
    </div>
  );
}

const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: "self" | "parent" | "global";
  springOptions?: SpringOptions;
};

/**
 * A component that adds a magnetic effect to a child element.
 *
 * @param {MagneticProps} props - The props for the Magnetic component.
 * @returns {JSX.Element} A JSX element representing the Magnetic component.
 */
export function Magnetic({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = "self",
  springOptions = SPRING_CONFIG,
}: MagneticProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (isHovered && absoluteDistance <= range) {
          const scale = 1 - absoluteDistance / range;
          x.set(distanceX * intensity * scale);
          y.set(distanceY * intensity * scale);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    document.addEventListener("mousemove", calculateDistance);

    return () => {
      document.removeEventListener("mousemove", calculateDistance);
    };
  }, [ref, isHovered, intensity, range, x, y]);

  useEffect(() => {
    if (actionArea === "parent" && ref.current?.parentElement) {
      const parent = ref.current.parentElement;

      const handleParentEnter = () => setIsHovered(true);
      const handleParentLeave = () => setIsHovered(false);

      parent.addEventListener("mouseenter", handleParentEnter);
      parent.addEventListener("mouseleave", handleParentLeave);

      return () => {
        parent.removeEventListener("mouseenter", handleParentEnter);
        parent.removeEventListener("mouseleave", handleParentLeave);
      };
    }
    if (actionArea === "global") {
      setIsHovered(true);
    }
  }, [actionArea]);

  const handleMouseEnter = () => {
    if (actionArea === "self") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (actionArea === "self") {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={actionArea === "self" ? handleMouseEnter : undefined}
      onMouseLeave={actionArea === "self" ? handleMouseLeave : undefined}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A component that adds a magnetic effect to a social link.
 *
 * @param {MagneticSocialLinkProps} props - The props for the MagneticSocialLink component.
 * @returns {JSX.Element} A JSX element representing the MagneticSocialLink component.
 */
function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}): JSX.Element {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full px-2.5 py-1 text-sm transition-colors duration-200 text-neutral-100"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </Magnetic>
  );
}

/**
 * A component that displays social links with a magnetic effect.
 *
 * @returns {JSX.Element} A JSX element representing the MagneticSocialLinks component.
 */
export function MagneticSocialLinks(): JSX.Element {
  return (
    <div className="flex min-h-32 w-full items-center justify-center bg-transparent">
      <div className="flex items-center justify-start space-x-3">
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <MagneticSocialLink key={name} link={social.url}>
            {name}
          </MagneticSocialLink>
        ))}
      </div>
    </div>
  );
}
