export default function LineBelow({ title, url }: any) {
  return (
    <div>
      <a href={url} className="hover">
        {title}
      </a>
    </div>
  );
}
