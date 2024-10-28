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

import { BlurFade } from "./BlurFade";

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
      className="group/product h-72 w-[25rem] max-w-screen-sm relative flex-shrink-0"
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

      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-black pointer-events-none" />
      <div className="flex flex-col justify-between h-full p-6">
        <h3 className="absolute top-4 left-4 z-10 text-xl text-white tracking-tighter">
          {product.title}
        </h3>
        <p className="absolute top-12 left-4 opacity-0 group-hover/product:opacity-100 text-white text-sm">
          {product.description}
        </p>
        <div className="absolute bottom-12 left-4 opacity-0 group-hover/product:opacity-100">
          {product.tags?.map((tag: any) => {
            return (
              <span className="inline-flex items-center m-1 gap-x-1 py-1 px-3 rounded-full text-xs font-medium border border-neutral-700 text-white">
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

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
}) => {
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
      className="h-[200vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <BlurFade delay={1} inView>
          <h1
            style={{ lineHeight: 1.5 }}
            className="relative z-10 text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 tracking-tighter ml-2"
          >
            Projects
          </h1>
        </BlurFade>
        <BlurFade delay={1.25} inView>
          <h3 className="text-xl md:text-3xl font-semibold text-neutral-300 mt-4 ml-3">
            My Web Development Portfolio
          </h3>
        </BlurFade>
        <p className="max-w-2xl text-base md:text-xl mt-8 ml-2 text-neutral-300">
          Here are some of my most recent works in web applications and landing
          pages. I have used different tools, technologies, and services to
          create these projects.
        </p>
      </div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
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
