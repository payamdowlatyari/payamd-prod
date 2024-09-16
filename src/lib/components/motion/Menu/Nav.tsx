import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="z[2]">
      <ul className="inline-grid justify-center h-fit w-fit py-2 min-w-72">
        <li className="list-none py-1">
          <HoverLink title="Home" url="/" size="clamp(2.25rem, 5vw, 3rem)" />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="About"
            url="/about"
            size="clamp(2.25rem, 5vw, 3rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Projects"
            url="/projects"
            size="clamp(2.25rem, 5vw, 3rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Resume"
            url="/resume"
            size="clamp(2.25rem, 5vw, 3rem)"
          />
        </li>
        <li className="list-none py-1">
          <HoverLink
            title="Contact"
            url="/contact"
            size="clamp(2.25rem, 5vw, 3rem)"
          />
        </li>
      </ul>
    </div>
  );
}
