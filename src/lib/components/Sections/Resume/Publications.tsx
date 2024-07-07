import Image from "next/image";

import LinkOut from "../../motion/View/LinkOut";

import { publication } from "./data";

/**
 * Renders the Publications section of the resume.
 *
 * @returns {JSX.Element} The rendered Publications section.
 */
const Publications = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse items-center px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.2vw]">
          Publications
        </h3>
        <Image
          src="/wired-gradient-245-edit-document.gif"
          alt="Edit Document"
          width={80}
          height={80}
        />
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {publication?.map(({ title, link, date, description, summary }) => (
          <div className="mb-6">
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <LinkOut title={title} url={link} out />
              <p>
                <span className="mr-2 text-sm text-ultra-light-gray">
                  {date}
                </span>
              </p>
            </div>
            <p className="mt-2 ml-1 text-sm">{description}</p>
            <br />
            <p className="ml-1 text-sm text-ultra-light-gray">{summary}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Publications;
