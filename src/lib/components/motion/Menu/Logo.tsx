import Image from "next/image";
import Link from "next/link";

export default function Logo({ light, size }: any) {
  return (
    <Link href="/">
      {light ? (
        <Image
          src="/pd-logo1-removebg-preview.png"
          alt="logo"
          width={size}
          height={size}
        />
      ) : (
        <Image
          src="/pd-logo1-removebg-preview.png"
          width={size}
          height={size}
          alt="logo"
        />
      )}
    </Link>
  );
}
