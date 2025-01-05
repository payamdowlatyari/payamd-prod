import type { Metadata } from "next";

import Providers from "~/app/providers";
import Layout from "~/lib/layout";

const APP_NAME = "Payam Dowlatyari";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "Home | Payam Dowlatyari",
    template: "%s | Payam Dowlatyari",
  },
  description:
    "Payam Dowlatyari's personal website. The first page includes a short description about Payam, and a list of services and skills he offers.",
  metadataBase: new URL("https://www.payamd.com"),
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
  keywords: [
    "Next.js",
    "React",
    "Framer Motion",
    "Portfolio",
    "Software Engineer",
    "Application Architect",
    "Web Developer",
    "Web Application Developer",
    "Frontend Developer",
    "UX Designer",
    "Photographer",
    "Blogger",
  ],
  formatDetection: {
    telephone: false,
  },
  creator: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description:
      "Payam Dowlatyari's personal website. The first page includes a short description about Payam, and a list of services and skills he offers.",
    url: "https://www.payamd.com",
    siteName: "Payam Dowlatyari",
    locale: "en-US",
    type: "website",
  },
};

/**
 * RootLayout component that wraps the entire application.
 * It provides a global structure for the application by defining the HTML and body tags.
 *
 * @param {RootLayoutProps} props - The properties for the RootLayout component.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The RootLayout component.
 */

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
