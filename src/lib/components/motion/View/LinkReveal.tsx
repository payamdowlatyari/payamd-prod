export default function LinkReveal({ title, sub, url }: any) {
  return (
    <div className="menu menu--dustu">
      <a href={url} className="menu__item">
        <span className="menu__item-name"> {title}</span>
        <span className="menu__item-label">{sub}</span>
      </a>
    </div>
  );
}
