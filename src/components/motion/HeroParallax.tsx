"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib/cjs/iconBase";

import BlurFade from "~/components/motion/BlurFade";
import { H1, Paragraph } from "~/components/ui/Texts";
import { projects } from "~/data";

type Product = {
  title: string;
  description: string;
  url: string;
  img: string;
  tags: string[];
  icons: {
    name: string;
    icon: IconType;
  }[];
};

type Details = {
  title: string;
  description: string;
  icons: string[];
};

/**
 * A component that displays a hero section with a parallax effect.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.icons - An array of icon URLs to display in the hero section.
 */
const PageIcons = ({ icons }: { icons: string[] }) => {
  return (
    <div className="flex flex-wrap space-x-5 md:space-x-10 mt-2 md:mt-4">
      {icons.map((icon) => {
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
              className="w-6 h-6 m-1 object-contain"
            />
          </div>
        );
      })}
    </div>
  );
};

/**
 * A component that displays page details with a parallax effect.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.details - The details data to display in the hero section.
 */
export const PageDetails = ({ details }: { details: Details }) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <BlurFade
        delay={0.5}
        inView
        duration={0.5}
        blur="6px"
        variant={{ hidden: { y: 100 }, visible: { y: 0 } }}
      >
        <div className="sm:pl-8 pt-16 pl-4 flex flex-col">
          <div className="grid gap-2 md:gap-4">
            <H1 label={details.title} />
            <Paragraph className="max-w-xl" text={details.description} />
          </div>
          <PageIcons icons={details.icons} />
        </div>
      </BlurFade>
    </div>
  );
};

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
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeInOut" },
        zIndex: 100,
      }}
      key={product.title}
      className="group/product h-40 md:h-60 lg:h-72 w-60 md:w-72 lg:w-96 max-w-screen-sm relative flex-shrink-0"
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
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-100 shadow-xl shadow-neutral-500 rounded-xl pointer-events-none bg-gradient-to-b from-neutral-800 via-neutral-800 to-transparent backdrop-blur-sm" />
        <div className="flex flex-col justify-between items-stretch h-full p-2 md:p-4 lg:p-6">
          <h3 className="z-10 text-base sm:text-lg md:text-xl opacity-0 group-hover/product:opacity-100 font-semibold text-neutral-100 tracking-tight mb-1">
            {product.title}
          </h3>
          <p className="z-10 opacity-0 group-hover/product:opacity-100 text-neutral-300 text-xs sm:text-sm md:text-base my-1">
            {product.description}
          </p>
          <div className="z-10 opacity-0 group-hover/product:opacity-100 flex justify-start mt-2 md:mt-4">
            {Object.values(product.icons).map((icon) => {
              return icon.icon ? (
                <span className="mr-2 md:mr-4" key={icon.name}>
                  <icon.icon size={20} />
                </span>
              ) : null;
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * A hero section for a web development portfolio page.
 */
export const HeroParallax = () => {
  const { products, details } = projects;
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const thirdRow = products.slice(6, 9);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 200]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -200]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-500, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[280vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <PageDetails details={details} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse mb-5 md:mb-10 gap-2 md:gap-4 lg:gap-6">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-5 md:mb-10 gap-2 md:gap-4 lg:gap-6">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-2 md:gap-4 lg:gap-6">
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

/**
 * A hero section for a web development portfolio page.
 */
export const MobileHeroParallax = () => {
  const { products, details } = projects;
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-500, 100]),
    { stiffness: 300, damping: 30, bounce: 100 }
  );
  return (
    <div
      ref={ref}
      className="h-auto py-20 overflow-hidden antialiased relative flex flex-col self-auto"
    >
      <PageDetails details={details} />
      <div className="flex flex-col gap-10 mt-10">
        {products.map((product) => (
          <BlurFade
            key={product.title}
            inView
            duration={0.5}
            delay={0.5}
            blur="6px"
            variant={{ hidden: { y: 100 }, visible: { y: 0 } }}
          >
            <ProductCard product={product} translate={translateY} />
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

/**
 * A component that renders a hero section with a parallax effect.
 */
const ResponsiveHeroParallax = () => {
  return (
    <>
      <div className="hidden md:block">
        <HeroParallax />
      </div>
      <div className="block md:hidden">
        <MobileHeroParallax />
      </div>
    </>
  );
};

export default ResponsiveHeroParallax;
