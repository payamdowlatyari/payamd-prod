import { LinkArrowOut } from "~/components/Button/Button";

/**
 * Renders a list of contact links and a list of links to other websites in two
 * separate sections.
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
        { name: "Blog", url: "https://blog.payamd.com" },
        { name: "Photography", url: "https://photos.payamd.com" },
      ],
    },
  ];

  return (
    <div className="flex flex-col px-4 my-4 z-10 contacts min-w-64">
      {contactDetails.map((section) => (
        <div key={`${section.title}`} className="flex flex-col w-60 my-2 pl-2">
          <h5 className="font-semibold text-2xl md:text-3xl m-1 uppercase text-neutral-500">
            {section.title}
          </h5>
          <div className="inline-grid p-1">
            {section.links.map((link) => (
              <LinkArrowOut key={link.name} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
