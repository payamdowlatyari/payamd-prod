import { LinkArrowOut } from "~/components/ui/Button";
import { portfolio } from "~/data";

/**
 * Contacts component
 */
export default function Contacts() {
  return (
    <div className="flex flex-col justify-center items-start w-full mt-4">
      {portfolio.contacts.map((section) => (
        <div
          key={`${section.title}`}
          className="flex flex-col md:flex-row justify-start items-center w-full"
        >
          <div className="font-semibold text-sm md:text-base xl:text-lg text-center md:text-left uppercase text-neutral-600 w-24 mx-2">
            {section.title}
          </div>
          <div className="flex flex-wrap gap-1 my-1 md:my-2 pl-2 justify-start items-center">
            {section.links.map((link) => (
              <LinkArrowOut key={link.name} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
