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
        "text-foreground font-semibold tracking-normal text-base md:text-lg",
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
        "my-1 text-muted-foreground uppercase tracking-normal leading-relaxed text-sm",
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
        "mt-1 ml-2 text-muted-foreground tracking-normal leading-relaxed text-sm min-w-12",
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
    <div
      className={cn(
        "mt-1 md:mt-2 text-muted-foreground tracking-normal leading-relaxed text-base leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  );
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
    <div className={cn("flex flex-col my-5 max-w-2xl")}>
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

          {item.description && item.description.length > 0 && (
            <CardDescription>
              <ul className="list-disc list-inside text-sm">
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
