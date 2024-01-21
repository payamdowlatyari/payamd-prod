import type { Metadata, Viewport } from "next";

import Providers from "~/app/providers";
import Layout from "~/lib/layout";

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = "Payam Dowlatyari";

export const viewport: Viewport = {
  themeColor: "#e9dfce",
};

export const metadata: Metadata = {
  title: { default: APP_NAME, template: "%s | Portfolio" },
  description: "Next.js +  Chakra-ui and Framer Motion",
  metadataBase: new URL("https://nextjs-starter-lemon-sigma.vercel.app"),
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
  keywords: ["Next.js", "React", "TypeScript"],
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: "https://nextjs-starter-lemon-sigma.vercel.app",
    title: "Payam D",
    description: "Animation with Next.js + Chakra-ui and Framer Motion",
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
