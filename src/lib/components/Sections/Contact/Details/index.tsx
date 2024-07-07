import { Divider } from "@chakra-ui/react";

import Email from "./Email";
import External from "./External";
import PhoneNumber from "./Phone";
import Social from "./Social";

export default function Contacts() {
  return (
    <div className="m-auto w-[45w] px-4">
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 capitalize text-ultra-light-gray">
          Email
        </h5>
        <Email />
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 capitalize text-ultra-light-gray">
          Phone
        </h5>
        <PhoneNumber />
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 capitalize text-ultra-light-gray">
          Social
        </h5>
        <Social />
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 capitalize text-ultra-light-gray">
          Links
        </h5>
        <External />
        <Divider />
      </div>
    </div>
  );
}
