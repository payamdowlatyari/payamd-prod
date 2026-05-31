"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface UnfoldingTextProps {
  text: string;
  initialRotateY?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
}

const UnfoldingText = ({
  text,
  initialRotateY = 40,
  strokeColor = "white",
  fillColor = "transparent",
  className = "",
}: UnfoldingTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .to(textRef.current, {
          rotateY: 0,
          delay: 1.5,
          duration: 1.5,
        })
        .then(() => {
          gsap.to(textRef.current, {
            WebkitTextStroke: 0,
            WebkitTextStrokeColor: strokeColor,
            WebkitTextFillColor: strokeColor,
          });
        });
    },
    { scope: textRef }
  );

  return (
    <div style={{ perspective: 500 }}>
      <div
        ref={textRef}
        className={`font-semibold ${className}`}
        style={{
          WebkitTextStroke: 0.4,
          WebkitTextStrokeColor: strokeColor,
          WebkitTextFillColor: fillColor,
          transform: `rotateY(${initialRotateY}deg)`,
          transformOrigin: "left center",
          lineHeight: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default UnfoldingText;
