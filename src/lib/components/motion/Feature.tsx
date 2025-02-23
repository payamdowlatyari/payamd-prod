import { cn } from "./utils/cn";

/**
 * A component that renders a feature component with a title, description, and icon.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - The description of the feature.
 * @param {React.ReactNode} props.icon - The icon to be displayed next to the title.
 * @returns {JSX.Element} The rendered Feature component.
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
