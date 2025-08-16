const withPWA = require("next-pwa")({
  dest: "public",
  disable:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "preview" ||
    process.env.NODE_ENV === "production",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
    ]
  },

  /**
   * Adds a custom webpack rule to handle GLSL shader files.
   */
  webpack: (config ) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader']
    });

    return config;
  }
});
