"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Interface representing a menu item with a label and href.
 */
type MenuItem = {
  label: string;
  href: string;
};

/**
 * Interface representing the props for the MenuVertical component.
 */
interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
}

/**
 * A vertical menu component that displays a list of menu items with animation effects.
 *
 * @param {MenuVerticalProps} props - The component props.
 */
const MenuVertical = ({
  menuItems = [],
  color = "#e6e6e6",
  skew = 0,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-fit flex-col gap-4 px-10 z-10">
      {menuItems.map((item) => (
        <motion.div
          key={`${item.href}`}
          className="group/nav flex items-center gap-2 cursor-pointer"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", color: "inherit", opacity: 0 },
              hover: { x: 0, color, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-0"
          >
            <ArrowRight strokeWidth={3} className="size-10" />
          </motion.div>

          <motion.a
            href={item.href}
            variants={{
              initial: { x: -40, color: "inherit", skewX: 0 },
              hover: { x: 0, color, skewX: skew },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-semibold uppercase text-4xl no-underline"
          >
            {item.label}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { MenuVertical };
