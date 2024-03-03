export default function LineOver({ title, url }: any) {
  return (
    <div className="content__item">
      <a href={url} className="link link--mneme">
        {title}
      </a>
    </div>
  );
}
