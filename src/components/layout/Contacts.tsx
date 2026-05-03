import { LinkArrowOut } from "~/components/ui/Button";
import { portfolio } from "~/data";

/**
 * Contacts component
 */
export default function Contacts() {
  return (
    <div className="flex flex-col justify-center items-start w-full gap-2 mt-4">
      {portfolio.contacts.map((section) => (
        <div
          key={`${section.title}`}
          className="flex flex-col md:flex-row justify-start items-center w-full"
        >
          <h5 className="font-semibold text-base md:text-lg uppercase text-neutral-600 w-16 mx-4">
            {section.title}
          </h5>
          <div className="flex flex-wrap gap-2 my-2">
            {section.links.map((link) => (
              <LinkArrowOut key={link.name} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row justify-start items-center w-full">
        <h5 className="font-semibold text-base md:text-lg uppercase text-neutral-600 w-16 mx-4">
          Social
        </h5>
        <div className="flex flex-wrap gap-2 my-2">
          {portfolio.social.map((link) => (
            <LinkArrowOut
              key={link.platform}
              title={link.platform}
              url={link.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
