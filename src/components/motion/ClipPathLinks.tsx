"use client";

import { useAnimate } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaMediumM } from "react-icons/fa";
import { FaGithub, FaTwitter } from "react-icons/fa6";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: any = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: any = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

/**
 * A component that renders a link with a custom icon. The icon is displayed on a
 * background that is a gradient of the primary color. The icon is rendered as an
 * SVG element. The component takes an optional `href` prop that specifies the link
 * target.
 *
 * @prop {string} [href] - The link target.
 * @prop {React.Component} Icon - The custom icon component.
 * @prop {string} [imgSrc] - The path to a custom icon image.
 * @prop {string} [className] - The CSS class name to apply to the icon.
 */
const LinkBox = ({ Icon, href, imgSrc, className }: any) => {
  const [scope, animate] = useAnimate();

  /**
   * Returns the side of the element that is closest to the mouse position.
   *
   * @param e The mouse event.
   * @returns The side of the element (left, right, top, bottom).
   */
  const getNearestSide = (e: {
    target: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  /**
   * Animates the `clip-path` of the link box when the user's mouse enters the element.
   * The animation is based on the nearest side of the box to the user's mouse position.
   * @param {object} e - The mouse event object from the `onMouseEnter` event.
   */
  const handleMouseEnter = (e: any) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  /**
   * Animate the `clip-path` of the link box when the user's mouse leaves the element.
   * The animation is based on the nearest side of the box to the user's mouse position.
   * @param {{ target: { getBoundingClientRect: () => any }, clientX: number, clientY: number }} e
   * The event object containing the target element and the user's mouse position.
   */
  const handleMouseLeave = (e: any) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-foreground bg-background"
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="custom icon"
          className={
            className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"
          }
        />
      ) : (
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      )}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-primary text-primary-foreground transition-colors duration-300"
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="custom icon hover"
            className={
              className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"
            }
          />
        ) : (
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
        )}
      </div>
    </a>
  );
};

/**
 * A component that renders a series of links with a "clip-path" animation when
 * hovered. The animation is triggered when the user hovers over the link, and
 * the animation is reversed when the user leaves the link. The links are
 * rendered in a grid layout, with the first row containing the email and
 * github links, the second row containing the twitter, linkedin, instagram,
 * and facebook links, and the third row containing the discord, 21st.dev, and
 * personal website links.
 */
export default function ClipPathLinks() {
  return (
    <div className="divide-y border divide-border border-border">
      <div className="grid grid-cols-4 divide-x divide-border">
        <LinkBox
          Icon={FaGithub}
          href="https://github.com/payamdowlatyari"
          imgSrc={undefined}
          className={undefined}
        />
        <LinkBox
          Icon={FaLinkedin}
          href="https://www.linkedin.com/in/payamdowlatyari/"
          imgSrc={undefined}
          className={undefined}
        />
        <LinkBox
          Icon={FaTwitter}
          href="https://twitter.com/payamdowlatyari"
          imgSrc={undefined}
          className={undefined}
        />
        <LinkBox
          Icon={FaMediumM}
          href="https://medium.com/@pdowlatyari"
          imgSrc={undefined}
          className={undefined}
        />
      </div>
    </div>
  );
}
