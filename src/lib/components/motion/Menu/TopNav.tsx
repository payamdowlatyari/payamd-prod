import { LinkOverlay } from "../View/TailwindButton";

/**
 * TopNav component
 * @returns {JSX.Element}
 */
export default function TopNav(): JSX.Element {
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Projects", url: "/projects" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <ul className="flex flex-col flex-wrap">
      {links.map(({ title, url }) => (
        <li key={title} className="list-none">
          <LinkOverlay url={url} title={title} />
        </li>
      ))}
    </ul>
  );
}
