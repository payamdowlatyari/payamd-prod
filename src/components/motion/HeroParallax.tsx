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

import { H1, Paragraph } from "../Texts/Texts";
import BlurFade from "~/components/motion/BlurFade";
import { GradientTracing } from "~/components/motion/PulseBeams";

/**
 * Renders a badge with a rotating border animation.
 * @param {string} title - The title text to display in the center of the badge.
 */
export function BadgeRotateBorder({
  title,
  key,
}: {
  title: string;
  key: number | string;
}) {
  return (
    <span
      className="relative inline-flex overflow-hidden rounded-full m-1 bg-neutral-400"
      key={key}
    >
      <span className="inline-flex h-full w-full items-center justify-center bg-neutral-400 p-1 text-xs font-semibold text-neutral-950">
        {title}
      </span>
    </span>
  );
}

/**
 * A component that renders a product card with a hover animation.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data to display in the card.
 * @param {MotionValue} props.translate - The motion value used for the hover animation.
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
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-32 sm:h-40 md:h-60 lg:h-72 w-40 sm:w-60 md:w-72 lg:w-96 max-w-screen-sm relative flex-shrink-0"
    >
      <Link
        href={product.url}
        className="block group-hover/product:shadow-2xl"
        target="__blank"
        rel="noopener noreferrer"
      >
        <Image
          src={product.img}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </Link>

      <div className="absolute inset-0 h-full w-full opacity-30 group-hover/product:opacity-90 bg-black pointer-events-none" />
      <div className="flex flex-col justify-center place-items-start h-full p-2 md:p-4 lg:p-6">
        <h3 className="z-10 text-base sm:text-lg md:text-xl opacity-0 group-hover/product:opacity-100 font-semibold text-neutral-50 tracking-tight mb-1">
          {product.title}
        </h3>
        <p className="z-10 opacity-0 group-hover/product:opacity-100 text-neutral-300 text-xs sm:text-sm md:text-base my-1">
          {product.description}
        </p>
        <div className="z-10 opacity-0 group-hover/product:opacity-100 hidden md:flex mt-2 md:mt-4">
          {product.tags?.map((tag: string, i: number) => {
            return <BadgeRotateBorder title={tag} key={tag.slice(0, i + 1)} />;
          })}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * A hero section for a web development portfolio page.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.products - An array of product data to display in the hero section.
 */
export const HeroParallax = ({
  products,
  details,
}: {
  products: {
    title: string;
    description: string;
    url: string;
    img: string;
    tags: string[];
  }[];
  details: {
    title: string;
    description: string;
    icons: string[];
  };
}) => {
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);
  const thirdRow = products.slice(8, 12);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 600]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, -600]),
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
    useTransform(scrollYProgress, [0, 0.2], [-800, 300]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[280vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <BlurFade
          delay={0.5}
          inView
          duration={0.5}
          blur="6px"
          variant={{ hidden: { y: 100 }, visible: { y: 0 } }}
        >
          <div className="sm:pl-8 pt-16 pl-4 flex flex-col">
            <div className="grid gap-2 my-5">
              <H1 label={details.title} />
              <Paragraph className="max-w-xl" text={details.description} />
              <GradientTracing
                width={300}
                height={100}
                path="M0,50 C25,0 50,100 75,50 S125,0 150,50 S200,100 225,50 S275,0 300,50 M0,50 C25,100 50,0 75,50 S125,100 150,50 S200,0 225,50 S275,100 300,50"
                gradientColors={["#FF6B6B", "#FF6B6B", "#4ECDC4"]}
              />
            </div>
            <div className="flex flex-wrap space-x-5 md:space-x-10 mt-2 md:mt-4">
              {details.icons.map((icon) => {
                return (
                  <div
                    key={icon}
                    className="flex items-center justify-center w-10 h-10 my-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all ease-in-out"
                  >
                    <Image
                      src={icon}
                      alt={icon}
                      width={40}
                      height={40}
                      className="w-6 h-6 m-1 hover:animate-spin transition-all duration-500 ease-in-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-5 md:space-x-10 mb-5 md:mb-10">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-5 md:space-x-10 mb-5 md:mb-10">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-5 md:space-x-10">
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
