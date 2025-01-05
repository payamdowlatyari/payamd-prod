import { cn } from "./utils/cn";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * A beam of light that moves horizontally across the element.
 *
 * The beam is a pseudo-element that is rendered with a gradient from
 * `colorFrom` to `colorTo` and has a width of `size` pixels. The beam
 * is positioned at the `anchor` percentage of the element, and has a
 * delay of `delay` seconds.
 *
 * The beam is rendered with a mask that is a linear gradient from
 * transparent to white, which is then composited with the background
 * image of the element to create a "beam" effect.
 *
 * @param {string} className CSS class names to add to the element.
 * @param {number} size The width of the beam in pixels. Defaults to 250.
 * @param {number} duration The duration of the animation in seconds. Defaults to 15.
 * @param {number} anchor The position of the beam as a percentage of the element. Defaults to 90.
 * @param {number} borderWidth The width of the border in pixels. Defaults to 1.5.
 * @param {string} colorFrom The color of the beam at the start. Defaults to "#0000ff".
 * @param {string} colorTo The color of the beam at the end. Defaults to "#ffff00".
 * @param {number} delay The delay of the animation in seconds. Defaults to 0.
 * @returns A JSX element representing the BorderBeam.
 */
export const BorderBeam = ({
  className,
  size = 250,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#0000ff",
  colorTo = "#ffff00",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // pseudo styles
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
};

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

/**
 * A component that renders a child element with a shining border effect.
 *
 * @param {object} props The component props.
 * @prop {number} [borderRadius=8] The border radius of the child element.
 * @prop {number} [borderWidth=1] The border width of the child element.
 * @prop {number} [duration=14] The duration of the animation in seconds.
 * @prop {string|string[]} [color="#000000"] The color of the shining border. Can be a single color or an array of colors.
 * @prop {string} [className] The class name to add to the child element.
 * @prop {React.ReactNode} children The child element(s) to render with the shining border effect.
 *
 * @returns A JSX element representing the ShineBorder.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid h-fit w-fit place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
      />
      {children}
    </div>
  );
}
