"use client";

import { LinkArrowOut } from "~/components/ui/Button";
import { cn } from "~/utils/cn";

/**
 * A component that renders a card title with specified styling.
 *
 * @param {Object} props - The component props.
 */
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-neutral-100 font-semibold tracking-wide text-base md:text-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};

/**
 * A component that renders a styled subtitle paragraph.
 *
 * @param {Object} props - The component props.
 */
export const CardSubTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "my-1 md:my-2 text-neutral-400 uppercase tracking-wide leading-relaxed text-xs md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that renders a date label.
 *
 * @param {Object} props - The component props.
 */
export const CardDate = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 ml-2 text-neutral-400 tracking-wide leading-relaxed text-xs md:text-sm min-w-12",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that renders a description paragraph with specified styling.
 *
 * @param {Object} props - The component props.
 */
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 md:mt-2 text-neutral-200 tracking-wide leading-relaxed text-xs md:text-sm md:leading-loose",
        className
      )}
    >
      {children}
    </p>
  );
};

interface CardProps {
  title: string;
  subtitle: string;
  description: string[];
  date: string;
  link?: string;
}

/**
 * A component that renders a card with specified items.
 *
 * @param {CardProps[]} props - The component props.
 */
export function Card({ items }: { items: CardProps[] }) {
  return (
    <div
      className={cn(
        "flex flex-col my-5 animate-shine rounded-xl border max-w-2xl",
        "border-white/10 bg-[linear-gradient(110deg,#000000,45%,#303030,55%,#000000)] bg-[length:400%_100%]",
        "p-2 transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#303030,55%,#000103)]"
      )}
    >
      {items.map((item: CardProps) => (
        <div
          key={item.title}
          className="flex flex-col justify-start p-1 md:p-2"
        >
          <div className="flex flex-row">
            {item.link ? (
              <LinkArrowOut title={item.title} url={item.link} />
            ) : (
              <CardTitle>{item.title}</CardTitle>
            )}
            <CardDate>{item.date}</CardDate>
          </div>
          <CardSubTitle>{item.subtitle}</CardSubTitle>
          <CardDescription>
            {item.description && item.description.length > 0 && (
              <ul className="list-disc list-inside text-xs md:text-sm">
                {item.description.map((d: string) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </CardDescription>
        </div>
      ))}
    </div>
  );
}
