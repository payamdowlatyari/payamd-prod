import HoverLink from "../../motion/View/HoverLink";

export default function External() {
  return (
    <div className="contact-list">
      <HoverLink title="Blog" url="https://payamd-blog.vercel.app/" out />
      <HoverLink title="Photos" url="https://payamd-photo.vercel.app/" out />
    </div>
  );
}
