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
      <HoverLink title="+1 916 547 8918" url="tel:+19165478918" out low />
    </div>
  );
}
