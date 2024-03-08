import Email from "./Email";
import External from "./External";

export default function Contact() {
  return (
    <div className="contacts">
      <div>
        <h5 className="small-title">Email</h5>
        <Email />
      </div>
      <div>
        <h5 className="small-title">Links</h5>
        <External />
      </div>
    </div>
  );
}
