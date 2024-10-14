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
        "flex flex-col lg:border-l py-10 relative group/feature border-blue-950"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-950 to-transparent pointer-events-none" />

      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-blue-950 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm max-w-xs relative z-10 px-10">{description}</p>
    </div>
  );
};
