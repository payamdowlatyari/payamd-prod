/* eslint-disable react/no-array-index-key */
import { LinkArrowOut } from "../../motion/View/TailwindButton";

/**
 * Renders a list of contact links and a list of links to other websites in two
 * separate sections.
 *
 * The contact links are in the format of { title: string, links: { name: string, url: string }[] }.
 * The links are in the format of { name: string, url: string }.
 *
 * The links are rendered using the LinkArrowOut component.
 *
 * @returns {JSX.Element} The rendered contact links and links to other websites.
 */
export default function Contacts(): JSX.Element {
  const contactDetails = [
    {
      title: "Contact",
      links: [{ name: "pdyari@gmail.com", url: "mailto:pdyari@gmail.com" }],
    },
    {
      title: "Check Out",
      links: [
        { name: "My Blog", url: "https://blog.payamd.com" },
        { name: "Photography", url: "https://photos.payamd.com" },
      ],
    },
  ];

  return (
    <div className="flex flex-col px-4 z-[2] contacts min-w-72">
      {contactDetails.map((section, index) => (
        <div key={index} className="flex flex-col m-auto w-52 my-4">
          <h5 className="min-w-24 font-semibold text-2xl md:text-3xl m-2 uppercase text-neutral-500">
            {section.title}
          </h5>
          <div className="inline-grid p-2">
            {section.links.map((link, idx) => (
              <LinkArrowOut key={idx} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
