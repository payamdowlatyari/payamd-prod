"use client";

import Link from "next/link";

/**
 * Page404 component
 * @returns {JSX.Element}
 */
const Page404 = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-center items-center min-h-svh gap-6 px-6 text-center">
      <h1 className="page-title">404</h1>
      <Link href="/">Go Home</Link>
    </main>
  );
};

export default Page404;
