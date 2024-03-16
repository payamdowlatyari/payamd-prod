import HoverLink from "../../motion/View/HoverLink";

export default function Email() {
  return (
    <div style={{ display: "inline-grid" }}>
      <HoverLink
        title="contact@payamd.com"
        url="mailto:contact@payamd.com"
        out
        low
      />
      <HoverLink title="+1 916 647 8918" url="tel:+19166478918" out low />
    </div>
  );
}
