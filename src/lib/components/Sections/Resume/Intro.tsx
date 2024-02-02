import { intro } from "./data";

export default function Intro() {
  return (
    <div style={{ padding: "1em" }}>
      <h3>Introduction</h3>
      <p>{intro.text}</p>
    </div>
  );
}
