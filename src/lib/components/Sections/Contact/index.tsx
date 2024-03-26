import Social from "./Social";
import Email from "./Email";
import External from "./External";
import Phone from "./Phone";

export default function Contacts() {
  return (
    <div className="contacts">
      <div>
        <h5 className="small-title">Email</h5>
        <Email />
      </div>
      <div>
        <h5 className="small-title">Phone</h5>
        <Phone />
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
