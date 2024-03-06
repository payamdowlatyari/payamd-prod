import HoverLink from "./View/HoverLink";
import Icon from "./Icon";

const getTags = (tags: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        color: "#fff",
        maxWidth: "300px",
        justifyContent: "center",
      }}
    >
      {tags?.map((tag: any) => {
        return <Icon id={tag} />;
      })}
    </div>
  );
};

export default function Card({ item }: any) {
  return (
    <figure
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        top: "10vh",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        style={{
          objectFit: "cover",
          borderRadius: "5px",
          width: "600px",
          maxWidth: "100vw",
          height: "auto",
        }}
      />
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "10em",
          justifyContent: "space-between",
          width: "500px",
          maxWidth: "100vw",
        }}
      >
        <div>
          <HoverLink url={item.url} title={item.title} out size="1.5em" />
          <p>{item.description}</p>
        </div>
        {getTags(item.tagIcon)}
      </div>
    </figure>
  );
}
