import Link from "next/link";

/**
 * Page500 component
 * @returns {JSX.Element}
 */
const Page500 = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-center items-center min-h-svh gap-6 px-6 text-center">
      <h1 className="page-title">500</h1>
      <Link href="/">Go Home</Link>
    </main>
  );
};

export default Page500;
