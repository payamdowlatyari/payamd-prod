import LineOver from "../View/LineOver";

export default function Nav() {
  return (
    <div className="navbar-container">
      <div className="navbar-items">
        <LineOver title="Home" url="/" />
        <LineOver title="About" url="/about" />
        <LineOver title="Works" url="/projects" />
      </div>
    </div>
  );
}
