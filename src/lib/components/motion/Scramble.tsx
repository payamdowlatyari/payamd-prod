import Link from "next/link";
import { useScramble } from "use-scramble";

export default function Scramble({ title, url }: any) {
  const { ref, replay } = useScramble({
    text: title,
  });

  return (
    <div className="flex flex-wrap items-center m-auto w-[150px] max-w[98vw]">
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
