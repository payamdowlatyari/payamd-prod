import { Badge } from "@chakra-ui/react";
import HoverLink from "./View/HoverLink";

const getTags = (tags: any) => {
  return (
    <div>
      {tags?.map((tag: any) => {
        return (
          <Badge colorScheme="gray" m={1} size="sm">
            {tag}
          </Badge>
        );
      })}
    </div>
  );
};

export default function Card({ item }: any) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <figure style={{ position: "relative" }}>
        <img
          src={item.img}
          alt={item.title}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            width: "100%",
            height: "auto",
          }}
        />
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            minHeight: "10em",
            justifyContent: "space-evenly",
            fontSize: "small",
            background: "rgba(0, 0, 0, 0.2)",
            boxShadow: "1px 1px 5px 1px #333",
          }}
        >
          <div>
            <HoverLink url={item.url} title={item.title} out size="1.5em" />
            <p>{item.description}</p>
          </div>
          {getTags(item.tags)}
        </div>
      </figure>
    </div>
  );
}
