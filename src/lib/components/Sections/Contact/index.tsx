import Social from "../Title/Social";
import HoverLink from "../../motion/View/HoverLink";

export default function Contact() {
  return (
    <div className="contacts">
      <div>
        <h5 className="small-title">Contact</h5>
        <HoverLink
          title="pdowlatyari@gmail.com"
          url="mailto:pdowlatyari@gmail.com"
          out
          low
        />
      </div>
      <div>
        <div>
          <h5 className="small-title">Follow</h5>
          <Social />
        </div>
        <div>
          <h5 className="small-title">Links</h5>
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
        </div>
      </div>
    </div>
  );
}
