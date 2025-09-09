import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Alias Handlebars to the ESM/cjs builds that don't use require.extensions
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "handlebars/runtime": "handlebars/dist/cjs/handlebars.runtime.js",
      handlebars: "handlebars/dist/cjs/handlebars.js",
    };

    // Suppress specific require.extensions warnings from Handlebars
    config.ignoreWarnings = [
      { module: /handlebars/ },
      ...(config.ignoreWarnings || []),
    ];

    return config;
  },
};

export default nextConfig;
