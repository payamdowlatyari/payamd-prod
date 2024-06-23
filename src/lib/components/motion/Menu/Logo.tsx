export default function Logo({ light, size }: any) {
  return (
    <a href="/">
      {light ? (
        <img
          src="pd-logo1-removebg-preview.png"
          alt="logo"
          width={size}
          height={size}
        />
      ) : (
        <img src="pd-logo1-removebg-preview.png" alt="logo" />
      )}
    </a>
  );
}
