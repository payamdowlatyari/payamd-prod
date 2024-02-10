import { social } from "./data";
import HoverLink from "../../motion/View/HoverLink";

export default function Social() {
  return (
    <div style={{ display: "inline-grid", fontSize: "0.85em" }}>
      {social.map((item) => {
        return <HoverLink title={item.name} url={item.url} out />;
      })}
    </div>
  );
}
