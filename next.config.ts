import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image
  output: "standalone",
  // Genkit pulls in handlebars (via dotprompt), which relies on
  // require.extensions and cannot be bundled. Load it from node_modules instead.
  serverExternalPackages: [
    "genkit",
    "@genkit-ai/core",
    "@genkit-ai/ai",
    "@genkit-ai/google-genai",
    "handlebars",
    "dotprompt",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
