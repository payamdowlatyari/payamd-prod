import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="z-10 navbar">
      <ul className="inline-grid justify-center h-fit w-fit py-2 min-w-72">
        <li className="list-none py-1">
          <HoverLink title="Home" url="/" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="About" url="/about" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="Resume" url="/resume" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="Projects" url="/projects" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="Contact" url="/contact" />
        </li>
      </ul>
    </div>
  );
}
