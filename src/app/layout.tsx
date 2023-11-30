import type { Metadata } from "next";

import Providers from "~/app/providers";
import Layout from "~/lib/layout";

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = "Payam Dowlatyari";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: "%s | nextarter-chakra" },
  description: "Next.js + chakra-ui + TypeScript template",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#FFFFFF",
  openGraph: {
    url: "https://nextarter-chakra.sznm.dev",
    title: "Portfolio",
    description: "A sample portfolio with Next.js + chakra-ui",
  },
  twitter: {
    creator: "@sozonome",
    card: "summary_large_image",
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
