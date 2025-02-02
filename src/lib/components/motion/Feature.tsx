import { cn } from "./utils/cn";

/**
 * A component that renders a feature component with a title, description, and icon.
 *
 * The component styles a `div` with a border on the left and top, with a
 * hover effect that translates the title to the right by 2px.
 *
 * The component also styles a `div` with the feature title, and a `p` with the
 * feature description.
 *
 * @example
 * <Feature
 *   title="Feature Title"
 *   description="This is a feature of the website."
 *   icon={<Icon name="icon-name" />}
 * />
 *
 * @param {Object} props
 * @prop {string} title - The title of the feature.
 * @prop {string} description - The description of the feature.
 * @prop {ReactNode} icon - The icon to display for the feature.
 * @returns {JSX.Element} A JSX element representing the feature component.
 */
export const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative text-neutral-300 group/feature"
      )}
    >
      <div className="mb-4 relative z-10 px-5 md:px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-5 md:px-10">
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm max-w-xs relative z-10 px-5 md:px-10">
        {description}
      </p>
    </div>
  );
};
