import { cn } from "./utils/cn";

export const Feature = ({
  title,
  description,
  icon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-l lg:border-t py-10 relative group/feature border-neutral-600"
      )}
    >
      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <span className="group-hover/feature:translate-x-2 text-neutral-300 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm max-w-xs relative z-10 px-10 text-neutral-300">
        {description}
      </p>
    </div>
  );
};
