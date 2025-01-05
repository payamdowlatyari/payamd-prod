"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GridBeam } from "./BackgroundBeams";
import { BlurFade } from "./BlurFade";

/**
 * Renders a badge with a rotating border animation.
 *
 * @param {string} title - The title text to display in the center of the badge.
 * @returns {JSX.Element} A JSX element representing a badge with a rotating border.
 */

export function BadgeRotateBorder(title: string): JSX.Element {
  return (
    <div className="relative inline-flex overflow-hidden rounded-full p-px">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl">
        {title}
      </span>
    </div>
  );
}

/**
 * A component that renders a product card with a hover animation.
 *
 * @param {Object} props
 * @prop {Object} product - The product data to display in the card, with keys:
 *   - title: The title of the product, as a string.
 *   - description: A short description of the product, as a string.
 *   - url: The URL to link to when the card is clicked, as a string.
 *   - img: The URL of the product image to display, as a string.
 *   - tags: An array of strings representing tags or categories associated with the product.
 * @prop {MotionValue<number>} translate - A Framer Motion `MotionValue` representing the horizontal position of the card, to be animated.
 * @returns {JSX.Element} A JSX element representing a product card with a hover animation.
 */
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    description: string;
    url: string;
    img: string;
    tags: string[];
  };
  translate: MotionValue<number>;
}): JSX.Element => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-48 md:h-60 lg:h-72 w-[15rem] md:w-[20rem] lg:w-[25rem] max-w-screen-sm relative flex-shrink-0"
    >
      <Link
        href={product.url}
        className="block group-hover/product:shadow-2xl"
        target="__blank"
      >
        <Image
          src={product.img}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </Link>

      <div className="absolute inset-0 h-full w-full opacity-10 group-hover/product:opacity-90 bg-black pointer-events-none" />
      <div className="flex flex-col justify-center place-items-start h-full p-6">
        <h3 className="z-10 text-xl md:text-3xl opacity-0 group-hover/product:opacity-100 font-semibold text-neutral-50 tracking-tight mb-1">
          {product.title}
        </h3>
        <p className="z-10 opacity-0 group-hover/product:opacity-100 text-neutral-300 text-base my-1">
          {product.description}
        </p>
        <div className="z-10 opacity-0 group-hover/product:opacity-100 mt-4">
          {product.tags?.map((tag: string) => {
            return (
              <div className="relative inline-flex overflow-hidden rounded-full p-px m-1">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium text-neutral-50 backdrop-blur-3xl">
                  {tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * A hero section for a web development portfolio page.
 *
 * This component renders a parallax scrolling effect for a set of products (web
 * applications or landing pages). It uses framer-motion to create a smooth and
 * responsive animation.
 *
 * The component takes an array of products as a prop, where each product is an
 * object containing the following properties:
 *
 * - title: The title of the product.
 * - description: A short description of the product.
 * - url: The URL of the product.
 * - img: The URL of an image for the product.
 * - tags: An array of tags associated with the product.
 *
 * The component will render a row of products, with each product in a separate
 * column. The products will be spaced evenly apart, with a small gap between
 * each row.
 *
 * The component uses the following animations:
 *
 * - The first row of products will be translated horizontally as the user scrolls
 *   down the page, with the products moving from left to right.
 * - The second row of products will be translated horizontally in the opposite
 *   direction, with the products moving from right to left.
 * - The third row of products will be translated horizontally in the same
 *   direction as the first row, with the products moving from left to right.
 * - The products will also be rotated and translated vertically as the user
 *   scrolls down the page, to create a sense of depth and movement.
 * - The products will fade in and out as the user scrolls down the page, to
 *   create a sense of depth and movement.
 *
 * The component also renders a heading and a paragraph of text above the
 * products, which will be blurred and faded in as the user scrolls down the page.
 *
 * The component uses the following styles:
 *
 * @param {Object[]} products - An array of products to render.
 * @param {string} products.title - The title of the product.
 * @param {string} products.description - A short description of the product.
 * @param {string} products.url - The URL of the product.
 * @param {string} products.img - The URL of an image for the product.
 * @param {string[]} products.tags - An array of tags associated with the product.
 * @returns {JSX.Element} A hero section for a web development portfolio page.
 */
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    description: string;
    url: string;
    img: string;
    tags: string[];
  }[];
}): JSX.Element => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <BlurFade delay={0.5} inView>
          <GridBeam className="sm:pl-16 pt-28 pl-4 flex">
            <div className="grid gap-2">
              <h1 className="text-5xl sm:text-7xl font-semibold max-w-sm">
                Projects
              </h1>
              <p className="text-neutral-400 max-w-lg">
                Here are some of my most recent works in web applications and
                landing pages. I have used different tools, technologies, and
                services to create these projects.
              </p>
            </div>
          </GridBeam>
        </BlurFade>
      </div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
