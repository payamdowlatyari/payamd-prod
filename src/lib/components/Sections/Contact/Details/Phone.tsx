import LinkOut from "~/lib/components/motion/View/LinkOut";

export default function PhoneNumber() {
  return (
    <div className="inline-grid p-2">
      <LinkOut title="+1 916 547 8918" url="tel:+19165478918" out low />
    </div>
  );
}
