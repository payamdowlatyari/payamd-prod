import { social } from "./data";
import HoverLink from "../../motion/View/HoverLink";

export default function Social() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", fontSize: "0.8em" }}>
      {social.map((item) => {
        return <HoverLink title={item.name} url={item.url} out />;
      })}
    </div>
  );
}
