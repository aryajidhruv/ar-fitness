/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [{ pathname: "/uploads/**" }],
    // Keep Cloudinary for any legacy records still pointing at remote URLs.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" }
    ]
  }
};

module.exports = nextConfig;
