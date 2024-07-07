import LinkOut from "~/lib/components/motion/View/LinkOut";

export default function External() {
  return (
    <div className="inline-grid p-2">
      <LinkOut title="Blog" url="https://payamd-blog.vercel.app/" out />
      <LinkOut title="Photos" url="https://payamd-photo.vercel.app/" out />
    </div>
  );
}
