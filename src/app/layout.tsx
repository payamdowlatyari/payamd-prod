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
    "Frontend Developer",
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

const RootLayout = ({ children }: RootLayoutProps) => {
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
