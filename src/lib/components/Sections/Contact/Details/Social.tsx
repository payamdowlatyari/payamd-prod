import { social } from "../../Title/data";
import LinkOut from "~/lib/components/motion/View/LinkOut";

export default function Social() {
  return (
    <div>
      {social.map((item) => {
        return <LinkOut title={item.name} url={item.url} out />;
      })}
    </div>
  );
}
