"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib/cjs/iconBase";

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

/** Filters come from project metadata, so every technology has matching work. */
const technologies = Array.from(
  new Map(
    projects.products.flatMap((product) =>
      product.icons.map((technology) => [technology.name, technology] as const)
    )
  ).values()
);

function ProjectFilters({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (name: string | null) => void;
}) {
  const buttonClass = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground"}`;
  return (
    <div
      role="group"
      aria-label="Filter projects by technology"
      className="mt-3 flex flex-wrap gap-2"
    >
      <button
        type="button"
        aria-pressed={selected === null}
        aria-controls="project-gallery"
        onClick={() => onSelect(null)}
        className={buttonClass(selected === null)}
      >
        All projects{" "}
        <span className="tabular-nums opacity-60">
          {projects.products.length}
        </span>
      </button>
      {technologies.map(({ name, icon: Icon }) => {
        const count = projects.products.filter((product) =>
          product.icons.some((technology) => technology.name === name)
        ).length;
        return (
          <button
            key={name}
            type="button"
            aria-pressed={selected === name}
            aria-controls="project-gallery"
            onClick={() => onSelect(selected === name ? null : name)}
            className={buttonClass(selected === name)}
          >
            <Icon size={16} aria-hidden="true" />
            {name === "Typescript" ? "TypeScript" : name}
            <span className="tabular-nums opacity-60">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export const PageDetails = ({
  details,
  children,
}: {
  details: Details;
  children?: React.ReactNode;
}) => (
  <div className="section-shell pb-12 pt-32 md:pb-20 md:pt-40">
    <div className="grid gap-7">
      <div>
        <p className="heading-label mb-7">{details.title}</p>
        <h1 className="page-title max-w-5xl">Selected work.</h1>
      </div>
      <p className="body-copy max-w-xl">{details.description}</p>
      {children}
    </div>
  </div>
);

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
  translate?: MotionValue<number>;
}) => {
  const reduceMotion = useReducedMotion();
  const external = /^https?:\/\//.test(product.url);
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      key={product.title}
      className="group/product relative h-full min-w-0 w-full"
    >
      <Link
        href={product.url}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <div className="relative aspect-[7/4] w-full shrink-0 overflow-hidden">
          <Image
            src={product.img}
            height={1000}
            width={1750}
            sizes="(min-width: 1440px) 420px, (min-width: 768px) 30vw, 90vw"
            className="h-full w-full object-contain"
            alt={product.title}
          />
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 border-t border-border p-4 lg:p-5">
          <h3 className="card-title z-10">{product.title}</h3>
          <p className="z-10 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="z-10 flex justify-start text-primary">
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

/** Local scroll progress gives each row a small, opposing horizontal drift. */
function ProjectRow({
  products,
  reverse,
}: {
  products: Product[];
  reverse: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = desktop && !reduceMotion ? 24 : 0;
  const x = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      reverse ? [distance, -distance] : [-distance, distance]
    ),
    { stiffness: 120, damping: 30 }
  );

  return (
    <div ref={ref} className="md:px-6">
      <motion.div
        style={{ x }}
        className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </motion.div>
    </div>
  );
}

export const HeroParallax = () => {
  const { products, details } = projects;
  const [selected, setSelected] = React.useState<string | null>(null);
  const filtered = selected
    ? products.filter((product) =>
        product.icons.some((technology) => technology.name === selected)
      )
    : products;
  const rows = Array.from(
    { length: Math.ceil(filtered.length / 3) },
    (_, index) => filtered.slice(index * 3, index * 3 + 3)
  );
  return (
    <div className="relative pb-16 md:pb-24">
      <PageDetails details={details}>
        <ProjectFilters selected={selected} onSelect={setSelected} />
        <p
          role="status"
          aria-atomic="true"
          className="text-xs text-muted-foreground"
        >
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {selected
            ? ` using ${selected === "Typescript" ? "TypeScript" : selected}`
            : " in total"}
        </p>
      </PageDetails>
      <div
        id="project-gallery"
        className="section-shell space-y-8 md:space-y-12"
      >
        {rows.map((row, index) => (
          <ProjectRow
            key={row[0].title}
            products={row}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};

/** One responsive gallery keeps every project in the reading and tab order. */
export const MobileHeroParallax = HeroParallax;
export default HeroParallax;
