import Social from "../Title/Social";
import Email from "./Email";
import External from "./External";

export default function Contact() {
  return (
    <div className="contacts">
      <div>
        <h5 className="small-title">Contact</h5>
        <Email />
      </div>
      <div>
        <h5 className="small-title">Social</h5>
        <Social />
      </div>
      <div>
        <h5 className="small-title">More</h5>
        <External />
      </div>
    </div>
  );
}
