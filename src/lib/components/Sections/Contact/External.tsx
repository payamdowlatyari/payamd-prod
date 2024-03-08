import HoverLink from "../../motion/View/HoverLink";
import Social from "../Title/Social";

export default function External() {
  return (
    <div style={{ display: "inline-grid" }}>
      <HoverLink
        title="Personal Blog"
        url="https://payamd-blog.vercel.app/"
        out
      />
      <HoverLink
        title="Photography"
        url="https://payamd-photo.vercel.app/"
        out
      />
      <Social />
    </div>
  );
}
