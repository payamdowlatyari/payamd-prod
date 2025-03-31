import { VariableFontHoverByLetter } from "../TextAnimate";
// import { HoverLink } from "../View/TailwindButton";

/**
 * Nav component
 * @returns {JSX.Element}
 */
export function Nav(): JSX.Element {
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Projects", url: "/projects" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <ul className="inline-grid justify-start h-fit w-fit py-2 my-4 min-w-64">
      {links.map(({ title, url }) => (
        <li key={title} className="list-none my-1 ml-4">
          <VariableFontHoverByLetter
            label={title}
            className="text-3xl sm:text-4xl uppercase text-neutral-200"
            staggerDuration={0.03}
            fromFontVariationSettings="'wght' 400, 'slnt' 0"
            toFontVariationSettings="'wght' 900, 'slnt' -10"
            link={url}
          />
        </li>
      ))}
    </ul>
  );
}
