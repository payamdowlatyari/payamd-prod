import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <li>
          <HoverLink title="Home" url="/" />
        </li>
        <li>
          <HoverLink title="About" url="/about" />
        </li>
        <li>
          <HoverLink title="Projects" url="/projects" />
        </li>
        <li>
          <HoverLink title="Contact" url="/contact" />
        </li>
      </ul>
    </div>
  );
}
