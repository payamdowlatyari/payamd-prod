import { social } from "../../Title/data";
import HoverLink from "../../../motion/View/HoverLink";

export default function Social() {
  return (
    <div>
      {social.map((item) => {
        return <HoverLink title={item.name} url={item.url} out />;
      })}
    </div>
  );
}
