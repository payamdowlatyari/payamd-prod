"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";

import { CircleStackIcon } from "./circle-stack";
import { CloudIcon } from "./cloud";
import { Cog6ToothIcon } from "./cog-6-tooth";
import { CommandLineIcon } from "./command-line";
import { ComputerDesktopIcon } from "./computer-desktop";
import { ServerStackIcon } from "./server-stack";

const serviceIcons: Record<string, typeof CloudIcon> = {
  "UX Design": ComputerDesktopIcon,
  "Frontend Development": ComputerDesktopIcon,
  "API Development": CommandLineIcon,
  "Backend Development": ServerStackIcon,
  "Database Design": CircleStackIcon,
  "Cloud Services": CloudIcon,
  DevOps: Cog6ToothIcon,
  "Application Architecture": ServerStackIcon,
  "Software Maintenance": Cog6ToothIcon,
};

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

/** Drive the icon from the whole card, including keyboard focus. */
export default function ServiceIcon({
  name,
  fallback: Fallback,
  active,
}: {
  name: string;
  fallback: IconType;
  active: boolean;
}) {
  const iconRef = useRef<IconHandle>(null);
  const reduceMotion = useReducedMotion();
  const Icon = serviceIcons[name];

  useEffect(() => {
    if (active && !reduceMotion) {
      iconRef.current?.startAnimation();
    } else {
      iconRef.current?.stopAnimation();
    }
  }, [active, reduceMotion]);

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-10 w-10 items-center justify-center text-foreground"
    >
      {Icon ? (
        <Icon ref={iconRef} size={28} />
      ) : (
        <motion.span
          className="inline-flex"
          animate={{ scale: active && !reduceMotion ? 1.12 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Fallback size={28} />
        </motion.span>
      )}
    </span>
  );
}
