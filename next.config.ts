import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname:
          "/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20in%20Tuxedo.png",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname:
          "/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname:
          "/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png",
      },
    ],
  },
};

export default nextConfig;
