import type { Metadata } from "next";

import Providers from "~/app/providers";
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
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React",
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
    "Payam",
    "Dowlatyari",
    "Payam D",
    "Payam Dowlatyari",
  ],
  formatDetection: {
    telephone: false, // Disable automatic detection of telephone numbers
  },
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
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

/**
 * RootLayout component
 * This component is the root layout for the app.
 *
 * @param {RootLayoutProps} props - The props object containing the children to be rendered inside the layout.
 * @returns {JSX.Element} The JSX element representing the root layout.
 */
const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-50">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
