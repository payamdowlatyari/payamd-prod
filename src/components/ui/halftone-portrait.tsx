"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

/** A static dot-screen portrait, sampled once from the original photograph. */
export default function HalftonePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;
    const image = new window.Image();
    image.onload = () => {
      const cells = 90;
      const sample = document.createElement("canvas");
      sample.width = cells;
      sample.height = cells;
      const sampleContext = sample.getContext("2d");
      if (!sampleContext) return;
      const crop = Math.min(image.naturalWidth, image.naturalHeight);
      sampleContext.drawImage(
        image,
        (image.naturalWidth - crop) / 2,
        (image.naturalHeight - crop) / 2,
        crop,
        crop,
        0,
        0,
        cells,
        cells
      );
      const { data } = sampleContext.getImageData(0, 0, cells, cells);
      const step = canvas.width / cells;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = getComputedStyle(canvas).color;
      for (let y = 0; y < cells; y += 1) {
        for (let x = 0; x < cells; x += 1) {
          const offset = (y * cells + x) * 4;
          const brightness =
            (data[offset] * 0.2126 +
              data[offset + 1] * 0.7152 +
              data[offset + 2] * 0.0722) /
            255;
          const alpha = data[offset + 3] / 255;
          const radius = Math.sqrt(brightness * alpha) * step * 0.44;
          context.beginPath();
          context.arc(
            (x + 0.5) * step,
            (y + 0.5) * step,
            radius,
            0,
            Math.PI * 2
          );
          context.fill();
        }
      }
    };
    image.src = "/me-home-bw-removebg.png";
    return () => {
      image.onload = null;
    };
  }, [resolvedTheme]);

  return (
    <motion.div
      role="img"
      aria-label="Halftone portrait of Payam Dowlatyari"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 1, ease: "easeOut" }}
      className="mx-auto w-full max-w-md [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
    >
      <canvas
        ref={canvasRef}
        width={900}
        height={900}
        aria-hidden="true"
        className="aspect-square h-auto w-full text-foreground"
      />
    </motion.div>
  );
}
