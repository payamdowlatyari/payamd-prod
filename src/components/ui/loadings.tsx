import { cn } from "~/utils/cn";

type TerminalProps = React.ComponentProps<"span"> & {
  prompt?: string;
};

/**
 * A React component that renders a terminal-like loading indicator with a blinking cursor.
 *
 * @param {TerminalProps} props - The properties for the Terminal component.
 */
function Terminal({ className, prompt = ">", style, ...props }: TerminalProps) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-terminal-blink {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }
      `}</style>
      <span
        role="status"
        className={cn(
          "inline-flex items-center gap-[0.25em] font-mono",
          className
        )}
        style={style}
        {...props}
      >
        <span aria-hidden="true">{prompt}</span>
        <span
          aria-hidden="true"
          className="inline-block w-[0.5em] bg-current"
          style={{
            height: "1em",
            animation:
              "loading-ui-terminal-blink var(--duration, 1s) step-end infinite",
          }}
        />
        <span className="sr-only">Loading</span>
      </span>
    </>
  );
}

/**
 * A React component that renders a clock-like loading indicator.
 *
 * @param {React.ComponentProps<"span">} props - The properties for the ClockRing component.
 */
function ClockRing({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-clock-ring-rotation {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <span
        role="status"
        className={cn(
          "relative inline-block rounded-full border-2 border-current",
          className
        )}
        style={{
          animation:
            "loading-ui-clock-ring-rotation var(--duration, 1.5s) linear infinite",
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 left-1/2 bg-current"
          style={{
            width: "6.25%",
            height: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <span className="sr-only">Loading</span>
      </span>
    </>
  );
}

/**
 * A React component that renders an infinity loop-like loading indicator.
 *
 * @param {React.ComponentProps<"svg">} props - The properties for the InfinityLoop component.
 */
function InfinityLoop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <title>Loading...</title>
      <style>{`
        @keyframes loading-ui-infinity-dash {
          to {
            stroke-dashoffset: 256.58892822265625;
          }
        }
      `}</style>
      <path
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="205.271142578125 51.317785644531256"
        style={{
          transform: "scale(0.8)",
          transformOrigin: "50px 50px",
          animationName: "loading-ui-infinity-dash",
          animationDuration: "var(--duration, 2s)",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
    </svg>
  );
}

type TextDotsProps = React.ComponentProps<"span"> & {
  dots?: number;
};

/**
 * A React component that renders a text-based loading indicator with animated dots.
 *
 * @param {TextDotsProps} props - The properties for the TextDots component.
 */
function TextDots({
  className,
  children,
  dots = 3,
  style,
  ...props
}: TextDotsProps) {
  const dotCount = Number.isFinite(dots) ? Math.max(1, Math.floor(dots)) : 3;

  return (
    <>
      <style>{`
        @keyframes loading-ui-text-dots {
          0%,
          100% {
            opacity: 0;
          }

          50% {
            opacity: 1;
          }
        }
      `}</style>
      <span
        role="status"
        className={cn("inline-flex items-center", className)}
        style={style}
        {...props}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="inline-flex">
          {Array.from({ length: dotCount }, (_, index) => (
            <span
              key={index}
              style={{
                animation:
                  "loading-ui-text-dots var(--duration, 1.4s) infinite",
                animationDelay: `calc(var(--delay, 0.2s) * ${index + 1})`,
              }}
            >
              .
            </span>
          ))}
        </span>
      </span>
    </>
  );
}

export { ClockRing, Terminal, InfinityLoop, TextDots };
