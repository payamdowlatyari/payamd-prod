import BlurFade from "~/components/motion/BlurFade";
import { cn } from "~/utils/cn";

/**
 * A h1 element with a blur fade animation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to render as the h1 element's content.
 * @param {string} [props.className] - Optional additional class names for styling.
 */
const H1 = ({ label, className }: { label: string; className?: string }) => (
  <BlurFade delay={0.3} inView>
    <h1 className={cn("page-title", className)}>{label}</h1>
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
  <BlurFade delay={0.4} inView>
    <h2 className={cn("section-title", className)}>{label}</h2>
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
  <BlurFade delay={0.5} inView>
    <h3 className={cn("card-title", className)}>{label}</h3>
  </BlurFade>
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
  <BlurFade duration={0.7} delay={0.3} inView>
    <p className={cn("body-copy max-w-[46ch]", className)}>{text}</p>
  </BlurFade>
);

export { H1, H2, H3, Paragraph };
