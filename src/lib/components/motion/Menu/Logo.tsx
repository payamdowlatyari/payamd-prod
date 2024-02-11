import { logos } from "../../data/logos";

export default function Logo({ light }: any) {
  return (
    <span>
      {light ? (
        <img src={logos[2]} alt="logo" />
      ) : (
        <img src={logos[0]} alt="logo" />
      )}
    </span>
  );
}
