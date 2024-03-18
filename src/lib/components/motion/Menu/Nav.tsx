import LineOver from "../View/LineOver";

export default function Nav() {
  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <li>
          <LineOver title="Home" url="/" />
        </li>
        <li>
          <LineOver title="About" url="/about" />
        </li>
        <li>
          <LineOver title="Works" url="/projects" />
        </li>
      </ul>
    </div>
  );
}
