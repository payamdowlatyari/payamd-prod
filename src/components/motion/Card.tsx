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
    <h3
      className={cn(
        "font-display text-base font-medium leading-snug tracking-tight text-foreground md:text-lg",
        className
      )}
    >
      {children}
    </h3>
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
        "mt-1 text-sm leading-relaxed text-muted-foreground",
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
        "shrink-0 text-xs leading-relaxed tabular-nums text-muted-foreground",
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
  return <div className={cn("body-copy mt-2", className)}>{children}</div>;
};

/**
 * An interface that defines the props for the Card component.
 */
interface CardProps {
  title: string;
  subtitle: string;
  description?: string[];
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
        "my-5 flex w-full max-w-2xl flex-col divide-y divide-border/60"
      )}
    >
      {items.map((item: CardProps) => (
        <div
          key={item.title}
          className="flex flex-col py-4 first:pt-0 last:pb-0"
        >
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
            <CardTitle>
              {item.link ? (
                <LinkArrowOut
                  title={item.title}
                  url={item.link}
                  className="py-0 text-base leading-snug tracking-tight underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground focus-visible:decoration-foreground md:text-lg"
                />
              ) : (
                item.title
              )}
            </CardTitle>
            <CardDate>{item.date}</CardDate>
          </div>
          <CardSubTitle>{item.subtitle}</CardSubTitle>

          {item.description && item.description.length > 0 && (
            <CardDescription>
              <ul className="ml-4 list-outside list-disc space-y-1 text-sm leading-5 marker:text-muted-foreground/50">
                {item.description.map((d: string) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </CardDescription>
          )}
        </div>
      ))}
    </div>
  );
}
