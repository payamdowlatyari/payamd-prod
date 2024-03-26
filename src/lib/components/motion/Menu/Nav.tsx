import LineBelow from "../View/LineBelow";

export default function Nav() {
  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <li>
          <LineBelow title="Home" url="/" />
        </li>
        <li>
          <LineBelow title="About" url="/about" />
        </li>
        <li>
          <LineBelow title="Projects" url="/projects" />
        </li>
        <li>
          <LineBelow title="Contact" url="/contact" />
        </li>
      </ul>
    </div>
  );
}
