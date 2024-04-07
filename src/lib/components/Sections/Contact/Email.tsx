import HoverLink from "../../motion/View/HoverLink";

export default function Email() {
  return (
    <div className="contact-list">
      <HoverLink
        title="pdowlatyari@gmail.com"
        url="mailto:pdowlatyari@gmail.com"
        out
        low
      />
    </div>
  );
}
