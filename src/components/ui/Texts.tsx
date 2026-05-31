import BlurFade from "~/components/motion/BlurFade";

/**
 * A h1 element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to render as the h1 element's content.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const H1 = ({ label, className }: { label: string; className?: string }) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <h1
      className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter ${className}`}
    >
      {label}
    </h1>
  </BlurFade>
);

/**
 * A h2 element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to render as the h2 element's content.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const H2 = ({ label, className }: { label: string; className?: string }) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <h2 className={`text-4xl sm:text-5xl md:text-6xl ${className}`}>{label}</h2>
  </BlurFade>
);

/**
 * A h3 element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to render as the h3 element's content.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const H3 = ({ label, className }: { label: string; className?: string }) => (
  <h3
    className={`text-3xl sm:text-4xl md:text-5xl text-neutral-200 ${className}`}
  >
    {label}
  </h3>
);

/**
 * A h4 element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to render as the h4 element's content.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const H4 = ({ label, className }: { label: string; className?: string }) => (
  <h4
    className={`text-2xl sm:text-3xl md:text-4xl text-neutral-200 ${className}`}
  >
    {label}
  </h4>
);

/**
 * A p element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to render inside the paragraph.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const Paragraph = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <p
      className={`text-neutral-300 max-w-screen-sm text-xs sm:text-sm md:text-base ${className}`}
    >
      {text}
    </p>
  </BlurFade>
);

export { H1, H2, H3, H4, Paragraph };
