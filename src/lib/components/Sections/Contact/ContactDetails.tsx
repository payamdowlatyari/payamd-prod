import { Divider } from "@chakra-ui/react";

import { social } from "../../data/data";
import LinkOut from "~/lib/components/motion/View/LinkOut";

export default function Contacts() {
  return (
    <div className="m-auto w-[45w] px-4 z-[2] ">
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Email
        </h5>
        <div className="inline-grid p-2">
          <LinkOut
            title="pdyari@gmail.com"
            url="mailto:pdyari@gmail.com"
            out
            low
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Phone
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="+1 916 547 8918" url="tel:+19165478918" out low />
        </div>
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Social
        </h5>
        <div className="inline-grid p-2">
          {social.map((item) => {
            return <LinkOut title={item.name} url={item.url} out />;
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw]">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Links
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="Blog" url="https://payamd-blog.vercel.app/" out />
          <LinkOut title="Photos" url="https://payamd-photo.vercel.app/" out />
        </div>
        <Divider />
      </div>
    </div>
  );
}
