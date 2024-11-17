import Link from "next/link";
import { useScramble } from "use-scramble";

export default function Scramble({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const { ref, replay } = useScramble({
    text: title,
  });

  return (
    <div className="flex flex-wrap items-center justify-center min-w-40">
      <Link
        className="font-bold tracking-wide mx-4"
        ref={ref}
        href={url}
        onMouseOver={replay}
        onFocus={replay}
      />
    </div>
  );
}
