export default function LineOver({ title, url }: any) {
  return (
    <div className="content__item">
      <a href={url} className="link link--elara">
        {title}
      </a>
    </div>
  );
}
