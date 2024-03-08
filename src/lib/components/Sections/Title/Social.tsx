import { social } from "./data";
import HoverLink from "../../motion/View/HoverLink";

export default function Social() {
  return (
    <>
      {social.map((item) => {
        return <HoverLink title={item.name} url={item.url} out />;
      })}
    </>
  );
}
