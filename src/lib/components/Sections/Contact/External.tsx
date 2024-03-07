import HoverLink from "../../motion/View/HoverLink";

export default function External() {
  return (
    <>
      <HoverLink
        title="My Web Blog"
        url="https://payamd-blog.vercel.app/"
        out
      />
      <br />
      <HoverLink
        title="Photography"
        url="https://payamd-photo.vercel.app/"
        out
      />
    </>
  );
}
