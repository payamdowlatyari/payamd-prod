const APP_NAME = "Payam Dowlatyari";

/**
 * Meta component
 * This component returns the meta tags for the app.
 *
 * @returns The meta tags for the app.
 */
const Meta = () => {
  return (
    <>
      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />

      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
};

export default Meta;
