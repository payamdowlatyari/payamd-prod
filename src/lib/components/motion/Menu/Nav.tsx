import HoverLink from "../View/HoverLink";

/**
 * Nav component
 * @returns {JSX.Element}
 */
export default function Nav(): JSX.Element {
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Projects", url: "/projects" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <ul className="inline-grid justify-center h-fit w-fit py-2 my-4 min-w-72">
      {links.map(({ title, url }) => (
        <li key={title} className="list-none my-2">
          <HoverLink title={title} url={url} />
        </li>
      ))}
    </ul>
  );
}
