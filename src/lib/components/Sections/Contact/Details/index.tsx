import Social from "./Social";
import Email from "./Email";
import External from "./External";
import PhoneNumber from "./Phone";
import { Divider } from "@chakra-ui/react";

export default function Contacts() {
  return (
    <div className="contacts">
      <div>
        <Divider />
        <h5>Email</h5>
        <Email />
      </div>
      <div>
        <Divider />
        <h5>Phone</h5>
        <PhoneNumber />
      </div>
      <div>
        <Divider />
        <h5>Social</h5>
        <Social />
      </div>
      <div>
        <Divider />
        <h5>Links</h5>
        <External />
        <Divider />
      </div>
    </div>
  );
}
