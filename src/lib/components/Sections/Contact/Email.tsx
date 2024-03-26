import HoverLink from "../../motion/View/HoverLink";

export default function Email() {
  return (
    <div className="contact-list">
      <HoverLink
        title="contact@payamd.com"
        url="mailto:contact@payamd.com"
        out
        low
      />
    </div>
  );
}
