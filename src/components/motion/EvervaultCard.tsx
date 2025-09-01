"use client";

import { GlowingEffect } from "~/components/ui/glowing-effect";
import { cn } from "~/utils/cn";

/**
 * Props for the GlowingGridCard component.
 */
interface GlowingGridCardProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

/**
 * A motion component that renders a card with a glowing effect, used for
 * the Evervault dashboard.
 *
 * @param {{ area: string; icon: React.ReactNode; title: string; description: React.ReactNode }} props - The component props.
 * @param {string} props.area - The area of the grid where the card should be placed.
 * @param {React.ReactNode} props.icon - The icon to be displayed on the card.
 * @param {string} props.title - The title of the card.
 * @param {React.ReactNode} props.description - The description to be displayed on the card.
 */
const GlowingGridCard = ({
  area,
  icon,
  title,
  description,
}: GlowingGridCardProps) => {
  return (
    <li className={cn("h-80 w-80 list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-200/20 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          // eslint-disable-next-line react/jsx-boolean-value
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] border-neutral-200/20 p-3 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-neutral-200/20 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance">
                {title}
              </h3>
              <h2 className="pb-2 text-sm font-medium text-neutral-400 text-balance">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { GlowingGridCard };
