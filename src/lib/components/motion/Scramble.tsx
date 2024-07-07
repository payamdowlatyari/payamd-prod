import Link from "next/link";
import { useScramble } from "use-scramble";

export default function Scramble({ title, url }: any) {
  const { ref, replay } = useScramble({
    text: title,
  });

  return <Link ref={ref} href={url} onMouseOver={replay} onFocus={replay} />;
}
