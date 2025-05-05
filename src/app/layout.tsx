import type { Metadata } from "next";

import Layout from "~/lib/layout";

const APP_NAME = "Payam Dowlatyari";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: `Home | ${APP_NAME}`,
    template: `%s | ${APP_NAME}`,
  },
  description: `
    ${APP_NAME}'s personal website. 
    The first page includes a short description about Payam, 
    and a list of services and skills he offers.`,
  metadataBase: new URL("https://www.payamd.com"),
  applicationName: APP_NAME,
  keywords: [
    "Payam Dowlatyari",
    "Payam",
    "Dowlatyari",
    "Payam D",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Portfolio",
    "Personal Website",
    "Software Engineer",
    "Application Architect",
    "Web Developer",
    "Web Application Developer",
    "Frontend Developer",
    "Backend Developer",
    "API Developer",
    "Full Stack Developer",
    "UX Designer",
    "Photographer",
    "Blogger",
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description: `
      ${APP_NAME}'s personal website. 
      The first page includes a short description about Payam, 
      and a list of services and skills he offers.`,
    url: "https://www.payamd.com",
    siteName: APP_NAME,
    locale: "en-US",
    type: "website",
  },
};

/**
 * RootLayout component
 *
 * @param {RootLayoutProps} props - The props object containing the children to be rendered inside the layout.
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
