import { Divider, Tooltip } from "@chakra-ui/react";
import Link from "next/link";

import { social } from "../../data/data";
import LinkOut from "../../motion/View/LinkOut";

export default function Contacts() {
  return (
    <div className="m-auto w-[45w] px-4 z-[2] ">
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw] my-2">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Email
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="pdyari@gmail.com" url="mailto:pdyari@gmail.com" low />
        </div>
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw] my-2">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Phone
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="+1 916 547 8918" url="tel:+19165478918" low />
        </div>
      </div>

      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw] my-2">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Links
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="My Blog" url="https://blog.payamd.com" low />
          <LinkOut title="Photography" url="https://photos.payamd.com" out />
        </div>
      </div>
      <div className="flex flex-wrap items-center m-auto w-[350px] max-w[98vw] my-2">
        <Divider />
        <h5 className="min-w-[100px] text-base m-2 uppercase text-neutral-300">
          Social
        </h5>
        <div className="flex flex-row items-center flex-wrap p-2">
          {social.map((item) => {
            return (
              <Link href={item.url} target="_blank" rel="noreferrer">
                <Tooltip
                  hasArrow
                  label={item.name}
                  bg="gray.800"
                  color="white"
                  placement="bottom"
                  openDelay={1000}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-10 overflow-visible stroke-neutral-100 stroke-[1] fill-neutral-100 hover:scale-110 transition-all duration-300"
                  >
                    <path
                      d={item.icon}
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </Tooltip>
              </Link>
            );
          })}
        </div>
        <Divider />
      </div>
    </div>
  );
}
