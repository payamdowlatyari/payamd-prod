import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="z[2]">
      <ul className="inline-grid justify-center h-fit w-fit py-2 min-w-72">
        <li className="list-none py-1">
          <HoverLink title="Home" url="/" size="clamp(2.5rem, 4vw, 3.5rem)" />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="About"
            url="/about"
            size="clamp(2.5rem, 4vw, 3.5rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Projects"
            url="/projects"
            size="clamp(2.5rem, 4vw, 3.5rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Resume"
            url="/resume"
            size="clamp(2.5rem, 4vw, 3.5rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Contact"
            url="/contact"
            size="clamp(2.5rem, 4vw, 3.5rem)"
          />
        </li>
      </ul>
    </div>
  );
}
