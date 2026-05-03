"use client";

import React, { useRef, useEffect } from "react";

import { cn } from "~/utils/cn";

type WWavePathProps = React.ComponentProps<"div"> & {
  className?: string;
};

/**
 * A React component that renders an interactive wave path animation.
 *
 * This component creates a wave-like effect that responds to mouse movements. When the user moves their mouse over the component, the wave will deform based on the movement, creating a dynamic and engaging visual effect. The wave will return to its original state when the mouse leaves the component.
 *
 * @param {WWavePathProps} props - The properties for the WavePath component.
 * @param {string} props.className - Additional CSS classes for styling the component.
 */
export default function WavePath({ className, ...props }: WWavePathProps) {
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let x = 0.2;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  const setPath = (_progress: number) => {
    const width = window.innerWidth * 0.7;
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * x} ${100 + _progress * 0.6}, ${width} 100`
      );
    }
  };

  useEffect(() => {
    setPath(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lerp = (_x: number, y: number, a: number) => _x * (1 - a) + y * a;
  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  return (
    <div className={cn("relative h-px w-1/2", className)} {...props}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path ref={path} className="fill-none stroke-current" strokeWidth={2} />
      </svg>
    </div>
  );
}
