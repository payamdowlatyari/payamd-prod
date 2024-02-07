export default function BGImage({ url }: any) {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        backgroundSize: "cover",
        position: "fixed",
        zIndex: "-1",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
      }}
    />
  );
}
