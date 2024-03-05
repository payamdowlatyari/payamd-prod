import { logos } from "../../data/logos";

export default function Logo({ light, size }: any) {
  return (
    <a href="/">
      {light ? (
        <img src={logos[2]} alt="logo" width={size} height={size} />
      ) : (
        <img src={logos[3]} alt="logo" />
      )}
    </a>
  );
}
