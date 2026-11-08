import type { Metadata } from "next";
import localFont from "next/font/local";

import Layout from "~/lib/layout";

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/satoshi-variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/satoshi-variable-italic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={`dark ${satoshi.variable}`}>
      <body className="bg-background font-body text-base leading-7 text-foreground">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
