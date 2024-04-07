import HoverLink from "../../motion/View/HoverLink";

export default function Email() {
  return (
    <div className="contact-list">
      <HoverLink
        title="pdyari@gmail.com"
        url="mailto:pdyari@gmail.com"
        out
        low
      />
    </div>
  );
}
